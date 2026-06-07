# Clash Royale API

All methods are available on `client.api` when `apiType: 'clashroyale'`.

### <Badge type="info">GET</Badge> `getPlayer(tag)`

Fetch player information by tag.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Player tag (e.g. `"#2PP"`)

**Returns** `Promise<CRPlayer>`

```typescript
const player = await client.api.getPlayer('#2PP');
console.log(player.name, player.trophies);
```

</details>

---

### <Badge type="info">GET</Badge> `getUpcomingChests(tag)`

Get player's upcoming chest cycle.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Player tag

**Returns** `Promise<UpcomingChests>`

```typescript
const chests = await client.api.getUpcomingChests('#2PP');
console.log(chests.items);
```

</details>

---

### <Badge type="info">GET</Badge> `getBattleLog(tag)`

Get recent battle log.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Player tag

**Returns** `Promise<BattleLog>`

```typescript
const battles = await client.api.getBattleLog('#2PP');
```

</details>

---

### <Badge type="info">GET</Badge> `searchClans(params)`

Search clans with filters.

<details>
<summary>View details</summary>

**Parameters**
- `params` `ClanSearchParams`

**Returns** `Promise<ClanList>`

```typescript
const clans = await client.api.searchClans({ name: 'Dark', limit: 5 });
```

</details>

---

### <Badge type="info">GET</Badge> `getClan(tag)`

Fetch clan information.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Clan tag

**Returns** `Promise<Clan>`

```typescript
const clan = await client.api.getClan('#2PP');
```

</details>

---

### <Badge type="info">GET</Badge> `getClanMembers(tag, options?)`

Get clan members with pagination.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string`
- `options?` `PaginationOptions`

**Returns** `Promise<ClanMemberList>`

```typescript
const members = await client.api.getClanMembers('#2PP', { limit: 10 });
```

</details>

---

### <Badge type="info">GET</Badge> `getClanWarLog(tag, options?)`

Get clan war log.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string`
- `options?` `PaginationOptions`

**Returns** `Promise<WarLog>`

```typescript
const log = await client.api.getClanWarLog('#2PP', { limit: 5 });
```

</details>

---

### <Badge type="info">GET</Badge> `getCurrentWar(tag)`

Get current war info.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string`

**Returns** `Promise<War>`

```typescript
const war = await client.api.getCurrentWar('#2PP');
```

</details>

---

### <Badge type="info">GET</Badge> `searchTournaments(params)`

Search tournaments.

<details>
<summary>View details</summary>

**Parameters**
- `params` `TournamentSearchParams` — `{ name?, limit? }`

**Returns** `Promise<TournamentList>`

```typescript
const tournaments = await client.api.searchTournaments({ name: 'Dark', limit: 5 });
```

</details>

---

### <Badge type="info">GET</Badge> `getTournament(tag)`

Get tournament details.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Tournament tag

**Returns** `Promise<Tournament>`

```typescript
const tournament = await client.api.getTournament('#2PP');
```

</details>

---

### <Badge type="info">GET</Badge> `getCards(options?)`

Get all cards.

<details>
<summary>View details</summary>

**Parameters**
- `options?` `PaginationOptions`

**Returns** `Promise<CardList>`

```typescript
const cards = await client.api.getCards({ limit: 10 });
```

</details>

---

### <Badge type="info">GET</Badge> `getLocations(options?)`

Get locations list.

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

Get location details.

<details>
<summary>View details</summary>

**Parameters**
- `locationId` `number`

**Returns** `Promise<Location>`

```typescript
const loc = await client.api.getLocation(57000000);
```

</details>

---

### <Badge type="info">GET</Badge> `getPlayerRankings(locationId, options?)`

Get player rankings.

<details>
<summary>View details</summary>

**Parameters**
- `locationId` `number` — `0` for global
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<PlayerRanking>>`

```typescript
const top = await client.api.getPlayerRankings(0, { limit: 10 });
```

</details>

---

### <Badge type="info">GET</Badge> `getClanRankings(locationId, options?)`

Get clan rankings.

<details>
<summary>View details</summary>

**Parameters**
- `locationId` `number`
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<ClanRanking>>`

```typescript
const top = await client.api.getClanRankings(0);
```

</details>

---

### <Badge type="info">GET</Badge> `getClanWarRankings(locationId, options?)`

Get clan war rankings.

<details>
<summary>View details</summary>

**Parameters**
- `locationId` `number`
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<WarRanking>>`

```typescript
const top = await client.api.getClanWarRankings(0);
```

</details>

---

### <Badge type="info">GET</Badge> `getChallenges(options?)`

Get current challenges.

<details>
<summary>View details</summary>

**Parameters**
- `options?` `PaginationOptions`

**Returns** `Promise<ChallengeList>`

```typescript
const challenges = await client.api.getChallenges();
```

</details>

---

### <Badge type="info">GET</Badge> `getGlobalTournaments(options?)`

Get global tournaments.

<details>
<summary>View details</summary>

**Parameters**
- `options?` `PaginationOptions`

**Returns** `Promise<TournamentList>`

```typescript
const tournaments = await client.api.getGlobalTournaments();
```

</details>
