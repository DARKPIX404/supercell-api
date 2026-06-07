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
class SupercellAPI {
  /**
   * Creates an instance of SupercellAPI
   * @param {APIConfig} config - Configuration object for the API
   * @throws {Error} When token or apiType is missing
   */
  constructor({ token, useProxy = false, apiType }) {
    if (!token) {
      throw new Error('API token is required');
    }
    if (!apiType) {
      throw new Error('API type is required');
    }

    const validTypes = ['clashofclans', 'clashroyale', 'brawlstars'];
    if (!validTypes.includes(apiType)) {
      throw new Error(`Invalid API type. Must be one of: ${validTypes.join(', ')}`);
    }

    /** @type {string} */
    this.token = token;

    /** @type {boolean} */
    this.useProxy = useProxy;

    /** @type {'clashofclans' | 'clashroyale' | 'brawlstars'} */
    this.apiType = apiType;

    /** @type {APIHeaders} */
    this.headers = {
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/json',
    };

    /** @type {string} */
    this.baseUrl = this.getBaseUrl();
  }

  /**
   * Gets the appropriate base URL for API requests
   * @private
   * @returns {string} The base URL for API requests
   */
  getBaseUrl() {
    /** @type {Record<string, string>} */
    const apiMap = {
      clashofclans: 'https://api.clashofclans.com/v1',
      clashroyale: 'https://api.clashroyale.com/v1',
      brawlstars: 'https://api.brawlstars.com/v1',
    };

    if (this.useProxy) {
      /** @type {Record<string, string>} */
      const proxyMap = {
        clashofclans: 'https://cocproxy.royaleapi.dev/v1',
        clashroyale: 'https://proxy.royaleapi.dev/v1',
        brawlstars: 'https://bsproxy.royaleapi.dev/v1',
      };
      return proxyMap[this.apiType];
    }
    return apiMap[this.apiType];
  }

  /**
   * Validates and formats a player/clan tag
   * @param {string} tag - The tag to format
   * @returns {string} Formatted tag with URL encoding
   */
  formatTag(tag) {
    if (!tag) {
      throw new Error('Tag is required');
    }
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    return encodeURIComponent(formatted);
  }

  /**
   * Builds query string from parameters
   * @param {Object} params - Query parameters
   * @returns {string} Query string
   */
  buildQuery(params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    }
    const query = searchParams.toString();
    return query ? `?${query}` : '';
  }
}

export default SupercellAPI;
