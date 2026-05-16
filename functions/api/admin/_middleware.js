// Auth guard for all /api/admin/* routes (except /api/admin/login)
import { getSessionCookie, verifyJWT, errorJson } from "../../_lib/auth.js";

export const onRequest = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Allow login + logout + me without prior auth
  if (url.pathname === "/api/admin/login" || url.pathname === "/api/admin/me" || url.pathname === "/api/admin/logout") {
    return next();
  }

  const token   = getSessionCookie(request);
  const payload = token ? await verifyJWT(token, env.JWT_SECRET || "dev-secret") : null;
  if (!payload || payload.email !== (env.ADMIN_EMAIL || "juliantees2026@gmail.com")) {
    return errorJson(401, "Unauthorized");
  }
  context.data = { admin: payload };
  return next();
};
