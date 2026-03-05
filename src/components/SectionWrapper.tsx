import { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  subtitle: string;
  accent?: string;
  number?: string;
  alternate?: boolean;
  children: ReactNode;
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  accent = "#134074",
  number,
  alternate = false,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative ${
        alternate ? "section-alt" : "section-light"
      }`}
    >
      {/* Film grain overlay */}
      <div className="grain-subtle" />

      {/* Editorial divider */}
      <div className="absolute top-0 left-0 right-0 divider-gradient" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          {/* Section number + badge row */}
          <div className="flex items-center justify-center gap-3 mb-5">
            {number && (
              <span className="section-number">{number}</span>
            )}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase"
              style={{
                color: accent,
                backgroundColor: `${accent}0a`,
                border: `1px solid ${accent}18`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {subtitle}
            </div>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2545] tracking-[-0.02em] leading-[1.1]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          {/* Decorative underline */}
          <div className="mt-6 flex justify-center">
            <div className="w-12 h-0.5 rounded-full bg-gradient-to-r from-[#134074] to-[#8DA9C4]" />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
