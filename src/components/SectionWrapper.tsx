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
  accent = "#38bdf8",
  children,
}: Props) {
  return (
    <section id={id} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{
              color: accent,
              backgroundColor: `${accent}15`,
              border: `1px solid ${accent}30`,
            }}
          >
            {subtitle}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f1f5f9]">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
