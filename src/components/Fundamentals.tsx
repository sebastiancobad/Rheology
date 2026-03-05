"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SectionWrapper from "./SectionWrapper";
import FlowCurveChart from "./charts/FlowCurveChart";
import ViscosityModelsChart from "./charts/ViscosityModelsChart";
import CreepRecoveryChart from "./charts/CreepRecoveryChart";
import AnimatedSection, { AnimatedCard } from "./AnimatedSection";
import FlowTypesDiagram from "./diagrams/FlowTypesDiagram";

const StressTensor3D = dynamic(() => import("./3d/StressTensor3D"), { ssr: false });
const PolymerChain3D = dynamic(() => import("./3d/PolymerChain3D"), { ssr: false });

export default function Fundamentals() {
  const [shearRate, setShearRate] = useState(0);
  const [activeTab, setActiveTab] = useState<"flow" | "models" | "creep">("flow");
  const [activeAdvTab, setActiveAdvTab] = useState<"extensional" | "yield" | "thixotropy">("extensional");

  return (
    <SectionWrapper
      id="fundamentals"
      title="Fundamentals of Rheology"
      subtitle="Section 1 — Didactic Introduction"
      accent="#134074"
      number="01"
    >
      {/* Introduction — What is Rheology? */}
      <AnimatedSection className="mb-16">
        <div className="bg-white border border-[#d0dde8] rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-[#0B2545] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            What is Rheology?
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4 text-sm text-[#2c4a6e] leading-[1.8]">
              <p>
                <strong className="text-[#0B2545]">Rheology</strong> (from the Greek <em>rheos</em> = flow) is the science
                of deformation and flow of matter. Coined by Eugene Bingham in 1929, the field studies how materials
                respond to applied forces — bridging the gap between classical fluid mechanics (Newtonian liquids) and
                solid mechanics (Hookean elasticity).
              </p>
              <p>
                Most real materials are neither perfectly viscous nor perfectly elastic. Polymer melts, biological fluids,
                food products, paints, and concrete all exhibit <strong className="text-[#0B2545]">viscoelastic behavior</strong> —
                they store energy like a solid and dissipate it like a liquid, with the balance depending on the timescale
                of observation. This duality is captured by the <strong className="text-[#134074]">Deborah number</strong>:
                De = λ/t<sub>obs</sub>, where λ is the material&apos;s relaxation time and t<sub>obs</sub> is the observation time.
                When De ≫ 1, the material appears solid-like; when De ≪ 1, it flows like a liquid.
              </p>
              <p>
                The field rests on the <strong className="text-[#0B2545]">continuum hypothesis</strong>: matter is treated
                as a continuous medium rather than discrete molecules, valid when the length scale of interest is much
                larger than molecular dimensions. This allows us to define field quantities — stress, strain, and
                velocity — at every point in space, and to write constitutive equations that relate them.
              </p>
            </div>
            <div className="space-y-4">
              {/* Material Spectrum */}
              <div className="bg-gradient-to-b from-[#f8faf8] to-[#EEF4ED] rounded-xl p-5 border border-[#d0dde8]/50">
                <h5 className="text-xs font-bold text-[#0B2545] mb-3 uppercase tracking-wide">The Material Response Spectrum</h5>
                <svg viewBox="0 0 280 100" className="w-full h-auto mb-3">
                  {/* Gradient bar */}
                  <defs>
                    <linearGradient id="spectrum-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8DA9C4" />
                      <stop offset="50%" stopColor="#134074" />
                      <stop offset="100%" stopColor="#0B2545" />
                    </linearGradient>
                  </defs>
                  <rect x="30" y="30" width="220" height="12" rx="6" fill="url(#spectrum-grad)" opacity="0.2" />
                  <rect x="30" y="30" width="220" height="12" rx="6" stroke="url(#spectrum-grad)" strokeWidth="1.5" fill="none" />
                  {/* Labels */}
                  <text x="40" y="25" fill="#8DA9C4" fontSize="8" fontFamily="Inter" fontWeight="600">Viscous</text>
                  <text x="120" y="25" fill="#134074" fontSize="8" fontFamily="Inter" fontWeight="600" textAnchor="middle">Viscoelastic</text>
                  <text x="240" y="25" fill="#0B2545" fontSize="8" fontFamily="Inter" fontWeight="600" textAnchor="end">Elastic</text>
                  {/* Tick marks and examples */}
                  <line x1="50" y1="42" x2="50" y2="52" stroke="#8DA9C4" strokeWidth="1" />
                  <text x="50" y="62" fill="#8DA9C4" fontSize="6.5" fontFamily="Inter" textAnchor="middle">Water</text>
                  <text x="50" y="72" fill="#8DA9C4" fontSize="6" fontFamily="Inter" textAnchor="middle">De → 0</text>
                  <line x1="110" y1="42" x2="110" y2="52" stroke="#134074" strokeWidth="1" />
                  <text x="110" y="62" fill="#134074" fontSize="6.5" fontFamily="Inter" textAnchor="middle">Polymer melt</text>
                  <text x="110" y="72" fill="#134074" fontSize="6" fontFamily="Inter" textAnchor="middle">De ~ 1</text>
                  <line x1="170" y1="42" x2="170" y2="52" stroke="#13315C" strokeWidth="1" />
                  <text x="170" y="62" fill="#13315C" fontSize="6.5" fontFamily="Inter" textAnchor="middle">Rubber</text>
                  <text x="170" y="72" fill="#13315C" fontSize="6" fontFamily="Inter" textAnchor="middle">De ~ 10²</text>
                  <line x1="230" y1="42" x2="230" y2="52" stroke="#0B2545" strokeWidth="1" />
                  <text x="230" y="62" fill="#0B2545" fontSize="6.5" fontFamily="Inter" textAnchor="middle">Glass / Steel</text>
                  <text x="230" y="72" fill="#0B2545" fontSize="6" fontFamily="Inter" textAnchor="middle">De → ∞</text>
                  {/* Arrow */}
                  <text x="140" y="90" fill="#2c4a6e" fontSize="7" fontFamily="Inter" textAnchor="middle">← Increasing Deborah Number (De = λ / t) →</text>
                </svg>
              </div>

              {/* Why it matters */}
              <div className="bg-[#EEF4ED] rounded-xl p-5 border border-[#d0dde8]/50">
                <h5 className="text-xs font-bold text-[#134074] mb-3 uppercase tracking-wide">Why Rheology Matters</h5>
                <div className="space-y-2 text-xs text-[#2c4a6e]">
                  {[
                    "Predicting how a polymer fills a mold, stretches into a film, or extrudes through a die",
                    "Quality control: detecting molecular weight changes, contamination, or degradation",
                    "Designing formulations: paints that don't drip, foods with the right 'mouthfeel', adhesives that hold",
                    "Connecting molecular structure (Mw, MWD, branching) to processing behavior",
                    "Enabling simulation: every CFD polymer flow solver requires rheological constitutive models",
                    "Troubleshooting: melt fracture, die swell, warpage all have rheological root causes",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* The Two Fundamental Modes of Deformation */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-2" style={{ fontFamily: "var(--font-display)" }}>
          The Two Fundamental Modes of Deformation
        </h3>
        <p className="text-[#2c4a6e] text-sm mb-6 leading-[1.8]">
          Every deformation a material can undergo is composed of two fundamental modes: <strong className="text-[#0B2545]">shear</strong> (shape change at constant volume) and <strong className="text-[#0B2545]">extension</strong> (volume element stretching). In polymer processing, both are always present — shear dominates in channel flow, while extension dominates at contractions, expansions, and free surfaces.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          <AnimatedCard className="bg-white border border-[#d0dde8] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#134074] text-white flex items-center justify-center font-bold text-sm">S</div>
              <h4 className="font-bold text-[#0B2545]">Simple Shear</h4>
            </div>
            <svg viewBox="0 0 220 100" className="w-full h-auto mb-4">
              {/* Fixed bottom plate */}
              <rect x="30" y="70" width="160" height="8" rx="2" fill="#0B2545" opacity="0.15" />
              <text x="110" y="90" textAnchor="middle" fill="#8DA9C4" fontSize="7" fontFamily="Inter">Fixed plate</text>
              {/* Deformed element */}
              <path d="M 60,30 L 100,30 L 90,70 L 50,70 Z" fill="#134074" opacity="0.08" stroke="#134074" strokeWidth="1.5" />
              {/* Original element (dashed) */}
              <rect x="50" y="30" width="40" height="40" fill="none" stroke="#8DA9C4" strokeWidth="1" strokeDasharray="4 3" />
              {/* Moving top plate */}
              <rect x="40" y="22" width="160" height="8" rx="2" fill="#134074" opacity="0.2" />
              <text x="120" y="18" textAnchor="middle" fill="#134074" fontSize="7" fontFamily="Inter">Moving plate (velocity v)</text>
              {/* Arrow for velocity */}
              <line x1="140" y1="26" x2="190" y2="26" stroke="#134074" strokeWidth="1.5" />
              <polygon points="190,23 190,29 196,26" fill="#134074" />
              {/* Height label */}
              <line x1="42" y1="30" x2="42" y2="70" stroke="#2c4a6e" strokeWidth="0.8" />
              <text x="38" y="53" fill="#2c4a6e" fontSize="7" fontFamily="Inter" textAnchor="end">h</text>
              {/* Angle gamma */}
              <path d="M 50,70 L 50,55 L 55,55" fill="none" stroke="#134074" strokeWidth="1" />
              <text x="58" y="60" fill="#134074" fontSize="7" fontFamily="Inter" fontWeight="600">γ</text>
            </svg>
            <div className="space-y-2 text-xs text-[#2c4a6e]">
              <div className="math-block !text-sm !py-1.5 !px-3 !my-1">γ̇ = dγ/dt = v/h &nbsp;&nbsp;[s⁻¹]</div>
              <p>
                Material layers slide over each other. The velocity profile is linear for Newtonian fluids between parallel plates.
                The <strong className="text-[#0B2545]">shear stress</strong> τ is the force per unit area required to maintain this deformation.
                For a Newtonian fluid, τ = η·γ̇ where η is the viscosity (constant). For polymers, η decreases with γ̇ (shear thinning)
                because entangled chains align and disentangle under flow.
              </p>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.1} className="bg-[#EEF4ED] border border-[#d0dde8] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-sm">E</div>
              <h4 className="font-bold text-[#0B2545]">Uniaxial Extension</h4>
            </div>
            <svg viewBox="0 0 220 100" className="w-full h-auto mb-4">
              {/* Original element (dashed) */}
              <rect x="70" y="30" width="80" height="40" fill="none" stroke="#8DA9C4" strokeWidth="1" strokeDasharray="4 3" rx="3" />
              {/* Stretched element */}
              <rect x="40" y="38" width="140" height="24" fill="#0B2545" opacity="0.08" stroke="#0B2545" strokeWidth="1.5" rx="3" />
              {/* Arrows stretching */}
              <line x1="40" y1="50" x2="15" y2="50" stroke="#0B2545" strokeWidth="1.5" />
              <polygon points="15,47 15,53 9,50" fill="#0B2545" />
              <line x1="180" y1="50" x2="205" y2="50" stroke="#0B2545" strokeWidth="1.5" />
              <polygon points="205,47 205,53 211,50" fill="#0B2545" />
              {/* Labels */}
              <text x="110" y="25" textAnchor="middle" fill="#8DA9C4" fontSize="7" fontFamily="Inter">Original</text>
              <text x="110" y="78" textAnchor="middle" fill="#0B2545" fontSize="7" fontFamily="Inter" fontWeight="600">Stretched</text>
              {/* Strain labels */}
              <text x="110" y="92" textAnchor="middle" fill="#2c4a6e" fontSize="7" fontFamily="Inter">ε̇ = dε/dt &nbsp; [s⁻¹]</text>
            </svg>
            <div className="space-y-2 text-xs text-[#2c4a6e]">
              <div className="math-block !text-sm !py-1.5 !px-3 !my-1">η<sub>E</sub> = σ<sub>E</sub> / ε̇ &nbsp;&nbsp;[Pa·s]</div>
              <p>
                Material is pulled apart along one axis while contracting in the perpendicular directions.
                For a Newtonian fluid, the <strong className="text-[#0B2545]">Trouton ratio</strong> η<sub>E</sub>/η₀ = 3 exactly.
                Branched polymers (e.g., LDPE) show <strong className="text-[#134074]">strain hardening</strong>:
                η<sub>E</sub> rises far above 3η₀ at high Hencky strains, a critical property for blow molding,
                film blowing, and foam stabilization. Linear polymers (HDPE, PP) typically do not strain harden.
              </p>
            </div>
          </AnimatedCard>
        </div>
      </AnimatedSection>

      {/* Viscoelasticity Explained */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Understanding Viscoelasticity
        </h3>
        <p className="text-[#2c4a6e] text-sm mb-6 leading-[1.8]">
          Polymers are the quintessential viscoelastic materials. Their long-chain molecular architecture gives rise
          to a spectrum of relaxation times — from fast segmental motions (nanoseconds) to slow reptation of entire
          chains (seconds to minutes). This section explains the physical origins and practical consequences.
        </p>
        <div className="grid lg:grid-cols-3 gap-5">
          <AnimatedCard className="bg-white border border-[#d0dde8] rounded-2xl p-5">
            <div className="w-8 h-8 rounded-full bg-[#8DA9C4] text-white flex items-center justify-center text-xs font-bold mb-3">1</div>
            <h4 className="font-bold text-[#0B2545] text-sm mb-2">Elastic Response (Energy Storage)</h4>
            <p className="text-[#2c4a6e] text-xs leading-relaxed mb-3">
              When a polymer is deformed, chain segments are displaced from their equilibrium conformations.
              The resulting <strong className="text-[#0B2545]">entropic restoring force</strong> drives recovery
              once the stress is removed — like a spring. This is quantified by the <strong className="text-[#134074]">storage modulus G&apos;</strong>,
              which measures the in-phase (elastic) component of the stress response to oscillatory deformation.
            </p>
            <div className="math-block !text-xs !py-1.5 !px-2 !my-1">G&apos; = (τ₀/γ₀) · cos δ</div>
            <p className="text-[#8DA9C4] text-xs mt-2">
              Molecular origin: chain stretching, entanglement network deformation, crosslinks.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.08} className="bg-white border border-[#d0dde8] rounded-2xl p-5">
            <div className="w-8 h-8 rounded-full bg-[#134074] text-white flex items-center justify-center text-xs font-bold mb-3">2</div>
            <h4 className="font-bold text-[#0B2545] text-sm mb-2">Viscous Response (Energy Dissipation)</h4>
            <p className="text-[#2c4a6e] text-xs leading-relaxed mb-3">
              Simultaneously, chain segments undergo <strong className="text-[#0B2545]">irreversible rearrangements</strong> —
              reptation along the tube, constraint release, and segmental friction. Energy is converted to heat.
              This is quantified by the <strong className="text-[#134074]">loss modulus G&apos;&apos;</strong>,
              the out-of-phase (viscous) component.
            </p>
            <div className="math-block !text-xs !py-1.5 !px-2 !my-1">G&apos;&apos; = (τ₀/γ₀) · sin δ</div>
            <p className="text-[#8DA9C4] text-xs mt-2">
              Molecular origin: chain reptation, Rouse modes, monomeric friction, disentanglement.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.16} className="bg-[#EEF4ED] border border-[#d0dde8] rounded-2xl p-5">
            <div className="w-8 h-8 rounded-full bg-[#0B2545] text-white flex items-center justify-center text-xs font-bold mb-3">3</div>
            <h4 className="font-bold text-[#0B2545] text-sm mb-2">The Phase Angle δ</h4>
            <p className="text-[#2c4a6e] text-xs leading-relaxed mb-3">
              The <strong className="text-[#0B2545]">loss tangent</strong> tan δ = G&apos;&apos;/G&apos; captures the balance.
              A perfectly elastic solid has δ = 0° (G&apos;&apos; = 0); a Newtonian liquid has δ = 90° (G&apos; = 0).
              Polymers lie between these extremes, with δ depending on frequency, temperature, and molecular architecture.
            </p>
            <div className="space-y-1.5 text-xs text-[#2c4a6e]">
              <div className="flex justify-between border-b border-[#d0dde8]/50 pb-1"><span>tan δ &lt; 1</span><span className="text-[#134074] font-semibold">Solid-like (G&apos; &gt; G&apos;&apos;)</span></div>
              <div className="flex justify-between border-b border-[#d0dde8]/50 pb-1"><span>tan δ = 1</span><span className="text-[#134074] font-semibold">Gel point / crossover</span></div>
              <div className="flex justify-between"><span>tan δ &gt; 1</span><span className="text-[#134074] font-semibold">Liquid-like (G&apos;&apos; &gt; G&apos;)</span></div>
            </div>
            <div className="math-block !text-xs !py-1.5 !px-2 !my-2">η* = |G*|/ω = √(G&apos;² + G&apos;&apos;²) / ω</div>
            <p className="text-[#8DA9C4] text-xs">
              The complex viscosity η* is the oscillatory analog of steady shear viscosity. The Cox-Merz rule
              states η*(ω) ≈ η(γ̇) at ω = γ̇ — valid for most linear polymers.
            </p>
          </AnimatedCard>
        </div>
      </AnimatedSection>

      {/* Molecular Origins of Polymer Rheology */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Molecular Origins of Polymer Rheology
        </h3>
        <p className="text-[#2c4a6e] text-sm mb-6 leading-[1.8]">
          A polymer&apos;s rheological behavior is dictated by its molecular structure. Understanding these connections is
          central to material selection, quality control, and formulation design.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-[#d0dde8] rounded-2xl p-6">
            <h4 className="font-bold text-[#0B2545] mb-4">Structure → Property Relationships</h4>
            <div className="space-y-3 text-xs text-[#2c4a6e]">
              {[
                {
                  param: "Molecular Weight (Mw)",
                  effect: "η₀ ∝ Mw³·⁴ above Mc (critical entanglement Mw). Doubling Mw increases η₀ by ~10×. Higher Mw → longer relaxation times, more elastic behavior.",
                },
                {
                  param: "MWD (Polydispersity)",
                  effect: "Broad MWD → broader relaxation spectrum. High-Mw tail dominates elasticity (G', N₁, die swell). Low-Mw tail acts as plasticizer. MWD controls shear-thinning onset.",
                },
                {
                  param: "Long-Chain Branching (LCB)",
                  effect: "Branches suppress reptation → higher η₀ relative to linear polymer of same Mw. LCB causes strain hardening in extension. Detectable via van Gurp-Palmen plot, thermorheological complexity.",
                },
                {
                  param: "Chain Stiffness / Backbone",
                  effect: "Stiff backbones (e.g., PC, PET, LCP) give shorter entanglement spacing, higher plateau modulus G_N⁰. Flexible chains (PE, PDMS) have lower G_N⁰ but higher entanglement density.",
                },
                {
                  param: "Entanglements",
                  effect: "Above Me (entanglement Mw), chains form a transient network. The entanglement plateau G_N⁰ = ρRT/Me is a fundamental material constant. More entanglements = more elastic.",
                },
              ].map((item, i) => (
                <div key={i} className="border-b border-[#d0dde8]/30 pb-2 last:border-0">
                  <div className="font-semibold text-[#134074] mb-0.5">{item.param}</div>
                  <p>{item.effect}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <AnimatedCard delay={0.1} className="bg-[#EEF4ED] border border-[#d0dde8] rounded-2xl p-6">
              <h4 className="font-bold text-[#0B2545] mb-3">The Entanglement Concept</h4>
              <p className="text-xs text-[#2c4a6e] leading-relaxed mb-3">
                Above a critical molecular weight M<sub>c</sub> ≈ 2M<sub>e</sub>, polymer chains become topologically
                constrained by their neighbors. These <strong className="text-[#0B2545]">entanglements</strong> act like
                temporary crosslinks: they resist deformation on short timescales (giving elasticity) but relax
                on long timescales (allowing flow). The number of entanglements per chain Z = M<sub>w</sub>/M<sub>e</sub>
                controls the relaxation time spectrum.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-[#d0dde8]/50">
                  <div className="text-xs font-semibold text-[#134074] mb-1">Below M<sub>c</sub></div>
                  <div className="math-block !text-xs !py-1 !px-2 !my-1">η₀ ∝ Mw¹·⁰</div>
                  <p className="text-[#8DA9C4] text-[10px]">Rouse dynamics, no plateau</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-[#d0dde8]/50">
                  <div className="text-xs font-semibold text-[#0B2545] mb-1">Above M<sub>c</sub></div>
                  <div className="math-block !text-xs !py-1 !px-2 !my-1">η₀ ∝ Mw³·⁴</div>
                  <p className="text-[#8DA9C4] text-[10px]">Reptation, entanglement plateau</p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2} className="bg-white border border-[#d0dde8] rounded-2xl p-6">
              <h4 className="font-bold text-[#0B2545] mb-3">Relaxation Time Spectrum</h4>
              <p className="text-xs text-[#2c4a6e] leading-relaxed mb-3">
                Real polymers have a <strong className="text-[#0B2545]">distribution of relaxation times</strong>,
                not a single λ. The spectrum H(λ) encodes the full dynamics:
              </p>
              <div className="space-y-2 text-xs text-[#2c4a6e]">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA9C4] mt-1.5 shrink-0" />
                  <span><strong className="text-[#0B2545]">Fast modes</strong> (λ ~ 10⁻⁸–10⁻⁴ s): segmental motions, local Rouse modes</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" />
                  <span><strong className="text-[#0B2545]">Intermediate</strong> (λ ~ 10⁻⁴–10⁰ s): Rouse within tube, contour length fluctuations</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B2545] mt-1.5 shrink-0" />
                  <span><strong className="text-[#0B2545]">Slow modes</strong> (λ ~ 10⁰–10³ s): reptation, constraint release, arm retraction (branched)</span>
                </div>
              </div>
              <div className="math-block !text-xs !py-1.5 !px-2 !my-2">G(t) = ∫₀^∞ H(λ)/λ · e^(−t/λ) dλ</div>
              <p className="text-[#8DA9C4] text-[10px]">
                The discrete analog: G(t) = Σ gᵢ · exp(−t/λᵢ) — the generalized Maxwell model.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Hero visual: 3D Stress Tensor + Key Equations */}
      <AnimatedSection className="grid lg:grid-cols-2 gap-8 mb-16">
        <div>
          <h3 className="text-xl font-bold text-[#0B2545] mb-3">Stress Tensor Visualization</h3>
          <p className="text-[#2c4a6e] text-sm mb-4">
            Interact with the 3D stress element. Normal stresses (σ₁₁, σ₂₂, σ₃₃)
            and shear stresses (τ₁₂) act on each face. Drag to rotate.
          </p>
          <StressTensor3D />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0B2545] mb-3">Core Definitions</h3>
          <div className="space-y-3">
            {[
              { label: "Shear Stress", eq: "τ = F / A  [Pa]", desc: "Force per unit area in the flow direction" },
              { label: "Shear Rate", eq: "γ̇ = dγ/dt = v/h  [s⁻¹]", desc: "Rate of deformation" },
              { label: "Viscosity", eq: "η = τ / γ̇  [Pa·s]", desc: "Resistance to flow" },
              { label: "Normal Stress Diff.", eq: "N₁ = σ₁₁ − σ₂₂", desc: "Elastic effect (Weissenberg, die swell)" },
              { label: "Deborah Number", eq: "De = λ / t_obs", desc: "Solid-like (De≫1) vs liquid-like (De≪1)" },
              { label: "Weissenberg Number", eq: "Wi = λ · γ̇", desc: "Elastic vs viscous effects ratio" },
            ].map((item, i) => (
              <AnimatedCard key={i} delay={i * 0.05}
                className="bg-white border border-[#d0dde8] rounded-xl p-3 flex items-start gap-3">
                <div className="shrink-0 w-24 text-xs font-semibold text-[#134074]">{item.label}</div>
                <div className="flex-1">
                  <div className="math-block text-sm !py-1.5 !px-3 !my-0 !text-sm">{item.eq}</div>
                  <p className="text-[#8DA9C4] text-xs mt-1">{item.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Interactive Polymer Chain 3D */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-3">3D Polymer Chain Under Shear</h3>
        <p className="text-[#2c4a6e] text-sm mb-4">
          Adjust the shear rate to see how polymer chains deform, orient, and disentangle.
          This is the molecular origin of <strong className="text-[#0B2545]">shear-thinning</strong> behavior.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm text-[#2c4a6e]">
            Shear Rate: <strong className="text-[#134074]">{shearRate.toFixed(1)}</strong>
          </label>
          <input type="range" min="0" max="5" step="0.1" value={shearRate}
            onChange={(e) => setShearRate(parseFloat(e.target.value))}
            className="w-64 accent-[#134074]" />
          <span className="text-xs text-[#8DA9C4]">
            {shearRate < 1 ? "Low shear — random coils" : shearRate < 3 ? "Medium — orientation" : "High — aligned chains"}
          </span>
        </div>
        <PolymerChain3D shearRate={shearRate} />
      </AnimatedSection>

      {/* Flow Types — Animated Diagrams */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-2">Velocity Profiles by Fluid Type</h3>
        <p className="text-[#2c4a6e] text-sm mb-6">
          Compare how different rheological behaviors produce distinct velocity profiles
          in pressure-driven pipe flow.
        </p>
        <FlowTypesDiagram />
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            { type: "Pseudoplastic", n: "n < 1", color: "#134074", examples: "Polymer melts, blood, paints" },
            { type: "Newtonian", n: "n = 1", color: "#8DA9C4", examples: "Water, mineral oils, glycerol" },
            { type: "Dilatant", n: "n > 1", color: "#13315C", examples: "Cornstarch suspensions, wet sand" },
          ].map((item, i) => (
            <AnimatedCard key={i} delay={i * 0.1}
              className="bg-[#EEF4ED] border border-[#d0dde8] rounded-xl p-4 text-center">
              <div className="text-sm font-bold mb-1" style={{ color: item.color }}>{item.type}</div>
              <div className="math-block !py-1 !px-2 !my-1 !text-sm inline-block">{item.n}</div>
              <p className="text-[#8DA9C4] text-xs mt-1">{item.examples}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Tabbed Interactive Charts */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-2">Interactive Charts</h3>
        <p className="text-[#2c4a6e] text-sm mb-6">
          Explore rheological models interactively — adjust parameters and see real-time changes.
        </p>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "flow" as const, label: "Flow Curve" },
            { key: "models" as const, label: "Viscosity Models" },
            { key: "creep" as const, label: "Creep & Recovery" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-[#134074] text-white shadow-md"
                  : "bg-[#EEF4ED] text-[#2c4a6e] border border-[#d0dde8] hover:bg-white"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart area */}
        <div className="bg-white border border-[#d0dde8] rounded-2xl p-6">
          {activeTab === "flow" && (
            <div>
              <h4 className="text-lg font-bold text-[#0B2545] mb-1">Power-Law Flow Curve</h4>
              <p className="text-[#2c4a6e] text-xs mb-4">
                η = K · γ̇<sup>(n−1)</sup> — Adjust n to see shear-thinning vs thickening.
                Click legend items to toggle.
              </p>
              <FlowCurveChart />
            </div>
          )}
          {activeTab === "models" && (
            <div>
              <h4 className="text-lg font-bold text-[#0B2545] mb-1">Carreau-Yasuda vs Cross vs Power-Law</h4>
              <p className="text-[#2c4a6e] text-xs mb-4">
                Compare how different models capture the full flow curve including Newtonian plateaus.
              </p>
              <ViscosityModelsChart />
            </div>
          )}
          {activeTab === "creep" && (
            <div>
              <h4 className="text-lg font-bold text-[#0B2545] mb-1">Creep & Recovery (Maxwell Model)</h4>
              <p className="text-[#2c4a6e] text-xs mb-4">
                Apply constant stress, then remove it. Observe viscoelastic response:
                instantaneous + delayed elasticity + viscous flow → partial recovery.
              </p>
              <CreepRecoveryChart />
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Extensional Rheology, Yield Stress, Thixotropy */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-2">Beyond Simple Shear</h3>
        <p className="text-[#2c4a6e] text-sm mb-6">
          Real processing involves more than shear — extensional flows, yield stresses, and time-dependent effects are critical.
        </p>

        <div className="flex gap-2 mb-6">
          {[
            { key: "extensional" as const, label: "Extensional Rheology" },
            { key: "yield" as const, label: "Yield Stress Fluids" },
            { key: "thixotropy" as const, label: "Time-Dependent Behavior" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveAdvTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeAdvTab === tab.key
                  ? "bg-[#134074] text-white shadow-md"
                  : "bg-[#EEF4ED] text-[#2c4a6e] border border-[#d0dde8] hover:bg-white"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white border border-[#d0dde8] rounded-2xl p-6">
          {activeAdvTab === "extensional" && (
            <div>
              <h4 className="text-lg font-bold text-[#0B2545] mb-1">Extensional (Elongational) Viscosity</h4>
              <p className="text-[#2c4a6e] text-xs mb-4">
                In extension, material is stretched rather than sheared. Critical for fiber spinning, blow molding, and film processes.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  {[
                    { label: "Extensional Viscosity", eq: "η_E = σ_E / ε̇", desc: "Tensile stress / extension rate" },
                    { label: "Trouton Ratio", eq: "Tr = η_E / η₀", desc: "Tr = 3 (Newtonian), Tr ≫ 3 (branched polymers)" },
                    { label: "Hencky Strain", eq: "ε_H = ln(L/L₀)", desc: "True strain measure for large deformations" },
                    { label: "Biaxial Extension", eq: "η_B = η_E / 6  (Newtonian)", desc: "Relevant for blow molding, thermoforming" },
                    { label: "Planar Extension", eq: "η_P = η_E / 4  (Newtonian)", desc: "Relevant for film casting, coat-hanger dies" },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#EEF4ED] rounded-xl p-3">
                      <div className="text-xs font-semibold text-[#134074] mb-1">{item.label}</div>
                      <div className="math-block !text-sm !py-1 !px-2 !my-1">{item.eq}</div>
                      <p className="text-[#8DA9C4] text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-b from-[#f8faf8] to-[#EEF4ED] rounded-xl p-4 border border-[#d0dde8]/50">
                    <h5 className="text-xs font-bold text-[#0B2545] mb-2 uppercase tracking-wide">Strain Hardening</h5>
                    <svg viewBox="0 0 200 120" className="w-full h-auto">
                      <defs>
                        <linearGradient id="sh-fill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#134074" stopOpacity="0.08" />
                          <stop offset="100%" stopColor="#134074" stopOpacity="0.01" />
                        </linearGradient>
                      </defs>
                      {[30, 50, 70, 90].map(y => (
                        <line key={y} x1="30" y1={y} x2="180" y2={y} stroke="#d0dde8" strokeWidth="0.5" strokeDasharray="2 3" />
                      ))}
                      <line x1="30" y1="100" x2="185" y2="100" stroke="#0B2545" strokeWidth="1" />
                      <line x1="30" y1="100" x2="30" y2="15" stroke="#0B2545" strokeWidth="1" />
                      <polygon points="185,97 185,103 190,100" fill="#0B2545" />
                      <polygon points="27,15 33,15 30,10" fill="#0B2545" />
                      <text x="110" y="113" textAnchor="middle" fill="#2c4a6e" fontSize="7" fontFamily="Inter">Hencky strain ε</text>
                      <text x="12" y="55" textAnchor="middle" fill="#2c4a6e" fontSize="7" fontFamily="Inter" transform="rotate(-90 12 55)">η_E⁺(t)</text>
                      {/* Linear (3η₀ line) */}
                      <line x1="35" y1="65" x2="175" y2="65" stroke="#8DA9C4" strokeWidth="1.5" strokeDasharray="5 3" />
                      <text x="178" y="63" fill="#8DA9C4" fontSize="6" fontFamily="Inter">3η₀</text>
                      {/* LDPE - strain hardening */}
                      <path d="M 35,75 Q 80,70 110,60 Q 140,40 160,20" fill="none" stroke="#134074" strokeWidth="2" />
                      <text x="162" y="18" fill="#134074" fontSize="6" fontFamily="Inter" fontWeight="600">LDPE</text>
                      {/* HDPE - no strain hardening */}
                      <path d="M 35,75 Q 80,70 120,68 Q 160,67 175,67" fill="none" stroke="#0B2545" strokeWidth="1.5" strokeDasharray="4 3" />
                      <text x="178" y="70" fill="#0B2545" fontSize="6" fontFamily="Inter">HDPE</text>
                    </svg>
                    <p className="text-[#2c4a6e] text-xs mt-2">
                      LDPE (branched) shows strain hardening — η_E rises above 3η₀.
                      HDPE (linear) follows the linear envelope. Critical for blow molding and film stability.
                    </p>
                  </div>
                  <div className="bg-[#EEF4ED] rounded-xl p-4 border border-[#d0dde8]/50">
                    <h5 className="text-xs font-bold text-[#0B2545] mb-2 uppercase tracking-wide">Extensional Measurement Methods</h5>
                    <div className="space-y-1.5 text-xs text-[#2c4a6e]">
                      {[
                        { method: "SER (Sentmanat)", range: "0.001–30 s⁻¹", note: "Melts, film-like samples" },
                        { method: "CaBER", range: "Capillary breakup", note: "Solutions, inks, low-η" },
                        { method: "FiSER", range: "Filament stretching", note: "Precise ε̇ control" },
                        { method: "Haul-off / Rheotens", range: "Melt strength", note: "Draw resonance testing" },
                      ].map((m, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#134074] shrink-0" />
                          <span className="font-semibold text-[#0B2545] w-28">{m.method}</span>
                          <span className="text-[#8DA9C4] w-28">{m.range}</span>
                          <span>{m.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeAdvTab === "yield" && (
            <div>
              <h4 className="text-lg font-bold text-[#0B2545] mb-1">Yield Stress Fluids</h4>
              <p className="text-[#2c4a6e] text-xs mb-4">
                Materials that behave as solids below a critical stress and flow above it. Common in filled polymers, adhesives, and structured fluids.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {[
                    { name: "Bingham Plastic", eq: "τ = τ_y + η_p · γ̇", desc: "Simplest yield stress model. Linear above yield. Toothpaste, drilling mud." },
                    { name: "Herschel-Bulkley", eq: "τ = τ_y + K · γ̇ⁿ", desc: "Yield stress + power-law. Most common for structured fluids. Combines yielding with shear-thinning." },
                    { name: "Casson", eq: "√τ = √τ_y + √(η_∞ · γ̇)", desc: "Used for chocolate, blood, inks. Gives gentler transition than Bingham." },
                  ].map((model, i) => (
                    <div key={i} className="bg-[#EEF4ED] rounded-xl p-4">
                      <h5 className="text-sm font-bold text-[#0B2545] mb-1">{model.name}</h5>
                      <div className="math-block !text-sm !py-1.5 !px-3 !my-2">{model.eq}</div>
                      <p className="text-[#2c4a6e] text-xs">{model.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-b from-[#f8faf8] to-[#EEF4ED] rounded-xl p-4 border border-[#d0dde8]/50">
                    <h5 className="text-xs font-bold text-[#0B2545] mb-2 uppercase tracking-wide">Flow Curve Comparison</h5>
                    <svg viewBox="0 0 200 130" className="w-full h-auto">
                      <line x1="30" y1="110" x2="185" y2="110" stroke="#0B2545" strokeWidth="1" />
                      <line x1="30" y1="110" x2="30" y2="10" stroke="#0B2545" strokeWidth="1" />
                      <polygon points="185,107 185,113 190,110" fill="#0B2545" />
                      <polygon points="27,10 33,10 30,5" fill="#0B2545" />
                      <text x="110" y="125" textAnchor="middle" fill="#2c4a6e" fontSize="7" fontFamily="Inter">Shear Rate γ̇</text>
                      <text x="12" y="60" textAnchor="middle" fill="#2c4a6e" fontSize="7" fontFamily="Inter" transform="rotate(-90 12 60)">Shear Stress τ</text>
                      {/* Yield stress line */}
                      <line x1="30" y1="80" x2="185" y2="80" stroke="#8DA9C4" strokeWidth="0.8" strokeDasharray="3 3" />
                      <text x="188" y="78" fill="#8DA9C4" fontSize="6" fontFamily="Inter">τ_y</text>
                      {/* Newtonian */}
                      <path d="M 30,110 L 175,30" stroke="#8DA9C4" strokeWidth="1.5" strokeDasharray="5 3" />
                      <text x="165" y="25" fill="#8DA9C4" fontSize="6" fontFamily="Inter">Newtonian</text>
                      {/* Bingham */}
                      <path d="M 30,80 L 175,35" stroke="#134074" strokeWidth="2" />
                      <text x="178" y="35" fill="#134074" fontSize="6" fontFamily="Inter" fontWeight="600">Bingham</text>
                      {/* Herschel-Bulkley (shear thinning) */}
                      <path d="M 30,80 Q 80,55 175,45" stroke="#0B2545" strokeWidth="2" />
                      <text x="178" y="47" fill="#0B2545" fontSize="6" fontFamily="Inter" fontWeight="600">H-B</text>
                      {/* Casson */}
                      <path d="M 30,80 Q 60,60 175,40" stroke="#13315C" strokeWidth="1.5" strokeDasharray="3 2" />
                      <text x="178" y="41" fill="#13315C" fontSize="6" fontFamily="Inter">Casson</text>
                    </svg>
                  </div>
                  <div className="bg-[#EEF4ED] rounded-xl p-4">
                    <h5 className="text-xs font-bold text-[#134074] mb-2 uppercase tracking-wide">Yield Stress Measurement</h5>
                    <div className="space-y-1.5 text-xs text-[#2c4a6e]">
                      <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" /><span><strong className="text-[#0B2545]">Stress ramp:</strong> Apply increasing τ, observe sudden γ̇ onset</span></div>
                      <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" /><span><strong className="text-[#0B2545]">Oscillatory (G&apos; crossover):</strong> Amplitude sweep, τ_y ≈ τ at G&apos;=G&apos;&apos;</span></div>
                      <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" /><span><strong className="text-[#0B2545]">Creep:</strong> Step stress below/above τ_y, monitor compliance</span></div>
                      <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" /><span><strong className="text-[#0B2545]">Vane geometry:</strong> Avoids wall slip in filled systems</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeAdvTab === "thixotropy" && (
            <div>
              <h4 className="text-lg font-bold text-[#0B2545] mb-1">Time-Dependent Rheological Behavior</h4>
              <p className="text-[#2c4a6e] text-xs mb-4">
                Viscosity changes with time at constant shear rate due to structural buildup or breakdown.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="space-y-3">
                    <div className="bg-[#EEF4ED] rounded-xl p-4 border-l-4 border-[#134074]">
                      <h5 className="text-sm font-bold text-[#0B2545] mb-1">Thixotropy</h5>
                      <p className="text-[#2c4a6e] text-xs mb-2">
                        Viscosity <strong>decreases</strong> with time under shear and <strong>recovers</strong> at rest.
                        Structure is broken down by flow and rebuilt over time.
                      </p>
                      <div className="text-xs text-[#8DA9C4]">Examples: paints, ketchup, drilling muds, yogurt, filled polymer melts</div>
                    </div>
                    <div className="bg-white border border-[#d0dde8] rounded-xl p-4 border-l-4 border-[#8DA9C4]">
                      <h5 className="text-sm font-bold text-[#0B2545] mb-1">Rheopexy (Anti-thixotropy)</h5>
                      <p className="text-[#2c4a6e] text-xs mb-2">
                        Viscosity <strong>increases</strong> with time under shear. Rare but occurs in some
                        colloidal systems and shear-induced gelation.
                      </p>
                      <div className="text-xs text-[#8DA9C4]">Examples: gypsum paste, some polymer-clay nanocomposites</div>
                    </div>
                    <div className="bg-[#EEF4ED] rounded-xl p-4">
                      <h5 className="text-xs font-bold text-[#134074] mb-2 uppercase tracking-wide">Key Measurements</h5>
                      <div className="space-y-1.5 text-xs text-[#2c4a6e]">
                        <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" /><strong className="text-[#0B2545]">Hysteresis loop:</strong> Ramp up then down in γ̇, area = thixotropy index</div>
                        <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" /><strong className="text-[#0B2545]">Step-rate test:</strong> Apply γ̇, monitor η(t) decay + recovery at rest</div>
                        <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" /><strong className="text-[#0B2545]">3ITT (3-Interval):</strong> Rest → shear → rest. Standard protocol for quantifying recovery</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-[#f8faf8] to-[#EEF4ED] rounded-xl p-4 border border-[#d0dde8]/50">
                  <h5 className="text-xs font-bold text-[#0B2545] mb-2 uppercase tracking-wide">Thixotropic Hysteresis Loop</h5>
                  <svg viewBox="0 0 200 140" className="w-full h-auto mb-3">
                    <defs>
                      <linearGradient id="hyst-fill" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#134074" stopOpacity="0.06" />
                        <stop offset="50%" stopColor="#134074" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#134074" stopOpacity="0.06" />
                      </linearGradient>
                    </defs>
                    <line x1="30" y1="120" x2="185" y2="120" stroke="#0B2545" strokeWidth="1" />
                    <line x1="30" y1="120" x2="30" y2="10" stroke="#0B2545" strokeWidth="1" />
                    <polygon points="185,117 185,123 190,120" fill="#0B2545" />
                    <polygon points="27,10 33,10 30,5" fill="#0B2545" />
                    <text x="110" y="135" textAnchor="middle" fill="#2c4a6e" fontSize="7" fontFamily="Inter">Shear Rate γ̇</text>
                    <text x="12" y="65" textAnchor="middle" fill="#2c4a6e" fontSize="7" fontFamily="Inter" transform="rotate(-90 12 65)">Shear Stress τ</text>
                    {/* Hysteresis area */}
                    <path d="M 35,115 Q 100,70 175,30 Q 120,70 35,115 Z" fill="url(#hyst-fill)" />
                    {/* Up curve */}
                    <path d="M 35,115 Q 100,70 175,30" fill="none" stroke="#134074" strokeWidth="2" />
                    {/* Down curve */}
                    <path d="M 175,30 Q 120,70 35,115" fill="none" stroke="#8DA9C4" strokeWidth="2" strokeDasharray="5 3" />
                    {/* Arrows */}
                    <polygon points="100,72 96,77 100,80" fill="#134074" transform="rotate(-35 100 76)" />
                    <polygon points="115,68 119,63 115,60" fill="#8DA9C4" transform="rotate(-35 115 64)" />
                    {/* Labels */}
                    <text x="85" y="55" fill="#134074" fontSize="7" fontFamily="Inter" fontWeight="600">Ramp up</text>
                    <text x="115" y="95" fill="#8DA9C4" fontSize="7" fontFamily="Inter" fontWeight="500">Ramp down</text>
                    <text x="100" y="82" fill="#134074" fontSize="6" fontFamily="Inter" opacity="0.6">thixotropic area</text>
                  </svg>
                  <div className="bg-white rounded-lg p-3 border border-[#d0dde8]/50">
                    <h5 className="text-xs font-bold text-[#0B2545] mb-1">Structural Kinetic Models</h5>
                    <div className="space-y-1 text-xs text-[#2c4a6e]">
                      <div className="math-block !text-xs !py-1 !px-2 !my-1">dλ/dt = k₁(1−λ) − k₂·λ·γ̇ⁿ</div>
                      <p>λ = structure parameter (0→1), k₁ = buildup rate, k₂ = breakdown rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Linear vs Nonlinear Viscoelasticity */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-4">Linear vs Nonlinear Viscoelasticity</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <AnimatedCard className="bg-white border border-[#d0dde8] rounded-2xl p-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#134074]/10 text-[#134074] text-xs font-bold mb-3">
              SAOS — Small Amplitude
            </div>
            <h4 className="font-bold text-[#0B2545] mb-2">Linear Viscoelastic Region (LVR)</h4>
            <div className="space-y-2 text-xs text-[#2c4a6e]">
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" />G&apos;, G&apos;&apos; independent of strain amplitude γ₀</div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" />Stress response is sinusoidal (only fundamental harmonic)</div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" />Boltzmann superposition principle applies</div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" />Relaxation modulus: G(t) = ∫ H(λ)·e<sup>−t/λ</sup> d ln λ</div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" />Complex viscosity: η* = √(G&apos;² + G&apos;&apos;²) / ω</div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#134074] mt-1.5 shrink-0" />Cox-Merz rule: η*(ω) ≈ η(γ̇) at ω = γ̇</div>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={0.1} className="bg-[#EEF4ED] border-2 border-[#134074]/20 rounded-2xl p-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2545]/10 text-[#0B2545] text-xs font-bold mb-3">
              LAOS — Large Amplitude
            </div>
            <h4 className="font-bold text-[#0B2545] mb-2">Nonlinear Regime</h4>
            <div className="space-y-2 text-xs text-[#2c4a6e]">
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#0B2545] mt-1.5 shrink-0" />G&apos;, G&apos;&apos; become amplitude-dependent (strain softening/hardening)</div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#0B2545] mt-1.5 shrink-0" />Stress waveform distorted — higher harmonics (I₃/I₁, I₅/I₁)</div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#0B2545] mt-1.5 shrink-0" />FT-Rheology: Fourier analysis of stress signal for nonlinear fingerprint</div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#0B2545] mt-1.5 shrink-0" />Lissajous-Bowditch plots: σ vs γ and σ vs γ̇ loops</div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#0B2545] mt-1.5 shrink-0" />Sequence of physical processes (SPP) analysis</div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#0B2545] mt-1.5 shrink-0" />Essential for filled, branched, and recycled polymers</div>
            </div>
          </AnimatedCard>
        </div>
      </AnimatedSection>

      {/* Quick Reference Cards */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-6">Constitutive Laws at a Glance</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Newton", eq: "τ = η · γ̇", type: "Viscous fluid", color: "#8DA9C4" },
            { name: "Hooke", eq: "τ = G · γ", type: "Elastic solid", color: "#134074" },
            { name: "Maxwell", eq: "τ + λ·dτ/dt = η·γ̇", type: "Viscoelastic liquid", color: "#13315C" },
            { name: "Kelvin-Voigt", eq: "τ = G·γ + η·γ̇", type: "Viscoelastic solid", color: "#0B2545" },
          ].map((law, i) => (
            <AnimatedCard key={i} delay={i * 0.08}
              className="bg-white border border-[#d0dde8] rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: law.color }}>
                {law.name[0]}
              </div>
              <h4 className="font-bold text-[#0B2545] text-sm mb-2">{law.name}</h4>
              <div className="math-block !text-sm !py-1.5 !px-2 !my-2">{law.eq}</div>
              <p className="text-[#8DA9C4] text-xs">{law.type}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Advanced Constitutive Models */}
      <AnimatedSection>
        <h3 className="text-2xl font-bold text-[#0B2545] mb-4">Advanced Constitutive Models</h3>
        <p className="text-[#2c4a6e] text-sm mb-6">
          Beyond the basic models, these equations capture nonlinear and molecular-level behavior of polymer melts.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Oldroyd-B", eq: "τ + λ₁·∇τ = η₀(γ̇ + λ₂·∇γ̇)", type: "Dilute solutions, constant η_E", color: "#134074" },
            { name: "Giesekus", eq: "+ α·(τ·τ)/(η₀/λ)", type: "Shear thinning + bounded η_E", color: "#13315C" },
            { name: "PTT (Phan-Thien-Tanner)", eq: "f(tr τ)·τ + λ·∇τ = η₀γ̇", type: "Strain softening, polymer melts", color: "#0B2545" },
            { name: "FENE-P", eq: "Finitely extensible dumbbells", type: "Bounded extensibility, dilute solutions", color: "#134074" },
            { name: "K-BKZ (Integral)", eq: "τ(t) = ∫ m(t−t') h(I₁,I₂) C⁻¹ dt'", type: "Full nonlinear memory, general flows", color: "#13315C" },
            { name: "Rolie-Poly", eq: "Reptation + chain stretch + CCR", type: "Molecular, entangled linear chains", color: "#0B2545" },
          ].map((model, i) => (
            <AnimatedCard key={i} delay={i * 0.06}
              className="bg-white border border-[#d0dde8] rounded-2xl p-4">
              <div className="w-8 h-8 rounded-full mb-2 flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: model.color }}>
                {model.name[0]}
              </div>
              <h4 className="font-bold text-[#0B2545] text-sm mb-1">{model.name}</h4>
              <div className="math-block !text-xs !py-1 !px-2 !my-1.5">{model.eq}</div>
              <p className="text-[#8DA9C4] text-xs">{model.type}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
