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
} from "recharts";

function generateFlowCurveData(nValue: number) {
  const points = [];
  for (let i = -1; i <= 3; i += 0.1) {
    const shearRate = Math.pow(10, i);
    // Power-law: η = K * γ̇^(n-1)
    const K = 1000;
    const viscosity = K * Math.pow(shearRate, nValue - 1);
    points.push({
      shearRate: parseFloat(shearRate.toFixed(4)),
      viscosity: parseFloat(viscosity.toFixed(4)),
    });
  }
  return points;
}

export default function FlowCurveChart() {
  const [nPseudo, setNPseudo] = useState(0.4);
  const [nDilatant, setNDilatant] = useState(1.5);

  const data = useMemo(() => {
    const pseudo = generateFlowCurveData(nPseudo);
    const newtonian = generateFlowCurveData(1.0);
    const dilatant = generateFlowCurveData(nDilatant);

    return pseudo.map((p, i) => ({
      shearRate: p.shearRate,
      pseudoplastic: p.viscosity,
      newtonian: newtonian[i].viscosity,
      dilatant: dilatant[i].viscosity,
    }));
  }, [nPseudo, nDilatant]);

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <label className="text-sm text-[#3d6285] block mb-1">
            Pseudoplastic <span className="math">n</span> = {nPseudo.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={nPseudo}
            onChange={(e) => setNPseudo(parseFloat(e.target.value))}
            className="w-48 accent-[#134074]"
          />
        </div>
        <div>
          <label className="text-sm text-[#3d6285] block mb-1">
            Dilatant <span className="math">n</span> = {nDilatant.toFixed(2)}
          </label>
          <input
            type="range"
            min="1.1"
            max="2.0"
            step="0.05"
            value={nDilatant}
            onChange={(e) => setNDilatant(parseFloat(e.target.value))}
            className="w-48 accent-[#13315C]"
          />
        </div>
      </div>

      <div className="text-xs text-[#3d6285] mb-2">
        Power-law model: <span className="math">η = K · γ̇</span>
        <sup>(<span className="math">n</span>−1)</sup>, K = 1000 Pa·s
        <sup>n</sup>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(19,64,116,0.08)" />
          <XAxis
            dataKey="shearRate"
            scale="log"
            domain={["dataMin", "dataMax"]}
            type="number"
            tick={{ fill: "#3d6285", fontSize: 11 }}
            label={{
              value: "Shear Rate γ̇ [s⁻¹]",
              position: "insideBottom",
              offset: -5,
              fill: "#3d6285",
            }}
          />
          <YAxis
            scale="log"
            domain={["auto", "auto"]}
            type="number"
            tick={{ fill: "#3d6285", fontSize: 11 }}
            label={{
              value: "Viscosity η [Pa·s]",
              angle: -90,
              position: "insideLeft",
              offset: 15,
              fill: "#3d6285",
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.95)",
              border: "1px solid #c9d9e8",
              borderRadius: "0.75rem",
              color: "#0B2545",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [
              value != null ? `${Number(value).toFixed(2)} Pa·s` : "—",
            ]}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            labelFormatter={(label: any) =>
              `γ̇ = ${Number(label).toFixed(2)} s⁻¹`
            }
          />
          <Legend
            wrapperStyle={{ color: "#3d6285", paddingTop: 16 }}
          />
          <Line
            type="monotone"
            dataKey="pseudoplastic"
            stroke="#134074"
            strokeWidth={2}
            dot={false}
            name={`Pseudoplastic (n=${nPseudo.toFixed(2)})`}
          />
          <Line
            type="monotone"
            dataKey="newtonian"
            stroke="#0B2545"
            strokeWidth={2}
            dot={false}
            name="Newtonian (n=1.00)"
          />
          <Line
            type="monotone"
            dataKey="dilatant"
            stroke="#13315C"
            strokeWidth={2}
            dot={false}
            name={`Dilatant (n=${nDilatant.toFixed(2)})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
