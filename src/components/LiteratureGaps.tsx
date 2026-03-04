import SectionWrapper from "./SectionWrapper";
import AnimatedSection, { AnimatedCard } from "./AnimatedSection";

const researchAreas = [
  {
    title: "Recycled Polymer Rheology",
    color: "#134074",
    items: [
      "No standardized rheological protocols beyond MFI",
      "Multi-pass degradation modeling is purely empirical",
      "Contaminant detection limits via rheology: ~1-2 vol%",
      "Cox-Merz rule fails for most recycled systems",
    ],
  },
  {
    title: "Molecular Theory",
    color: "#13315C",
    items: [
      "Branched polymer tube models still qualitative for LDPE",
      "Polydisperse nonlinear properties (LAOS, extensional) poorly predicted",
      "No unified thixotropy + viscoelasticity constitutive model",
      "ML/AI rheology lacks standardized training datasets",
    ],
  },
  {
    title: "Processing Frontiers",
    color: "#0B2545",
    items: [
      "Digital twins for recycled feedstock processing",
      "Microplastics environmental rheology uncharacterized",
      "PLA/recycled-PE blend rheology mapping incomplete",
      "Inline extensional rheometry doesn't exist yet",
    ],
  },
  {
    title: "Measurement Innovation",
    color: "#8DA9C4",
    items: [
      "High-throughput rheological screening (100+ samples/day)",
      "Rheo-SAXS/SANS at synchrotron for structure-property links",
      "AI-assisted Bayesian optimization for experiment design",
      "Lab-scale rheo-microscopy for real-time morphology",
    ],
  },
];

const textbooks = [
  { author: "Macosko", title: "Rheology: Principles, Measurements, and Applications", year: 1994 },
  { author: "Ferry", title: "Viscoelastic Properties of Polymers", year: 1980 },
  { author: "Doi & Edwards", title: "The Theory of Polymer Dynamics", year: 1986 },
  { author: "Bird, Armstrong & Hassager", title: "Dynamics of Polymeric Liquids", year: 1987 },
  { author: "Dealy & Larson", title: "Structure and Rheology of Molten Polymers", year: 2006 },
  { author: "Larson", title: "The Structure and Rheology of Complex Fluids", year: 1999 },
];

const journals = [
  "Journal of Rheology (SOR)",
  "Rheologica Acta",
  "J. Non-Newtonian Fluid Mech.",
  "Macromolecules",
  "Polymer",
  "Polymer Eng. & Sci.",
  "Prog. Polymer Sci.",
  "J. Polymer Science",
];

export default function LiteratureGaps() {
  return (
    <SectionWrapper
      id="literature"
      title="Literature & Research Frontiers"
      subtitle="Section 5 — Open Questions"
      accent="#134074"
    >
      {/* Research Gaps */}
      <AnimatedSection className="mb-16">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-6">Open Research Questions</h3>
        <div className="grid md:grid-cols-2 gap-5">
          {researchAreas.map((area, i) => (
            <AnimatedCard key={i} delay={i * 0.08}
              className="bg-white border border-[#c9d9e8] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: area.color }} />
                <h4 className="font-bold text-[#0B2545]">{area.title}</h4>
              </div>
              <ul className="space-y-2">
                {area.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-[#3d6285] text-xs">
                    <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: area.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Reference Library */}
      <AnimatedSection className="mb-8">
        <h3 className="text-2xl font-bold text-[#0B2545] mb-6">Reference Library</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-bold text-[#134074] mb-3 uppercase tracking-wide">Key Textbooks</h4>
            <div className="space-y-2">
              {textbooks.map((book, i) => (
                <AnimatedCard key={i} delay={i * 0.04}
                  className="bg-[#EEF4ED] rounded-xl px-4 py-2.5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#0B2545]">{book.author}</span>
                    <span className="text-xs text-[#3d6285] ml-1">— <em>{book.title}</em></span>
                  </div>
                  <span className="text-xs text-[#8DA9C4] shrink-0 ml-2">{book.year}</span>
                </AnimatedCard>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#134074] mb-3 uppercase tracking-wide">Key Journals</h4>
            <div className="grid grid-cols-2 gap-2">
              {journals.map((j, i) => (
                <AnimatedCard key={i} delay={i * 0.03}
                  className="bg-white border border-[#c9d9e8] rounded-lg px-3 py-2 text-xs text-[#3d6285]">
                  <em>{j}</em>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
