/**
 * Brawl Stars API endpoints
 */
export class BrawlStars {
    fetcher;
    cache;
    constructor(fetcher, cache) {
        this.fetcher = fetcher;
        this.cache = cache;
    }
    cacheKey(endpoint) {
        return `bs:${endpoint}`;
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
    async getBattleLog(playerTag) {
        return this.get(`/players/${this.formatTag(playerTag)}/battlelog`, false);
    }
    // ===== CLUBS =====
    async getClub(clubTag) {
        return this.get(`/clubs/${this.formatTag(clubTag)}`);
    }
    async getClubMembers(clubTag, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/clubs/${this.formatTag(clubTag)}/members${query}`);
    }
    // ===== BRAWLERS =====
    async getBrawlers(options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/brawlers${query}`, false);
    }
    async getBrawler(brawlerId) {
        return this.get(`/brawlers/${brawlerId}`);
    }
    // ===== RANKINGS =====
    async getPlayerRankings(countryCode, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/rankings/${countryCode}/players${query}`, false);
    }
    async getClubRankings(countryCode, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/rankings/${countryCode}/clubs${query}`, false);
    }
    async getBrawlerRankings(countryCode, brawlerId, options = {}) {
        const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
        return this.get(`/rankings/${countryCode}/brawlers/${brawlerId}${query}`, false);
    }
    // ===== EVENTS =====
    async getEvents() {
        return this.get('/events/rotation', false);
    }
    // ===== BATCH HELPERS =====
    async getPlayers(playerTags) {
        return Promise.all(playerTags.map((tag) => this.getPlayer(tag)));
    }
    async getClubs(clubTags) {
        return Promise.all(clubTags.map((tag) => this.getClub(tag)));
    }
}
//# sourceMappingURL=brawlstars.js.map