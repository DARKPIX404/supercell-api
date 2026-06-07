import { Fetcher } from '../fetcher.js';
import { Cache } from '../cache.js';
import {
  CoCPlayer,
  CoCClan,
  CoCWar,
  CoCWarLeagueGroup,
  CoCWarLeagueWar,
  CoCGoldPassSeason,
  CoCLocation,
  CoCLeague,
  CoCLabel,
  CoCClanSearchParams,
  PaginationOptions,
  PlayerTag,
  ClanTag,
} from '../types.js';

/**
 * Clash of Clans API endpoints
 */
export class ClashOfClans {
  constructor(private fetcher: Fetcher, private cache: Cache) {}

  private cacheKey(endpoint: string): string {
    return `coc:${endpoint}`;
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

  async getPlayer(playerTag: PlayerTag): Promise<CoCPlayer> {
    return this.get<CoCPlayer>(`/players/${this.formatTag(playerTag)}`);
  }

  async verifyPlayerToken(playerTag: PlayerTag, token: string): Promise<{ status: string; tag: string }> {
    return this.fetcher.fetchData(`/players/${this.formatTag(playerTag)}/verifytoken`, {
      method: 'POST',
      body: { token },
    });
  }

  // ===== CLANS =====

  async searchClans(params: CoCClanSearchParams = {}): Promise<{ items: CoCClan[]; paging?: unknown }> {
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

  async getClan(clanTag: ClanTag): Promise<CoCClan> {
    return this.get<CoCClan>(`/clans/${this.formatTag(clanTag)}`);
  }

  async getClanMembers(clanTag: ClanTag, options: PaginationOptions = {}): Promise<{ items: CoCPlayer[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/clans/${this.formatTag(clanTag)}/members${query}`);
  }

  async getClanWarLog(clanTag: ClanTag, options: PaginationOptions = {}): Promise<{ items: CoCWar[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/clans/${this.formatTag(clanTag)}/warlog${query}`);
  }

  async getCurrentWar(clanTag: ClanTag): Promise<CoCWar> {
    return this.get<CoCWar>(`/clans/${this.formatTag(clanTag)}/currentwar`);
  }

  async getWarLeagueGroup(clanTag: ClanTag): Promise<CoCWarLeagueGroup> {
    return this.get<CoCWarLeagueGroup>(`/clans/${this.formatTag(clanTag)}/currentwar/leaguegroup`);
  }

  async getWarLeagueWar(warTag: string): Promise<CoCWarLeagueWar> {
    return this.get<CoCWarLeagueWar>(`/clanwarleagues/wars/${this.formatTag(warTag)}`);
  }

  // ===== LOCATIONS =====

  async getLocations(options: PaginationOptions = {}): Promise<{ items: CoCLocation[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/locations${query}`, false);
  }

  async getLocation(locationId: number | string): Promise<CoCLocation> {
    return this.get<CoCLocation>(`/locations/${locationId}`);
  }

  async getClanRankings(locationId: number | string, options: PaginationOptions = {}): Promise<{ items: CoCClan[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/locations/${locationId}/rankings/clans${query}`, false);
  }

  async getPlayerRankings(locationId: number | string, options: PaginationOptions = {}): Promise<{ items: CoCPlayer[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/locations/${locationId}/rankings/players${query}`, false);
  }

  async getVersusClanRankings(locationId: number | string, options: PaginationOptions = {}): Promise<{ items: CoCClan[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/locations/${locationId}/rankings/versus-clans${query}`, false);
  }

  async getVersusPlayerRankings(locationId: number | string, options: PaginationOptions = {}): Promise<{ items: CoCPlayer[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/locations/${locationId}/rankings/versus-players${query}`, false);
  }

  async getCapitalRankings(locationId: number | string, options: PaginationOptions = {}): Promise<{ items: CoCClan[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/locations/${locationId}/rankings/capitals${query}`, false);
  }

  // ===== LEAGUES =====

  async getLeagues(options: PaginationOptions = {}): Promise<{ items: CoCLeague[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/leagues${query}`, false);
  }

  async getLeague(leagueId: number | string): Promise<CoCLeague> {
    return this.get<CoCLeague>(`/leagues/${leagueId}`);
  }

  async getLeagueSeasons(leagueId: number | string, options: PaginationOptions = {}): Promise<{ items: { id: string }[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/leagues/${leagueId}/seasons${query}`, false);
  }

  async getLeagueSeasonRankings(leagueId: number | string, seasonId: string, options: PaginationOptions = {}): Promise<{ items: CoCPlayer[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/leagues/${leagueId}/seasons/${seasonId}${query}`, false);
  }

  // ===== LABELS =====

  async getPlayerLabels(options: PaginationOptions = {}): Promise<{ items: CoCLabel[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/labels/players${query}`, false);
  }

  async getClanLabels(options: PaginationOptions = {}): Promise<{ items: CoCLabel[]; paging?: unknown }> {
    const query = this.buildQuery({ limit: options.limit, after: options.after, before: options.before });
    return this.get(`/labels/clans${query}`, false);
  }

  // ===== GOLD PASS =====

  async getGoldPassSeason(): Promise<CoCGoldPassSeason> {
    return this.get<CoCGoldPassSeason>('/goldpass/seasons/current');
  }

  // ===== BATCH HELPERS =====

  /**
   * Fetch multiple players at once
   */
  async getPlayers(playerTags: PlayerTag[]): Promise<CoCPlayer[]> {
    return Promise.all(playerTags.map((tag) => this.getPlayer(tag)));
  }

  /**
   * Fetch multiple clans at once
   */
  async getClans(clanTags: ClanTag[]): Promise<CoCClan[]> {
    return Promise.all(clanTags.map((tag) => this.getClan(tag)));
  }
}
