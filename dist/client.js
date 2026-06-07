import { Fetcher } from './fetcher.js';
import { Cache } from './cache.js';
import { ClashOfClans } from './games/clashofclans.js';
import { ClashRoyale } from './games/clashroyale.js';
import { BrawlStars } from './games/brawlstars.js';
/**
 * Supercell API Client
 *
 * Supports Clash of Clans, Clash Royale and Brawl Stars APIs
 *
 * @example
 * ```ts
 * const client = new SupercellClient({
 *   token: 'YOUR_TOKEN',
 *   apiType: 'clashofclans',
 *   useProxy: false,
 *   cacheEnabled: true,
 * });
 *
 * const player = await client.api.getPlayer('#PLAYER_TAG');
 * ```
 */
export class SupercellClient {
    fetcher;
    cache;
    api;
    /**
     * Create a new Supercell API client
     * @param config - Client configuration
     */
    constructor(config) {
        if (!config.token)
            throw new Error('API token is required');
        if (!config.apiType)
            throw new Error('API type is required');
        const valid = ['clashofclans', 'clashroyale', 'brawlstars'];
        if (!valid.includes(config.apiType)) {
            throw new Error(`Invalid API type. Must be one of: ${valid.join(', ')}`);
        }
        this.fetcher = new Fetcher(config);
        this.cache = new Cache(config.cacheEnabled ?? true, config.cacheTtl);
        switch (config.apiType) {
            case 'clashofclans':
                this.api = new ClashOfClans(this.fetcher, this.cache);
                break;
            case 'clashroyale':
                this.api = new ClashRoyale(this.fetcher, this.cache);
                break;
            case 'brawlstars':
                this.api = new BrawlStars(this.fetcher, this.cache);
                break;
        }
    }
    /**
     * Add a request interceptor
     */
    addRequestInterceptor(fn) {
        this.fetcher.addRequestInterceptor(fn);
    }
    /**
     * Add a response interceptor
     */
    addResponseInterceptor(fn) {
        this.fetcher.addResponseInterceptor(fn);
    }
    /**
     * Add an error interceptor
     */
    addErrorInterceptor(fn) {
        this.fetcher.addErrorInterceptor(fn);
    }
    /**
     * Clear the internal cache
     */
    clearCache() {
        this.cache.clear();
    }
}
//# sourceMappingURL=client.js.map