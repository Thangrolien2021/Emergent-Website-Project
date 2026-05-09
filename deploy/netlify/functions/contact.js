# Netlify Function — POST /.netlify/functions/contact
// Drop-in replacement for the FastAPI /api/contact endpoint when deploying as
// a fully-static site on Netlify. Uses the official Resend Node SDK.
//
// 1. `npm install resend` in the project (or add to package.json).
// 2. Set env vars in Netlify dashboard: RESEND_API_KEY, RECIPIENT_EMAIL, SENDER_EMAIL.
// 3. Add a redirect in /netlify.toml:
//      [[redirects]]
//        from = "/api/contact"
//        to   = "/.netlify/functions/contact"
//        status = 200
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !message)
      return Response.json({ status: "error", message: "Missing fields" }, { status: 400 });

    const html = `
      <h2 style="color:#E63946">New JulianTees contact form</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Subject:</b> ${subject || "(none)"}</p>
      <hr/>
      <p>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || "JulianTees <onboarding@resend.dev>",
      to:   [process.env.RECIPIENT_EMAIL || "juliantees2026@gmail.com"],
      reply_to: email,
      subject: `[JulianTees Contact] ${subject || name}`,
      html,
    });
    if (error) throw error;
    return Response.json({ status: "success", id: data?.id });
  } catch (e) {
    return Response.json({ status: "error", message: e.message }, { status: 500 });
  }
};
