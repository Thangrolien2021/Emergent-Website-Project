import React from "react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { PRODUCTS } from "../data/products";

export default function Hero() {
  // Pick 3 hero mockups from products
  const featured = [PRODUCTS[0], PRODUCTS[11], PRODUCTS[17]].filter(Boolean);

  return (
    <section id="top" className="relative overflow-hidden bg-background grain pt-10 pb-20 lg:pt-20 lg:pb-28" data-testid="hero-section">
      {/* Big background numeral */}
      <div className="absolute -top-10 -right-10 select-none pointer-events-none opacity-[0.06]">
        <span className="font-display text-[28rem] leading-none text-[hsl(var(--primary))]">26</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left: copy */}
        <div className="lg:col-span-7 z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 mb-6 rise" data-testid="hero-badge">
            <Sparkles size={14} className="text-[hsl(var(--primary))]" />
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/80">SS / 26 Drop · Limited Run</span>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-[8rem] leading-[0.85] text-foreground rise" data-testid="hero-title">
            WEAR <br />
            <span className="text-[hsl(var(--primary))]">WHAT YOU</span> <br />
            <span className="italic font-script text-5xl sm:text-7xl lg:text-9xl">mean.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground rise" style={{ animationDelay: "0.15s" }} data-testid="hero-sub">
            JulianTees is bold streetwear without the noise. Heavy-weight cottons, hand-drawn graphics, vintage Americana and surf-inspired drops — printed to order, shipped worldwide.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 rise" style={{ animationDelay: "0.3s" }}>
            <a href="#shop" className="pill-btn" data-testid="hero-shop-cta">
              Shop the drop <ArrowRight size={18} />
            </a>
            <a href="#about" className="ghost-btn" data-testid="hero-about-cta">
              Our story
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center gap-6 rise" style={{ animationDelay: "0.45s" }} data-testid="hero-social-proof">
            <div className="flex -space-x-2">
              {[0,1,2,3].map(i => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))]" />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-[hsl(var(--accent))]">
                {[0,1,2,3,4].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">2,400+ wearers · 4.9 average</div>
            </div>
          </div>
        </div>

        {/* Right: stacked product cards */}
        <div className="lg:col-span-5 relative h-[420px] sm:h-[520px] lg:h-[620px]">
          {featured.map((p, i) => (
            <div
              key={p.id}
              className={`absolute rounded-sm overflow-hidden bg-white shadow-2xl transition-transform duration-700`}
              style={{
                width: i === 1 ? "70%" : "60%",
                top: i === 0 ? "5%" : i === 1 ? "30%" : "55%",
                left: i === 0 ? "5%" : i === 1 ? "28%" : "8%",
                transform: `rotate(${i === 0 ? -6 : i === 1 ? 3 : -2}deg)`,
                zIndex: 10 + i,
                animation: `rise 0.8s ${i * 0.15}s both`,
              }}
              data-testid={`hero-card-${i}`}
            >
              <img src={p.image} alt={`${p.design} ${p.type}`} className="w-full h-full object-cover" loading="eager" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="text-white text-xs font-bold uppercase tracking-widest opacity-90">{p.design}</div>
                <div className="text-white text-sm font-black">${p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
