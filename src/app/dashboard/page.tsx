// src/app/dashboard/page.tsx
import StatsCards from "@/components/widgets/StatsCards";
import CameraCards from "@/components/widgets/CameraCards";
import ParkingWidget from "@/components/widgets/ParkingWidget";
import TrafficVolumeChart from "@/components/widgets/TrafficVolumeChart";
import AirQualityGauge from "@/components/widgets/AirQualityGauge";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-white">ANPR Dashboard</h1>
      <StatsCards />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <ParkingWidget />
        <TrafficVolumeChart />
        <AirQualityGauge />
      </div>
      <CameraCards />
    </div>
  );
}