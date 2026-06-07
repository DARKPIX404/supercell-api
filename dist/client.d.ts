import { ClientConfig } from './types.js';
import { RequestInterceptor, ResponseInterceptor, ErrorInterceptor } from './fetcher.js';
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
export declare class SupercellClient {
    private fetcher;
    private cache;
    api: ClashOfClans | ClashRoyale | BrawlStars;
    /**
     * Create a new Supercell API client
     * @param config - Client configuration
     */
    constructor(config: ClientConfig);
    /**
     * Add a request interceptor
     */
    addRequestInterceptor(fn: RequestInterceptor): void;
    /**
     * Add a response interceptor
     */
    addResponseInterceptor(fn: ResponseInterceptor): void;
    /**
     * Add an error interceptor
     */
    addErrorInterceptor(fn: ErrorInterceptor): void;
    /**
     * Clear the internal cache
     */
    clearCache(): void;
}
//# sourceMappingURL=client.d.ts.map