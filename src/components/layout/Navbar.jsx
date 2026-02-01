import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/src/assets/images/mostakanMain.png";

function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const linkClass = (id) =>
    `font-bold transition ${
      active === id
        ? "text-white border-b-2 border-white"
        : "text-[var(--trdColor)]"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--secColor)] text-white shadow-xl">
      
      {/* ===== Top Bar ===== */}
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 px-6 h-12 relative">

        {/* Logo */}
        <div className="w-20 absolute left-6 md:static">
          <img
            src={logo}
            alt="logo"
            className="w-12 object-contain"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-12 whitespace-nowrap">
          <a href="#home" className={linkClass("home")}>الرئيسية</a>

          <Link
            to="/menu"
            className={`font-bold transition ${
              location.pathname === "/menu"
                ? "text-white border-b-2 border-white"
                : "text-[var(--trdColor)]"
            }`}
          >
            القائمة
          </Link>

          <a href="#story" className={linkClass("story")}>قصتنا</a>
          <a href="#contact" className={linkClass("contact")}>للتواصل</a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden absolute right-6 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* ===== Mobile Menu + Overlay ===== */}
      {open && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Menu */}
          <div className="fixed top-12 left-0 w-full bg-[var(--secColor)] z-50 border-t border-white/20">
            <div className="flex flex-col items-center py-4 gap-3">

              <a href="#home" onClick={() => setOpen(false)} className="font-bold text-white">
                الرئيسية
              </a>

              <Link to="/menu" onClick={() => setOpen(false)} className="font-bold text-white">
                القائمة
              </Link>

              <a href="#story" onClick={() => setOpen(false)} className="font-bold text-white">
                قصتنا
              </a>

              <a href="#contact" onClick={() => setOpen(false)} className="font-bold text-white">
                للتواصل
              </a>

            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
