import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Navbar from "./components/layout/Navbar";

// ✅ تتبع Google Analytics
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-H9GF4C67EJ", {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
}

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  const location = useLocation();

  return (
    <>
      {/* تتبع الصفحات */}
      <AnalyticsTracker />

      {/* التمرير للأعلى */}
      <ScrollToTop />

      {/* النافبار يظهر فقط في الهوم */}
      {location.pathname === "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;