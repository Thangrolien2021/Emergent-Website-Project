// Vercel Serverless Function — /api/contact
// Place at /api/contact.js in a Vercel project (no folder structure needed for
// detection). Set RESEND_API_KEY, RECIPIENT_EMAIL, SENDER_EMAIL in the Vercel dashboard.
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ status: "error", message: "Method not allowed" });
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message)
    return res.status(400).json({ status: "error", message: "Missing fields" });
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || "JulianTees <onboarding@resend.dev>",
      to:   [process.env.RECIPIENT_EMAIL || "juliantees2026@gmail.com"],
      reply_to: email,
      subject: `[JulianTees Contact] ${subject || name}`,
      html: `<h2 style="color:#E63946">JulianTees — new message</h2>
             <p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Subject:</b> ${subject || "(none)"}</p><hr/>
             <p>${(message || "").replace(/\n/g, "<br/>")}</p>`,
    });
    if (error) throw error;
    return res.status(200).json({ status: "success", id: data?.id });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
}
