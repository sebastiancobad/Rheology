"use client";

import { useState, useMemo } from "react";
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
 * Relaxation Spectrum Chart
 * Shows continuous relaxation spectrum H(λ) and discrete spectrum {g_i, λ_i}.
 * Demonstrates how MWD breadth and LCB affect the spectrum.
 */

function generateSpectrumData(
  peakLambda: number,
  mwdBreadth: number,
  lcbContribution: number,
) {
  const data = [];

  for (let i = -4; i <= 3; i += 0.06) {
    const lambda = Math.pow(10, i);

    // Main relaxation spectrum: log-normal distribution
    const logLambda = Math.log10(lambda);
    const logPeak = Math.log10(peakLambda);
    const sigma = 0.4 + mwdBreadth * 0.6; // broader MWD = broader spectrum
    const mainPeak = Math.exp(
      -0.5 * Math.pow((logLambda - logPeak) / sigma, 2),
    );

    // Rouse modes at short times (high frequency)
    const rousePeak = 0.15 * Math.exp(
      -0.5 * Math.pow((logLambda - (logPeak - 2.5)) / 0.5, 2),
    );

    // LCB contribution: additional slow modes
    const lcbPeak = lcbContribution * 0.4 * Math.exp(
      -0.5 * Math.pow((logLambda - (logPeak + 1.2)) / 0.7, 2),
    );

    // Plateau modulus contribution
    const gN0 = 2e5; // Pa (typical for PE)
    const H = gN0 * (mainPeak + rousePeak + lcbPeak);

    // G'(ω) and G''(ω) from spectrum (for the corresponding frequency)
    const omega = 1 / lambda;
    const wl = omega * peakLambda;
    const wl2 = wl * wl;

    // Multi-mode approximation
    const gPrime = gN0 * wl2 / (1 + wl2) * (1 + 0.3 * lcbContribution * wl2 / (1 + 4 * wl2));
    const gDoublePrime = gN0 * wl / (1 + wl2) * (1 + 0.15 * lcbContribution * wl / (1 + 4 * wl2));

    if (H > 1) {
      data.push({
        lambda: parseFloat(lambda.toFixed(6)),
        H: parseFloat(H.toFixed(1)),
        mainComponent: parseFloat((gN0 * mainPeak).toFixed(1)),
        rouseComponent: parseFloat((gN0 * rousePeak).toFixed(1)),
        lcbComponent: lcbContribution > 0.1 ? parseFloat((gN0 * lcbPeak).toFixed(1)) : undefined,
        gPrime: parseFloat(gPrime.toFixed(1)),
        gDoublePrime: parseFloat(gDoublePrime.toFixed(1)),
      });
    }
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
      10<tspan dy={-5} fontSize={8}>{rounded}</tspan>
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
      <div className="font-semibold text-[#0B2545] mb-1">λ = {label?.toExponential(2)} s</div>
      {payload.map((entry: { color: string; name: string; value: number }, i: number) => (
        entry.value != null && (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[#2c4a6e]">{entry.name}: {entry.value?.toFixed(0)} Pa</span>
          </div>
        )
      ))}
    </div>
  );
};

export default function RelaxationSpectrumChart() {
  const [peakLambda, setPeakLambda] = useState(0.1); // terminal relaxation time
  const [mwdBreadth, setMwdBreadth] = useState(1.0); // polydispersity effect
  const [lcb, setLcb] = useState(0); // long-chain branching

  const data = useMemo(
    () => generateSpectrumData(peakLambda, mwdBreadth, lcb),
    [peakLambda, mwdBreadth, lcb],
  );

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex items-center gap-3">
          <label htmlFor="peak-lambda" className="text-sm text-[#2c4a6e]">
            λ<sub>d</sub> = <strong className="text-[#134074]">{peakLambda.toFixed(2)} s</strong>
          </label>
          <input
            id="peak-lambda"
            type="range"
            min="-2"
            max="1"
            step="0.1"
            value={Math.log10(peakLambda)}
            onChange={(e) => setPeakLambda(Math.pow(10, parseFloat(e.target.value)))}
            className="w-28 accent-[#134074]"
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="mwd-slider" className="text-sm text-[#2c4a6e]">
            Mw/Mn: <strong className="text-[#13315C]">{(1 + mwdBreadth * 3).toFixed(1)}</strong>
          </label>
          <input
            id="mwd-slider"
            type="range"
            min="0.2"
            max="3"
            step="0.1"
            value={mwdBreadth}
            onChange={(e) => setMwdBreadth(parseFloat(e.target.value))}
            className="w-28 accent-[#13315C]"
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="lcb-slider" className="text-sm text-[#2c4a6e]">
            LCB: <strong className="text-[#0B2545]">{lcb > 0.1 ? "Yes" : "None"}</strong>
          </label>
          <input
            id="lcb-slider"
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={lcb}
            onChange={(e) => setLcb(parseFloat(e.target.value))}
            className="w-28 accent-[#0B2545]"
          />
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d0dde8" opacity={0.5} />
          <XAxis
            dataKey="lambda"
            scale="log"
            domain={["dataMin", "dataMax"]}
            type="number"
            tick={LogTick}
            label={{ value: "λ [s]", position: "insideBottom", offset: -2, fill: "#2c4a6e", fontSize: 12 }}
          />
          <YAxis
            scale="log"
            domain={["auto", "auto"]}
            type="number"
            tick={YLogTick}
            label={{ value: "H(λ) [Pa]", angle: -90, position: "insideLeft", offset: 5, fill: "#2c4a6e", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value: string) => <span className="text-xs text-[#2c4a6e]">{value}</span>}
          />
          <ReferenceLine
            x={peakLambda}
            stroke="#134074"
            strokeDasharray="4 4"
            strokeWidth={1}
            label={{ value: "λ_d", position: "top", fill: "#134074", fontSize: 10 }}
          />
          <Line
            type="monotone"
            dataKey="H"
            name="H(λ) total"
            stroke="#0B2545"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="mainComponent"
            name="Reptation modes"
            stroke="#134074"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            dot={false}
            activeDot={{ r: 3, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="rouseComponent"
            name="Rouse modes"
            stroke="#8DA9C4"
            strokeWidth={1.5}
            strokeDasharray="3 3"
            dot={false}
            activeDot={{ r: 3, strokeWidth: 0 }}
          />
          {lcb > 0.1 && (
            <Line
              type="monotone"
              dataKey="lcbComponent"
              name="LCB slow modes"
              stroke="#E8927C"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      {/* Info cards */}
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#EEF4ED] rounded-lg p-3 border border-[#d0dde8]/50">
          <div className="text-[10px] font-bold text-[#0B2545] uppercase tracking-wide mb-1">Terminal Mode</div>
          <div className="text-sm font-semibold text-[#134074]">λ<sub>d</sub> ∝ Mw<sup>3.4</sup></div>
          <div className="text-[10px] text-[#2c4a6e]">Longest relaxation time</div>
        </div>
        <div className="bg-[#EEF4ED] rounded-lg p-3 border border-[#d0dde8]/50">
          <div className="text-[10px] font-bold text-[#13315C] uppercase tracking-wide mb-1">Broad MWD</div>
          <div className="text-sm font-semibold text-[#13315C]">Wider H(λ)</div>
          <div className="text-[10px] text-[#2c4a6e]">More relaxation modes</div>
        </div>
        <div className="bg-[#EEF4ED] rounded-lg p-3 border border-[#d0dde8]/50">
          <div className="text-[10px] font-bold text-[#8DA9C4] uppercase tracking-wide mb-1">Rouse Modes</div>
          <div className="text-sm font-semibold text-[#8DA9C4]">Short λ</div>
          <div className="text-[10px] text-[#2c4a6e]">Sub-entanglement dynamics</div>
        </div>
        <div className="bg-[#EEF4ED] rounded-lg p-3 border border-[#d0dde8]/50">
          <div className="text-[10px] font-bold text-[#E8927C] uppercase tracking-wide mb-1">LCB Effect</div>
          <div className="text-sm font-semibold text-[#E8927C]">Extra slow modes</div>
          <div className="text-[10px] text-[#2c4a6e]">Branch-point withdrawal</div>
        </div>
      </div>
    </div>
  );
}
