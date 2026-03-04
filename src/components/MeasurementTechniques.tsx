import SectionWrapper from "./SectionWrapper";

export default function MeasurementTechniques() {
  return (
    <SectionWrapper
      id="measurement"
      title="Measurement Techniques & Rheometry"
      subtitle="Section 3 — Instrumentation"
      accent="#34d399"
    >
      {/* Rotational Rheometers */}
      <h3 className="text-2xl font-bold text-[#f1f5f9] mb-6">
        Rotational Rheometers
      </h3>
      <p className="text-[#94a3b8] mb-6 max-w-3xl">
        Rotational rheometers apply controlled stress or controlled strain
        (rate) and measure the response. They are the workhorse of polymer
        rheology laboratories, enabling steady shear, oscillatory, creep, and
        stress relaxation measurements.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <h4 className="font-bold text-[#38bdf8] mb-3">
            Cone &amp; Plate Geometry
          </h4>
          <div className="bg-[#0f172a] rounded-xl p-4 mb-4 font-mono text-sm text-center text-[#94a3b8]">
            <pre>{`       ╱ cone (angle α)
      ╱─────────────╲
     ╱    sample      ╲
    ═══════════════════════
         plate (fixed)`}</pre>
          </div>
          <p className="text-[#94a3b8] text-sm mb-3">
            The cone angle <span className="math">α</span> is typically 1–4°.
            The key advantage is a{" "}
            <strong className="text-[#e2e8f0]">
              uniform shear rate
            </strong>{" "}
            throughout the gap:
          </p>
          <div className="math-block text-sm">
            <span className="math">γ̇</span> = <span className="math">Ω</span> / tan(<span className="math">α</span>) ≈ <span className="math">Ω</span> / <span className="math">α</span>
          </div>
          <p className="text-[#94a3b8] text-xs mt-3">
            Limitation: Cannot accommodate samples with large particles
            (particle size must be &lt;&lt; gap at the truncation).
          </p>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <h4 className="font-bold text-[#a78bfa] mb-3">
            Parallel Plate Geometry
          </h4>
          <div className="bg-[#0f172a] rounded-xl p-4 mb-4 font-mono text-sm text-center text-[#94a3b8]">
            <pre>{`    ═══════════════════════
         upper plate (Ω)
    ─ ─ ─  sample (gap h) ─ ─
         lower plate (fixed)
    ═══════════════════════`}</pre>
          </div>
          <p className="text-[#94a3b8] text-sm mb-3">
            The shear rate varies linearly from zero at the center to a
            maximum at the rim:
          </p>
          <div className="math-block text-sm">
            <span className="math">γ̇</span>(<span className="math">r</span>) = <span className="math">Ω</span> · <span className="math">r</span> / <span className="math">h</span>
          </div>
          <p className="text-[#94a3b8] text-xs mt-3">
            Advantages: adjustable gap (useful for filled systems, cross-linking
            studies); easier sample loading. Requires rim correction for
            non-Newtonian fluids.
          </p>
        </div>
      </div>

      {/* Capillary Rheometers */}
      <h3 className="text-2xl font-bold text-[#f1f5f9] mb-6">
        Capillary Rheometers
      </h3>
      <p className="text-[#94a3b8] mb-6 max-w-3xl">
        Capillary rheometers force a polymer melt through a die of known
        dimensions at controlled piston speed, measuring the resulting pressure
        drop. They access high shear rates (10¹–10⁵ s⁻¹) relevant to
        processing.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <h4 className="font-bold text-[#34d399] mb-3">
            Bagley Correction
          </h4>
          <p className="text-[#94a3b8] text-sm mb-3">
            Corrects for the <strong className="text-[#e2e8f0]">entrance
            pressure drop</strong> (Bagley end correction). The true wall shear
            stress is obtained by extrapolating ΔP to zero L/D:
          </p>
          <div className="math-block text-sm">
            <span className="math">τ</span>
            <sub>w</sub> = ΔP / [2(L/R + <span className="math">e</span>
            <sub>B</sub>)]
          </div>
          <p className="text-[#94a3b8] text-xs mt-3">
            where <span className="math">e</span>
            <sub>B</sub> is the Bagley correction factor, determined by
            measuring pressure drop at multiple L/D ratios (typically using
            dies with L/D = 0, 5, 10, 20, 30).
          </p>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <h4 className="font-bold text-[#f472b6] mb-3">
            Rabinowitsch Correction
          </h4>
          <p className="text-[#94a3b8] text-sm mb-3">
            Corrects the apparent wall shear rate for{" "}
            <strong className="text-[#e2e8f0]">non-parabolic velocity
            profiles</strong> (non-Newtonian flow):
          </p>
          <div className="math-block text-sm">
            <span className="math">γ̇</span>
            <sub>w,true</sub> = <span className="math">γ̇</span>
            <sub>a</sub> · (3n&apos; + 1) / 4n&apos;
          </div>
          <p className="text-[#94a3b8] text-xs mt-3">
            where <span className="math">γ̇</span>
            <sub>a</sub> = 4Q/(πR³) is the apparent (Newtonian) wall shear
            rate and n&apos; = d(log τ<sub>w</sub>)/d(log γ̇<sub>a</sub>) is the local
            power-law index.
          </p>
        </div>
      </div>

      {/* MFI vs DMA */}
      <h3 className="text-2xl font-bold text-[#f1f5f9] mb-6">
        Melt Flow Index (MFI) vs. Dynamic Mechanical Analysis (DMA)
      </h3>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-[#334155]">
              <th className="px-4 py-3 text-[#f1f5f9] font-semibold">
                Parameter
              </th>
              <th className="px-4 py-3 text-[#38bdf8] font-semibold">
                Melt Flow Index (MFI)
              </th>
              <th className="px-4 py-3 text-[#a78bfa] font-semibold">
                Dynamic Mechanical Analysis (DMA)
              </th>
            </tr>
          </thead>
          <tbody className="text-[#94a3b8]">
            <tr className="border-b border-[#334155]/50">
              <td className="px-4 py-3 font-medium text-[#e2e8f0]">
                Standard
              </td>
              <td className="px-4 py-3">ASTM D1238 / ISO 1133</td>
              <td className="px-4 py-3">ASTM D4065 / ISO 6721</td>
            </tr>
            <tr className="border-b border-[#334155]/50">
              <td className="px-4 py-3 font-medium text-[#e2e8f0]">
                Measurement
              </td>
              <td className="px-4 py-3">
                Mass flow through a die under a fixed load (g/10 min)
              </td>
              <td className="px-4 py-3">
                G&apos;, G&apos;&apos;, tan(δ) as functions of T, ω, or strain
              </td>
            </tr>
            <tr className="border-b border-[#334155]/50">
              <td className="px-4 py-3 font-medium text-[#e2e8f0]">
                Shear rate
              </td>
              <td className="px-4 py-3">Single, low (~1–10 s⁻¹)</td>
              <td className="px-4 py-3">
                Frequency-dependent (0.01–100 rad/s typical)
              </td>
            </tr>
            <tr className="border-b border-[#334155]/50">
              <td className="px-4 py-3 font-medium text-[#e2e8f0]">
                Information
              </td>
              <td className="px-4 py-3">
                Single-point fluidity index; QC tool
              </td>
              <td className="px-4 py-3">
                Full viscoelastic characterization; T<sub>g</sub>, relaxation
                spectrum
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-[#e2e8f0]">
                Limitation
              </td>
              <td className="px-4 py-3">
                Cannot distinguish MW from MWD effects; single shear rate
              </td>
              <td className="px-4 py-3">
                Limited to small strains (LVE); lower shear rates than
                processing
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-[#0f172a] border border-[#334155] rounded-2xl p-6">
        <h4 className="font-bold text-[#f1f5f9] mb-3">Key Insight</h4>
        <p className="text-[#94a3b8] text-sm">
          MFI is widely used in industry for quality control and material
          specification because of its simplicity and low cost. However, it
          provides a <em>single-point</em> characterization that cannot
          distinguish between changes in molecular weight vs. molecular weight
          distribution. DMA and oscillatory rheometry provide orders of magnitude
          more information — full frequency-dependent moduli, phase angles,
          relaxation spectra — making them essential for product development,
          troubleshooting, and structure-property relationships. Two polymers
          with identical MFI values can have vastly different processing behavior
          if their MWD or branching architectures differ.
        </p>
      </div>
    </SectionWrapper>
  );
}
