// POST /api/admin/upload  (multipart/form-data with one or more "files" entries)
// Uploads each file to R2 and returns the public URLs.
import { uuid, json, errorJson } from "../../_lib/auth.js";

const SAFE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export const onRequestPost = async ({ request, env }) => {
  if (!env.IMAGES) return errorJson(500, "R2 bucket binding (IMAGES) is not configured.");

  let form;
  try { form = await request.formData(); }
  catch { return errorJson(400, "Expected multipart/form-data"); }

  const files = form.getAll("files").filter((f) => f && typeof f === "object" && f.arrayBuffer);
  if (!files.length) return errorJson(400, "No files uploaded (use field name 'files').");

  const publicBase = (env.R2_PUBLIC_URL || "").replace(/\/$/, "");
  if (!publicBase) return errorJson(500, "R2_PUBLIC_URL env var not set.");

  const uploaded = [];
  for (const f of files) {
    if (!SAFE_TYPES.includes(f.type)) {
      return errorJson(415, `Unsupported file type: ${f.type}. Use JPG/PNG/WebP/AVIF/GIF.`);
    }
    if (f.size > 8 * 1024 * 1024) {
      return errorJson(413, `File "${f.name}" exceeds 8 MB.`);
    }
    const ext  = (f.name.match(/\.[^.]+$/) || [""])[0].toLowerCase() || ".jpg";
    const key  = `designs/${Date.now()}-${uuid()}${ext}`;
    await env.IMAGES.put(key, f.stream(), {
      httpMetadata: { contentType: f.type, cacheControl: "public, max-age=31536000, immutable" },
    });
    uploaded.push({ key, url: `${publicBase}/${key}`, size: f.size, type: f.type, name: f.name });
  }
  return json({ ok: true, files: uploaded });
};
