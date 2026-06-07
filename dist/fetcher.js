/**
 * Handles HTTP requests with retries, rate limiting, timeouts and interceptors
 */
export class Fetcher {
    config;
    lastRequestTime = 0;
    minRequestInterval = 100;
    requestInterceptors = [];
    responseInterceptors = [];
    errorInterceptors = [];
    constructor(config) {
        this.config = config;
    }
    addRequestInterceptor(fn) {
        this.requestInterceptors.push(fn);
    }
    addResponseInterceptor(fn) {
        this.responseInterceptors.push(fn);
    }
    addErrorInterceptor(fn) {
        this.errorInterceptors.push(fn);
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async rateLimit() {
        const now = Date.now();
        const diff = now - this.lastRequestTime;
        if (diff < this.minRequestInterval) {
            await this.sleep(this.minRequestInterval - diff);
        }
        this.lastRequestTime = Date.now();
    }
    async runRequestInterceptors(url, options) {
        for (const interceptor of this.requestInterceptors) {
            await interceptor(url, options);
        }
    }
    async runResponseInterceptors(response) {
        for (const interceptor of this.responseInterceptors) {
            await interceptor(response);
        }
    }
    async runErrorInterceptors(error) {
        for (const interceptor of this.errorInterceptors) {
            await interceptor(error);
        }
    }
    createTimeoutSignal(ms) {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), ms);
        return controller.signal;
    }
    /**
     * Fetch data from endpoint with retries, rate limiting and timeout
     */
    async fetchData(endpoint, options = {}) {
        const url = `${this.getBaseUrl()}${endpoint}`;
        const retries = this.config.retries ?? 3;
        const timeout = this.config.timeout ?? 30000;
        let lastError;
        const fetchOptions = {
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
                return (await response.json());
            }
            catch (error) {
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
    getBaseUrl() {
        const apiMap = {
            clashofclans: 'https://api.clashofclans.com/v1',
            clashroyale: 'https://api.clashroyale.com/v1',
            brawlstars: 'https://api.brawlstars.com/v1',
        };
        if (this.config.useProxy) {
            const proxyMap = {
                clashofclans: 'https://cocproxy.royaleapi.dev/v1',
                clashroyale: 'https://proxy.royaleapi.dev/v1',
                brawlstars: 'https://bsproxy.royaleapi.dev/v1',
            };
            return proxyMap[this.config.apiType];
        }
        return apiMap[this.config.apiType];
    }
}
//# sourceMappingURL=fetcher.js.map