// src/app/cameras/page.tsx
// هدف: نمایش لیست دوربین‌ها + آمار + ویجت‌ها (همون داشبورد قبلی)

import StatsCards from "@/components/widgets/StatsCards";
import CameraCards from "@/components/widgets/CameraCards";
import ParkingWidget from "@/components/widgets/ParkingWidget";
import TrafficVolumeChart from "@/components/widgets/TrafficVolumeChart";
import AirQualityGauge from "@/components/widgets/AirQualityGauge";

export default function CamerasPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">ANPR Cameras</h1>
        <p className="text-gray-400">Real-time monitoring of all traffic cameras</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ParkingWidget />
        <TrafficVolumeChart />
        <AirQualityGauge />
      </div>

      <CameraCards />
    </div>
  );
}