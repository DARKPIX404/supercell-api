import { Fetcher } from '../fetcher.js';
import { Cache } from '../cache.js';
import { CoCPlayer, CoCClan, CoCWar, CoCWarLeagueGroup, CoCWarLeagueWar, CoCGoldPassSeason, CoCLocation, CoCLeague, CoCLabel, CoCClanSearchParams, PaginationOptions, PlayerTag, ClanTag } from '../types.js';
/**
 * Clash of Clans API endpoints
 */
export declare class ClashOfClans {
    private fetcher;
    private cache;
    constructor(fetcher: Fetcher, cache: Cache);
    private cacheKey;
    private formatTag;
    private buildQuery;
    private get;
    getPlayer(playerTag: PlayerTag): Promise<CoCPlayer>;
    verifyPlayerToken(playerTag: PlayerTag, token: string): Promise<{
        status: string;
        tag: string;
    }>;
    searchClans(params?: CoCClanSearchParams): Promise<{
        items: CoCClan[];
        paging?: unknown;
    }>;
    getClan(clanTag: ClanTag): Promise<CoCClan>;
    getClanMembers(clanTag: ClanTag, options?: PaginationOptions): Promise<{
        items: CoCPlayer[];
        paging?: unknown;
    }>;
    getClanWarLog(clanTag: ClanTag, options?: PaginationOptions): Promise<{
        items: CoCWar[];
        paging?: unknown;
    }>;
    getCurrentWar(clanTag: ClanTag): Promise<CoCWar>;
    getWarLeagueGroup(clanTag: ClanTag): Promise<CoCWarLeagueGroup>;
    getWarLeagueWar(warTag: string): Promise<CoCWarLeagueWar>;
    getLocations(options?: PaginationOptions): Promise<{
        items: CoCLocation[];
        paging?: unknown;
    }>;
    getLocation(locationId: number | string): Promise<CoCLocation>;
    getClanRankings(locationId: number | string, options?: PaginationOptions): Promise<{
        items: CoCClan[];
        paging?: unknown;
    }>;
    getPlayerRankings(locationId: number | string, options?: PaginationOptions): Promise<{
        items: CoCPlayer[];
        paging?: unknown;
    }>;
    getVersusClanRankings(locationId: number | string, options?: PaginationOptions): Promise<{
        items: CoCClan[];
        paging?: unknown;
    }>;
    getVersusPlayerRankings(locationId: number | string, options?: PaginationOptions): Promise<{
        items: CoCPlayer[];
        paging?: unknown;
    }>;
    getCapitalRankings(locationId: number | string, options?: PaginationOptions): Promise<{
        items: CoCClan[];
        paging?: unknown;
    }>;
    getLeagues(options?: PaginationOptions): Promise<{
        items: CoCLeague[];
        paging?: unknown;
    }>;
    getLeague(leagueId: number | string): Promise<CoCLeague>;
    getLeagueSeasons(leagueId: number | string, options?: PaginationOptions): Promise<{
        items: {
            id: string;
        }[];
        paging?: unknown;
    }>;
    getLeagueSeasonRankings(leagueId: number | string, seasonId: string, options?: PaginationOptions): Promise<{
        items: CoCPlayer[];
        paging?: unknown;
    }>;
    getPlayerLabels(options?: PaginationOptions): Promise<{
        items: CoCLabel[];
        paging?: unknown;
    }>;
    getClanLabels(options?: PaginationOptions): Promise<{
        items: CoCLabel[];
        paging?: unknown;
    }>;
    getGoldPassSeason(): Promise<CoCGoldPassSeason>;
    /**
     * Fetch multiple players at once
     */
    getPlayers(playerTags: PlayerTag[]): Promise<CoCPlayer[]>;
    /**
     * Fetch multiple clans at once
     */
    getClans(clanTags: ClanTag[]): Promise<CoCClan[]>;
}
//# sourceMappingURL=clashofclans.d.ts.map