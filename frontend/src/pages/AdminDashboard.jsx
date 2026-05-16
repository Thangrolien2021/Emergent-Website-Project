import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, LogOut, Star, Trash2, Edit3, Save, X, Loader2, Image as ImageIcon, Search } from "lucide-react";
import { listDesigns, adminCreate, adminUpdate, adminDelete, adminUpload } from "../lib/api";
import { useAdminAuth } from "../lib/AdminAuth";
import { Logo } from "../components/Logo";
import Dropzone from "../components/Dropzone";

const CATS = ["graphic","vintage","travel","streetwear","minimal","trendy"];
const empty = { title: "", description: "", category: "graphic", tags: "", featured: false, external_url: "" };

export default function AdminDashboard() {
  const { admin, logout } = useAdminAuth();
  const nav = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(empty);
  const [files, setFiles]       = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try { const r = await listDesigns(); setDesigns(r.designs || []); }
    catch (e) { toast.error(e.message); }
    finally  { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setFiles([]); setExistingImages([]); setShowForm(true); };
  const openEdit   = (d) => {
    setEditing(d);
    setForm({ title: d.title, description: d.description || "", category: d.category, tags: (d.tags || []).join(", "), featured: !!d.featured, external_url: d.external_url || "" });
    setFiles([]); setExistingImages(d.images || []);
    setShowForm(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Title is required."); return; }
    setSubmitting(true);
    try {
      let newImages = [...existingImages];
      if (files.length) {
        toast.message("Uploading images…");
        const uploaded = await adminUpload(files);
        newImages = [...newImages, ...uploaded];
      }
      if (!newImages.length) { toast.error("Add at least one image."); setSubmitting(false); return; }
      const payload = {
        ...form,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        images: newImages,
      };
      if (editing) { await adminUpdate(editing.id, payload); toast.success("Design updated."); }
      else         { await adminCreate(payload);             toast.success("Design published."); }
      setShowForm(false); setForm(empty); setFiles([]); setExistingImages([]); load();
    } catch (e) { toast.error(e.message || "Save failed"); }
    finally   { setSubmitting(false); }
  };

  const onDelete = async (d) => {
    if (!window.confirm(`Delete "${d.title}"? This is permanent.`)) return;
    try { await adminDelete(d.id); toast.success("Deleted."); load(); }
    catch (e) { toast.error(e.message); }
  };

  const toggleFeatured = async (d) => {
    try { await adminUpdate(d.id, { featured: !d.featured }); load(); }
    catch (e) { toast.error(e.message); }
  };

  const filtered = designs.filter(d => !search ||
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    (d.tags || []).join(" ").toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background" data-testid="admin-dashboard">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-[72px] flex items-center justify-between">
          <Link to="/"><Logo size="md" /></Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{admin?.email}</span>
            <Link to="/drops" className="ghost-btn !py-1.5 !px-4 text-xs">View site</Link>
            <button onClick={async () => { await logout(); nav("/admin/login"); }} className="ghost-btn !py-1.5 !px-4 text-xs" data-testid="admin-logout">
              <LogOut size={14}/> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-script text-[hsl(var(--accent))] text-xl">— Studio</div>
            <h1 className="font-display text-5xl lg:text-7xl text-foreground" data-testid="admin-title">DESIGNS</h1>
            <p className="text-muted-foreground mt-2">{designs.length} total · {designs.filter(d => d.featured).length} featured</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…"
                className="w-full sm:w-64 pl-9 pr-3 py-2 bg-card border border-border rounded-full text-sm text-foreground focus:outline-none focus:border-foreground" data-testid="admin-search"/>
            </div>
            <button onClick={openCreate} className="pill-btn !py-2 !px-5 text-xs" data-testid="admin-new-design"><Plus size={16}/> New design</button>
          </div>
        </div>

        {loading && <div className="text-center py-20 text-muted-foreground"><Loader2 className="animate-spin mx-auto"/></div>}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20" data-testid="admin-empty">
            <ImageIcon className="mx-auto text-muted-foreground mb-3"/>
            <p className="font-display text-3xl text-foreground">NO DESIGNS YET</p>
            <p className="text-muted-foreground mt-1 mb-6">Upload your first POD design to get started.</p>
            <button onClick={openCreate} className="pill-btn"><Plus size={16}/> Upload first design</button>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="admin-grid">
            {filtered.map(d => (
              <div key={d.id} className="bg-card border border-border rounded-sm overflow-hidden" data-testid={`admin-design-${d.id}`}>
                <div className="aspect-square bg-white relative">
                  {d.images?.[0] && <img src={d.images[0].url} alt={d.title} className="w-full h-full object-cover"/>}
                  <button onClick={() => toggleFeatured(d)} title="Toggle featured"
                    className={`absolute top-3 left-3 p-2 rounded-full transition ${d.featured ? "bg-[hsl(var(--primary))] text-white" : "bg-black/70 text-white hover:bg-[hsl(var(--primary))]"}`}>
                    <Star size={14} fill={d.featured ? "currentColor" : "none"}/>
                  </button>
                  {d.images.length > 1 && <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">{d.images.length} imgs</span>}
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--accent))]">{d.category}</div>
                  <div className="font-bold text-foreground line-clamp-1">{d.title}</div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => openEdit(d)} className="flex-1 ghost-btn !py-1.5 !px-3 text-xs justify-center"><Edit3 size={12}/> Edit</button>
                    <button onClick={() => onDelete(d)} className="ghost-btn !py-1.5 !px-3 text-xs justify-center !border-[hsl(var(--primary))] !text-[hsl(var(--primary))]"><Trash2 size={12}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
          <form onSubmit={onSubmit} onClick={(e) => e.stopPropagation()}
            className="max-w-3xl mx-auto my-8 bg-card border border-border rounded-sm p-6 lg:p-8 space-y-5" data-testid="admin-form">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-3xl text-foreground">{editing ? "EDIT DESIGN" : "NEW DESIGN"}</h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={22}/></button>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full mt-1 bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" data-testid="form-title"/>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full mt-1 bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" data-testid="form-description"/>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full mt-1 bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" data-testid="form-category">
                  {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Tags (comma-separated)</label>
                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full mt-1 bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" data-testid="form-tags"
                  placeholder="surf, americana, retro"/>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">External buy URL (optional)</label>
              <input value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                className="w-full mt-1 bg-background border border-border rounded-sm px-3 py-2.5 text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" data-testid="form-url"
                placeholder="https://my-store-fa717a.creator-spring.com/listing/..."/>
            </div>

            <label className="flex items-center gap-2 cursor-pointer" data-testid="form-featured-label">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} data-testid="form-featured"/>
              <span className="text-sm text-foreground"><Star size={12} className="inline -mt-0.5"/> Mark as featured</span>
            </label>

            {existingImages.length > 0 && (
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Current images</label>
                <div className="mt-2 grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {existingImages.map((im, i) => (
                    <div key={i} className="relative aspect-square bg-white border border-border">
                      <img src={im.url} alt="" className="w-full h-full object-cover"/>
                      <button type="button" onClick={() => setExistingImages(existingImages.filter((_, k) => k !== i))} className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full hover:bg-[hsl(var(--primary))]"><X size={12}/></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Add images</label>
              <div className="mt-2"><Dropzone files={files} onChange={setFiles}/></div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="ghost-btn flex-1 justify-center"><X size={16}/> Cancel</button>
              <button type="submit" disabled={submitting} className="pill-btn flex-1 justify-center" data-testid="form-submit">
                {submitting ? <Loader2 size={16} className="animate-spin"/> : <Save size={16}/>} {submitting ? "Saving…" : (editing ? "Save changes" : "Publish design")}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
