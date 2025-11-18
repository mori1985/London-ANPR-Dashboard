// src/components/charts/TrafficVolume.tsx
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TrafficVolume() {
  const series = [{
    name: "Traffic Volume",
    data: [1200, 1500, 1800, 2200, 2800, 3200, 2900]
  }];

  const options = {
    chart: { type: 'area', height: 200, toolbar: { show: false } },
    colors: ['#10b981'],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
    xaxis: { categories: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] },
    stroke: { curve: 'smooth' },
    dataLabels: { enabled: false },
  };

  return <Chart options={options} series={series} type="area" height={200} />;
}