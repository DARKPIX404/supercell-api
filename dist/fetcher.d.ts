import { ClientConfig, RequestOptions } from './types.js';
export type RequestInterceptor = (url: string, options: RequestInit) => void | Promise<void>;
export type ResponseInterceptor = (response: Response) => void | Promise<void>;
export type ErrorInterceptor = (error: Error) => void | Promise<void>;
/**
 * Handles HTTP requests with retries, rate limiting, timeouts and interceptors
 */
export declare class Fetcher {
    private config;
    private lastRequestTime;
    private minRequestInterval;
    private requestInterceptors;
    private responseInterceptors;
    private errorInterceptors;
    constructor(config: ClientConfig);
    addRequestInterceptor(fn: RequestInterceptor): void;
    addResponseInterceptor(fn: ResponseInterceptor): void;
    addErrorInterceptor(fn: ErrorInterceptor): void;
    private sleep;
    private rateLimit;
    private runRequestInterceptors;
    private runResponseInterceptors;
    private runErrorInterceptors;
    private createTimeoutSignal;
    /**
     * Fetch data from endpoint with retries, rate limiting and timeout
     */
    fetchData<T>(endpoint: string, options?: RequestOptions): Promise<T>;
    getBaseUrl(): string;
}
//# sourceMappingURL=fetcher.d.ts.map