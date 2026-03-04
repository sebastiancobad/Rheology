import SectionWrapper from "./SectionWrapper";

export default function LiteratureGaps() {
  return (
    <SectionWrapper
      id="literature"
      title="Literature & Open Research Questions"
      subtitle="Section 5 — Current Frontiers"
      accent="#f472b6"
    >
      <p className="text-[#94a3b8] mb-10 max-w-3xl">
        Despite decades of research, polymer rheology remains a vibrant field with
        significant open questions — particularly as the industry shifts toward
        sustainability, recycled feedstocks, and advanced manufacturing. Below we
        summarize key literature gaps and emerging frontiers.
      </p>

      {/* Open Research Questions */}
      <h3 className="text-2xl font-bold text-[#f1f5f9] mb-6">
        Open Research Questions &amp; Literature Gaps
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#f472b6]" />
            <h4 className="font-bold text-[#f1f5f9]">Recycled Polymer Rheology</h4>
          </div>
          <ul className="text-[#94a3b8] text-sm space-y-3">
            <li>
              <strong className="text-[#e2e8f0]">Lack of standardized protocols:</strong>{" "}
              No ISO/ASTM standard exists for comprehensive rheological characterization
              of recycled polymers beyond MFI. Industry consortia (RecyClass, APR, PRE)
              are developing guidelines, but harmonization is years away.
            </li>
            <li>
              <strong className="text-[#e2e8f0]">Multi-pass degradation modeling:</strong>{" "}
              While η₀ vs. number of recycling passes has been measured for common
              polymers, predictive models linking degradation kinetics (chain scission,
              crosslinking, branching) to rheological changes across N passes are
              still empirical. A first-principles connection between mechanochemical
              degradation and the resulting MWD → relaxation spectrum → processing
              behavior is lacking (Vilaplana &amp; Karlsson, 2008).
            </li>
            <li>
              <strong className="text-[#e2e8f0]">Contaminant detection limits:</strong>{" "}
              What is the minimum detectable contamination level via rheological methods?
              For immiscible polymer contaminants, the Palierne model suggests ~1–2 vol%
              is the detection limit via G&apos;(ω) at low frequencies. For crosslinked
              gel particles, the limit may be lower (~0.1%) using van Gurp-Palmen plots.
              Systematic studies quantifying these detection limits are scarce.
            </li>
            <li>
              <strong className="text-[#e2e8f0]">Cox-Merz rule failure:</strong>{" "}
              The Cox-Merz rule fails for many recycled systems (degraded + filled +
              blended). Understanding <em>why</em> it fails and developing corrections
              specific to recycled polymer classes would enable better prediction of
              processing behavior from oscillatory data alone.
            </li>
          </ul>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#a78bfa]" />
            <h4 className="font-bold text-[#f1f5f9]">Molecular Rheology &amp; Theory</h4>
          </div>
          <ul className="text-[#94a3b8] text-sm space-y-3">
            <li>
              <strong className="text-[#e2e8f0]">Branched polymer dynamics:</strong>{" "}
              The tube model for linear polymers is mature, but quantitative prediction
              of rheology for arbitrary branching topologies (combs, Cayley trees,
              randomly branched LDPE) remains challenging. Hierarchical relaxation
              models (e.g., branch-on-branch, Das et al., 2006) capture qualitative
              features but quantitative agreement for commercial LDPE is still elusive.
            </li>
            <li>
              <strong className="text-[#e2e8f0]">Polydispersity effects:</strong>{" "}
              Real polymers have continuous MWD. While tube models + MWD integration
              predict η₀ and G(t) well for narrow distributions, the quantitative
              prediction of nonlinear properties (extensional viscosity, LAOS) for
              polydisperse systems is an active area. Recent slip-link simulations
              (Masubuchi, <em>Macromolecules</em>, 2023) show promise.
            </li>
            <li>
              <strong className="text-[#e2e8f0]">Thixotropy constitutive modeling:</strong>{" "}
              Despite decades of work, no single constitutive model adequately captures
              thixotropy, yield stress, and viscoelasticity simultaneously. The
              &quot;thixotropy problem&quot; (de Souza Mendes &amp; Thompson, 2019) remains open,
              particularly relevant for recycled polymer compounds with complex
              microstructures.
            </li>
            <li>
              <strong className="text-[#e2e8f0]">Machine learning for rheology:</strong>{" "}
              ML/AI approaches to predict rheological behavior from molecular
              descriptors (MWD, branching, composition) are emerging but lack the
              large, standardized datasets needed for reliable training
              (Mahmoudabadbozchelou et al., <em>J. Rheol.</em>, 2021).
            </li>
          </ul>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
            <h4 className="font-bold text-[#f1f5f9]">Processing &amp; Applications</h4>
          </div>
          <ul className="text-[#94a3b8] text-sm space-y-3">
            <li>
              <strong className="text-[#e2e8f0]">Digital twins for recycled processing:</strong>{" "}
              Real-time rheological monitoring + ML-driven process control could
              compensate for batch-to-batch variability in recycled streams. Proof-of-concept
              systems exist for virgin PE extrusion (Abeykoon, 2021) but have not been
              validated for recycled feedstocks with variable contamination.
            </li>
            <li>
              <strong className="text-[#e2e8f0]">Microplastics rheology:</strong>{" "}
              The flow behavior of microplastic-laden environmental matrices (sediment,
              wastewater sludge) is poorly characterized rheologically. Standard
              suspension rheology models (Krieger-Dougherty) may not apply due to
              non-spherical particle shapes and surface-active degradation products.
            </li>
            <li>
              <strong className="text-[#e2e8f0]">Biopolymer blends with recycled polymers:</strong>{" "}
              PLA/recycled-PE blends for transitional applications have complex rheology
              (immiscible, degradation-sensitive, crystallization-dependent). Systematic
              rheological studies mapping the composition–morphology–processability
              space are limited.
            </li>
          </ul>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#34d399]" />
            <h4 className="font-bold text-[#f1f5f9]">Measurement &amp; Methods</h4>
          </div>
          <ul className="text-[#94a3b8] text-sm space-y-3">
            <li>
              <strong className="text-[#e2e8f0]">High-throughput rheological screening:</strong>{" "}
              Combinatorial/high-throughput approaches for screening recycled polymer
              blends are virtually non-existent. Developing microfluidic rheometers or
              rapid parallel plate methods for screening 100+ compositions/day would
              accelerate formulation development for recycled compounds.
            </li>
            <li>
              <strong className="text-[#e2e8f0]">Inline extensional rheometry:</strong>{" "}
              While inline shear viscosity measurement is mature, inline extensional
              viscosity measurement during processing remains a challenge. Converging
              die methods (Cogswell) are approximate; true inline SER-type measurements
              do not exist.
            </li>
            <li>
              <strong className="text-[#e2e8f0]">Rheo-microscopy/Rheo-SAXS:</strong>{" "}
              Simultaneous rheological measurement + structural characterization
              (optical, X-ray, neutron scattering) provides unprecedented
              structure–property links. Rheo-SANS/SAXS at synchrotron facilities is
              expanding but still limited in accessibility. Recent lab-scale
              rheo-microscopy with confocal/fluorescence enables real-time morphology
              observation in polymer blends under shear.
            </li>
            <li>
              <strong className="text-[#e2e8f0]">AI-assisted rheometry:</strong>{" "}
              Automated experiment design (Bayesian optimization) for rheological
              characterization could reduce measurement time by 50–80% while maintaining
              data quality. Early demonstrations exist (Lennon et al.,{" "}
              <em>J. Rheol.</em>, 2023) but adoption in industrial labs is nascent.
            </li>
          </ul>
        </div>
      </div>

      {/* Comprehensive Reference Library */}
      <h3 className="text-2xl font-bold text-[#f1f5f9] mb-6">
        Comprehensive Reference Library
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <h4 className="font-bold text-[#38bdf8] mb-4">Foundational Textbooks</h4>
          <ul className="text-[#94a3b8] text-sm space-y-2">
            <li>
              Macosko, C.W. (1994). <em>Rheology: Principles, Measurements, and
              Applications.</em> Wiley-VCH.
            </li>
            <li>
              Ferry, J.D. (1980). <em>Viscoelastic Properties of Polymers.</em>{" "}
              3rd ed. Wiley.
            </li>
            <li>
              Morrison, F.A. (2001). <em>Understanding Rheology.</em> Oxford University Press.
            </li>
            <li>
              Bird, R.B., Armstrong, R.C. &amp; Hassager, O. (1987).{" "}
              <em>Dynamics of Polymeric Liquids.</em> Vol. 1 &amp; 2. 2nd ed. Wiley.
            </li>
            <li>
              Doi, M. &amp; Edwards, S.F. (1986). <em>The Theory of Polymer Dynamics.</em>{" "}
              Oxford.
            </li>
            <li>
              Larson, R.G. (1999). <em>The Structure and Rheology of Complex Fluids.</em>{" "}
              Oxford.
            </li>
            <li>
              Barnes, H.A., Hutton, J.F. &amp; Walters, K. (1989).{" "}
              <em>An Introduction to Rheology.</em> Elsevier.
            </li>
          </ul>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
          <h4 className="font-bold text-[#a78bfa] mb-4">Modern &amp; Specialized</h4>
          <ul className="text-[#94a3b8] text-sm space-y-2">
            <li>
              Dealy, J.M. &amp; Larson, R.G. (2006). <em>Structure and Rheology of
              Molten Polymers.</em> Hanser.
            </li>
            <li>
              Münstedt, H. (2018). <em>Rheological Measurements with Commercial
              Rheometers.</em> Hanser.
            </li>
            <li>
              Mewis, J. &amp; Wagner, N.J. (2012). <em>Colloidal Suspension Rheology.</em>{" "}
              Cambridge.
            </li>
            <li>
              Tadmor, Z. &amp; Gogos, C.G. (2006). <em>Principles of Polymer
              Processing.</em> 2nd ed. Wiley.
            </li>
            <li>
              Osswald, T.A. &amp; Menges, G. (2012). <em>Materials Science of Polymers
              for Engineers.</em> 3rd ed. Hanser.
            </li>
            <li>
              La Mantia, F.P. (Ed.) (2009). <em>Handbook of Plastics Recycling.</em>{" "}
              Rapra Technology.
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 mb-8">
        <h4 className="font-bold text-[#34d399] mb-4">Key Journal Articles (Selected)</h4>
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
          <ul className="text-[#94a3b8] text-xs space-y-2">
            <li>
              de Gennes, P.G. (1971). Reptation of a polymer chain in the presence of
              fixed obstacles. <em>J. Chem. Phys.</em>, 55, 572–579.
            </li>
            <li>
              Doi, M. &amp; Edwards, S.F. (1978). Dynamics of concentrated polymer
              systems. <em>J. Chem. Soc. Faraday Trans. 2</em>, 74, 1789–1801.
            </li>
            <li>
              Likhtman, A.E. &amp; McLeish, T.C.B. (2002). Quantitative theory for
              linear dynamics of linear entangled polymers. <em>Macromolecules</em>,
              35(16), 6332–6343.
            </li>
            <li>
              Palierne, J.F. (1990). Linear rheology of viscoelastic emulsions.{" "}
              <em>Rheol. Acta</em>, 29, 204–214.
            </li>
            <li>
              Trinkle, S. &amp; Friedrich, C. (2001). Van Gurp-Palmen-plot: a way to
              characterize polydispersity of linear polymers. <em>Rheol. Acta</em>, 40,
              322–328.
            </li>
            <li>
              Hyun, K. et al. (2011). A review of nonlinear oscillatory shear tests.{" "}
              <em>Prog. Polym. Sci.</em>, 36(12), 1697–1753.
            </li>
            <li>
              Sentmanat, M.L. (2004). Miniature universal testing platform.{" "}
              <em>Rheol. Acta</em>, 43, 657–669.
            </li>
          </ul>
          <ul className="text-[#94a3b8] text-xs space-y-2">
            <li>
              Hatzikiriakos, S.G. (2012). Wall slip of molten polymers.{" "}
              <em>Prog. Polym. Sci.</em>, 37(4), 624–643.
            </li>
            <li>
              Barnes, H.A. (1999). The yield stress — a review.{" "}
              <em>J. Non-Newtonian Fluid Mech.</em>, 81(1–2), 133–178.
            </li>
            <li>
              Groisman, A. &amp; Steinberg, V. (2000). Elastic turbulence in a polymer
              solution flow. <em>Nature</em>, 405, 53–55.
            </li>
            <li>
              Incarnato, L. et al. (2004). Structure and rheology of recycled PET
              modified by reactive extrusion. <em>Polymer</em>, 45(10), 3873–3879.
            </li>
            <li>
              Vilaplana, F. &amp; Karlsson, S. (2008). Quality concepts for recycled
              polymeric materials. <em>Macromol. Mater. Eng.</em>, 293(4), 274–297.
            </li>
            <li>
              Ragaert, K. et al. (2017). Mechanical and chemical recycling of solid
              plastic waste. <em>Waste Management</em>, 69, 24–58.
            </li>
            <li>
              Mackay, M.E. (2018). Rheological behavior in additive manufacturing.{" "}
              <em>J. Rheol.</em>, 62(6), 1549–1561.
            </li>
          </ul>
        </div>
      </div>

      {/* Journals */}
      <div className="bg-[#0f172a] border border-[#334155] rounded-2xl p-6">
        <h4 className="font-bold text-[#f1f5f9] mb-3">Key Journals in Polymer Rheology</h4>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "Journal of Rheology (SOR)",
            "Rheologica Acta",
            "Journal of Non-Newtonian Fluid Mechanics",
            "Macromolecules",
            "Polymer",
            "Polymer Engineering & Science",
            "Journal of Polymer Science",
            "Progress in Polymer Science",
          ].map((j) => (
            <div
              key={j}
              className="bg-[#1e293b] rounded-lg px-3 py-2 text-[#94a3b8] text-xs"
            >
              <em>{j}</em>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
