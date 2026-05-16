// GET  /api/designs      → public list (newest first)
// POST /api/admin/designs → admin create (handled in /admin/designs.js)
import { json, errorJson } from "../_lib/auth.js";

export const onRequestGet = async ({ request, env }) => {
  if (!env.DB) return json({ designs: [] });
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const featured = url.searchParams.get("featured");
  const search   = url.searchParams.get("q");
  const limit    = Math.min(parseInt(url.searchParams.get("limit") || "60", 10), 200);

  let q = "SELECT * FROM designs";
  const where = [];
  const args  = [];
  if (category && category !== "all") { where.push("category = ?"); args.push(category); }
  if (featured === "1")               { where.push("featured = 1"); }
  if (search)                         { where.push("(LOWER(title) LIKE ? OR LOWER(tags) LIKE ? OR LOWER(description) LIKE ?)"); const s = `%${search.toLowerCase()}%`; args.push(s, s, s); }
  if (where.length) q += " WHERE " + where.join(" AND ");
  q += " ORDER BY featured DESC, datetime(created_at) DESC LIMIT ?";
  args.push(limit);

  try {
    const { results } = await env.DB.prepare(q).bind(...args).all();
    const designs = (results || []).map((r) => ({
      ...r,
      featured: !!r.featured,
      images:   safeParse(r.images, []),
      tags:     r.tags ? r.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    }));
    return json({ designs });
  } catch (e) {
    return errorJson(500, `DB error: ${e.message}`);
  }
};

function safeParse(s, fallback) { try { return JSON.parse(s); } catch { return fallback; } }
