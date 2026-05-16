// Shared auth helpers — JWT signing/verification using Web Crypto (Workers-compatible).

const enc = new TextEncoder();
const dec = new TextDecoder();

const b64url = (bytes) =>
  btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const b64urlDecode = (s) => {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
};

const importKey = async (secret) =>
  crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);

export async function signJWT(payload, secret, ttlSeconds = 60 * 60 * 24 * 7) {
  const header  = { alg: "HS256", typ: "JWT" };
  const now     = Math.floor(Date.now() / 1000);
  const body    = { ...payload, iat: now, exp: now + ttlSeconds };
  const h64     = b64url(enc.encode(JSON.stringify(header)));
  const p64     = b64url(enc.encode(JSON.stringify(body)));
  const data    = `${h64}.${p64}`;
  const key     = await importKey(secret);
  const sig     = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return `${data}.${b64url(sig)}`;
}

export async function verifyJWT(token, secret) {
  if (!token || token.split(".").length !== 3) return null;
  const [h64, p64, s64] = token.split(".");
  const data = `${h64}.${p64}`;
  const key  = await importKey(secret);
  const ok   = await crypto.subtle.verify("HMAC", key, b64urlDecode(s64), enc.encode(data));
  if (!ok) return null;
  const payload = JSON.parse(dec.decode(b64urlDecode(p64)));
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export function getSessionCookie(request) {
  const cookie = request.headers.get("Cookie") || "";
  const m = cookie.match(/(?:^|;\s*)jt_admin_session=([^;]+)/);
  return m ? m[1] : null;
}

export function sessionCookieHeader(token, maxAge = 60 * 60 * 24 * 7) {
  if (!token) return `jt_admin_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
  return `jt_admin_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export const json = (data, init = {}) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
  });

export const errorJson = (status, message) => json({ error: message }, { status });

// constant-time string compare
export function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export function uuid() {
  return crypto.randomUUID();
}
