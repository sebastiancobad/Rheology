"use client";

import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea,
  Area, ComposedChart,
} from "recharts";

function generateCreepData(eta: number, G: number, tau0: number) {
  const lambda = eta / G;
  const J0 = 1 / G;
  const data = [];

  for (let t = 0; t <= 10; t += 0.1) {
    const strain = tau0 * (J0 * (1 - Math.exp(-t / lambda)) + t / eta);
    data.push({
      time: parseFloat(t.toFixed(2)),
      strain: parseFloat(strain.toFixed(6)),
      stress: tau0,
      phase: "creep",
    });
  }
  const strainAtRemoval = tau0 * (J0 * (1 - Math.exp(-10 / lambda)) + 10 / eta);
  const elasticRecovery = tau0 * J0 * (1 - Math.exp(-10 / lambda));
  const permanentStrain = strainAtRemoval - elasticRecovery;

  for (let t = 10.1; t <= 20; t += 0.1) {
    const dt = t - 10;
    const strain = permanentStrain + elasticRecovery * Math.exp(-dt / lambda);
    data.push({
      time: parseFloat(t.toFixed(2)),
      strain: parseFloat(strain.toFixed(6)),
      stress: 0,
      phase: "recovery",
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

export default function CreepRecoveryChart() {
  const [eta, setEta] = useState(5000);
  const [G, setG] = useState(1000);
  const [tau0, setTau0] = useState(100);

  const data = useMemo(() => generateCreepData(eta, G, tau0), [eta, G, tau0]);

  return (
    <div>
      <div className="flex flex-wrap gap-5 mb-6">
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-semibold text-[#134074] block mb-2 tracking-wide uppercase">
            η = {eta} Pa·s
          </label>
          <input type="range" min="1000" max="20000" step="500" value={eta}
            onChange={(e) => setEta(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#134074] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#134074] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer" />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-semibold text-[#13315C] block mb-2 tracking-wide uppercase">
            G = {G} Pa
          </label>
          <input type="range" min="100" max="10000" step="100" value={G}
            onChange={(e) => setG(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#13315C] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#13315C] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer" />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-semibold text-[#0B2545] block mb-2 tracking-wide uppercase">
            τ₀ = {tau0} Pa
          </label>
          <input type="range" min="10" max="500" step="10" value={tau0}
            onChange={(e) => setTau0(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-[#EEF4ED] to-[#0B2545] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0B2545] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="creepGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#134074" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#134074" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(19,64,116,0.06)" />
          <ReferenceArea x1={0} x2={10} fill="#134074" fillOpacity={0.03} />
          <ReferenceArea x1={10} x2={20} fill="#EEF4ED" fillOpacity={0.4} />
          <ReferenceLine x={10} stroke="#0B2545" strokeDasharray="6 4" strokeWidth={1.5}
            label={{ value: "τ₀ removed", fill: "#0B2545", fontSize: 11, fontWeight: 600, position: "top" }} />
          <XAxis dataKey="time" type="number"
            tick={{ fill: "#2c4a6e", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#d0dde8" }} tickLine={{ stroke: "#d0dde8" }}
            label={{ value: "Time [s]", position: "insideBottom", offset: -5, fill: "#0B2545", fontSize: 12, fontWeight: 500 }} />
          <YAxis tick={{ fill: "#2c4a6e", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#d0dde8" }} tickLine={{ stroke: "#d0dde8" }}
            label={{ value: "Strain γ", angle: -90, position: "insideLeft", offset: 15, fill: "#0B2545", fontSize: 12, fontWeight: 500 }} />
          <Tooltip contentStyle={{
            backgroundColor: "rgba(255,255,255,0.97)", border: "1px solid #d0dde8",
            borderRadius: "0.75rem", color: "#0B2545", boxShadow: "0 8px 24px rgba(11,37,69,0.12)",
            fontSize: 12, fontFamily: "Inter",
          }} />
          <Legend wrapperStyle={{ color: "#2c4a6e", paddingTop: 16, fontSize: 12 }} />
          <Area type="monotone" dataKey="strain" fill="url(#creepGrad)" stroke="none" />
          <Line type="monotone" dataKey="strain" stroke="#134074" strokeWidth={2.5}
            dot={false} activeDot={<CustomActiveDot />} name="Strain γ(t)" />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
        <div className="bg-[#EEF4ED] rounded-xl p-3 text-center border border-[#d0dde8]">
          <div className="font-semibold text-[#134074]">λ = η/G</div>
          <div className="text-[#0B2545] font-bold text-sm mt-0.5">{(eta / G).toFixed(1)} s</div>
        </div>
        <div className="bg-[#EEF4ED] rounded-xl p-3 text-center border border-[#d0dde8]">
          <div className="font-semibold text-[#13315C]">J₀ = 1/G</div>
          <div className="text-[#0B2545] font-bold text-sm mt-0.5">{(1 / G * 1000).toFixed(2)} × 10⁻³ Pa⁻¹</div>
        </div>
        <div className="bg-[#EEF4ED] rounded-xl p-3 text-center border border-[#d0dde8]">
          <div className="font-semibold text-[#0B2545]">Maxwell Model</div>
          <div className="text-[#2c4a6e] mt-0.5">Spring + Dashpot in series</div>
        </div>
      </div>
    </div>
  );
}
