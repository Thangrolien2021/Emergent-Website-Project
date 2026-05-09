import React, { useState, useMemo } from "react";
import { CATEGORIES, getProductsByCategory } from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductsSection({ initialCategory = "all" }) {
  const [active, setActive] = useState(initialCategory);

  const items = useMemo(() => getProductsByCategory(active), [active]);

  // expose setter globally so Categories can scroll + filter
  React.useEffect(() => {
    window.__setShopCategory = setActive;
    return () => { delete window.__setShopCategory; };
  }, []);

  return (
    <section id="shop" className="py-20 lg:py-28 bg-background border-t border-border" data-testid="shop-section">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <div className="font-script text-[hsl(var(--accent))] text-xl mb-2">— The drop</div>
            <h2 className="font-display text-5xl lg:text-7xl text-foreground" data-testid="shop-title">
              SHOP <span className="text-[hsl(var(--primary))]">EVERYTHING</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Filter by category. Click any item to checkout securely on our verified Creator-Spring partner store.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10" data-testid="category-filters">
          {CATEGORIES.map(c => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                active === c.slug
                  ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-white"
                  : "bg-card border-border text-foreground/80 hover:border-foreground"
              }`}
              data-testid={`filter-${c.slug}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6" data-testid="products-grid">
          {items.map((p, i) => <ProductCard key={p.id} p={p} idx={i} />)}
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 text-muted-foreground" data-testid="no-products">
            No items in this category yet — check back soon.
          </div>
        )}
      </div>
    </section>
  );
}
