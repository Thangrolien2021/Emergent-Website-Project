import React from "react";
import { CATEGORIES, getProductsByCategory } from "../data/products";

const COVERS = {
  graphic:    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=70",
  vintage:    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=70",
  travel:     "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=70",
  streetwear: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=70",
  minimal:    "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=70",
  trendy:     "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=70",
};

export default function Categories({ onSelect }) {
  return (
    <section id="categories" className="py-20 lg:py-28 bg-background border-t border-border" data-testid="categories-section">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <div className="font-script text-[hsl(var(--accent))] text-xl mb-2">— Browse the rack</div>
            <h2 className="font-display text-5xl lg:text-7xl text-foreground" data-testid="categories-title">
              CATEGORIES
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Six curated worlds. From minimal mantras to dusty rodeo Americana — find the one that's already yours.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {CATEGORIES.slice(1).map((c, i) => {
            const count = getProductsByCategory(c.slug).length;
            return (
              <button
                key={c.slug}
                onClick={() => onSelect && onSelect(c.slug)}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-card text-left rise"
                style={{ animationDelay: `${i * 0.06}s` }}
                data-testid={`category-card-${c.slug}`}
              >
                <img
                  src={COVERS[c.slug]}
                  alt={`${c.name} category`}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="relative h-full p-5 lg:p-7 flex flex-col justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--accent))]">
                    {String(i + 1).padStart(2, "0")} / {count} items
                  </span>
                  <div>
                    <h3 className="font-display text-3xl lg:text-5xl text-white leading-none">{c.name}</h3>
                    <p className="text-white/70 text-sm mt-2">{c.blurb}</p>
                    <span className="inline-block mt-4 text-xs font-bold uppercase tracking-widest text-[hsl(var(--primary))] group-hover:translate-x-1 transition-transform">
                      Shop now →
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
