import SectionWrapper from "./SectionWrapper";
import AnimatedSection, { AnimatedCard } from "./AnimatedSection";

const researchAreas = [
  {
    title: "Recycled Polymer Rheology",
    color: "#134074",
    items: [
      "No standardized rheological protocols beyond MFI (ASTM D1238)",
      "Multi-pass degradation modeling is purely empirical — molecular-level models needed",
      "Contaminant detection limits via rheology: ~1-2 vol% — insufficient for food-contact certification",
      "Cox-Merz rule fails for most recycled systems with gel particles",
      "Blend compatibilization monitoring by rheology not standardized",
      "Lack of reference databases for recycled grade properties",
      "Post-consumer recycled (PCR) stream variability poorly characterized rheologically",
    ],
  },
  {
    title: "Molecular Theory & Modeling",
    color: "#13315C",
    items: [
      "Branched polymer tube models still qualitative for LDPE (pom-pom, hierarchical)",
      "Polydisperse nonlinear properties (LAOS, extensional) poorly predicted",
      "No unified thixotropy + viscoelasticity constitutive model",
      "ML/AI rheology lacks standardized training datasets and benchmarks",
      "Multiscale modeling (atomistic → mesoscale → continuum) not yet seamless",
      "Inverse problem: extracting molecular architecture from rheological data",
      "Melt-solid transition modeling for semi-crystalline under flow",
    ],
  },
  {
    title: "Processing & Digital Twins",
    color: "#0B2545",
    items: [
      "Digital twins for recycled feedstock processing — real-time model updating",
      "Microplastics environmental rheology uncharacterized (sediment, water, tissue)",
      "PLA/recycled-PE blend rheology mapping incomplete across composition space",
      "Inline extensional rheometry doesn't exist at commercial scale",
      "CFD + rheology coupling for complex viscoelastic flows still computationally expensive",
      "Process-structure-property prediction for recycled materials",
      "Additive manufacturing rheology protocols not yet standardized",
    ],
  },
  {
    title: "Measurement Innovation",
    color: "#8DA9C4",
    items: [
      "High-throughput rheological screening (100+ samples/day) — combinatorial approach",
      "Rheo-SAXS/SANS at synchrotron for in-situ structure-property links",
      "AI-assisted Bayesian optimization for experiment design and model selection",
      "Lab-scale rheo-microscopy for real-time morphology under flow",
      "Microrheology for μL-scale samples (DLS, particle tracking, optical tweezers)",
      "Interfacial rheology (dilatational + shear) for blend systems",
      "Ultra-high pressure rheometry (>1 GPa) for injection molding simulation input",
    ],
  },
  {
    title: "Sustainability & Circular Economy",
    color: "#134074",
    items: [
      "Rheological criteria for recyclability classification of polymers",
      "Chemical recycling feedstock quality assessment via rheology",
      "Bio-based polymer processing windows vs petroleum-based equivalents",
      "Degradation pathway identification from rheological signatures",
      "Multi-material stream separation guided by rheological properties",
      "Life-cycle rheological performance tracking for durable applications",
    ],
  },
  {
    title: "Advanced & Emerging Fields",
    color: "#0B2545",
    items: [
      "4D printing: shape-memory polymers rheology, programming-recovery protocols",
      "Self-healing polymer rheology — damage and recovery characterization",
      "Nanocomposite rheology at extreme filler loadings (>30 vol%)",
      "Polymer electrolyte rheology for solid-state batteries",
      "Rheology of polymer-derived ceramics (preceramic polymers)",
      "Active matter and stimuli-responsive polymer rheology (pH, T, light, field)",
    ],
  },
];

const textbooks = [
  { author: "Macosko, C.W.", title: "Rheology: Principles, Measurements, and Applications", year: 1994, note: "Comprehensive, measurement-focused" },
  { author: "Ferry, J.D.", title: "Viscoelastic Properties of Polymers", year: 1980, note: "Classic on linear viscoelasticity" },
  { author: "Doi, M. & Edwards, S.F.", title: "The Theory of Polymer Dynamics", year: 1986, note: "Reptation theory foundation" },
  { author: "Bird, R.B., Armstrong, R.C. & Hassager, O.", title: "Dynamics of Polymeric Liquids (Vol. 1 & 2)", year: 1987, note: "Fluid mechanics + kinetic theory" },
  { author: "Dealy, J.M. & Larson, R.G.", title: "Structure and Rheology of Molten Polymers", year: 2006, note: "Modern, molecular approach" },
  { author: "Larson, R.G.", title: "The Structure and Rheology of Complex Fluids", year: 1999, note: "Broad: emulsions, suspensions, gels" },
  { author: "Morrison, F.A.", title: "Understanding Rheology", year: 2001, note: "Excellent textbook for beginners" },
  { author: "Osswald, T.A. & Hernández-Ortiz, J.P.", title: "Polymer Processing: Modeling and Simulation", year: 2006, note: "Processing + flow modeling" },
  { author: "Dealy, J.M. & Wang, J.", title: "Melt Rheology and its Applications in the Plastics Industry", year: 2013, note: "Industry-practical, 2nd ed." },
  { author: "Barnes, H.A., Hutton, J.F. & Walters, K.", title: "An Introduction to Rheology", year: 1989, note: "Accessible introduction" },
  { author: "Tadmor, Z. & Gogos, C.G.", title: "Principles of Polymer Processing", year: 2006, note: "Processing fundamentals, 2nd ed." },
  { author: "Tanner, R.I.", title: "Engineering Rheology", year: 2000, note: "Mathematical, constitutive models" },
];

const seminalPapers = [
  { authors: "de Gennes, P.G.", title: "Reptation of a polymer chain in the presence of fixed obstacles", journal: "J. Chem. Phys.", year: "1971", impact: "Foundation of reptation theory" },
  { authors: "Doi, M. & Edwards, S.F.", title: "Dynamics of concentrated polymer systems (I-IV)", journal: "J. Chem. Soc. Faraday Trans.", year: "1978-79", impact: "Tube model for entangled melts" },
  { authors: "Cox, W.P. & Merz, E.H.", title: "Correlation of dynamic and steady flow viscosities", journal: "J. Polym. Sci.", year: "1958", impact: "Cox-Merz rule: η*(ω) ≈ η(γ̇)" },
  { authors: "Carreau, P.J.", title: "Rheological equations from molecular network theories", journal: "Trans. Soc. Rheol.", year: "1972", impact: "Carreau model for shear-thinning" },
  { authors: "Phan-Thien, N. & Tanner, R.I.", title: "A new constitutive equation derived from network theory", journal: "J. Non-Newt. Fluid Mech.", year: "1977", impact: "PTT model for polymer melts" },
  { authors: "Giesekus, H.", title: "A simple constitutive equation based on the concept of deformation-dependent tensorial mobility", journal: "J. Non-Newt. Fluid Mech.", year: "1982", impact: "Giesekus model" },
  { authors: "Sentmanat, M.L.", title: "Miniature universal testing platform for measuring extensional properties", journal: "Rheol. Acta", year: "2004", impact: "SER fixture invention" },
  { authors: "Hyun, K. et al.", title: "A review of nonlinear oscillatory shear tests (LAOS)", journal: "Prog. Polym. Sci.", year: "2011", impact: "Comprehensive LAOS review" },
  { authors: "Palierne, J.F.", title: "Linear rheology of viscoelastic emulsions with interfacial tension", journal: "Rheol. Acta", year: "1990", impact: "Palierne model for blend rheology" },
  { authors: "Likhtman, A.E. & McLeish, T.C.B.", title: "Quantitative theory for linear dynamics of linear entangled polymers", journal: "Macromolecules", year: "2002", impact: "Likhtman-McLeish model" },
];

const standards = [
  { id: "ASTM D1238 / ISO 1133", title: "Melt Flow Index (MFI/MFR)", desc: "Standard single-point melt flow test at specified T and load" },
  { id: "ASTM D3835 / ISO 11443", title: "Capillary Rheometry", desc: "Determination of η(γ̇) using capillary or slit die" },
  { id: "ASTM D4440", title: "Oscillatory Rheometry of Melts", desc: "Standard for measuring G', G'' on rotational rheometer" },
  { id: "ASTM D4065 / ISO 6721", title: "DMA - Dynamic Mechanical Analysis", desc: "Torsion/bending modulus vs temperature" },
  { id: "ISO 6721-10", title: "Complex Shear Viscosity", desc: "Parallel plate oscillatory measurement of η*" },
  { id: "ASTM D5099", title: "Rubber Process Analyzer (RPA)", desc: "Oscillatory shear for rubber compounds (cure + viscoelastic)" },
  { id: "ISO 20965", title: "Extensional Viscosity", desc: "Determination of transient extensional viscosity of polymer melts" },
  { id: "ASTM D4473", title: "Cure Behavior by DMA", desc: "Standard for thermoset cure monitoring via G' rise" },
  { id: "ISO 11357", title: "DSC (complementary)", desc: "Tg, Tm, crystallization — complements rheological data" },
  { id: "ASTM D2196", title: "Viscosity by Rotational Viscometer", desc: "Brookfield-type measurement for coatings, adhesives" },
];

const journals = [
  { name: "Journal of Rheology (SOR)", if: "3.0", note: "Premier rheology journal" },
  { name: "Rheologica Acta", if: "2.3", note: "European rheology society" },
  { name: "J. Non-Newtonian Fluid Mech.", if: "2.8", note: "Non-Newtonian flows + modeling" },
  { name: "Macromolecules", if: "5.5", note: "Polymer physics + rheology" },
  { name: "Polymer", if: "4.6", note: "Broad polymer science" },
  { name: "Polymer Eng. & Sci.", if: "3.2", note: "Processing-oriented" },
  { name: "Prog. Polymer Sci.", if: "26.0", note: "Comprehensive reviews" },
  { name: "J. Polymer Science", if: "3.0", note: "Synthesis + characterization" },
  { name: "Soft Matter", if: "3.4", note: "Complex fluids, gels, colloids" },
  { name: "Physics of Fluids", if: "4.1", note: "Fluid mechanics + viscoelastic flows" },
  { name: "ACS Appl. Polym. Mater.", if: "4.9", note: "Applied polymer materials" },
  { name: "Int. Polym. Processing", if: "1.5", note: "Polymer processing focus" },
];

const conferences = [
  { name: "SOR Annual Meeting", org: "Society of Rheology", freq: "Annual", note: "Premier rheology conference, USA" },
  { name: "ICR (International Congress on Rheology)", org: "ICR", freq: "Every 4 years", note: "Largest global rheology meeting" },
  { name: "AERC (Annual European Rheology Conf.)", org: "European Society of Rheology", freq: "Annual", note: "European community" },
  { name: "PPS (Polymer Processing Society)", org: "PPS", freq: "Annual", note: "Processing-focused, regional meetings" },
  { name: "ANTEC (SPE)", org: "Society of Plastics Engineers", freq: "Annual", note: "Industry + academia, practical processing" },
  { name: "Nordic Rheology Conference", org: "Nordic Rheology Society", freq: "Annual", note: "Scandinavian community" },
];

const software = [
  { name: "IRIS Rheo-Hub", type: "Analysis", desc: "Relaxation spectrum extraction, master curve, model fitting" },
  { name: "TRIOS (TA Instruments)", type: "Instrument", desc: "Data acquisition + analysis for TA rheometers" },
  { name: "RheoCompass (Anton Paar)", type: "Instrument", desc: "MCR series control + analysis software" },
  { name: "RepTate", type: "Open-source", desc: "Tube model fitting, molecular theory. Python-based." },
  { name: "pyRheo", type: "Open-source", desc: "Python library for rheological data analysis" },
  { name: "Rheology Toolkit (MATLAB)", type: "Analysis", desc: "Spectrum calculation, model fitting scripts" },
  { name: "Moldflow / Moldex3D", type: "Simulation", desc: "Injection molding simulation (requires rheological input)" },
  { name: "Polyflow (Ansys)", type: "Simulation", desc: "Viscoelastic CFD for extrusion, blow molding" },
  { name: "OpenFOAM", type: "Open-source", desc: "CFD with viscoelastic solvers (Oldroyd-B, PTT, Giesekus)" },
];

export default function LiteratureGaps() {
  return (
    <SectionWrapper
      id="literature"
      title="Literature & Research Frontiers"
      subtitle="Section 5 — Open Questions"
      accent="#134074"
      number="05"
    >
      {/* Research Gaps */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-6">Open Research Questions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {researchAreas.map((area, i) => (
            <AnimatedCard key={i} delay={i * 0.06}
              className="bg-white border border-[#d0dde8] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: area.color }} />
                <h4 className="font-bold text-[#0B2545] text-sm">{area.title}</h4>
              </div>
              <ul className="space-y-2">
                {area.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-[#2c4a6e] text-xs">
                    <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: area.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Standards & Norms */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-6">Standards & Testing Norms</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b-2 border-[#134074]/20">
                <th className="px-3 py-2 text-[#0B2545] font-semibold text-xs">Standard</th>
                <th className="px-3 py-2 text-[#134074] font-semibold text-xs">Title</th>
                <th className="px-3 py-2 text-[#2c4a6e] font-semibold text-xs">Description</th>
              </tr>
            </thead>
            <tbody className="text-[#2c4a6e] text-xs">
              {standards.map((std, i) => (
                <tr key={i} className="border-b border-[#d0dde8]/50 hover:bg-[#EEF4ED]/50 transition-colors">
                  <td className="px-3 py-2 font-semibold text-[#0B2545] whitespace-nowrap">{std.id}</td>
                  <td className="px-3 py-2 font-medium text-[#134074]">{std.title}</td>
                  <td className="px-3 py-2">{std.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      {/* Seminal Papers */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-6">Seminal Papers in Rheology</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {seminalPapers.map((paper, i) => (
            <AnimatedCard key={i} delay={i * 0.04}
              className="bg-white border border-[#d0dde8] rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#0B2545]">{paper.authors} ({paper.year})</div>
                  <div className="text-xs text-[#2c4a6e] mt-0.5 italic">{paper.title}</div>
                  <div className="text-[10px] text-[#8DA9C4] mt-0.5">{paper.journal}</div>
                </div>
                <div className="shrink-0 bg-[#EEF4ED] rounded-lg px-2 py-1 text-[10px] font-medium text-[#134074]">
                  {paper.impact}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Reference Library */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-6">Reference Library</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-bold text-[#134074] mb-3 uppercase tracking-wide">Key Textbooks ({textbooks.length})</h4>
            <div className="space-y-2">
              {textbooks.map((book, i) => (
                <AnimatedCard key={i} delay={i * 0.03}
                  className="bg-[#EEF4ED] rounded-xl px-4 py-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-[#0B2545]">{book.author}</span>
                      <span className="text-xs text-[#2c4a6e] ml-1">— <em>{book.title}</em></span>
                    </div>
                    <span className="text-xs text-[#8DA9C4] shrink-0">{book.year}</span>
                  </div>
                  <div className="text-[10px] text-[#8DA9C4] mt-0.5">{book.note}</div>
                </AnimatedCard>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#134074] mb-3 uppercase tracking-wide">Key Journals ({journals.length})</h4>
            <div className="space-y-2">
              {journals.map((j, i) => (
                <AnimatedCard key={i} delay={i * 0.03}
                  className="bg-white border border-[#d0dde8] rounded-lg px-3 py-2 flex items-center justify-between">
                  <div className="flex-1">
                    <span className="text-xs text-[#0B2545] font-medium">{j.name}</span>
                    <span className="text-[10px] text-[#8DA9C4] ml-2">{j.note}</span>
                  </div>
                  <span className="text-[10px] text-[#134074] font-semibold shrink-0">IF ~{j.if}</span>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Conferences */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-6">Key Conferences</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conferences.map((conf, i) => (
            <AnimatedCard key={i} delay={i * 0.06}
              className="bg-white border border-[#d0dde8] rounded-2xl p-4">
              <h4 className="font-bold text-[#0B2545] text-sm mb-1">{conf.name}</h4>
              <div className="text-xs text-[#134074] font-medium mb-1">{conf.org} — {conf.freq}</div>
              <p className="text-[#8DA9C4] text-xs">{conf.note}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Software Tools */}
      <AnimatedSection>
        <h3 className="text-2xl font-bold text-[#0B2545] mb-6">Software & Analysis Tools</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {software.map((sw, i) => (
            <AnimatedCard key={i} delay={i * 0.04}
              className="bg-[#EEF4ED] border border-[#d0dde8] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-[#0B2545] text-sm">{sw.name}</h4>
              </div>
              <div className="inline-flex px-2 py-0.5 rounded-full bg-[#134074]/10 text-[10px] text-[#134074] font-medium mb-1.5">
                {sw.type}
              </div>
              <p className="text-[#2c4a6e] text-xs">{sw.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
