// src/app/health/page.tsx
// هدف: نمایش شاخص‌های سلامت عمومی، بیمارستان‌ها، کیفیت آب
// کارکرد: هشدارها بزرگ + نمودار تماس‌های اضطراری + لیست Top Health Concerns
// ویژگی جدید: هشدار بزرگ + نمودار خطی + لیست نگرانی‌های سلامت

"use client";

import { HeartPulse, Activity, Droplets, AlertTriangle, PhoneCall, TrendingUp, Sun } from "lucide-react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function HealthPage() {
  // داده‌های نمودار تماس‌های اضطراری
  const series = [{
    name: "Emergency Calls",
    data: [45, 52, 38, 65, 72, 58, 80]
  }];

  const options = {
    chart: { 
      type: "line" as const,
      height: 300, 
      toolbar: { show: false } 
    },
    colors: ["#ef4444"],
    stroke: { 
      curve: "smooth" as const,
      width: 4 
    },
    fill: { 
      type: "gradient" as const, 
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } 
    },
    xaxis: { 
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      title: { text: "Day of Week", style: { color: '#9ca3af' } }
    },
    yaxis: { 
      title: { text: "Number of Calls", style: { color: '#9ca3af' } },
      labels: { style: { colors: '#9ca3af' } }
    },
    title: { 
      text: "Daily Emergency Calls", 
      align: "left" as const,  // رفع خطا
      style: { fontSize: '16px', fontWeight: 'bold', color: '#fff' } 
    },
    tooltip: {
      theme: 'dark' as const,
      y: { 
        formatter: (val: number) => `${val} calls`
      }
    }
  };

  // لیست Top Health Concerns
  const concerns = [
    { name: "Respiratory Issues", count: 145, icon: TrendingUp, color: "from-orange-500 to-red-600" },
    { name: "Flu Cases", count: 98, icon: Activity, color: "from-blue-500 to-indigo-600" },
    { name: "Asthma Alerts", count: 67, icon: AlertTriangle, color: "from-purple-500 to-pink-600" },
    { name: "Heat-Related", count: 34, icon: Sun, color: "from-yellow-500 to-orange-600" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
        <HeartPulse className="w-10 h-10 text-red-400" />
        Public Health
      </h1>
      <p className="text-gray-300 text-lg">Monitoring hospitals, air quality, and emergency services</p>

      {/* ۴ کارت اصلی */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Active Health Alerts — بزرگ‌تر و هشدار قرمز */}
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-8 text-white text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <p className="text-7xl font-bold">12</p>
          <p className="text-lg opacity-90 mt-2">Active Health Alerts</p>
        </div>

        {/* Hospital Bed Occupancy */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
          <Activity className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">94%</p>
          <p className="text-sm opacity-90">Hospital Bed Occupancy</p>
        </div>

        {/* Water Quality */}
        <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl p-6 text-white">
          <Droplets className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">100%</p>
          <p className="text-sm opacity-90">Water Quality</p>
        </div>

        {/* Avg Life Expectancy */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <HeartPulse className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">8.2</p>
          <p className="text-sm opacity-90">Avg Life Expectancy</p>
        </div>
      </div>

      {/* نمودار تماس‌های اضطراری */}
      <div className="bg-gray-800 rounded-xl p-6">
        <Chart options={options} series={series} height={300} />
      </div>

      {/* Top Health Concerns */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Top Health Concerns</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {concerns.map((item) => (
            <div key={item.name} className={`bg-gradient-to-br ${item.color} rounded-xl p-6 text-white`}>
              <item.icon className="w-10 h-10 mb-3 opacity-90" />
              <p className="text-4xl font-bold">{item.count}</p>
              <p className="text-sm opacity-90 mt-2">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}