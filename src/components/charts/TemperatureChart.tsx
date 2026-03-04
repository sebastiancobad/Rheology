"use client";

import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

function generateTempData(Tref: number, C1: number, C2: number, Ea: number) {
  const data = [];
  const R = 8.314;
  for (let T = 100; T <= 300; T += 2) {
    const Tk = T + 273.15;
    const TrefK = Tref + 273.15;
    // WLF
    const logAtWLF = -C1 * (T - Tref) / (C2 + T - Tref);
    // Arrhenius
    const logAtArr = (Ea * 1000 / (R * 2.303)) * (1/Tk - 1/TrefK);
    data.push({
      temperature: T,
      wlf: parseFloat(logAtWLF.toFixed(4)),
      arrhenius: parseFloat(logAtArr.toFixed(4)),
    });
  }
  return data;
}

export default function TemperatureChart() {
  const [Tref, setTref] = useState(150);
  const [C1, setC1] = useState(8.86);
  const [C2, setC2] = useState(101.6);
  const [Ea, setEa] = useState(40);

  const data = useMemo(() => generateTempData(Tref, C1, C2, Ea), [Tref, C1, C2, Ea]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="text-xs text-[#3d6285] block mb-1">T<sub>ref</sub> = {Tref}°C</label>
          <input type="range" min="50" max="250" step="5" value={Tref}
            onChange={(e) => setTref(parseFloat(e.target.value))} className="w-32 accent-[#134074]" />
        </div>
        <div>
          <label className="text-xs text-[#3d6285] block mb-1">C₁ = {C1.toFixed(1)}</label>
          <input type="range" min="1" max="20" step="0.5" value={C1}
            onChange={(e) => setC1(parseFloat(e.target.value))} className="w-32 accent-[#13315C]" />
        </div>
        <div>
          <label className="text-xs text-[#3d6285] block mb-1">C₂ = {C2.toFixed(0)}°C</label>
          <input type="range" min="20" max="200" step="5" value={C2}
            onChange={(e) => setC2(parseFloat(e.target.value))} className="w-32 accent-[#0B2545]" />
        </div>
        <div>
          <label className="text-xs text-[#3d6285] block mb-1">Eₐ = {Ea} kJ/mol</label>
          <input type="range" min="10" max="100" step="5" value={Ea}
            onChange={(e) => setEa(parseFloat(e.target.value))} className="w-32 accent-[#8DA9C4]" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(19,64,116,0.08)" />
          <XAxis dataKey="temperature" type="number"
            tick={{ fill: "#3d6285", fontSize: 11 }}
            label={{ value: "Temperature [°C]", position: "insideBottom", offset: -5, fill: "#3d6285" }} />
          <YAxis tick={{ fill: "#3d6285", fontSize: 11 }}
            label={{ value: "log(aT)", angle: -90, position: "insideLeft", offset: 15, fill: "#3d6285" }} />
          <Tooltip contentStyle={{
            backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid #c9d9e8",
            borderRadius: "0.75rem", color: "#0B2545", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }} />
          <Legend wrapperStyle={{ color: "#3d6285", paddingTop: 16 }} />
          <Line type="monotone" dataKey="wlf" stroke="#134074" strokeWidth={2.5} dot={false} name="WLF" />
          <Line type="monotone" dataKey="arrhenius" stroke="#8DA9C4" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Arrhenius" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
