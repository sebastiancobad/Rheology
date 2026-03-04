"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "fundamentals", label: "Fundamentals" },
  { id: "polymer-rheology", label: "Polymer Rheology" },
  { id: "measurement", label: "Rheometry" },
  { id: "applications", label: "Applications" },
  { id: "literature", label: "Literature" },
];

export default function Navigation() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.offsetTop - 120 : 0 };
      });

      const current = offsets
        .filter((o) => window.scrollY >= o.top)
        .pop();
      if (current) setActive(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-[#334155]/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#a78bfa] flex items-center justify-center text-white font-bold text-sm">
              PR
            </div>
            <span className="font-bold text-[#f1f5f9] group-hover:text-[#38bdf8] transition-colors hidden sm:inline">
              Polymer Rheology
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === s.id
                    ? "text-[#38bdf8] bg-[#38bdf8]/10"
                    : "text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#1e293b]"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#1e293b]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-[#334155]/50 mt-2 pt-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === s.id
                    ? "text-[#38bdf8] bg-[#38bdf8]/10"
                    : "text-[#94a3b8] hover:text-[#f1f5f9]"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
