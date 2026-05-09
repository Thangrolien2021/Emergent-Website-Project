import React from "react";
import { ExternalLink } from "lucide-react";

const COLOR_MAP = {
  Black:"#0a0a0a", White:"#fafafa", Navy:"#1c2541", Royal:"#2541b2", "True Royal":"#2541b2",
  Charcoal:"#36393b", Heather:"#807d75", "Dark Heather":"#4d4d4d", "Sport Grey":"#a3a3a3", "Smoke Gray":"#7a7a7a",
  Forest:"#1f3d2b", "Deep Forest":"#1a3327", "Forest Green":"#1f3d2b", Purple:"#5e3a8e", Pink:"#f7b5c4", Heliconia:"#e84a8e",
  "Light Pink":"#f9d3d4", "Denim Blue":"#5b7c99", Denim:"#5b7c99", Coal:"#1f1f1f", "New Navy":"#1c2541",
  "Midnight Navy":"#10162a", "Deep Royal":"#1f4dba", "Deep Navy":"#101a30", Vintage:"#d6c8a3", Natural:"#e6dcc4"
};

export default function ProductCard({ p, idx = 0 }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="product-card group relative block bg-white text-black rounded-sm overflow-hidden rise"
      style={{ animationDelay: `${(idx % 8) * 0.05}s` }}
      data-testid={`product-card-${p.id}`}
    >
      <div className="relative aspect-square bg-white overflow-hidden">
        <img
          src={p.image}
          alt={`${p.design} – ${p.type} mockup`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-[hsl(var(--primary))] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-sm">
          New
        </span>
        <span className="absolute top-3 right-3 bg-black/0 group-hover:bg-black text-transparent group-hover:text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm transition-all flex items-center gap-1">
          Shop <ExternalLink size={11}/>
        </span>
      </div>
      <div className="p-4">
        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500" data-testid={`product-design-${p.id}`}>{p.design}</div>
        <div className="font-bold text-sm mt-0.5 line-clamp-1" data-testid={`product-type-${p.id}`}>{p.type}</div>
        <div className="flex items-center justify-between mt-3">
          <div className="font-display text-2xl text-black" data-testid={`product-price-${p.id}`}>${p.price}</div>
          <div className="flex gap-1.5">
            {p.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                title={c}
                className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                style={{ background: COLOR_MAP[c] || "#cfcfcf" }}
              />
            ))}
            {p.colors.length > 4 && <span className="text-[10px] text-neutral-500">+{p.colors.length - 4}</span>}
          </div>
        </div>
      </div>
    </a>
  );
}
