// src/components/DashboardContent.tsx
import { CameraCards, StatsCards, ParkingWidget, TrafficVolumeChart, AirQualityGauge } from "@/components/widgets";

export default function DashboardContent() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <StatsCards />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ParkingWidget />
        <TrafficVolumeChart />
        <AirQualityGauge />
      </div>
      <CameraCards />
    </div>
  );
}