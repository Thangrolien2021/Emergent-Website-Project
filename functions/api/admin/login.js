// POST /api/admin/login  { email, password }  → sets session cookie
import { signJWT, sessionCookieHeader, json, errorJson, safeEqual } from "../../_lib/auth.js";

export const onRequestPost = async ({ request, env }) => {
  let body;
  try { body = await request.json(); } catch { return errorJson(400, "Invalid JSON"); }

  const { email = "", password = "" } = body;
  const adminEmail    = env.ADMIN_EMAIL    || "juliantees2026@gmail.com";
  const adminPassword = env.ADMIN_PASSWORD || "";

  if (!adminPassword) {
    return errorJson(500, "Server is not configured — ADMIN_PASSWORD env var missing.");
  }
  if (!safeEqual(email.toLowerCase(), adminEmail.toLowerCase()) || !safeEqual(password, adminPassword)) {
    return errorJson(401, "Invalid email or password.");
  }

  const token = await signJWT({ email: adminEmail, role: "admin" }, env.JWT_SECRET || "dev-secret");
  return json(
    { ok: true, email: adminEmail },
    { headers: { "Set-Cookie": sessionCookieHeader(token) } }
  );
};
