import { Fetcher } from '../fetcher.js';
import { Cache } from '../cache.js';
import {
  CRPlayer,
  CRClan,
  CRTournament,
  CRCard,
  CRLocation,
  CRChallenge,
  CRGlobalTournament,
  PaginationOptions,
  PlayerTag,
  ClanTag,
  CRClanSearchParams,
} from '../types.js';

/**
 * Clash Royale API endpoints
 */
export class ClashRoyale {
  constructor(private fetcher: Fetcher, private cache: Cache) {}

  private cacheKey(endpoint: string): string {
    return `cr:${endpoint}`;
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

  async getPlayer(playerTag: PlayerTag): Promise<CRPlayer> {
    return this.get<CRPlayer>(`/players/${this.formatTag(playerTag)}`);
  }

  async getUpcomingChests(playerTag: PlayerTag): Promise<{ items: { index: number; name: string }[] }> {
    return this.get(`/players/${this.formatTag(playerTag)}/upcomingchests`);
  }

  async getBattleLog(playerTag: PlayerTag): Promise<{ items: unknown[] }> {
    return this.get(`/players/${this.formatTag(playerTag)}/battlelog`, false);
  }

  // ===== CLANS =====

  async searchClans(params: CRClanSearchParams = {}): Promise<{ items: CRClan[]; paging?: unknown }> {
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

  async getClan(clanTag: ClanTag): Promise<CRClan> {
    return this.get<CRClan>(`/clans/${this.formatTag(clanTag)}`);
  }

  async getClanMembers(clanTag: ClanTag, options: PaginationOptions = {}): Promise<{ items: CRPlayer[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/clans/${this.formatTag(clanTag)}/members${query}`);
  }

  async getClanWarLog(clanTag: ClanTag, options: PaginationOptions = {}): Promise<{ items: unknown[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/clans/${this.formatTag(clanTag)}/warlog${query}`);
  }

  async getCurrentWar(clanTag: ClanTag): Promise<unknown> {
    return this.get(`/clans/${this.formatTag(clanTag)}/currentwar`);
  }

  // ===== TOURNAMENTS =====

  async searchTournaments(params: PaginationOptions & { name?: string } = {}): Promise<{ items: CRTournament[]; paging?: unknown }> {
    const query = this.buildQuery({ name: params.name, limit: params.limit, after: params.after, before: params.before });
    return this.get(`/tournaments${query}`, false);
  }

  async getTournament(tournamentTag: string): Promise<CRTournament> {
    return this.get<CRTournament>(`/tournaments/${this.formatTag(tournamentTag)}`);
  }

  // ===== CARDS =====

  async getCards(options: PaginationOptions = {}): Promise<{ items: CRCard[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/cards${query}`, false);
  }

  // ===== LOCATIONS =====

  async getLocations(options: PaginationOptions = {}): Promise<{ items: CRLocation[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/locations${query}`, false);
  }

  async getLocation(locationId: number | string): Promise<CRLocation> {
    return this.get<CRLocation>(`/locations/${locationId}`);
  }

  async getPlayerRankings(locationId: number | string, options: PaginationOptions = {}): Promise<{ items: CRPlayer[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/locations/${locationId}/rankings/players${query}`, false);
  }

  async getClanRankings(locationId: number | string, options: PaginationOptions = {}): Promise<{ items: CRClan[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/locations/${locationId}/rankings/clans${query}`, false);
  }

  async getClanWarRankings(locationId: number | string, options: PaginationOptions = {}): Promise<{ items: CRClan[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/locations/${locationId}/rankings/clanwars${query}`, false);
  }

  // ===== CHALLENGES =====

  async getChallenges(options: PaginationOptions = {}): Promise<{ items: CRChallenge[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/challenges${query}`, false);
  }

  // ===== GLOBAL TOURNAMENTS =====

  async getGlobalTournaments(options: PaginationOptions = {}): Promise<{ items: CRGlobalTournament[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/globaltournaments${query}`, false);
  }

  // ===== BATCH HELPERS =====

  async getPlayers(playerTags: PlayerTag[]): Promise<CRPlayer[]> {
    return Promise.all(playerTags.map((tag) => this.getPlayer(tag)));
  }

  async getClans(clanTags: ClanTag[]): Promise<CRClan[]> {
    return Promise.all(clanTags.map((tag) => this.getClan(tag)));
  }
}
