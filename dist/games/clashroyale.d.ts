import { Fetcher } from '../fetcher.js';
import { Cache } from '../cache.js';
import { CRPlayer, CRClan, CRTournament, CRCard, CRLocation, CRChallenge, CRGlobalTournament, PaginationOptions, PlayerTag, ClanTag, CRClanSearchParams } from '../types.js';
/**
 * Clash Royale API endpoints
 */
export declare class ClashRoyale {
    private fetcher;
    private cache;
    constructor(fetcher: Fetcher, cache: Cache);
    private cacheKey;
    private formatTag;
    private buildQuery;
    private get;
    getPlayer(playerTag: PlayerTag): Promise<CRPlayer>;
    getUpcomingChests(playerTag: PlayerTag): Promise<{
        items: {
            index: number;
            name: string;
        }[];
    }>;
    getBattleLog(playerTag: PlayerTag): Promise<{
        items: unknown[];
    }>;
    searchClans(params?: CRClanSearchParams): Promise<{
        items: CRClan[];
        paging?: unknown;
    }>;
    getClan(clanTag: ClanTag): Promise<CRClan>;
    getClanMembers(clanTag: ClanTag, options?: PaginationOptions): Promise<{
        items: CRPlayer[];
        paging?: unknown;
    }>;
    getClanWarLog(clanTag: ClanTag, options?: PaginationOptions): Promise<{
        items: unknown[];
        paging?: unknown;
    }>;
    getCurrentWar(clanTag: ClanTag): Promise<unknown>;
    searchTournaments(params?: PaginationOptions & {
        name?: string;
    }): Promise<{
        items: CRTournament[];
        paging?: unknown;
    }>;
    getTournament(tournamentTag: string): Promise<CRTournament>;
    getCards(options?: PaginationOptions): Promise<{
        items: CRCard[];
        paging?: unknown;
    }>;
    getLocations(options?: PaginationOptions): Promise<{
        items: CRLocation[];
        paging?: unknown;
    }>;
    getLocation(locationId: number | string): Promise<CRLocation>;
    getPlayerRankings(locationId: number | string, options?: PaginationOptions): Promise<{
        items: CRPlayer[];
        paging?: unknown;
    }>;
    getClanRankings(locationId: number | string, options?: PaginationOptions): Promise<{
        items: CRClan[];
        paging?: unknown;
    }>;
    getClanWarRankings(locationId: number | string, options?: PaginationOptions): Promise<{
        items: CRClan[];
        paging?: unknown;
    }>;
    getChallenges(options?: PaginationOptions): Promise<{
        items: CRChallenge[];
        paging?: unknown;
    }>;
    getGlobalTournaments(options?: PaginationOptions): Promise<{
        items: CRGlobalTournament[];
        paging?: unknown;
    }>;
    getPlayers(playerTags: PlayerTag[]): Promise<CRPlayer[]>;
    getClans(clanTags: ClanTag[]): Promise<CRClan[]>;
}
//# sourceMappingURL=clashroyale.d.ts.map