import SectionWrapper from "./SectionWrapper";

export default function MeasurementTechniques() {
  return (
    <SectionWrapper
      id="measurement"
      title="Measurement Techniques & Rheometry"
      subtitle="Section 3 — Instrumentation"
      accent="#0d9488"
    >
      {/* Rotational Rheometers */}
      <h3 className="text-2xl font-bold text-[#18181b] mb-6">
        Rotational Rheometers
      </h3>
      <p className="text-[#6b7280] mb-6 max-w-3xl">
        Rotational rheometers apply controlled stress (CS) or controlled strain
        rate (CR) and measure the response. Modern instruments (e.g., TA DHR,
        Anton Paar MCR, Malvern Kinexus) combine both modes and offer torque
        resolution down to ~0.1 nN·m, enabling measurement of ultra-low
        viscosity fluids and highly elastic gels.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6">
          <h4 className="font-bold text-[#4f46e5] mb-3">
            Cone &amp; Plate Geometry
          </h4>
          <div className="bg-white rounded-xl border border-[#f0f0f2] p-4 mb-4 font-mono text-sm text-center text-[#6b7280]">
            <pre>{`       ╱ cone (angle α)
      ╱─────────────╲
     ╱    sample      ╲
    ═══════════════════════
         plate (fixed)`}</pre>
          </div>
          <p className="text-[#6b7280] text-sm mb-3">
            The cone angle <span className="math">α</span> is typically 0.5–4°
            (smaller for higher viscosity). The key advantage is a{" "}
            <strong className="text-[#18181b]">
              uniform shear rate
            </strong>{" "}
            throughout the gap:
          </p>
          <div className="math-block text-sm">
            <span className="math">γ̇</span> = <span className="math">Ω</span> / tan(<span className="math">α</span>) ≈ <span className="math">Ω</span> / <span className="math">α</span>
          </div>
          <div className="math-block text-sm mt-2">
            <span className="math">τ</span> = 3M / (2πR³)
          </div>
          <p className="text-[#6b7280] text-xs mt-3 mb-2">
            <strong className="text-[#18181b]">Advantages:</strong>
          </p>
          <ul className="text-[#6b7280] text-xs list-disc list-inside space-y-1">
            <li>Uniform shear rate → true material function without corrections</li>
            <li>Small sample volume (~0.5–2 mL)</li>
            <li>Direct measurement of N₁ from normal force</li>
          </ul>
          <p className="text-[#6b7280] text-xs mt-2 mb-1">
            <strong className="text-[#18181b]">Limitations:</strong>
          </p>
          <ul className="text-[#6b7280] text-xs list-disc list-inside space-y-1">
            <li>Particle size must be ≪ gap at truncation (~50 μm for 1° cone)</li>
            <li>Edge fracture at high shear rates in elastic melts</li>
            <li>Not suitable for filled systems, fiber-reinforced recycled compounds</li>
          </ul>
        </div>

        <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6">
          <h4 className="font-bold text-[#7c3aed] mb-3">
            Parallel Plate Geometry
          </h4>
          <div className="bg-white rounded-xl border border-[#f0f0f2] p-4 mb-4 font-mono text-sm text-center text-[#6b7280]">
            <pre>{`    ═══════════════════════
         upper plate (Ω)
    ─ ─ ─  sample (gap h) ─ ─
         lower plate (fixed)
    ═══════════════════════`}</pre>
          </div>
          <p className="text-[#6b7280] text-sm mb-3">
            The shear rate varies linearly from zero at the center to a
            maximum at the rim:
          </p>
          <div className="math-block text-sm">
            <span className="math">γ̇</span>(<span className="math">r</span>) = <span className="math">Ω</span> · <span className="math">r</span> / <span className="math">h</span>
          </div>
          <div className="math-block text-sm mt-2">
            <span className="math">τ</span><sub>R</sub> = (2M/πR³)[1 + (1/3) d(ln M)/d(ln γ̇<sub>R</sub>)]
          </div>
          <p className="text-[#6b7280] text-xs mt-3 mb-2">
            <strong className="text-[#18181b]">Advantages:</strong>
          </p>
          <ul className="text-[#6b7280] text-xs list-disc list-inside space-y-1">
            <li>Adjustable gap → accommodates filled systems, recycled compounds with particles</li>
            <li>Easy sample loading for disk-shaped specimens</li>
            <li>Temperature sweeps with crosslinking/curing studies</li>
            <li>Gap-dependent measurements to check for wall slip</li>
          </ul>
          <p className="text-[#6b7280] text-xs mt-2 mb-1">
            <strong className="text-[#18181b]">Limitations:</strong>
          </p>
          <ul className="text-[#6b7280] text-xs list-disc list-inside space-y-1">
            <li>Non-uniform shear rate requires correction (Mooney-Rabinowitsch for PP)</li>
            <li>N₁ measurement requires differentiation of F<sub>N</sub>(γ̇<sub>R</sub>)</li>
          </ul>
        </div>
      </div>

      {/* Additional Geometries */}
      <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6 mb-12">
        <h4 className="font-bold text-[#18181b] mb-4">Other Geometries &amp; Special Configurations</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h5 className="text-[#0d9488] font-semibold text-sm mb-2">Concentric Cylinders (Couette)</h5>
            <p className="text-[#6b7280] text-xs">
              Inner cylinder (bob) rotates within an outer cup. Excellent for low-viscosity
              fluids and suspensions. The <strong className="text-[#18181b]">double-gap</strong>{" "}
              variant increases sensitivity for low-viscosity samples. Used for recycled
              polymer solutions and latexes where cone-plate would be insufficient.
            </p>
            <div className="math-block text-xs mt-2">
              γ̇ = 2ΩR<sub>i</sub>² / (R<sub>o</sub>² − R<sub>i</sub>²)
            </div>
          </div>
          <div>
            <h5 className="text-[#9333ea] font-semibold text-sm mb-2">Vane Geometry</h5>
            <p className="text-[#6b7280] text-xs">
              A multi-bladed vane rotates within the sample, minimizing wall slip.
              Essential for yield stress measurements (Barnes &amp; Nguyen, 2001).
              Used extensively for recycled polymer pastes, highly filled compounds
              (&gt;50 vol% filler), and 3D printing feedstocks where slip at smooth
              walls makes cone-plate measurements unreliable.
            </p>
          </div>
          <div>
            <h5 className="text-[#d97706] font-semibold text-sm mb-2">Closed-Cavity Rheometers</h5>
            <p className="text-[#6b7280] text-xs">
              RPA (Rubber Process Analyzer, Alpha Technologies) and MDR (Moving Die
              Rheometer) use a sealed, biconical cavity under pressure. No material
              loss at high strains/temperatures. Essential for rubber compound
              characterization and increasingly used for recycled rubber-polymer
              blends. Measures G&apos;, G&apos;&apos; during vulcanization in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Capillary Rheometers */}
      <h3 className="text-2xl font-bold text-[#18181b] mb-6">
        Capillary Rheometers
      </h3>
      <p className="text-[#6b7280] mb-6 max-w-3xl">
        Capillary rheometers force a polymer melt through a die of known
        dimensions at controlled piston speed, measuring the resulting pressure
        drop. They access high shear rates (10¹–10⁵ s⁻¹) directly relevant to
        processing conditions. Two essential corrections are needed for
        accurate data.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6">
          <h4 className="font-bold text-[#0d9488] mb-3">
            Bagley Correction
          </h4>
          <p className="text-[#6b7280] text-sm mb-3">
            Corrects for the <strong className="text-[#18181b]">entrance
            pressure drop</strong> (ΔP<sub>ent</sub>) caused by extensional and
            secondary flows at the die entry. Methodology:
          </p>
          <ol className="text-[#6b7280] text-xs list-decimal list-inside space-y-1 mb-3">
            <li>Measure ΔP at several L/D ratios (typically 0, 5, 10, 20, 30) at
              the same apparent γ̇</li>
            <li>Plot ΔP vs. L/D → extrapolate to L/D = 0</li>
            <li>The intercept gives ΔP<sub>ent</sub>; the Bagley correction e<sub>B</sub>{" "}
              is the negative x-intercept</li>
          </ol>
          <div className="math-block text-sm">
            τ<sub>w</sub> = (ΔP − ΔP<sub>ent</sub>) · R / (2L)<br />
            = ΔP / [2(L/R + e<sub>B</sub>)]
          </div>
          <p className="text-[#6b7280] text-xs mt-3">
            For materials with high elasticity (high N₁), the entrance pressure
            drop can be 30–60% of the total ΔP, making the correction critical.
            Recycled polymers with gel particles often show anomalous Bagley plots
            (non-linear ΔP vs. L/D) due to die blockage or filter effects.
          </p>
        </div>

        <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6">
          <h4 className="font-bold text-[#9333ea] mb-3">
            Rabinowitsch (Weissenberg-Rabinowitsch) Correction
          </h4>
          <p className="text-[#6b7280] text-sm mb-3">
            Corrects the apparent wall shear rate for{" "}
            <strong className="text-[#18181b]">non-parabolic velocity
            profiles</strong> (non-Newtonian flow). For a shear-thinning fluid,
            the velocity profile is more plug-like, and the true wall shear rate
            is <em>higher</em> than the apparent value:
          </p>
          <div className="math-block text-sm">
            γ̇<sub>w,true</sub> = γ̇<sub>a</sub> · (3n&apos; + 1) / (4n&apos;)
          </div>
          <p className="text-[#6b7280] text-xs mt-3 mb-2">
            where γ̇<sub>a</sub> = 4Q/(πR³) is the apparent (Newtonian) wall shear
            rate and:
          </p>
          <div className="math-block text-xs">
            n&apos; = d(log τ<sub>w</sub>) / d(log γ̇<sub>a</sub>)
          </div>
          <p className="text-[#6b7280] text-xs mt-3">
            n&apos; is the local slope of the log τ<sub>w</sub> – log γ̇<sub>a</sub> curve
            (not the power-law index n, though they are equal for a true power-law
            fluid). For strongly shear-thinning polymers (n&apos; ≈ 0.3), the correction
            factor (3n&apos;+1)/(4n&apos;) ≈ 1.58 — a 58% increase in the true wall shear rate.
          </p>
        </div>
      </div>

      {/* Additional Capillary Topics */}
      <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6 mb-12">
        <h4 className="font-bold text-[#18181b] mb-4">Advanced Capillary Rheometry</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h5 className="text-[#4f46e5] font-semibold text-sm mb-2">Wall Slip Detection</h5>
            <p className="text-[#6b7280] text-xs">
              <strong className="text-[#18181b]">Mooney analysis:</strong> measure apparent
              flow curves with multiple die radii at constant L/D. If curves overlap,
              no slip; if they diverge, wall slip is present. The slip velocity
              v<sub>s</sub> = (γ̇<sub>a,R1</sub> − γ̇<sub>a,R2</sub>) · R₁R₂ / (R₁ − R₂).
              Wall slip is common in filled recycled compounds and PVC, and can cause
              overestimation of viscosity by 10–50%.
            </p>
          </div>
          <div>
            <h5 className="text-[#7c3aed] font-semibold text-sm mb-2">Pressure-Dependent Viscosity</h5>
            <p className="text-[#6b7280] text-xs">
              At high pressures (injection molding: 50–200 MPa), viscosity increases
              according to the Barus equation:
            </p>
            <div className="math-block text-xs mt-2">
              η(P) = η₀ · exp(β · P)
            </div>
            <p className="text-[#6b7280] text-xs mt-2">
              Typical pressure coefficient β: 10–40 GPa⁻¹ for polyolefins,
              30–60 GPa⁻¹ for PS, 15–30 GPa⁻¹ for PA. This is measured using
              counter-pressure capillary rheometers. Ignoring pressure effects
              leads to 20–50% viscosity errors at injection molding pressures.
            </p>
          </div>
          <div>
            <h5 className="text-[#0d9488] font-semibold text-sm mb-2">Entrance Flow Analysis (Cogswell)</h5>
            <p className="text-[#6b7280] text-xs">
              The Cogswell method (1972) extracts extensional viscosity from the
              entrance pressure drop ΔP<sub>ent</sub>:
            </p>
            <div className="math-block text-xs mt-2">
              η<sub>E</sub> ≈ 9(n+1)² ΔP<sub>ent</sub>² / [32η γ̇<sub>a</sub>²]
            </div>
            <p className="text-[#6b7280] text-xs mt-2">
              While approximate, this provides extensional viscosity data at high
              strain rates inaccessible to SER. Useful for characterizing recycled
              polymer processability when dedicated extensional equipment is unavailable.
            </p>
          </div>
        </div>
      </div>

      {/* Online/Inline Rheometry */}
      <h3 className="text-2xl font-bold text-[#18181b] mb-6">
        Online &amp; Inline Rheometry
      </h3>
      <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6 mb-12">
        <p className="text-[#6b7280] text-sm mb-4">
          For recycled polymer processing where batch-to-batch variability is high,
          real-time rheological monitoring is essential:
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h5 className="text-[#4f46e5] font-semibold text-sm mb-2">Slit-Die Rheometer</h5>
            <p className="text-[#6b7280] text-xs">
              Pressure transducers flush-mounted along a slit die measure ΔP at
              multiple positions, giving τ<sub>w</sub> directly during extrusion.
              Combined with flow rate measurement, provides real-time viscosity
              curves. Can detect contamination spikes and degradation trends in
              continuous recycling lines.
            </p>
          </div>
          <div>
            <h5 className="text-[#7c3aed] font-semibold text-sm mb-2">Ultrasonic Rheometry</h5>
            <p className="text-[#6b7280] text-xs">
              Non-invasive technique using ultrasonic wave propagation to measure
              G&apos; and G&apos;&apos; at MHz frequencies. The{" "}
              <strong className="text-[#18181b]">Resonic</strong> system and similar
              devices enable inline monitoring without contact. Limited to high-frequency
              regime (glassy behavior), but provides excellent sensitivity to phase
              composition changes in polymer blends.
            </p>
          </div>
          <div>
            <h5 className="text-[#0d9488] font-semibold text-sm mb-2">In-Process Monitoring</h5>
            <p className="text-[#6b7280] text-xs">
              Emerging approaches include: (1) machine learning models linking extruder
              torque, pressure, and temperature to rheological properties
              (Abeykoon et al., <em>Polym. Eng. Sci.</em>, 2021), (2) inline NIR
              spectroscopy correlated with MFI for recycled PE/PP sorting, (3)
              digital twin models that predict output rheology from input stream
              composition.
            </p>
          </div>
        </div>
      </div>

      {/* MFI vs DMA */}
      <h3 className="text-2xl font-bold text-[#18181b] mb-6">
        Melt Flow Index (MFI) vs. Dynamic Mechanical Analysis (DMA)
      </h3>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-[#e5e7eb]">
              <th className="px-4 py-3 text-[#18181b] font-semibold">
                Parameter
              </th>
              <th className="px-4 py-3 text-[#4f46e5] font-semibold">
                Melt Flow Index (MFI)
              </th>
              <th className="px-4 py-3 text-[#7c3aed] font-semibold">
                Dynamic Mechanical Analysis (DMA)
              </th>
            </tr>
          </thead>
          <tbody className="text-[#6b7280]">
            <tr className="border-b border-[#e5e7eb]">
              <td className="px-4 py-3 font-medium text-[#3f3f46]">Standard</td>
              <td className="px-4 py-3">ASTM D1238 / ISO 1133</td>
              <td className="px-4 py-3">ASTM D4065 / ISO 6721</td>
            </tr>
            <tr className="border-b border-[#e5e7eb]">
              <td className="px-4 py-3 font-medium text-[#3f3f46]">Measurement</td>
              <td className="px-4 py-3">
                Mass flow through a die under fixed load (g/10 min)
              </td>
              <td className="px-4 py-3">
                G&apos;, G&apos;&apos;, tan(δ) as f(T, ω, strain)
              </td>
            </tr>
            <tr className="border-b border-[#e5e7eb]">
              <td className="px-4 py-3 font-medium text-[#3f3f46]">Shear rate</td>
              <td className="px-4 py-3">Single, low (~1–10 s⁻¹)</td>
              <td className="px-4 py-3">Frequency-dependent (0.01–628 rad/s)</td>
            </tr>
            <tr className="border-b border-[#e5e7eb]">
              <td className="px-4 py-3 font-medium text-[#3f3f46]">Information</td>
              <td className="px-4 py-3">Single-point fluidity index; QC tool</td>
              <td className="px-4 py-3">
                Full viscoelastic characterization; T<sub>g</sub>, relaxation spectrum
              </td>
            </tr>
            <tr className="border-b border-[#e5e7eb]">
              <td className="px-4 py-3 font-medium text-[#3f3f46]">Cost</td>
              <td className="px-4 py-3">~$5,000–15,000 (instrument)</td>
              <td className="px-4 py-3">~$80,000–250,000 (rotational rheometer)</td>
            </tr>
            <tr className="border-b border-[#e5e7eb]">
              <td className="px-4 py-3 font-medium text-[#3f3f46]">Sample prep</td>
              <td className="px-4 py-3">Pellets directly — minimal prep</td>
              <td className="px-4 py-3">Disk specimens via compression molding</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-[#3f3f46]">Limitation</td>
              <td className="px-4 py-3">
                Cannot distinguish MW from MWD or LCB effects
              </td>
              <td className="px-4 py-3">
                Limited to small strains (LVE); lower γ̇ than processing
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-[#e4e4e7] rounded-2xl p-6">
          <h4 className="font-bold text-[#18181b] mb-3">Key Insight</h4>
          <p className="text-[#6b7280] text-sm">
            MFI is widely used in industry for QC because of its simplicity.
            However, two polymers with <em>identical</em> MFI values can have
            vastly different processing behavior if their MWD or branching
            architectures differ. A classic example: HDPE (MFI = 1.0, narrow MWD)
            vs. LDPE (MFI = 1.0, broad MWD + LCB) — the LDPE will have much
            higher melt strength and strain hardening despite the same MFI.
          </p>
        </div>
        <div className="bg-[#f8f8fa] border border-[#0d9488]/10 rounded-2xl p-6">
          <h4 className="font-bold text-[#0d9488] mb-3">Recycled Polymer Implication</h4>
          <p className="text-[#6b7280] text-sm">
            For recycled resins, MFI alone is dangerously insufficient. A recycled
            PP with the same MFI as virgin may have: (1) broader MWD from blending
            multiple sources, (2) chain scission products that act as plasticizers,
            (3) crosslinked gel particles invisible to MFI but detectable by G&apos;(ω)
            at low frequencies. Industry consortia (e.g., RecyClass, APR) are
            developing standardized rheological characterization protocols beyond MFI
            for recycled content certification.
          </p>
        </div>
      </div>

      {/* Recommended Protocols */}
      <div className="bg-[#f8f8fa] border border-[#e4e4e7] rounded-2xl p-6 mb-8">
        <h4 className="font-bold text-[#18181b] mb-4">
          Recommended Characterization Protocol for Recycled Polymers
        </h4>
        <p className="text-[#6b7280] text-sm mb-4">
          A comprehensive rheological characterization of recycled resins should include
          the following sequence (adapted from Vilaplana &amp; Karlsson, <em>Macromol.
          Mater. Eng.</em>, 2008):
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ol className="text-[#6b7280] text-sm list-decimal list-inside space-y-2">
            <li>
              <strong className="text-[#18181b]">MFI</strong> — quick screening and
              lot-to-lot comparison (ASTM D1238)
            </li>
            <li>
              <strong className="text-[#18181b]">Strain sweep</strong> — determine LVR
              boundary; reduced LVR indicates gel or filler
            </li>
            <li>
              <strong className="text-[#18181b]">Frequency sweep</strong> (0.01–100 rad/s) —
              G&apos;, G&apos;&apos;, η*; extract η₀, crossover, MWD sensitivity
            </li>
            <li>
              <strong className="text-[#18181b]">Time sweep</strong> (constant ω, γ₀) —
              thermal stability; detect degradation during measurement
            </li>
          </ol>
          <ol className="text-[#6b7280] text-sm list-decimal list-inside space-y-2" start={5}>
            <li>
              <strong className="text-[#18181b]">Temperature sweep / TTS</strong> —
              a<sub>T</sub>(T) for processing window; detect immiscible contaminants
            </li>
            <li>
              <strong className="text-[#18181b]">Capillary rheometry</strong> — high γ̇
              processing data with Bagley &amp; Rabinowitsch corrections
            </li>
            <li>
              <strong className="text-[#18181b]">Extensional rheometry (SER)</strong> —
              melt strength and strain hardening for film/blow molding grades
            </li>
            <li>
              <strong className="text-[#18181b]">van Gurp-Palmen plot</strong> — branching
              and degradation fingerprint without TTS
            </li>
          </ol>
        </div>
      </div>

      {/* References */}
      <div className="bg-white border border-[#e4e4e7] rounded-2xl p-6">
        <h4 className="font-bold text-[#18181b] mb-3">Key References — Rheometry</h4>
        <ul className="text-[#6b7280] text-sm space-y-2">
          <li>
            Macosko, C.W. (1994). <em>Rheology: Principles, Measurements, and Applications.</em>{" "}
            Wiley-VCH. — Chapters 5–7 cover all standard geometries and corrections.
          </li>
          <li>
            Münstedt, H. &amp; Schwarzl, F.R. (2014). <em>Deformation and Flow of Polymeric
            Materials.</em> Springer. — Detailed treatment of capillary and extensional rheometry.
          </li>
          <li>
            Sentmanat, M.L. (2004). Miniature universal testing platform. <em>Rheol. Acta</em>, 43, 657–669.
          </li>
          <li>
            Cogswell, F.N. (1972). Converging flow of polymer melts in extrusion dies.{" "}
            <em>Polym. Eng. Sci.</em>, 12(1), 64–73. — Original Cogswell extensional analysis.
          </li>
          <li>
            Vilaplana, F. &amp; Karlsson, S. (2008). Quality concepts for the improved use of
            recycled polymeric materials. <em>Macromol. Mater. Eng.</em>, 293(4), 274–297.
          </li>
        </ul>
      </div>
    </SectionWrapper>
  );
}
