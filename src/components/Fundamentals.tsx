"use client";

import SectionWrapper from "./SectionWrapper";
import FlowCurveChart from "./charts/FlowCurveChart";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 hover:border-[#38bdf8]/30 transition-colors">
      <h3 className="text-xl font-bold text-[#f1f5f9] mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function Fundamentals() {
  return (
    <SectionWrapper
      id="fundamentals"
      title="Fundamentals of Rheology"
      subtitle="Section 1 — Didactic Introduction"
      accent="#38bdf8"
    >
      {/* Core Definitions */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card title="Stress (σ, τ)">
          <p className="text-[#94a3b8] mb-3">
            Stress is defined as force per unit area applied to a material.
            In shear deformation, the{" "}
            <strong className="text-[#e2e8f0]">shear stress</strong> is:
          </p>
          <div className="math-block">
            <span className="math">τ</span> = <span className="math">F</span> /{" "}
            <span className="math">A</span> &nbsp;&nbsp;[Pa]
          </div>
          <p className="text-[#94a3b8] text-sm mt-3">
            where <span className="math">F</span> is the tangential force and{" "}
            <span className="math">A</span> is the area over which it acts.
            For normal stress, we use <span className="math">σ</span>.
          </p>
        </Card>

        <Card title="Strain (γ) & Shear Rate (γ̇)">
          <p className="text-[#94a3b8] mb-3">
            <strong className="text-[#e2e8f0]">Strain</strong> is the
            dimensionless measure of deformation:
          </p>
          <div className="math-block">
            <span className="math">γ</span> = Δ<span className="math">x</span>{" "}
            / <span className="math">h</span> &nbsp;&nbsp;[—]
          </div>
          <p className="text-[#94a3b8] mb-3 mt-3">
            The <strong className="text-[#e2e8f0]">shear rate</strong> is the
            time derivative of strain:
          </p>
          <div className="math-block">
            <span className="math">γ̇</span> = d<span className="math">γ</span>{" "}
            / d<span className="math">t</span> = <span className="math">v</span>{" "}
            / <span className="math">h</span> &nbsp;&nbsp;[s⁻¹]
          </div>
        </Card>

        <Card title="Viscosity (η)">
          <p className="text-[#94a3b8] mb-3">
            Viscosity quantifies a fluid&apos;s resistance to flow. It relates
            shear stress to shear rate:
          </p>
          <div className="math-block">
            <span className="math">η</span> = <span className="math">τ</span> /{" "}
            <span className="math">γ̇</span> &nbsp;&nbsp;[Pa·s]
          </div>
          <p className="text-[#94a3b8] text-sm mt-3">
            For a Newtonian fluid, <span className="math">η</span> is constant
            regardless of shear rate. For polymeric fluids, viscosity is
            typically shear-rate dependent.
          </p>
        </Card>

        <Card title="Newton's Law of Viscosity">
          <p className="text-[#94a3b8] mb-3">
            The constitutive equation for a Newtonian fluid is simply:
          </p>
          <div className="math-block">
            <span className="math">τ</span> = <span className="math">η</span> ·{" "}
            <span className="math">γ̇</span>
          </div>
          <p className="text-[#94a3b8] text-sm mt-3">
            This linear relationship defines the baseline against which all
            non-Newtonian behavior is measured. Water, simple solvents, and
            light oils are classic Newtonian fluids.
          </p>
        </Card>
      </div>

      {/* Non-Newtonian Fluids */}
      <h3 className="text-2xl font-bold text-[#f1f5f9] mb-6">
        Newtonian vs. Non-Newtonian Fluids
      </h3>

      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <div className="w-10 h-10 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 17h8m-8-5h8m-8-5h8M3 17l4-4-4-4" />
            </svg>
          </div>
          <h4 className="font-bold text-[#f1f5f9] mb-2">
            Pseudoplastic (Shear-Thinning)
          </h4>
          <p className="text-[#94a3b8] text-sm mb-3">
            Viscosity <em>decreases</em> with increasing shear rate. Most
            polymer melts and solutions exhibit this behavior due to chain
            disentanglement and alignment under flow.
          </p>
          <div className="math-block text-sm">
            <span className="math">η</span>(<span className="math">γ̇</span>) ={" "}
            <span className="math">K</span> ·{" "}
            <span className="math">γ̇</span>
            <sup>(<span className="math">n</span>−1)</sup>, &nbsp;
            <span className="math">n</span> &lt; 1
          </div>
          <p className="text-[#94a3b8] text-xs mt-2">
            Examples: polymer melts, paints, blood, ketchup
          </p>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <div className="w-10 h-10 rounded-lg bg-[#a78bfa]/10 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#a78bfa]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 7l6 6-6 6m8-12h8m-8 5h8m-8 5h8" />
            </svg>
          </div>
          <h4 className="font-bold text-[#f1f5f9] mb-2">
            Dilatant (Shear-Thickening)
          </h4>
          <p className="text-[#94a3b8] text-sm mb-3">
            Viscosity <em>increases</em> with shear rate. Occurs when densely
            packed particles jam under stress, forming transient
            hydroclusters.
          </p>
          <div className="math-block text-sm">
            <span className="math">η</span>(<span className="math">γ̇</span>) ={" "}
            <span className="math">K</span> ·{" "}
            <span className="math">γ̇</span>
            <sup>(<span className="math">n</span>−1)</sup>, &nbsp;
            <span className="math">n</span> &gt; 1
          </div>
          <p className="text-[#94a3b8] text-xs mt-2">
            Examples: cornstarch suspensions, wet sand
          </p>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <div className="w-10 h-10 rounded-lg bg-[#34d399]/10 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#34d399]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 className="font-bold text-[#f1f5f9] mb-2">Bingham Plastic</h4>
          <p className="text-[#94a3b8] text-sm mb-3">
            Exhibits a <strong className="text-[#e2e8f0]">yield stress</strong>{" "}
            (<span className="math">τ₀</span>). Below the yield stress, the
            material behaves as a solid; above it, it flows like a viscous
            fluid.
          </p>
          <div className="math-block text-sm">
            <span className="math">τ</span> = <span className="math">τ₀</span>{" "}
            + <span className="math">η</span>
            <sub>p</sub> · <span className="math">γ̇</span>, &nbsp; for{" "}
            <span className="math">τ</span> &gt;{" "}
            <span className="math">τ₀</span>
          </div>
          <p className="text-[#94a3b8] text-xs mt-2">
            Examples: toothpaste, mayonnaise, drilling mud
          </p>
        </div>
      </div>

      {/* Interactive Flow Curve */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 mb-12">
        <h3 className="text-xl font-bold text-[#f1f5f9] mb-2">
          Interactive Flow Curve — Viscosity vs. Shear Rate
        </h3>
        <p className="text-[#94a3b8] text-sm mb-6">
          Compare how different fluid types respond to increasing shear rate.
          Toggle each fluid type on/off by clicking on the legend.
        </p>
        <FlowCurveChart />
      </div>

      {/* Time-Dependent Behavior */}
      <h3 className="text-2xl font-bold text-[#f1f5f9] mb-6">
        Time-Dependent Flow Behavior
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <h4 className="font-bold text-[#38bdf8] mb-3">Thixotropy</h4>
          <p className="text-[#94a3b8] text-sm mb-3">
            A thixotropic material shows a <em>decrease</em> in viscosity over
            time at constant shear rate. When shearing stops, the structure
            rebuilds gradually. This is caused by the progressive breakdown
            of internal structure (e.g., particle networks, entanglements).
          </p>
          <div className="math-block text-sm">
            <span className="math">η</span>(<span className="math">t</span>) ={" "}
            <span className="math">η</span>
            <sub>∞</sub> + (<span className="math">η</span>
            <sub>0</sub> − <span className="math">η</span>
            <sub>∞</sub>) · e<sup>−<span className="math">t</span>/<span className="math">λ</span></sup>
          </div>
          <p className="text-[#94a3b8] text-xs mt-2">
            Examples: yogurt, many paints, drilling muds
          </p>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <h4 className="font-bold text-[#a78bfa] mb-3">Rheopexy (Anti-thixotropy)</h4>
          <p className="text-[#94a3b8] text-sm mb-3">
            The opposite of thixotropy: viscosity <em>increases</em> over time
            under constant shear. Shearing induces structure formation
            (e.g., shear-induced crystallization or association).
          </p>
          <div className="math-block text-sm">
            <span className="math">η</span>(<span className="math">t</span>) ={" "}
            <span className="math">η</span>
            <sub>0</sub> + (<span className="math">η</span>
            <sub>∞</sub> − <span className="math">η</span>
            <sub>0</sub>) · (1 − e<sup>−<span className="math">t</span>/<span className="math">λ</span></sup>)
          </div>
          <p className="text-[#94a3b8] text-xs mt-2">
            Examples: gypsum paste, some printer inks, certain lubricants
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
