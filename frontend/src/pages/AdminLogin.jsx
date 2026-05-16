import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Lock, Mail, Loader2 } from "lucide-react";
import { adminLogin } from "../lib/api";
import { useAdminAuth } from "../lib/AdminAuth";
import { Logo } from "../components/Logo";

export default function AdminLogin() {
  const [email, setEmail]       = useState("juliantees2026@gmail.com");
  const [password, setPassword] = useState("");
  const [busy, setBusy]         = useState(false);
  const nav = useNavigate();
  const { refresh } = useAdminAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await adminLogin(email.trim(), password);
      await refresh();
      toast.success("Welcome back, Julian.");
      nav("/admin/dashboard", { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally { setBusy(false); }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background grain p-6" data-testid="admin-login-page">
      <div className="w-full max-w-md">
        <div className="text-center mb-8"><Logo size="lg" /></div>
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-sm p-6 lg:p-8 space-y-5" data-testid="admin-login-form">
          <div>
            <div className="font-script text-[hsl(var(--accent))] text-lg">— Studio access</div>
            <h1 className="font-display text-4xl text-foreground">ADMIN LOGIN</h1>
            <p className="text-xs text-muted-foreground mt-2">Restricted to <b>{email}</b>. Forgot the password? Reset it in Cloudflare → Pages → Variables → <code>ADMIN_PASSWORD</code>.</p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Email</label>
            <div className="relative mt-1">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input data-testid="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-background border border-border rounded-sm text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Password</label>
            <div className="relative mt-1">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input data-testid="admin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-background border border-border rounded-sm text-foreground focus:outline-none focus:border-[hsl(var(--primary))]" />
            </div>
          </div>
          <button type="submit" disabled={busy} className="pill-btn !w-full justify-center" data-testid="admin-login-submit">
            {busy ? <Loader2 size={16} className="animate-spin"/> : <Lock size={16}/>} {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
