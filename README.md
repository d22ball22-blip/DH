# Hollett Landscaping — Premium Landscaping & Property Maintenance Website

A complete, production-ready marketing website for a premium landscaping &
property maintenance company, built to build trust, rank locally, and convert
visitors into quote requests.

> **Rebranding?** Almost everything (company name, phone, email, services,
> testimonials, FAQs, service areas, social links) lives in
> [`lib/site.ts`](lib/site.ts). Change it there once and it updates everywhere.

## Tech Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS** with a custom forest-green / earth-tone design system
- **Framer Motion** for scroll reveals, counters, and micro-interactions
- `next/font` (Inter + Fraunces) and `next/image` for optimized Core Web Vitals

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Page Sections

1. **Hero** — full-bleed photo, headline, dual CTAs, trust badges
2. **Services** — six premium service cards with imagery & feature lists
3. **Why Choose Us** — six differentiators + animated stat counters
4. **Before & After Gallery** — hover-to-reveal transformations
5. **Process** — four-step timeline
6. **Service Areas** — map-style grid with local-SEO copy
7. **Testimonials** — six 5-star reviews
8. **Commercial Services** — HOAs, property managers, retail, office, industrial
9. **About** — family-owned brand story
10. **FAQ** — 15-question accordion (also emits FAQ schema)
11. **Final CTA** — conversion-focused closer
12. **Footer** — contact, quick links, services, areas, social

## Lead-Generation Features

- Sticky mobile **click-to-call** + **floating quote** bar
- Desktop **floating quote button** (appears on scroll)
- **Exit-intent** offer modal (session-aware, mobile fallback included)
- **Quote modal** wired to every CTA via a shared React context
  ([`components/providers/QuoteProvider.tsx`](components/providers/QuoteProvider.tsx))
- Contact CTAs throughout

> The quote form uses a demo submit handler. Wire `handleSubmit` in
> [`components/QuoteModal.tsx`](components/QuoteModal.tsx) to your CRM,
> email service, or form backend.

## SEO

- Rich metadata + Open Graph / Twitter cards ([`app/layout.tsx`](app/layout.tsx))
- **JSON-LD schema**: `LandscapingBusiness` (LocalBusiness) with geo, hours,
  areas served, aggregate rating & service catalog; plus `FAQPage` and `WebSite`
- `app/sitemap.ts` and `app/robots.ts`
- Semantic H1/H2/H3 hierarchy and descriptive image alt text

## Customization Cheat Sheet

| Want to change…        | Edit…                                    |
| ---------------------- | ---------------------------------------- |
| Name / phone / email   | `lib/site.ts` → `site`                   |
| Services & copy        | `lib/site.ts` → `services`               |
| Testimonials           | `lib/site.ts` → `testimonials`           |
| FAQs                   | `lib/site.ts` → `faqs`                   |
| Service areas          | `lib/site.ts` → `serviceAreas`           |
| Colors / fonts         | `tailwind.config.ts`, `app/globals.css`  |
| Gallery images         | `components/Gallery.tsx`                  |

Photography is loaded from Unsplash for the demo (configured in
`next.config.mjs`). Swap in your own images/CDN for production.

---

> _Note: the `theme/` directory contains an unrelated legacy Shopify theme and
> is excluded from the Next.js build._
