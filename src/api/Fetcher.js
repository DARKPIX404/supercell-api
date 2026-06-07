import SupercellAPI from './SupercellAPI.js';

/**
 * @class Fetcher
 * @description Handles HTTP requests for the Supercell API with rate limiting and retries
 */
class Fetcher {
  /**
   * @constructor
   * @param {SupercellAPI} api - The SupercellAPI instance
   */
  constructor(api) {
    this.api = api;
    this.lastRequestTime = 0;
    this.minRequestInterval = 100; // 100ms between requests
    this.maxRetries = 3;
    this.retryDelay = 1000;
  }

  /**
   * @private
   * @method sleep
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise<void>}
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * @private
   * @method rateLimit
   * @description Ensures minimum interval between requests
   * @returns {Promise<void>}
   */
  async rateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.minRequestInterval) {
      await this.sleep(this.minRequestInterval - timeSinceLastRequest);
    }
    this.lastRequestTime = Date.now();
  }

  /**
   * @method fetchData
   * @description Fetches data from the specified endpoint with retries
   * @param {string} endpoint - The API endpoint
   * @param {Object} [options={}] - Additional fetch options
   * @returns {Promise<any>} The response data
   * @throws {Error} If request fails after all retries
   */
  async fetchData(endpoint, options = {}) {
    let lastError;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        await this.rateLimit();
        const url = `${this.api.baseUrl}${endpoint}`;
        const fetchOptions = {
          headers: this.api.headers,
          ...options,
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ reason: response.statusText }));
          throw new Error(`API Error ${response.status}: ${errorData.reason || response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Don't retry on client errors (4xx except 429)
        if (lastError.message.includes('API Error 4') && !lastError.message.includes('429')) {
          throw lastError;
        }

        if (attempt < this.maxRetries) {
          const delay = this.retryDelay * Math.pow(2, attempt);
          await this.sleep(delay);
        }
      }
    }

    throw lastError;
  }

  /**
   * @method postData
   * @description Posts data to the specified endpoint
   * @param {string} endpoint - The API endpoint
   * @param {Object} body - The request body
   * @returns {Promise<any>} The response data
   * @throws {Error} If request fails
   */
  async postData(endpoint, body) {
    return this.fetchData(endpoint, {
      method: 'POST',
      headers: {
        ...this.api.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}

export default Fetcher;
