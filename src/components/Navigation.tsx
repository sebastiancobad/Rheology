"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "/", label: "Home" },
  { href: "/fundamentals", label: "Fundamentals" },
  { href: "/polymer-rheology", label: "Polymer Rheology" },
  { href: "/measurement", label: "Rheometry" },
  { href: "/applications", label: "Applications" },
  { href: "/literature", label: "Literature" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-[#d0dde8]/60 shadow-[0_1px_3px_rgba(11,37,69,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0B2545] to-[#134074] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-[0_2px_8px_rgba(11,37,69,0.2)]">
              PR
            </div>
            <span
              className="font-semibold text-[#0B2545] group-hover:text-[#134074] transition-colors duration-300 hidden sm:inline tracking-tight text-[15px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Polymer Rheology
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                  pathname === s.href
                    ? "text-[#0B2545] bg-[#0B2545]/[0.07] shadow-[inset_0_0_0_1px_rgba(11,37,69,0.12)]"
                    : "text-[#5a7a9a] hover:text-[#0B2545] hover:bg-[#0B2545]/[0.04]"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-[#5a7a9a] hover:text-[#0B2545] hover:bg-[#0B2545]/[0.04] transition-colors"
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
          <div className="md:hidden pb-4 border-t border-[#d0dde8]/60 mt-2 pt-2">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === s.href
                    ? "text-[#0B2545] bg-[#0B2545]/[0.06]"
                    : "text-[#5a7a9a] hover:text-[#0B2545]"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
