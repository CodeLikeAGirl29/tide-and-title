# Tide & Title

Hyperlocal real estate insights for Destin and Okaloosa County — market analysis, HOA & condo compliance guides, and neighborhood-level coverage of the Emerald Coast.

Built with [Next.js](https://nextjs.org) (App Router) and [Sanity](https://www.sanity.io) as a headless CMS, with content authored in Sanity Studio and rendered through server-side data fetching.

## Tech stack

- **Next.js 16** (App Router, React Server Components)
- **React 19**
- **Tailwind CSS 4** — theme tokens defined in `app/globals.css`
- **Sanity 5** — embedded Studio at `/studio`, content via `next-sanity`
- **TypeScript**

## Getting started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root with your Sanity project details:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-22
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, or [http://localhost:3000/studio](http://localhost:3000/studio) for Sanity Studio to write and publish posts.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint     # eslint
```

## Project structure

```
app/
├── layout.tsx              # root layout — header, footer, fonts, metadata
├── globals.css             # Tailwind v4 theme tokens + design system
├── page.tsx                # home page — hero + article grid
├── blog/
│   └── [slug]/
│       └── page.tsx        # individual post page
└── studio/
    └── [[...tool]]/
        └── page.tsx        # embedded Sanity Studio

sanity/
├── client.ts                # frontend Sanity client (no-cache reads)
├── image.ts                  # image URL builder for frontend
├── env.ts                     # env var helpers used by config/lib
├── schemaTypes/
│   ├── index.ts             # registers schema types with Studio
│   └── post.ts               # Blog Post document schema
└── lib/
    ├── client.ts              # Sanity client used for Studio live preview
    ├── image.ts                # image URL builder for Studio preview
    └── live.ts                # sanityFetch / SanityLive (live content API)

sanity.config.ts    # Studio configuration (schema, plugins, base path)
sanity.cli.ts        # Sanity CLI configuration
```

## Content model

Posts are managed in Sanity Studio as `post` documents (`sanity/schemaTypes/post.ts`):

| Field         | Type                      | Notes                                                                                                              |
| ------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `title`       | string                    | required                                                                                                           |
| `slug`        | slug                      | generated from title, required                                                                                     |
| `category`    | string (dropdown)         | required — one of: Market Update, HOA & Condo Compliance, Financing, Insurance, Hurricane Prep, Neighborhood Guide |
| `publishedAt` | datetime                  | drives sort order and the published date shown on cards                                                            |
| `mainImage`   | image                     | optional, with hotspot cropping                                                                                    |
| `body`        | Portable Text (`block[]`) | article content, rendered with `@portabletext/react`                                                               |

The home page excerpt is generated at query time from the first ~120 characters of the post body — no separate excerpt field needed.

## Design system

The visual direction is a coastal chart / plat-map aesthetic — parchment backgrounds, hairline grid lines, and a coordinate stamp — defined as Tailwind v4 theme tokens in `app/globals.css`:

- **Color** — `ink`, `ink-soft`, `parchment`, `parchment-line`, `depth`, `buoy`
- **Type** — `font-display` (Fraunces, headlines), `font-sans` (Inter, body), `font-mono` (IBM Plex Mono, dates/coordinates/meta)

Fonts are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables consumed by the theme.

## Deployment

Deploys cleanly to [Vercel](https://vercel.com/new). Set the same three `NEXT_PUBLIC_SANITY_*` environment variables in your Vercel project settings before deploying.
