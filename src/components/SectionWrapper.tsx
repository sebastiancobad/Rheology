import { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  subtitle: string;
  accent?: string;
  children: ReactNode;
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  accent = "#4f46e5",
  children,
}: Props) {
  return (
    <section id={id} className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Top separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e4e4e7] to-transparent" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase mb-5"
            style={{
              color: accent,
              backgroundColor: `${accent}08`,
              border: `1px solid ${accent}15`,
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
            {subtitle}
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181b] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
