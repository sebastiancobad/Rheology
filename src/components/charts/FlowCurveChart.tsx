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
  Area,
  ComposedChart,
} from "recharts";

function generateFlowCurveData(nValue: number) {
  const points = [];
  for (let i = -1; i <= 3; i += 0.1) {
    const shearRate = Math.pow(10, i);
    const K = 1000;
    const viscosity = K * Math.pow(shearRate, nValue - 1);
    points.push({
      shearRate: parseFloat(shearRate.toFixed(4)),
      viscosity: parseFloat(viscosity.toFixed(4)),
    });
  }
  return points;
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
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-[#134074] block mb-2 tracking-wide uppercase">
            Pseudoplastic n = {nPseudo.toFixed(2)}
          </label>
          <div className="relative">
            <input
              type="range" min="0.1" max="0.9" step="0.05" value={nPseudo}
              onChange={(e) => setNPseudo(parseFloat(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#134074] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#134074] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-[#13315C] block mb-2 tracking-wide uppercase">
            Dilatant n = {nDilatant.toFixed(2)}
          </label>
          <div className="relative">
            <input
              type="range" min="1.1" max="2.0" step="0.05" value={nDilatant}
              onChange={(e) => setNDilatant(parseFloat(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#13315C] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#13315C] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="text-xs text-[#3d6285] mb-3 bg-[#EEF4ED] rounded-lg px-3 py-2 inline-block">
        Power-law model: <span className="font-semibold text-[#134074]">η = K · γ̇<sup>(n−1)</sup></span>, K = 1000 Pa·s<sup>n</sup>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="flowPseudoGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#134074" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#134074" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(19,64,116,0.06)" />
          <XAxis
            dataKey="shearRate" scale="log" domain={["dataMin", "dataMax"]} type="number"
            tick={{ fill: "#3d6285", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#c9d9e8" }}
            tickLine={{ stroke: "#c9d9e8" }}
            label={{ value: "Shear Rate γ̇ [s⁻¹]", position: "insideBottom", offset: -5, fill: "#0B2545", fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            scale="log" domain={["auto", "auto"]} type="number"
            tick={{ fill: "#3d6285", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#c9d9e8" }}
            tickLine={{ stroke: "#c9d9e8" }}
            label={{ value: "Viscosity η [Pa·s]", angle: -90, position: "insideLeft", offset: 15, fill: "#0B2545", fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.97)", border: "1px solid #c9d9e8",
              borderRadius: "0.75rem", color: "#0B2545", boxShadow: "0 8px 24px rgba(11,37,69,0.12)",
              fontSize: 12, fontFamily: "Inter",
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [value != null ? `${Number(value).toFixed(2)} Pa·s` : "—"]}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            labelFormatter={(label: any) => `γ̇ = ${Number(label).toFixed(2)} s⁻¹`}
          />
          <Legend wrapperStyle={{ color: "#3d6285", paddingTop: 16, fontSize: 12 }} />
          <Area type="monotone" dataKey="pseudoplastic" fill="url(#flowPseudoGrad)" stroke="none" />
          <Line type="monotone" dataKey="pseudoplastic" stroke="#134074" strokeWidth={2.5}
            dot={false} activeDot={<CustomActiveDot />} name={`Pseudoplastic (n=${nPseudo.toFixed(2)})`} />
          <Line type="monotone" dataKey="newtonian" stroke="#8DA9C4" strokeWidth={2}
            dot={false} activeDot={<CustomActiveDot />} name="Newtonian (n=1.00)" />
          <Line type="monotone" dataKey="dilatant" stroke="#0B2545" strokeWidth={2}
            dot={false} activeDot={<CustomActiveDot />} name={`Dilatant (n=${nDilatant.toFixed(2)})`} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
