export default function Footer() {
  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8">
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e4e4e7] to-transparent" />
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                PR
              </div>
              <span className="font-semibold text-[#18181b] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                Polymer Rheology
              </span>
            </div>
            <p className="text-[#9ca3af] text-sm leading-relaxed">
              An interactive educational platform for engineers and scientists
              studying the flow and deformation of polymeric materials.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-[0.15em] mb-4">Sections</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#fundamentals" className="text-[#6b7280] hover:text-[#4f46e5] transition-colors duration-300">
                  Fundamentals of Rheology
                </a>
              </li>
              <li>
                <a href="#polymer-rheology" className="text-[#6b7280] hover:text-[#4f46e5] transition-colors duration-300">
                  Deep Dive: Polymer Rheology
                </a>
              </li>
              <li>
                <a href="#measurement" className="text-[#6b7280] hover:text-[#4f46e5] transition-colors duration-300">
                  Measurement Techniques
                </a>
              </li>
              <li>
                <a href="#applications" className="text-[#6b7280] hover:text-[#4f46e5] transition-colors duration-300">
                  Industrial Applications
                </a>
              </li>
              <li>
                <a href="#literature" className="text-[#6b7280] hover:text-[#4f46e5] transition-colors duration-300">
                  Literature &amp; Research Gaps
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-[0.15em] mb-4">Core References</h4>
            <ul className="space-y-2.5 text-sm text-[#9ca3af]">
              <li>Macosko, C.W. — <em>Rheology: Principles, Measurements, and Applications</em> (1994)</li>
              <li>Ferry, J.D. — <em>Viscoelastic Properties of Polymers</em> (1980)</li>
              <li>Doi &amp; Edwards — <em>The Theory of Polymer Dynamics</em> (1986)</li>
              <li>Dealy &amp; Larson — <em>Structure and Rheology of Molten Polymers</em> (2006)</li>
              <li>Morrison, F.A. — <em>Understanding Rheology</em> (2001)</li>
            </ul>
          </div>
        </div>
        <div className="relative pt-6 text-center text-[#9ca3af] text-xs tracking-wide">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e4e4e7] to-transparent" />
          Polymer Rheology Educational Platform &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
