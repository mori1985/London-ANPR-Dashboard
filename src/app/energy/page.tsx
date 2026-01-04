// src/app/energy/page.tsx
"use client";

import { Zap, TrendingUp, Sun, Wind, Leaf } from "lucide-react";
import dynamic from "next/dynamic";
import SimpleGauge from "@/components/ui/SimpleGauge";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function EnergyPage() {
  const renewableShare = 76; // درصد تجدیدپذیر

  const series = [{ name: "Energy Consumption (MW)", data: [45, 52, 58, 69, 82, 91, 78] }];

  const options = {
    chart: { type: "line" as const, height: 350, toolbar: { show: false } },
    colors: ["#f59e0b"],
    stroke: { curve: "smooth" as const, width: 4 },
    fill: {
      type: "gradient" as const,
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 }
    },
    xaxis: { 
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      title: { text: "Day of Week", style: { color: '#9ca3af' } }
    },
    yaxis: { 
      title: { text: "MW", style: { color: '#9ca3af' } },
      labels: { style: { colors: '#9ca3af' } }
    },
    title: { 
      text: "Weekly Energy Consumption", 
      align: "left" as const,
      style: { fontSize: '18px', fontWeight: 'bold', color: '#fff' }
    },
    tooltip: {
      theme: 'dark' as const,
      style: { fontSize: '14px' },
      y: { formatter: (val: number) => `${val} MW` },
      custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
        return (
          `<div style="background: #1f2937; color: #fff; padding: 12px; border-radius: 8px; border: 1px solid #374151;">
            <span style="font-weight: bold;">${w.globals.categoryLabels[dataPointIndex]}</span><br/>
            <span>${series[seriesIndex][dataPointIndex]} MW</span>
          </div>`
        );
      }
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Zap className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
          Energy Management
        </h1>
        <p className="text-gray-300 text-base md:text-lg">Real-time energy consumption, renewable production</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Solar Production */}
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-6 text-white">
          <Sun className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl md:text-5xl font-bold">1,284 MW</p>
          <p className="text-sm opacity-90">Solar Production</p>
        </div>

        {/* Wind Production */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
          <Wind className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl md:text-5xl font-bold">892 MW</p>
          <p className="text-sm opacity-90">Wind Production</p>
        </div>

        {/* Renewable Share با گیج */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <TrendingUp className="w-10 h-10 mb-3 opacity-90" />
          <div className="mt-4 flex justify-center">
            <SimpleGauge value={renewableShare} size={160} label="Renewable" />
          </div>
          <p className="text-sm opacity-90 text-center -mt-2">Renewable Share</p>
        </div>

        {/* Daily Total */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <Zap className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl md:text-5xl font-bold">4.2 GWh</p>
          <p className="text-sm opacity-90">Daily Total</p>
        </div>

        {/* Carbon Saved */}
        <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl p-6 text-white">
          <Leaf className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl md:text-5xl font-bold">1,250 t</p>
          <p className="text-sm opacity-90">Carbon Saved Today</p>
        </div>
      </div>

      {/* نمودار */}
      <div className="bg-gray-800 rounded-xl p-4 md:p-6">
        <Chart options={options} series={series} height={350} />
      </div>
    </div>
  );
}