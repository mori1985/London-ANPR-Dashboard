// src/components/widgets/TrafficVolumeChart.tsx
"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TrafficVolumeChart() {
  const series = [{
    name: "Traffic Volume",
    data: [1200, 1500, 2200, 2800, 3200, 2900, 2500]
  }];

  const options = {
    chart: { 
      type: "area" as const,  // رفع خطا
      height: 180, 
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    colors: ["#10b981"],
    fill: { 
      type: "gradient" as const,  // رفع خطا
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } 
    },
    xaxis: { 
      categories: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00']
    },
    stroke: { 
      curve: "smooth" as const,  // رفع خطا
      width: 3 
    },
    dataLabels: { enabled: false },
    title: { 
      text: "Traffic Volume Today", 
      align: "left" as const,
      style: { fontSize: '14px', color: '#fff' } 
    }
  };

  return (
    <Chart 
      options={options} 
      series={series} 
      height={180} 
    />  // type="area" حذف شد
  );
}