import { Fetcher } from '../fetcher.js';
import { Cache } from '../cache.js';
import {
  BSPlayer,
  BSClub,
  BSBrawlerInfo,
  BSEvent,
  BSRankingPlayer,
  BSRankingClub,
  BSRankingBrawler,
  PaginationOptions,
  PlayerTag,
  ClanTag,
} from '../types.js';

/**
 * Brawl Stars API endpoints
 */
export class BrawlStars {
  constructor(private fetcher: Fetcher, private cache: Cache) {}

  private cacheKey(endpoint: string): string {
    return `bs:${endpoint}`;
  }

  private formatTag(tag: string): string {
    if (!tag) throw new Error('Tag is required');
    return encodeURIComponent(tag.startsWith('#') ? tag : `#${tag}`);
  }

  private buildQuery(params: Record<string, string | number | undefined>): string {
    const search = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== '') search.append(k, String(v));
    }
    const q = search.toString();
    return q ? `?${q}` : '';
  }

  private async get<T>(endpoint: string, useCache = true): Promise<T> {
    const key = this.cacheKey(endpoint);
    if (useCache) {
      const cached = this.cache.get<T>(key);
      if (cached) return cached;
    }
    const data = await this.fetcher.fetchData<T>(endpoint);
    if (useCache) this.cache.set(key, data);
    return data;
  }

  // ===== PLAYERS =====

  async getPlayer(playerTag: PlayerTag): Promise<BSPlayer> {
    return this.get<BSPlayer>(`/players/${this.formatTag(playerTag)}`);
  }

  async getBattleLog(playerTag: PlayerTag): Promise<{ items: unknown[] }> {
    return this.get(`/players/${this.formatTag(playerTag)}/battlelog`, false);
  }

  // ===== CLUBS =====

  async getClub(clubTag: ClanTag): Promise<BSClub> {
    return this.get<BSClub>(`/clubs/${this.formatTag(clubTag)}`);
  }

  async getClubMembers(clubTag: ClanTag, options: PaginationOptions = {}): Promise<{ items: BSPlayer[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/clubs/${this.formatTag(clubTag)}/members${query}`);
  }

  // ===== BRAWLERS =====

  async getBrawlers(options: PaginationOptions = {}): Promise<{ items: BSBrawlerInfo[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/brawlers${query}`, false);
  }

  async getBrawler(brawlerId: number | string): Promise<BSBrawlerInfo> {
    return this.get<BSBrawlerInfo>(`/brawlers/${brawlerId}`);
  }

  // ===== RANKINGS =====

  async getPlayerRankings(countryCode: string, options: PaginationOptions = {}): Promise<{ items: BSRankingPlayer[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/rankings/${countryCode}/players${query}`, false);
  }

  async getClubRankings(countryCode: string, options: PaginationOptions = {}): Promise<{ items: BSRankingClub[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/rankings/${countryCode}/clubs${query}`, false);
  }

  async getBrawlerRankings(countryCode: string, brawlerId: number | string, options: PaginationOptions = {}): Promise<{ items: BSRankingBrawler[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/rankings/${countryCode}/brawlers/${brawlerId}${query}`, false);
  }

  // ===== EVENTS =====

  async getEvents(): Promise<{ items: BSEvent[] }> {
    return this.get('/events/rotation', false);
  }

  // ===== BATCH HELPERS =====

  async getPlayers(playerTags: PlayerTag[]): Promise<BSPlayer[]> {
    return Promise.all(playerTags.map((tag) => this.getPlayer(tag)));
  }

  async getClubs(clubTags: ClanTag[]): Promise<BSClub[]> {
    return Promise.all(clubTags.map((tag) => this.getClub(tag)));
  }
}
