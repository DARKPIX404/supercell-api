import Fetcher from './Fetcher.js';

/**
 * @class BrawlStars
 * @description Handles all Brawl Stars API endpoints
 */
class BrawlStars {
  #fetcher;

  /**
   * @constructor
   * @param {import('./SupercellAPI.js').default} api - SupercellAPI instance
   */
  constructor(api) {
    this.#fetcher = new Fetcher(api);
    this.api = api;
  }

  // ===== PLAYERS =====

  /**
   * Get player information by tag
   * @param {string} playerTag - Player tag with or without '#'
   * @returns {Promise<Object>} Player data
   */
  async getPlayer(playerTag) {
    const tag = this.api.formatTag(playerTag);
    return this.#fetcher.fetchData(`/players/${tag}`);
  }

  /**
   * Get player's battle log
   * @param {string} playerTag - Player tag
   * @returns {Promise<Object>} Battle log
   */
  async getBattleLog(playerTag) {
    const tag = this.api.formatTag(playerTag);
    return this.#fetcher.fetchData(`/players/${tag}/battlelog`);
  }

  // ===== CLUBS =====

  /**
   * Get club information by tag
   * @param {string} clubTag - Club tag with or without '#'
   * @returns {Promise<Object>} Club data
   */
  async getClub(clubTag) {
    const tag = this.api.formatTag(clubTag);
    return this.#fetcher.fetchData(`/clubs/${tag}`);
  }

  /**
   * Get club members
   * @param {string} clubTag - Club tag
   * @param {Object} [options] - Options
   * @param {number} [options.limit] - Max results
   * @param {string} [options.after] - Cursor
   * @param {string} [options.before] - Cursor
   * @returns {Promise<Object>} Club members
   */
  async getClubMembers(clubTag, options = {}) {
    const tag = this.api.formatTag(clubTag);
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/clubs/${tag}/members${query}`);
  }

  // ===== BRAWLERS =====

  /**
   * Get list of brawlers
   * @param {Object} [options] - Options
   * @param {number} [options.limit] - Max results
   * @param {string} [options.after] - Cursor
   * @param {string} [options.before] - Cursor
   * @returns {Promise<Object>} Brawlers list
   */
  async getBrawlers(options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/brawlers${query}`);
  }

  /**
   * Get brawler by ID
   * @param {number|string} brawlerId - Brawler ID
   * @returns {Promise<Object>} Brawler data
   */
  async getBrawler(brawlerId) {
    return this.#fetcher.fetchData(`/brawlers/${brawlerId}`);
  }

  // ===== RANKINGS =====

  /**
   * Get player rankings for a country
   * @param {string} countryCode - Country code (e.g. 'global', 'US')
   * @param {Object} [options] - Options
   * @param {number} [options.limit] - Max results
   * @param {string} [options.after] - Cursor
   * @param {string} [options.before] - Cursor
   * @returns {Promise<Object>} Rankings
   */
  async getPlayerRankings(countryCode, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/rankings/${countryCode}/players${query}`);
  }

  /**
   * Get club rankings for a country
   * @param {string} countryCode - Country code
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Rankings
   */
  async getClubRankings(countryCode, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/rankings/${countryCode}/clubs${query}`);
  }

  /**
   * Get brawler rankings for a country
   * @param {string} countryCode - Country code
   * @param {number|string} brawlerId - Brawler ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Rankings
   */
  async getBrawlerRankings(countryCode, brawlerId, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/rankings/${countryCode}/brawlers/${brawlerId}${query}`);
  }

  // ===== EVENTS =====

  /**
   * Get current and upcoming events
   * @returns {Promise<Object>} Events rotation
   */
  async getEvents() {
    return this.#fetcher.fetchData('/events/rotation');
  }
}

export default BrawlStars;
