import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Mail, Send, Loader2 } from "lucide-react";

const SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ from_name:"", reply_to:"", subject:"", message:"" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
  e.preventDefault();

  if (!form.from_name || !form.reply_to || !form.message) {
    toast.error("Please fill name, email and message.");
    return;
  }

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    toast.error("Email service not configured.");
    return;
  }

  setLoading(true);

  try {
    await emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      formRef.current,
      PUBLIC_KEY
    );

    toast.success("Message sent successfully!");

    setForm({
      from_name: "",
      reply_to: "",
      subject: "",
      message: ""
    });

    formRef.current.reset();

  } catch (err) {
    console.error(err);

    const msg =
      err?.text ||
      err?.message ||
      "Failed to send message.";

    toast.error(msg);

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

        <form ref={formRef} onSubmit={onSubmit} className="lg:col-span-3 space-y-4 p-6 lg:p-8 rounded-sm border border-border bg-card" data-testid="contact-form">
          {/* Hidden helpers so EmailJS template can use {{to_email}} / {{form_type}} */}
          <input type="hidden" name="to_email"  value="juliantees2026@gmail.com" />
          <input type="hidden" name="form_type" value="Contact form" />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Name</label>
              <input data-testid="contact-name" name="from_name" required value={form.from_name} onChange={update("from_name")}
                     className="mt-1 w-full bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Email</label>
              <input data-testid="contact-email" name="reply_to" type="email" required value={form.reply_to} onChange={update("reply_to")}
                     className="mt-1 w-full bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Subject</label>
            <input data-testid="contact-subject" name="subject" value={form.subject} onChange={update("subject")}
                   className="mt-1 w-full bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Message</label>
            <textarea data-testid="contact-message" name="message" required rows={5} value={form.message} onChange={update("message")}
                      className="mt-1 w-full bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" />
          </div>
          <button type="submit" disabled={loading} className="pill-btn !w-full justify-center" data-testid="contact-submit">
            {loading ? <Loader2 size={18} className="animate-spin"/> : <Send size={16}/>} {loading ? "Sending…" : "Send message"}
          </button>
          <p className="text-[11px] text-muted-foreground">Sent securely via EmailJS to juliantees2026@gmail.com. No spam, ever.</p>
        </form>
      </div>
    </section>
  );
}
