// src/components/DashboardContent.tsx
import { CameraCards, StatsCards, ParkingWidget, TrafficVolumeChart, AirQualityGauge } from "@/components/widgets";

export default function DashboardContent() {
  return (
    <div className="ml-64 pt-16 p-6">
      <StatsCards />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        <ParkingWidget />
        <TrafficVolumeChart />
        <AirQualityGauge />
      </div>
      <CameraCards />
    </div>
  );
}