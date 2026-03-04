export default function Footer() {
  return (
    <footer className="border-t border-[#334155]/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#a78bfa] flex items-center justify-center text-white font-bold text-sm">
                PR
              </div>
              <span className="font-bold text-[#f1f5f9]">
                Polymer Rheology
              </span>
            </div>
            <p className="text-[#94a3b8] text-sm">
              An interactive educational platform for engineers and scientists
              studying the flow and deformation of polymeric materials.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#f1f5f9] mb-3">Sections</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#fundamentals"
                  className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors"
                >
                  Fundamentals of Rheology
                </a>
              </li>
              <li>
                <a
                  href="#polymer-rheology"
                  className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors"
                >
                  Deep Dive: Polymer Rheology
                </a>
              </li>
              <li>
                <a
                  href="#measurement"
                  className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors"
                >
                  Measurement Techniques
                </a>
              </li>
              <li>
                <a
                  href="#applications"
                  className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors"
                >
                  Industrial Applications
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#f1f5f9] mb-3">References</h4>
            <ul className="space-y-2 text-sm text-[#94a3b8]">
              <li>Macosko, C.W. — <em>Rheology: Principles, Measurements, and Applications</em></li>
              <li>Ferry, J.D. — <em>Viscoelastic Properties of Polymers</em></li>
              <li>Morrison, F.A. — <em>Understanding Rheology</em></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#334155]/50 pt-6 text-center text-[#64748b] text-sm">
          Polymer Rheology Educational Platform &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
