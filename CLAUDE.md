@AGENTS.md

# CNX247 Landing Page — Codebase Context

## What this project is
A single-page marketing/landing site for **CNX247**, a Nigerian SaaS business-operations platform. Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

## Stack
- **Framework:** Next.js (App Router) — see AGENTS.md warning about breaking changes
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 via `@import "tailwindcss"` in `app/globals.css`
- **Font:** Plus Jakarta Sans (loaded via `next/font/google` in `app/layout.tsx`)
- **Icons:** `lucide-react`

## Design tokens (defined in `app/globals.css` via `@theme inline`)
| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#2e937d` | Teal — main brand colour |
| `--color-accent` | `#a9cf46` | Lime green — hover/accent states |
| `--color-heading` | `#111111` | Near-black — all headings and dark backgrounds |
| `--color-body` | `#555555` | Mid-grey — body copy |
| `--color-bg-light` | `#e4f3ee` | Light teal tint — section backgrounds |
| `--color-bg-alt` | `#e7f3db` | Light green tint — alternate cards |
| `--color-surface` | `#ffffff` | White |

Use these tokens via Tailwind utilities: `text-primary`, `bg-heading`, `text-body`, etc.

## Page structure (`app/page.tsx`)
Sections render top-to-bottom in this order:

| Component | Anchor | Notes |
|---|---|---|
| `Navbar` | — | Fixed, scroll-aware, mobile drawer |
| `Hero` | — | Full-viewport, 4 floating product screenshot cards |
| `WhyCnx` | `#why` | Benefits checklist + animated app mockup |
| `Stats` | — | 4-stat social proof row |
| `Products` | `#products` | Interactive tabbed showcase of 4 product suites |
| `Pricing` | `#pricing` | 3 plans: Startup ₦10k, SMB ₦18k, Enterprise (contact) |
| `CtaSection` | `#cta` | Dark CTA with background image (`/handsAndComp.png`) |
| `Footer` | — | 4-col dark footer |
| `Features` | `#features` | **Commented out** — component exists but not rendered |

## Component map (`components/`)
| File | Role |
|---|---|
| `Navbar.tsx` | `"use client"` — scroll state + mobile menu toggle |
| `Hero.tsx` | Server component — floating cards use `animate-float` variants |
| `WhyCnx.tsx` | `"use client"` — uses `useReveal` hook |
| `Stats.tsx` | `"use client"` — uses `useReveal` hook |
| `Products.tsx` | `"use client"` — tabbed UI, 4 products, desktop sidebar + mobile stacked |
| `Pricing.tsx` | `"use client"` — desktop dark card + mobile cards, SMB highlighted by default |
| `CtaSection.tsx` | Server component |
| `Footer.tsx` | Server component |
| `Features.tsx` | Server component — **not currently used** |
| `Button.tsx` | Shared — renders `<a>` when `href` is passed, `<button>` otherwise |
| `Section.tsx` | Generic section wrapper |
| `WaveDivider.tsx` | SVG wave separator between sections |

## Shared hook (`hooks/useReveal.ts`)
`useReveal()` returns a `ref` to attach to a section. It uses `IntersectionObserver` to add the `.visible` class to every child with `.reveal` when it scrolls into view, triggering the `reveal-up` CSS animation defined in `globals.css`.

## Animation classes (defined in `globals.css`)
- `.animate-fade-in-up` / `.animate-fade-in` — entry animations for above-fold content
- `.animate-delay-{100..600}` — stagger helpers
- `.animate-float` / `.animate-float-reverse` / `.animate-float-slow` / `.animate-float-delay` — infinite floating for Hero cards
- `.animate-blob` / `.animate-blob-delay` — ambient background blobs
- `.reveal` + `.reveal.visible` — scroll-triggered reveal (requires `useReveal` hook on parent)

## Key conventions
- `"use client"` is only added when the component uses React state/effects or browser APIs
- Tailwind utility overrides in JSX use the `!` suffix (e.g. `bg-primary!`) — Tailwind v4 syntax
- All section anchors are `id` attributes on the `<section>` element
- Images in `public/` are imported directly and passed to `next/image`
- Nav links, product data, plan data, and stats are defined as local arrays at the top of each component file
- No separate data layer or API routes — purely static/marketing content

## Public assets
| File | Used in |
|---|---|
| `cnx247_logo-t.png` | Navbar, Footer |
| `memo_img.png` | Hero floating card |
| `cash_req_img.png` | Hero floating card |
| `chat_img.png` | Hero floating card |
| `announcement.png` | Hero floating card |
| `all_img.png` | Available, not currently used |
| `handsAndComp.png` | CtaSection background |


