// src/components/widgets/ParkingWidget.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParkingWidget() {
  const spots = [
    { name: "Central Garage", total: 850, free: 312 },
    { name: "West End", total: 650, free: 98 },
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <CardHeader className="pb-2 p-4 md:p-6">
        <CardTitle className="text-sm md:text-base flex justify-between items-center">
          <span>Free Parking Spaces</span>
          <button className="text-xs md:text-sm">+</button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {spots.map((spot) => (
          <div key={spot.name} className="mb-3 md:mb-4">
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span className="truncate">{spot.name}</span>
              <span>{spot.free}/{spot.total}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 md:h-3">
              <div
                className="bg-gradient-to-r from-pink-500 to-blue-500 h-2 md:h-3 rounded-full transition-all"
                style={{ width: `${(spot.free / spot.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}