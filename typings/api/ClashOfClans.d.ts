export default ClashOfClans;
/**
 * @class ClashOfClans
 * @description Handles all Clash of Clans API endpoints
 */
declare class ClashOfClans {
    /**
     * @constructor
     * @param {import('./SupercellAPI.js').default} api - SupercellAPI instance
     */
    constructor(api: import("./SupercellAPI.js").default);
    api: import("./SupercellAPI.js").default;
    /**
     * Get player information by tag
     * @param {string} playerTag - Player tag with or without '#'
     * @returns {Promise<Object>} Player data
     */
    getPlayer(playerTag: string): Promise<Object>;
    /**
     * Verify player API token
     * @param {string} playerTag - Player tag
     * @param {string} token - API token to verify
     * @returns {Promise<Object>} Verification result
     */
    verifyPlayerToken(playerTag: string, token: string): Promise<Object>;
    /**
     * Search for clans
     * @param {Object} params - Search parameters
     * @param {string} [params.name] - Clan name
     * @param {string} [params.warFrequency] - War frequency
     * @param {number} [params.minMembers] - Minimum members
     * @param {number} [params.maxMembers] - Maximum members
     * @param {number} [params.minClanPoints] - Minimum clan points
     * @param {number} [params.minClanLevel] - Minimum clan level
     * @param {number} [params.limit] - Max results (1-50)
     * @param {string} [params.after] - Cursor for pagination
     * @param {string} [params.before] - Cursor for pagination
     * @param {string} [params.labelIds] - Label IDs comma separated
     * @returns {Promise<Object>} Search results
     */
    searchClans(params?: {
        name?: string | undefined;
        warFrequency?: string | undefined;
        minMembers?: number | undefined;
        maxMembers?: number | undefined;
        minClanPoints?: number | undefined;
        minClanLevel?: number | undefined;
        limit?: number | undefined;
        after?: string | undefined;
        before?: string | undefined;
        labelIds?: string | undefined;
    }): Promise<Object>;
    /**
     * Get clan information by tag
     * @param {string} clanTag - Clan tag with or without '#'
     * @returns {Promise<Object>} Clan data
     */
    getClan(clanTag: string): Promise<Object>;
    /**
     * Get clan members
     * @param {string} clanTag - Clan tag
     * @param {Object} [options] - Options
     * @param {number} [options.limit] - Max results
     * @param {string} [options.after] - Cursor
     * @param {string} [options.before] - Cursor
     * @returns {Promise<Object>} Clan members
     */
    getClanMembers(clanTag: string, options?: {
        limit?: number | undefined;
        after?: string | undefined;
        before?: string | undefined;
    }): Promise<Object>;
    /**
     * Get clan war log
     * @param {string} clanTag - Clan tag
     * @param {Object} [options] - Options
     * @param {number} [options.limit] - Max results
     * @param {string} [options.after] - Cursor
     * @param {string} [options.before] - Cursor
     * @returns {Promise<Object>} War log
     */
    getClanWarLog(clanTag: string, options?: {
        limit?: number | undefined;
        after?: string | undefined;
        before?: string | undefined;
    }): Promise<Object>;
    /**
     * Get current war information
     * @param {string} clanTag - Clan tag
     * @returns {Promise<Object>} Current war data
     */
    getCurrentWar(clanTag: string): Promise<Object>;
    /**
     * Get CWL group information
     * @param {string} clanTag - Clan tag
     * @returns {Promise<Object>} CWL group data
     */
    getWarLeagueGroup(clanTag: string): Promise<Object>;
    /**
     * Get CWL war information
     * @param {string} warTag - War tag
     * @returns {Promise<Object>} War data
     */
    getWarLeagueWar(warTag: string): Promise<Object>;
    /**
     * Get list of locations
     * @param {Object} [options] - Options
     * @param {number} [options.limit] - Max results
     * @param {string} [options.after] - Cursor
     * @param {string} [options.before] - Cursor
     * @returns {Promise<Object>} Locations list
     */
    getLocations(options?: {
        limit?: number | undefined;
        after?: string | undefined;
        before?: string | undefined;
    }): Promise<Object>;
    /**
     * Get location information
     * @param {number|string} locationId - Location ID
     * @returns {Promise<Object>} Location data
     */
    getLocation(locationId: number | string): Promise<Object>;
    /**
     * Get clan rankings for a location
     * @param {number|string} locationId - Location ID
     * @param {Object} [options] - Options
     * @param {number} [options.limit] - Max results
     * @param {string} [options.after] - Cursor
     * @param {string} [options.before] - Cursor
     * @returns {Promise<Object>} Rankings
     */
    getClanRankings(locationId: number | string, options?: {
        limit?: number | undefined;
        after?: string | undefined;
        before?: string | undefined;
    }): Promise<Object>;
    /**
     * Get player rankings for a location
     * @param {number|string} locationId - Location ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Rankings
     */
    getPlayerRankings(locationId: number | string, options?: Object): Promise<Object>;
    /**
     * Get versus clan rankings for a location
     * @param {number|string} locationId - Location ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Rankings
     */
    getVersusClanRankings(locationId: number | string, options?: Object): Promise<Object>;
    /**
     * Get versus player rankings for a location
     * @param {number|string} locationId - Location ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Rankings
     */
    getVersusPlayerRankings(locationId: number | string, options?: Object): Promise<Object>;
    /**
     * Get capital rankings for a location
     * @param {number|string} locationId - Location ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Rankings
     */
    getCapitalRankings(locationId: number | string, options?: Object): Promise<Object>;
    /**
     * Get list of leagues
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Leagues list
     */
    getLeagues(options?: Object): Promise<Object>;
    /**
     * Get league information
     * @param {number|string} leagueId - League ID
     * @returns {Promise<Object>} League data
     */
    getLeague(leagueId: number | string): Promise<Object>;
    /**
     * Get league seasons
     * @param {number|string} leagueId - League ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Seasons list
     */
    getLeagueSeasons(leagueId: number | string, options?: Object): Promise<Object>;
    /**
     * Get league season rankings
     * @param {number|string} leagueId - League ID
     * @param {string} seasonId - Season ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Season rankings
     */
    getLeagueSeasonRankings(leagueId: number | string, seasonId: string, options?: Object): Promise<Object>;
    /**
     * Get player labels
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Labels list
     */
    getPlayerLabels(options?: Object): Promise<Object>;
    /**
     * Get clan labels
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Labels list
     */
    getClanLabels(options?: Object): Promise<Object>;
    /**
     * Get current gold pass season
     * @returns {Promise<Object>} Gold pass data
     */
    getGoldPassSeason(): Promise<Object>;
    #private;
}
//# sourceMappingURL=ClashOfClans.d.ts.map