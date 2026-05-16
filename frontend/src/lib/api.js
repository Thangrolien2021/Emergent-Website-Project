// Single API client used by /drops and the admin dashboard.
// Calls relative /api/* — works on Cloudflare Pages Functions in production.
// On Emergent preview (which has no Pages Functions) calls will 404 until pushed live.

const API = "/api";
const send = async (path, opts = {}) => {
  const res = await fetch(API + path, {
    credentials: "include",
    headers: { Accept: "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  let data = null;
  try { data = await res.json(); } catch { /* may be empty */ }
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
  return data;
};

export const listDesigns = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return send(`/designs${q ? `?${q}` : ""}`);
};

export const adminLogin   = (email, password) => send("/admin/login",  { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
export const adminLogout  = ()                 => send("/admin/logout", { method: "POST" });
export const adminMe      = ()                 => send("/admin/me");
export const adminCreate  = (data)             => send("/admin/designs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
export const adminUpdate  = (id, data)         => send(`/admin/designs/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
export const adminDelete  = (id)               => send(`/admin/designs/${id}`, { method: "DELETE" });

export const adminUpload  = async (files) => {
  const fd = new FormData();
  for (const f of files) fd.append("files", f);
  const res = await fetch(`${API}/admin/upload`, { method: "POST", body: fd, credentials: "include" });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Upload failed");
  return data.files;
};
