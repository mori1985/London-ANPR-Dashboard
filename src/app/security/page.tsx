// src/app/security/page.tsx
// هدف: نمایش وضعیت امنیت، دوربین‌های نظارتی، حوادث

import { Shield, AlertTriangle, Siren, Video } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
        <Shield className="w-10 h-10 text-red-500" />
        Public Safety & Security
      </h1>
      <p className="text-gray-300 text-lg">Real-time incident monitoring and emergency response</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-red-600 to-pink-700 rounded-xl p-6 text-white">
          <AlertTriangle className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">7</p>
          <p className="text-sm opacity-90">Active Incidents</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-xl p-6 text-white">
          <Siren className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">23</p>
          <p className="text-sm opacity-90">Emergency Calls (24h)</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
          <Video className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">1,247</p>
          <p className="text-sm opacity-90">CCTV Cameras</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-xl p-6 text-white">
          <Shield className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-4xl font-bold">98.2%</p>
          <p className="text-sm opacity-90">Response Rate</p>
        </div>
      </div>
    </div>
  );
}