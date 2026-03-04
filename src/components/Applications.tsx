"use client";

import SectionWrapper from "./SectionWrapper";
import AnimatedSection, { AnimatedCard } from "./AnimatedSection";

const processes = [
  {
    name: "Injection Molding",
    shearRate: "10²–10⁴ s⁻¹",
    keyParam: "η(γ̇), pvT",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12"><rect x="24" y="8" width="18" height="32" rx="2" stroke="#134074" strokeWidth="2" fill="none"/><path d="M6 24h18M6 20v8l6-4-6-4z" stroke="#134074" strokeWidth="2" fill="#134074"/></svg>
    ),
    details: "High shear + high pressure. Shear thinning critical for mold filling. Pressure-dependent viscosity adds 20–50% at 100+ MPa.",
  },
  {
    name: "Extrusion",
    shearRate: "10¹–10³ s⁻¹",
    keyParam: "η(γ̇, T), die swell",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12"><rect x="4" y="16" width="24" height="16" rx="2" stroke="#13315C" strokeWidth="2" fill="none"/><path d="M28 20h12v8H28" stroke="#13315C" strokeWidth="2" fill="none"/><path d="M40 22h6v4h-6" stroke="#8DA9C4" strokeWidth="2" fill="none"/></svg>
    ),
    details: "Continuous process. Die swell B = 1.1–1.5 (HDPE). Controlled by N₁ and elastic memory.",
  },
  {
    name: "Blow Molding",
    shearRate: "10⁰–10¹ s⁻¹",
    keyParam: "η_E, strain hardening",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12"><ellipse cx="24" cy="28" rx="14" ry="16" stroke="#0B2545" strokeWidth="2" fill="none"/><rect x="20" y="4" width="8" height="12" rx="1" stroke="#0B2545" strokeWidth="2" fill="none"/><path d="M24 16v4" stroke="#8DA9C4" strokeWidth="1.5" strokeDasharray="2 2"/></svg>
    ),
    details: "Biaxial extension dominates. Strain hardening prevents non-uniform thinning. LDPE excels, recycled PE struggles.",
  },
  {
    name: "Film Casting",
    shearRate: "10¹–10² s⁻¹",
    keyParam: "η_E, drawability",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12"><rect x="4" y="18" width="12" height="12" rx="1" stroke="#134074" strokeWidth="2" fill="none"/><line x1="16" y1="24" x2="48" y2="24" stroke="#134074" strokeWidth="1.5"/><circle cx="40" cy="24" r="6" stroke="#8DA9C4" strokeWidth="2" fill="none"/></svg>
    ),
    details: "Uniaxial extension in draw direction. Draw resonance instability at critical draw ratio.",
  },
  {
    name: "3D Printing (FDM)",
    shearRate: "10²–10⁴ s⁻¹",
    keyParam: "η(γ̇), die swell, G'",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12"><path d="M24 4v20M20 24h8" stroke="#13315C" strokeWidth="2"/><path d="M8 30 Q24 26 40 30 Q40 40 24 44 Q8 40 8 30z" stroke="#13315C" strokeWidth="2" fill="none"/></svg>
    ),
    details: "Fast shear thinning for extrusion + rapid elastic recovery for shape retention. G' recovery timescale critical.",
  },
  {
    name: "Fiber Spinning",
    shearRate: "10³–10⁵ s⁻¹",
    keyParam: "η_E, crystallization",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12"><circle cx="24" cy="10" r="6" stroke="#0B2545" strokeWidth="2" fill="none"/><line x1="24" y1="16" x2="24" y2="44" stroke="#0B2545" strokeWidth="2"/><path d="M20 44h8" stroke="#0B2545" strokeWidth="2"/></svg>
    ),
    details: "Extreme extensional strain rates. Flow-induced crystallization determines fiber properties.",
  },
];

export default function Applications() {
  return (
    <SectionWrapper
      id="applications"
      title="Industrial Applications"
      subtitle="Section 4 — Processing"
      accent="#8DA9C4"
    >
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-6">Processing Methods & Rheological Requirements</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {processes.map((proc, i) => (
            <AnimatedCard key={i} delay={i * 0.06}
              className="bg-white border border-[#c9d9e8] rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                {proc.icon}
                <div>
                  <h4 className="font-bold text-[#0B2545]">{proc.name}</h4>
                  <span className="text-xs text-[#8DA9C4]">{proc.shearRate}</span>
                </div>
              </div>
              <div className="bg-[#EEF4ED] rounded-lg px-3 py-1.5 mb-3 inline-block">
                <span className="text-xs font-semibold text-[#134074]">{proc.keyParam}</span>
              </div>
              <p className="text-[#3d6285] text-xs leading-relaxed">{proc.details}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Shear Rate Map */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-4">Shear Rate Map</h3>
        <div className="bg-white border border-[#c9d9e8] rounded-2xl p-6 overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex items-center mb-2 text-xs text-[#3d6285]">
              <span className="w-28" />
              <div className="flex-1 flex justify-between">
                {["10⁻²", "10⁻¹", "10⁰", "10¹", "10²", "10³", "10⁴", "10⁵"].map((v, i) => (
                  <span key={i} className="text-[10px]">{v}</span>
                ))}
              </div>
              <span className="w-8 text-right text-[10px]">s⁻¹</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="w-28" />
              <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-[#EEF4ED] via-[#8DA9C4] to-[#0B2545]" />
            </div>
            {[
              { name: "Sedimentation", start: 0, end: 12, color: "#8DA9C4" },
              { name: "Leveling", start: 5, end: 20, color: "#8DA9C4" },
              { name: "Extrusion", start: 38, end: 55, color: "#134074" },
              { name: "Injection Molding", start: 50, end: 75, color: "#13315C" },
              { name: "Coating", start: 55, end: 70, color: "#134074" },
              { name: "Fiber Spinning", start: 62, end: 88, color: "#0B2545" },
            ].map((proc, i) => (
              <div key={i} className="flex items-center mb-1.5">
                <span className="w-28 text-xs text-[#3d6285] text-right pr-3">{proc.name}</span>
                <div className="flex-1 relative h-5">
                  <div className="absolute h-full rounded-full"
                    style={{ left: `${proc.start}%`, width: `${proc.end - proc.start}%`, backgroundColor: proc.color, opacity: 0.15 }} />
                  <div className="absolute h-full rounded-full"
                    style={{ left: `${proc.start}%`, width: `${proc.end - proc.start}%`, border: `1.5px solid ${proc.color}` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Instabilities */}
      <AnimatedSection>
        <h3 className="text-2xl font-bold text-[#0B2545] mb-4">Processing Instabilities</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { name: "Sharkskin", trigger: "τ_w > 0.1 MPa", desc: "Surface melt fracture from stick-slip at die exit.", color: "#134074" },
            { name: "Die Swell", trigger: "B = 1.1–4.0", desc: "Elastic memory from N₁. Depends on L/D, γ̇, and LCB.", color: "#13315C" },
            { name: "Melt Fracture", trigger: "τ_w > 0.3 MPa", desc: "Gross extrudate distortion from entry vortex instability.", color: "#0B2545" },
          ].map((inst, i) => (
            <AnimatedCard key={i} delay={i * 0.1}
              className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-5 text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: inst.color }}>
                {inst.name[0]}
              </div>
              <h4 className="font-bold text-[#0B2545] text-sm mb-1">{inst.name}</h4>
              <div className="text-xs font-semibold text-[#134074] mb-2">{inst.trigger}</div>
              <p className="text-[#3d6285] text-xs">{inst.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
