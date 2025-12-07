// src/app/health/page.tsx
// هدف: نمایش شاخص‌های سلامت عمومی، بیمارستان‌ها، کیفیت آب
"use client";
import { HeartPulse, Activity, Droplets, AlertCircle } from "lucide-react";

export default function HealthPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
        <HeartPulse className="w-10 h-10 text-red-400" />
        Public Health
      </h1>
      <p className="text-gray-300 text-lg">Monitoring hospitals, air quality, and emergency services</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-6 text-white">
          <AlertCircle className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">12</p>
          <p className="text-sm opacity-90">Active Health Alerts</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
          <Activity className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">94%</p>
          <p className="text-sm opacity-90">Hospital Bed Occupancy</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl p-6 text-white">
          <Droplets className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">100%</p>
          <p className="text-sm opacity-90">Water Quality</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <HeartPulse className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">8.2</p>
          <p className="text-sm opacity-90">Avg Life Expectancy</p>
        </div>
      </div>
    </div>
  );
}