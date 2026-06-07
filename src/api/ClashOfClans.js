import Fetcher from './Fetcher.js';

/**
 * @class ClashOfClans
 * @description Handles all Clash of Clans API endpoints
 */
class ClashOfClans {
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
   * Verify player API token
   * @param {string} playerTag - Player tag
   * @param {string} token - API token to verify
   * @returns {Promise<Object>} Verification result
   */
  async verifyPlayerToken(playerTag, token) {
    const tag = this.api.formatTag(playerTag);
    return this.#fetcher.postData(`/players/${tag}/verifytoken`, { token });
  }

  // ===== CLANS =====

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
   * @param {number} [options.limit] - Max results
   * @param {string} [options.after] - Cursor
   * @param {string} [options.before] - Cursor
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

  /**
   * Get CWL group information
   * @param {string} clanTag - Clan tag
   * @returns {Promise<Object>} CWL group data
   */
  async getWarLeagueGroup(clanTag) {
    const tag = this.api.formatTag(clanTag);
    return this.#fetcher.fetchData(`/clans/${tag}/currentwar/leaguegroup`);
  }

  /**
   * Get CWL war information
   * @param {string} warTag - War tag
   * @returns {Promise<Object>} War data
   */
  async getWarLeagueWar(warTag) {
    const tag = this.api.formatTag(warTag);
    return this.#fetcher.fetchData(`/clanwarleagues/wars/${tag}`);
  }

  // ===== LOCATIONS =====

  /**
   * Get list of locations
   * @param {Object} [options] - Options
   * @param {number} [options.limit] - Max results
   * @param {string} [options.after] - Cursor
   * @param {string} [options.before] - Cursor
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
   * Get clan rankings for a location
   * @param {number|string} locationId - Location ID
   * @param {Object} [options] - Options
   * @param {number} [options.limit] - Max results
   * @param {string} [options.after] - Cursor
   * @param {string} [options.before] - Cursor
   * @returns {Promise<Object>} Rankings
   */
  async getClanRankings(locationId, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/locations/${locationId}/rankings/clans${query}`);
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
   * Get versus clan rankings for a location
   * @param {number|string} locationId - Location ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Rankings
   */
  async getVersusClanRankings(locationId, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/locations/${locationId}/rankings/versus-clans${query}`);
  }

  /**
   * Get versus player rankings for a location
   * @param {number|string} locationId - Location ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Rankings
   */
  async getVersusPlayerRankings(locationId, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/locations/${locationId}/rankings/versus-players${query}`);
  }

  /**
   * Get capital rankings for a location
   * @param {number|string} locationId - Location ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Rankings
   */
  async getCapitalRankings(locationId, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/locations/${locationId}/rankings/capitals${query}`);
  }

  // ===== LEAGUES =====

  /**
   * Get list of leagues
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Leagues list
   */
  async getLeagues(options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/leagues${query}`);
  }

  /**
   * Get league information
   * @param {number|string} leagueId - League ID
   * @returns {Promise<Object>} League data
   */
  async getLeague(leagueId) {
    return this.#fetcher.fetchData(`/leagues/${leagueId}`);
  }

  /**
   * Get league seasons
   * @param {number|string} leagueId - League ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Seasons list
   */
  async getLeagueSeasons(leagueId, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/leagues/${leagueId}/seasons${query}`);
  }

  /**
   * Get league season rankings
   * @param {number|string} leagueId - League ID
   * @param {string} seasonId - Season ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Season rankings
   */
  async getLeagueSeasonRankings(leagueId, seasonId, options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/leagues/${leagueId}/seasons/${seasonId}${query}`);
  }

  // ===== LABELS =====

  /**
   * Get player labels
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Labels list
   */
  async getPlayerLabels(options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/labels/players${query}`);
  }

  /**
   * Get clan labels
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} Labels list
   */
  async getClanLabels(options = {}) {
    const query = this.api.buildQuery(options);
    return this.#fetcher.fetchData(`/labels/clans${query}`);
  }

  // ===== GOLD PASS =====

  /**
   * Get current gold pass season
   * @returns {Promise<Object>} Gold pass data
   */
  async getGoldPassSeason() {
    return this.#fetcher.fetchData('/goldpass/seasons/current');
  }
}

export default ClashOfClans;
