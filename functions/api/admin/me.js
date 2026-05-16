// GET /api/admin/me → returns current admin session (if valid)
import { getSessionCookie, verifyJWT, json, errorJson } from "../../_lib/auth.js";

export const onRequestGet = async ({ request, env }) => {
  const token   = getSessionCookie(request);
  const payload = token ? await verifyJWT(token, env.JWT_SECRET || "dev-secret") : null;
  if (!payload) return errorJson(401, "Not authenticated");
  return json({ email: payload.email, role: payload.role });
};
