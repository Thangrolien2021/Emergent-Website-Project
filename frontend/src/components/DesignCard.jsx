import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function DesignCard({ design, idx = 0, onOpen }) {
  const cover = design.images?.[0]?.url;
  return (
    <motion.button
      type="button"
      onClick={() => onOpen && onOpen(design)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (idx % 8) * 0.05 }}
      className="group relative block bg-white text-black rounded-sm overflow-hidden text-left product-card"
      data-testid={`design-card-${design.id}`}
    >
      <div className="relative aspect-square bg-white overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={design.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-neutral-100" />
        )}
        {design.featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-[hsl(var(--primary))] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1">
            <Sparkles size={10} /> Featured
          </span>
        )}
        <span className="absolute top-3 right-3 bg-black text-white text-[10px] font-black uppercase tracking-widest px-2 py-1">New</span>
      </div>
      <div className="p-4">
        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{design.category}</div>
        <div className="font-bold text-sm mt-0.5 line-clamp-1">{design.title}</div>
        {design.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {design.tags.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] text-neutral-500 uppercase tracking-widest">#{t}</span>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
}
