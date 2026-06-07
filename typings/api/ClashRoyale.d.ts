export default ClashRoyale;
/**
 * @class ClashRoyale
 * @description Handles all Clash Royale API endpoints
 */
declare class ClashRoyale {
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
     * Get player's upcoming chests
     * @param {string} playerTag - Player tag
     * @returns {Promise<Object>} Upcoming chests
     */
    getUpcomingChests(playerTag: string): Promise<Object>;
    /**
     * Get player's battle log
     * @param {string} playerTag - Player tag
     * @returns {Promise<Object>} Battle log
     */
    getBattleLog(playerTag: string): Promise<Object>;
    /**
     * Search for clans
     * @param {Object} params - Search parameters
     * @param {string} [params.name] - Clan name
     * @param {string} [params.locationId] - Location ID
     * @param {number} [params.minMembers] - Minimum members
     * @param {number} [params.maxMembers] - Maximum members
     * @param {number} [params.minScore] - Minimum score
     * @param {number} [params.limit] - Max results (1-50)
     * @param {string} [params.after] - Cursor
     * @param {string} [params.before] - Cursor
     * @returns {Promise<Object>} Search results
     */
    searchClans(params?: {
        name?: string | undefined;
        locationId?: string | undefined;
        minMembers?: number | undefined;
        maxMembers?: number | undefined;
        minScore?: number | undefined;
        limit?: number | undefined;
        after?: string | undefined;
        before?: string | undefined;
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
     * @returns {Promise<Object>} War log
     */
    getClanWarLog(clanTag: string, options?: Object): Promise<Object>;
    /**
     * Get current war information
     * @param {string} clanTag - Clan tag
     * @returns {Promise<Object>} Current war data
     */
    getCurrentWar(clanTag: string): Promise<Object>;
    /**
     * Search tournaments
     * @param {Object} params - Search parameters
     * @param {string} [params.name] - Tournament name
     * @param {number} [params.limit] - Max results
     * @param {string} [params.after] - Cursor
     * @param {string} [params.before] - Cursor
     * @returns {Promise<Object>} Tournaments
     */
    searchTournaments(params?: {
        name?: string | undefined;
        limit?: number | undefined;
        after?: string | undefined;
        before?: string | undefined;
    }): Promise<Object>;
    /**
     * Get tournament by tag
     * @param {string} tournamentTag - Tournament tag
     * @returns {Promise<Object>} Tournament data
     */
    getTournament(tournamentTag: string): Promise<Object>;
    /**
     * Get all cards
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Cards list
     */
    getCards(options?: Object): Promise<Object>;
    /**
     * Get list of locations
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Locations list
     */
    getLocations(options?: Object): Promise<Object>;
    /**
     * Get location information
     * @param {number|string} locationId - Location ID
     * @returns {Promise<Object>} Location data
     */
    getLocation(locationId: number | string): Promise<Object>;
    /**
     * Get player rankings for a location
     * @param {number|string} locationId - Location ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Rankings
     */
    getPlayerRankings(locationId: number | string, options?: Object): Promise<Object>;
    /**
     * Get clan rankings for a location
     * @param {number|string} locationId - Location ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Rankings
     */
    getClanRankings(locationId: number | string, options?: Object): Promise<Object>;
    /**
     * Get clan war rankings for a location
     * @param {number|string} locationId - Location ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Rankings
     */
    getClanWarRankings(locationId: number | string, options?: Object): Promise<Object>;
    /**
     * Get current challenges
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Challenges
     */
    getChallenges(options?: Object): Promise<Object>;
    /**
     * Get global tournaments
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Global tournaments
     */
    getGlobalTournaments(options?: Object): Promise<Object>;
    #private;
}
//# sourceMappingURL=ClashRoyale.d.ts.map