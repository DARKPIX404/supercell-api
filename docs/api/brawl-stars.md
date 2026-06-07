# Brawl Stars API

All methods are available on `client.api` when `apiType: 'brawlstars'`.

### <Badge type="info">GET</Badge> `getPlayer(tag)`

Fetch player information by tag.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Player tag (e.g. `"#2PP"`)

**Returns** `Promise<BSPlayer>`

```typescript
const player = await client.api.getPlayer('#2PP');
console.log(player.name, player.trophies);
```

</details>

---

### <Badge type="info">GET</Badge> `getBattleLog(tag)`

Get player's recent battle log.

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

### <Badge type="info">GET</Badge> `getClub(tag)`

Fetch club information.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string` — Club tag

**Returns** `Promise<Club>`

```typescript
const club = await client.api.getClub('#2PP');
```

</details>

---

### <Badge type="info">GET</Badge> `getClubMembers(tag, options?)`

Get club members with pagination.

<details>
<summary>View details</summary>

**Parameters**
- `tag` `string`
- `options?` `PaginationOptions`

**Returns** `Promise<ClubMemberList>`

```typescript
const members = await client.api.getClubMembers('#2PP', { limit: 10 });
```

</details>

---

### <Badge type="info">GET</Badge> `getBrawlers(options?)`

Get list of all brawlers.

<details>
<summary>View details</summary>

**Parameters**
- `options?` `PaginationOptions`

**Returns** `Promise<BrawlerList>`

```typescript
const brawlers = await client.api.getBrawlers({ limit: 10 });
```

</details>

---

### <Badge type="info">GET</Badge> `getBrawler(brawlerId)`

Get brawler details by ID.

<details>
<summary>View details</summary>

**Parameters**
- `brawlerId` `number`

**Returns** `Promise<Brawler>`

```typescript
const brawler = await client.api.getBrawler(16000000);
```

</details>

---

### <Badge type="info">GET</Badge> `getPlayerRankings(countryCode, options?)`

Get player rankings for a country.

<details>
<summary>View details</summary>

**Parameters**
- `countryCode` `string` — e.g. `"global"`, `"US"`
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<PlayerRanking>>`

```typescript
const top = await client.api.getPlayerRankings('global', { limit: 10 });
```

</details>

---

### <Badge type="info">GET</Badge> `getClubRankings(countryCode, options?)`

Get club rankings for a country.

<details>
<summary>View details</summary>

**Parameters**
- `countryCode` `string`
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<ClubRanking>>`

```typescript
const top = await client.api.getClubRankings('global');
```

</details>

---

### <Badge type="info">GET</Badge> `getBrawlerRankings(countryCode, brawlerId, options?)`

Get brawler rankings for a country.

<details>
<summary>View details</summary>

**Parameters**
- `countryCode` `string`
- `brawlerId` `number`
- `options?` `PaginationOptions`

**Returns** `Promise<RankingList<BrawlerRanking>>`

```typescript
const top = await client.api.getBrawlerRankings('US', 16000000);
```

</details>

---

### <Badge type="info">GET</Badge> `getEvents()`

Get current and upcoming events rotation.

<details>
<summary>View details</summary>

**Parameters** — None

**Returns** `Promise<EventRotation>`

```typescript
const events = await client.api.getEvents();
console.log(events.current, events.upcoming);
```

</details>

---

### <Badge type="warning">BATCH</Badge> `getPlayers(tags[])`

Fetch multiple players in parallel.

<details>
<summary>View details</summary>

**Parameters**
- `tags` `string[]`

**Returns** `Promise<BSPlayer[]>`

```typescript
const players = await client.api.getPlayers(['#2PP', '#8J8']);
// Runs requests in parallel via Promise.all
```

</details>
