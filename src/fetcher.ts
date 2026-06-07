import { ClientConfig, RequestOptions } from './types.js';

export type RequestInterceptor = (url: string, options: RequestInit) => void | Promise<void>;
export type ResponseInterceptor = (response: Response) => void | Promise<void>;
export type ErrorInterceptor = (error: Error) => void | Promise<void>;

/**
 * Handles HTTP requests with retries, rate limiting, timeouts and interceptors
 */
export class Fetcher {
  private config: ClientConfig;
  private lastRequestTime = 0;
  private minRequestInterval = 100;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor(config: ClientConfig) {
    this.config = config;
  }

  addRequestInterceptor(fn: RequestInterceptor): void {
    this.requestInterceptors.push(fn);
  }

  addResponseInterceptor(fn: ResponseInterceptor): void {
    this.responseInterceptors.push(fn);
  }

  addErrorInterceptor(fn: ErrorInterceptor): void {
    this.errorInterceptors.push(fn);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async rateLimit(): Promise<void> {
    const now = Date.now();
    const diff = now - this.lastRequestTime;
    if (diff < this.minRequestInterval) {
      await this.sleep(this.minRequestInterval - diff);
    }
    this.lastRequestTime = Date.now();
  }

  private async runRequestInterceptors(url: string, options: RequestInit): Promise<void> {
    for (const interceptor of this.requestInterceptors) {
      await interceptor(url, options);
    }
  }

  private async runResponseInterceptors(response: Response): Promise<void> {
    for (const interceptor of this.responseInterceptors) {
      await interceptor(response);
    }
  }

  private async runErrorInterceptors(error: Error): Promise<void> {
    for (const interceptor of this.errorInterceptors) {
      await interceptor(error);
    }
  }

  private createTimeoutSignal(ms: number): AbortSignal {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), ms);
    return controller.signal;
  }

  /**
   * Fetch data from endpoint with retries, rate limiting and timeout
   */
  async fetchData<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.getBaseUrl()}${endpoint}`;
    const retries = this.config.retries ?? 3;
    const timeout = this.config.timeout ?? 30000;
    let lastError: Error | undefined;

    const fetchOptions: RequestInit = {
      method: options.method ?? 'GET',
      headers: {
        Authorization: `Bearer ${this.config.token}`,
        Accept: 'application/json',
        ...options.headers,
      },
      signal: this.createTimeoutSignal(timeout),
    };

    if (options.body) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        'Content-Type': 'application/json',
      };
      fetchOptions.body = JSON.stringify(options.body);
    }

    await this.runRequestInterceptors(url, fetchOptions);

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        await this.rateLimit();
        const response = await fetch(url, fetchOptions);

        await this.runResponseInterceptors(response);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ reason: response.statusText }));
          throw new Error(`API Error ${response.status}: ${errorData.reason || response.statusText}`);
        }

        return (await response.json()) as T;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        await this.runErrorInterceptors(lastError);

        if (lastError.message.includes('API Error 4') && !lastError.message.includes('429')) {
          throw lastError;
        }

        if (attempt < retries) {
          const delay = 1000 * Math.pow(2, attempt);
          await this.sleep(delay);
        }
      }
    }

    throw lastError;
  }

  getBaseUrl(): string {
    const apiMap: Record<string, string> = {
      clashofclans: 'https://api.clashofclans.com/v1',
      clashroyale: 'https://api.clashroyale.com/v1',
      brawlstars: 'https://api.brawlstars.com/v1',
    };

    if (this.config.useProxy) {
      const proxyMap: Record<string, string> = {
        clashofclans: 'https://cocproxy.royaleapi.dev/v1',
        clashroyale: 'https://proxy.royaleapi.dev/v1',
        brawlstars: 'https://bsproxy.royaleapi.dev/v1',
      };
      return proxyMap[this.config.apiType];
    }
    return apiMap[this.config.apiType];
  }
}
