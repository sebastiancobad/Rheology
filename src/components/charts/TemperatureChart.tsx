"use client";

import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
  Area, ComposedChart,
} from "recharts";

function generateTempData(Tref: number, C1: number, C2: number, Ea: number) {
  const data = [];
  const R = 8.314;
  for (let T = 100; T <= 300; T += 2) {
    const Tk = T + 273.15;
    const TrefK = Tref + 273.15;
    const logAtWLF = -C1 * (T - Tref) / (C2 + T - Tref);
    const logAtArr = (Ea * 1000 / (R * 2.303)) * (1 / Tk - 1 / TrefK);
    data.push({
      temperature: T,
      wlf: parseFloat(logAtWLF.toFixed(4)),
      arrhenius: parseFloat(logAtArr.toFixed(4)),
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

export default function TemperatureChart() {
  const [Tref, setTref] = useState(150);
  const [C1, setC1] = useState(8.86);
  const [C2, setC2] = useState(101.6);
  const [Ea, setEa] = useState(40);

  const data = useMemo(() => generateTempData(Tref, C1, C2, Ea), [Tref, C1, C2, Ea]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[140px]">
          <label className="text-xs font-semibold text-[#134074] block mb-2 tracking-wide uppercase">
            T<sub>ref</sub> = {Tref}°C
          </label>
          <input type="range" min="50" max="250" step="5" value={Tref}
            onChange={(e) => setTref(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#134074] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#134074] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer" />
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="text-xs font-semibold text-[#13315C] block mb-2 tracking-wide uppercase">
            C₁ = {C1.toFixed(1)}
          </label>
          <input type="range" min="1" max="20" step="0.5" value={C1}
            onChange={(e) => setC1(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#13315C] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#13315C] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer" />
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="text-xs font-semibold text-[#0B2545] block mb-2 tracking-wide uppercase">
            C₂ = {C2.toFixed(0)}°C
          </label>
          <input type="range" min="20" max="200" step="5" value={C2}
            onChange={(e) => setC2(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#0B2545] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0B2545] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer" />
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="text-xs font-semibold text-[#8DA9C4] block mb-2 tracking-wide uppercase">
            Eₐ = {Ea} kJ/mol
          </label>
          <input type="range" min="10" max="100" step="5" value={Ea}
            onChange={(e) => setEa(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#8DA9C4] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#8DA9C4] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="wlfGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#134074" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#134074" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(19,64,116,0.06)" />
          <ReferenceLine x={Tref} stroke="#0B2545" strokeDasharray="6 4" strokeWidth={1.5}
            label={{ value: "Tref", fill: "#0B2545", fontSize: 11, fontWeight: 600, position: "top" }} />
          <ReferenceLine y={0} stroke="#c9d9e8" strokeWidth={1} />
          <XAxis dataKey="temperature" type="number"
            tick={{ fill: "#3d6285", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#c9d9e8" }} tickLine={{ stroke: "#c9d9e8" }}
            label={{ value: "Temperature [°C]", position: "insideBottom", offset: -5, fill: "#0B2545", fontSize: 12, fontWeight: 500 }} />
          <YAxis tick={{ fill: "#3d6285", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#c9d9e8" }} tickLine={{ stroke: "#c9d9e8" }}
            label={{ value: "log(aT)", angle: -90, position: "insideLeft", offset: 15, fill: "#0B2545", fontSize: 12, fontWeight: 500 }} />
          <Tooltip contentStyle={{
            backgroundColor: "rgba(255,255,255,0.97)", border: "1px solid #c9d9e8",
            borderRadius: "0.75rem", color: "#0B2545", boxShadow: "0 8px 24px rgba(11,37,69,0.12)",
            fontSize: 12, fontFamily: "Inter",
          }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any, name: any) => [`${Number(value).toFixed(3)}`, name]}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            labelFormatter={(label: any) => `T = ${Number(label).toFixed(0)}°C`} />
          <Legend wrapperStyle={{ color: "#3d6285", paddingTop: 16, fontSize: 12 }} />
          <Area type="monotone" dataKey="wlf" fill="url(#wlfGrad)" stroke="none" />
          <Line type="monotone" dataKey="wlf" stroke="#134074" strokeWidth={2.5}
            dot={false} activeDot={<CustomActiveDot />} name="WLF" />
          <Line type="monotone" dataKey="arrhenius" stroke="#8DA9C4" strokeWidth={2}
            strokeDasharray="6 4" dot={false} activeDot={<CustomActiveDot />} name="Arrhenius" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
