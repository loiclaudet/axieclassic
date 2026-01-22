# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Axie Classic Leaderboard & Stats - a Next.js web application for tracking Axie Infinity Classic arena leaderboards, player statistics, guild rankings, and battle histories.

## Commands

```bash
pnpm dev      # Start development server (http://localhost:3000)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router (T3 Stack)
- **Language**: TypeScript (strict mode with `noUncheckedIndexedAccess`)
- **Styling**: Tailwind CSS with custom theme colors (cream, mystic, peach, salmon, seafoam-green)
- **UI**: Radix UI primitives + Shadcn/ui components
- **Path alias**: `~/*` maps to `./src/*`

### Key Directories
- `src/app/` - Next.js App Router pages (uses Server Components by default)
- `src/components/ui/` - Base UI components (Radix/Shadcn wrappers)
- `src/components/` - Feature-specific components
- `src/data/` - Data fetching functions (server-side)
- `src/lib/` - Utilities, types, and constants
- `src/hook/` - Custom React hooks

### API Integration Pattern

The app fetches data from Axie Classic/Sky Mavis APIs with a rate-limited queue system:

1. **Rate limiting**: 5 requests/second per API key, managed via `p-queue` in `src/lib/apiQueue.ts`
2. **Key rotation**: Multiple API keys (4 in production) rotate via `src/lib/apiKeys.ts`
3. **Retry logic**: Exponential backoff (2^n seconds) with 3 retries in `src/data/index.ts`
4. **Caching**: 180-second revalidation for most data

API endpoints used:
- `https://axie-classic.skymavis.com/v1/` - Leaderboard, seasons
- `https://api-gateway.skymavis.com/classic/v1/` - Battles, profiles (requires X-API-Key header)
- `https://api-gateway.skymavis.com/graphql/axie-marketplace` - Axie details

### Data Flow
```
API Endpoints → Rate-limited Queue (p-queue) → Data Functions (src/data/) → Server Components → Client Hydration
```

### Type Definitions

All API response types are defined in `src/lib/definitions.ts`. Key types:
- `Player`, `RankedUser`, `Profile` - Player data
- `Battle`, `BattleWithProfiles` - Battle records
- `Guild`, `RankedGuild`, `GuildUser` - Guild data
- `Axie`, `AxiePart`, `AxieClass` - Axie data
- `APIError` - Discriminated union for error handling

### Environment Variables

Required in `.env.local`:
```
X_API_KEY_1=...  # Obtain from Ronin Developer Console
X_API_KEY_2=...  # Create 4 applications to get 4 keys
X_API_KEY_3=...
X_API_KEY_4=...
NEXT_PUBLIC_POSTHOG_KEY=...  # Optional analytics
NEXT_PUBLIC_POSTHOG_HOST=...
```

### Important Constants (`src/lib/constant.ts`)
- `MAXIMUM_PLAYERS_API_LIMIT = 50` - API limit for batch profile requests
- `X_RATELIMIT_LIMIT_SECOND = 5` - Rate limit per second per key
- `SEASON_CHAMPIONSHIP_QUALIFIED = 16` - Top players for championship
