export default function Footer() {
  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8">
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#818cf8] to-[#c084fc] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_16px_-4px_rgba(129,140,248,0.3)]">
                PR
              </div>
              <span className="font-semibold text-[#fafafa] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                Polymer Rheology
              </span>
            </div>
            <p className="text-[#71717a] text-sm leading-relaxed">
              An interactive educational platform for engineers and scientists
              studying the flow and deformation of polymeric materials.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-medium text-[#71717a] uppercase tracking-[0.15em] mb-4">Sections</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#fundamentals" className="text-[#a1a1aa] hover:text-[#818cf8] transition-colors duration-300">
                  Fundamentals of Rheology
                </a>
              </li>
              <li>
                <a href="#polymer-rheology" className="text-[#a1a1aa] hover:text-[#818cf8] transition-colors duration-300">
                  Deep Dive: Polymer Rheology
                </a>
              </li>
              <li>
                <a href="#measurement" className="text-[#a1a1aa] hover:text-[#818cf8] transition-colors duration-300">
                  Measurement Techniques
                </a>
              </li>
              <li>
                <a href="#applications" className="text-[#a1a1aa] hover:text-[#818cf8] transition-colors duration-300">
                  Industrial Applications
                </a>
              </li>
              <li>
                <a href="#literature" className="text-[#a1a1aa] hover:text-[#818cf8] transition-colors duration-300">
                  Literature &amp; Research Gaps
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-medium text-[#71717a] uppercase tracking-[0.15em] mb-4">Core References</h4>
            <ul className="space-y-2.5 text-sm text-[#71717a]">
              <li>Macosko, C.W. — <em>Rheology: Principles, Measurements, and Applications</em> (1994)</li>
              <li>Ferry, J.D. — <em>Viscoelastic Properties of Polymers</em> (1980)</li>
              <li>Doi &amp; Edwards — <em>The Theory of Polymer Dynamics</em> (1986)</li>
              <li>Dealy &amp; Larson — <em>Structure and Rheology of Molten Polymers</em> (2006)</li>
              <li>Morrison, F.A. — <em>Understanding Rheology</em> (2001)</li>
            </ul>
          </div>
        </div>
        <div className="relative pt-6 text-center text-[#52525b] text-xs tracking-wide">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          Polymer Rheology Educational Platform &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
