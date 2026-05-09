import React from "react";
import { Instagram, Twitter, Youtube, Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { CATEGORIES } from "../data/products";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Big brand mark */}
        <div className="mb-12 pb-12 border-b border-border">
          <div className="font-display text-[24vw] sm:text-[18vw] lg:text-[14vw] leading-none text-foreground select-none">
            JULIAN<span className="text-[hsl(var(--primary))]">TEES</span>.
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Bold streetwear without the noise. Limited drops, premium cotton, hand-drawn graphics — shipped worldwide.
            </p>
            <div className="flex gap-3 mt-6" data-testid="footer-socials">
              {/* TikTok intentionally removed per brand request */}
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-colors" data-testid="social-instagram"><Instagram size={16} /></a>
              <a href="#" aria-label="Twitter / X" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-colors" data-testid="social-twitter"><Twitter size={16} /></a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-colors" data-testid="social-youtube"><Youtube size={16} /></a>
              <a href="mailto:juliantees2026@gmail.com" aria-label="Email" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-colors" data-testid="social-email"><Mail size={16} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-[hsl(var(--accent))] mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              {CATEGORIES.slice(1).map(c => (
                <li key={c.slug}>
                  <a href="#shop" onClick={() => window.__setShopCategory && window.__setShopCategory(c.slug)} className="hover:text-[hsl(var(--primary))] transition-colors">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-[hsl(var(--accent))] mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li><a href="#contact" className="hover:text-[hsl(var(--primary))]">Contact</a></li>
              <li><a href="#about" className="hover:text-[hsl(var(--primary))]">About</a></li>
              <li><a href="https://my-store-fa717a.creator-spring.com/" target="_blank" rel="noreferrer" className="hover:text-[hsl(var(--primary))] inline-flex items-center gap-1">Shipping <ArrowUpRight size={12}/></a></li>
              <li><a href="https://my-store-fa717a.creator-spring.com/" target="_blank" rel="noreferrer" className="hover:text-[hsl(var(--primary))] inline-flex items-center gap-1">Returns <ArrowUpRight size={12}/></a></li>
              <li><a href="mailto:juliantees2026@gmail.com" className="hover:text-[hsl(var(--primary))]">Wholesale</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} JulianTees. All rights reserved.</span>
          <span>Made for the restless. Wear what you mean.</span>
        </div>
      </div>
    </footer>
  );
}
