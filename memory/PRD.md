# JulianTees — Product Requirements Document

## Original problem statement
Rebuild and improve the JulianTees streetwear website. Fix all bugs, add SEO,
remove TikTok logo, redirect contact form to juliantees2026@gmail.com, build new
brand logo (bold red/black/white), add categories (Graphic Tees / Vintage /
Travel & Surf / Streetwear / Minimal / Trendy Designs), pull products from
https://my-store-fa717a.creator-spring.com/, prepare for analytics integration,
deploy to Netlify/Vercel/Cloudflare/GitHub Pages.

## Architecture
- **Frontend**: React 19 + Tailwind + shadcn/ui (sonner for toasts)
- **Backend**: FastAPI (`/api/contact`, `/api/newsletter`, `/api/health`)
- **DB**: MongoDB (contact_messages, newsletter_subs)
- **Email**: Resend (graceful degradation when RESEND_API_KEY not set — message
  still stored, response success with emailed=false)
- **Deploy templates**: Netlify functions, Vercel serverless API, Cloudflare Pages

## What's been implemented (Feb 9, 2026)
- ✅ Brand new red/black/white logo (Anton + Caveat typography)
- ✅ Hero with "WEAR WHAT YOU mean." typography, marquee announcement bar, 3 stacked product mockups
- ✅ Six category cards with Unsplash editorial covers (Graphic Tees / Vintage / Travel & Surf / Streetwear / Minimal / Trendy)
- ✅ 41 products scraped from Creator-Spring across 6 designs (Find Yourself and Be That, Beach Club Party Time, Texas Rodeo, You don't always need a plan, You are what you watch, Welcome to America)
- ✅ Filterable product grid (clicking a category card scrolls to shop + filters)
- ✅ Lookbook section with all unique designs
- ✅ About section with brand story + trust badges (free shipping, secure checkout, print-to-order, premium fabrics)
- ✅ Newsletter signup with idempotent backend
- ✅ Contact form → posts to `/api/contact` → stores in MongoDB + Resend email to juliantees2026@gmail.com
- ✅ Footer with no TikTok (removed) — Instagram, Twitter/X, YouTube, Email
- ✅ Full SEO: meta tags, OG, Twitter card, JSON-LD ClothingStore, sitemap.xml, robots.txt, web manifest
- ✅ Analytics auto-injection for GA4, Meta Pixel, Pinterest Tag (env-driven)
- ✅ Mobile menu drawer with category quick-links
- ✅ Deploy templates for Netlify (`netlify.toml` + functions) and Vercel (`api/contact.js`)
- ✅ ZIP package at /app/dist/juliantees-website-v2.zip
- ✅ 100% test pass (8 backend tests, full E2E frontend verified)

## User personas
- **Streetwear collector** (18-34) — drops-driven, mobile-first, clicks lookbook → shop
- **Wholesale / collab buyer** — uses contact form
- **Brand fan** — newsletter signup for first-drop alerts

## Backlog / next phase (P1)
- [ ] Real Resend API key + verified sender domain
- [ ] Real Google Analytics 4 + Meta Pixel + Pinterest IDs
- [ ] Product detail pages with size guide
- [ ] Stripe checkout (or keep Creator-Spring affiliate flow)
- [ ] Blog / drop calendar with RSS
- [ ] Customer reviews integration

## Backlog (P2)
- [ ] Multi-currency / geo-IP detection
- [ ] Wishlist / save-for-later
- [ ] Refer-a-friend program
- [ ] Instagram feed embed (for social proof)
