// PATCH/DELETE /api/admin/designs/:id
import { json, errorJson } from "../../../_lib/auth.js";

export const onRequestPatch = async ({ request, env, params }) => {
  if (!env.DB) return errorJson(500, "D1 binding missing.");
  const id = params.id;
  let body;
  try { body = await request.json(); } catch { return errorJson(400, "Invalid JSON"); }

  const allowed = ["title", "description", "category", "tags", "featured", "external_url", "images"];
  const sets = [];
  const args = [];
  for (const k of allowed) {
    if (body[k] === undefined) continue;
    let v = body[k];
    if (k === "featured") v = v ? 1 : 0;
    if (k === "tags")     v = Array.isArray(v) ? v.join(",") : String(v || "");
    if (k === "images")   v = JSON.stringify(v);
    sets.push(`${k} = ?`); args.push(v);
  }
  if (!sets.length) return errorJson(400, "No fields to update.");
  sets.push("updated_at = ?"); args.push(new Date().toISOString());
  args.push(id);

  const r = await env.DB.prepare(`UPDATE designs SET ${sets.join(", ")} WHERE id = ?`).bind(...args).run();
  if (!r.meta.changes) return errorJson(404, "Design not found.");
  return json({ ok: true });
};

export const onRequestDelete = async ({ env, params }) => {
  if (!env.DB) return errorJson(500, "D1 binding missing.");
  const id = params.id;
  // Look up images to delete from R2
  const row = await env.DB.prepare("SELECT images FROM designs WHERE id = ?").bind(id).first();
  if (row && row.images && env.IMAGES) {
    try {
      const imgs = JSON.parse(row.images);
      for (const im of imgs) if (im.key) await env.IMAGES.delete(im.key);
    } catch { /* ignore */ }
  }
  const r = await env.DB.prepare("DELETE FROM designs WHERE id = ?").bind(id).run();
  if (!r.meta.changes) return errorJson(404, "Design not found.");
  return json({ ok: true });
};
