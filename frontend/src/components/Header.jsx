import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Logo } from "./Logo";
import { CATEGORIES } from "../data/products";

const NAV = [
  { label: "Shop",      href: "#shop",     internal: true },
  { label: "Drops",     href: "/drops",    internal: false, badge: "New" },
  { label: "Categories",href: "#categories", internal: true },
  { label: "Lookbook",  href: "#lookbook", internal: true },
  { label: "About",     href: "#about",    internal: true },
  { label: "Contact",   href: "#contact",  internal: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div className="diag-band text-white text-xs font-bold uppercase tracking-widest py-2 overflow-hidden" data-testid="announcement-bar">
        <div className="flex whitespace-nowrap marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0">
              {Array.from({ length: 8 }).map((__, j) => (
                <span key={j} className="px-6">★ Free worldwide shipping over $60 ★ New drops weekly ★ Wear your vibe ★</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-background"
        }`}
        data-testid="site-header"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-[72px] flex items-center justify-between">
          <a href="#top" data-testid="logo-link"><Logo size="md" /></a>

          <nav className="hidden lg:flex items-center gap-8" data-testid="primary-nav">
            {NAV.map(n => (
              <a key={n.href} href={n.href} data-testid={`nav-${n.label.toLowerCase()}`}
                 className="text-sm font-bold uppercase tracking-wider text-foreground/80 hover:text-[hsl(var(--primary))] transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#shop" className="hidden md:inline-flex pill-btn !py-2 !px-5 text-xs" data-testid="shop-cta-header">
              <ShoppingBag size={16} /> Shop
            </a>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" data-testid="mobile-menu-toggle" aria-label="Menu">
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden border-t border-border bg-background" data-testid="mobile-nav">
            <div className="px-5 py-6 flex flex-col gap-4">
              {NAV.map(n => (
                n.internal ? (
                  <a key={n.href} href={n.href} onClick={() => setOpen(false)}
                     className="font-display text-3xl text-foreground hover:text-[hsl(var(--primary))]" data-testid={`mobile-nav-${n.label.toLowerCase()}`}>
                    {n.label}
                  </a>
                ) : (
                  <Link key={n.href} to={n.href} onClick={() => setOpen(false)}
                     className="font-display text-3xl text-foreground hover:text-[hsl(var(--primary))] inline-flex items-center gap-2" data-testid={`mobile-nav-${n.label.toLowerCase()}`}>
                    {n.label}
                    {n.badge && <span className="text-[10px] font-black tracking-widest bg-[hsl(var(--primary))] text-white px-2 py-0.5 rounded-full">{n.badge}</span>}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-border flex flex-wrap gap-2">
                {CATEGORIES.slice(1).map(c => (
                  <a key={c.slug} href={`#cat-${c.slug}`} onClick={() => setOpen(false)}
                     className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 border border-border rounded-full hover:bg-[hsl(var(--primary))] hover:border-[hsl(var(--primary))]">
                    {c.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
