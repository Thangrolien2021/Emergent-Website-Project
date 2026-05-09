# JulianTees — Production Website

> Bold streetwear, hand-drawn graphics, limited drops. Modern React storefront that
> showcases the **JulianTees** Creator-Spring catalog with full SEO, contact form
> email delivery via **Resend**, and ready-to-deploy templates for Netlify, Vercel,
> Cloudflare Pages and GitHub Pages.

---

## 🔥 What's inside

```
/app
├── backend/                # FastAPI (contact form + newsletter, MongoDB)
│   ├── server.py
│   ├── .env                # MONGO_URL, RESEND_API_KEY, RECIPIENT_EMAIL …
│   └── requirements.txt
├── frontend/               # React 19 storefront (Tailwind + shadcn/ui)
│   ├── src/components/     # Header, Hero, Categories, Products, Lookbook, About,
│   │                       # Newsletter, Contact, Footer, Logo
│   ├── src/data/products.js  # Catalog scraped from Creator-Spring
│   ├── public/             # SEO assets (favicon, robots.txt, sitemap.xml, manifest)
│   └── .env
└── deploy/                 # Drop-in serverless templates for static deploys
    ├── netlify/  (netlify.toml + functions/contact.js)
    └── vercel/   (api/contact.js)
```

---

## 1 · Local development

```bash
# Backend
cd backend
pip install -r requirements.txt
# Edit .env  → set RESEND_API_KEY (see step 3)
uvicorn server:app --reload --port 8001

# Frontend (in another terminal)
cd frontend
yarn install
yarn start              # http://localhost:3000
```

The site uses `process.env.REACT_APP_BACKEND_URL` to reach the API. Set this in
`frontend/.env` (already pre-filled for the Emergent preview).

---

## 2 · Bug-fix & improvement summary

- ✅ **Replaced** the original Vite-built single-file deliverable (which only contained
  bundled CSS/JS, opaque to edits) with a fully editable React + FastAPI codebase.
- ✅ **Removed** the TikTok logo from the bottom-left footer.
- ✅ **New brand logo** — bold red/black/white wordmark (Anton + Caveat script flourish).
  Available in SVG (`frontend/public/favicon.svg`) and rendered live at any size in
  `<Logo />`.
- ✅ **Six categories** as requested: Graphic Tees, Vintage, Travel & Surf, Streetwear,
  Minimal, Trendy Designs (+ "All Drops").
- ✅ **Live products** scraped from `https://my-store-fa717a.creator-spring.com/`
  (40+ items across 6 designs: *Find Yourself and Be That*, *Beach Club Party Time*,
  *Texas Rodeo*, *You don't always need a plan*, *You are what you watch*,
  *Welcome to America*). Each card links directly to the verified Creator-Spring
  checkout page.
- ✅ **Mobile-first** responsive layout, drawer nav, smooth scroll, micro-animations.
- ✅ **Contact form** validated on both client and server, sends to **juliantees2026@gmail.com**
  via Resend, stores a copy in MongoDB.
- ✅ **Newsletter** signup endpoint (idempotent upsert).
- ✅ Custom **toast** feedback (sonner) for success/error states.

---

## 3 · SEO improvements

- Full meta + Open Graph + Twitter card tags in `frontend/public/index.html`.
- `<title>`, `<meta name="description">`, `<meta name="keywords">`, canonical URL.
- `JSON-LD` structured data (`ClothingStore` schema with contact point).
- Semantic HTML (`<header>`, `<main>`, `<section>` with IDs, single H1, ordered H2/H3).
- Image **alt** tags everywhere (`design + product type` for all product images).
- `robots.txt` and `sitemap.xml` in `frontend/public/`.
- PWA `site.webmanifest` for installability and brand color.
- Pre-connect to Google Fonts; lazy-loaded images; minimal JS bundle (no unused libs).
- Smooth-scroll, semantic anchors `#shop`, `#categories`, `#about`, `#contact`.

---

## 4 · Resend email setup (required for contact form)

1. Create a free account → https://resend.com
2. Verify a sending domain (or use `onboarding@resend.dev` for testing — only delivers
   to your verified Resend account email).
3. Create an API key (`re_...`).
4. Edit `backend/.env`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
   SENDER_EMAIL=JulianTees <hello@your-verified-domain.com>
   RECIPIENT_EMAIL=juliantees2026@gmail.com
   ```
5. Restart backend (`sudo supervisorctl restart backend` on Emergent).
6. Until a key is set, contact messages are still saved in MongoDB and the form
   returns success — the API just skips email delivery.

---

## 5 · Analytics setup

Placeholders are wired in `frontend/.env`. Once you create the accounts, paste the
IDs and rebuild — the scripts inject themselves at runtime.

| Service | How to get an ID | Env var |
|---|---|---|
| **Google Analytics 4** | analytics.google.com → Admin → Create property → Web stream → copy `G-XXXXXXXXXX` | `REACT_APP_GA_ID` |
| **Google Search Console** | search.google.com/search-console → Add property → verify via DNS or HTML tag | (verification only — no env var) |
| **Meta Pixel** | business.facebook.com → Events Manager → Connect data sources → Web → Pixel → copy 15-digit ID | `REACT_APP_META_PIXEL_ID` |
| **Pinterest Tag** | ads.pinterest.com → Conversions → Create new tag → copy ID | `REACT_APP_PINTEREST_TAG_ID` |

---

## 6 · Deployment

### Netlify (recommended — has built-in functions for the contact form)

```bash
cp deploy/netlify/netlify.toml ./
cp -r deploy/netlify/functions ./netlify/functions
cd frontend && yarn build
# Either drag-and-drop the `frontend/build` folder onto Netlify,
# or `netlify deploy --prod`
```

Set environment variables in **Site settings → Environment variables**:
- `RESEND_API_KEY`, `RECIPIENT_EMAIL`, `SENDER_EMAIL`
- `REACT_APP_BACKEND_URL` = your Netlify site URL (e.g. `https://juliantees.netlify.app`)
- `REACT_APP_GA_ID`, `REACT_APP_META_PIXEL_ID`, `REACT_APP_PINTEREST_TAG_ID`

### Vercel

```bash
cp -r deploy/vercel/api ./api
cd frontend && yarn build
vercel --prod
```

Same env vars as above. Vercel auto-detects `/api/contact.js` as a serverless function.

### Cloudflare Pages

1. Connect the repo → Build command `cd frontend && yarn build`, output dir
   `frontend/build`.
2. For the contact endpoint, port `deploy/vercel/api/contact.js` to a
   `functions/api/contact.js` Pages Function (same body, export `onRequestPost`).

### GitHub Pages (static only — no contact-form server)

```bash
cd frontend && yarn build
# push the build/ folder to a `gh-pages` branch
```

For GH Pages there is no serverless layer — point the form at Formspree
(`https://formspree.io/f/xyz` to `juliantees2026@gmail.com`) or remove the form.

---

## 7 · Testing

- API: `curl -X POST $REACT_APP_BACKEND_URL/api/contact -H 'content-type: application/json' -d '{"name":"Test","email":"a@b.com","message":"hi"}'`
- Frontend: visit `/`, click "Shop the drop", filter categories, submit the contact
  form. Look for green toast.

---

## 8 · License & credits

- Product images & checkout: © Creator-Spring / JulianTees.
- Photography: Unsplash (free use).
- Code: MIT — do whatever you want, just ship something dope.
