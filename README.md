# Built by Shivank

Premium software engineering portfolio built with Next.js 15, React 19, and a product-grade frontend stack.

## Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- **Motion:** Framer Motion, Lenis
- **Theming:** next-themes (dark by default)
- **Icons:** Lucide React
- **Quality:** ESLint, Prettier

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set environment variables before deploying.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Lint the codebase |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run typecheck` | Run TypeScript checks |

## Environment

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap, and robots |
| `NEXT_PUBLIC_TWITTER_HANDLE` | Optional Twitter handle for social metadata |

## Project structure

```text
src/
├── app/                 # Routes, layout, robots, sitemap, global styles
├── assets/              # Static assets (fonts, media)
├── components/
│   ├── a11y/            # Accessibility utilities
│   ├── layout/          # Layout primitives
│   ├── providers/       # Theme, smooth scroll, app providers
│   └── ui/              # shadcn/ui components (add via CLI)
├── config/              # Site config, metadata, theme constants
├── hooks/               # Shared React hooks
├── lib/                 # Utilities (env, fonts, motion, lenis, cn)
└── types/               # Shared TypeScript types
```

## Fonts

- **Inter** is loaded via `next/font/google` for body copy.
- **General Sans** is used for display/headings when available locally, with Inter as fallback.
- To self-host General Sans, add `GeneralSans-Variable.woff2` to `src/assets/fonts/general-sans/`.

## shadcn/ui

Add components as needed:

```bash
npx shadcn@latest add button
```

Configuration lives in `components.json`.

## Design system

Design tokens are defined in `src/app/globals.css` using Tailwind v4 `@theme inline` and CSS custom properties. Layout helpers live in `src/components/layout/`.

## License

Private project.
