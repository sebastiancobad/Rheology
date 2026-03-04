"use client";

import { motion } from "framer-motion";

function ShearThinningFlow() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-auto">
      {/* Walls */}
      <rect x="10" y="10" width="180" height="4" fill="#0B2545" rx="2" />
      <rect x="10" y="106" width="180" height="4" fill="#0B2545" rx="2" />
      {/* Flow lines - faster at center */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = 24 + i * 12;
        const speed = 1 - Math.abs(i - 3) / 4;
        return (
          <motion.g key={i}>
            <motion.line
              x1="20" y1={y} x2={20 + speed * 140} y2={y}
              stroke="#134074" strokeWidth="2" strokeLinecap="round"
              initial={{ x2: 20 }}
              animate={{ x2: 20 + speed * 140 }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
            />
            <motion.polygon
              points={`${20 + speed * 140},${y - 3} ${20 + speed * 140 + 8},${y} ${20 + speed * 140},${y + 3}`}
              fill="#134074"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
            />
          </motion.g>
        );
      })}
      {/* Label */}
      <text x="100" y="118" textAnchor="middle" fill="#8DA9C4" fontSize="8" fontFamily="Inter">
        Plug-like profile (shear-thinning)
      </text>
    </svg>
  );
}

function NewtonianFlow() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-auto">
      <rect x="10" y="10" width="180" height="4" fill="#0B2545" rx="2" />
      <rect x="10" y="106" width="180" height="4" fill="#0B2545" rx="2" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = 24 + i * 12;
        const speed = 1 - ((i - 3) / 3) ** 2;
        return (
          <motion.g key={i}>
            <motion.line
              x1="20" y1={y} x2={20 + speed * 130} y2={y}
              stroke="#8DA9C4" strokeWidth="2" strokeLinecap="round"
              initial={{ x2: 20 }}
              animate={{ x2: 20 + speed * 130 }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
            />
            <motion.polygon
              points={`${20 + speed * 130},${y - 3} ${20 + speed * 130 + 8},${y} ${20 + speed * 130},${y + 3}`}
              fill="#8DA9C4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
            />
          </motion.g>
        );
      })}
      <text x="100" y="118" textAnchor="middle" fill="#8DA9C4" fontSize="8" fontFamily="Inter">
        Parabolic profile (Newtonian)
      </text>
    </svg>
  );
}

function ShearThickeningFlow() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-auto">
      <rect x="10" y="10" width="180" height="4" fill="#0B2545" rx="2" />
      <rect x="10" y="106" width="180" height="4" fill="#0B2545" rx="2" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = 24 + i * 12;
        const dist = Math.abs(i - 3) / 3;
        const speed = 1 - dist ** 0.5;
        return (
          <motion.g key={i}>
            <motion.line
              x1="20" y1={y} x2={20 + speed * 100} y2={y}
              stroke="#13315C" strokeWidth="2" strokeLinecap="round"
              initial={{ x2: 20 }}
              animate={{ x2: 20 + speed * 100 }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
            />
            <motion.polygon
              points={`${20 + speed * 100},${y - 3} ${20 + speed * 100 + 8},${y} ${20 + speed * 100},${y + 3}`}
              fill="#13315C"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
            />
          </motion.g>
        );
      })}
      <text x="100" y="118" textAnchor="middle" fill="#8DA9C4" fontSize="8" fontFamily="Inter">
        Pointed profile (shear-thickening)
      </text>
    </svg>
  );
}

export default function FlowTypesDiagram() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white border border-[#c9d9e8] rounded-2xl p-5">
        <h4 className="text-sm font-bold text-[#0B2545] mb-3">Shear-Thinning (n &lt; 1)</h4>
        <ShearThinningFlow />
      </div>
      <div className="bg-white border border-[#c9d9e8] rounded-2xl p-5">
        <h4 className="text-sm font-bold text-[#0B2545] mb-3">Newtonian (n = 1)</h4>
        <NewtonianFlow />
      </div>
      <div className="bg-white border border-[#c9d9e8] rounded-2xl p-5">
        <h4 className="text-sm font-bold text-[#0B2545] mb-3">Shear-Thickening (n &gt; 1)</h4>
        <ShearThickeningFlow />
      </div>
    </div>
  );
}
