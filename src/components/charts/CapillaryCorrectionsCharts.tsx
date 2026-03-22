"use client";

import { useState, useMemo } from "react";
import { Tex } from "../Math";
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
  ReferenceArea,
} from "recharts";

/* ── Bagley Correction ─────────────────────────────────────────────────── */

/**
 * Generates Bagley plot data: ΔP vs L/D at multiple apparent shear rates.
 * Entrance pressure loss increases with shear rate and elasticity.
 */
function generateBagleyData(entranceLoss: number, nPrime: number) {
  const shearRates = [100, 500, 1000]; // apparent shear rates (s⁻¹)
  const ldValues = [0, 5, 10, 15, 20, 25, 30, 35, 40];

  return shearRates.map((gamDot, idx) => {
    // Wall shear stress scales with shear rate via power-law: tau_w ~ K * gamDot^n'
    const K = 0.02; // consistency index [MPa·s^n']
    const tauW = K * Math.pow(gamDot, nPrime);
    // entrance pressure drop ΔP_ent = 2 * e_B * tau_w
    const eB = entranceLoss; // Bagley correction factor
    const dPent = 2 * eB * tauW;

    const points = ldValues.map((ld) => ({
      ld,
      dP: parseFloat((dPent + 2 * tauW * ld).toFixed(3)),
    }));

    return { gamDot, points, dPent: parseFloat(dPent.toFixed(3)), eB, tauW };
  });
}

const bagleyColors = ["#134074", "#8DA9C4", "#13315C"];

function BagleyChart() {
  const [entranceLoss, setEntranceLoss] = useState(5);
  const [nPrime, setNPrime] = useState(0.35);

  const series = useMemo(
    () => generateBagleyData(entranceLoss, nPrime),
    [entranceLoss, nPrime]
  );

  // Merge all series into unified data keyed by ld
  const chartData = useMemo(() => {
    const ldValues = [0, 5, 10, 15, 20, 25, 30, 35, 40];
    return ldValues.map((ld) => {
      const row: Record<string, number> = { ld };
      series.forEach((s, i) => {
        const pt = s.points.find((p) => p.ld === ld);
        if (pt) row[`dP${i}`] = pt.dP;
      });
      return row;
    });
  }, [series]);

  // Extrapolated intercepts (ΔP at L/D = 0) → show as reference
  const extrapolatedLD = -entranceLoss;

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-4">
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-semibold text-[#134074] block mb-1.5 tracking-wide uppercase">
            Bagley correction <Tex>{`e_B`}</Tex> = {entranceLoss.toFixed(1)}
          </label>
          <input
            type="range" min="0.5" max="15" step="0.5" value={entranceLoss}
            onChange={(e) => setEntranceLoss(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-[#EEF4ED] to-[#134074] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#134074] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-semibold text-[#13315C] block mb-1.5 tracking-wide uppercase">
            Power-law index <Tex>{`n'`}</Tex> = {nPrime.toFixed(2)}
          </label>
          <input
            type="range" min="0.15" max="0.80" step="0.05" value={nPrime}
            onChange={(e) => setNPrime(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-[#EEF4ED] to-[#13315C] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#13315C] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      </div>

      <div className="text-xs text-[#2c4a6e] mb-3 bg-[#EEF4ED] rounded-lg px-3 py-2 inline-block">
        Extrapolate to <Tex className="font-semibold text-[#134074]">{`L/D = 0`}</Tex> to find{" "}
        <Tex className="font-semibold text-[#134074]">{`\\Delta P_{\\text{ent}}`}</Tex>.{" "}
        Intercept at <Tex>{`L/D = -e_B`}</Tex> = {extrapolatedLD.toFixed(1)}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 25, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(19,64,116,0.06)" />
          <XAxis
            dataKey="ld" type="number" domain={[-16, 42]}
            tick={{ fill: "#2c4a6e", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#d0dde8" }} tickLine={{ stroke: "#d0dde8" }}
            label={{ value: "L / D", position: "insideBottom", offset: -10, fill: "#0B2545", fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            tick={{ fill: "#2c4a6e", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#d0dde8" }} tickLine={{ stroke: "#d0dde8" }}
            label={{ value: "ΔP [MPa]", angle: -90, position: "insideLeft", offset: 10, fill: "#0B2545", fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(255,255,255,0.97)", borderRadius: 12, border: "1px solid #d0dde8",
              boxShadow: "0 4px 12px rgba(11,37,69,0.08)", fontSize: 12,
            }}
            formatter={// eslint-disable-next-line @typescript-eslint/no-explicit-any
            (value: any, name: any) => {
              const idx = parseInt(String(name).replace("dP", ""));
              return [`${Number(value).toFixed(2)} MPa`, `γ̇ = ${series[idx]?.gamDot} s⁻¹`];
            }}
            labelFormatter={// eslint-disable-next-line @typescript-eslint/no-explicit-any
            (v: any) => `L/D = ${v}`}
          />
          <Legend
            formatter={(value: string) => {
              const idx = parseInt(value.replace("dP", ""));
              return `γ̇ₐ = ${series[idx]?.gamDot} s⁻¹`;
            }}
            wrapperStyle={{ fontSize: 11 }}
          />
          <ReferenceLine x={0} stroke="#0B2545" strokeWidth={1.5} strokeDasharray="4 3" label={{ value: "L/D=0", position: "top", fill: "#0B2545", fontSize: 10 }} />
          <ReferenceArea x1={-16} x2={0} fill="#134074" fillOpacity={0.03} />
          {series.map((s, i) => (
            <Line
              key={i} dataKey={`dP${i}`} type="linear"
              stroke={bagleyColors[i]} strokeWidth={2.5}
              dot={{ fill: "white", stroke: bagleyColors[i], strokeWidth: 2, r: 4 }}
              activeDot={{ fill: "white", stroke: bagleyColors[i], strokeWidth: 2, r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── Rabinowitsch Correction ───────────────────────────────────────────── */

/**
 * Generates flow curve data: apparent vs true shear rate at each wall shear stress.
 * The Rabinowitsch correction factor is (3n'+1)/(4n').
 */
function generateRabinowitschData(nPrime: number) {
  const data = [];
  const corrFactor = (3 * nPrime + 1) / (4 * nPrime);

  for (let logGa = 0; logGa <= 4; logGa += 0.15) {
    const gamApp = Math.pow(10, logGa);
    const gamTrue = gamApp * corrFactor;
    // Also compute a Newtonian reference (n'=1 → factor = 1)
    data.push({
      gamApp: parseFloat(gamApp.toFixed(4)),
      gamTrue: parseFloat(gamTrue.toFixed(4)),
      gamNewt: parseFloat(gamApp.toFixed(4)), // n'=1 means no correction
    });
  }

  return { data, corrFactor };
}

function RabinowitschChart() {
  const [nPrime, setNPrime] = useState(0.35);

  const { data, corrFactor } = useMemo(
    () => generateRabinowitschData(nPrime),
    [nPrime]
  );

  const errorPercent = ((corrFactor - 1) * 100).toFixed(0);

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-4">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-[#13315C] block mb-1.5 tracking-wide uppercase">
            Power-law index <Tex>{`n'`}</Tex> = {nPrime.toFixed(2)}
          </label>
          <input
            type="range" min="0.15" max="1.0" step="0.05" value={nPrime}
            onChange={(e) => setNPrime(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-[#EEF4ED] to-[#13315C] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#13315C] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      </div>

      <div className="text-xs text-[#2c4a6e] mb-3 bg-[#EEF4ED] rounded-lg px-3 py-2 inline-flex flex-wrap gap-x-3 gap-y-1 items-center">
        <span>Correction factor <Tex className="font-semibold text-[#13315C]">{`\\frac{3n'+1}{4n'}`}</Tex> = {corrFactor.toFixed(3)}</span>
        <span>|</span>
        <span>True wall shear rate is <strong className="text-[#134074]">{errorPercent}%</strong> higher than apparent</span>
        {nPrime >= 0.95 && <span className="text-[#8DA9C4]">(Newtonian — no correction needed)</span>}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 25, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(19,64,116,0.06)" />
          <XAxis
            dataKey="gamApp" scale="log" domain={[1, 10000]} type="number"
            tick={{ fill: "#2c4a6e", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#d0dde8" }} tickLine={{ stroke: "#d0dde8" }}
            label={{ value: "Apparent shear rate γ̇ₐ [s⁻¹]", position: "insideBottom", offset: -10, fill: "#0B2545", fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            scale="log" domain={[1, 30000]} type="number"
            tick={{ fill: "#2c4a6e", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#d0dde8" }} tickLine={{ stroke: "#d0dde8" }}
            label={{ value: "True shear rate γ̇ₜᵣᵤₑ [s⁻¹]", angle: -90, position: "insideLeft", offset: 10, fill: "#0B2545", fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(255,255,255,0.97)", borderRadius: 12, border: "1px solid #d0dde8",
              boxShadow: "0 4px 12px rgba(11,37,69,0.08)", fontSize: 12,
            }}
            formatter={// eslint-disable-next-line @typescript-eslint/no-explicit-any
            (value: any, name: any) => {
              if (name === "gamTrue") return [`${Number(value).toFixed(1)} s⁻¹`, `γ̇ true (n'=${nPrime})`];
              return [`${Number(value).toFixed(1)} s⁻¹`, "γ̇ Newtonian (1:1)"];
            }}
            labelFormatter={// eslint-disable-next-line @typescript-eslint/no-explicit-any
            (v: any) => `γ̇ₐ = ${Number(v).toFixed(1)} s⁻¹`}
          />
          <Legend
            formatter={(value: string) => {
              if (value === "gamTrue") return `Corrected (n'=${nPrime.toFixed(2)})`;
              return "Newtonian (no correction)";
            }}
            wrapperStyle={{ fontSize: 11 }}
          />
          <ReferenceLine
            segment={[{ x: 1, y: 1 }, { x: 10000, y: 10000 }]}
            stroke="#8DA9C4" strokeWidth={1.5} strokeDasharray="5 3"
          />
          <Line
            dataKey="gamTrue" type="monotone"
            stroke="#13315C" strokeWidth={2.5}
            dot={false}
            activeDot={{ fill: "white", stroke: "#13315C", strokeWidth: 2, r: 5 }}
          />
          <Line
            dataKey="gamNewt" type="monotone"
            stroke="#8DA9C4" strokeWidth={1.5} strokeDasharray="5 3"
            dot={false}
            activeDot={{ fill: "white", stroke: "#8DA9C4", strokeWidth: 2, r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── Exports ───────────────────────────────────────────────────────────── */

export { BagleyChart, RabinowitschChart };
