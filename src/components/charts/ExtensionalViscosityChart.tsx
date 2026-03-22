"use client";

import { useState, useMemo } from "react";
import { Tex } from "../Math";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

/**
 * Extensional Viscosity Chart
 * Shows transient extensional viscosity η_E⁺(t) for linear vs branched polymers.
 * Linear (HDPE): follows 3η₀ (Trouton ratio) then thins
 * Branched (LDPE): strain hardening above 3η₀ line
 */

function generateExtensionalData(
  strainRate: number,
  eta0: number,
  branchingLevel: number,
) {
  const data = [];
  const troutonRef = 3 * eta0;

  for (let i = -2; i <= 1.8; i += 0.06) {
    const t = Math.pow(10, i);
    const strain = strainRate * t;

    // Linear envelope (LVE): η_E⁺ = 3η₀(1 - exp(-t/λ)) for single mode
    const lambda = 1.0; // relaxation time [s]
    const lve = troutonRef * (1 - Math.exp(-t / lambda));

    // Linear polymer (HDPE): follows LVE then slight thinning at high strain
    const thinningFactor = strain > 2 ? Math.exp(-0.15 * (strain - 2)) : 1;
    const linearEta = lve * thinningFactor;

    // Branched polymer (LDPE): strain hardening
    // Hardening onset at ε ~ 1, magnitude depends on branching
    const hardeningOnset = 0.8;
    let branchedEta = lve;
    if (strain > hardeningOnset && branchingLevel > 0) {
      const hardeningStrain = strain - hardeningOnset;
      const hardeningFactor = 1 + branchingLevel * 0.6 * (
        Math.exp(0.8 * hardeningStrain) - 1
      );
      // Cap the hardening to prevent unrealistic values
      const cappedHardening = Math.min(hardeningFactor, 1 + branchingLevel * 8);
      branchedEta = lve * cappedHardening;
    }

    // Star polymer: moderate hardening, delayed onset
    const starHardeningOnset = 1.2;
    let starEta = lve;
    if (strain > starHardeningOnset) {
      const hardeningStrain = strain - starHardeningOnset;
      const hardeningFactor = 1 + 0.3 * branchingLevel * (
        Math.exp(0.5 * hardeningStrain) - 1
      );
      const cappedHardening = Math.min(hardeningFactor, 1 + branchingLevel * 3);
      starEta = lve * cappedHardening;
    }

    data.push({
      time: parseFloat(t.toFixed(4)),
      lve: parseFloat(lve.toFixed(1)),
      linear: parseFloat(linearEta.toFixed(1)),
      branched: parseFloat(branchedEta.toFixed(1)),
      star: parseFloat(starEta.toFixed(1)),
      trouton: parseFloat(troutonRef.toFixed(1)),
      strain: parseFloat(strain.toFixed(2)),
    });
  }
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LogTick = ({ x, y, payload }: any) => {
  if (!payload?.value) return null;
  const exp = Math.log10(payload.value);
  if (!Number.isFinite(exp)) return null;
  const rounded = Math.round(exp);
  if (Math.abs(exp - rounded) > 0.01) return null;
  return (
    <text x={x} y={y + 12} textAnchor="middle" fill="#2c4a6e" fontSize={11}>
      10{rounded !== 0 && <tspan dy={-5} fontSize={8}>{rounded}</tspan>}
      {rounded === 0 && <tspan dy={-5} fontSize={8}>⁰</tspan>}
    </text>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const YLogTick = ({ x, y, payload }: any) => {
  if (!payload?.value) return null;
  const exp = Math.log10(payload.value);
  if (!Number.isFinite(exp)) return null;
  const rounded = Math.round(exp);
  if (Math.abs(exp - rounded) > 0.01) return null;
  return (
    <text x={x - 4} y={y + 4} textAnchor="end" fill="#2c4a6e" fontSize={11}>
      10<tspan dy={-5} fontSize={8}>{rounded}</tspan>
    </text>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-[#d0dde8] rounded-lg p-3 shadow-lg text-xs">
      <div className="font-semibold text-[#0B2545] mb-1">t = {label?.toFixed(3)} s</div>
      <div className="text-[#8DA9C4] mb-2">ε = {payload[0]?.payload?.strain?.toFixed(2)}</div>
      {payload.map((entry: { color: string; name: string; value: number }, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-[#2c4a6e]">{entry.name}: {entry.value?.toFixed(0)} Pa·s</span>
        </div>
      ))}
    </div>
  );
};

export default function ExtensionalViscosityChart() {
  const [strainRate, setStrainRate] = useState(1.0);
  const [branching, setBranching] = useState(1.5);
  const eta0 = 5000; // Pa·s

  const data = useMemo(
    () => generateExtensionalData(strainRate, eta0, branching),
    [strainRate, branching],
  );

  const troutonValue = 3 * eta0;

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex items-center gap-3">
          <label htmlFor="strain-rate-slider" className="text-sm text-[#2c4a6e]">
            ε̇ = <strong className="text-[#134074]">{strainRate.toFixed(1)} s⁻¹</strong>
          </label>
          <input
            id="strain-rate-slider"
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={strainRate}
            onChange={(e) => setStrainRate(parseFloat(e.target.value))}
            className="w-32 accent-[#134074]"
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="branching-slider" className="text-sm text-[#2c4a6e]">
            LCB level: <strong className="text-[#0B2545]">{branching.toFixed(1)}</strong>
          </label>
          <input
            id="branching-slider"
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={branching}
            onChange={(e) => setBranching(parseFloat(e.target.value))}
            className="w-32 accent-[#0B2545]"
          />
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d0dde8" opacity={0.5} />
          <XAxis
            dataKey="time"
            scale="log"
            domain={["dataMin", "dataMax"]}
            type="number"
            tick={LogTick}
            label={{ value: "Time [s]", position: "insideBottom", offset: -2, fill: "#2c4a6e", fontSize: 12 }}
          />
          <YAxis
            scale="log"
            domain={[1000, "auto"]}
            type="number"
            tick={YLogTick}
            label={{ value: "η_E⁺ [Pa·s]", angle: -90, position: "insideLeft", offset: 5, fill: "#2c4a6e", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value: string) => <span className="text-xs text-[#2c4a6e]">{value}</span>}
          />
          <ReferenceLine
            y={troutonValue}
            stroke="#8DA9C4"
            strokeDasharray="8 4"
            strokeWidth={1.5}
            label={{ value: "3η₀ (Trouton)", position: "right", fill: "#8DA9C4", fontSize: 10 }}
          />
          <Line
            type="monotone"
            dataKey="lve"
            name="LVE envelope"
            stroke="#8DA9C4"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{ r: 3, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="linear"
            name="Linear (HDPE)"
            stroke="#134074"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="branched"
            name="Branched (LDPE)"
            stroke="#0B2545"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="star"
            name="Star architecture"
            stroke="#6B8CAE"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Annotations */}
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#EEF4ED] rounded-lg p-3 border border-[#d0dde8]/50">
          <div className="text-[10px] font-bold text-[#8DA9C4] uppercase tracking-wide mb-1">Trouton Ratio</div>
          <div className="text-sm font-semibold text-[#0B2545]"><Tex>{`\\eta_E / \\eta = 3`}</Tex></div>
          <div className="text-[10px] text-[#2c4a6e]">Uniaxial, Newtonian limit</div>
        </div>
        <div className="bg-[#EEF4ED] rounded-lg p-3 border border-[#d0dde8]/50">
          <div className="text-[10px] font-bold text-[#134074] uppercase tracking-wide mb-1">Linear Chains</div>
          <div className="text-sm font-semibold text-[#0B2545]">No hardening</div>
          <div className="text-[10px] text-[#2c4a6e]">Follows or falls below LVE</div>
        </div>
        <div className="bg-[#EEF4ED] rounded-lg p-3 border border-[#d0dde8]/50">
          <div className="text-[10px] font-bold text-[#0B2545] uppercase tracking-wide mb-1">LCB (LDPE)</div>
          <div className="text-sm font-semibold text-[#0B2545]">Strain hardening</div>
          <div className="text-[10px] text-[#2c4a6e]"><Tex>{`\\eta_E^+`}</Tex> rises above LVE</div>
        </div>
        <div className="bg-[#EEF4ED] rounded-lg p-3 border border-[#d0dde8]/50">
          <div className="text-[10px] font-bold text-[#6B8CAE] uppercase tracking-wide mb-1">Processing</div>
          <div className="text-sm font-semibold text-[#0B2545]">Blow molding</div>
          <div className="text-[10px] text-[#2c4a6e]">Requires strain hardening</div>
        </div>
      </div>
    </div>
  );
}
