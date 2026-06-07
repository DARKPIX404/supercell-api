import Fetcher from './Fetcher.js';

/**
 * @class ClashRoyale
 * @description Handles all Clash Royale API endpoints
 */
class ClashRoyale {
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
   * Get player's upcoming chests
   * @param {string} playerTag - Player tag
   * @returns {Promise<Object>} Upcoming chests
   */
  async getUpcomingChests(playerTag) {
    const tag = this.api.formatTag(playerTag);
    return this.#fetcher.fetchData(`/players/${tag}/upcomingchests`);
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

  // ===== CLANS =====

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
  async searchClans(params = {}) {
    const query = this.api.buildQuery(params);
    return this.#fetcher.fetchData(`/clans${query}`);
  }

  /**
   * Get clan information by tag
   * @param {string} clanTag - Clan tag with or without '#'
   * @returns {Promise<Object>} Clan data
   */
  async getClan(clanTag) {
    const tag = this.api.formatTag(clanTag);
    return this.#fetcher.fetchData(`/clans/${tag}`);
  }

  /**
   * Get clan members
   * @param {string} clanTag - Clan tag
   * @param {Object} [options] - Options
   * @param {number} [options.limit] - Max results
   * @param {string} [options.after] - Cursor
   * @param {string} [options.before] - Cursor
   * @returns {Promise<Object>} Clan members
   */
  async getClanMembers(clanTag, options = {}) {
    const tag = this.api.formatTag(clanTag);
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/clans/${tag}/members${query}`);
  }

  /**
   * Get clan war log
   * @param {string} clanTag - Clan tag
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} War log
   */
  async getClanWarLog(clanTag, options = {}) {
    const tag = this.api.formatTag(clanTag);
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/clans/${tag}/warlog${query}`);
  }

  /**
   * Get current war information
   * @param {string} clanTag - Clan tag
   * @returns {Promise<Object>} Current war data
   */
  async getCurrentWar(clanTag) {
    const tag = this.api.formatTag(clanTag);
    return this.#fetcher.fetchData(`/clans/${tag}/currentwar`);
  }

  // ===== TOURNAMENTS =====

  /**
   * Search tournaments
   * @param {Object} params - Search parameters
   * @param {string} [params.name] - Tournament name
   * @param {number} [params.limit] - Max results
   * @param {string} [params.after] - Cursor
   * @param {string} [params.before] - Cursor
   * @returns {Promise<Object>} Tournaments
   */
  async searchTournaments(params = {}) {
    const query = this.api.buildQuery(params);
    return this.#fetcher.fetchData(`/tournaments${query}`);
  }

  /**
   * Get tournament by tag
   * @param {string} tournamentTag - Tournament tag
   * @returns {Promise<Object>} Tournament data
   */
  async getTournament(tournamentTag) {
    const tag = this.api.formatTag(tournamentTag);
    return this.#fetcher.fetchData(`/tournaments/${tag}`);
  }

  // ===== CARDS =====

  /**
   * Get all cards
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Cards list
   */
  async getCards(options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/cards${query}`);
  }

  // ===== LOCATIONS =====

  /**
   * Get list of locations
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Locations list
   */
  async getLocations(options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/locations${query}`);
  }

  /**
   * Get location information
   * @param {number|string} locationId - Location ID
   * @returns {Promise<Object>} Location data
   */
  async getLocation(locationId) {
    return this.#fetcher.fetchData(`/locations/${locationId}`);
  }

  /**
   * Get player rankings for a location
   * @param {number|string} locationId - Location ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Rankings
   */
  async getPlayerRankings(locationId, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/locations/${locationId}/rankings/players${query}`);
  }

  /**
   * Get clan rankings for a location
   * @param {number|string} locationId - Location ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Rankings
   */
  async getClanRankings(locationId, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/locations/${locationId}/rankings/clans${query}`);
  }

  /**
   * Get clan war rankings for a location
   * @param {number|string} locationId - Location ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Rankings
   */
  async getClanWarRankings(locationId, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/locations/${locationId}/rankings/clanwars${query}`);
  }

  // ===== CHALLENGES =====

  /**
   * Get current challenges
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Challenges
   */
  async getChallenges(options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/challenges${query}`);
  }

  // ===== GLOBAL TOURNAMENTS =====

  /**
   * Get global tournaments
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Global tournaments
   */
  async getGlobalTournaments(options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/globaltournaments${query}`);
  }
}

export default ClashRoyale;
