import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Send, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setLoading(true);
    try {
      const r = await axios.post(`${API}/contact`, form);
      if (r.data?.status === "success") {
        toast.success("Message sent. We'll be in touch.");
        setForm({ name:"", email:"", subject:"", message:"" });
      } else {
        toast.error(r.data?.message || "Something went wrong.");
      }
    } catch (err) {
      const msg = err?.response?.data?.detail || "Failed to send. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Failed to send.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 border-t border-border bg-card/30" data-testid="contact-section">
      <div className="max-w-5xl mx-auto px-5 lg:px-10 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <div className="font-script text-[hsl(var(--accent))] text-xl mb-2">— Hit us up</div>
          <h2 className="font-display text-5xl lg:text-6xl text-foreground leading-[0.9]" data-testid="contact-title">
            GET IN <br/> <span className="text-[hsl(var(--primary))]">TOUCH</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            Wholesale, collabs, custom drops, press, or just to say hey — drop us a line. We read every message and reply within 24h.
          </p>
          <a href="mailto:juliantees2026@gmail.com" className="mt-6 inline-flex items-center gap-2 text-foreground hover:text-[hsl(var(--primary))] transition-colors" data-testid="contact-email-link">
            <Mail size={18}/> juliantees2026@gmail.com
          </a>
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-3 space-y-4 p-6 lg:p-8 rounded-sm border border-border bg-card" data-testid="contact-form">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Name</label>
              <input data-testid="contact-name" required value={form.name} onChange={update("name")}
                     className="mt-1 w-full bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Email</label>
              <input data-testid="contact-email" type="email" required value={form.email} onChange={update("email")}
                     className="mt-1 w-full bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Subject</label>
            <input data-testid="contact-subject" value={form.subject} onChange={update("subject")}
                   className="mt-1 w-full bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Message</label>
            <textarea data-testid="contact-message" required rows={5} value={form.message} onChange={update("message")}
                      className="mt-1 w-full bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" />
          </div>
          <button type="submit" disabled={loading} className="pill-btn !w-full justify-center" data-testid="contact-submit">
            {loading ? <Loader2 size={18} className="animate-spin"/> : <Send size={16}/>} {loading ? "Sending…" : "Send message"}
          </button>
          <p className="text-[11px] text-muted-foreground">We respect your inbox. No spam, ever.</p>
        </form>
      </div>
    </section>
  );
}
