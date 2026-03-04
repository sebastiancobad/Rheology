import SectionWrapper from "./SectionWrapper";

export default function Applications() {
  return (
    <SectionWrapper
      id="applications"
      title="Industrial Applications"
      subtitle="Section 4 — Polymer Processing"
      accent="#8DA9C4"
    >
      <p className="text-[#3d6285] mb-10 max-w-3xl">
        Understanding polymer rheology is essential to optimizing processing
        conditions. Each manufacturing technique imposes specific flow fields
        (shear, extension, or combined) at particular rates and temperatures.
        The rheological response determines processability, product quality,
        and defect formation.
      </p>

      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {/* Extrusion */}
        <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-[#134074]/8 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#134074]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </div>
          <h4 className="font-bold text-[#0B2545] text-lg mb-3">Extrusion</h4>
          <p className="text-[#3d6285] text-sm mb-4 flex-grow">
            Polymer is melted, homogenized by a rotating screw, and forced
            through a die. Involves predominantly{" "}
            <strong className="text-[#0B2545]">shear flow</strong> inside the
            barrel and combined shear + extension at the die exit. Twin-screw
            extruders add distributive and dispersive mixing — essential for
            recycled polymer compounding with compatibilizers and fillers.
          </p>
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-[#dde8d8] p-3">
              <h5 className="text-[#134074] text-xs font-semibold mb-1">
                Key Rheological Parameters
              </h5>
              <ul className="text-[#3d6285] text-xs space-y-1 list-disc list-inside">
                <li>η(γ̇) at 10²–10³ s⁻¹ (Carreau-Yasuda or Cross model)</li>
                <li>Die swell (B = D<sub>ext</sub>/D<sub>die</sub>), related to N₁</li>
                <li>Melt fracture onset: sharkskin (~0.1 MPa) and gross (~0.3 MPa)</li>
                <li>Specific mechanical energy (SME) for twin-screw compounding</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-[#dde8d8] p-3">
              <h5 className="text-[#134074] text-xs font-semibold mb-1">
                Defects &amp; Root Causes
              </h5>
              <ul className="text-[#3d6285] text-xs space-y-1 list-disc list-inside">
                <li>
                  <strong className="text-[#0B2545]">Sharkskin:</strong> Extensional stress
                  at die exit. Remediation: slip agents, die coating (Hatzikiriakos, 2012)
                </li>
                <li>
                  <strong className="text-[#0B2545]">Die swell:</strong> B = 1.1–1.5 for HDPE,
                  up to 2.0+ for LDPE
                </li>
                <li>
                  <strong className="text-[#0B2545]">Melt fracture:</strong> Gross distortion
                  above critical τ<sub>w</sub>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Injection Molding */}
        <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-[#13315C]/8 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#13315C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h4 className="font-bold text-[#0B2545] text-lg mb-3">Injection Molding</h4>
          <p className="text-[#3d6285] text-sm mb-4 flex-grow">
            Molten polymer is injected at high pressure (50–200 MPa) into a closed
            mold. Extremely high shear rates (10³–10⁵ s⁻¹) during filling, followed
            by packing and cooling. Fountain flow creates skin-core morphology.
          </p>
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-[#dde8d8] p-3">
              <h5 className="text-[#13315C] text-xs font-semibold mb-1">
                Key Rheological Parameters
              </h5>
              <ul className="text-[#3d6285] text-xs space-y-1 list-disc list-inside">
                <li>η(γ̇, T, P) — Cross-WLF model for Moldflow/Sigmasoft</li>
                <li>pvT data (specific volume vs. pressure &amp; temperature)</li>
                <li>Flow-induced crystallization kinetics for iPP, PET</li>
                <li>No-flow temperature for gate freeze prediction</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-[#dde8d8] p-3">
              <h5 className="text-[#13315C] text-xs font-semibold mb-1">
                Simulation Requirements
              </h5>
              <ul className="text-[#3d6285] text-xs space-y-1 list-disc list-inside">
                <li>Cross-WLF: η = η₀(T)/[1 + (η₀γ̇/τ*)^(1−n)]</li>
                <li>Warpage requires viscoelastic constitutive models</li>
                <li>For recycled: update material DB with batch-specific data</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Blow Molding */}
        <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-[#0B2545]/8 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#0B2545]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0110 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h4 className="font-bold text-[#0B2545] text-lg mb-3">Blow Molding</h4>
          <p className="text-[#3d6285] text-sm mb-4 flex-grow">
            A parison is extruded and inflated. Subjected to{" "}
            <strong className="text-[#0B2545]">biaxial extension</strong> during inflation.
            For stretch blow molding (PET), the preform is biaxially stretched above
            T<sub>g</sub>, inducing strain-induced crystallization.
          </p>
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-[#dde8d8] p-3">
              <h5 className="text-[#0B2545] text-xs font-semibold mb-1">
                Key Rheological Parameters
              </h5>
              <ul className="text-[#3d6285] text-xs space-y-1 list-disc list-inside">
                <li>η<sub>E</sub>(ε̇) — extensional viscosity (SER, Rheotens)</li>
                <li>Melt strength (cN) and break stretch ratio</li>
                <li>Parison sag time</li>
                <li>Die swell for parison diameter prediction</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-[#dde8d8] p-3">
              <h5 className="text-[#0B2545] text-xs font-semibold mb-1">
                Strain Hardening Importance
              </h5>
              <p className="text-[#3d6285] text-xs">
                Creates <em>self-leveling</em>: thinner regions stiffen more.
                LDPE (LCB) achieves this naturally. Linear polymers need:
                peroxide modification, branched blending, or HMS-PP grades
                (electron beam irradiation).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Window Summary */}
      <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 mb-12">
        <h4 className="font-bold text-[#0B2545] mb-4">
          Typical Shear Rate Ranges in Polymer Processing
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[#c9d9e8]">
                <th className="px-4 py-2 text-[#0B2545] font-semibold">Process</th>
                <th className="px-4 py-2 text-[#0B2545] font-semibold">γ̇ (s⁻¹)</th>
                <th className="px-4 py-2 text-[#0B2545] font-semibold">Primary Flow</th>
                <th className="px-4 py-2 text-[#0B2545] font-semibold">Instrument</th>
                <th className="px-4 py-2 text-[#0B2545] font-semibold">Key Parameter</th>
              </tr>
            </thead>
            <tbody className="text-[#3d6285]">
              <tr className="border-b border-[#c9d9e8]">
                <td className="px-4 py-2">Compression Molding</td>
                <td className="px-4 py-2">1 – 10</td>
                <td className="px-4 py-2">Squeezing</td>
                <td className="px-4 py-2">Rotational</td>
                <td className="px-4 py-2">η₀, creep compliance</td>
              </tr>
              <tr className="border-b border-[#c9d9e8]">
                <td className="px-4 py-2">Extrusion</td>
                <td className="px-4 py-2">10² – 10³</td>
                <td className="px-4 py-2">Shear + Extension</td>
                <td className="px-4 py-2">Capillary</td>
                <td className="px-4 py-2">η(γ̇), die swell, N₁</td>
              </tr>
              <tr className="border-b border-[#c9d9e8]">
                <td className="px-4 py-2">Injection Molding</td>
                <td className="px-4 py-2">10³ – 10⁵</td>
                <td className="px-4 py-2">Shear (dominant)</td>
                <td className="px-4 py-2">HP Capillary</td>
                <td className="px-4 py-2">η(γ̇,T,P), pvT</td>
              </tr>
              <tr className="border-b border-[#c9d9e8]">
                <td className="px-4 py-2">Blow Molding</td>
                <td className="px-4 py-2">10¹ – 10²</td>
                <td className="px-4 py-2">Biaxial extension</td>
                <td className="px-4 py-2">SER, Rheotens</td>
                <td className="px-4 py-2">η<sub>E</sub>, melt strength</td>
              </tr>
              <tr className="border-b border-[#c9d9e8]">
                <td className="px-4 py-2">Fiber Spinning</td>
                <td className="px-4 py-2">10² – 10⁴</td>
                <td className="px-4 py-2">Uniaxial extension</td>
                <td className="px-4 py-2">CaBER, FiSER</td>
                <td className="px-4 py-2">η<sub>E</sub>, spinnability</td>
              </tr>
              <tr className="border-b border-[#c9d9e8]">
                <td className="px-4 py-2">3D Printing (FDM)</td>
                <td className="px-4 py-2">10² – 10⁴</td>
                <td className="px-4 py-2">Shear + Extension</td>
                <td className="px-4 py-2">Capillary + SER</td>
                <td className="px-4 py-2">η(γ̇), die swell</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Calendering</td>
                <td className="px-4 py-2">10¹ – 10²</td>
                <td className="px-4 py-2">Shear + Squeezing</td>
                <td className="px-4 py-2">Rotational + Capillary</td>
                <td className="px-4 py-2">η(γ̇), yield stress</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recycled Plastics in Processing */}
      <h3 className="text-2xl font-bold text-[#0B2545] mb-6">
        Processing Recycled Polymers — Rheological Challenges
      </h3>

      <div className="bg-[#EEF4ED] border border-[#0B2545]/10 rounded-2xl p-6 mb-8">
        <p className="text-[#3d6285] text-sm mb-6">
          Recycled polymers present unique processing challenges from batch-to-batch
          variability, degradation history, and contamination:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#e4ede3] rounded-xl p-4">
            <h5 className="text-[#0B2545] font-semibold text-sm mb-2">
              Post-Consumer rPET (Bottle-to-Bottle)
            </h5>
            <p className="text-[#3d6285] text-xs mb-2">
              IV drops from 0.80 to 0.60–0.65 dL/g per pass (~30% M<sub>w</sub>{" "}
              reduction, ~60% η₀ reduction).
            </p>
            <p className="text-[#3d6285] text-xs">
              <strong className="text-[#0B2545]">Solutions:</strong> SSP at 200–220°C
              recovers IV. Chain extenders (Joncryl, 0.3–0.5 wt%) restore IV during
              reactive extrusion but introduce branching. Co-injection with virgin PET
              is standard in beverage industry (Awaja &amp; Pavel, 2005).
            </p>
          </div>

          <div className="bg-[#e4ede3] rounded-xl p-4">
            <h5 className="text-[#134074] font-semibold text-sm mb-2">
              Mixed Polyolefin Waste (rPE/rPP)
            </h5>
            <p className="text-[#3d6285] text-xs mb-2">
              Even 5% PE in PP creates immiscible blends with interfacial relaxation
              visible as a shoulder in G&apos; at low ω. Variable MFI batch-to-batch
              (σ up to ±30%).
            </p>
            <p className="text-[#3d6285] text-xs">
              <strong className="text-[#0B2545]">Solutions:</strong> SEBS or EPR
              compatibilizers at 3–8 wt%. Rheological monitoring of G&apos;(ω) at
              ω &lt; 1 rad/s gives rapid morphology feedback without EM
              (Utracki &amp; Wilkie, 2014).
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#e4ede3] rounded-xl p-4">
            <h5 className="text-[#13315C] font-semibold text-sm mb-2">
              Recycled PA6/PA66 (Automotive)
            </h5>
            <p className="text-[#3d6285] text-xs">
              GF-reinforced PA from automotive shredder: fiber attrition
              (L<sub>avg</sub> 300→100 μm in 3 passes), hydrolysis-induced η₀ reduction,
              thixotropy from fiber networks at &gt;20 wt% GF. Pre-drying to &lt;0.1%
              moisture essential; chain extension with diisocyanates.
            </p>
          </div>

          <div className="bg-[#e4ede3] rounded-xl p-4">
            <h5 className="text-[#134074] font-semibold text-sm mb-2">
              Chemical Recycling (Pyrolysis Waxes)
            </h5>
            <p className="text-[#3d6285] text-xs">
              Pyrolysis of mixed plastic waste produces waxes (broad MWD, PDI = 5–20)
              that act as plasticizers. Heteroatom contamination (N, S, Cl) catalyzes
              further degradation.{" "}
              <strong className="text-[#8DA9C4]">Literature gap:</strong> Rheological
              characterization of wax–polymer blends is sparse (Ragaert et al., 2017).
            </p>
          </div>
        </div>
      </div>

      {/* 3D Printing */}
      <div className="bg-[#EEF4ED] border border-[#c9d9e8] rounded-2xl p-6 mb-8">
        <h4 className="font-bold text-[#0B2545] mb-4">
          Emerging: 3D Printing &amp; Additive Manufacturing
        </h4>
        <p className="text-[#3d6285] text-sm mb-4">
          FDM/FFF is a shear + extension process where rheology governs printability.
          Filament is sheared through a nozzle (γ̇ ≈ 10²–10⁴ s⁻¹), then deposited
          as a bead that must fuse via reptation-driven welding:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-[#dde8d8] p-3">
            <h5 className="text-[#134074] text-xs font-semibold mb-1">Printability Window</h5>
            <p className="text-[#3d6285] text-xs">
              η(γ̇<sub>nozzle</sub>) &lt; 10³ Pa·s for extrusion, but η₀ high
              enough for shape retention. High tan(δ) → poor shape retention.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#dde8d8] p-3">
            <h5 className="text-[#13315C] text-xs font-semibold mb-1">Layer Welding</h5>
            <p className="text-[#3d6285] text-xs">
              Interlayer bond depends on reptation across the interface at T &gt; T<sub>g</sub>.
              Welding time t<sub>w</sub> ∝ η₀ · T — higher MW → stronger welds
              but slower welding (Mackay, <em>J. Rheol.</em>, 2018).
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#dde8d8] p-3">
            <h5 className="text-[#0B2545] text-xs font-semibold mb-1">Recycled Filaments</h5>
            <p className="text-[#3d6285] text-xs">
              rPET, rPLA, rABS, rPP filaments available commercially. Lower η₀ →
              poor shape retention; faster crystallization → warping. Rheological QC
              essential for consistent print quality.
            </p>
          </div>
        </div>
      </div>

      {/* References */}
      <div className="bg-white border border-[#c9d9e8] rounded-2xl p-6">
        <h4 className="font-bold text-[#0B2545] mb-3">Key References — Processing</h4>
        <ul className="text-[#3d6285] text-sm space-y-2">
          <li>Tadmor, Z. &amp; Gogos, C.G. (2006). <em>Principles of Polymer Processing.</em> 2nd ed. Wiley.</li>
          <li>Osswald, T.A. &amp; Hernandez-Ortiz, J.P. (2006). <em>Polymer Processing: Modeling and Simulation.</em> Hanser.</li>
          <li>Hatzikiriakos, S.G. (2012). Wall slip of molten polymers. <em>Prog. Polym. Sci.</em>, 37(4), 624–643.</li>
          <li>Ragaert, K. et al. (2017). Mechanical and chemical recycling. <em>Waste Management</em>, 69, 24–58.</li>
          <li>Mackay, M.E. (2018). Rheological behavior in additive manufacturing. <em>J. Rheol.</em>, 62(6), 1549–1561.</li>
        </ul>
      </div>
    </SectionWrapper>
  );
}
