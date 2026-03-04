"use client";

import SectionWrapper from "./SectionWrapper";
import FrequencySweepChart from "./charts/FrequencySweepChart";

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-[#f1f5f9] mb-6">{title}</h3>
      {children}
    </div>
  );
}

export default function PolymerRheology() {
  return (
    <SectionWrapper
      id="polymer-rheology"
      title="Deep Dive into Polymer Rheology"
      subtitle="Section 2 — Advanced Topics"
      accent="#a78bfa"
    >
      {/* Viscoelasticity */}
      <SubSection title="Viscoelasticity">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
            <h4 className="font-bold text-[#38bdf8] mb-3">Creep</h4>
            <p className="text-[#94a3b8] text-sm mb-3">
              A constant stress <span className="math">σ₀</span> is applied
              instantaneously, and the resulting strain{" "}
              <span className="math">γ(t)</span> is measured over time. The
              creep compliance is:
            </p>
            <div className="math-block text-sm">
              <span className="math">J</span>(<span className="math">t</span>) ={" "}
              <span className="math">γ</span>(<span className="math">t</span>) /{" "}
              <span className="math">σ₀</span> &nbsp; [Pa⁻¹]
            </div>
            <p className="text-[#94a3b8] text-xs mt-3">
              For a viscoelastic solid, J(t) reaches a plateau. For a
              viscoelastic liquid, it shows a continuously increasing
              contribution from viscous flow.
            </p>
          </div>

          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
            <h4 className="font-bold text-[#a78bfa] mb-3">Stress Relaxation</h4>
            <p className="text-[#94a3b8] text-sm mb-3">
              A step strain <span className="math">γ₀</span> is applied, and
              the decaying stress{" "}
              <span className="math">σ(t)</span> is monitored. The relaxation
              modulus:
            </p>
            <div className="math-block text-sm">
              <span className="math">G</span>(<span className="math">t</span>) ={" "}
              <span className="math">σ</span>(<span className="math">t</span>) /{" "}
              <span className="math">γ₀</span> &nbsp; [Pa]
            </div>
            <p className="text-[#94a3b8] text-xs mt-3">
              For a single Maxwell element: G(t) = G₀ · exp(−t/λ), where λ is
              the relaxation time. Real polymers exhibit a spectrum of
              relaxation times.
            </p>
          </div>

          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
            <h4 className="font-bold text-[#34d399] mb-3">Oscillatory Shear</h4>
            <p className="text-[#94a3b8] text-sm mb-3">
              A sinusoidal strain is applied:
            </p>
            <div className="math-block text-sm">
              <span className="math">γ</span>(<span className="math">t</span>) ={" "}
              <span className="math">γ₀</span> sin(<span className="math">ωt</span>)
            </div>
            <p className="text-[#94a3b8] text-sm mt-3 mb-2">
              The stress response of a viscoelastic material is:
            </p>
            <div className="math-block text-sm">
              <span className="math">σ</span>(<span className="math">t</span>) ={" "}
              <span className="math">γ₀</span>[G&apos; sin(<span className="math">ωt</span>) + G&apos;&apos; cos(<span className="math">ωt</span>)]
            </div>
          </div>
        </div>

        {/* Mechanical Models */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 mb-8">
          <h4 className="font-bold text-[#f1f5f9] mb-4">
            Linear Viscoelastic Models
          </h4>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <h5 className="text-[#38bdf8] font-semibold mb-2">
                Maxwell Model
              </h5>
              <p className="text-[#94a3b8] text-sm mb-2">
                Spring and dashpot in <em>series</em>. Describes stress
                relaxation well, but not creep.
              </p>
              <div className="math-block text-sm">
                d<span className="math">γ</span>/d<span className="math">t</span> ={" "}
                (1/<span className="math">G</span>) d<span className="math">σ</span>/d<span className="math">t</span> +{" "}
                <span className="math">σ</span>/<span className="math">η</span>
              </div>
            </div>
            <div>
              <h5 className="text-[#a78bfa] font-semibold mb-2">
                Kelvin-Voigt Model
              </h5>
              <p className="text-[#94a3b8] text-sm mb-2">
                Spring and dashpot in <em>parallel</em>. Describes creep well,
                but cannot relax stress.
              </p>
              <div className="math-block text-sm">
                <span className="math">σ</span> ={" "}
                <span className="math">G</span> · <span className="math">γ</span> +{" "}
                <span className="math">η</span> · d<span className="math">γ</span>/d<span className="math">t</span>
              </div>
            </div>
            <div>
              <h5 className="text-[#34d399] font-semibold mb-2">
                Generalized Maxwell
              </h5>
              <p className="text-[#94a3b8] text-sm mb-2">
                N Maxwell elements in parallel, yielding a discrete relaxation
                spectrum:
              </p>
              <div className="math-block text-sm">
                G(t) = Σ<sub>i</sub> G<sub>i</sub> · e<sup>−t/λ<sub>i</sub></sup>
              </div>
            </div>
          </div>
        </div>
      </SubSection>

      {/* Dynamic Moduli & Frequency Sweep */}
      <SubSection title="Dynamic Moduli — Storage & Loss Modulus">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
            <h4 className="font-bold text-[#38bdf8] mb-3">
              Storage Modulus G&apos; (Elastic Component)
            </h4>
            <p className="text-[#94a3b8] text-sm mb-3">
              G&apos; represents the energy <em>stored</em> elastically per cycle
              of deformation. It is proportional to the in-phase component
              of the stress response:
            </p>
            <div className="math-block text-sm">
              G&apos; = (<span className="math">σ₀</span> / <span className="math">γ₀</span>) cos(<span className="math">δ</span>)
            </div>
            <p className="text-[#94a3b8] text-xs mt-2">
              High G&apos; indicates solid-like, elastic behavior.
            </p>
          </div>
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
            <h4 className="font-bold text-[#f472b6] mb-3">
              Loss Modulus G&apos;&apos; (Viscous Component)
            </h4>
            <p className="text-[#94a3b8] text-sm mb-3">
              G&apos;&apos; represents the energy <em>dissipated</em> as heat per
              cycle. It is proportional to the out-of-phase stress component:
            </p>
            <div className="math-block text-sm">
              G&apos;&apos; = (<span className="math">σ₀</span> / <span className="math">γ₀</span>) sin(<span className="math">δ</span>)
            </div>
            <p className="text-[#94a3b8] text-xs mt-2">
              High G&apos;&apos; indicates liquid-like, viscous behavior.
            </p>
          </div>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-bold text-[#f1f5f9]">Damping Factor</h4>
            <span className="px-2 py-0.5 rounded bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold">
              tan(δ)
            </span>
          </div>
          <p className="text-[#94a3b8] text-sm mb-3">
            The ratio of energy dissipated to energy stored per cycle:
          </p>
          <div className="math-block">
            tan(<span className="math">δ</span>) = G&apos;&apos; / G&apos;
          </div>
          <p className="text-[#94a3b8] text-sm mt-3">
            When tan(δ) &gt; 1, viscous behavior dominates (liquid-like).
            When tan(δ) &lt; 1, elastic behavior dominates (solid-like).
            At the crossover point, tan(δ) = 1 exactly.
          </p>
        </div>

        {/* Interactive Frequency Sweep Chart */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 mb-8">
          <h4 className="text-xl font-bold text-[#f1f5f9] mb-2">
            Interactive Frequency Sweep — G&apos; and G&apos;&apos; Crossover
          </h4>
          <p className="text-[#94a3b8] text-sm mb-6">
            Adjust the crossover frequency and plateau modulus to see how the
            dynamic moduli evolve. The crossover point (G&apos; = G&apos;&apos;)
            shifts along the frequency axis and is directly related to the
            longest relaxation time (λ = 1/ω<sub>c</sub>).
          </p>
          <FrequencySweepChart />
        </div>
      </SubSection>

      {/* TTS & Temperature Effects */}
      <SubSection title="Temperature Effects — Time-Temperature Superposition">
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 mb-8">
          <p className="text-[#94a3b8] mb-4">
            The principle of{" "}
            <strong className="text-[#e2e8f0]">
              Time-Temperature Superposition (TTS)
            </strong>{" "}
            states that the effect of changing temperature on rheological
            properties is equivalent to shifting the frequency (time) scale by
            a shift factor <span className="math">a</span>
            <sub>T</sub>. This allows construction of{" "}
            <strong className="text-[#e2e8f0]">master curves</strong> spanning
            many decades of frequency from limited experimental windows.
          </p>
          <div className="math-block">
            G&apos;(ω, T) = G&apos;(ω · <span className="math">a</span>
            <sub>T</sub>, T<sub>ref</sub>)
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
            <h4 className="font-bold text-[#38bdf8] mb-3">
              WLF Equation
            </h4>
            <p className="text-[#94a3b8] text-sm mb-3">
              Valid near and above the glass transition temperature T<sub>g</sub>.
              Derived from free-volume theory:
            </p>
            <div className="math-block text-sm">
              log(<span className="math">a</span>
              <sub>T</sub>) = −C₁(T − T<sub>ref</sub>) / [C₂ + (T − T<sub>ref</sub>)]
            </div>
            <p className="text-[#94a3b8] text-xs mt-3">
              Universal constants (when T<sub>ref</sub> = T<sub>g</sub>): C₁ ≈ 17.44, C₂ ≈ 51.6 K.
              These vary significantly for specific polymers.
            </p>
          </div>

          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
            <h4 className="font-bold text-[#a78bfa] mb-3">
              Arrhenius Equation
            </h4>
            <p className="text-[#94a3b8] text-sm mb-3">
              Valid well above T<sub>g</sub> (typically T &gt; T<sub>g</sub> + 100 K), where free
              volume is no longer the rate-limiting factor:
            </p>
            <div className="math-block text-sm">
              <span className="math">a</span>
              <sub>T</sub> = exp[E<sub>a</sub>/R · (1/T − 1/T<sub>ref</sub>)]
            </div>
            <p className="text-[#94a3b8] text-xs mt-3">
              E<sub>a</sub> is the flow activation energy [J/mol], R is the
              gas constant. Semi-crystalline polymers often follow Arrhenius
              behavior above their melting point.
            </p>
          </div>
        </div>
      </SubSection>

      {/* Extensional Rheology */}
      <SubSection title="Extensional Rheology">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
            <h4 className="font-bold text-[#34d399] mb-3">
              Extensional (Elongational) Viscosity
            </h4>
            <p className="text-[#94a3b8] text-sm mb-3">
              In uniaxial extension, the extensional viscosity is defined as:
            </p>
            <div className="math-block text-sm">
              <span className="math">η</span>
              <sub>E</sub> = <span className="math">σ</span>
              <sub>E</sub> / <span className="math">ε̇</span> &nbsp; [Pa·s]
            </div>
            <p className="text-[#94a3b8] text-sm mt-3">
              For a Newtonian fluid, Trouton&apos;s ratio gives:
            </p>
            <div className="math-block text-sm">
              <span className="math">η</span>
              <sub>E</sub> = 3<span className="math">η</span> &nbsp;
              (uniaxial extension)
            </div>
          </div>

          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
            <h4 className="font-bold text-[#f472b6] mb-3">
              Melt Strength & Strain Hardening
            </h4>
            <p className="text-[#94a3b8] text-sm mb-3">
              <strong className="text-[#e2e8f0]">Melt strength</strong> is the
              maximum tensile force a polymer melt can sustain before breaking
              during extension. It is critical for processes like blow molding
              and film blowing.
            </p>
            <p className="text-[#94a3b8] text-sm mb-3">
              <strong className="text-[#e2e8f0]">Strain hardening</strong>{" "}
              occurs when the extensional viscosity increases beyond the linear
              viscoelastic prediction (3η₀) at high Hencky strains. This is
              characteristic of:
            </p>
            <ul className="text-[#94a3b8] text-sm list-disc list-inside space-y-1">
              <li>Long-chain branched polymers (e.g., LDPE)</li>
              <li>Polymers with broad molecular weight distributions</li>
              <li>Some bimodal polyethylenes</li>
            </ul>
          </div>
        </div>
      </SubSection>
    </SectionWrapper>
  );
}
