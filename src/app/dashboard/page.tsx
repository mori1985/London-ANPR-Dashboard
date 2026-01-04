// src/app/dashboard/page.tsx
import StatsCards from "@/components/widgets/StatsCards";
import CameraCards from "@/components/widgets/CameraCards";
import ParkingWidget from "@/components/widgets/ParkingWidget";
import TrafficVolumeChart from "@/components/widgets/TrafficVolumeChart";
import AirQualityGauge from "@/components/widgets/AirQualityGauge";

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white">ANPR Dashboard</h1>

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