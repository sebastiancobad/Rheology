"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SectionWrapper from "./SectionWrapper";
import AnimatedSection, { AnimatedCard } from "./AnimatedSection";

const RheometerGeometry3D = dynamic(() => import("./3d/RheometerGeometry3D"), { ssr: false });

export default function MeasurementTechniques() {
  const [geometry, setGeometry] = useState("cone-plate");
  const [rpm, setRpm] = useState(1);

  const geometryInfo: Record<string, { title: string; equation: string; pros: string[]; cons: string[]; desc: string }> = {
    "cone-plate": {
      title: "Cone & Plate",
      equation: "γ̇ = Ω / α  (uniform)",
      pros: ["Uniform shear rate", "Small sample (~0.5 mL)", "Direct N₁ measurement"],
      cons: ["Particle size ≪ gap", "Edge fracture at high γ̇", "Not for filled systems"],
      desc: "Gold standard for polymer melts. Cone angle 0.5–4°.",
    },
    "parallel-plate": {
      title: "Parallel Plate",
      equation: "γ̇(r) = Ωr / h  (varies)",
      pros: ["Adjustable gap", "Filled systems OK", "Temperature sweeps"],
      cons: ["Non-uniform γ̇", "Needs Mooney correction", "N₁ needs differentiation"],
      desc: "Versatile for recycled compounds with particles.",
    },
    couette: {
      title: "Concentric Cylinders",
      equation: "γ̇ = 2ΩRᵢ² / (Rₒ²−Rᵢ²)",
      pros: ["Low-viscosity fluids", "Large sample → stable", "Solvent evaporation control"],
      cons: ["Large sample needed", "Taylor vortices at high Ω", "End effects"],
      desc: "Ideal for solutions, suspensions, and low-η samples.",
    },
  };

  const info = geometryInfo[geometry];

  return (
    <SectionWrapper
      id="measurement"
      title="Measurement Techniques"
      subtitle="Section 3 — Instrumentation"
      accent="#0B2545"
    >
      {/* 3D Rheometer */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-2">Interactive 3D Rheometer</h3>
        <p className="text-[#3d6285] text-sm mb-6">
          Select a geometry and adjust the rotation speed. Drag to rotate the 3D view.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            {/* Geometry selector */}
            <div className="flex gap-2 mb-4">
              {Object.entries(geometryInfo).map(([key, val]) => (
                <button key={key} onClick={() => setGeometry(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    geometry === key
                      ? "bg-[#0B2545] text-white shadow-md"
                      : "bg-[#EEF4ED] text-[#3d6285] border border-[#c9d9e8] hover:bg-white"
                  }`}>
                  {val.title}
                </button>
              ))}
            </div>

            {/* RPM control */}
            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm text-[#3d6285]">RPM: <strong className="text-[#134074]">{rpm.toFixed(1)}</strong></label>
              <input type="range" min="0" max="5" step="0.1" value={rpm}
                onChange={(e) => setRpm(parseFloat(e.target.value))}
                className="w-40 accent-[#134074]" />
            </div>

            <RheometerGeometry3D geometry={geometry} rpm={rpm} />
          </div>

          {/* Info panel */}
          <div className="space-y-4">
            <div className="bg-white border border-[#c9d9e8] rounded-2xl p-5">
              <h4 className="font-bold text-[#0B2545] mb-1">{info.title}</h4>
              <p className="text-[#3d6285] text-sm mb-3">{info.desc}</p>
              <div className="math-block !text-sm !py-2 !px-3 !my-2">{info.equation}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-xl p-4">
                <h5 className="text-xs font-bold text-[#134074] mb-2 uppercase tracking-wide">Advantages</h5>
                <ul className="text-[#3d6285] text-xs space-y-1">
                  {info.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#134074] mt-0.5">+</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-[#c9d9e8] rounded-xl p-4">
                <h5 className="text-xs font-bold text-[#8DA9C4] mb-2 uppercase tracking-wide">Limitations</h5>
                <ul className="text-[#3d6285] text-xs space-y-1">
                  {info.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#8DA9C4] mt-0.5">−</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Capillary Rheometry — Visual */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-4">Capillary Rheometry Corrections</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatedCard className="bg-white border border-[#c9d9e8] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#134074] text-white flex items-center justify-center font-bold text-sm">B</div>
              <h4 className="font-bold text-[#0B2545]">Bagley Correction</h4>
            </div>
            <div className="math-block !text-sm">τ<sub>w</sub> = ΔP · R / [2(L/R + e<sub>B</sub>)]</div>
            <p className="text-[#3d6285] text-xs mt-3">
              Corrects entrance pressure drop. Plot ΔP vs L/D at constant γ̇,
              extrapolate to L/D = 0. For elastic melts, entrance effects can be 30–60% of total ΔP.
            </p>
            <div className="mt-3 bg-[#EEF4ED] rounded-lg p-3">
              <svg viewBox="0 0 200 100" className="w-full h-auto">
                <line x1="30" y1="85" x2="180" y2="85" stroke="#c9d9e8" strokeWidth="1"/>
                <line x1="30" y1="85" x2="30" y2="10" stroke="#c9d9e8" strokeWidth="1"/>
                <text x="105" y="98" textAnchor="middle" fill="#3d6285" fontSize="7">L/D</text>
                <text x="12" y="50" textAnchor="middle" fill="#3d6285" fontSize="7" transform="rotate(-90 12 50)">ΔP</text>
                <line x1="15" y1="65" x2="170" y2="20" stroke="#134074" strokeWidth="2"/>
                <circle cx="60" cy="52" r="3" fill="#134074"/>
                <circle cx="90" cy="42" r="3" fill="#134074"/>
                <circle cx="120" cy="32" r="3" fill="#134074"/>
                <circle cx="150" cy="22" r="3" fill="#134074"/>
                <line x1="15" y1="65" x2="30" y2="65" stroke="#8DA9C4" strokeWidth="1" strokeDasharray="3 2"/>
                <text x="10" y="68" fill="#8DA9C4" fontSize="6">ΔP<tspan fontSize="4" dy="2">ent</tspan></text>
              </svg>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.1} className="bg-white border border-[#c9d9e8] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#13315C] text-white flex items-center justify-center font-bold text-sm">R</div>
              <h4 className="font-bold text-[#0B2545]">Rabinowitsch Correction</h4>
            </div>
            <div className="math-block !text-sm">γ̇<sub>w,true</sub> = γ̇<sub>a</sub> · (3n&apos; + 1) / (4n&apos;)</div>
            <p className="text-[#3d6285] text-xs mt-3">
              Corrects for non-parabolic velocity profiles. For n&apos; ≈ 0.3 (typical polymer),
              the true wall shear rate is 58% higher than apparent.
            </p>
            <div className="mt-3 bg-[#EEF4ED] rounded-lg p-3">
              <svg viewBox="0 0 200 100" className="w-full h-auto">
                {/* Pipe walls */}
                <rect x="20" y="10" width="160" height="3" fill="#0B2545" rx="1"/>
                <rect x="20" y="87" width="160" height="3" fill="#0B2545" rx="1"/>
                {/* Newtonian profile */}
                <path d="M 30,50 Q 100,15 170,50 Q 100,85 30,50" fill="none" stroke="#8DA9C4" strokeWidth="1.5" strokeDasharray="4 3"/>
                {/* Shear-thinning profile */}
                <path d="M 30,50 Q 100,22 170,50 Q 100,78 30,50" fill="none" stroke="#13315C" strokeWidth="2"/>
                <text x="175" y="40" fill="#8DA9C4" fontSize="6">Newtonian</text>
                <text x="175" y="55" fill="#13315C" fontSize="6">Shear-thin</text>
              </svg>
            </div>
          </AnimatedCard>
        </div>
      </AnimatedSection>

      {/* MFI vs DMA — Comparison */}
      <AnimatedSection>
        <h3 className="text-2xl font-bold text-[#0B2545] mb-4">MFI vs Full Rheological Characterization</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatedCard className="bg-white border border-[#c9d9e8] rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8DA9C4]/10 text-[#8DA9C4] text-xs font-bold">
                SIMPLE
              </div>
            </div>
            <h4 className="font-bold text-[#0B2545] text-center mb-3 text-lg">MFI</h4>
            <div className="text-center text-[#3d6285] text-sm mb-4">Single-point, one shear rate</div>
            <div className="space-y-2 text-xs text-[#3d6285]">
              <div className="flex justify-between border-b border-[#c9d9e8]/50 pb-1"><span>Cost</span><span className="text-[#134074] font-semibold">$5k–15k</span></div>
              <div className="flex justify-between border-b border-[#c9d9e8]/50 pb-1"><span>Shear rate</span><span>~1–10 s⁻¹</span></div>
              <div className="flex justify-between border-b border-[#c9d9e8]/50 pb-1"><span>Info</span><span>Fluidity index</span></div>
              <div className="flex justify-between"><span>Sample</span><span>Pellets</span></div>
            </div>
            <div className="mt-4 text-xs text-center text-[#8DA9C4]">
              Cannot distinguish Mw from MWD or LCB
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.1} className="bg-[#EEF4ED] border-2 border-[#134074]/20 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#134074]/10 text-[#134074] text-xs font-bold">
                COMPREHENSIVE
              </div>
            </div>
            <h4 className="font-bold text-[#0B2545] text-center mb-3 text-lg">Rotational Rheometer</h4>
            <div className="text-center text-[#3d6285] text-sm mb-4">Full viscoelastic characterization</div>
            <div className="space-y-2 text-xs text-[#3d6285]">
              <div className="flex justify-between border-b border-[#c9d9e8]/50 pb-1"><span>Cost</span><span className="text-[#134074] font-semibold">$80k–250k</span></div>
              <div className="flex justify-between border-b border-[#c9d9e8]/50 pb-1"><span>Frequency</span><span>0.01–628 rad/s</span></div>
              <div className="flex justify-between border-b border-[#c9d9e8]/50 pb-1"><span>Info</span><span>G&apos;, G&apos;&apos;, η*, Tg, spectrum</span></div>
              <div className="flex justify-between"><span>Sample</span><span>Disk specimen</span></div>
            </div>
            <div className="mt-4 text-xs text-center text-[#134074] font-semibold">
              Essential for recycled polymer certification
            </div>
          </AnimatedCard>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
