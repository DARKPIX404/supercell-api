# Supercell API Client

A comprehensive JavaScript library for interacting with the Supercell game APIs, such as **Clash of Clans**, **Clash Royale**, and **Brawl Stars**.

## Features

- **Full API Coverage** — All endpoints for Clash of Clans, Clash Royale, and Brawl Stars
- **Rate Limiting** — Built-in request throttling to respect API limits
- **Auto-Retry** — Automatic retry with exponential backoff on failures
- **Proxy Support** — Built-in proxy support for development environments
- **TypeScript Support** — Full type definitions included
- **ESM & CommonJS** — Works with both module systems

## Installation

```bash
npm install @vladnet14/supercell-api
```

## Getting Started

```javascript
import SupercellClient from '@vladnet14/supercell-api';

const client = new SupercellClient({
  token: 'YOUR_API_TOKEN',
  apiType: 'clashofclans', // or 'clashroyale', 'brawlstars'
  useProxy: false, // set true if you don't have a static IP
});

// Get player info
const player = await client.endpoints.getPlayer('#PLAYER_TAG');
console.log(player.name, player.expLevel);

// Get clan info
const clan = await client.endpoints.getClan('#CLAN_TAG');
console.log(clan.name, clan.clanLevel);

// Search clans
const clans = await client.endpoints.searchClans({ name: 'CRUVO', limit: 10 });
console.log(clans.items.map(c => c.name));
```

## API Types

### Clash of Clans

```javascript
const client = new SupercellClient({ token: 'TOKEN', apiType: 'clashofclans' });
const api = client.endpoints;

// Players
api.getPlayer('#TAG');
api.verifyPlayerToken('#TAG', 'token');

// Clans
api.searchClans({ name: 'ClanName', limit: 10 });
api.getClan('#TAG');
api.getClanMembers('#TAG', { limit: 50 });
api.getClanWarLog('#TAG');
api.getCurrentWar('#TAG');
api.getWarLeagueGroup('#TAG');
api.getWarLeagueWar('#WAR_TAG');

// Locations
api.getLocations();
api.getLocation(locationId);
api.getClanRankings(locationId);
api.getPlayerRankings(locationId);
api.getVersusClanRankings(locationId);
api.getVersusPlayerRankings(locationId);
api.getCapitalRankings(locationId);

// Leagues
api.getLeagues();
api.getLeague(leagueId);
api.getLeagueSeasons(leagueId);
api.getLeagueSeasonRankings(leagueId, seasonId);

// Labels
api.getPlayerLabels();
api.getClanLabels();

// Gold Pass
api.getGoldPassSeason();
```

### Clash Royale

```javascript
const client = new SupercellClient({ token: 'TOKEN', apiType: 'clashroyale' });
const api = client.endpoints;

// Players
api.getPlayer('#TAG');
api.getUpcomingChests('#TAG');
api.getBattleLog('#TAG');

// Clans
api.searchClans({ name: 'ClanName' });
api.getClan('#TAG');
api.getClanMembers('#TAG');
api.getClanWarLog('#TAG');
api.getCurrentWar('#TAG');

// Tournaments
api.searchTournaments({ name: 'Tournament' });
api.getTournament('#TAG');

// Cards
api.getCards();

// Locations
api.getLocations();
api.getLocation(locationId);
api.getPlayerRankings(locationId);
api.getClanRankings(locationId);
api.getClanWarRankings(locationId);

// Challenges
api.getChallenges();

// Global Tournaments
api.getGlobalTournaments();
```

### Brawl Stars

```javascript
const client = new SupercellClient({ token: 'TOKEN', apiType: 'brawlstars' });
const api = client.endpoints;

// Players
api.getPlayer('#TAG');
api.getBattleLog('#TAG');

// Clubs
api.getClub('#TAG');
api.getClubMembers('#TAG');

// Brawlers
api.getBrawlers();
api.getBrawler(brawlerId);

// Rankings
api.getPlayerRankings('global');
api.getClubRankings('US');
api.getBrawlerRankings('global', brawlerId);

// Events
api.getEvents();
```

## Proxy Usage

If your server does not have a static IP, enable proxy mode:

```javascript
const client = new SupercellClient({
  token: 'YOUR_API_TOKEN',
  apiType: 'clashofclans',
  useProxy: true,
});
```

## License

Apache-2.0
