// src/app/security/page.tsx
"use client";

import { Shield, AlertTriangle, Siren, Video, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SecurityPage() {
  const series = [{
    name: "Incidents",
    data: [5, 8, 6, 12, 9, 7, 10]
  }];

  const options = {
    chart: { type: "line" as const, height: 300, toolbar: { show: false } },
    colors: ["#ef4444"],
    stroke: { curve: "smooth" as const, width: 4 },
    fill: { type: "gradient" as const, gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    title: { text: "Daily Incidents Trend", align: "left" as const, style: { fontSize: '16px', fontWeight: 'bold', color: '#fff' } },
    tooltip: {
      theme: 'dark' as const,
      y: { formatter: (val: number) => `${val} incidents` }
    }
  };

  const recentIncidents = [
    { location: "Oxford Street", type: "Theft", time: "14:32", status: "In Progress" },
    { location: "Trafalgar Square", type: "Disturbance", time: "13:15", status: "Resolved" },
    { location: "Piccadilly Circus", type: "Suspicious Activity", time: "11:48", status: "In Progress" },
    { location: "Westminster", type: "Traffic Accident", time: "09:20", status: "Resolved" },
  ];

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 md:w-10 md:h-10 text-red-500" />
          Public Safety & Security
        </h1>
        <p className="text-gray-300 text-base md:text-lg">Real-time incident monitoring and emergency response</p>
      </div>

      {/* ۴ کارت اصلی */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-red-600 to-pink-700 rounded-xl p-6 md:p-8 text-white text-center">
          <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-90" />
          <p className="text-5xl md:text-7xl font-bold">7</p>
          <p className="text-base md:text-lg opacity-90 mt-2">Active Incidents</p>
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

      {/* نمودار */}
      <div className="bg-gray-800 rounded-xl p-4 md:p-6">
        <Chart options={options} series={series} height={300} />
      </div>

      {/* لیست حوادث اخیر */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Recent Incidents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentIncidents.map((incident, index) => (
            <div key={index} className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <Badge variant={incident.status === "Resolved" ? "default" : "destructive"}>
                  {incident.status}
                </Badge>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-lg md:text-xl font-bold text-white mb-2">{incident.type}</p>
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {incident.location}
              </p>
              <p className="text-sm text-gray-400 mt-2">{incident.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}