"use client";

import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import FrequencySweepChart from "./charts/FrequencySweepChart";
import TemperatureChart from "./charts/TemperatureChart";
import AnimatedSection, { AnimatedCard } from "./AnimatedSection";

export default function PolymerRheology() {
  const [activeChart, setActiveChart] = useState<"frequency" | "temperature">("frequency");

  return (
    <SectionWrapper
      id="polymer-rheology"
      title="Deep Dive into Polymer Rheology"
      subtitle="Section 2 — Advanced Topics"
      accent="#13315C"
    >
      {/* Molecular Weight & Architecture */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-4">Molecular Architecture & Rheology</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Zero-Shear Viscosity",
              eq: "η₀ = K · Mw³·⁴",
              desc: "Above critical Mw, entanglements dominate. 3.4 power-law is universal for linear polymers.",
              icon: (
                <svg viewBox="0 0 40 40" className="w-8 h-8"><path d="M5 35 Q15 5 35 20" stroke="#134074" strokeWidth="2.5" fill="none"/></svg>
              ),
            },
            {
              title: "Relaxation Time",
              eq: "λ = η₀ / G_N⁰",
              desc: "Higher Mw → longer relaxation → more elastic at processing rates. Key for G'/G'' crossover.",
              icon: (
                <svg viewBox="0 0 40 40" className="w-8 h-8"><circle cx="20" cy="20" r="12" stroke="#13315C" strokeWidth="2" fill="none" strokeDasharray="4 3"/></svg>
              ),
            },
            {
              title: "Plateau Modulus",
              eq: "G_N⁰ = ρRT / Me",
              desc: "Entanglement density. Independent of Mw but depends on polymer chemistry (Me).",
              icon: (
                <svg viewBox="0 0 40 40" className="w-8 h-8"><line x1="5" y1="20" x2="35" y2="20" stroke="#0B2545" strokeWidth="2.5"/></svg>
              ),
            },
            {
              title: "Branching (LCB)",
              eq: "↑ η₀, ↑ strain hardening",
              desc: "Long-chain branches increase η₀ disproportionately and cause strain hardening in extension.",
              icon: (
                <svg viewBox="0 0 40 40" className="w-8 h-8"><path d="M10 30 L20 15 L30 5 M20 15 L30 25 M20 15 L10 10" stroke="#134074" strokeWidth="2" fill="none"/></svg>
              ),
            },
            {
              title: "MWD Effects",
              eq: "Broad MWD → broader transition",
              desc: "Polydispersity broadens the shear-thinning transition and extends the terminal zone.",
              icon: (
                <svg viewBox="0 0 40 40" className="w-8 h-8"><path d="M5 35 Q12 5 20 10 Q28 15 35 35" stroke="#8DA9C4" strokeWidth="2" fill="none"/></svg>
              ),
            },
            {
              title: "Tube Model",
              eq: "τ_d = L² / (π²·D_c)",
              desc: "Reptation theory (de Gennes/Doi-Edwards): chains move along a tube formed by entanglements.",
              icon: (
                <svg viewBox="0 0 40 40" className="w-8 h-8"><rect x="8" y="12" width="24" height="16" rx="4" stroke="#13315C" strokeWidth="2" fill="none"/><path d="M10 20 Q20 12 30 20" stroke="#134074" strokeWidth="2" fill="none"/></svg>
              ),
            },
          ].map((item, i) => (
            <AnimatedCard key={i} delay={i * 0.06}
              className="bg-white border border-[#c9d9e8] rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-2">
                {item.icon}
                <h4 className="font-bold text-[#0B2545] text-sm">{item.title}</h4>
              </div>
              <div className="math-block !text-sm !py-1.5 !px-3 !my-2">{item.eq}</div>
              <p className="text-[#3d6285] text-xs">{item.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Interactive Charts — Tabbed */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-2">Interactive Viscoelastic Analysis</h3>
        <p className="text-[#3d6285] text-sm mb-6">
          Explore frequency-dependent viscoelasticity and temperature dependence interactively.
        </p>

        <div className="flex gap-2 mb-6">
          {[
            { key: "frequency" as const, label: "Frequency Sweep (G', G'')" },
            { key: "temperature" as const, label: "Temperature Dependence (WLF)" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveChart(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeChart === tab.key
                  ? "bg-[#13315C] text-white shadow-md"
                  : "bg-[#EEF4ED] text-[#3d6285] border border-[#c9d9e8] hover:bg-white"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white border border-[#c9d9e8] rounded-2xl p-6">
          {activeChart === "frequency" && (
            <div>
              <p className="text-[#3d6285] text-xs mb-4">
                Single Maxwell model: adjust crossover frequency (ω<sub>c</sub> = 1/λ) and plateau modulus.
                G&apos; &gt; G&apos;&apos; = elastic; G&apos;&apos; &gt; G&apos; = viscous.
              </p>
              <FrequencySweepChart />
            </div>
          )}
          {activeChart === "temperature" && (
            <div>
              <p className="text-[#3d6285] text-xs mb-4">
                Compare WLF and Arrhenius models for the temperature shift factor a<sub>T</sub>.
                WLF applies near T<sub>g</sub>, Arrhenius far above T<sub>g</sub>.
              </p>
              <TemperatureChart />
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Key Polymer Table — Compact */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-4">Common Polymers — Rheological Fingerprint</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b-2 border-[#134074]/20">
                <th className="px-3 py-2 text-[#0B2545] font-semibold">Polymer</th>
                <th className="px-3 py-2 text-[#134074] font-semibold">η₀ [Pa·s]</th>
                <th className="px-3 py-2 text-[#13315C] font-semibold">n (power-law)</th>
                <th className="px-3 py-2 text-[#0B2545] font-semibold">G<sub>N</sub>⁰ [MPa]</th>
                <th className="px-3 py-2 text-[#8DA9C4] font-semibold">M<sub>e</sub> [g/mol]</th>
                <th className="px-3 py-2 text-[#134074] font-semibold">Key feature</th>
              </tr>
            </thead>
            <tbody className="text-[#3d6285]">
              {[
                ["HDPE", "10³–10⁵", "0.3–0.6", "2.6", "1,250", "Linear, high crystallinity"],
                ["LDPE", "10³–10⁵", "0.3–0.5", "2.6", "1,250", "LCB → strain hardening"],
                ["iPP", "10³–10⁴", "0.3–0.5", "0.47", "6,900", "Shear-induced crystallization"],
                ["PS", "10³–10⁶", "0.2–0.4", "0.20", "13,300", "Amorphous, high Tg"],
                ["PET", "10²–10³", "0.5–0.8", "—", "1,450", "Hydrolysis-sensitive"],
                ["PA6", "10²–10³", "0.5–0.7", "—", "2,000", "Water absorption → η changes"],
              ].map((row, i) => (
                <tr key={i} className="border-b border-[#c9d9e8]/50 hover:bg-[#EEF4ED]/50 transition-colors">
                  <td className="px-3 py-2 font-semibold text-[#0B2545]">{row[0]}</td>
                  <td className="px-3 py-2">{row[1]}</td>
                  <td className="px-3 py-2">{row[2]}</td>
                  <td className="px-3 py-2">{row[3]}</td>
                  <td className="px-3 py-2">{row[4]}</td>
                  <td className="px-3 py-2 text-xs">{row[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      {/* Recycled Polymers — Visual Cards */}
      <AnimatedSection>
        <h3 className="text-2xl font-bold text-[#0B2545] mb-2">Recycled Polymer Rheology</h3>
        <p className="text-[#3d6285] text-sm mb-6">
          Recycled feedstocks introduce unique challenges absent in virgin materials.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { title: "Chain Degradation", icon: "⚡", items: ["η₀ drops: η₀ = K·Mw³·⁴", "20% Mw loss → ~50% η₀ loss", "PP: chain scission dominates", "PE: crosslinking competes"] },
            { title: "Contamination", icon: "🔬", items: ["1-5% immiscible contaminant detectable", "Palierne model for blend G', G''", "Yield stress at >10% dispersed phase", "Cox-Merz rule often fails"] },
            { title: "Processing Impact", icon: "🏭", items: ["Batch-to-batch variability high", "MFI alone insufficient for QC", "Gel particles affect flow stability", "Inline rheometry recommended"] },
          ].map((card, i) => (
            <AnimatedCard key={i} delay={i * 0.1}
              className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-5">
              <div className="text-2xl mb-2">{card.icon}</div>
              <h4 className="font-bold text-[#0B2545] mb-3">{card.title}</h4>
              <ul className="text-[#3d6285] text-xs space-y-1.5">
                {card.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#134074] mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
