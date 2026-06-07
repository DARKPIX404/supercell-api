# Clash of Clans API

All methods are available on `client.api` when `apiType: 'clashofclans'`.

### <Badge type="info">GET</Badge> `getPlayer(tag)`

Fetch player information by tag.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Player tag (e.g. `"#2PP"`)

**Returns** `Promise<CoCPlayer>`

```typescript
const player = await client.api.getPlayer('#2PP');
console.log(player.name, player.trophies);
```

</details>

---

### <Badge type="tip">POST</Badge> `verifyPlayerToken(tag, token)`

Verify player API token.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Player tag
- `token` `string` — API token to verify

**Returns** `Promise<VerifyTokenResponse>`

```typescript
const result = await client.api.verifyPlayerToken('#2PP', 'abc123');
console.log(result.status); // 'ok' | 'invalid'
```

</details>

---

### <Badge type="info">GET</Badge> `searchClans(params)`

Search clans with filters.

<details>
<summary>View details</summary>

**Parameters**
- `params` `ClanSearchParams` — Filters:
  - `name?` `string`
  - `warFrequency?` `string`
  - `minMembers?` `number`
  - `maxMembers?` `number`
  - `minClanPoints?` `number`
  - `minClanLevel?` `number`
  - `limit?` `number`
  - `labelIds?` `string[]`

**Returns** `Promise<ClanList>`

```typescript
const clans = await client.api.searchClans({
  name: 'Dark',
  minMembers: 10,
  limit: 5
});
```

</details>

---

### <Badge type="info">GET</Badge> `getClan(tag)`

Fetch clan information by tag.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Clan tag

**Returns** `Promise<Clan>`

```typescript
const clan = await client.api.getClan('#2PP');
console.log(clan.name, clan.members);
```

</details>

---

### <Badge type="info">GET</Badge> `getClanMembers(tag, options?)`

Get clan members list with pagination.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Clan tag
- `options?` `PaginationOptions` — `{ limit?, after?, before? }`

**Returns** `Promise<ClanMemberList>`

```typescript
const members = await client.api.getClanMembers('#2PP', { limit: 10 });
```

</details>

---

### <Badge type="info">GET</Badge> `getClanWarLog(tag, options?)`

Get clan war log with pagination.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Clan tag
- `options?` `PaginationOptions`

**Returns** `Promise<WarLog>`

```typescript
const log = await client.api.getClanWarLog('#2PP', { limit: 5 });
```

</details>

---

### <Badge type="info">GET</Badge> `getCurrentWar(tag)`

Get current war information.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Clan tag

**Returns** `Promise<War>`

```typescript
const war = await client.api.getCurrentWar('#2PP');
console.log(war.state); // 'inWar' | 'preparation' | 'warEnded'
```

</details>

---

### <Badge type="info">GET</Badge> `getWarLeagueGroup(tag)`

Get Clan War League group.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Clan tag

**Returns** `Promise<WarLeagueGroup>`

```typescript
const group = await client.api.getWarLeagueGroup('#2PP');
```

</details>

---

### <Badge type="info">GET</Badge> `getWarLeagueWar(warTag)`

Get CWL war details by war tag.

<details>
<summary>View details</summary>

**Parameters**
- `warTag` `string` — War tag from league group

**Returns** `Promise<War>`

```typescript
const war = await client.api.getWarLeagueWar('#2PP9');
```

</details>

---

### <Badge type="info">GET</Badge> `getLocations(options?)`

Get list of available locations.

<details>
<summary>View details</summary>

**Parameters**
- `options?` `PaginationOptions`

**Returns** `Promise<LocationList>`

```typescript
const locations = await client.api.getLocations({ limit: 10 });
```

</details>

---

### <Badge type="info">GET</Badge> `getLocation(locationId)`

Get specific location details.

<details>
<summary>View details</summary>

**Parameters**
- `locationId` `number` — Location ID

**Returns** `Promise<Location>`

```typescript
const loc = await client.api.getLocation(32000196); // Russia
```

</details>

---

### <Badge type="info">GET</Badge> `getClanRankings(locationId, options?)`

Get clan rankings for a location.

<details>
<summary>View details</summary>

**Parameters**
- `locationId` `number` — Location ID (`0` for global)
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<ClanRanking>>`

```typescript
const top = await client.api.getClanRankings(0, { limit: 10 });
```

</details>

---

### <Badge type="info">GET</Badge> `getPlayerRankings(locationId, options?)`

Get player rankings for a location.

<details>
<summary>View details</summary>

**Parameters**
- `locationId` `number` — Location ID (`0` for global)
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<PlayerRanking>>`

```typescript
const top = await client.api.getPlayerRankings(0, { limit: 10 });
```

</details>

---

### <Badge type="info">GET</Badge> `getVersusClanRankings(locationId, options?)`

Get versus clan rankings.

<details>
<summary>View details</summary>

**Parameters**
- `locationId` `number`
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<VersusRanking>>`

```typescript
const rankings = await client.api.getVersusClanRankings(0);
```

</details>

---

### <Badge type="info">GET</Badge> `getVersusPlayerRankings(locationId, options?)`

Get versus player rankings.

<details>
<summary>View details</summary>

**Parameters**
- `locationId` `number`
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<VersusRanking>>`

```typescript
const rankings = await client.api.getVersusPlayerRankings(0);
```

</details>

---

### <Badge type="info">GET</Badge> `getCapitalRankings(locationId, options?)`

Get capital rankings for a location.

<details>
<summary>View details</summary>

**Parameters**
- `locationId` `number`
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<CapitalRanking>>`

```typescript
const rankings = await client.api.getCapitalRankings(0);
```

</details>

---

### <Badge type="info">GET</Badge> `getLeagues(options?)`

Get list of leagues.

<details>
<summary>View details</summary>

**Parameters**
- `options?` `PaginationOptions`

**Returns** `Promise<LeagueList>`

```typescript
const leagues = await client.api.getLeagues();
```

</details>

---

### <Badge type="info">GET</Badge> `getLeague(leagueId)`

Get league information.

<details>
<summary>View details</summary>

**Parameters**
- `leagueId` `number`

**Returns** `Promise<League>`

```typescript
const league = await client.api.getLeague(29000022);
```

</details>

---

### <Badge type="info">GET</Badge> `getLeagueSeasons(leagueId, options?)`

Get league seasons.

<details>
<summary>View details</summary>

**Parameters**
- `leagueId` `number`
- `options?` `PaginationOptions`

**Returns** `Promise<SeasonList>`

```typescript
const seasons = await client.api.getLeagueSeasons(29000022);
```

</details>

---

### <Badge type="info">GET</Badge> `getLeagueSeasonRankings(leagueId, seasonId, options?)`

Get season rankings for a league.

<details>
<summary>View details</summary>

**Parameters**
- `leagueId` `number`
- `seasonId` `string` — e.g. `"2025-01"`
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<PlayerRanking>>`

```typescript
const rankings = await client.api.getLeagueSeasonRankings(29000022, '2025-01');
```

</details>

---

### <Badge type="info">GET</Badge> `getPlayerLabels(options?)`

Get available player labels.

<details>
<summary>View details</summary>

**Parameters**
- `options?` `PaginationOptions`

**Returns** `Promise<LabelList>`

```typescript
const labels = await client.api.getPlayerLabels();
```

</details>

---

### <Badge type="info">GET</Badge> `getClanLabels(options?)`

Get available clan labels.

<details>
<summary>View details</summary>

**Parameters**
- `options?` `PaginationOptions`

**Returns** `Promise<LabelList>`

```typescript
const labels = await client.api.getClanLabels();
```

</details>

---

### <Badge type="info">GET</Badge> `getGoldPassSeason()`

Get current Gold Pass season.

<details>
<summary>View details</summary>

**Parameters** — None

**Returns** `Promise<GoldPassSeason>`

```typescript
const season = await client.api.getGoldPassSeason();
```

</details>

---

### <Badge type="warning">BATCH</Badge> `getPlayers(tags[])`

Fetch multiple players in parallel.

<details>
<summary>View details</summary>

**Parameters**
- `tags` `string[]` — Array of player tags

**Returns** `Promise<CoCPlayer[]>`

```typescript
const players = await client.api.getPlayers(['#2PP', '#8J8']);
// Runs requests in parallel via Promise.all
```

</details>
