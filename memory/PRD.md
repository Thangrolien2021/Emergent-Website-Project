# JulianTees PRD — Updated

## What's been added this iteration (Feb 16, 2026)

**New Cloudflare-native admin/drops system** (push-to-GitHub → auto-deploys to Cloudflare Pages):

- ✅ New page `/drops` — premium gallery with hero, search, 7 category filters, featured spotlight, lazy-loaded grid, lightbox with keyboard nav, framer-motion animations, skeleton loading state, SEO meta + sitemap entry
- ✅ Homepage `<LatestDrops />` section — 6 newest uploads + "View all drops" link to `/drops`; auto-hides when zero uploads exist
- ✅ Admin login at `/admin/login` — email-locked to `juliantees2026@gmail.com`, password stored as Cloudflare secret `ADMIN_PASSWORD`, JWT-signed HttpOnly session cookie (7-day TTL)
- ✅ Admin dashboard at `/admin/dashboard` — Drag-drop multi-image upload (react-dropzone), title/description/category/tags/featured/external-buy-URL, edit & delete, toggle featured, search, image preview before publish
- ✅ Cloudflare Pages Functions backend (`/functions/api/*.js`):
  - `GET /api/designs` — public list with `?category=` and `?q=` filters
  - `POST /api/admin/login`, `POST /api/admin/logout`, `GET /api/admin/me`
  - `POST /api/admin/upload` — multipart files → Cloudflare R2 bucket
  - `POST /api/admin/designs`, `PATCH/DELETE /api/admin/designs/:id`
- ✅ Cloudflare D1 schema in `/migrations/0001_init.sql` (designs table + indexes on featured/created/category)
- ✅ Cloudflare R2 storage for images with 8 MB per-file cap, content-type whitelist, immutable cache headers
- ✅ `wrangler.toml` with R2 + D1 bindings
- ✅ Full deployment guide at `/DEPLOYMENT.md`
- ✅ Updated `frontend/public/sitemap.xml` (+/drops) and `robots.txt` (Disallow /admin/)

## Pending one-time setup (user)
1. Push code to GitHub via Emergent "Save to GitHub" button
2. In Cloudflare dashboard create R2 bucket `juliantees-designs` + enable public access
3. Create D1 database `juliantees-designs-db` + apply `migrations/0001_init.sql` + paste ID into `wrangler.toml`
4. Bind R2 (var `IMAGES`) + D1 (var `DB`) to the Pages project
5. Set env vars: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`, `R2_PUBLIC_URL` (also keep EmailJS vars)
6. Retry deployment → log in at `/admin/login` → upload first design

## Backlog
- [ ] Drag-to-reorder images in admin form
- [ ] Markdown support in design descriptions
- [ ] Bulk publish (CSV import of design metadata + ZIP of images)
- [ ] CDN custom domain (cdn.juliantees.shop) for R2
- [ ] Reduced motion media query for accessibility
