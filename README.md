# Built by Shivank (in)

Personal engineering portfolio for **Shivank Choudhary** — a B.Tech CSE student at JUIT building full-stack web apps, AI-powered tools, and software that solves real-world problems.

Live at [builtbyshivank.com](https://builtbyshivank.com).

## Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **UI** | React 19, TypeScript, Tailwind CSS v4, shadcn/ui |
| **Motion** | Framer Motion 12, Lenis 1 |
| **Theming** | next-themes (dark by default) |
| **Icons** | Lucide React |
| **Quality** | ESLint 9, Prettier 3 |


```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set environment variables before deploying.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Lint the codebase |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run typecheck` | Run TypeScript type checks |

## Environment variables

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
│   ├── about/           # About section
│   ├── achievements/    # Achievements section
│   ├── certifications/  # Certifications section
│   ├── contact/         # Contact section
│   ├── education/       # Education section
│   ├── experience/      # Work experience section
│   ├── hero/            # Hero / landing section
│   ├── layout/          # Layout primitives (container, section wrappers)
│   ├── leadership/      # Leadership section
│   ├── providers/       # Theme, smooth scroll, app providers
│   ├── skills/          # Skills section
│   ├── ui/              # shadcn/ui components (add via CLI)
│   └── work/            # Projects / work section
├── content/             # All site copy and data (edit here to update the site)
│   ├── projects/        # Individual project files + barrel export
│   ├── about.ts
│   ├── achievements.ts
│   ├── certifications.ts
│   ├── contact.ts
│   ├── education.ts
│   ├── experience.ts
│   ├── hero.ts
│   ├── leadership.ts
│   ├── navigation.ts
│   ├── site.ts          # Global site config (title, canonical URL, credits)
│   ├── skills.ts
│   └── socials.ts
├── config/              # Metadata and theme constants
├── hooks/               # Shared React hooks
├── lib/                 # Utilities (env, fonts, motion presets, lenis, cn)
└── types/               # Shared TypeScript types
```

## Content layer

All portfolio data lives in `src/content/`. To update the site, edit the relevant file — no component changes needed.

| File | Controls |
| --- | --- |
| `site.ts` | Site title, developer name, canonical URL, footer credits |
| `hero.ts` | Eyebrow text, heading, description, badges, CTA buttons |
| `about.ts` | Bio paragraphs, values cards, milestones timeline |
| `experience.ts` | Work experience entries |
| `projects/` | Featured project cards (`marketplace`, `cyber-threat`, `hate-speech`, `weather`, `image-editor`, `portfolio`) |
| `skills.ts` | Skill categories and items |
| `education.ts` | Education entries |
| `achievements.ts` | Notable achievements |
| `certifications.ts` | Certifications |
| `leadership.ts` | Leadership and community roles |
| `contact.ts` | Contact section details |
| `socials.ts` | Social media links |
| `navigation.ts` | Nav links |

## Featured projects

| Project | Description |
| --- | --- |
| **Marketplace** | Real-time campus marketplace |
| **Cyber Threat** | Security scan and threat visualisation |
| **Hate Speech** | Automated content moderation console |
| **Weather** | Weather application |
| **Image Editor** | Browser-based image editor |
| **Portfolio** | This site |

## Fonts

- **Inter** — loaded via `next/font/google` for body copy.
- **General Sans** — used for display/headings (self-hosted). Add `GeneralSans-Variable.woff2` to `src/assets/fonts/general-sans/` to enable it; Inter is the fallback.

## shadcn/ui

Add more components as needed:

```bash
npx shadcn@latest add button
```

Configuration lives in `components.json`.

## Design system

Design tokens are defined in `src/app/globals.css` using Tailwind v4 `@theme inline` and CSS custom properties. Layout helpers live in `src/components/layout/`.

## License

Public project.
