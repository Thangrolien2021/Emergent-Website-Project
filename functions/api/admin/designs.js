// POST /api/admin/designs  → create a new design record
import { uuid, json, errorJson } from "../../_lib/auth.js";

export const onRequestPost = async ({ request, env }) => {
  if (!env.DB) return errorJson(500, "D1 binding (DB) missing.");
  let body;
  try { body = await request.json(); } catch { return errorJson(400, "Invalid JSON"); }

  const { title, description = "", category = "graphic", tags = [], featured = false, external_url = "", images = [] } = body;
  if (!title || !title.trim())         return errorJson(400, "Title is required.");
  if (!Array.isArray(images) || !images.length) return errorJson(400, "At least one image is required.");

  const id  = uuid();
  const now = new Date().toISOString();
  const tagsCsv = Array.isArray(tags) ? tags.join(",") : String(tags || "");

  await env.DB.prepare(
    "INSERT INTO designs (id, title, description, category, tags, featured, external_url, images, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)"
  ).bind(id, title.trim(), description, category, tagsCsv, featured ? 1 : 0, external_url, JSON.stringify(images), now, now).run();

  return json({ ok: true, id });
};
