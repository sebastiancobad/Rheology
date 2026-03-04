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
            <div className="mt-3 bg-gradient-to-b from-[#f8faf8] to-[#EEF4ED] rounded-xl p-4 border border-[#c9d9e8]/50">
              <svg viewBox="0 0 220 120" className="w-full h-auto">
                <defs>
                  <linearGradient id="bagley-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#134074" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#134074" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {[20, 35, 50, 65, 80].map(y => (
                  <line key={y} x1="40" y1={y} x2="195" y2={y} stroke="#c9d9e8" strokeWidth="0.5" strokeDasharray="2 3" />
                ))}
                {[70, 100, 130, 160].map(x => (
                  <line key={x} x1={x} y1="14" x2={x} y2="90" stroke="#c9d9e8" strokeWidth="0.5" strokeDasharray="2 3" />
                ))}
                <line x1="40" y1="90" x2="200" y2="90" stroke="#0B2545" strokeWidth="1.2" />
                <line x1="40" y1="90" x2="40" y2="10" stroke="#0B2545" strokeWidth="1.2" />
                <polygon points="200,87 200,93 206,90" fill="#0B2545" />
                <polygon points="37,10 43,10 40,4" fill="#0B2545" />
                <text x="120" y="106" textAnchor="middle" fill="#3d6285" fontSize="8" fontFamily="Inter" fontWeight="500">L / D</text>
                <text x="18" y="55" textAnchor="middle" fill="#3d6285" fontSize="8" fontFamily="Inter" fontWeight="500" transform="rotate(-90 18 55)">ΔP [MPa]</text>
                <path d="M 40,62 L 190,18 L 190,90 L 40,90 Z" fill="url(#bagley-fill)" />
                <line x1="55" y1="65" x2="185" y2="22" stroke="#134074" strokeWidth="2" />
                {[
                  { x: 70, y: 58 }, { x: 100, y: 47 }, { x: 130, y: 37 }, { x: 160, y: 27 },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#134074" opacity="0.08" />
                    <circle cx={pt.x} cy={pt.y} r="3" fill="white" stroke="#134074" strokeWidth="1.5" />
                  </g>
                ))}
                <line x1="22" y1="70" x2="55" y2="65" stroke="#8DA9C4" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="40" y1="65" x2="40" y2="90" stroke="#134074" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                <text x="30" y="72" fill="#134074" fontSize="7" fontWeight="600">ΔP<tspan fontSize="5" dy="1.5">ent</tspan></text>
                <circle cx="22" cy="70" r="2" fill="#8DA9C4" />
                <text x="15" y="82" fill="#8DA9C4" fontSize="6" fontWeight="500">−e<tspan fontSize="5" dy="1">B</tspan></text>
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
            <div className="mt-3 bg-gradient-to-b from-[#f8faf8] to-[#EEF4ED] rounded-xl p-4 border border-[#c9d9e8]/50">
              <svg viewBox="0 0 260 140" className="w-full h-auto">
                <defs>
                  <linearGradient id="newt-fill" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8DA9C4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#8DA9C4" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#8DA9C4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="shear-fill" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#13315C" stopOpacity="0" />
                    <stop offset="50%" stopColor="#13315C" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#13315C" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="pipe-wall" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B2545" />
                    <stop offset="100%" stopColor="#13315C" />
                  </linearGradient>
                </defs>

                {/* Pipe walls */}
                <rect x="25" y="14" width="180" height="6" rx="3" fill="url(#pipe-wall)" />
                <rect x="25" y="20" width="180" height="1.5" fill="#0B2545" opacity="0.1" />
                <rect x="25" y="110" width="180" height="6" rx="3" fill="url(#pipe-wall)" />
                <rect x="25" y="108.5" width="180" height="1.5" fill="white" opacity="0.15" />

                {/* Centerline */}
                <line x1="30" y1="65" x2="200" y2="65" stroke="#c9d9e8" strokeWidth="0.5" strokeDasharray="3 4" />

                {/* Newtonian profile — parabolic */}
                <path d="M 35,65 Q 115,22 195,65 Q 115,108 35,65 Z" fill="url(#newt-fill)" />
                <path d="M 35,65 Q 115,22 195,65" fill="none" stroke="#8DA9C4" strokeWidth="1.5" strokeDasharray="5 3" />
                <path d="M 35,65 Q 115,108 195,65" fill="none" stroke="#8DA9C4" strokeWidth="1.5" strokeDasharray="5 3" />

                {/* Shear-thinning profile — plug-like */}
                <path d="M 35,65 Q 115,30 195,65 Q 115,100 35,65 Z" fill="url(#shear-fill)" />
                <path d="M 35,65 Q 115,30 195,65" fill="none" stroke="#13315C" strokeWidth="2.5" />
                <path d="M 35,65 Q 115,100 195,65" fill="none" stroke="#13315C" strokeWidth="2.5" />

                {/* Velocity arrows */}
                {[
                  { y: 65, len: 80 }, { y: 55, len: 76 }, { y: 75, len: 76 },
                  { y: 45, len: 60 }, { y: 85, len: 60 },
                  { y: 35, len: 30 }, { y: 95, len: 30 },
                  { y: 27, len: 8 }, { y: 103, len: 8 },
                ].map((a, i) => (
                  <g key={i}>
                    <line x1="70" y1={a.y} x2={70 + a.len} y2={a.y} stroke="#13315C" strokeWidth="1" opacity="0.4" />
                    <polygon points={`${70 + a.len},${a.y - 2} ${70 + a.len},${a.y + 2} ${70 + a.len + 4},${a.y}`} fill="#13315C" opacity="0.4" />
                  </g>
                ))}

                {/* Wall labels */}
                <text x="115" y="10" textAnchor="middle" fill="#0B2545" fontSize="7" fontFamily="Inter" fontWeight="600">wall</text>
                <text x="115" y="126" textAnchor="middle" fill="#0B2545" fontSize="7" fontFamily="Inter" fontWeight="600">wall</text>

                {/* Annotations */}
                <text x="212" y="40" fill="#8DA9C4" fontSize="7.5" fontFamily="Inter" fontWeight="500">Newtonian</text>
                <line x1="207" y1="38" x2="195" y2="42" stroke="#8DA9C4" strokeWidth="0.8" />
                <text x="212" y="55" fill="#13315C" fontSize="7.5" fontFamily="Inter" fontWeight="600">Shear-thinning</text>
                <line x1="207" y1="53" x2="195" y2="50" stroke="#13315C" strokeWidth="0.8" />

                <g transform="translate(212, 75)">
                  <text fill="#13315C" fontSize="6.5" fontFamily="Inter" fontWeight="500">γ̇<tspan fontSize="5" dy="1.5">w,true</tspan></text>
                  <text y="10" fill="#13315C" fontSize="6" fontFamily="Inter">{'>'} γ̇<tspan fontSize="5" dy="1.5">apparent</tspan></text>
                </g>
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
