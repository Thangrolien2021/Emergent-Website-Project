import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductsSection from "./components/ProductsSection";
import LatestDrops from "./components/LatestDrops";
import Lookbook from "./components/Lookbook";
import About from "./components/About";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import DropsPage from "./pages/DropsPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminAuthProvider, RequireAdmin } from "./lib/AdminAuth";

const GA_ID            = process.env.REACT_APP_GA_ID;
const META_PIXEL_ID    = process.env.REACT_APP_META_PIXEL_ID;
const PINTEREST_TAG_ID = process.env.REACT_APP_PINTEREST_TAG_ID;

const initAnalytics = () => {
  if (GA_ID && !window.__gaInjected) {
    window.__gaInjected = true;
    const s = document.createElement("script");
    s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag; gtag("js", new Date()); gtag("config", GA_ID);
  }
  if (META_PIXEL_ID && !window.__pixelInjected) {
    window.__pixelInjected = true;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq && window.fbq("init", META_PIXEL_ID); window.fbq && window.fbq("track", "PageView");
    /* eslint-enable */
  }
  if (PINTEREST_TAG_ID && !window.__pintInjected) {
    window.__pintInjected = true;
    /* eslint-disable */
    !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
    window.pintrk && window.pintrk("load", PINTEREST_TAG_ID); window.pintrk && window.pintrk("page");
    /* eslint-enable */
  }
};

const Home = () => {
  useEffect(() => { initAnalytics(); }, []);
  return (
    <main data-testid="home-page">
      <Header />
      <Hero />
      <LatestDrops />
      <Categories onSelect={(slug) => {
        window.__setShopCategory && window.__setShopCategory(slug);
        document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
      }} />
      <ProductsSection />
      <Lookbook />
      <About />
      <Newsletter />
      <Contact />
      <Footer />
    </main>
  );
};

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" theme="dark" toastOptions={{ style: { background: "#0a0a0a", color: "#f5f5f0", border: "1px solid #2a2a2a" }}} />
      <BrowserRouter>
        <AdminAuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drops" element={<DropsPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
            <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
