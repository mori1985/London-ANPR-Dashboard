// src/app/mobility/page.tsx
"use client";

import { Car, ArrowDown, ArrowUp } from "lucide-react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MobilityPage() {
  const freeParking = 1842;
  const totalParking = 3000;
  const parkingPercentage = Math.round((freeParking / totalParking) * 100);

  const speedChange = -12;

  const series = [{
    name: "Vehicles per hour",
    data: [1200, 1500, 2200, 2800, 3200, 2900, 2500]
  }];

  const options = {
    chart: { type: "area" as const, height: 350, toolbar: { show: true }, zoom: { enabled: false } },
    colors: ['#10b981'],
    fill: { type: 'gradient' as const, gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3, stops: [0, 90, 100] } },
    stroke: { curve: 'smooth' as const, width: 3 },
    dataLabels: { enabled: false },
    grid: { show: true, borderColor: '#374151', strokeDashArray: 4 },
    xaxis: {
      categories: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
      title: { text: "Time of Day", style: { color: '#9ca3af', fontSize: '14px', fontWeight: 'bold' } },
      labels: { style: { colors: '#9ca3af' } }
    },
    yaxis: {
      title: { text: "Vehicles per Hour", style: { color: '#9ca3af', fontSize: '14px', fontWeight: 'bold' } },
      labels: { style: { colors: '#9ca3af' } }
    },
    title: { text: "Traffic Volume Today", align: "left" as const, style: { fontSize: '18px', fontWeight: 'bold', color: '#fff' } },
    subtitle: { text: "Number of vehicles detected on major roads throughout the day", align: "left" as const, style: { fontSize: '14px', color: '#9ca3af' } },
    tooltip: {
      theme: 'dark' as const,
      style: { fontSize: '14px' },
      y: { formatter: (val: number) => `${val.toLocaleString()} vehicles` },
      marker: { show: true },
      fixed: { enabled: false }
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
          <Car className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
          Mobility & Traffic
        </h1>
        <p className="text-gray-300 text-base md:text-lg">Real-time parking availability, traffic flow, and public transport monitoring</p>
      </div>

      {/* ۳ کارت اصلی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 md:p-8 text-white">
          <h3 className="text-xl md:text-2xl font-bold">Free Parking Spaces</h3>
          <p className="text-5xl md:text-6xl font-bold mt-4">{freeParking.toLocaleString()}</p>
          <p className="text-white/80 mt-2 text-sm md:text-base">Across 24 car parks</p>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Occupancy</span>
              <span>{100 - parkingPercentage}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3 md:h-4">
              <div 
                className="bg-white h-3 md:h-4 rounded-full transition-all duration-500"
                style={{ width: `${100 - parkingPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 md:p-8 text-white">
          <h3 className="text-xl md:text-2xl font-bold">Average Speed</h3>
          <p className="text-5xl md:text-6xl font-bold mt-4">28 mph</p>
          <div className="flex items-center gap-2 mt-4">
            {speedChange < 0 ? (
              <ArrowDown className="w-6 h-6 text-red-400" />
            ) : (
              <ArrowUp className="w-6 h-6 text-green-400" />
            )}
            <span className={`text-2xl md:text-3xl font-bold ${speedChange < 0 ? "text-red-400" : "text-green-400"}`}>
              {Math.abs(speedChange)}%
            </span>
            <span className="text-white/80 text-sm md:text-base">vs yesterday</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-6 md:p-8 text-white">
          <h3 className="text-xl md:text-2xl font-bold">Bus On-Time</h3>
          <p className="text-5xl md:text-6xl font-bold mt-4">94%</p>
          <p className="text-white/80 mt-2 text-sm md:text-base">1,247 buses monitored</p>
        </div>
      </div>

      {/* نمودار */}
      <div className="bg-gray-800 rounded-xl p-4 md:p-6">
        <Chart options={options} series={series} height={350} />
      </div>
    </div>
  );
}