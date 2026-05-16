# JulianTees — Cloudflare Deployment Guide

This project is structured as a **Cloudflare Pages** app with **Pages Functions** (backend),
**Cloudflare R2** (image storage) and **Cloudflare D1** (database). One-time setup takes ~10 minutes.

---

## 0 · Project structure

```
/
├── frontend/                  # React app (deployed to Cloudflare Pages)
│   ├── src/                   # UI source
│   └── public/                # static SEO assets
├── functions/                 # Cloudflare Pages Functions = serverless backend
│   ├── api/
│   │   ├── designs.js                  GET /api/designs                (public)
│   │   └── admin/
│   │       ├── _middleware.js          JWT auth guard
│   │       ├── login.js                POST /api/admin/login
│   │       ├── logout.js               POST /api/admin/logout
│   │       ├── me.js                   GET  /api/admin/me
│   │       ├── upload.js               POST /api/admin/upload          (multipart)
│   │       ├── designs.js              POST /api/admin/designs
│   │       └── designs/[id].js         PATCH/DELETE /api/admin/designs/:id
│   └── _lib/auth.js
├── migrations/
│   └── 0001_init.sql          # D1 schema
└── wrangler.toml
```

---

## 1 · Create the R2 bucket

1. Cloudflare dashboard → **R2 Object Storage** → **Create bucket** → name **`juliantees-designs`** → Standard region.
2. Open the bucket → **Settings** → **Public Access** → **Allow Access** to `r2.dev` (or attach a custom CDN domain like `cdn.juliantees.shop`).
3. Copy the resulting public URL — looks like `https://pub-xxxxxxxx.r2.dev` — keep it handy.

## 2 · Create the D1 database

In the Cloudflare dashboard:
1. **Workers & Pages** → **D1 SQL Database** → **Create database** → name **`juliantees-designs-db`**.
2. Copy the **Database ID** (long UUID) — open `wrangler.toml` and paste it into the `database_id` field.
3. Apply the schema via the dashboard's **Console** tab — paste the contents of `migrations/0001_init.sql` and **Execute**.

Or via CLI (one-time):
```bash
npm install -g wrangler
wrangler login
wrangler d1 execute juliantees-designs-db --file=migrations/0001_init.sql --remote
```

## 3 · Bind R2 + D1 to your Pages project

1. Cloudflare → **Workers & Pages** → your Pages project → **Settings** → **Functions** (or **Bindings**).
2. **R2 bucket bindings** → Add: variable name **`IMAGES`**, bucket **`juliantees-designs`**.
3. **D1 database bindings** → Add: variable name **`DB`**, database **`juliantees-designs-db`**.

## 4 · Set environment variables

Same page → **Variables and Secrets** → add the following for **Production** *and* **Preview**:

| Name | Type | Value |
|---|---|---|
| `ADMIN_EMAIL`     | Plaintext | `juliantees2026@gmail.com` |
| `ADMIN_PASSWORD`  | Secret    | **your chosen strong password** (you'll use this to log in at `/admin/login`) |
| `JWT_SECRET`      | Secret    | run `openssl rand -hex 32` and paste the result |
| `R2_PUBLIC_URL`   | Plaintext | `https://pub-<your-hash>.r2.dev` (or `https://cdn.juliantees.shop`) |
| `REACT_APP_EMAILJS_SERVICE_ID`  | Plaintext | `service_8e1lw5l` |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | Plaintext | `template_30248ap` |
| `REACT_APP_EMAILJS_PUBLIC_KEY`  | Plaintext | `27ihinb5w8wfgwldw` |

> ⚠️ **Anything that starts with `REACT_APP_` is baked into the JS bundle at build time** — re-deploy is required after changing those. The non-prefixed vars (`ADMIN_*`, `JWT_SECRET`, `R2_PUBLIC_URL`) are read at runtime by the Functions and take effect immediately.

## 5 · Build settings (must match exactly)

Cloudflare → Pages project → **Settings** → **Builds & deployments** → **Build configuration**:

| Field | Value |
|---|---|
| Framework preset           | Create React App *(or None)* |
| Build command              | `cd frontend && yarn install && yarn build` |
| Build output directory     | `frontend/build` |
| Root directory             | *(leave blank — Cloudflare will see `functions/` at repo root automatically)* |

## 6 · Push & deploy

```bash
git add .
git commit -m "Add /drops + admin dashboard with R2 + D1"
git push origin main
```

Cloudflare auto-deploys on push. Watch the build log — should finish in 2–3 minutes.

## 7 · First-time admin login

1. Visit `https://juliantees.shop/admin/login`
2. Email: `juliantees2026@gmail.com` (prefilled)
3. Password: whatever you set in `ADMIN_PASSWORD`
4. → redirects to **`/admin/dashboard`** → click **New design** → drag-drop images → fill title/category → Publish.
5. New designs appear instantly on `/drops` and as the **NEW DROPS** section on the homepage.

---

## 🆘 Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `Server is not configured — ADMIN_PASSWORD env var missing` | env var not set | Add it in Cloudflare Pages → Variables → both environments → redeploy |
| Upload returns `R2_PUBLIC_URL env var not set` | step 4 skipped | Add the public R2 URL env var → redeploy |
| Upload returns `R2 bucket binding (IMAGES) is not configured` | step 3 skipped | Bind the R2 bucket as variable `IMAGES` |
| `/drops` empty even after uploads | static cache | Hard-refresh (Cmd/Ctrl+Shift+R) — D1 reads are real-time |
| Images don't load (broken icons) | R2 bucket isn't public | Settings → Public Access → enable r2.dev or attach a custom domain |
| Admin login works locally but 401 on Cloudflare | cookie issue | Make sure your site is on HTTPS (Cloudflare gives this for free) |

---

## 💡 Recommended next steps (after first push works)

- Attach a custom CDN domain to the R2 bucket (e.g. `cdn.juliantees.shop`) so image URLs are branded
- Add Google Search Console verification and submit `/sitemap.xml`
- Run a Lighthouse audit on `/drops` after first 10 uploads
