"use client";

import SectionWrapper from "./SectionWrapper";
import AnimatedSection, { AnimatedCard } from "./AnimatedSection";

const processes = [
  {
    name: "Injection Molding",
    shearRate: "10²–10⁴ s⁻¹",
    keyParam: "η(γ̇), pvT",
    icon: (
      <svg viewBox="0 0 56 56" className="w-14 h-14">
        <defs>
          <linearGradient id="im-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#134074" />
            <stop offset="100%" stopColor="#0B2545" />
          </linearGradient>
        </defs>
        {/* Mold cavity */}
        <rect x="30" y="8" width="20" height="40" rx="3" stroke="url(#im-grad)" strokeWidth="2" fill="#134074" fillOpacity="0.06" />
        <rect x="33" y="14" width="14" height="28" rx="2" stroke="#8DA9C4" strokeWidth="1" fill="#EEF4ED" />
        {/* Barrel */}
        <rect x="4" y="20" width="26" height="16" rx="2" stroke="url(#im-grad)" strokeWidth="2" fill="none" />
        {/* Screw flights */}
        <line x1="10" y1="21" x2="14" y2="35" stroke="#134074" strokeWidth="1.2" opacity="0.4" />
        <line x1="16" y1="21" x2="20" y2="35" stroke="#134074" strokeWidth="1.2" opacity="0.4" />
        <line x1="22" y1="21" x2="26" y2="35" stroke="#134074" strokeWidth="1.2" opacity="0.4" />
        {/* Nozzle */}
        <path d="M30 25 L33 28 L30 31" fill="#134074" opacity="0.5" />
        {/* Melt front */}
        <path d="M35 20 Q40 28 35 36" stroke="#d4a86a" strokeWidth="1.5" fill="none" opacity="0.6" />
      </svg>
    ),
    details: "High shear + high pressure. Shear thinning critical for mold filling. Pressure-dependent viscosity adds 20–50% at 100+ MPa.",
  },
  {
    name: "Extrusion",
    shearRate: "10¹–10³ s⁻¹",
    keyParam: "η(γ̇, T), die swell",
    icon: (
      <svg viewBox="0 0 56 56" className="w-14 h-14">
        <defs>
          <linearGradient id="ex-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#13315C" />
            <stop offset="100%" stopColor="#0B2545" />
          </linearGradient>
        </defs>
        {/* Barrel */}
        <rect x="4" y="16" width="28" height="20" rx="3" stroke="url(#ex-grad)" strokeWidth="2" fill="#13315C" fillOpacity="0.06" />
        {/* Heater bands */}
        {[10, 18, 26].map(x => (
          <rect key={x} x={x} y="14" width="3" height="24" rx="1" fill="#134074" opacity="0.12" />
        ))}
        {/* Die */}
        <path d="M32 20 L40 24 L40 28 L32 32 Z" stroke="url(#ex-grad)" strokeWidth="1.8" fill="#13315C" fillOpacity="0.08" />
        {/* Extrudate with die swell */}
        <path d="M40 24 Q42 22 44 21 Q48 19 52 20" stroke="#134074" strokeWidth="1.8" fill="none" />
        <path d="M40 28 Q42 30 44 31 Q48 33 52 32" stroke="#134074" strokeWidth="1.8" fill="none" />
        {/* Die swell annotation */}
        <line x1="43" y1="18" x2="43" y2="34" stroke="#8DA9C4" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="45" y="17" fill="#8DA9C4" fontSize="5" fontFamily="Inter">B</text>
      </svg>
    ),
    details: "Continuous process. Die swell B = 1.1–1.5 (HDPE). Controlled by N₁ and elastic memory.",
  },
  {
    name: "Blow Molding",
    shearRate: "10⁰–10¹ s⁻¹",
    keyParam: "η_E, strain hardening",
    icon: (
      <svg viewBox="0 0 56 56" className="w-14 h-14">
        <defs>
          <linearGradient id="bm-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="100%" stopColor="#13315C" />
          </linearGradient>
          <radialGradient id="bm-bottle" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="#134074" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#134074" stopOpacity="0.12" />
          </radialGradient>
        </defs>
        {/* Mold halves */}
        <path d="M10 12 L10 44 Q10 48 14 48 L22 48 Q24 48 24 44 Q24 36 18 30 L18 12 Z" stroke="url(#bm-grad)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
        <path d="M46 12 L46 44 Q46 48 42 48 L34 48 Q32 48 32 44 Q32 36 38 30 L38 12 Z" stroke="url(#bm-grad)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
        {/* Parison/Bottle shape */}
        <path d="M24 12 L24 14 Q24 32 16 38 Q14 44 14 46 L14 48 Q14 50 18 50 L38 50 Q42 50 42 48 L42 46 Q42 44 40 38 Q32 32 32 14 L32 12 Z" stroke="#0B2545" strokeWidth="2" fill="url(#bm-bottle)" />
        {/* Neck */}
        <rect x="24" y="6" width="8" height="6" rx="1" stroke="#0B2545" strokeWidth="1.5" fill="none" />
        {/* Air blow arrows */}
        <line x1="28" y1="14" x2="28" y2="22" stroke="#8DA9C4" strokeWidth="1" />
        <polygon points="26,22 30,22 28,26" fill="#8DA9C4" opacity="0.6" />
        <line x1="28" y1="26" x2="22" y2="34" stroke="#8DA9C4" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
        <line x1="28" y1="26" x2="34" y2="34" stroke="#8DA9C4" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
      </svg>
    ),
    details: "Biaxial extension dominates. Strain hardening prevents non-uniform thinning. LDPE excels, recycled PE struggles.",
  },
  {
    name: "Film Casting",
    shearRate: "10¹–10² s⁻¹",
    keyParam: "η_E, drawability",
    icon: (
      <svg viewBox="0 0 56 56" className="w-14 h-14">
        <defs>
          <linearGradient id="fc-film" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#134074" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#134074" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#134074" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Die */}
        <rect x="4" y="18" width="14" height="16" rx="2" stroke="#134074" strokeWidth="2" fill="#134074" fillOpacity="0.06" />
        <rect x="16" y="22" width="4" height="8" rx="1" stroke="#134074" strokeWidth="1.5" fill="none" />
        {/* Film web */}
        <path d="M20 24 Q28 22 36 18 L36 34 Q28 30 20 28 Z" fill="url(#fc-film)" stroke="#134074" strokeWidth="1" />
        {/* Chill roll */}
        <circle cx="42" cy="26" r="8" stroke="#0B2545" strokeWidth="2" fill="#0B2545" fillOpacity="0.05" />
        <circle cx="42" cy="26" r="2" fill="#0B2545" opacity="0.3" />
        {/* Film wrapping around roll */}
        <path d="M36 18 Q34 16 38 14 Q46 12 50 18" stroke="#134074" strokeWidth="1.2" fill="none" />
        {/* Take-up direction arrow */}
        <line x1="50" y1="18" x2="54" y2="16" stroke="#8DA9C4" strokeWidth="1.2" />
        <polygon points="54,14 54,18 56,16" fill="#8DA9C4" />
        {/* Draw ratio annotation */}
        <text x="28" y="40" fill="#8DA9C4" fontSize="5" fontFamily="Inter" textAnchor="middle">draw</text>
        <line x1="22" y1="37" x2="34" y2="37" stroke="#8DA9C4" strokeWidth="0.6" markerEnd="url(#arrow)" />
      </svg>
    ),
    details: "Uniaxial extension in draw direction. Draw resonance instability at critical draw ratio.",
  },
  {
    name: "3D Printing (FDM)",
    shearRate: "10²–10⁴ s⁻¹",
    keyParam: "η(γ̇), die swell, G'",
    icon: (
      <svg viewBox="0 0 56 56" className="w-14 h-14">
        <defs>
          <linearGradient id="fdm-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#13315C" />
            <stop offset="100%" stopColor="#0B2545" />
          </linearGradient>
        </defs>
        {/* Hotend body */}
        <rect x="22" y="4" width="12" height="14" rx="2" stroke="url(#fdm-grad)" strokeWidth="1.8" fill="#13315C" fillOpacity="0.06" />
        {/* Heat sink fins */}
        {[6, 10, 14].map(y => (
          <line key={y} x1="20" y1={y} x2="36" y2={y} stroke="#13315C" strokeWidth="1" opacity="0.3" />
        ))}
        {/* Nozzle */}
        <path d="M24 18 L26 24 L30 24 L32 18" stroke="#0B2545" strokeWidth="1.8" fill="#0B2545" fillOpacity="0.1" />
        {/* Extruded bead */}
        <path d="M28 24 L28 28" stroke="#134074" strokeWidth="2.5" strokeLinecap="round" />
        {/* Printed layers */}
        <path d="M12 46 L44 46 L44 42 L12 42 Z" fill="#134074" fillOpacity="0.08" stroke="#134074" strokeWidth="1" />
        <path d="M12 42 L44 42 L44 38 L12 38 Z" fill="#134074" fillOpacity="0.12" stroke="#134074" strokeWidth="1" />
        <path d="M12 38 L44 38 L44 34 L12 34 Z" fill="#134074" fillOpacity="0.16" stroke="#134074" strokeWidth="1" />
        {/* Current layer being printed */}
        <path d="M12 34 L28 34" stroke="#13315C" strokeWidth="1.5" />
        {/* Motion arrows */}
        <line x1="28" y1="30" x2="28" y2="32" stroke="#8DA9C4" strokeWidth="0.8" strokeDasharray="1 1" />
        <polygon points="26,34 30,34 28,32" fill="#8DA9C4" opacity="0.5" />
        {/* Build plate */}
        <rect x="8" y="46" width="40" height="3" rx="1.5" fill="#0B2545" fillOpacity="0.15" />
      </svg>
    ),
    details: "Fast shear thinning for extrusion + rapid elastic recovery for shape retention. G' recovery timescale critical.",
  },
  {
    name: "Fiber Spinning",
    shearRate: "10³–10⁵ s⁻¹",
    keyParam: "η_E, crystallization",
    icon: (
      <svg viewBox="0 0 56 56" className="w-14 h-14">
        <defs>
          <linearGradient id="fs-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="100%" stopColor="#13315C" />
          </linearGradient>
        </defs>
        {/* Spinneret */}
        <rect x="14" y="4" width="28" height="10" rx="3" stroke="url(#fs-grad)" strokeWidth="2" fill="#0B2545" fillOpacity="0.06" />
        {/* Spinneret holes */}
        {[22, 28, 34].map(x => (
          <circle key={x} cx={x} cy="14" r="1.5" fill="#0B2545" opacity="0.4" />
        ))}
        {/* Filaments */}
        <path d="M22 16 Q21 28 20 38" stroke="#0B2545" strokeWidth="1.5" fill="none" />
        <path d="M28 16 Q28 28 28 38" stroke="#0B2545" strokeWidth="1.5" fill="none" />
        <path d="M34 16 Q35 28 36 38" stroke="#0B2545" strokeWidth="1.5" fill="none" />
        {/* Quench air */}
        <line x1="8" y1="24" x2="16" y2="24" stroke="#8DA9C4" strokeWidth="0.8" />
        <polygon points="16,22.5 16,25.5 18,24" fill="#8DA9C4" opacity="0.5" />
        <line x1="8" y1="30" x2="16" y2="30" stroke="#8DA9C4" strokeWidth="0.8" />
        <polygon points="16,28.5 16,31.5 18,30" fill="#8DA9C4" opacity="0.5" />
        {/* Take-up roller */}
        <circle cx="28" cy="44" r="5" stroke="#0B2545" strokeWidth="1.5" fill="#0B2545" fillOpacity="0.05" />
        <circle cx="28" cy="44" r="1.5" fill="#0B2545" opacity="0.3" />
        {/* Fiber wrapping */}
        <path d="M20 40 Q24 38 28 39" stroke="#0B2545" strokeWidth="1" fill="none" />
        <path d="M36 40 Q32 38 28 39" stroke="#0B2545" strokeWidth="1" fill="none" />
        {/* Draw direction */}
        <line x1="28" y1="50" x2="28" y2="54" stroke="#134074" strokeWidth="0.8" />
        <polygon points="26.5,54 29.5,54 28,56" fill="#134074" opacity="0.5" />
      </svg>
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

      {/* Shear Rate Map — Professional */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-4">Shear Rate Map</h3>
        <div className="bg-white border border-[#c9d9e8] rounded-2xl p-6 overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Axis header */}
            <div className="flex items-center mb-1">
              <span className="w-32" />
              <div className="flex-1 relative h-6">
                {["10⁻²", "10⁻¹", "10⁰", "10¹", "10²", "10³", "10⁴", "10⁵"].map((v, i) => (
                  <span key={i} className="absolute text-[10px] text-[#3d6285] font-medium" style={{ left: `${(i / 7) * 100}%`, transform: "translateX(-50%)" }}>{v}</span>
                ))}
              </div>
              <span className="w-10 text-right text-[10px] text-[#3d6285] font-semibold">s⁻¹</span>
            </div>

            {/* Gradient axis bar */}
            <div className="flex items-center mb-5">
              <span className="w-32" />
              <div className="flex-1 relative">
                <div className="h-2.5 rounded-full bg-gradient-to-r from-[#EEF4ED] via-[#8DA9C4] to-[#0B2545] shadow-inner" />
                {/* Tick marks */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                  <div key={i} className="absolute top-0 w-px h-2.5 bg-white/30" style={{ left: `${(i / 7) * 100}%` }} />
                ))}
              </div>
              <span className="w-10" />
            </div>

            {/* Process bars */}
            {[
              { name: "Sedimentation", start: 0, end: 12, color: "#8DA9C4" },
              { name: "Leveling", start: 5, end: 20, color: "#8DA9C4" },
              { name: "Extrusion", start: 38, end: 55, color: "#134074" },
              { name: "Injection Molding", start: 50, end: 75, color: "#13315C" },
              { name: "Coating", start: 55, end: 70, color: "#134074" },
              { name: "Fiber Spinning", start: 62, end: 88, color: "#0B2545" },
            ].map((proc, i) => (
              <div key={i} className="flex items-center mb-2 group">
                <span className="w-32 text-xs text-[#3d6285] text-right pr-4 font-medium">{proc.name}</span>
                <div className="flex-1 relative h-7">
                  {/* Bar background */}
                  <div className="absolute h-full rounded-lg transition-all group-hover:shadow-sm"
                    style={{ left: `${proc.start}%`, width: `${proc.end - proc.start}%`, backgroundColor: proc.color, opacity: 0.1 }} />
                  {/* Bar border with gradient effect */}
                  <div className="absolute h-full rounded-lg transition-all group-hover:opacity-100"
                    style={{ left: `${proc.start}%`, width: `${proc.end - proc.start}%`, border: `2px solid ${proc.color}`, opacity: 0.6 }} />
                  {/* Inner accent line */}
                  <div className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full"
                    style={{ left: `${proc.start + 1}%`, width: `${proc.end - proc.start - 2}%`, backgroundColor: proc.color, opacity: 0.25 }} />
                </div>
                <span className="w-10" />
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
            {
              name: "Sharkskin", trigger: "τ_w > 0.1 MPa",
              desc: "Surface melt fracture from stick-slip at die exit.",
              color: "#134074",
              icon: (
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <path d="M5 20 Q10 16 15 20 Q20 24 25 20 Q30 16 35 20" stroke="#134074" strokeWidth="2" fill="none" />
                  <path d="M5 28 Q10 24 15 28 Q20 32 25 28 Q30 24 35 28" stroke="#134074" strokeWidth="1.5" fill="none" opacity="0.4" />
                </svg>
              ),
            },
            {
              name: "Die Swell", trigger: "B = 1.1–4.0",
              desc: "Elastic memory from N₁. Depends on L/D, γ̇, and LCB.",
              color: "#13315C",
              icon: (
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <rect x="4" y="14" width="16" height="12" rx="1" stroke="#13315C" strokeWidth="1.5" fill="none" />
                  <path d="M20 14 Q24 10 28 8 L28 32 Q24 30 20 26" stroke="#13315C" strokeWidth="2" fill="#13315C" fillOpacity="0.08" />
                  <line x1="30" y1="6" x2="30" y2="34" stroke="#8DA9C4" strokeWidth="0.8" strokeDasharray="2 2" />
                </svg>
              ),
            },
            {
              name: "Melt Fracture", trigger: "τ_w > 0.3 MPa",
              desc: "Gross extrudate distortion from entry vortex instability.",
              color: "#0B2545",
              icon: (
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <rect x="4" y="12" width="16" height="16" rx="1" stroke="#0B2545" strokeWidth="1.5" fill="none" />
                  <path d="M20 16 Q24 14 28 18 Q32 22 28 26 Q24 24 20 24" stroke="#0B2545" strokeWidth="2" fill="none" />
                  <path d="M28 18 Q34 16 36 20 Q38 26 34 28" stroke="#0B2545" strokeWidth="1.5" fill="none" opacity="0.5" />
                </svg>
              ),
            },
          ].map((inst, i) => (
            <AnimatedCard key={i} delay={i * 0.1}
              className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                {inst.icon}
                <div>
                  <h4 className="font-bold text-[#0B2545] text-sm">{inst.name}</h4>
                  <div className="text-xs font-semibold text-[#134074]">{inst.trigger}</div>
                </div>
              </div>
              <p className="text-[#3d6285] text-xs">{inst.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
