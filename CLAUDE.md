@AGENTS.md

# CNX247 Landing Page — Codebase Context

## What this project is
A marketing/landing site for **CNX247**, a Nigerian SaaS business-operations platform. Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**. The homepage is the main surface; there is also a `/contact` route. (A `/products` route exists in the code but is currently **disabled** — see Routes below.)

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
| `--color-muted` | `#9ca3af` | Light-grey — muted/tertiary text (e.g. footer links) |
| `--color-border` | `#e5e7eb` | Borders & hairlines |
| `--color-subtle` | `#f8fafc` | Faint off-white surfaces / hover backgrounds |
| `--color-bg-light` | `#e4f3ee` | Light teal tint — section backgrounds |
| `--color-bg-alt` | `#e7f3db` | Light green tint — alternate cards |
| `--color-surface` | `#ffffff` | White |

The neutrals (`muted`, `border`, `subtle`) live in a separate non-inline `@theme` block in `globals.css` so they're also emitted as `:root` CSS variables — usable via `var(--color-*)` inside inline `style` props (e.g. the products page dot pattern).

Use these tokens via Tailwind utilities: `text-primary`, `bg-heading`, `text-body`, etc.

## Routes (`app/`)
| Route | Files | Notes |
|---|---|---|
| `/` | `page.tsx` | Homepage — the stacked marketing sections below |
| `/contact` | `contact/page.tsx` + `contact/ContactForm.tsx` | Split-screen: dark info panel (`page.tsx`) + client-side validated form (`ContactForm.tsx`, simulated submit) |
| `/products` | `_products/page.tsx` | **Disabled.** Folder is underscore-prefixed (`app/_products/`), which Next.js excludes from routing. Re-enable with `git mv app/_products app/products`. Editorial zig-zag of the 4 suites with hand-built UI mockups (CRM, HR, Chat, Kanban). |

## Homepage structure (`app/page.tsx`)
Sections render top-to-bottom in this order:

| Component | Anchor | Notes |
|---|---|---|
| `Navbar` | — | Fixed, scroll-aware, mobile drawer |
| `Hero` | — | Full-viewport cinematic photo bg (`corporate-noir.jpeg`), Playfair serif-italic accent word, module-tag pyramid |
| `WhyCnx` | `#why` | Benefits checklist + animated app mockup |
| `Stats` | — | 4-stat social proof row |
| `Features` | `#features` | Interactive showcase of 4 product suites — desktop suite-selector + live preview, mobile accordion |
| `Pricing` | `#pricing` | 3 plans: Startup ₦10k, SMB ₦18k, Enterprise (custom) |
| `CtaSection` | `#cta` | Dark CTA with background image (`/handsAndComp.jpg`) |
| `Footer` | — | 4-col dark footer |

**`Products.tsx` is not rendered** — the file exists but its entire body is commented out. It's a dead earlier version of the suites showcase; `Features.tsx` is the live one on the homepage, and `/products` (the standalone route) is the other showcase.

## Component map (`components/`)
| File | Role |
|---|---|
| `Navbar.tsx` | `"use client"` — scroll state + mobile menu toggle; shared by all routes |
| `Hero.tsx` | Server component — cinematic photo hero (see Homepage structure) |
| `WhyCnx.tsx` | `"use client"` — uses `useReveal` hook |
| `Stats.tsx` | `"use client"` — uses `useReveal` hook |
| `Features.tsx` | `"use client"` — **the live suites showcase** on the homepage; desktop suite-selector + preview, mobile accordion; `useState` for active suite |
| `Pricing.tsx` | `"use client"` — 3 plan cards, features shown as "Everything in <prev>, plus:" diffs |
| `CtaSection.tsx` | Server component — reused on the (disabled) products page too |
| `Footer.tsx` | Server component |
| `Products.tsx` | **Dead — entire file commented out**, never imported. Superseded by `Features.tsx` + the `/products` route. |
| `Button.tsx` | Shared — renders `<a>` (Next `Link`) when `href` is passed, `<button>` otherwise |
| `Section.tsx` | Generic section wrapper (not currently used) |
| `WaveDivider.tsx` | SVG wave separator (only referenced inside the commented-out `Products.tsx`) |
| `Card.tsx` | Generic icon/title/description card (not currently used) |

## Shared hook (`hooks/useReveal.ts`)
`useReveal()` returns a `ref` to attach to a section. It uses `IntersectionObserver` to add the `.visible` class to every child with `.reveal` when it scrolls into view, triggering the `reveal-up` CSS animation defined in `globals.css`.

## Animation classes (defined in `globals.css`)
- `.animate-fade-in-up` / `.animate-fade-in` — entry animations for above-fold content
- `.animate-delay-{100..600}` — stagger helpers
- `.animate-float` / `.animate-float-reverse` / `.animate-float-slow` / `.animate-float-delay` — infinite floating (defined for card-style elements)
- `.animate-hero-zoom` — slow ambient zoom on the Hero background photo
- `.animate-blob` / `.animate-blob-delay` — ambient background blobs
- `.animate-features-in` — per-suite content transition in the `Features` showcase
- `.reveal` + `.reveal.visible` — scroll-triggered reveal (requires `useReveal` hook on parent)
- A `prefers-reduced-motion` block in `globals.css` neutralizes all of the above

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
| `corporate-noir.jpeg` | Hero background photo (imported + `next/image` blur placeholder) |
| `handsAndComp.jpg` | CtaSection background |
| `memo_img.png`, `cash_req_img.png`, `chat_img.png`, `announcement.png`, `all_img.png` | Legacy Hero card images — **no longer used** after the Hero redesign |


