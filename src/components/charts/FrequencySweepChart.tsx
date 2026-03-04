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

function generateFrequencySweepData(
  crossoverFreq: number,
  plateauModulus: number
) {
  const data = [];
  for (let i = -2; i <= 2.5; i += 0.08) {
    const omega = Math.pow(10, i);
    const omegaRel = omega / crossoverFreq;

    // Single Maxwell model: G' = G_N * (ωλ)^2 / (1 + (ωλ)^2), G'' = G_N * ωλ / (1 + (ωλ)^2)
    const wl = omegaRel;
    const wl2 = wl * wl;
    const denom = 1 + wl2;

    const gPrime = plateauModulus * wl2 / denom;
    const gDoublePrime = plateauModulus * wl / denom;
    const tanDelta = gDoublePrime / gPrime;

    data.push({
      omega: parseFloat(omega.toFixed(4)),
      gPrime: parseFloat(gPrime.toFixed(2)),
      gDoublePrime: parseFloat(gDoublePrime.toFixed(2)),
      tanDelta: parseFloat(Math.min(tanDelta, 100).toFixed(3)),
    });
  }
  return data;
}

export default function FrequencySweepChart() {
  const [crossoverFreq, setCrossoverFreq] = useState(1.0);
  const [plateauModulus, setPlateauModulus] = useState(100000);
  const [showTanDelta, setShowTanDelta] = useState(false);

  const data = useMemo(
    () => generateFrequencySweepData(crossoverFreq, plateauModulus),
    [crossoverFreq, plateauModulus]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <label className="text-sm text-[#6b7280] block mb-1">
            Crossover Frequency: {crossoverFreq.toFixed(1)} rad/s
          </label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={crossoverFreq}
            onChange={(e) => setCrossoverFreq(parseFloat(e.target.value))}
            className="w-48 accent-[#4f46e5]"
          />
        </div>
        <div>
          <label className="text-sm text-[#6b7280] block mb-1">
            Plateau Modulus G<sub>N</sub><sup>0</sup>:{" "}
            {(plateauModulus / 1000).toFixed(0)} kPa
          </label>
          <input
            type="range"
            min="10000"
            max="500000"
            step="10000"
            value={plateauModulus}
            onChange={(e) => setPlateauModulus(parseFloat(e.target.value))}
            className="w-48 accent-[#7c3aed]"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-[#6b7280] cursor-pointer">
            <input
              type="checkbox"
              checked={showTanDelta}
              onChange={(e) => setShowTanDelta(e.target.checked)}
              className="accent-[#d97706]"
            />
            Show tan(δ)
          </label>
        </div>
      </div>

      <div className="text-xs text-[#6b7280] mb-2">
        Single Maxwell Element: G&apos;(ω) = G<sub>N</sub><sup>0</sup> · (ωλ)² / [1 + (ωλ)²], &nbsp;
        G&apos;&apos;(ω) = G<sub>N</sub><sup>0</sup> · ωλ / [1 + (ωλ)²]
      </div>

      <ResponsiveContainer width="100%" height={420}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis
            dataKey="omega"
            scale="log"
            domain={["dataMin", "dataMax"]}
            type="number"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            label={{
              value: "Angular Frequency ω [rad/s]",
              position: "insideBottom",
              offset: -5,
              fill: "#6b7280",
            }}
          />
          <YAxis
            yAxisId="modulus"
            scale="log"
            domain={[1, "auto"]}
            type="number"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            label={{
              value: "G', G'' [Pa]",
              angle: -90,
              position: "insideLeft",
              offset: 15,
              fill: "#6b7280",
            }}
          />
          {showTanDelta && (
            <YAxis
              yAxisId="tanDelta"
              orientation="right"
              scale="log"
              domain={[0.01, 100]}
              type="number"
              tick={{ fill: "#d97706", fontSize: 12 }}
              label={{
                value: "tan(δ)",
                angle: 90,
                position: "insideRight",
                offset: 10,
                fill: "#d97706",
              }}
            />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.95)",
              border: "1px solid #e4e4e7",
              borderRadius: "0.75rem",
              color: "#3f3f46",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any, name: any) => {
              const v = Number(value);
              if (name === "tan(δ)") return [v.toFixed(3), name];
              return [`${v.toFixed(1)} Pa`, name];
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            labelFormatter={(label: any) =>
              `ω = ${Number(label).toFixed(2)} rad/s`
            }
          />
          <Legend wrapperStyle={{ color: "#6b7280", paddingTop: 16 }} />
          <ReferenceLine
            x={crossoverFreq}
            yAxisId="modulus"
            stroke="#9ca3af"
            strokeDasharray="5 5"
            label={{
              value: "Crossover",
              fill: "#6b7280",
              fontSize: 11,
              position: "top",
            }}
          />
          <Line
            yAxisId="modulus"
            type="monotone"
            dataKey="gPrime"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={false}
            name="G' (Storage)"
          />
          <Line
            yAxisId="modulus"
            type="monotone"
            dataKey="gDoublePrime"
            stroke="#a855f7"
            strokeWidth={2}
            dot={false}
            name="G'' (Loss)"
          />
          {showTanDelta && (
            <Line
              yAxisId="tanDelta"
              type="monotone"
              dataKey="tanDelta"
              stroke="#d97706"
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={false}
              name="tan(δ)"
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
        <div className="bg-[#f4f4f5] rounded-xl p-4 border border-[#e4e4e7]">
          <div className="text-[#4f46e5] font-semibold mb-1 text-xs">
            ω &lt; ω<sub>c</sub> (Terminal zone)
          </div>
          <p className="text-[#9ca3af] text-xs">
            G&apos;&apos; &gt; G&apos;: Viscous (liquid-like) behavior dominates. Polymer
            chains have time to relax fully.
          </p>
        </div>
        <div className="bg-[#f4f4f5] rounded-xl p-4 border border-[#4f46e5]/15">
          <div className="text-[#18181b] font-semibold mb-1 text-xs">
            ω = ω<sub>c</sub> (Crossover)
          </div>
          <p className="text-[#9ca3af] text-xs">
            G&apos; = G&apos;&apos;, tan(δ) = 1. The relaxation time λ = 1/ω<sub>c</sub>. A
            key indicator of molecular weight.
          </p>
        </div>
        <div className="bg-[#f4f4f5] rounded-xl p-4 border border-[#e4e4e7]">
          <div className="text-[#9333ea] font-semibold mb-1 text-xs">
            ω &gt; ω<sub>c</sub> (Plateau zone)
          </div>
          <p className="text-[#9ca3af] text-xs">
            G&apos; &gt; G&apos;&apos;: Elastic (solid-like) behavior dominates. Chains are
            entangled and cannot relax within the deformation timescale.
          </p>
        </div>
      </div>
    </div>
  );
}
