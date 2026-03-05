"use client";

import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Area, ComposedChart,
  ReferenceLine,
} from "recharts";

function generateModelData(eta0: number, etaInf: number, lambda: number, n: number, a: number) {
  const data = [];
  for (let i = -2; i <= 4; i += 0.1) {
    const shearRate = Math.pow(10, i);
    const K = eta0;
    const powerLaw = Math.min(K * Math.pow(shearRate, n - 1), eta0 * 10);
    const wl = lambda * shearRate;
    const cy = etaInf + (eta0 - etaInf) * Math.pow(1 + Math.pow(wl, a), (n - 1) / a);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomActiveDot = (props: any) => {
  const { cx, cy, stroke } = props;
  if (!cx || !cy) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r="8" fill={stroke} opacity="0.12" />
      <circle cx={cx} cy={cy} r="5" fill="white" stroke={stroke} strokeWidth="2" />
      <circle cx={cx} cy={cy} r="2" fill={stroke} />
    </g>
  );
};

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
      <div className="flex flex-wrap gap-5 mb-6">
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-semibold text-[#134074] block mb-2 tracking-wide uppercase">
            η₀ = {(eta0 / 1000).toFixed(0)} kPa·s
          </label>
          <input type="range" min="1000" max="100000" step="1000" value={eta0}
            onChange={(e) => setEta0(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#134074] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#134074] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer" />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-semibold text-[#13315C] block mb-2 tracking-wide uppercase">
            λ = {lambda.toFixed(1)} s
          </label>
          <input type="range" min="0.01" max="10" step="0.1" value={lambda}
            onChange={(e) => setLambda(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#13315C] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#13315C] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer" />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-semibold text-[#0B2545] block mb-2 tracking-wide uppercase">
            n = {n.toFixed(2)}
          </label>
          <input type="range" min="0.1" max="0.9" step="0.05" value={n}
            onChange={(e) => setN(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#0B2545] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0B2545] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="cyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#134074" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#134074" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(19,64,116,0.06)" />
          <ReferenceLine y={eta0} stroke="#134074" strokeDasharray="4 4" strokeWidth={1}
            label={{ value: "η₀", fill: "#134074", fontSize: 11, fontWeight: 600, position: "left" }} />
          <XAxis dataKey="shearRate" scale="log" domain={["dataMin", "dataMax"]} type="number"
            tick={{ fill: "#2c4a6e", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#d0dde8" }} tickLine={{ stroke: "#d0dde8" }}
            label={{ value: "Shear Rate γ̇ [s⁻¹]", position: "insideBottom", offset: -5, fill: "#0B2545", fontSize: 12, fontWeight: 500 }} />
          <YAxis scale="log" domain={["auto", "auto"]} type="number"
            tick={{ fill: "#2c4a6e", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#d0dde8" }} tickLine={{ stroke: "#d0dde8" }}
            label={{ value: "Viscosity η [Pa·s]", angle: -90, position: "insideLeft", offset: 15, fill: "#0B2545", fontSize: 12, fontWeight: 500 }} />
          <Tooltip contentStyle={{
            backgroundColor: "rgba(255,255,255,0.97)", border: "1px solid #d0dde8",
            borderRadius: "0.75rem", color: "#0B2545", boxShadow: "0 8px 24px rgba(11,37,69,0.12)",
            fontSize: 12, fontFamily: "Inter",
          }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [`${Number(value).toFixed(2)} Pa·s`]}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            labelFormatter={(label: any) => `γ̇ = ${Number(label).toFixed(2)} s⁻¹`} />
          <Legend wrapperStyle={{ color: "#2c4a6e", paddingTop: 16, fontSize: 12 }} />
          <Area type="monotone" dataKey="carreauYasuda" fill="url(#cyGrad)" stroke="none" />
          <Line type="monotone" dataKey="powerLaw" stroke="#8DA9C4" strokeWidth={2} strokeDasharray="6 4"
            dot={false} activeDot={<CustomActiveDot />} name="Power-Law" />
          <Line type="monotone" dataKey="carreauYasuda" stroke="#134074" strokeWidth={2.5}
            dot={false} activeDot={<CustomActiveDot />} name="Carreau-Yasuda" />
          <Line type="monotone" dataKey="cross" stroke="#0B2545" strokeWidth={2} strokeDasharray="8 4"
            dot={false} activeDot={<CustomActiveDot />} name="Cross" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
