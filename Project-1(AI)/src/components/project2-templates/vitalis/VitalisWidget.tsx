"use client";

import { useState } from "react";
import { Calculator, HeartPulse, CheckCircle } from "lucide-react";

export default function VitalisWidget() {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const calculateBmi = () => {
    const heightInMeters = height / 100;
    const bmi = Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
    setBmiResult(bmi);
  };

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { category: "Underweight", color: "text-amber-600 bg-amber-50" };
    if (val < 25) return { category: "Optimal Healthy Weight", color: "text-emerald-600 bg-emerald-50" };
    if (val < 30) return { category: "Overweight", color: "text-orange-600 bg-orange-50" };
    return { category: "High Risk", color: "text-rose-600 bg-rose-50" };
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-2xl space-y-6 text-left relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#0F172A]">Smart Health Metric Widget</h3>
            <p className="text-xs text-gray-500">Calculate your BMI & Health Status instantly</p>
          </div>
        </div>
        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full uppercase">
          AI INSIGHTS
        </span>
      </div>

      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <div className="flex justify-between font-semibold mb-1">
            <span>Weight (kg): <strong className="text-[#0284C7]">{weight} kg</strong></span>
          </div>
          <input
            type="range"
            min="40"
            max="140"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-[#0284C7] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between font-semibold mb-1">
            <span>Height (cm): <strong className="text-[#0284C7]">{height} cm</strong></span>
          </div>
          <input
            type="range"
            min="120"
            max="220"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full accent-[#0284C7] cursor-pointer"
          />
        </div>

        <button
          onClick={calculateBmi}
          className="w-full bg-[#059669] hover:bg-[#047857] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          <span>Calculate Health Score</span>
        </button>
      </div>

      {bmiResult !== null && (
        <div className="mt-4 p-4 rounded-2xl bg-teal-50/60 border border-teal-200 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 uppercase">Calculated Body Mass Index</span>
            <span className="text-2xl font-extrabold text-[#0F172A]">{bmiResult}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getBmiCategory(bmiResult).color}`}>
              {getBmiCategory(bmiResult).category}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
