// src/components/widgets/AirQualityGauge.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Gauge } from "lucide-react";

export default function AirQualityGauge() {
  const aqi = 98;
  const level = aqi <= 50 ? "Good" : aqi <= 100 ? "Moderate" : "Poor";
  const color = aqi <= 50 ? "text-green-500" : aqi <= 100 ? "text-yellow-500" : "text-red-500";

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900 dark:to-teal-950">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-100">AIR QUALITY</h3>
          <button className="text-xs md:text-sm text-gray-600 dark:text-gray-400">+</button>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(aqi / 150) * 264} 264`}
                className={`${color} transition-all duration-1000`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Gauge className={`w-6 h-6 md:w-8 md:h-8 ${color} mb-1`} />
                <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">{aqi}</div>
                <div className={`text-xs md:text-sm font-medium ${color}`}>{level}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-center">
          <div>
            <div className="font-medium text-green-600">PM2.5</div>
            <div className="text-gray-600 dark:text-gray-400">12 µg/m³</div>
          </div>
          <div>
            <div className="font-medium text-yellow-600">NO₂</div>
            <div className="text-gray-600 dark:text-gray-400">28 µg/m³</div>
          </div>
          <div>
            <div className="font-medium text-red-600">O₃</div>
            <div className="text-gray-600 dark:text-gray-400">65 µg/m³</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}