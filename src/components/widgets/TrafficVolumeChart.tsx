// src/components/charts/TrafficVolumeChart.tsx
'use client';

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card"; // اضافه شد

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TrafficVolumeChart() {
  const series = [{ name: "Vehicles", data: [1200, 1800, 2200, 2800, 3200, 2900, 2500] }];
  const options = {
    chart: { type: 'area', height: 180, toolbar: { show: false }, sparkline: { enabled: true } },
    colors: ['#10b981'],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
    xaxis: { categories: ['06', '08', '10', '12', '14', '16', '18'] },
    stroke: { curve: 'smooth', width: 2 },
    dataLabels: { enabled: false },
    title: { text: "Traffic Volume", align: "left", style: { fontSize: '14px', fontWeight: 'bold' } },
  };

  return (
    <Card>
      <CardContent className="p-4">
        <Chart options={options} series={series} type="area" height={180} />
      </CardContent>
    </Card>
  );
}