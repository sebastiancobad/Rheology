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
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-[#0B2545] mb-6 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
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
      accent="#13315C"
    >
      {/* Molecular Origin */}
      <SubSection title="Molecular Origin of Polymer Viscoelasticity">
        <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 mb-8">
          <p className="text-[#3d6285] text-sm mb-4">
            The unique rheological properties of polymers arise from their{" "}
            <strong className="text-[#0B2545]">chain-like molecular architecture</strong>.
            Unlike small-molecule liquids, polymer chains with degree of polymerization
            N ≫ 1 can entangle, forming a temporary topological network that dominates
            the mechanical response. The critical molecular weight for entanglement
            M<sub>e</sub> is a fundamental parameter:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#134074] mb-2">Rouse Model (Unentangled, M &lt; M<sub>c</sub>)</h4>
              <p className="text-[#3d6285] text-xs mb-2">
                For unentangled chains, the Rouse model (1953) treats the polymer as a
                series of N beads connected by harmonic springs (friction coefficient ζ):
              </p>
              <div className="math-block text-xs">
                η₀ ∝ N ∝ M<sub>w</sub><br />
                τ<sub>R</sub> = ζN²b² / (6π²k<sub>B</sub>T) ∝ M²<br />
                G(t) = (ρRT/M) Σ exp(−2t p²/τ<sub>R</sub>)
              </div>
              <p className="text-[#3d6285] text-xs mt-2">
                Predicts η₀ ∝ M (linear dependence) and G&apos;(ω) ∝ ω² / G&apos;&apos;(ω) ∝ ω
                in the terminal regime. The Rouse spectrum has a characteristic −1/2
                slope in H(λ) vs. λ.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#13315C] mb-2">Reptation / Tube Model (Entangled, M &gt; M<sub>c</sub>)</h4>
              <p className="text-[#3d6285] text-xs mb-2">
                For entangled polymers, de Gennes (1971) and Doi-Edwards (1978) proposed
                that chains are confined to a &quot;tube&quot; formed by surrounding chains and
                relax by curvilinear diffusion (&quot;reptation&quot;):
              </p>
              <div className="math-block text-xs">
                η₀ ∝ M<sub>w</sub><sup>3.4</sup> (experimentally; theory predicts 3.0)<br />
                τ<sub>d</sub> = ζN³b² / (π²k<sub>B</sub>T · N<sub>e</sub>) ∝ M³<br />
                G<sub>N</sub><sup>0</sup> = ρRT / M<sub>e</sub> (plateau modulus)
              </div>
              <p className="text-[#3d6285] text-xs mt-2">
                The discrepancy (3.4 vs. 3.0) is attributed to contour length
                fluctuations (CLF) and constraint release (CR). Modern extensions
                (Likhtman-McLeish, 2002; Milner-McLeish, 1998) incorporate these
                corrections and predict the full G(t) quantitatively.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#c9d9e8] rounded-2xl p-6 mb-8">
          <h4 className="font-bold text-[#0B2545] mb-3">
            Entanglement Molecular Weight — Key Values
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-[#c9d9e8]">
                  <th className="px-4 py-2 text-[#0B2545]">Polymer</th>
                  <th className="px-4 py-2 text-[#0B2545]">M<sub>e</sub> (g/mol)</th>
                  <th className="px-4 py-2 text-[#0B2545]">G<sub>N</sub><sup>0</sup> (MPa)</th>
                  <th className="px-4 py-2 text-[#0B2545]">M<sub>c</sub> ≈ 2M<sub>e</sub></th>
                </tr>
              </thead>
              <tbody className="text-[#3d6285]">
                <tr className="border-b border-[#c9d9e8]">
                  <td className="px-4 py-2">Polyethylene (PE)</td>
                  <td className="px-4 py-2">~1,250</td>
                  <td className="px-4 py-2">2.6</td>
                  <td className="px-4 py-2">~2,500</td>
                </tr>
                <tr className="border-b border-[#c9d9e8]">
                  <td className="px-4 py-2">Polypropylene (iPP)</td>
                  <td className="px-4 py-2">~5,500</td>
                  <td className="px-4 py-2">0.47</td>
                  <td className="px-4 py-2">~11,000</td>
                </tr>
                <tr className="border-b border-[#c9d9e8]">
                  <td className="px-4 py-2">Polystyrene (PS)</td>
                  <td className="px-4 py-2">~13,300</td>
                  <td className="px-4 py-2">0.20</td>
                  <td className="px-4 py-2">~26,600</td>
                </tr>
                <tr className="border-b border-[#c9d9e8]">
                  <td className="px-4 py-2">PMMA</td>
                  <td className="px-4 py-2">~10,000</td>
                  <td className="px-4 py-2">0.31</td>
                  <td className="px-4 py-2">~20,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">PET</td>
                  <td className="px-4 py-2">~1,450</td>
                  <td className="px-4 py-2">2.1</td>
                  <td className="px-4 py-2">~2,900</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#3d6285] text-xs mt-3">
            Values from Fetters, Lohse &amp; Colby (2007), <em>Physical Properties of Polymers Handbook</em>.
            M<sub>e</sub> is inversely related to chain stiffness and packing length.
          </p>
        </div>
      </SubSection>

      {/* Viscoelasticity */}
      <SubSection title="Viscoelastic Characterization Experiments">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6">
            <h4 className="font-bold text-[#134074] mb-3">Creep &amp; Creep Recovery</h4>
            <p className="text-[#3d6285] text-sm mb-3">
              A constant stress <span className="math">σ₀</span> is applied
              instantaneously, and the resulting strain{" "}
              <span className="math">γ(t)</span> is measured. The
              creep compliance is:
            </p>
            <div className="math-block text-sm">
              <span className="math">J</span>(<span className="math">t</span>) ={" "}
              <span className="math">γ</span>(<span className="math">t</span>) /{" "}
              <span className="math">σ₀</span> &nbsp; [Pa⁻¹]
            </div>
            <p className="text-[#3d6285] text-xs mt-3 mb-2">
              For a viscoelastic liquid (Maxwell-type):
            </p>
            <div className="math-block text-xs">
              J(t) = J<sub>0</sub> + Σ J<sub>i</sub>(1 − e<sup>−t/τ<sub>i</sub></sup>) + t/η₀
            </div>
            <p className="text-[#3d6285] text-xs mt-2">
              The steady-state recoverable compliance J<sub>e</sub><sup>0</sup> ={" "}
              lim[J(t) − t/η₀] is extremely sensitive to the high-MW tail of the
              distribution — much more so than η₀. For recycled polymers, creep
              compliance can detect minor contamination that broadens the relaxation
              spectrum (Stadler et al., <em>Rheol. Acta</em>, 2008).
            </p>
          </div>

          <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6">
            <h4 className="font-bold text-[#13315C] mb-3">Stress Relaxation</h4>
            <p className="text-[#3d6285] text-sm mb-3">
              A step strain <span className="math">γ₀</span> is applied, and
              the decaying stress <span className="math">σ(t)</span> is monitored.
              The relaxation modulus:
            </p>
            <div className="math-block text-sm">
              <span className="math">G</span>(<span className="math">t</span>) ={" "}
              <span className="math">σ</span>(<span className="math">t</span>) /{" "}
              <span className="math">γ₀</span> &nbsp; [Pa]
            </div>
            <p className="text-[#3d6285] text-xs mt-3 mb-2">
              For the <strong className="text-[#0B2545]">Generalized Maxwell model</strong>{" "}
              (discrete relaxation spectrum):
            </p>
            <div className="math-block text-xs">
              G(t) = Σ<sub>i=1</sub><sup>N</sup> G<sub>i</sub> · exp(−t/λ<sub>i</sub>)
            </div>
            <p className="text-[#3d6285] text-xs mt-2">
              The <strong className="text-[#0B2545]">relaxation time spectrum H(λ)</strong>{" "}
              is the continuous analog, obtained by regularization methods (e.g.,
              Tikhonov regularization, NLREG software). The spectrum provides direct
              molecular information: its shape, breadth, and terminal time correlate
              with MWD, branching, and entanglement density.
            </p>
          </div>

          <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6">
            <h4 className="font-bold text-[#0B2545] mb-3">Oscillatory Shear (SAOS)</h4>
            <p className="text-[#3d6285] text-sm mb-3">
              Small-Amplitude Oscillatory Shear applies:
            </p>
            <div className="math-block text-sm">
              <span className="math">γ</span>(<span className="math">t</span>) ={" "}
              <span className="math">γ₀</span> sin(<span className="math">ωt</span>)
            </div>
            <p className="text-[#3d6285] text-sm mt-3 mb-2">
              The stress response within the Linear Viscoelastic Region (LVR):
            </p>
            <div className="math-block text-sm">
              <span className="math">σ</span>(<span className="math">t</span>) ={" "}
              <span className="math">γ₀</span>[G&apos; sin(<span className="math">ωt</span>) + G&apos;&apos; cos(<span className="math">ωt</span>)]
            </div>
            <p className="text-[#3d6285] text-xs mt-3">
              <strong className="text-[#0B2545]">Critical prerequisite:</strong> Strain
              sweep must be performed first to identify the LVR (where G&apos;, G&apos;&apos; are
              independent of γ₀). Typical LVR limits: γ₀ &lt; 1% for entangled melts,
              γ₀ &lt; 0.1% for filled systems or gels, γ₀ &lt; 0.01% for highly
              structured materials.
            </p>
          </div>
        </div>

        {/* LAOS */}
        <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h4 className="font-bold text-[#0B2545]">
              Large-Amplitude Oscillatory Shear (LAOS)
            </h4>
            <span className="px-2 py-0.5 rounded bg-[#134074]/8 text-[#134074] text-xs font-semibold">
              Advanced Topic
            </span>
          </div>
          <p className="text-[#3d6285] text-sm mb-4">
            When γ₀ exceeds the LVR, the stress response becomes nonlinear and contains
            higher harmonics. LAOS analysis (Hyun et al., <em>Prog. Polym. Sci.</em>, 2011)
            provides rich information about nonlinear viscoelasticity:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="math-block text-sm">
                σ(t) = γ₀ Σ<sub>n=odd</sub> [G&apos;<sub>n</sub> sin(nωt) + G&apos;&apos;<sub>n</sub> cos(nωt)]
              </div>
              <p className="text-[#3d6285] text-xs mt-3">
                The ratio I<sub>3/1</sub> = |G*<sub>3</sub>|/|G*<sub>1</sub>| quantifies
                nonlinearity. FT-rheology (Wilhelm, <em>Macromol. Mater. Eng.</em>, 2002)
                uses Fourier transform to analyze the harmonic content.
              </p>
            </div>
            <div>
              <h5 className="text-[#134074] font-semibold text-sm mb-2">
                Sequence of Physical Processes (SPP)
              </h5>
              <p className="text-[#3d6285] text-xs">
                Rogers (2012) introduced the SPP framework, which decomposes LAOS into
                a sequence of instantaneous elastic and viscous moduli throughout the
                oscillation cycle. This provides physical insight unavailable from
                harmonic decomposition alone. LAOS is particularly useful for
                characterizing <strong className="text-[#0B2545]">recycled polymer blends</strong>{" "}
                where interfacial slip and droplet deformation create complex nonlinear
                signatures (Salehiyan &amp; Hyun, <em>Macromolecules</em>, 2013).
              </p>
            </div>
          </div>
        </div>

        {/* Mechanical Models */}
        <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 mb-8">
          <h4 className="font-bold text-[#0B2545] mb-4">
            Linear Viscoelastic Models
          </h4>
          <div className="grid sm:grid-cols-3 gap-6 mb-6">
            <div>
              <h5 className="text-[#134074] font-semibold mb-2">Maxwell Model</h5>
              <p className="text-[#3d6285] text-sm mb-2">
                Spring (G) and dashpot (η) in <em>series</em>. Describes stress
                relaxation well, but predicts unrealistic creep behavior.
              </p>
              <div className="math-block text-sm">
                dγ/dt = (1/G) dσ/dt + σ/η<br />
                G(t) = G · exp(−t/λ), &nbsp;λ = η/G
              </div>
            </div>
            <div>
              <h5 className="text-[#13315C] font-semibold mb-2">Kelvin-Voigt Model</h5>
              <p className="text-[#3d6285] text-sm mb-2">
                Spring and dashpot in <em>parallel</em>. Describes creep retardation
                well, but cannot relax stress.
              </p>
              <div className="math-block text-sm">
                σ = G · γ + η · dγ/dt<br />
                J(t) = (1/G)(1 − exp(−t/τ<sub>ret</sub>))
              </div>
            </div>
            <div>
              <h5 className="text-[#0B2545] font-semibold mb-2">Generalized Maxwell</h5>
              <p className="text-[#3d6285] text-sm mb-2">
                N Maxwell elements in parallel — the standard model used in FEM
                simulation software:
              </p>
              <div className="math-block text-sm">
                G(t) = Σ<sub>i</sub> G<sub>i</sub> · e<sup>−t/λ<sub>i</sub></sup><br />
                G&apos;(ω) = Σ G<sub>i</sub>(ωλ<sub>i</sub>)²/[1 + (ωλ<sub>i</sub>)²]
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#dde8d8] p-4">
            <h5 className="text-[#8DA9C4] font-semibold text-sm mb-2">
              Nonlinear Constitutive Models (Beyond LVE)
            </h5>
            <p className="text-[#3d6285] text-xs">
              For polymer processing where large deformations occur:{" "}
              <strong className="text-[#0B2545]">Wagner integral model</strong> (strain
              damping function h(γ)),{" "}
              <strong className="text-[#0B2545]">Pom-Pom model</strong> (for branched
              polymers, McLeish &amp; Larson, 1998),{" "}
              <strong className="text-[#0B2545]">Rolie-Poly</strong> (Likhtman &amp; Graham, 2003)
              for linear polymers. The{" "}
              <strong className="text-[#0B2545]">Giesekus model</strong> (1982) and{" "}
              <strong className="text-[#0B2545]">PTT model</strong> (Phan-Thien &amp; Tanner, 1977)
              remain workhorses in commercial CFD software (Polyflow, ANSYS Fluent, OpenFOAM).
            </p>
          </div>
        </div>
      </SubSection>

      {/* Dynamic Moduli & Frequency Sweep */}
      <SubSection title="Dynamic Moduli — Storage &amp; Loss Modulus">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6">
            <h4 className="font-bold text-[#134074] mb-3">
              Storage Modulus G&apos; (Elastic Component)
            </h4>
            <p className="text-[#3d6285] text-sm mb-3">
              G&apos; represents the energy <em>stored</em> elastically per cycle
              of deformation:
            </p>
            <div className="math-block text-sm">
              G&apos; = (σ₀/γ₀) cos(δ) = |G*| cos(δ)
            </div>
            <p className="text-[#3d6285] text-xs mt-3">
              In the terminal zone (ω → 0): G&apos; ∝ ω² for entangled linear polymers.
              Deviation from this scaling indicates long-chain branching
              (G&apos; ∝ ω<sup>n</sup>, n &lt; 2), or the presence of a gel network
              (G&apos; → plateau as ω → 0). This terminal behavior is one of the most
              sensitive rheological fingerprints for detecting even trace amounts of
              ultra-high MW material or crosslinked gel in recycled polymers.
            </p>
          </div>
          <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6">
            <h4 className="font-bold text-[#134074] mb-3">
              Loss Modulus G&apos;&apos; (Viscous Component)
            </h4>
            <p className="text-[#3d6285] text-sm mb-3">
              G&apos;&apos; represents the energy <em>dissipated</em> as heat per
              cycle:
            </p>
            <div className="math-block text-sm">
              G&apos;&apos; = (σ₀/γ₀) sin(δ) = |G*| sin(δ)
            </div>
            <p className="text-[#3d6285] text-xs mt-3">
              In the terminal zone: G&apos;&apos; ∝ ω for entangled linear polymers.
              The <strong className="text-[#0B2545]">van Gurp-Palmen plot</strong>{" "}
              (δ vs. |G*|) eliminates the frequency variable and is particularly
              sensitive to branching and polydispersity — widely used for quality
              control of recycled resins (Trinkle &amp; Friedrich,{" "}
              <em>Rheol. Acta</em>, 2001).
            </p>
          </div>
        </div>

        <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-bold text-[#0B2545]">Damping Factor &amp; Cole-Cole Analysis</h4>
            <span className="px-2 py-0.5 rounded bg-[#8DA9C4]/8 text-[#8DA9C4] text-xs font-semibold">
              tan(δ)
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-[#3d6285] text-sm mb-3">
                The ratio of energy dissipated to energy stored per cycle:
              </p>
              <div className="math-block">
                tan(δ) = G&apos;&apos; / G&apos;
              </div>
              <p className="text-[#3d6285] text-sm mt-3">
                At the crossover point, tan(δ) = 1. The crossover frequency
                ω<sub>c</sub> gives the terminal relaxation time λ = 1/ω<sub>c</sub>,
                which scales with M<sub>w</sub><sup>3.4</sup>.
              </p>
            </div>
            <div>
              <h5 className="text-[#13315C] font-semibold text-sm mb-2">Cole-Cole Plot</h5>
              <p className="text-[#3d6285] text-xs mb-2">
                The <strong className="text-[#0B2545]">Cole-Cole plot</strong> (η&apos;&apos; vs. η&apos;)
                reveals structural information:
              </p>
              <ul className="text-[#3d6285] text-xs list-disc list-inside space-y-1">
                <li>A semicircle → single relaxation time (Maxwell)</li>
                <li>A skewed arc → distribution of relaxation times</li>
                <li>A &quot;tail&quot; at low η&apos; → long-chain branching or gel</li>
                <li>T-independent Cole-Cole → thermorheological simplicity</li>
              </ul>
              <p className="text-[#3d6285] text-xs mt-2">
                For recycled blends, a second arc detects immiscibility even when
                morphological analysis is inconclusive (Pötschke &amp; Paul, 2003).
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Frequency Sweep Chart */}
        <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 mb-8">
          <h4 className="text-xl font-bold text-[#0B2545] mb-2">
            Interactive Frequency Sweep — G&apos; and G&apos;&apos; Crossover
          </h4>
          <p className="text-[#3d6285] text-sm mb-6">
            Adjust the crossover frequency and plateau modulus to see how the
            dynamic moduli evolve. The crossover point (G&apos; = G&apos;&apos;)
            shifts along the frequency axis and is directly related to the
            longest relaxation time (λ = 1/ω<sub>c</sub>). Higher M<sub>w</sub>{" "}
            shifts ω<sub>c</sub> to lower frequencies; broader MWD broadens the
            crossover region.
          </p>
          <FrequencySweepChart />
        </div>

        {/* Molecular Weight Diagnostics */}
        <div className="bg-white border border-[#c9d9e8] rounded-2xl p-6 mb-8">
          <h4 className="font-bold text-[#0B2545] mb-3">
            Rheological Diagnostics from Dynamic Data
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#e4ede3] rounded-xl p-4">
              <h5 className="text-[#134074] font-semibold text-sm mb-2">Molecular Weight</h5>
              <p className="text-[#3d6285] text-xs">
                η₀ ∝ M<sub>w</sub><sup>3.4</sup> (above M<sub>c</sub>). The crossover
                modulus G<sub>c</sub> is inversely related to polydispersity (PDI). Higher
                G<sub>c</sub> → narrower MWD. Routinely used in PE resin QC.
              </p>
            </div>
            <div className="bg-[#e4ede3] rounded-xl p-4">
              <h5 className="text-[#13315C] font-semibold text-sm mb-2">Long-Chain Branching</h5>
              <p className="text-[#3d6285] text-xs">
                LCB increases η₀ at a given M<sub>w</sub>. It suppresses terminal G&apos; ∝ ω² scaling,
                widens the crossover, and creates thermorheological complexity
                (TTS failure). Enhancement of η<sub>E</sub> (strain hardening) is the most
                definitive signature.
              </p>
            </div>
            <div className="bg-[#e4ede3] rounded-xl p-4">
              <h5 className="text-[#0B2545] font-semibold text-sm mb-2">Degradation Detection</h5>
              <p className="text-[#3d6285] text-xs">
                Chain scission shifts ω<sub>c</sub> to higher frequencies. Crosslinking causes
                G&apos; &gt; G&apos;&apos; across all frequencies (no crossover). Partial degradation
                broadens MWD, lowering G<sub>c</sub>. Monitoring η₀ and G<sub>c</sub> over
                multiple recycling passes provides degradation kinetics data.
              </p>
            </div>
          </div>
        </div>
      </SubSection>

      {/* TTS & Temperature Effects */}
      <SubSection title="Temperature Effects — Time-Temperature Superposition">
        <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 mb-8">
          <p className="text-[#3d6285] mb-4">
            <strong className="text-[#0B2545]">TTS</strong> states that changing
            temperature is equivalent to shifting the frequency scale by a<sub>T</sub>.
            This constructs <strong className="text-[#0B2545]">master curves</strong>{" "}
            spanning many decades from limited experimental windows.
          </p>
          <div className="math-block">
            G&apos;(ω, T) = (b<sub>T</sub>) · G&apos;(ω · a<sub>T</sub>, T<sub>ref</sub>)
          </div>
          <p className="text-[#3d6285] text-sm mt-3">
            where b<sub>T</sub> = ρT / (ρ<sub>ref</sub>T<sub>ref</sub>) is the
            vertical shift factor. TTS requires{" "}
            <strong className="text-[#0B2545]">thermorheological simplicity</strong> —
            all relaxation mechanisms must have the same T dependence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6">
            <h4 className="font-bold text-[#134074] mb-3">WLF Equation</h4>
            <p className="text-[#3d6285] text-sm mb-3">
              Valid near T<sub>g</sub>. From free-volume theory:
            </p>
            <div className="math-block text-sm">
              log(a<sub>T</sub>) = −C₁(T − T<sub>ref</sub>) / [C₂ + (T − T<sub>ref</sub>)]
            </div>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#c9d9e8]">
                    <th className="px-2 py-1 text-left text-[#0B2545]">Polymer</th>
                    <th className="px-2 py-1 text-left text-[#0B2545]">C₁</th>
                    <th className="px-2 py-1 text-left text-[#0B2545]">C₂ (K)</th>
                  </tr>
                </thead>
                <tbody className="text-[#3d6285]">
                  <tr className="border-b border-[#c9d9e8]/30">
                    <td className="px-2 py-1">PS</td><td className="px-2 py-1">13.7</td><td className="px-2 py-1">50.0</td>
                  </tr>
                  <tr className="border-b border-[#c9d9e8]/30">
                    <td className="px-2 py-1">PMMA</td><td className="px-2 py-1">17.4</td><td className="px-2 py-1">65.5</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">PVC</td><td className="px-2 py-1">16.2</td><td className="px-2 py-1">46.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6">
            <h4 className="font-bold text-[#13315C] mb-3">Arrhenius Equation</h4>
            <p className="text-[#3d6285] text-sm mb-3">
              Valid well above T<sub>g</sub> (T &gt; T<sub>g</sub> + 100 K):
            </p>
            <div className="math-block text-sm">
              a<sub>T</sub> = exp[E<sub>a</sub>/R · (1/T − 1/T<sub>ref</sub>)]
            </div>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#c9d9e8]">
                    <th className="px-2 py-1 text-left text-[#0B2545]">Polymer</th>
                    <th className="px-2 py-1 text-left text-[#0B2545]">E<sub>a</sub> (kJ/mol)</th>
                  </tr>
                </thead>
                <tbody className="text-[#3d6285]">
                  <tr className="border-b border-[#c9d9e8]/30">
                    <td className="px-2 py-1">HDPE</td><td className="px-2 py-1">25–28</td>
                  </tr>
                  <tr className="border-b border-[#c9d9e8]/30">
                    <td className="px-2 py-1">LDPE</td><td className="px-2 py-1">50–60 (higher due to LCB)</td>
                  </tr>
                  <tr className="border-b border-[#c9d9e8]/30">
                    <td className="px-2 py-1">iPP</td><td className="px-2 py-1">40–45</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">PET</td><td className="px-2 py-1">80–90</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* TTS Failure */}
        <div className="bg-[#EEF4ED] border border-[#13315C]/10 rounded-2xl p-6">
          <h4 className="font-bold text-[#0B2545] mb-3">
            When TTS Fails — Thermorheological Complexity
          </h4>
          <p className="text-[#3d6285] text-sm mb-3">
            TTS fails when different relaxation mechanisms have different T dependencies:
          </p>
          <ul className="text-[#3d6285] text-sm list-disc list-inside space-y-2">
            <li>
              <strong className="text-[#0B2545]">Long-chain branched polymers</strong> — branch
              retraction and backbone reptation have different activation energies.
            </li>
            <li>
              <strong className="text-[#0B2545]">Immiscible polymer blends</strong> — each
              phase has its own a<sub>T</sub>(T), plus interfacial relaxation.
              Critical for recycled streams with contaminants.
            </li>
            <li>
              <strong className="text-[#0B2545]">Semi-crystalline polymers near T<sub>m</sub></strong>{" "}
              — crystallization kinetics violate TTS.
            </li>
            <li>
              <strong className="text-[#0B2545]">Block copolymers</strong> — microphase
              separation creates distinct thermal responses.
            </li>
          </ul>
          <p className="text-[#3d6285] text-xs mt-3">
            <strong className="text-[#8DA9C4]">Literature gap:</strong> TTS applicability for
            multi-component recycled streams remains poorly characterized. Even &lt;2%
            crosslinked gel in recycled PE can cause apparent TTS failure
            (Auhl et al., <em>Macromolecules</em>, 2019).
          </p>
        </div>
      </SubSection>

      {/* Extensional Rheology */}
      <SubSection title="Extensional Rheology">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6">
            <h4 className="font-bold text-[#0B2545] mb-3">
              Extensional (Elongational) Viscosity
            </h4>
            <p className="text-[#3d6285] text-sm mb-3">
              Transient extensional viscosity at constant Hencky strain rate:
            </p>
            <div className="math-block text-sm">
              η<sub>E</sub><sup>+</sup>(t, ε̇) = [σ<sub>11</sub>(t) − σ<sub>22</sub>(t)] / ε̇
            </div>
            <p className="text-[#3d6285] text-sm mt-3 mb-2">
              <strong className="text-[#0B2545]">Trouton&apos;s ratios</strong> (Newtonian):
            </p>
            <div className="math-block text-sm">
              Tr = η<sub>E</sub>/η = 3 (uniaxial) &nbsp;| 6 (equibiaxial) &nbsp;| 4 (planar)
            </div>
            <p className="text-[#3d6285] text-xs mt-3">
              For polymer melts, Tr(t) initially follows the LVE prediction (3η<sup>+</sup>(t)),
              then deviates at a critical strain. Strain hardening (Tr &gt; 3) or
              softening (Tr &lt; 3) carries molecular topology information.
            </p>
          </div>

          <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6">
            <h4 className="font-bold text-[#134074] mb-3">
              Melt Strength &amp; Strain Hardening
            </h4>
            <p className="text-[#3d6285] text-sm mb-3">
              <strong className="text-[#0B2545]">Strain hardening factor</strong>:
            </p>
            <div className="math-block text-sm">
              SHF(ε̇, t) = η<sub>E</sub><sup>+</sup>(t, ε̇) / 3η<sup>+</sup>(t)
            </div>
            <p className="text-[#3d6285] text-sm mt-3 mb-2">
              Architectures exhibiting strain hardening:
            </p>
            <ul className="text-[#3d6285] text-sm list-disc list-inside space-y-1">
              <li>Long-chain branched polymers (LDPE: SHF up to 10–30)</li>
              <li>Sparsely branched metallocene PE (H-shaped, pom-pom)</li>
              <li>Broad MWD polymers (high-MW tail effect)</li>
              <li>Chain-extended recycled PET (Joncryl)</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 mb-8">
          <h4 className="font-bold text-[#0B2545] mb-4">
            Advanced Extensional Techniques
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-[#134074] font-semibold text-sm mb-2">SER Fixture</h5>
              <p className="text-[#3d6285] text-xs">
                The Sentmanat Extensional Rheometer (2004) uses counter-rotating drums
                for true uniaxial extension on thin films. Attaches to any rotational
                rheometer. ε̇ range: 0.001–30 s⁻¹, max ε<sub>H</sub> ≈ 4. Democratized
                extensional rheometry for routine recycled resin characterization.
              </p>
            </div>
            <div>
              <h5 className="text-[#13315C] font-semibold text-sm mb-2">CaBER &amp; FiSER</h5>
              <p className="text-[#3d6285] text-xs">
                For solutions: CaBER monitors self-thinning filament to extract
                extensional relaxation time λ<sub>E</sub>. FiSER imposes constant ε̇.
                DoS (Dripping-on-Substrate) extends to ultra-low viscosity fluids
                (Dinic et al., <em>J. Non-Newtonian Fluid Mech.</em>, 2015).
              </p>
            </div>
          </div>
        </div>

        {/* Recycled Polymers & Extensional */}
        <div className="bg-[#EEF4ED] border border-[#134074]/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#0B2545]/8 text-[#0B2545] text-xs font-semibold">
              SPECIAL CASE
            </span>
            <h4 className="font-bold text-[#0B2545]">
              Extensional Rheology of Recycled Polymers
            </h4>
          </div>
          <p className="text-[#3d6285] text-sm mb-3">
            Recycled polymers typically show <strong className="text-[#0B2545]">reduced melt
            strength</strong> due to chain scission, LCB loss, and MWD narrowing.
          </p>
          <p className="text-[#3d6285] text-sm mb-2">
            <strong className="text-[#0B2545]">Remediation strategies:</strong>
          </p>
          <ul className="text-[#3d6285] text-sm list-disc list-inside space-y-1">
            <li>
              <strong className="text-[#0B2545]">Chain extenders for PET:</strong> Joncryl
              increases IV from 0.60 to 0.80+ dL/g (Awaja &amp; Pavel, 2005)
            </li>
            <li>
              <strong className="text-[#0B2545]">Peroxide-induced LCB for PP:</strong> 0.01–0.1
              wt% organic peroxide creates LCB during reactive extrusion
              (Lagendijk et al., 2001)
            </li>
            <li>
              <strong className="text-[#0B2545]">Blending:</strong> 20% LDPE in rPE restores
              film-blowing processability
            </li>
          </ul>
        </div>
      </SubSection>

      {/* Key References */}
      <div className="bg-white border border-[#c9d9e8] rounded-2xl p-6">
        <h4 className="font-bold text-[#0B2545] mb-3">Key References — Polymer Rheology</h4>
        <ul className="text-[#3d6285] text-sm space-y-2">
          <li>Ferry, J.D. (1980). <em>Viscoelastic Properties of Polymers</em>, 3rd ed. Wiley.</li>
          <li>Doi, M. &amp; Edwards, S.F. (1986). <em>The Theory of Polymer Dynamics.</em> Oxford.</li>
          <li>Dealy, J.M. &amp; Larson, R.G. (2006). <em>Structure and Rheology of Molten Polymers.</em> Hanser.</li>
          <li>Hyun, K. et al. (2011). A review of nonlinear oscillatory shear tests. <em>Prog. Polym. Sci.</em>, 36(12), 1697–1753.</li>
          <li>Münstedt, H. (2018). <em>Rheological Measurements with Commercial Rheometers.</em> Hanser.</li>
          <li>La Mantia, F.P. (Ed.) (2009). <em>Handbook of Plastics Recycling.</em> Rapra Technology.</li>
        </ul>
      </div>
    </SectionWrapper>
  );
}
