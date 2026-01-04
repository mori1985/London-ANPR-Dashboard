// src/components/charts/TrafficVolume.tsx
"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TrafficVolume() {
  const series = [{
    name: "Vehicles per hour",
    data: [1200, 1500, 2200, 2800, 3200, 2900, 2500]
  }];

  const options = {
    chart: { type: "area" as const, height: 200, toolbar: { show: false } },
    colors: ["#10b981"],
    fill: { type: "gradient" as const, gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
    xaxis: { categories: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] },
    stroke: { curve: "smooth" as const, width: 3 },
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark' as const }
  };

  return (
    <div className="w-full">
      <Chart options={options} series={series} height={200} />
    </div>
  );
}