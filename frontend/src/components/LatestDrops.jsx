import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { listDesigns } from "../lib/api";

export default function LatestDrops() {
  const [drops, setDrops] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await listDesigns({ limit: 6 });
        setDrops(r.designs || []);
      } catch { /* function not deployed yet — section just hides */ }
      finally { setLoaded(true); }
    })();
  }, []);

  // Hide entire section if nothing has been uploaded yet (avoids "empty section" UX)
  if (loaded && drops.length === 0) return null;

  return (
    <section id="drops" className="py-20 lg:py-28 border-t border-border" data-testid="latest-drops-section">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <div className="font-script text-[hsl(var(--accent))] text-xl mb-2 inline-flex items-center gap-2">
              <Sparkles size={16}/> Just-launched
            </div>
            <h2 className="font-display text-5xl lg:text-7xl text-foreground" data-testid="latest-drops-title">
              NEW <span className="text-[hsl(var(--primary))]">DROPS</span>
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">Fresh from the studio — uploaded this week. Click any piece to see it full-size.</p>
          </div>
          <Link to="/drops" className="ghost-btn" data-testid="view-all-drops-link">
            View all drops <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-5">
          {(loaded ? drops : Array.from({ length: 6 })).map((d, i) => (
            <motion.div
              key={d?.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="aspect-square bg-white rounded-sm overflow-hidden group relative"
            >
              {d ? (
                <Link to="/drops" className="block w-full h-full">
                  <img src={d.images?.[0]?.url} alt={d.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {d.featured && <span className="absolute top-2 left-2 bg-[hsl(var(--primary))] text-white text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5">★</span>}
                </Link>
              ) : (
                <div className="w-full h-full bg-card animate-pulse" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
