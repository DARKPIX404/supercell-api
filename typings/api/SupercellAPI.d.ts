export default SupercellAPI;
export type APIConfig = {
    /**
     * - API authentication token
     */
    token: string;
    /**
     * - Whether to use proxy for requests
     */
    useProxy?: boolean | undefined;
    /**
     * - Type of Supercell API
     */
    apiType: "clashofclans" | "clashroyale" | "brawlstars";
};
export type APIHeaders = {
    /**
     * - Bearer token for authentication
     */
    Authorization: string;
    /**
     * - Accept header for API requests
     */
    Accept: string;
};
/**
 * @typedef {Object} APIConfig
 * @property {string} token - API authentication token
 * @property {boolean} [useProxy=false] - Whether to use proxy for requests
 * @property {'clashofclans' | 'clashroyale' | 'brawlstars'} apiType - Type of Supercell API
 */
/**
 * @typedef {Object} APIHeaders
 * @property {string} Authorization - Bearer token for authentication
 * @property {string} Accept - Accept header for API requests
 */
/**
 * @class SupercellAPI
 * @description Base class that handles core functionality for Supercell game APIs
 */
declare class SupercellAPI {
    /**
     * Creates an instance of SupercellAPI
     * @param {APIConfig} config - Configuration object for the API
     * @throws {Error} When token or apiType is missing
     */
    constructor({ token, useProxy, apiType }: APIConfig);
    /** @type {string} */
    token: string;
    /** @type {boolean} */
    useProxy: boolean;
    /** @type {'clashofclans' | 'clashroyale' | 'brawlstars'} */
    apiType: "clashofclans" | "clashroyale" | "brawlstars";
    /** @type {APIHeaders} */
    headers: APIHeaders;
    /** @type {string} */
    baseUrl: string;
    /**
     * Gets the appropriate base URL for API requests
     * @private
     * @returns {string} The base URL for API requests
     */
    private getBaseUrl;
    /**
     * Validates and formats a player/clan tag
     * @param {string} tag - The tag to format
     * @returns {string} Formatted tag with URL encoding
     */
    formatTag(tag: string): string;
    /**
     * Builds query string from parameters
     * @param {Object} params - Query parameters
     * @returns {string} Query string
     */
    buildQuery(params: Object): string;
}
//# sourceMappingURL=SupercellAPI.d.ts.map