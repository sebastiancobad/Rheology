"use client";

import { motion } from "framer-motion";

function VelocityProfile({ type, color, label, sublabel }: { type: "thinning" | "newtonian" | "thickening"; color: string; label: string; sublabel: string }) {
  // Generate velocity profile points for a smooth envelope
  const N = 40;
  const W = 160; // pipe length (x)
  const H = 70; // half-height of pipe
  const cx = 100; // center x offset
  const cy = 60; // center y

  const topPoints: string[] = [];
  const botPoints: string[] = [];

  for (let i = 0; i <= N; i++) {
    const x = (i / N) * W + 20;
    const frac = (x - 20) / W; // 0..1 along pipe

    // Velocity at center vs wall
    let vMax: number;
    if (type === "newtonian") {
      vMax = 1 - ((frac * 2 - 1) ** 2) ** 1; // parabolic envelope
    } else if (type === "thinning") {
      vMax = 1 - Math.abs(frac * 2 - 1) ** 0.4; // plug-like (flatter)
    } else {
      vMax = 1 - Math.abs(frac * 2 - 1) ** 3; // pointed
    }

    // We're drawing the top and bottom envelope of velocity arrows
    const yOff = vMax * H * 0.55;
    topPoints.push(`${x},${cy - yOff}`);
    botPoints.push(`${x},${cy + yOff}`);
  }

  const envelopePath = `M ${topPoints.join(" L ")} L ${[...botPoints].reverse().join(" L ")} Z`;

  // Velocity arrows (horizontal, varying length)
  const arrows: { y: number; len: number }[] = [];
  for (let j = 0; j < 9; j++) {
    const yNorm = (j / 8) * 2 - 1; // -1 to 1
    const dist = Math.abs(yNorm);
    let v: number;
    if (type === "newtonian") v = 1 - dist ** 2;
    else if (type === "thinning") v = 1 - dist ** 0.5;
    else v = 1 - dist ** 3;
    arrows.push({ y: cy + yNorm * H * 0.48, len: Math.max(v * 110, 6) });
  }

  return (
    <div className="bg-white border border-[#d0dde8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        <h4 className="text-sm font-bold text-[#0B2545]">{label}</h4>
      </div>
      <p className="text-[10px] text-[#8DA9C4] mb-3 ml-[18px]">{sublabel}</p>

      <svg viewBox="0 0 200 120" className="w-full h-auto">
        <defs>
          <linearGradient id={`grad-${type}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.12" />
            <stop offset="50%" stopColor={color} stopOpacity="0.06" />
            <stop offset="100%" stopColor={color} stopOpacity="0.12" />
          </linearGradient>
          <marker id={`arrow-${type}`} viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0.5 L5,3 L0,5.5 Z" fill={color} opacity="0.7" />
          </marker>
        </defs>

        {/* Pipe walls — thick with subtle shadow */}
        <rect x="15" y="8" width="170" height="5" rx="2.5" fill="#0B2545" />
        <rect x="15" y="107" width="170" height="5" rx="2.5" fill="#0B2545" />
        <rect x="15" y="13" width="170" height="1" fill="#0B2545" opacity="0.1" />

        {/* Velocity envelope fill */}
        <motion.path
          d={envelopePath}
          fill={`url(#grad-${type})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Velocity arrows */}
        {arrows.map((a, i) => (
          <motion.line
            key={i}
            x1="35"
            y1={a.y}
            x2={35 + a.len}
            y2={a.y}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            markerEnd={`url(#arrow-${type})`}
            initial={{ x2: 35 }}
            animate={{ x2: 35 + a.len }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* Envelope outline */}
        <motion.path
          d={envelopePath}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity={0.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Axis labels */}
        <text x="100" y="5" textAnchor="middle" fill="#8DA9C4" fontSize="6" fontFamily="Inter" opacity="0.6">wall</text>
        <text x="100" y="118" textAnchor="middle" fill="#8DA9C4" fontSize="6" fontFamily="Inter" opacity="0.6">wall</text>
      </svg>
    </div>
  );
}

export default function FlowTypesDiagram() {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      <VelocityProfile type="thinning" color="#134074" label="Shear-Thinning" sublabel="n < 1 — Plug-like profile" />
      <VelocityProfile type="newtonian" color="#8DA9C4" label="Newtonian" sublabel="n = 1 — Parabolic profile" />
      <VelocityProfile type="thickening" color="#0B2545" label="Shear-Thickening" sublabel="n > 1 — Pointed profile" />
    </div>
  );
}
