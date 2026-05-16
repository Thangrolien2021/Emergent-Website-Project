import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export default function Lightbox({ design, index = 0, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")  onPrev && onPrev();
      if (e.key === "ArrowRight") onNext && onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  if (!design) return null;
  const img = design.images?.[index] || design.images?.[0];
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
        data-testid="lightbox"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-white/80 hover:text-white" aria-label="Close" data-testid="lightbox-close">
          <X size={28} />
        </button>
        {onPrev && (
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2" aria-label="Previous">
            <ChevronLeft size={36} />
          </button>
        )}
        {onNext && (
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2" aria-label="Next">
            <ChevronRight size={36} />
          </button>
        )}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl w-full grid lg:grid-cols-[1fr_320px] gap-0 bg-card border border-border rounded-sm overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white aspect-square lg:aspect-auto">
            <img src={img?.url} alt={design.title} className="w-full h-full object-contain" />
          </div>
          <div className="p-6 lg:p-8 flex flex-col gap-3">
            {design.featured && <span className="self-start bg-[hsl(var(--primary))] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1">Featured</span>}
            <div className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--accent))]">{design.category}</div>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground leading-tight">{design.title}</h2>
            {design.description && <p className="text-sm text-muted-foreground whitespace-pre-line">{design.description}</p>}
            {design.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {design.tags.map(t => <span key={t} className="text-[10px] uppercase tracking-widest bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">#{t}</span>)}
              </div>
            )}
            {design.external_url && (
              <a href={design.external_url} target="_blank" rel="noreferrer" className="pill-btn mt-4 !w-full justify-center" data-testid="lightbox-buy-btn">
                Shop this design <ExternalLink size={14} />
              </a>
            )}
            {design.images?.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {design.images.map((im, i) => (
                  <button key={i} onClick={() => onPrev && i < index ? onPrev() : onNext && onNext()} className={`w-16 h-16 shrink-0 border-2 ${i === index ? "border-[hsl(var(--primary))]" : "border-transparent"} bg-white`}>
                    <img src={im.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
