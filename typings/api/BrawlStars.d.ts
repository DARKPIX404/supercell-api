export default BrawlStars;
/**
 * @class BrawlStars
 * @description Handles all Brawl Stars API endpoints
 */
declare class BrawlStars {
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
     * Get player's battle log
     * @param {string} playerTag - Player tag
     * @returns {Promise<Object>} Battle log
     */
    getBattleLog(playerTag: string): Promise<Object>;
    /**
     * Get club information by tag
     * @param {string} clubTag - Club tag with or without '#'
     * @returns {Promise<Object>} Club data
     */
    getClub(clubTag: string): Promise<Object>;
    /**
     * Get club members
     * @param {string} clubTag - Club tag
     * @param {Object} [options] - Options
     * @param {number} [options.limit] - Max results
     * @param {string} [options.after] - Cursor
     * @param {string} [options.before] - Cursor
     * @returns {Promise<Object>} Club members
     */
    getClubMembers(clubTag: string, options?: {
        limit?: number | undefined;
        after?: string | undefined;
        before?: string | undefined;
    }): Promise<Object>;
    /**
     * Get list of brawlers
     * @param {Object} [options] - Options
     * @param {number} [options.limit] - Max results
     * @param {string} [options.after] - Cursor
     * @param {string} [options.before] - Cursor
     * @returns {Promise<Object>} Brawlers list
     */
    getBrawlers(options?: {
        limit?: number | undefined;
        after?: string | undefined;
        before?: string | undefined;
    }): Promise<Object>;
    /**
     * Get brawler by ID
     * @param {number|string} brawlerId - Brawler ID
     * @returns {Promise<Object>} Brawler data
     */
    getBrawler(brawlerId: number | string): Promise<Object>;
    /**
     * Get player rankings for a country
     * @param {string} countryCode - Country code (e.g. 'global', 'US')
     * @param {Object} [options] - Options
     * @param {number} [options.limit] - Max results
     * @param {string} [options.after] - Cursor
     * @param {string} [options.before] - Cursor
     * @returns {Promise<Object>} Rankings
     */
    getPlayerRankings(countryCode: string, options?: {
        limit?: number | undefined;
        after?: string | undefined;
        before?: string | undefined;
    }): Promise<Object>;
    /**
     * Get club rankings for a country
     * @param {string} countryCode - Country code
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Rankings
     */
    getClubRankings(countryCode: string, options?: Object): Promise<Object>;
    /**
     * Get brawler rankings for a country
     * @param {string} countryCode - Country code
     * @param {number|string} brawlerId - Brawler ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} Rankings
     */
    getBrawlerRankings(countryCode: string, brawlerId: number | string, options?: Object): Promise<Object>;
    /**
     * Get current and upcoming events
     * @returns {Promise<Object>} Events rotation
     */
    getEvents(): Promise<Object>;
    #private;
}
//# sourceMappingURL=BrawlStars.d.ts.map