export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#38bdf8]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#a78bfa]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#34d399]/3 blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          Interactive Educational Platform
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#f1f5f9] mb-6 leading-tight">
          Polymer{" "}
          <span className="bg-gradient-to-r from-[#38bdf8] via-[#a78bfa] to-[#34d399] bg-clip-text text-transparent">
            Rheology
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed">
          From Newtonian fundamentals to advanced viscoelastic characterization
          &mdash; explore the science of flow and deformation in polymeric
          systems through interactive visualizations and rigorous theory.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#fundamentals"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#a78bfa] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#38bdf8]/20"
          >
            Start Learning
          </a>
          <a
            href="#polymer-rheology"
            className="px-8 py-3 rounded-xl border border-[#334155] text-[#e2e8f0] font-semibold hover:bg-[#1e293b] transition-colors"
          >
            Interactive Graphs
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-[#94a3b8]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
