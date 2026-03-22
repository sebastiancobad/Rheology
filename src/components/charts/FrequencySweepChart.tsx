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
  Area,
  ComposedChart,
} from "recharts";

function generateFrequencySweepData(crossoverFreq: number, plateauModulus: number) {
  const data = [];
  for (let i = -2; i <= 2.5; i += 0.08) {
    const omega = Math.pow(10, i);
    const omegaRel = omega / crossoverFreq;
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

const sliderClass = (color: string) =>
  `w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[${color}] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer`;

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
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs font-semibold text-[#134074] block mb-2 tracking-wide uppercase">
            ω<sub>c</sub> = {crossoverFreq.toFixed(1)} rad/s
          </label>
          <input type="range" min="0.1" max="10" step="0.1" value={crossoverFreq}
            onChange={(e) => setCrossoverFreq(parseFloat(e.target.value))}
            className={`${sliderClass("#134074")} bg-gradient-to-r from-[#EEF4ED] to-[#134074]`} />
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs font-semibold text-[#13315C] block mb-2 tracking-wide uppercase">
            G<sub>N</sub><sup>0</sup> = {(plateauModulus / 1000).toFixed(0)} kPa
          </label>
          <input type="range" min="10000" max="500000" step="10000" value={plateauModulus}
            onChange={(e) => setPlateauModulus(parseFloat(e.target.value))}
            className={`${sliderClass("#13315C")} bg-gradient-to-r from-[#EEF4ED] to-[#13315C]`} />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 text-xs font-medium text-[#2c4a6e] cursor-pointer select-none">
            <div className={`w-8 h-4 rounded-full transition-colors relative ${showTanDelta ? "bg-[#8DA9C4]" : "bg-[#d0dde8]"}`}
              onClick={() => setShowTanDelta(!showTanDelta)}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${showTanDelta ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
            tan(δ)
          </label>
        </div>
      </div>

      <div className="text-xs text-[#2c4a6e] mb-3 bg-[#EEF4ED] rounded-lg px-3 py-2 inline-block">
        Maxwell: <Tex className="font-semibold text-[#134074]">{`G'(\\omega) = G_N^0 \\cdot \\frac{(\\omega\\lambda)^2}{1+(\\omega\\lambda)^2}`}</Tex>,{" "}
        <Tex className="font-semibold text-[#8DA9C4]">{`G''(\\omega) = G_N^0 \\cdot \\frac{\\omega\\lambda}{1+(\\omega\\lambda)^2}`}</Tex>
      </div>

      <ResponsiveContainer width="100%" height={420}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="gPrimeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#134074" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#134074" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="gDblGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8DA9C4" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#8DA9C4" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(19,64,116,0.06)" />
          <XAxis dataKey="omega" scale="log" domain={["dataMin", "dataMax"]} type="number"
            tick={{ fill: "#2c4a6e", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#d0dde8" }} tickLine={{ stroke: "#d0dde8" }}
            label={{ value: "Angular Frequency ω [rad/s]", position: "insideBottom", offset: -5, fill: "#0B2545", fontSize: 12, fontWeight: 500 }} />
          <YAxis yAxisId="modulus" scale="log" domain={[1, "auto"]} type="number"
            tick={{ fill: "#2c4a6e", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#d0dde8" }} tickLine={{ stroke: "#d0dde8" }}
            label={{ value: "G', G'' [Pa]", angle: -90, position: "insideLeft", offset: 15, fill: "#0B2545", fontSize: 12, fontWeight: 500 }} />
          {showTanDelta && (
            <YAxis yAxisId="tanDelta" orientation="right" scale="log" domain={[0.01, 100]} type="number"
              tick={{ fill: "#8DA9C4", fontSize: 11 }}
              axisLine={{ stroke: "#d0dde8" }} tickLine={{ stroke: "#d0dde8" }}
              label={{ value: "tan(δ)", angle: 90, position: "insideRight", offset: 10, fill: "#8DA9C4", fontSize: 12 }} />
          )}
          <Tooltip contentStyle={{
            backgroundColor: "rgba(255,255,255,0.97)", border: "1px solid #d0dde8",
            borderRadius: "0.75rem", color: "#0B2545", boxShadow: "0 8px 24px rgba(11,37,69,0.12)",
            fontSize: 12, fontFamily: "Inter",
          }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any, name: any) => {
              const v = Number(value);
              if (name === "tan(δ)") return [v.toFixed(3), name];
              return [`${v.toFixed(1)} Pa`, name];
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            labelFormatter={(label: any) => `ω = ${Number(label).toFixed(2)} rad/s`} />
          <Legend wrapperStyle={{ color: "#2c4a6e", paddingTop: 16, fontSize: 12 }} />
          <ReferenceLine x={crossoverFreq} yAxisId="modulus" stroke="#0B2545" strokeDasharray="6 4" strokeWidth={1.5}
            label={{ value: "ωc", fill: "#0B2545", fontSize: 12, fontWeight: 600, position: "top" }} />
          <Area yAxisId="modulus" type="monotone" dataKey="gPrime" fill="url(#gPrimeGrad)" stroke="none" />
          <Area yAxisId="modulus" type="monotone" dataKey="gDoublePrime" fill="url(#gDblGrad)" stroke="none" />
          <Line yAxisId="modulus" type="monotone" dataKey="gPrime" stroke="#134074" strokeWidth={2.5}
            dot={false} activeDot={<CustomActiveDot />} name="G' (Storage)" />
          <Line yAxisId="modulus" type="monotone" dataKey="gDoublePrime" stroke="#8DA9C4" strokeWidth={2.5}
            dot={false} activeDot={<CustomActiveDot />} name="G'' (Loss)" />
          {showTanDelta && (
            <Line yAxisId="tanDelta" type="monotone" dataKey="tanDelta" stroke="#0B2545" strokeWidth={1.5}
              strokeDasharray="5 3" dot={false} activeDot={<CustomActiveDot />} name="tan(δ)" />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
        <div className="bg-[#EEF4ED] rounded-xl p-4 border border-[#d0dde8]">
          <div className="text-[#134074] font-semibold mb-1 text-xs"><Tex>{`\\omega < \\omega_c`}</Tex> — Terminal</div>
          <p className="text-[#2c4a6e] text-xs"><Tex>{`G'' > G'`}</Tex>: Viscous behavior. Chains relax fully.</p>
        </div>
        <div className="bg-white rounded-xl p-4 border-2 border-[#134074]/20">
          <div className="text-[#0B2545] font-semibold mb-1 text-xs"><Tex>{`\\omega = \\omega_c`}</Tex> — Crossover</div>
          <p className="text-[#2c4a6e] text-xs"><Tex>{`G' = G'',\\; \\tan(\\delta)=1.\\; \\lambda = 1/\\omega_c`}</Tex></p>
        </div>
        <div className="bg-[#EEF4ED] rounded-xl p-4 border border-[#d0dde8]">
          <div className="text-[#134074] font-semibold mb-1 text-xs"><Tex>{`\\omega > \\omega_c`}</Tex> — Plateau</div>
          <p className="text-[#2c4a6e] text-xs"><Tex>{`G' > G''`}</Tex>: Elastic, entangled network.</p>
        </div>
      </div>
    </div>
  );
}
