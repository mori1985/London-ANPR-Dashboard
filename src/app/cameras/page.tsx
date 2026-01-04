// src/app/cameras/page.tsx
import StatsCards from "@/components/widgets/StatsCards";
import CameraCards from "@/components/widgets/CameraCards";
import ParkingWidget from "@/components/widgets/ParkingWidget";
import TrafficVolumeChart from "@/components/widgets/TrafficVolumeChart";
import AirQualityGauge from "@/components/widgets/AirQualityGauge";

export default function CamerasPage() {
  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">ANPR Cameras</h1>
        <p className="text-gray-400 text-base md:text-lg">Real-time monitoring of all traffic cameras</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ParkingWidget />
        <TrafficVolumeChart />
        <AirQualityGauge />
      </div>

      <CameraCards />
    </div>
  );
}