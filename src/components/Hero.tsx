"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FAFCFB 0%, #F2F6F3 40%, #e8f0ea 100%)" }}
    >
      {/* Film grain overlay */}
      <div className="grain" />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large ambient glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-[#134074]/[0.04] blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[#8DA9C4]/[0.06] blur-[120px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(19,64,116,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(19,64,116,0.2) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Horizontal accent lines */}
        <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#134074]/[0.06] to-transparent" />
        <div className="absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8DA9C4]/[0.08] to-transparent" />

        {/* Vertical accent */}
        <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gradient-to-b from-transparent via-[#134074]/[0.04] to-transparent" />
        <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gradient-to-b from-transparent via-[#134074]/[0.04] to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-[#d0dde8] text-[#2c4a6e] text-[13px] font-medium mb-12 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#134074] animate-pulse" />
          Interactive Educational Platform
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-5xl sm:text-7xl lg:text-[6.5rem] font-bold text-[#0B2545] mb-8 leading-[0.92] tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Polymer{" "}
          <span className="gradient-text">Rheology</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-base sm:text-lg text-[#5a7a9a] max-w-2xl mx-auto mb-14 leading-[1.7] font-light"
        >
          From Newtonian fundamentals to advanced viscoelastic characterization
          &mdash; explore the science of flow and deformation through
          interactive 3D visualizations and real-time simulations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/fundamentals"
            className="group relative px-8 py-3.5 rounded-full bg-[#0B2545] text-white text-sm font-medium hover:bg-[#134074] transition-all duration-400 shadow-[0_2px_8px_rgba(11,37,69,0.25)] hover:shadow-[0_4px_16px_rgba(11,37,69,0.3)]"
          >
            Start Learning
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
          <Link
            href="/measurement"
            className="px-8 py-3.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#8DA9C4] text-[#0B2545] text-sm font-medium hover:bg-white hover:border-[#134074] transition-all duration-300 shadow-sm"
          >
            3D Rheometer
          </Link>
          <Link
            href="/polymer-rheology"
            className="px-8 py-3.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#d0dde8] text-[#2c4a6e] text-sm font-medium hover:bg-white hover:border-[#8DA9C4] transition-all duration-300"
          >
            Interactive Charts
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-24"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] text-[#8DA9C4] uppercase tracking-[0.25em] font-semibold">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-[#8DA9C4] to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
