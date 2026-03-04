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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white backdrop-blur-xl border-b border-[#e4e4e7] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              PR
            </div>
            <span className="font-semibold text-[#18181b] group-hover:text-[#4f46e5] transition-colors duration-300 hidden sm:inline tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Polymer Rheology
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                  active === s.id
                    ? "text-[#4f46e5] bg-[#4f46e5]/[0.06] shadow-[inset_0_0_0_1px_rgba(79,70,229,0.15)]"
                    : "text-[#6b7280] hover:text-[#18181b] hover:bg-[#f4f4f5]"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-[#6b7280] hover:text-[#18181b] hover:bg-[#f4f4f5] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
          <div className="md:hidden pb-4 border-t border-[#e4e4e7] mt-2 pt-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === s.id
                    ? "text-[#4f46e5] bg-[#4f46e5]/[0.08]"
                    : "text-[#6b7280] hover:text-[#18181b]"
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
