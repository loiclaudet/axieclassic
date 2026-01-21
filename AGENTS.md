# AxieClassic Codebase Guide

## 1. Build, Lint, and Test Commands

This project uses `pnpm` as the package manager.

### Build & Run

- **Install Dependencies:** `pnpm install`
- **Development Server:** `pnpm dev` (Runs on localhost:3000)
- **Production Build:** `pnpm build`
- **Start Production:** `pnpm start`

### Linting & Formatting

- **Lint:** `pnpm lint` (Runs Next.js ESLint config)
- **Format:** `npx prettier --write .` (Uses Prettier with Tailwind plugin)
- **Type Check:** `npx tsc --noEmit` (Run this to verify types without building)

### Testing

- **Status:** No testing framework (Jest/Vitest) is currently configured in `package.json` or present in the codebase.
- **Action:** If asked to write tests, first propose setting up a test environment (e.g., Vitest + React Testing Library) compatible with Next.js App Router.

## 2. Code Style & Conventions

### General Structure

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS + shadcn/ui (Radix UI primitives)
- **State/Data:** React Server Components (RSC) where possible, Client Components for interactivity.

### Directory Structure

- `src/app`: App Router pages, layouts, and API routes.
- `src/components`: Project-specific React components.
- `src/components/ui`: Reusable UI components (shadcn/ui pattern).
- `src/lib`: Utilities, helper functions, and type definitions.
- `src/data`: Data fetching logic.
- `src/hook`: Custom React hooks.

### Imports & Exports

- **Path Alias:** Use `~/` to refer to `src/` (e.g., `import { cn } from "~/lib/utils"`).
- **Components:**
  - `src/components/ui`: Use **Named Exports** (e.g., `export { Button }`).
  - `src/app`: Use **Default Exports** for Pages/Layouts (Next.js requirement).
  - Other components: Follow existing file patterns (mostly named exports, but check file).
- **Types:** Use `import type` for type-only imports.

### TypeScript & Types

- **Definitions:** Define types in `src/lib/definitions.ts` or co-located if specific to a component.
- **Preference:** Use `type` aliases over `interface` (consistent with `src/lib/definitions.ts`).
- **Strictness:** `noUncheckedIndexedAccess` is enabled. Handle potential `undefined` array access safely.

### Naming Conventions

- **Files:** `kebab-case.tsx` or `kebab-case.ts` (e.g., `mobile-menu.tsx`, `api-queue.ts`).
- **Components:** `PascalCase` (e.g., `Player`, `BattleDetails`).
- **Functions/Variables:** `camelCase`.
- **Types:** `PascalCase`.

### Styling (Tailwind CSS)

- Use utility classes directly in JSX.
- Use `cn()` utility (from `~/lib/utils`) for conditional class merging.
- Follow `prettier-plugin-tailwindcss` sorting (handled by auto-format).
- Use CSS variables defined in `src/styles/globals.css` for theme colors (e.g., `bg-neutral-bg-dark`).

### Error Handling

- Use `try/catch` blocks for async operations.
- Define explicit error types where possible (e.g., `APIError` in definitions).
- Use `sonner` for toast notifications on the client side.

### Libraries

- **Icons:** `react-icons` (e.g., `PiStarFourBold`, `LuExternalLink`) or `lucide-react`.
- **Functional Programming:** `fp-ts` is available but use standard TypeScript patterns unless complex functional logic is required.
- **Validation:** `zod` is available for schema validation.
