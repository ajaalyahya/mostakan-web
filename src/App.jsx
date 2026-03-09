import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MigrateData from "./pages/MigrateData";
import Navbar from "./components/layout/Navbar";

import { LanguageProvider } from "./context/LanguageContext";
import LangToggle from "./components/LangToggle";

function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-H9GF4C67EJ", { page_path: location.pathname });
    }
  }, [location]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  const location = useLocation();
  return (
    <>
      <AnalyticsTracker />
      <ScrollToTop />
      {location.pathname === "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/migrate" element={<MigrateData />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Layout />
        <LangToggle />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;