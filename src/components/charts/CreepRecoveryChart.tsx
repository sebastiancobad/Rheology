"use client";

import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea,
} from "recharts";

function generateCreepData(eta: number, G: number, tau0: number) {
  const lambda = eta / G;
  const J0 = 1 / G;
  const data = [];

  // Creep phase (0 to 10)
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

  // Recovery phase (10 to 20)
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

export default function CreepRecoveryChart() {
  const [eta, setEta] = useState(5000);
  const [G, setG] = useState(1000);
  const [tau0, setTau0] = useState(100);

  const data = useMemo(() => generateCreepData(eta, G, tau0), [eta, G, tau0]);

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <label className="text-sm text-[#3d6285] block mb-1">η = {eta} Pa·s</label>
          <input type="range" min="1000" max="20000" step="500" value={eta}
            onChange={(e) => setEta(parseFloat(e.target.value))} className="w-40 accent-[#134074]" />
        </div>
        <div>
          <label className="text-sm text-[#3d6285] block mb-1">G = {G} Pa</label>
          <input type="range" min="100" max="10000" step="100" value={G}
            onChange={(e) => setG(parseFloat(e.target.value))} className="w-40 accent-[#13315C]" />
        </div>
        <div>
          <label className="text-sm text-[#3d6285] block mb-1">τ₀ = {tau0} Pa</label>
          <input type="range" min="10" max="500" step="10" value={tau0}
            onChange={(e) => setTau0(parseFloat(e.target.value))} className="w-40 accent-[#0B2545]" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(19,64,116,0.08)" />
          <ReferenceArea x1={0} x2={10} fill="#134074" fillOpacity={0.04} />
          <ReferenceArea x1={10} x2={20} fill="#EEF4ED" fillOpacity={0.5} />
          <ReferenceLine x={10} stroke="#8DA9C4" strokeDasharray="5 5"
            label={{ value: "Stress removed", fill: "#3d6285", fontSize: 11, position: "top" }} />
          <XAxis dataKey="time" type="number"
            tick={{ fill: "#3d6285", fontSize: 11 }}
            label={{ value: "Time [s]", position: "insideBottom", offset: -5, fill: "#3d6285" }} />
          <YAxis tick={{ fill: "#3d6285", fontSize: 11 }}
            label={{ value: "Strain γ", angle: -90, position: "insideLeft", offset: 15, fill: "#3d6285" }} />
          <Tooltip contentStyle={{
            backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid #c9d9e8",
            borderRadius: "0.75rem", color: "#0B2545", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }} />
          <Legend wrapperStyle={{ color: "#3d6285", paddingTop: 16 }} />
          <Line type="monotone" dataKey="strain" stroke="#134074" strokeWidth={2.5}
            dot={false} name="Strain γ(t)" />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
        <div className="bg-[#134074]/5 rounded-lg p-3 text-center">
          <div className="font-semibold text-[#134074]">λ = η/G</div>
          <div className="text-[#3d6285]">{(eta/G).toFixed(1)} s</div>
        </div>
        <div className="bg-[#13315C]/5 rounded-lg p-3 text-center">
          <div className="font-semibold text-[#13315C]">J₀ = 1/G</div>
          <div className="text-[#3d6285]">{(1/G*1000).toFixed(2)} × 10⁻³ Pa⁻¹</div>
        </div>
        <div className="bg-[#0B2545]/5 rounded-lg p-3 text-center">
          <div className="font-semibold text-[#0B2545]">Maxwell Model</div>
          <div className="text-[#3d6285]">Spring + Dashpot</div>
        </div>
      </div>
    </div>
  );
}
