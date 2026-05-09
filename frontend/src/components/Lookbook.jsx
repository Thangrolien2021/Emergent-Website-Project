import React from "react";
import { getDesigns } from "../data/products";

export default function Lookbook() {
  const designs = getDesigns();
  return (
    <section id="lookbook" className="py-20 lg:py-28 border-t border-border bg-card/30" data-testid="lookbook-section">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="mb-12">
          <div className="font-script text-[hsl(var(--accent))] text-xl mb-2">— Editorial</div>
          <h2 className="font-display text-5xl lg:text-7xl text-foreground" data-testid="lookbook-title">
            THE <span className="italic font-script text-6xl lg:text-8xl text-[hsl(var(--primary))]">lookbook</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Six original designs, hand-illustrated in-house. Each tells a story you can wear.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {designs.map((d, i) => (
            <a
              key={d.design}
              href="#shop"
              onClick={() => window.__setShopCategory && window.__setShopCategory(d.categories[0])}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-white rise"
              style={{ animationDelay: `${i * 0.07}s` }}
              data-testid={`lookbook-${d.id}`}
            >
              <img src={d.image} alt={d.design} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--accent))]">Design {String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display text-3xl lg:text-4xl mt-1">{d.design}</h3>
                <span className="inline-block mt-2 text-xs font-bold uppercase tracking-widest text-[hsl(var(--primary))]">Shop the design →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
