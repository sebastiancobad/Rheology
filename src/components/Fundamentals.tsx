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
    <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6 hover:border-[#4f46e5]/30 hover:shadow-sm transition-all duration-300">
      <h3 className="text-xl font-bold text-[#18181b] mb-4 tracking-tight">{title}</h3>
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
      accent="#4f46e5"
    >
      {/* Historical Context */}
      <div className="bg-white border border-[#e4e4e7] rounded-2xl p-6 mb-12">
        <h3 className="text-lg font-bold text-[#18181b] mb-3">Historical Context</h3>
        <p className="text-[#6b7280] text-sm mb-3">
          The term <strong className="text-[#18181b]">rheology</strong> (from Greek{" "}
          <em>rheos</em>, &quot;flow&quot;) was coined by Eugene Bingham in 1929 to describe
          the science of deformation and flow of matter. Heraclitus&apos;s aphorism{" "}
          <em>&quot;πάντα ῥεῖ&quot;</em> (&quot;everything flows&quot;) became the motto of the
          Society of Rheology. The field bridges continuum mechanics, polymer physics,
          and chemical engineering, providing the mathematical and experimental framework
          to quantify material behavior that is neither purely elastic (Hookean solid)
          nor purely viscous (Newtonian fluid).
        </p>
        <p className="text-[#6b7280] text-sm">
          The <strong className="text-[#18181b]">Deborah number</strong>{" "}
          (<span className="math">De</span> = <span className="math">λ</span>/<span className="math">t</span>
          <sub>obs</sub>), introduced by Reiner (1964), captures this duality: when the
          relaxation time <span className="math">λ</span> of the material is much larger
          than the observation time <span className="math">t</span><sub>obs</sub>,
          the material appears solid-like; when <span className="math">λ</span> ≪{" "}
          <span className="math">t</span><sub>obs</sub>, it appears liquid-like.
          All real materials occupy a spectrum between these extremes.
        </p>
      </div>

      {/* Core Definitions */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card title="Stress Tensor (σᵢⱼ)">
          <p className="text-[#6b7280] mb-3">
            In the general three-dimensional case, stress is described by a{" "}
            <strong className="text-[#18181b]">second-order symmetric tensor</strong>{" "}
            with 6 independent components. For simple shear (1-2 plane), the
            relevant components are:
          </p>
          <div className="math-block text-sm">
            <span className="math">σ</span><sub>12</sub> ={" "}
            <span className="math">τ</span> = <span className="math">F</span> /{" "}
            <span className="math">A</span> &nbsp;&nbsp;[Pa] (shear stress)
          </div>
          <p className="text-[#6b7280] text-sm mt-3 mb-2">
            The <strong className="text-[#18181b]">normal stress differences</strong>{" "}
            are critical for understanding elastic effects in polymer flows:
          </p>
          <div className="math-block text-sm">
            N₁ = <span className="math">σ</span><sub>11</sub> −{" "}
            <span className="math">σ</span><sub>22</sub> &nbsp;(first normal stress difference)
            <br />
            N₂ = <span className="math">σ</span><sub>22</sub> −{" "}
            <span className="math">σ</span><sub>33</sub> &nbsp;(second normal stress difference)
          </div>
          <p className="text-[#6b7280] text-xs mt-3">
            N₁ is always positive for polymer melts and is responsible for the{" "}
            <em>Weissenberg rod-climbing effect</em> and <em>die swell</em>. N₂ is
            typically negative and much smaller (|N₂| ≈ 0.1–0.3 |N₁|). The ratio
            −N₂/N₁ is sensitive to molecular architecture and branching
            (Schweizer et al., <em>J. Rheol.</em>, 2004).
          </p>
        </Card>

        <Card title="Strain (γ) & Shear Rate (γ̇)">
          <p className="text-[#6b7280] mb-3">
            <strong className="text-[#18181b]">Shear strain</strong> is the
            dimensionless measure of deformation in simple shear:
          </p>
          <div className="math-block">
            <span className="math">γ</span> = Δ<span className="math">x</span>{" "}
            / <span className="math">h</span> = tan(<span className="math">θ</span>) &nbsp;&nbsp;[—]
          </div>
          <p className="text-[#6b7280] mb-3 mt-3">
            The <strong className="text-[#18181b]">shear rate</strong> (rate of
            deformation tensor component) is:
          </p>
          <div className="math-block">
            <span className="math">γ̇</span> = d<span className="math">γ</span>{" "}
            / d<span className="math">t</span> = <span className="math">v</span>{" "}
            / <span className="math">h</span> &nbsp;&nbsp;[s⁻¹]
          </div>
          <p className="text-[#6b7280] text-sm mt-3">
            For extensional deformation, the <strong className="text-[#18181b]">Hencky strain</strong>{" "}
            is used instead:
          </p>
          <div className="math-block text-sm">
            <span className="math">ε</span><sub>H</sub> = ln(L/L₀)
          </div>
          <p className="text-[#6b7280] text-xs mt-2">
            The Hencky measure is preferred for large strains because it is additive
            and frame-invariant. In polymer processing, Hencky strains of 1–7 are
            typical (e.g., ε<sub>H</sub> ≈ 2–4 in blow molding).
          </p>
        </Card>

        <Card title="Viscosity (η) — Detailed Treatment">
          <p className="text-[#6b7280] mb-3">
            <strong className="text-[#18181b]">Dynamic viscosity</strong> relates
            shear stress to shear rate:
          </p>
          <div className="math-block">
            <span className="math">η</span> = <span className="math">τ</span> /{" "}
            <span className="math">γ̇</span> &nbsp;&nbsp;[Pa·s]
          </div>
          <p className="text-[#6b7280] text-sm mt-3 mb-2">
            The <strong className="text-[#18181b]">complex viscosity</strong> from
            oscillatory measurements:
          </p>
          <div className="math-block text-sm">
            <span className="math">η</span>* = G*/ω = √(G&apos;² + G&apos;&apos;²) / ω
          </div>
          <p className="text-[#6b7280] text-sm mt-3 mb-2">
            The <strong className="text-[#18181b]">Cox-Merz rule</strong> (empirical)
            states:
          </p>
          <div className="math-block text-sm">
            η(γ̇) ≈ |η*(ω)| &nbsp;when γ̇ = ω
          </div>
          <p className="text-[#6b7280] text-xs mt-3">
            This rule holds well for linear, unfilled polymers and is enormously
            useful because oscillatory measurements (which are non-destructive to
            structure) can predict steady shear behavior. However, the Cox-Merz rule
            fails for branched polymers, filled systems, associating polymers, and
            recycled blends — this is an active area of research
            (Snijkers &amp; Vlassopoulos, <em>J. Rheol.</em>, 2014).
          </p>
        </Card>

        <Card title="Constitutive Equations Overview">
          <p className="text-[#6b7280] mb-3">
            <strong className="text-[#18181b]">Newton&apos;s law</strong> for a
            Newtonian fluid:
          </p>
          <div className="math-block text-sm">
            <span className="math">τ</span> = <span className="math">η</span> ·{" "}
            <span className="math">γ̇</span>
          </div>
          <p className="text-[#6b7280] text-sm mt-3 mb-2">
            <strong className="text-[#18181b]">Hooke&apos;s law</strong> for an
            ideal elastic solid:
          </p>
          <div className="math-block text-sm">
            <span className="math">τ</span> = <span className="math">G</span> ·{" "}
            <span className="math">γ</span>
          </div>
          <p className="text-[#6b7280] text-sm mt-3 mb-2">
            The <strong className="text-[#18181b]">Weissenberg number</strong> characterizes
            elastic effects relative to viscous effects:
          </p>
          <div className="math-block text-sm">
            Wi = <span className="math">λ</span> · <span className="math">γ̇</span> = N₁ / (2<span className="math">τ</span>)
          </div>
          <p className="text-[#6b7280] text-xs mt-3">
            When Wi ≫ 1, elastic instabilities can arise (e.g., purely elastic
            turbulence discovered by Groisman &amp; Steinberg, <em>Nature</em>, 2000).
            This has renewed significance in microfluidics and 3D printing of
            polymer solutions.
          </p>
        </Card>
      </div>

      {/* Non-Newtonian Fluids */}
      <h3 className="text-2xl font-bold text-[#18181b] mb-6">
        Newtonian vs. Non-Newtonian Fluids
      </h3>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6">
          <div className="w-10 h-10 rounded-lg bg-[#4f46e5]/8 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#4f46e5]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 17h8m-8-5h8m-8-5h8M3 17l4-4-4-4" />
            </svg>
          </div>
          <h4 className="font-bold text-[#18181b] mb-2">
            Pseudoplastic (Shear-Thinning)
          </h4>
          <p className="text-[#6b7280] text-sm mb-3">
            Viscosity <em>decreases</em> with increasing shear rate. This is the most
            common behavior for polymer melts and concentrated solutions. The molecular
            origin involves: (1) disentanglement of polymer chains, (2) orientation
            and alignment of chain segments in the flow direction, and (3) deformation
            of the coil from a random-walk configuration to an elongated shape.
          </p>
          <div className="math-block text-sm">
            Power-law: <span className="math">η</span>(<span className="math">γ̇</span>) ={" "}
            <span className="math">K</span> ·{" "}
            <span className="math">γ̇</span>
            <sup>(<span className="math">n</span>−1)</sup>, &nbsp;
            <span className="math">n</span> &lt; 1
          </div>
          <p className="text-[#6b7280] text-xs mt-2">
            Typical <span className="math">n</span> values: polyethylene 0.3–0.6,
            polypropylene 0.3–0.5, polystyrene 0.2–0.4, PVC 0.2–0.5.
            The power-law fails at very low (η₀ plateau) and very high shear rates
            (η∞ plateau).
          </p>
        </div>

        <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6">
          <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/8 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#7c3aed]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 7l6 6-6 6m8-12h8m-8 5h8m-8 5h8" />
            </svg>
          </div>
          <h4 className="font-bold text-[#18181b] mb-2">
            Dilatant (Shear-Thickening)
          </h4>
          <p className="text-[#6b7280] text-sm mb-3">
            Viscosity <em>increases</em> with shear rate. Two mechanisms are recognized:
            (1) <strong className="text-[#18181b]">order-disorder transition</strong> at moderate
            volume fractions, and (2) <strong className="text-[#18181b]">hydrocluster formation</strong>{" "}
            at high concentrations where lubrication forces between particles cannot
            prevent direct contact (Wagner &amp; Brady, <em>Phys. Fluids</em>, 2009).
          </p>
          <div className="math-block text-sm">
            <span className="math">η</span>(<span className="math">γ̇</span>) ={" "}
            <span className="math">K</span> ·{" "}
            <span className="math">γ̇</span>
            <sup>(<span className="math">n</span>−1)</sup>, &nbsp;
            <span className="math">n</span> &gt; 1
          </div>
          <p className="text-[#6b7280] text-xs mt-2">
            Can be catastrophic (discontinuous shear thickening, DST) or gradual
            (continuous shear thickening, CST). DST can cause equipment failure
            in processing. Recent work on nano-silica filled polymer melts
            shows shear thickening at high loadings.
          </p>
        </div>

        <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6">
          <div className="w-10 h-10 rounded-lg bg-[#0d9488]/8 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 className="font-bold text-[#18181b] mb-2">Bingham Plastic &amp; Herschel-Bulkley</h4>
          <p className="text-[#6b7280] text-sm mb-3">
            Materials with a <strong className="text-[#18181b]">yield stress</strong>{" "}
            (<span className="math">τ₀</span>). The more general Herschel-Bulkley model
            combines yield stress with power-law flow:
          </p>
          <div className="math-block text-sm">
            Bingham: <span className="math">τ</span> = <span className="math">τ₀</span>{" "}
            + <span className="math">η</span><sub>p</sub> · <span className="math">γ̇</span>
            <br />
            H-B: <span className="math">τ</span> = <span className="math">τ₀</span>{" "}
            + K · <span className="math">γ̇</span><sup>n</sup>
          </div>
          <p className="text-[#6b7280] text-xs mt-2">
            Yield stress measurement is debated — the &quot;true&quot; yield stress vs.
            apparent yield stress depends on observation timescale
            (Barnes, <em>J. Non-Newtonian Fluid Mech.</em>, 1999). Modern creep
            tests at very low stresses are preferred for accurate τ₀ determination.
          </p>
        </div>
      </div>

      {/* Advanced Viscosity Models */}
      <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6 mb-12">
        <h3 className="text-xl font-bold text-[#18181b] mb-4">
          Advanced Viscosity Models
        </h3>
        <p className="text-[#6b7280] text-sm mb-6">
          The power-law model is useful for its simplicity but diverges at low and
          high shear rates. More complete models capture the full flow curve with
          Newtonian plateaus:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-[#4f46e5] mb-2">Carreau-Yasuda Model</h4>
            <div className="math-block text-sm">
              (<span className="math">η</span> − <span className="math">η</span><sub>∞</sub>)
              / (<span className="math">η</span><sub>0</sub> − <span className="math">η</span><sub>∞</sub>)
              = [1 + (<span className="math">λγ̇</span>)<sup>a</sup>]<sup>(n−1)/a</sup>
            </div>
            <p className="text-[#6b7280] text-xs mt-2">
              Five parameters: η₀ (zero-shear viscosity), η∞ (infinite-shear viscosity,
              usually ≈ 0), λ (characteristic time), n (power-law index), a (Yasuda
              parameter controlling transition width). When a = 2, reduces to the
              Carreau model. Widely used in polymer processing simulation (Moldflow,
              Polyflow) because it captures both Newtonian plateaus.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#7c3aed] mb-2">Cross Model</h4>
            <div className="math-block text-sm">
              (<span className="math">η</span> − <span className="math">η</span><sub>∞</sub>)
              / (<span className="math">η</span><sub>0</sub> − <span className="math">η</span><sub>∞</sub>)
              = 1 / [1 + (<span className="math">Kγ̇</span>)<sup>m</sup>]
            </div>
            <p className="text-[#6b7280] text-xs mt-2">
              Where m = 1 − n (power-law index equivalent). The Cross model is
              mathematically simpler than Carreau-Yasuda and often preferred for
              numerical stability in FEM simulations. It is the default model in many
              injection molding simulation packages.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#0d9488] mb-2">Casson Model</h4>
            <div className="math-block text-sm">
              √<span className="math">τ</span> = √<span className="math">τ₀</span>{" "}
              + √(<span className="math">η</span><sub>∞</sub> · <span className="math">γ̇</span>)
            </div>
            <p className="text-[#6b7280] text-xs mt-2">
              Originally developed for printing inks, now used extensively for
              chocolate, blood, and other yield-stress fluids. It provides a better
              fit than Bingham for materials with a gradual yield transition. Often
              used in the food polymer industry.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Flow Curve */}
      <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6 mb-12">
        <h3 className="text-xl font-bold text-[#18181b] mb-2">
          Interactive Flow Curve — Viscosity vs. Shear Rate
        </h3>
        <p className="text-[#6b7280] text-sm mb-6">
          Compare how different fluid types respond to increasing shear rate.
          Toggle each fluid type on/off by clicking on the legend. Adjust the
          power-law exponent <span className="math">n</span> to see how molecular
          architecture (MW, MWD, branching) affects the degree of shear thinning.
        </p>
        <FlowCurveChart />
      </div>

      {/* Time-Dependent Behavior */}
      <h3 className="text-2xl font-bold text-[#18181b] mb-6">
        Time-Dependent Flow Behavior
      </h3>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6">
          <h4 className="font-bold text-[#4f46e5] mb-3">Thixotropy</h4>
          <p className="text-[#6b7280] text-sm mb-3">
            A thixotropic material shows a <em>decrease</em> in viscosity over
            time at constant shear rate and a gradual structural recovery when
            shearing stops. The classic experimental signature is a{" "}
            <strong className="text-[#18181b]">hysteresis loop</strong> in a
            shear rate ramp-up/ramp-down cycle (area = thixotropic energy).
          </p>
          <div className="math-block text-sm">
            <span className="math">η</span>(<span className="math">t</span>) ={" "}
            <span className="math">η</span>
            <sub>∞</sub> + (<span className="math">η</span>
            <sub>0</sub> − <span className="math">η</span>
            <sub>∞</sub>) · e<sup>−<span className="math">t</span>/<span className="math">λ</span></sup>
          </div>
          <p className="text-[#6b7280] text-xs mt-3 mb-2">
            <strong className="text-[#18181b]">Structural kinetics approach</strong>{" "}
            (Mewis &amp; Wagner, <em>Adv. Colloid Interface Sci.</em>, 2009):
          </p>
          <div className="math-block text-sm">
            dξ/dt = (1/λ<sub>r</sub>)(1 − ξ) − (1/λ<sub>b</sub>)ξ · γ̇<sup>m</sup>
          </div>
          <p className="text-[#6b7280] text-xs mt-2">
            where ξ ∈ [0,1] is the structure parameter, λ<sub>r</sub> is recovery
            time, λ<sub>b</sub> is breakdown time, and m controls shear sensitivity.
            Examples: yogurt, paints, drilling muds, recycled polymer blends with
            phase-separated morphologies.
          </p>
        </div>

        <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6">
          <h4 className="font-bold text-[#7c3aed] mb-3">Rheopexy (Anti-thixotropy)</h4>
          <p className="text-[#6b7280] text-sm mb-3">
            The opposite of thixotropy: viscosity <em>increases</em> over time
            under constant shear. Shearing induces structure formation
            (e.g., shear-induced crystallization, physical gelation, or
            flow-induced association of supramolecular polymers).
          </p>
          <div className="math-block text-sm">
            <span className="math">η</span>(<span className="math">t</span>) ={" "}
            <span className="math">η</span>
            <sub>0</sub> + (<span className="math">η</span>
            <sub>∞</sub> − <span className="math">η</span>
            <sub>0</sub>) · (1 − e<sup>−<span className="math">t</span>/<span className="math">λ</span></sup>)
          </div>
          <p className="text-[#6b7280] text-xs mt-3">
            Much rarer than thixotropy. Can occur in semi-crystalline polymers during
            flow near the crystallization temperature — shear accelerates nucleation
            and crystal growth (flow-induced crystallization, FIC). This is a critical
            phenomenon in injection molding of iPP and PET.
          </p>
          <p className="text-[#6b7280] text-xs mt-2">
            Examples: gypsum paste, some printer inks, PET under shear near T<sub>c</sub>,
            certain supramolecular hydrogen-bonded polymer networks.
          </p>
        </div>
      </div>

      {/* Recycled Plastics Special Case */}
      <div className="bg-[#f8f8fa] border border-[#4f46e5]/10 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#0d9488]/8 text-[#0d9488] text-xs font-semibold">
            SPECIAL CASE
          </span>
          <h3 className="text-xl font-bold text-[#18181b]">
            Rheology of Recycled Polymers — Fundamentals
          </h3>
        </div>
        <p className="text-[#6b7280] text-sm mb-4">
          Recycled polymers present unique rheological challenges that are absent in
          virgin materials. Understanding these fundamentals is essential for the
          circular economy:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#f4f4f5] rounded-xl p-4">
            <h5 className="text-[#4f46e5] font-semibold text-sm mb-2">
              Chain Degradation Effects
            </h5>
            <p className="text-[#6b7280] text-xs mb-2">
              Mechanical recycling subjects polymers to thermo-mechanical degradation
              (chain scission and/or crosslinking). For condensation polymers
              (PET, PA), hydrolysis reduces M<sub>w</sub>, lowering η₀ following:
            </p>
            <div className="math-block text-xs">
              η₀ = K · M<sub>w</sub><sup>3.4</sup> (above M<sub>c</sub>)
            </div>
            <p className="text-[#6b7280] text-xs mt-2">
              A 20% reduction in M<sub>w</sub> can cause a ~50% drop in η₀.
              For polyolefins, chain scission (PP) and crosslinking (PE) compete,
              making viscosity changes unpredictable
              (Incarnato et al., <em>Polymer</em>, 2004).
            </p>
          </div>
          <div className="bg-[#f4f4f5] rounded-xl p-4">
            <h5 className="text-[#7c3aed] font-semibold text-sm mb-2">
              Contamination &amp; Blending Effects
            </h5>
            <p className="text-[#6b7280] text-xs mb-2">
              Post-consumer recycled (PCR) streams are rarely pure. Even 1–5% of an
              immiscible contaminant (e.g., PE in PP, PVC in PET) can:
            </p>
            <ul className="text-[#6b7280] text-xs list-disc list-inside space-y-1">
              <li>Create dispersed phase droplets that affect viscosity via Taylor&apos;s theory</li>
              <li>Cause unexpected yield stresses at &gt;10% dispersed phase (percolation)</li>
              <li>Introduce thixotropy from morphology rearrangement under flow</li>
              <li>Catalyze degradation (PVC → HCl → PET chain scission)</li>
            </ul>
            <p className="text-[#6b7280] text-xs mt-2">
              The Palierne model is commonly used to predict G&apos;, G&apos;&apos; of immiscible
              polymer blends from component properties and interfacial tension
              (Palierne, <em>Rheol. Acta</em>, 1990).
            </p>
          </div>
        </div>
      </div>

      {/* Key References */}
      <div className="bg-white border border-[#e4e4e7] rounded-2xl p-6">
        <h4 className="font-bold text-[#18181b] mb-3">Key References — Fundamentals</h4>
        <ul className="text-[#6b7280] text-sm space-y-2">
          <li>
            Macosko, C.W. (1994). <em>Rheology: Principles, Measurements, and Applications.</em>{" "}
            Wiley-VCH. — The standard graduate-level textbook covering all fundamental concepts.
          </li>
          <li>
            Morrison, F.A. (2001). <em>Understanding Rheology.</em> Oxford University Press. —
            Excellent for tensor notation and constitutive equation derivations.
          </li>
          <li>
            Barnes, H.A., Hutton, J.F., Walters, K. (1989). <em>An Introduction to Rheology.</em>{" "}
            Elsevier. — Accessible introduction with industrial examples.
          </li>
          <li>
            Mewis, J. &amp; Wagner, N.J. (2012). <em>Colloidal Suspension Rheology.</em>{" "}
            Cambridge University Press. — Essential for filled polymer systems and recycled
            compound rheology.
          </li>
        </ul>
      </div>
    </SectionWrapper>
  );
}
