# Getting Started

## Installation

::: code-group

```bash [npm]
npm install @vladnet14/supercell-api
```

```bash [pnpm]
pnpm add @vladnet14/supercell-api
```

```bash [yarn]
yarn add @vladnet14/supercell-api
```

:::

## Quick Start

```typescript
import { SupercellClient } from '@vladnet14/supercell-api';

const client = new SupercellClient({
  token: 'YOUR_API_TOKEN',
  apiType: 'clashofclans', // 'clashroyale' | 'brawlstars'
  useProxy: false,
  cacheEnabled: true,
  cacheTtl: 60000,
});

// Single player
const player = await client.api.getPlayer('#PLAYER_TAG');

// Batch fetch
const players = await client.api.getPlayers(['#TAG1', '#TAG2', '#TAG3']);

// Clear cache when needed
client.clearCache();
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `token` | `string` | — | Your Supercell API token |
| `apiType` | `'clashofclans' \| 'clashroyale' \| 'brawlstars'` | — | Which game API to use |
| `useProxy` | `boolean` | `false` | Route through a proxy server |
| `cacheEnabled` | `boolean` | `true` | Enable in-memory caching |
| `cacheTtl` | `number` | `60000` | Cache TTL in milliseconds |
| `timeout` | `number` | `10000` | Request timeout in milliseconds |

## Getting an API Token

1. Go to the [Supercell Developer Portal](https://developer.clashofclans.com/)
2. Create an account and generate an API token
3. Whitelist your IP address
4. Pass the token to the `SupercellClient` constructor

## Next Steps

- [Interceptors](/interceptors)
- [Clash of Clans API](/api/clash-of-clans)
- [Clash Royale API](/api/clash-royale)
- [Brawl Stars API](/api/brawl-stars)
