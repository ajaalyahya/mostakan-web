import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Navbar from "./components/layout/Navbar";

function Layout() {
  const location = useLocation();

  return (
    <>
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
