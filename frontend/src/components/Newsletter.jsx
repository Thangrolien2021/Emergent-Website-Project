import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success("You're in. First drop incoming.");
      setEmail("");
    } catch {
      toast.error("Couldn't subscribe right now.");
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
