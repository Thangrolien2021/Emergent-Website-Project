// POST /api/admin/logout → clears session cookie
import { sessionCookieHeader, json } from "../../_lib/auth.js";

export const onRequestPost = async () =>
  json({ ok: true }, { headers: { "Set-Cookie": sessionCookieHeader(null) } });
