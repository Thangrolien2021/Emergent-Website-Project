import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { adminMe, adminLogout } from "./api";

const AdminAuthCtx = createContext({ admin: null, loading: true, refresh: () => {}, logout: () => {} });
export const useAdminAuth = () => useContext(AdminAuthCtx);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try { setAdmin(await adminMe()); }
    catch { setAdmin(null); }
    finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, []);

  const logout = async () => {
    try { await adminLogout(); } catch {}
    setAdmin(null);
  };

  return (
    <AdminAuthCtx.Provider value={{ admin, loading, refresh, logout }}>
      {children}
    </AdminAuthCtx.Provider>
  );
}

export function RequireAdmin({ children }) {
  const { admin, loading } = useAdminAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-foreground">Loading…</div>;
  if (!admin)  return <Navigate to="/admin/login" replace />;
  return children;
}
