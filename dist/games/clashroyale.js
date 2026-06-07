/**
 * Clash Royale API endpoints
 */
export class ClashRoyale {
    fetcher;
    cache;
    constructor(fetcher, cache) {
        this.fetcher = fetcher;
        this.cache = cache;
    }
    cacheKey(endpoint) {
        return `cr:${endpoint}`;
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
    async getUpcomingChests(playerTag) {
        return this.get(`/players/${this.formatTag(playerTag)}/upcomingchests`);
    }
    async getBattleLog(playerTag) {
        return this.get(`/players/${this.formatTag(playerTag)}/battlelog`, false);
    }
    // ===== CLANS =====
    async searchClans(params = {}) {
        const query = this.buildQuery({
            name: params.name,
            locationId: params.locationId,
            minMembers: params.minMembers,
            maxMembers: params.maxMembers,
            minScore: params.minScore,
            limit: params.limit,
            after: params.after,
            before: params.before,
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
    // ===== TOURNAMENTS =====
    async searchTournaments(params = {}) {
        const query = this.buildQuery({ name: params.name, limit: params.limit, after: params.after, before: params.before });
        return this.get(`/tournaments${query}`, false);
    }
    async getTournament(tournamentTag) {
        return this.get(`/tournaments/${this.formatTag(tournamentTag)}`);
    }
    // ===== CARDS =====
    async getCards(options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/cards${query}`, false);
    }
    // ===== LOCATIONS =====
    async getLocations(options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/locations${query}`, false);
    }
    async getLocation(locationId) {
        return this.get(`/locations/${locationId}`);
    }
    async getPlayerRankings(locationId, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/locations/${locationId}/rankings/players${query}`, false);
    }
    async getClanRankings(locationId, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/locations/${locationId}/rankings/clans${query}`, false);
    }
    async getClanWarRankings(locationId, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/locations/${locationId}/rankings/clanwars${query}`, false);
    }
    // ===== CHALLENGES =====
    async getChallenges(options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/challenges${query}`, false);
    }
    // ===== GLOBAL TOURNAMENTS =====
    async getGlobalTournaments(options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/globaltournaments${query}`, false);
    }
    // ===== BATCH HELPERS =====
    async getPlayers(playerTags) {
        return Promise.all(playerTags.map((tag) => this.getPlayer(tag)));
    }
    async getClans(clanTags) {
        return Promise.all(clanTags.map((tag) => this.getClan(tag)));
    }
}
//# sourceMappingURL=clashroyale.js.map