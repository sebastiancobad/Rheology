export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background decoration — subtle radial gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#818cf8]/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#c084fc]/[0.02] blur-[100px]" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(129,140,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Horizontal line accent */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#818cf8]/10 to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa] text-[13px] font-medium mb-10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8] animate-pulse" />
          Interactive Educational Platform
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-8xl font-bold text-[#fafafa] mb-6 leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Polymer{" "}
          <span className="gradient-text">
            Rheology
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#71717a] max-w-xl mx-auto mb-12 leading-relaxed font-light">
          From Newtonian fundamentals to advanced viscoelastic characterization
          &mdash; explore the science of flow and deformation in polymeric
          systems through interactive visualizations and rigorous theory.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#fundamentals"
            className="group relative px-7 py-3 rounded-full bg-[#818cf8] text-white text-sm font-medium hover:bg-[#6366f1] transition-all duration-300 shadow-[0_0_24px_-6px_rgba(129,140,248,0.4)] hover:shadow-[0_0_32px_-4px_rgba(129,140,248,0.5)]"
          >
            Start Learning
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
          </a>
          <a
            href="#polymer-rheology"
            className="px-7 py-3 rounded-full border border-white/[0.08] text-[#e4e4e7] text-sm font-medium hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
          >
            Interactive Graphs
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] text-[#71717a] uppercase tracking-[0.2em] font-medium">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#71717a] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
