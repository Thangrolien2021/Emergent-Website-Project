import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Send } from "lucide-react";

const SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error("Email service not configured. Add EmailJS keys to frontend/.env.");
      return;
    }
    setLoading(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: "Newsletter signup",
          reply_to:  email,
          subject:   "New newsletter subscriber",
          message:   `${email} just subscribed to JulianTees newsletter.`,
          to_email:  "juliantees2026@gmail.com",
          form_type: "Newsletter",
        },
        { publicKey: PUBLIC_KEY }
      );
      toast.success("You're in. First drop incoming.");
      setEmail("");
    } catch (err) {
      toast.error(err?.text || "Couldn't subscribe right now.");
    } finally { setLoading(false); }
  };

  return (
    <section className="py-20 diag-band relative overflow-hidden" data-testid="newsletter-section">
      <div className="max-w-4xl mx-auto px-5 lg:px-10 relative z-10 text-center">
        <h3 className="font-display text-4xl sm:text-6xl text-white" data-testid="newsletter-title">
          GET 10% OFF YOUR FIRST DROP.
        </h3>
        <p className="mt-3 text-white/90 max-w-xl mx-auto">
          Limited-run releases, behind-the-scenes sketches, and member-only discounts. No spam — only the good stuff.
        </p>
        <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" data-testid="newsletter-form">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-black/85 border-2 border-black rounded-full px-5 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
            data-testid="newsletter-input"
          />
          <button type="submit" disabled={loading} className="bg-black text-white font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center gap-2" data-testid="newsletter-submit">
            <Send size={16}/> {loading ? "Joining…" : "Join the drop"}
          </button>
        </form>
      </div>
    </section>
  );
}
