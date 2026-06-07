# Supercell API Client

[![npm version](https://img.shields.io/npm/v/@vladnet14/supercell-api)](https://www.npmjs.com/package/@vladnet14/supercell-api)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A comprehensive **TypeScript** library for interacting with official Supercell game APIs: **Clash of Clans**, **Clash Royale**, and **Brawl Stars**.

## Features

- 🎮 **Full API Coverage** — 50+ methods across all 3 games
- ⚡ **Rate Limiting & Auto-Retry** — Built-in throttling with exponential backoff
- 💾 **Smart Cache** — In-memory TTL cache for repeated requests
- 🔌 **Interceptors** — Request, response and error hooks
- 🛡️ **TypeScript** — Full type definitions and generic support
- 🌐 **Proxy Support** — Built-in proxies for development without static IP
- 📦 **Batch Requests** — Fetch multiple players/clans in parallel

## Installation

```bash
npm install @vladnet14/supercell-api
```

## Quick Start

```typescript
import { SupercellClient } from '@vladnet14/supercell-api';

const client = new SupercellClient({
  token: 'YOUR_API_TOKEN',
  apiType: 'clashofclans', // or 'clashroyale', 'brawlstars'
  useProxy: false,
  cacheEnabled: true,
  cacheTtl: 60000,
});

// Get player
const player = await client.api.getPlayer('#PLAYER_TAG');
console.log(`Player: ${player.name}, Level: ${player.expLevel}`);

// Get clan
const clan = await client.api.getClan('#CLAN_TAG');
console.log(`Clan: ${clan.name}, Level: ${clan.clanLevel}`);

// Batch fetch multiple players
const players = await client.api.getPlayers(['#TAG1', '#TAG2', '#TAG3']);

// Search clans
const clans = await client.api.searchClans({ name: 'CRUVO', limit: 10 });
console.log('Found clans:', clans.items?.map((c) => c.name));
```

## Configuration

```typescript
interface ClientConfig {
  token: string;              // API token from Supercell developer portal
  apiType: ApiType;           // 'clashofclans' | 'clashroyale' | 'brawlstars'
  useProxy?: boolean;         // Use RoyaleAPI proxy (default: false)
  timeout?: number;           // Request timeout in ms (default: 30000)
  retries?: number;           // Retry attempts (default: 3)
  cacheEnabled?: boolean;     // Enable caching (default: true)
  cacheTtl?: number;          // Cache TTL in ms (default: 60000)
}
```

## Interceptors

```typescript
// Log all requests
client.addRequestInterceptor((url, options) => {
  console.log(`Request: ${options.method} ${url}`);
});

// Handle errors globally
client.addErrorInterceptor((error) => {
  console.error('API Error:', error.message);
});
```

## API Reference

### Clash of Clans

| Method | Description |
|--------|-------------|
| `getPlayer(tag)` | Fetch player info |
| `verifyPlayerToken(tag, token)` | Verify player API token |
| `searchClans(params)` | Search clans with filters |
| `getClan(tag)` | Fetch clan info |
| `getClanMembers(tag, opts)` | Get clan members |
| `getClanWarLog(tag, opts)` | Get war log |
| `getCurrentWar(tag)` | Get current war |
| `getWarLeagueGroup(tag)` | Get CWL group |
| `getWarLeagueWar(warTag)` | Get CWL war |
| `getLocations(opts)` | List locations |
| `getClanRankings(locId, opts)` | Clan rankings |
| `getPlayerRankings(locId, opts)` | Player rankings |
| `getLeagues(opts)` | List leagues |
| `getGoldPassSeason()` | Current Gold Pass |
| `getPlayers(tags[])` | Batch fetch players |

### Clash Royale

| Method | Description |
|--------|-------------|
| `getPlayer(tag)` | Fetch player info |
| `getUpcomingChests(tag)` | Upcoming chests |
| `getBattleLog(tag)` | Battle log |
| `searchClans(params)` | Search clans |
| `getClan(tag)` | Fetch clan info |
| `getClanWarLog(tag, opts)` | War log |
| `getCurrentWar(tag)` | Current war |
| `searchTournaments(params)` | Search tournaments |
| `getTournament(tag)` | Tournament info |
| `getCards(opts)` | All cards |
| `getLocations(opts)` | List locations |
| `getPlayerRankings(locId, opts)` | Rankings |
| `getChallenges(opts)` | Challenges |
| `getGlobalTournaments(opts)` | Global tournaments |

### Brawl Stars

| Method | Description |
|--------|-------------|
| `getPlayer(tag)` | Fetch player info |
| `getBattleLog(tag)` | Battle log |
| `getClub(tag)` | Fetch club info |
| `getClubMembers(tag, opts)` | Club members |
| `getBrawlers(opts)` | All brawlers |
| `getBrawler(id)` | Brawler info |
| `getPlayerRankings(code, opts)` | Rankings |
| `getClubRankings(code, opts)` | Club rankings |
| `getBrawlerRankings(code, id, opts)` | Brawler rankings |
| `getEvents()` | Current events |

## Links

- 📖 [Documentation](https://darkpix404.github.io/supercell-api/)
- 💻 [GitHub](https://github.com/DARKPIX404/supercell-api)
- 📦 [npm](https://www.npmjs.com/package/@vladnet14/supercell-api)
- 💬 [Discord](https://discord.gg/dYkUJQaU6y)
- 🌐 [Website](https://darkpix.ru)

## License

Apache-2.0
