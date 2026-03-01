# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-01
**Commit:** 21277dd
**Branch:** main

## OVERVIEW

Next.js 16 (App Router) portfolio blog starter. MDX content rendered via `next-mdx-remote/rsc`, styled with Tailwind CSS v4 alpha, deployed to Vercel. Geist font family, `sugar-high` for syntax highlighting.

## STRUCTURE

```
blog/
├── app/
│   ├── blog/
│   │   ├── posts/          # MDX blog content (frontmatter: title, publishedAt, summary, image?)
│   │   ├── [slug]/page.tsx # Dynamic blog post route (generateStaticParams + JSON-LD)
│   │   ├── page.tsx        # Blog listing page
│   │   └── utils.ts        # MDX parsing, getBlogPosts(), formatDate() — fs-based, no library
│   ├── components/
│   │   ├── mdx.tsx         # CustomMDX wrapper — heading anchors, sugar-high code, custom link/image
│   │   ├── nav.tsx         # Navbar — hardcoded navItems object
│   │   ├── posts.tsx       # BlogPosts list component (sorted by publishedAt desc)
│   │   └── footer.tsx      # Footer with external links (RSS, GitHub, source)
│   ├── og/route.tsx        # Dynamic OG image generation (next/og ImageResponse)
│   ├── rss/route.ts        # RSS feed route handler (manual XML construction)
│   ├── layout.tsx          # Root layout — Geist fonts, Analytics, SpeedInsights, dark mode
│   ├── page.tsx            # Home page — portfolio intro + BlogPosts
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Sitemap generation + exports baseUrl constant
│   ├── robots.ts           # Robots.txt config
│   └── global.css          # Tailwind import + sugar-high theme vars + prose typography
├── postcss.config.js       # @tailwindcss/postcss plugin only
├── tsconfig.json
└── package.json            # pnpm, no devDependencies section
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add blog post | `app/blog/posts/*.mdx` | Frontmatter: `title`, `publishedAt`, `summary`, optional `image` |
| Edit navigation | `app/components/nav.tsx` | `navItems` object — path → name mapping |
| Change site metadata | `app/layout.tsx` | `metadata` export — title, description, openGraph |
| Change base URL | `app/sitemap.ts` | `baseUrl` constant — imported everywhere |
| Edit footer links | `app/components/footer.tsx` | Hardcoded `<a>` tags |
| Customize MDX rendering | `app/components/mdx.tsx` | `components` object maps HTML elements |
| Modify OG image | `app/og/route.tsx` | Uses `next/og` ImageResponse with `tw` prop |
| Edit syntax highlight theme | `app/global.css` | CSS custom properties `--sh-*` (light + dark) |
| Add prose styles | `app/global.css` | `.prose` class styles — all typography here |

## CONVENTIONS

- **No ESLint/Prettier config** — no linter enforced
- **TypeScript**: `strict: false`, `strictNullChecks: true` — loose but null-safe
- **No `next.config.*`** — zero Next.js config customization
- **pnpm** as package manager (pnpm-lock.yaml present)
- **`let` over `const`** for local variables — used consistently throughout
- **Named exports** for components (`export function Navbar`, `export function BlogPosts`, `export function CustomMDX`), **default export** only for pages and `Footer`
- **No hooks, no state, no client components** — entirely server-rendered
- **Absolute imports** via `app/` base path (tsconfig `baseUrl: "."`)
- **Tailwind utility classes inline** — no component-level CSS modules
- **Dark mode** via `prefers-color-scheme` media query + Tailwind `dark:` variant

## ANTI-PATTERNS (THIS PROJECT)

- `baseUrl` is exported from `app/sitemap.ts` and imported by `robots.ts`, `rss/route.ts`, `blog/[slug]/page.tsx` — do NOT duplicate this constant
- MDX frontmatter is parsed with a **custom regex parser** in `app/blog/utils.ts` — do NOT introduce gray-matter or other frontmatter libraries without refactoring all consumers
- Blog posts are read from filesystem via `fs.readdirSync` at build time — this is intentional for static generation, do NOT convert to dynamic fetching
- `cx` utility is defined inline in `layout.tsx` — not extracted to a shared util
- No tests exist — adding a test framework requires new devDependency + config

## UNIQUE STYLES

- **Heading anchors**: `createHeading()` in `mdx.tsx` generates `<a class="anchor">` with `#slug` links — CSS visibility controlled via `.prose .anchor` in `global.css`
- **RSS feed**: Hand-built XML string in route handler, not a library
- **OG images**: Use Satori/`next/og` with Tailwind `tw` prop (not `className`)
- **Content pipeline**: `parseFrontmatter()` → `getMDXFiles()` → `getMDXData()` → `getBlogPosts()` — all in `app/blog/utils.ts`

## COMMANDS

```bash
pnpm dev          # Start dev server (Next.js)
pnpm build        # Production build
pnpm start        # Start production server
```

## NOTES

- Based on Vercel's [portfolio-blog-starter](https://github.com/vercel/examples/tree/main/solutions/blog) template
- Single commit repo — no established PR/branching workflow
- Tailwind v4 alpha (`4.0.0-alpha.13`) — API may differ from stable v3 docs. No `tailwind.config.*` file; v4 uses CSS-first configuration via `@import 'tailwindcss'`
- `next-mdx-remote` v4 with `/rsc` import — server component MDX rendering, not the older client-side approach
- `@types/react` pinned via pnpm overrides to `19.2.14` — avoid version conflicts
- No `public/` directory for static assets — images would need to be added there or referenced externally
