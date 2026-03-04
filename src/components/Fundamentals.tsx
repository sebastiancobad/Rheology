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

  return (
    <SectionWrapper
      id="fundamentals"
      title="Fundamentals of Rheology"
      subtitle="Section 1 — Didactic Introduction"
      accent="#134074"
    >
      {/* Hero visual: 3D Stress Tensor + Key Equations */}
      <AnimatedSection className="grid lg:grid-cols-2 gap-8 mb-16">
        <div>
          <h3 className="text-xl font-bold text-[#0B2545] mb-3">Stress Tensor Visualization</h3>
          <p className="text-[#3d6285] text-sm mb-4">
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
                className="bg-white border border-[#c9d9e8] rounded-xl p-3 flex items-start gap-3">
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
        <p className="text-[#3d6285] text-sm mb-4">
          Adjust the shear rate to see how polymer chains deform, orient, and disentangle.
          This is the molecular origin of <strong className="text-[#0B2545]">shear-thinning</strong> behavior.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm text-[#3d6285]">
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
        <p className="text-[#3d6285] text-sm mb-6">
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
              className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-xl p-4 text-center">
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
        <p className="text-[#3d6285] text-sm mb-6">
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
                  : "bg-[#EEF4ED] text-[#3d6285] border border-[#c9d9e8] hover:bg-white"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart area */}
        <div className="bg-white border border-[#c9d9e8] rounded-2xl p-6">
          {activeTab === "flow" && (
            <div>
              <h4 className="text-lg font-bold text-[#0B2545] mb-1">Power-Law Flow Curve</h4>
              <p className="text-[#3d6285] text-xs mb-4">
                η = K · γ̇<sup>(n−1)</sup> — Adjust n to see shear-thinning vs thickening.
                Click legend items to toggle.
              </p>
              <FlowCurveChart />
            </div>
          )}
          {activeTab === "models" && (
            <div>
              <h4 className="text-lg font-bold text-[#0B2545] mb-1">Carreau-Yasuda vs Cross vs Power-Law</h4>
              <p className="text-[#3d6285] text-xs mb-4">
                Compare how different models capture the full flow curve including Newtonian plateaus.
              </p>
              <ViscosityModelsChart />
            </div>
          )}
          {activeTab === "creep" && (
            <div>
              <h4 className="text-lg font-bold text-[#0B2545] mb-1">Creep & Recovery (Maxwell Model)</h4>
              <p className="text-[#3d6285] text-xs mb-4">
                Apply constant stress, then remove it. Observe viscoelastic response:
                instantaneous + delayed elasticity + viscous flow → partial recovery.
              </p>
              <CreepRecoveryChart />
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Quick Reference Cards */}
      <AnimatedSection>
        <h3 className="text-2xl font-bold text-[#0B2545] mb-6">Constitutive Laws at a Glance</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Newton", eq: "τ = η · γ̇", type: "Viscous fluid", color: "#8DA9C4" },
            { name: "Hooke", eq: "τ = G · γ", type: "Elastic solid", color: "#134074" },
            { name: "Maxwell", eq: "τ + λ·dτ/dt = η·γ̇", type: "Viscoelastic liquid", color: "#13315C" },
            { name: "Kelvin-Voigt", eq: "τ = G·γ + η·γ̇", type: "Viscoelastic solid", color: "#0B2545" },
          ].map((law, i) => (
            <AnimatedCard key={i} delay={i * 0.08}
              className="bg-white border border-[#c9d9e8] rounded-2xl p-5 text-center">
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
    </SectionWrapper>
  );
}
