import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Sparkles, Loader2 } from "lucide-react";
import { listDesigns } from "../lib/api";
import DesignCard from "../components/DesignCard";
import Lightbox from "../components/Lightbox";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CATS = [
  { slug: "all",        name: "All Drops" },
  { slug: "graphic",    name: "Graphic Tees" },
  { slug: "vintage",    name: "Vintage" },
  { slug: "travel",     name: "Travel & Surf" },
  { slug: "streetwear", name: "Streetwear" },
  { slug: "minimal",    name: "Minimal" },
  { slug: "trendy",     name: "Trendy Designs" },
];

export default function DropsPage() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [cat, setCat]         = useState("all");
  const [search, setSearch]   = useState("");
  const [active, setActive]   = useState(null);
  const [imgIdx, setImgIdx]   = useState(0);

  useEffect(() => {
    document.title = "Latest Drops — JulianTees | New POD Designs";
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "Newly launched JulianTees prints. Bold streetwear graphics, vintage Americana, surf and minimal designs — fresh from the studio.");
  }, []);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true); setError(null);
      try {
        const data = await listDesigns({ ...(cat !== "all" ? { category: cat } : {}), ...(search ? { q: search } : {}) });
        if (!cancel) setDesigns(data.designs || []);
      } catch (e) {
        if (!cancel) setError(e.message || "Could not load drops");
      } finally { if (!cancel) setLoading(false); }
    })();
    return () => { cancel = true; };
  }, [cat, search]);

  const featured = useMemo(() => designs.filter(d => d.featured).slice(0, 3), [designs]);
  const rest     = useMemo(() => designs.filter(d => !d.featured || !featured.includes(d)), [designs, featured]);

  return (
    <main data-testid="drops-page">
      <Header />

      {/* Hero band */}
      <section className="relative overflow-hidden bg-background grain pt-16 pb-16 lg:pt-24 lg:pb-20 border-b border-border" data-testid="drops-hero">
        <div className="absolute -top-10 -right-20 select-none pointer-events-none opacity-[0.05]">
          <span className="font-display text-[22rem] leading-none text-[hsl(var(--primary))]">NEW</span>
        </div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 mb-5">
            <Sparkles size={14} className="text-[hsl(var(--primary))]" />
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/80">Fresh out the studio</span>
          </div>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-[8rem] leading-[0.85] text-foreground">
            LATEST<br/><span className="text-[hsl(var(--primary))]">DROPS</span> <span className="font-script text-5xl lg:text-7xl">/ ’26</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base lg:text-lg text-muted-foreground">
            Just-uploaded designs from the JulianTees studio. Click any piece to see it full-size, browse colorways, and tap through to checkout.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[72px] z-30 bg-background/85 backdrop-blur-md border-b border-border" data-testid="drops-filters">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search drops…"
              className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
              data-testid="drops-search"
            />
          </div>
          <div className="flex flex-wrap gap-2 overflow-x-auto">
            <Filter size={14} className="text-muted-foreground self-center hidden lg:block" />
            {CATS.map(c => (
              <button key={c.slug} onClick={() => setCat(c.slug)}
                className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${cat === c.slug ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-white" : "bg-card border-border text-foreground/80 hover:border-foreground"}`}
                data-testid={`drops-filter-${c.slug}`}
              >{c.name}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured slider */}
      {featured.length > 0 && (
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="max-w-7xl mx-auto px-5 lg:px-10">
            <div className="font-script text-[hsl(var(--accent))] text-xl mb-1">— Spotlight</div>
            <h2 className="font-display text-3xl lg:text-5xl text-foreground mb-8">FEATURED</h2>
            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
              {featured.map((d, i) => (
                <motion.div key={d.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
                  className="relative aspect-[4/5] bg-white rounded-sm overflow-hidden cursor-pointer group"
                  onClick={() => { setActive(d); setImgIdx(0); }}>
                  <img src={d.images?.[0]?.url} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <span className="bg-[hsl(var(--primary))] text-[10px] font-black uppercase tracking-widest px-2 py-0.5">Featured</span>
                    <h3 className="font-display text-3xl mt-2">{d.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-[hsl(var(--accent))] mt-1">{d.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Masonry-ish grid */}
      <section className="py-12 lg:py-20" data-testid="drops-grid-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6" data-testid="drops-loading">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square bg-card rounded-sm animate-pulse" />
              ))}
            </div>
          )}
          {!loading && error && (
            <div className="text-center py-20" data-testid="drops-error">
              <p className="text-muted-foreground">Designs will appear here once the admin uploads them.</p>
              <p className="text-xs text-muted-foreground mt-2">({error})</p>
            </div>
          )}
          {!loading && !error && rest.length === 0 && (
            <div className="text-center py-20" data-testid="drops-empty">
              <Loader2 className="mx-auto text-muted-foreground mb-3" />
              <p className="font-display text-3xl text-foreground">NO DROPS YET</p>
              <p className="text-muted-foreground mt-2">New designs are uploaded weekly. Check back soon.</p>
            </div>
          )}
          {!loading && rest.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 columns-auto" data-testid="drops-grid">
              {rest.map((d, i) => (
                <DesignCard key={d.id} design={d} idx={i} onOpen={(x) => { setActive(x); setImgIdx(0); }} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {active && (
        <Lightbox
          design={active}
          index={imgIdx}
          onClose={() => setActive(null)}
          onPrev={active.images?.length > 1 ? () => setImgIdx((i) => (i - 1 + active.images.length) % active.images.length) : null}
          onNext={active.images?.length > 1 ? () => setImgIdx((i) => (i + 1) % active.images.length) : null}
        />
      )}
    </main>
  );
}
