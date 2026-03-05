export default function Footer() {
  return (
    <footer className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0B2545] text-white overflow-hidden">
      {/* Grain overlay */}
      <div className="grain-subtle" />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#134074]/20 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#8DA9C4]/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid sm:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white font-bold text-sm shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                PR
              </div>
              <span
                className="font-semibold text-white tracking-tight text-[15px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Polymer Rheology
              </span>
            </div>
            <p className="text-[#8DA9C4] text-sm leading-[1.8]">
              An interactive educational platform for engineers and scientists
              studying the flow and deformation of polymeric materials.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-semibold text-[#8DA9C4] uppercase tracking-[0.2em] mb-5">
              Sections
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "#fundamentals", label: "Fundamentals of Rheology" },
                { href: "#polymer-rheology", label: "Deep Dive: Polymer Rheology" },
                { href: "#measurement", label: "Measurement Techniques" },
                { href: "#applications", label: "Industrial Applications" },
                { href: "#literature", label: "Literature & Research Gaps" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#8DA9C4]/80 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#8DA9C4]/40 group-hover:bg-white/60 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* References */}
          <div>
            <h4 className="text-[11px] font-semibold text-[#8DA9C4] uppercase tracking-[0.2em] mb-5">
              Core References
            </h4>
            <ul className="space-y-3 text-sm text-[#8DA9C4]/70 leading-relaxed">
              <li>Macosko, C.W. &mdash; <em className="text-[#8DA9C4]/90">Rheology: Principles, Measurements, and Applications</em> (1994)</li>
              <li>Ferry, J.D. &mdash; <em className="text-[#8DA9C4]/90">Viscoelastic Properties of Polymers</em> (1980)</li>
              <li>Doi &amp; Edwards &mdash; <em className="text-[#8DA9C4]/90">The Theory of Polymer Dynamics</em> (1986)</li>
              <li>Dealy &amp; Larson &mdash; <em className="text-[#8DA9C4]/90">Structure and Rheology of Molten Polymers</em> (2006)</li>
              <li>Morrison, F.A. &mdash; <em className="text-[#8DA9C4]/90">Understanding Rheology</em> (2001)</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8DA9C4]/60 text-xs tracking-wide">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span>Polymer Rheology Educational Platform &copy; {new Date().getFullYear()}</span>
          <span className="text-[10px] uppercase tracking-[0.2em]">Built for Science</span>
        </div>
      </div>
    </footer>
  );
}
