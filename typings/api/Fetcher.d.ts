export default Fetcher;
/**
 * @class Fetcher
 * @description Handles HTTP requests for the Supercell API with rate limiting and retries
 */
declare class Fetcher {
    /**
     * @constructor
     * @param {SupercellAPI} api - The SupercellAPI instance
     */
    constructor(api: SupercellAPI);
    api: SupercellAPI;
    lastRequestTime: number;
    minRequestInterval: number;
    maxRetries: number;
    retryDelay: number;
    /**
     * @private
     * @method sleep
     * @param {number} ms - Milliseconds to sleep
     * @returns {Promise<void>}
     */
    private sleep;
    /**
     * @private
     * @method rateLimit
     * @description Ensures minimum interval between requests
     * @returns {Promise<void>}
     */
    private rateLimit;
    /**
     * @method fetchData
     * @description Fetches data from the specified endpoint with retries
     * @param {string} endpoint - The API endpoint
     * @param {Object} [options={}] - Additional fetch options
     * @returns {Promise<any>} The response data
     * @throws {Error} If request fails after all retries
     */
    fetchData(endpoint: string, options?: Object): Promise<any>;
    /**
     * @method postData
     * @description Posts data to the specified endpoint
     * @param {string} endpoint - The API endpoint
     * @param {Object} body - The request body
     * @returns {Promise<any>} The response data
     * @throws {Error} If request fails
     */
    postData(endpoint: string, body: Object): Promise<any>;
}
import SupercellAPI from './SupercellAPI.js';
//# sourceMappingURL=Fetcher.d.ts.map