# SpendTrak

Personal spending tracker and categorizer. PWA — runs in browser, stores data in user-selected folder via File System Access API (OPFS).

## Features

- **Dashboard** — Annual/monthly pie charts + stacked bar chart of expenses by category. Year/month filters.
- **Statement** — Full transaction table (AG Grid) with search, month/category filters, inline editing, CSV export. Duplicate detection panel with merge/remove.
- **Categories** — CRUD management: add/edit/delete categories, assign colors, set type (debit/credit), manage keywords for auto-classification.
- **Classify** — Batch-classify uncategorized transactions. Groups by description, auto-save keyword rules, one-off override.
- **Upload** — Drag-and-drop file import. Auto-detect provider or manual select. Preview with auto-classification, duplicate warnings, confirm to persist.

## Data Storage

Uses browser **File System Access API** (OPFS). On first run, user selects a `data/` directory. Handle persisted in IndexedDB for subsequent visits.

Directory structure:
```
data/
├── categories.json       # Category definitions
├── YYYY-MM.json          # Monthly transaction data
└── ...
```

All writes go directly to the user's selected directory. No server, no cloud.

## Import Providers

| Provider | File | Format |
|---|---|---|
| Barclays CSV | `.csv` | Comma-separated, Barclays UK format |
| Barclays PDF | `.pdf` (with "STATEMENT" in name) | Extracts text via pdfjs-dist |

Parser auto-detection by filename. Manual override available on upload.

Run `node parse-pdf.mjs <path-to-pdf>` for CLI-only PDF→CSV extraction.

## Auto-Classification

Transactions classified by keyword matching against category definitions. Matching is case-insensitive with word-boundary detection. Rules can be saved per transaction during reclassification — keywords are added/removed from categories automatically.

## Tech Stack

| Layer | Library |
|---|---|
| UI | React 19 |
| State | Zustand 5 |
| Routing | React Router 7 |
| Table | AG Grid Community 35 |
| Charts | Recharts 3 |
| Styling | Tailwind CSS 4 |
| PDF | pdfjs-dist 6 |
| Build | Vite 7 + TypeScript 6 |
| PWA | vite-plugin-pwa |

## Scripts

```bash
pnpm dev        # Dev server with HMR
pnpm build      # Type-check + production build
pnpm preview    # Serve production build
pnpm lint       # ESLint scan
```

## Architecture

```
src/
├── stores/           # Zustand stores (transactions, categories, UI)
├── pages/            # Route components (lazy loaded)
├── components/       # Reusable UI (Layout, DataGrid, FilterBar, etc.)
├── providers/        # File import parsers (Barclays CSV, Barclays PDF)
├── utils/            # File system, classification, style helpers
├── constants.ts      # Centralized category IDs
└── types.ts          # Core TypeScript types
```

## Category IDs

Centralized in `src/constants.ts`. Built-in categories: `housing`, `education`, `supermarket`, `restaurants`, `services`, `transport`, `health`, `shopping`, `leisure`, `transfers`, `income`, `other`. Credit-type IDs set: `income`, `salary`, `allowance`, `refunds`.
