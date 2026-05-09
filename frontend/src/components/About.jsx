import React from "react";
import { Truck, Shield, Recycle, Stamp } from "lucide-react";

const TRUST = [
  { icon: Truck,   title: "Free worldwide shipping", body: "On every order over $60. No tricks." },
  { icon: Shield,  title: "Secure checkout",        body: "Verified Creator-Spring partner. Stripe & PayPal." },
  { icon: Recycle, title: "Print to order",         body: "Less waste, more drop. Each tee is made for you." },
  { icon: Stamp,   title: "Premium fabrics",        body: "Heavy-weight cotton, ring-spun softness, built to last." },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 border-t border-border" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
          <img src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1000&q=70" alt="JulianTees streetwear lifestyle" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 font-script text-[hsl(var(--accent))] text-3xl">est. 2024</div>
        </div>

        <div>
          <div className="font-script text-[hsl(var(--accent))] text-xl mb-2">— Our story</div>
          <h2 className="font-display text-5xl lg:text-7xl text-foreground leading-[0.9]" data-testid="about-title">
            BUILT FOR <br/> THE <span className="text-[hsl(var(--primary))]">RESTLESS</span>.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            JulianTees started in a one-bedroom apartment with a sketchpad and a stubborn idea: that every tee should say something. No filler. No noise. Just heavy-weight cotton, ring-spun softness, and graphics drawn by hand.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Today our drops travel from Texas rodeos to beach clubs, from morning surf to late-night gigs. Each piece is printed to order — so it's never wasted, and it's always yours.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {TRUST.map(t => (
              <div key={t.title} className="flex gap-4 p-5 rounded-sm border border-border bg-card" data-testid={`trust-${t.title.toLowerCase().replace(/\s+/g,'-')}`}>
                <t.icon className="text-[hsl(var(--primary))] shrink-0 mt-1" size={22} />
                <div>
                  <h4 className="font-bold text-foreground">{t.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
