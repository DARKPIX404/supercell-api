import { Fetcher } from '../fetcher.js';
import { Cache } from '../cache.js';
import { BSPlayer, BSClub, BSBrawlerInfo, BSEvent, BSRankingPlayer, BSRankingClub, BSRankingBrawler, PaginationOptions, PlayerTag, ClanTag } from '../types.js';
/**
 * Brawl Stars API endpoints
 */
export declare class BrawlStars {
    private fetcher;
    private cache;
    constructor(fetcher: Fetcher, cache: Cache);
    private cacheKey;
    private formatTag;
    private buildQuery;
    private get;
    getPlayer(playerTag: PlayerTag): Promise<BSPlayer>;
    getBattleLog(playerTag: PlayerTag): Promise<{
        items: unknown[];
    }>;
    getClub(clubTag: ClanTag): Promise<BSClub>;
    getClubMembers(clubTag: ClanTag, options?: PaginationOptions): Promise<{
        items: BSPlayer[];
        paging?: unknown;
    }>;
    getBrawlers(options?: PaginationOptions): Promise<{
        items: BSBrawlerInfo[];
        paging?: unknown;
    }>;
    getBrawler(brawlerId: number | string): Promise<BSBrawlerInfo>;
    getPlayerRankings(countryCode: string, options?: PaginationOptions): Promise<{
        items: BSRankingPlayer[];
        paging?: unknown;
    }>;
    getClubRankings(countryCode: string, options?: PaginationOptions): Promise<{
        items: BSRankingClub[];
        paging?: unknown;
    }>;
    getBrawlerRankings(countryCode: string, brawlerId: number | string, options?: PaginationOptions): Promise<{
        items: BSRankingBrawler[];
        paging?: unknown;
    }>;
    getEvents(): Promise<{
        items: BSEvent[];
    }>;
    getPlayers(playerTags: PlayerTag[]): Promise<BSPlayer[]>;
    getClubs(clubTags: ClanTag[]): Promise<BSClub[]>;
}
//# sourceMappingURL=brawlstars.d.ts.map