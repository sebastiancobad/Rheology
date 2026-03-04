"use client";

import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

function generateModelData(eta0: number, etaInf: number, lambda: number, n: number, a: number) {
  const data = [];
  for (let i = -2; i <= 4; i += 0.1) {
    const shearRate = Math.pow(10, i);
    // Power-law
    const K = eta0;
    const powerLaw = Math.min(K * Math.pow(shearRate, n - 1), eta0 * 10);
    // Carreau-Yasuda
    const wl = lambda * shearRate;
    const cy = etaInf + (eta0 - etaInf) * Math.pow(1 + Math.pow(wl, a), (n - 1) / a);
    // Cross
    const m = 1 - n;
    const cross = etaInf + (eta0 - etaInf) / (1 + Math.pow(lambda * shearRate, m));

    data.push({
      shearRate: parseFloat(shearRate.toFixed(4)),
      powerLaw: parseFloat(Math.max(powerLaw, 0.01).toFixed(4)),
      carreauYasuda: parseFloat(Math.max(cy, 0.01).toFixed(4)),
      cross: parseFloat(Math.max(cross, 0.01).toFixed(4)),
    });
  }
  return data;
}

export default function ViscosityModelsChart() {
  const [eta0, setEta0] = useState(10000);
  const [lambda, setLambda] = useState(1);
  const [n, setN] = useState(0.35);

  const data = useMemo(
    () => generateModelData(eta0, 0, lambda, n, 2),
    [eta0, lambda, n]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <label className="text-sm text-[#3d6285] block mb-1">
            η₀ = {(eta0/1000).toFixed(0)} kPa·s
          </label>
          <input type="range" min="1000" max="100000" step="1000" value={eta0}
            onChange={(e) => setEta0(parseFloat(e.target.value))}
            className="w-40 accent-[#134074]" />
        </div>
        <div>
          <label className="text-sm text-[#3d6285] block mb-1">
            λ = {lambda.toFixed(1)} s
          </label>
          <input type="range" min="0.01" max="10" step="0.1" value={lambda}
            onChange={(e) => setLambda(parseFloat(e.target.value))}
            className="w-40 accent-[#13315C]" />
        </div>
        <div>
          <label className="text-sm text-[#3d6285] block mb-1">
            n = {n.toFixed(2)}
          </label>
          <input type="range" min="0.1" max="0.9" step="0.05" value={n}
            onChange={(e) => setN(parseFloat(e.target.value))}
            className="w-40 accent-[#0B2545]" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(19,64,116,0.08)" />
          <XAxis dataKey="shearRate" scale="log" domain={["dataMin", "dataMax"]} type="number"
            tick={{ fill: "#3d6285", fontSize: 11 }}
            label={{ value: "Shear Rate γ̇ [s⁻¹]", position: "insideBottom", offset: -5, fill: "#3d6285" }} />
          <YAxis scale="log" domain={["auto", "auto"]} type="number"
            tick={{ fill: "#3d6285", fontSize: 11 }}
            label={{ value: "Viscosity η [Pa·s]", angle: -90, position: "insideLeft", offset: 15, fill: "#3d6285" }} />
          <Tooltip contentStyle={{
            backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid #c9d9e8",
            borderRadius: "0.75rem", color: "#0B2545", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [`${Number(value).toFixed(2)} Pa·s`]}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            labelFormatter={(label: any) => `γ̇ = ${Number(label).toFixed(2)} s⁻¹`} />
          <Legend wrapperStyle={{ color: "#3d6285", paddingTop: 16 }} />
          <Line type="monotone" dataKey="powerLaw" stroke="#8DA9C4" strokeWidth={2} strokeDasharray="5 5"
            dot={false} name="Power-Law" />
          <Line type="monotone" dataKey="carreauYasuda" stroke="#134074" strokeWidth={2.5}
            dot={false} name="Carreau-Yasuda" />
          <Line type="monotone" dataKey="cross" stroke="#0B2545" strokeWidth={2} strokeDasharray="8 4"
            dot={false} name="Cross" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
