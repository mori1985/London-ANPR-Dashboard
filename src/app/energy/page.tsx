// src/app/energy/page.tsx
"use client";  // ← این خط رو اضافه کن

import { Zap, TrendingUp, Sun, Wind } from "lucide-react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function EnergyPage() {
  const series = [{ name: "Energy Consumption (MW)", data: [45, 52, 58, 69, 82, 91, 78] }];
  const options = {
    chart: { type: "line", height: 300, toolbar: { show: false } },
    colors: ["#f59e0b"],
    stroke: { curve: "smooth", width: 4 },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    title: { text: "Weekly Energy Consumption", align: "left" },
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
        <Zap className="w-10 h-10 text-yellow-400" />
        Energy Management
      </h1>
      <p className="text-gray-300 text-lg">Real-time energy consumption, renewable production</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-6 text-white">
          <Sun className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">1,284 MW</p>
          <p className="text-sm opacity-90">Solar Production</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
          <Wind className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">892 MW</p>
          <p className="text-sm opacity-90">Wind Production</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <TrendingUp className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">76%</p>
          <p className="text-sm opacity-90">Renewable Share</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <Zap className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">4.2 GWh</p>
          <p className="text-sm opacity-90">Daily Total</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <Chart options={options} series={series} type="line" height={300} />
      </div>
    </div>
  );
}