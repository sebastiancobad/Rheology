import SectionWrapper from "./SectionWrapper";

export default function Applications() {
  return (
    <SectionWrapper
      id="applications"
      title="Industrial Applications"
      subtitle="Section 4 — Polymer Processing"
      accent="#f59e0b"
    >
      <p className="text-[#94a3b8] mb-10 max-w-3xl">
        Understanding polymer rheology is essential to optimizing processing
        conditions. Each manufacturing technique imposes specific flow fields
        (shear, extension, or combined) at particular rates and temperatures.
        The rheological response determines processability, product quality,
        and defect formation.
      </p>

      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {/* Extrusion */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-[#38bdf8]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </div>
          <h4 className="font-bold text-[#f1f5f9] text-lg mb-3">Extrusion</h4>
          <p className="text-[#94a3b8] text-sm mb-4 flex-grow">
            Polymer is melted, homogenized by a rotating screw, and forced
            through a die to create continuous profiles (pipes, films, sheets,
            fibers). Extrusion involves predominantly{" "}
            <strong className="text-[#e2e8f0]">shear flow</strong> inside the
            barrel and a combination of shear and extension at the die exit.
          </p>
          <div className="space-y-3">
            <div className="bg-[#0f172a] rounded-xl p-3">
              <h5 className="text-[#38bdf8] text-xs font-semibold mb-1">
                Key Rheological Parameters
              </h5>
              <ul className="text-[#94a3b8] text-xs space-y-1 list-disc list-inside">
                <li>Shear viscosity η(γ̇) at processing shear rates (10²–10³ s⁻¹)</li>
                <li>Die swell (elastic recovery, related to N₁)</li>
                <li>Melt fracture (sharkskin, gross melt fracture)</li>
              </ul>
            </div>
            <div className="bg-[#0f172a] rounded-xl p-3">
              <h5 className="text-[#38bdf8] text-xs font-semibold mb-1">
                Common Defects
              </h5>
              <ul className="text-[#94a3b8] text-xs space-y-1 list-disc list-inside">
                <li>
                  <strong className="text-[#e2e8f0]">Sharkskin:</strong> Surface
                  roughness from high extensional stress at die exit
                </li>
                <li>
                  <strong className="text-[#e2e8f0]">Die swell:</strong>{" "}
                  Extrudate diameter &gt; die diameter due to elastic recovery
                </li>
                <li>
                  <strong className="text-[#e2e8f0]">Melt fracture:</strong>{" "}
                  Gross distortion above a critical wall shear stress
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Injection Molding */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-[#a78bfa]/10 flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-[#a78bfa]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h4 className="font-bold text-[#f1f5f9] text-lg mb-3">
            Injection Molding
          </h4>
          <p className="text-[#94a3b8] text-sm mb-4 flex-grow">
            Molten polymer is injected at high pressure into a closed mold
            cavity. The process involves extremely high shear rates during
            filling (10³–10⁵ s⁻¹), followed by packing under pressure and
            cooling. Fountain flow at the melt front introduces extensional
            deformation.
          </p>
          <div className="space-y-3">
            <div className="bg-[#0f172a] rounded-xl p-3">
              <h5 className="text-[#a78bfa] text-xs font-semibold mb-1">
                Key Rheological Parameters
              </h5>
              <ul className="text-[#94a3b8] text-xs space-y-1 list-disc list-inside">
                <li>Viscosity at high shear rates (capillary data)</li>
                <li>Pressure-dependent viscosity (Barus equation)</li>
                <li>Crystallization kinetics under flow (for semi-crystalline)</li>
              </ul>
            </div>
            <div className="bg-[#0f172a] rounded-xl p-3">
              <h5 className="text-[#a78bfa] text-xs font-semibold mb-1">
                Process–Rheology Connection
              </h5>
              <ul className="text-[#94a3b8] text-xs space-y-1 list-disc list-inside">
                <li>Fill time determined by η(γ̇, T, P)</li>
                <li>Residual stresses from frozen-in orientation</li>
                <li>Weld lines from flow front meeting</li>
                <li>Short shots if viscosity too high</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Blow Molding */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-[#34d399]/10 flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-[#34d399]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 0110 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h4 className="font-bold text-[#f1f5f9] text-lg mb-3">
            Blow Molding
          </h4>
          <p className="text-[#94a3b8] text-sm mb-4 flex-grow">
            A parison (hollow tube) is extruded and inflated with air pressure
            inside a mold cavity. The parison is subjected to{" "}
            <strong className="text-[#e2e8f0]">biaxial extension</strong> during
            inflation. Melt strength is the critical rheological property
            that determines sag resistance and uniform wall thickness.
          </p>
          <div className="space-y-3">
            <div className="bg-[#0f172a] rounded-xl p-3">
              <h5 className="text-[#34d399] text-xs font-semibold mb-1">
                Key Rheological Parameters
              </h5>
              <ul className="text-[#94a3b8] text-xs space-y-1 list-disc list-inside">
                <li>Extensional viscosity η<sub>E</sub>(ε̇)</li>
                <li>Melt strength and strain hardening</li>
                <li>Die swell (parison diameter prediction)</li>
              </ul>
            </div>
            <div className="bg-[#0f172a] rounded-xl p-3">
              <h5 className="text-[#34d399] text-xs font-semibold mb-1">
                Why Strain Hardening Matters
              </h5>
              <p className="text-[#94a3b8] text-xs">
                Polymers with strain hardening (e.g., LDPE with long-chain
                branching) self-regulate wall thickness — thinner regions
                experience higher stress, stiffen more, and resist further
                thinning. Linear polymers (HDPE, PP) without strain hardening
                require process modifications or blending to achieve uniform
                thickness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Window Summary */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
        <h4 className="font-bold text-[#f1f5f9] mb-4">
          Typical Shear Rate Ranges in Polymer Processing
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="px-4 py-2 text-[#f1f5f9] font-semibold">
                  Process
                </th>
                <th className="px-4 py-2 text-[#f1f5f9] font-semibold">
                  Shear Rate Range (s⁻¹)
                </th>
                <th className="px-4 py-2 text-[#f1f5f9] font-semibold">
                  Primary Flow Type
                </th>
                <th className="px-4 py-2 text-[#f1f5f9] font-semibold">
                  Key Instrument
                </th>
              </tr>
            </thead>
            <tbody className="text-[#94a3b8]">
              <tr className="border-b border-[#334155]/50">
                <td className="px-4 py-2">Compression Molding</td>
                <td className="px-4 py-2">1 – 10</td>
                <td className="px-4 py-2">Squeezing</td>
                <td className="px-4 py-2">Rotational rheometer</td>
              </tr>
              <tr className="border-b border-[#334155]/50">
                <td className="px-4 py-2">Extrusion</td>
                <td className="px-4 py-2">10² – 10³</td>
                <td className="px-4 py-2">Shear + Extension</td>
                <td className="px-4 py-2">Capillary rheometer</td>
              </tr>
              <tr className="border-b border-[#334155]/50">
                <td className="px-4 py-2">Injection Molding</td>
                <td className="px-4 py-2">10³ – 10⁵</td>
                <td className="px-4 py-2">Shear (dominant)</td>
                <td className="px-4 py-2">High-pressure capillary</td>
              </tr>
              <tr className="border-b border-[#334155]/50">
                <td className="px-4 py-2">Blow Molding</td>
                <td className="px-4 py-2">10¹ – 10²</td>
                <td className="px-4 py-2">Biaxial extension</td>
                <td className="px-4 py-2">Extensional rheometer</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Fiber Spinning</td>
                <td className="px-4 py-2">10² – 10⁴</td>
                <td className="px-4 py-2">Uniaxial extension</td>
                <td className="px-4 py-2">Extensional rheometer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SectionWrapper>
  );
}
