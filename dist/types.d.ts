/**
 * Supported Supercell game API types
 */
export type ApiType = 'clashofclans' | 'clashroyale' | 'brawlstars';
/**
 * Client configuration options
 */
export interface ClientConfig {
    token: string;
    apiType: ApiType;
    useProxy?: boolean;
    timeout?: number;
    retries?: number;
    cacheEnabled?: boolean;
    cacheTtl?: number;
}
/**
 * HTTP request options
 */
export interface RequestOptions {
    method?: 'GET' | 'POST';
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
}
/**
 * Cache entry structure
 */
export interface CacheEntry<T> {
    data: T;
    expires: number;
}
/**
 * Player tag (with or without #)
 */
export type PlayerTag = string;
/**
 * Clan/Club tag (with or without #)
 */
export type ClanTag = string;
/**
 * Pagination options
 */
export interface PaginationOptions {
    limit?: number;
    after?: string;
    before?: string;
}
export interface CoCPlayer {
    tag: string;
    name: string;
    townHallLevel: number;
    expLevel: number;
    trophies: number;
    bestTrophies: number;
    warStars: number;
    attackWins: number;
    defenseWins: number;
    builderHallLevel?: number;
    versusTrophies?: number;
    bestVersusTrophies?: number;
    versusBattleWins?: number;
    role?: string;
    donations: number;
    donationsReceived: number;
    clan?: CoCClanBasic;
    league?: CoCLeague;
    achievements?: CoCAchievement[];
    labels?: CoCLabel[];
    troops?: CoCTroop[];
    heroes?: CoCHero[];
    spells?: CoCSpell[];
}
export interface CoCClanBasic {
    tag: string;
    name: string;
    badgeUrls: CoCBadgeUrls;
}
export interface CoCClan extends CoCClanBasic {
    type: string;
    description: string;
    location?: CoCLocation;
    clanLevel: number;
    clanPoints: number;
    clanVersusPoints: number;
    requiredTrophies: number;
    warFrequency: string;
    warWinStreak: number;
    warWins: number;
    warTies: number;
    warLosses: number;
    isWarLogPublic: boolean;
    warLeague?: CoCWarLeague;
    members: number;
    memberList?: CoCPlayer[];
    labels?: CoCLabel[];
}
export interface CoCBadgeUrls {
    small: string;
    medium: string;
    large: string;
}
export interface CoCLocation {
    id: number;
    name: string;
    isCountry: boolean;
    countryCode?: string;
}
export interface CoCLeague {
    id: number;
    name: string;
    iconUrls: CoCIconUrls;
}
export interface CoCIconUrls {
    small?: string;
    medium?: string;
    tiny?: string;
}
export interface CoCAchievement {
    name: string;
    stars: number;
    value: number;
    target: number;
    info: string;
    completionInfo?: string;
    village: string;
}
export interface CoCLabel {
    id: number;
    name: string;
    iconUrls: CoCIconUrls;
}
export interface CoCTroop {
    name: string;
    level: number;
    maxLevel: number;
    village: string;
}
export interface CoCHero extends CoCTroop {
}
export interface CoCSpell extends CoCTroop {
}
export interface CoCWarLeague {
    id: number;
    name: string;
}
export interface CoCWar {
    state: string;
    teamSize: number;
    preparationStartTime?: string;
    startTime?: string;
    endTime?: string;
    clan?: CoCWarClan;
    opponent?: CoCWarClan;
}
export interface CoCWarClan {
    tag: string;
    name: string;
    badgeUrls: CoCBadgeUrls;
    clanLevel: number;
    attacks: number;
    stars: number;
    destructionPercentage: number;
    members?: CoCWarMember[];
}
export interface CoCWarMember {
    tag: string;
    name: string;
    mapPosition: number;
    townhallLevel: number;
    opponentAttacks: number;
    bestOpponentAttack?: CoCWarAttack;
    attacks?: CoCWarAttack[];
}
export interface CoCWarAttack {
    attackerTag: string;
    defenderTag: string;
    stars: number;
    destructionPercentage: number;
    order: number;
    duration: number;
}
export interface CoCWarLeagueGroup {
    state: string;
    season: string;
    clans: CoCWarLeagueClan[];
    rounds: CoCWarLeagueRound[];
}
export interface CoCWarLeagueClan {
    tag: string;
    name: string;
    clanLevel: number;
    badgeUrls: CoCBadgeUrls;
}
export interface CoCWarLeagueRound {
    warTags: string[];
}
export interface CoCWarLeagueWar {
    state: string;
    teamSize: number;
    preparationStartTime?: string;
    startTime?: string;
    endTime?: string;
    clan?: CoCWarClan;
    opponent?: CoCWarClan;
}
export interface CoCGoldPassSeason {
    startTime: string;
    endTime: string;
}
export interface CoCClanSearchParams extends PaginationOptions {
    name?: string;
    warFrequency?: string;
    minMembers?: number;
    maxMembers?: number;
    minClanPoints?: number;
    minClanLevel?: number;
    labelIds?: string;
}
export interface CRPlayer {
    tag: string;
    name: string;
    expLevel: number;
    trophies: number;
    bestTrophies: number;
    wins: number;
    losses: number;
    battleCount: number;
    threeCrownWins: number;
    challengeCardsWon: number;
    challengeMaxWins: number;
    tournamentCardsWon: number;
    tournamentBattleCount: number;
    role?: string;
    donations: number;
    donationsReceived: number;
    totalDonations: number;
    warDayWins: number;
    clanCardsCollected: number;
    clan?: CRClanBasic;
    arena?: CRArena;
    leagueStatistics?: CRLeagueStatistics;
    badges?: CRBadge[];
    achievements?: CRAchievement[];
    cards?: CRCard[];
    currentDeck?: CRCard[];
    currentFavouriteCard?: CRCard;
    starPoints?: number;
    expPoints?: number;
}
export interface CRClanBasic {
    tag: string;
    name: string;
    badgeId: number;
}
export interface CRClan extends CRClanBasic {
    type: string;
    description: string;
    clanScore: number;
    clanWarTrophies: number;
    location?: CRLocation;
    requiredTrophies: number;
    donationsPerWeek: number;
    clanChestStatus: string;
    clanChestLevel: number;
    clanChestMaxLevel: number;
    members: number;
    memberList?: CRPlayer[];
}
export interface CRLocation {
    id: number;
    name: string;
    isCountry: boolean;
    countryCode?: string;
}
export interface CRArena {
    id: number;
    name: string;
}
export interface CRLeagueStatistics {
    currentSeason?: CRSeasonResult;
    previousSeason?: CRSeasonResult;
    bestSeason?: CRSeasonResult;
}
export interface CRSeasonResult {
    trophies: number;
    bestTrophies?: number;
    rank?: number;
}
export interface CRBadge {
    name: string;
    progress: number;
}
export interface CRAchievement {
    name: string;
    stars: number;
    value: number;
    target: number;
    info: string;
}
export interface CRCard {
    name: string;
    id: number;
    maxLevel: number;
    maxEvolutionLevel?: number;
    iconUrls?: CRIconUrls;
    count?: number;
    level?: number;
    starLevel?: number;
    evolutionLevel?: number;
    elixirCost?: number;
}
export interface CRIconUrls {
    medium?: string;
}
export interface CRClanSearchParams extends PaginationOptions {
    name?: string;
    locationId?: string;
    minMembers?: number;
    maxMembers?: number;
    minScore?: number;
}
export interface CRTournament {
    tag: string;
    name: string;
    type: string;
    status: string;
    creatorTag?: string;
    description?: string;
    capacity: number;
    maxCapacity: number;
    preparationDuration: number;
    duration: number;
    createdTime: string;
    startedTime?: string;
    endedTime?: string;
    gameMode?: CRGameMode;
    membersList?: CRTournamentMember[];
}
export interface CRGameMode {
    id: number;
    name: string;
}
export interface CRTournamentMember {
    tag: string;
    name: string;
    score: number;
    rank: number;
    clan?: CRClanBasic;
}
export interface CRChallenge {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    maxLosses: number;
    maxWins: number;
    gameMode: CRGameMode;
}
export interface CRGlobalTournament {
    tag: string;
    name: string;
    status: string;
    gameMode: CRGameMode;
}
export interface BSPlayer {
    tag: string;
    name: string;
    nameColor: string;
    icon: BSIcon;
    trophies: number;
    highestTrophies: number;
    expLevel: number;
    expPoints: number;
    isQualifiedFromChampionshipChallenge: boolean;
    '3vs3Victories': number;
    soloVictories: number;
    duoVictories: number;
    bestRoboRumbleTime: number;
    bestTimeAsBigBrawler: number;
    club?: BSClubBasic;
    brawlers?: BSBrawler[];
}
export interface BSIcon {
    id: number;
}
export interface BSClubBasic {
    tag: string;
    name: string;
}
export interface BSClub extends BSClubBasic {
    description: string;
    type: string;
    badgeId: number;
    requiredTrophies: number;
    trophies: number;
    members: BSPlayer[];
}
export interface BSBrawler {
    id: number;
    name: string;
    power: number;
    rank: number;
    trophies: number;
    highestTrophies: number;
    gears?: BSGear[];
    starPowers?: BSStarPower[];
    gadgets?: BSGadget[];
}
export interface BSGear {
    id: number;
    name: string;
    level: number;
}
export interface BSStarPower {
    id: number;
    name: string;
}
export interface BSGadget extends BSStarPower {
}
export interface BSBrawlerInfo {
    id: number;
    name: string;
    starPowers: BSStarPower[];
    gadgets: BSGadget[];
}
export interface BSEvent {
    slot: BSEventSlot;
    startTime: string;
    endTime: string;
}
export interface BSEventSlot {
    id: number;
    name: string;
    mode?: string;
    map?: string;
}
export interface BSRankingPlayer {
    tag: string;
    name: string;
    nameColor: string;
    icon: BSIcon;
    trophies: number;
    rank: number;
    club?: BSClubBasic;
}
export interface BSRankingClub {
    tag: string;
    name: string;
    badgeId: number;
    trophies: number;
    rank: number;
    memberCount: number;
}
export interface BSRankingBrawler {
    tag: string;
    name: string;
    nameColor: string;
    icon: BSIcon;
    trophies: number;
    rank: number;
    brawler: BSBrawlerRank;
}
export interface BSBrawlerRank {
    id: number;
    name: string;
    power: number;
}
//# sourceMappingURL=types.d.ts.map