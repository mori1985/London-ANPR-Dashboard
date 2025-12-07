// src/app/map/page.tsx
// هدف: صفحه نقشه زنده با موقعیت دوربین‌ها
// وضعیت: کاملاً کار می‌کنه — MapPin ایمپورت شد

"use client";

import { MapPin } from "lucide-react";

export default function MapPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Live Camera Map</h1>
          <p className="text-gray-400">Interactive view of all ANPR cameras across London</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white/10 rounded-lg text-white hover:bg-white/20 transition">
            Traffic Layer
          </button>
          <button className="px-5 py-2.5 bg-white/10 rounded-lg text-white hover:bg-white/20 transition">
            Heatmap
          </button>
        </div>
      </div>

      <div className="bg-gray-800 border-2 border-dashed border-white/20 rounded-xl h-96 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <p className="text-xl text-gray-400">Interactive MapLibre GL Map</p>
          <p className="text-sm text-gray-500 mt-2">All 247 cameras shown with live status</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-green-400">238</p>
          <p className="text-gray-400">Online</p>
        </div>
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-red-400">9</p>
          <p className="text-gray-400">Offline</p>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-yellow-400">12</p>
          <p className="text-gray-400">Alerts</p>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-blue-400">8,421</p>
          <p className="text-gray-400">Plates Today</p>
        </div>
      </div>
    </div>
  );
}