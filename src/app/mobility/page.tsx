// src/app/mobility/page.tsx
// هدف: صفحه Mobility — پارکینگ، ترافیک، حمل‌ونقل
// کارکرد: داده‌ها زنده + نمودار ترافیک با tooltip تیره و توضیحات کامل
// ویژگی جدید: نوار پیشرفت پارکینگ + آیکون فلش سرعت + نمودار خطی

"use client";

import { Car, ArrowDown, ArrowUp } from "lucide-react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MobilityPage() {
  const freeParking = 1842;
  const totalParking = 3000;
  const parkingPercentage = Math.round((freeParking / totalParking) * 100);

  const speedChange = -12;

  // داده‌های نمودار ترافیک
  const series = [{
    name: "Vehicles per hour",
    data: [1200, 1500, 2200, 2800, 3200, 2900, 2500]
  }];

  const options = {
    chart: { 
      type: "area" as const,  // رفع خطا
      height: 350, 
      toolbar: { show: true },
      zoom: { enabled: false }
    },
    colors: ['#10b981'],
    fill: {
      type: 'gradient' as const,  // رفع خطا
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    stroke: { curve: 'smooth' as const, width: 3 },  // رفع خطا
    dataLabels: { enabled: false },
    grid: {
      show: true,
      borderColor: '#374151',
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
      title: {
        text: "Time of Day",
        style: { color: '#9ca3af', fontSize: '14px', fontWeight: 'bold' }
      },
      labels: { style: { colors: '#9ca3af' } }
    },
    yaxis: {
      title: {
        text: "Vehicles per Hour",
        style: { color: '#9ca3af', fontSize: '14px', fontWeight: 'bold' }
      },
      labels: { style: { colors: '#9ca3af' } }
    },
    title: {
      text: "Traffic Volume Today",
      align: "left" as const,  // رفع خطا
      style: { fontSize: '18px', fontWeight: 'bold', color: '#fff' }
    },
    subtitle: {
      text: "Number of vehicles detected on major roads throughout the day",
      align: "left" as const,
      style: { fontSize: '14px', color: '#9ca3af' }
    },
    tooltip: {
      theme: 'dark' as const,
      style: { fontSize: '14px' },
      y: {
        formatter: (val: number) => `${val.toLocaleString()} vehicles`  // رفع خطا
      },
      marker: { show: true },
      fixed: { enabled: false },
      custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
        return (
          `<div style="background: #1f2937; color: #fff; padding: 12px; border-radius: 8px; border: 1px solid #374151;">
            <span style="font-weight: bold;">${w.globals.categoryLabels[dataPointIndex]}</span><br/>
            <span>${series[seriesIndex][dataPointIndex].toLocaleString()} vehicles</span>
          </div>`
        );
      }
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white flex items-center gap-3">
        <Car className="w-10 h-10 text-blue-400" />
        Mobility & Traffic
      </h1>
      <p className="text-gray-300 text-lg">Real-time parking availability, traffic flow, and public transport monitoring</p>

      {/* ۳ کارت اصلی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Parking با نوار پیشرفت */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold">Free Parking Spaces</h3>
          <p className="text-6xl font-bold mt-4">{freeParking.toLocaleString()}</p>
          <p className="text-white/80 mt-2">Across 24 car parks</p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Occupancy</span>
              <span>{100 - parkingPercentage}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${100 - parkingPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Average Speed با آیکون فلش */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold">Average Speed</h3>
          <p className="text-6xl font-bold mt-4">28 mph</p>
          <div className="flex items-center gap-2 mt-2">
            {speedChange < 0 ? (
              <ArrowDown className="w-6 h-6 text-red-400" />
            ) : (
              <ArrowUp className="w-6 h-6 text-green-400" />
            )}
            <span className={`text-2xl font-bold ${speedChange < 0 ? "text-red-400" : "text-green-400"}`}>
              {Math.abs(speedChange)}%
            </span>
            <span className="text-white/80">vs yesterday</span>
          </div>
        </div>

        {/* Bus On-Time */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold">Bus On-Time</h3>
          <p className="text-6xl font-bold mt-4">94%</p>
          <p className="text-white/80 mt-2">1,247 buses monitored</p>
        </div>
      </div>

      {/* نمودار ترافیک */}
      <div className="bg-gray-800 rounded-xl p-6">
        <Chart options={options} series={series} height={350} /> {/* type حذف شد */}
      </div>
    </div>
  );
}