/**
 * Clash of Clans API endpoints
 */
export class ClashOfClans {
    fetcher;
    cache;
    constructor(fetcher, cache) {
        this.fetcher = fetcher;
        this.cache = cache;
    }
    cacheKey(endpoint) {
        return `coc:${endpoint}`;
    }
    formatTag(tag) {
        if (!tag)
            throw new Error('Tag is required');
        return encodeURIComponent(tag.startsWith('#') ? tag : `#${tag}`);
    }
    buildQuery(params) {
        const search = new URLSearchParams();
        for (const [k, v] of Object.entries(params)) {
            if (v !== undefined && v !== null && v !== '')
                search.append(k, String(v));
        }
        const q = search.toString();
        return q ? `?${q}` : '';
    }
    async get(endpoint, useCache = true) {
        const key = this.cacheKey(endpoint);
        if (useCache) {
            const cached = this.cache.get(key);
            if (cached)
                return cached;
        }
        const data = await this.fetcher.fetchData(endpoint);
        if (useCache)
            this.cache.set(key, data);
        return data;
    }
    // ===== PLAYERS =====
    async getPlayer(playerTag) {
        return this.get(`/players/${this.formatTag(playerTag)}`);
    }
    async verifyPlayerToken(playerTag, token) {
        return this.fetcher.fetchData(`/players/${this.formatTag(playerTag)}/verifytoken`, {
            method: 'POST',
            body: { token },
        });
    }
    // ===== CLANS =====
    async searchClans(params = {}) {
        const query = this.buildQuery({
            name: params.name,
            warFrequency: params.warFrequency,
            minMembers: params.minMembers,
            maxMembers: params.maxMembers,
            minClanPoints: params.minClanPoints,
            minClanLevel: params.minClanLevel,
            limit: params.limit,
            after: params.after,
            before: params.before,
            labelIds: params.labelIds,
        });
        return this.get(`/clans${query}`, false);
    }
    async getClan(clanTag) {
        return this.get(`/clans/${this.formatTag(clanTag)}`);
    }
    async getClanMembers(clanTag, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/clans/${this.formatTag(clanTag)}/members${query}`);
    }
    async getClanWarLog(clanTag, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/clans/${this.formatTag(clanTag)}/warlog${query}`);
    }
    async getCurrentWar(clanTag) {
        return this.get(`/clans/${this.formatTag(clanTag)}/currentwar`);
    }
    async getWarLeagueGroup(clanTag) {
        return this.get(`/clans/${this.formatTag(clanTag)}/currentwar/leaguegroup`);
    }
    async getWarLeagueWar(warTag) {
        return this.get(`/clanwarleagues/wars/${this.formatTag(warTag)}`);
    }
    // ===== LOCATIONS =====
    async getLocations(options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/locations${query}`, false);
    }
    async getLocation(locationId) {
        return this.get(`/locations/${locationId}`);
    }
    async getClanRankings(locationId, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/locations/${locationId}/rankings/clans${query}`, false);
    }
    async getPlayerRankings(locationId, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/locations/${locationId}/rankings/players${query}`, false);
    }
    async getVersusClanRankings(locationId, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/locations/${locationId}/rankings/versus-clans${query}`, false);
    }
    async getVersusPlayerRankings(locationId, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/locations/${locationId}/rankings/versus-players${query}`, false);
    }
    async getCapitalRankings(locationId, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/locations/${locationId}/rankings/capitals${query}`, false);
    }
    // ===== LEAGUES =====
    async getLeagues(options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/leagues${query}`, false);
    }
    async getLeague(leagueId) {
        return this.get(`/leagues/${leagueId}`);
    }
    async getLeagueSeasons(leagueId, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/leagues/${leagueId}/seasons${query}`, false);
    }
    async getLeagueSeasonRankings(leagueId, seasonId, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/leagues/${leagueId}/seasons/${seasonId}${query}`, false);
    }
    // ===== LABELS =====
    async getPlayerLabels(options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/labels/players${query}`, false);
    }
    async getClanLabels(options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/labels/clans${query}`, false);
    }
    // ===== GOLD PASS =====
    async getGoldPassSeason() {
        return this.get('/goldpass/seasons/current');
    }
    // ===== BATCH HELPERS =====
    /**
     * Fetch multiple players at once
     */
    async getPlayers(playerTags) {
        return Promise.all(playerTags.map((tag) => this.getPlayer(tag)));
    }
    /**
     * Fetch multiple clans at once
     */
    async getClans(clanTags) {
        return Promise.all(clanTags.map((tag) => this.getClan(tag)));
    }
}
//# sourceMappingURL=clashofclans.js.map