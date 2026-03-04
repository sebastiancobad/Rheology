export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background decoration — subtle radial gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#134074]/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#13315C]/[0.02] blur-[100px]" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(19,64,116,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(19,64,116,0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Horizontal line accent */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#134074]/10 to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e4ede3] border border-[#c9d9e8] text-[#3d6285] text-[13px] font-medium mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#134074] animate-pulse" />
          Interactive Educational Platform
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-8xl font-bold text-[#0B2545] mb-6 leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Polymer{" "}
          <span className="gradient-text">
            Rheology
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#8DA9C4] max-w-xl mx-auto mb-12 leading-relaxed font-light">
          From Newtonian fundamentals to advanced viscoelastic characterization
          &mdash; explore the science of flow and deformation in polymeric
          systems through interactive visualizations and rigorous theory.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#fundamentals"
            className="group relative px-7 py-3 rounded-full bg-[#134074] text-white text-sm font-medium hover:bg-[#0B2545] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Start Learning
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
          </a>
          <a
            href="#polymer-rheology"
            className="px-7 py-3 rounded-full border border-[#8DA9C4] text-[#13315C] text-sm font-medium hover:bg-[#e4ede3] hover:border-[#8DA9C4] transition-all duration-300"
          >
            Interactive Graphs
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] text-[#8DA9C4] uppercase tracking-[0.2em] font-medium">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#8DA9C4] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
