// src/components/widgets/ParkingWidget.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";

export default function ParkingWidget() {
  const spots = [
    { name: "Central Garage", total: 850, free: 312 },
    { name: "West End", total: 650, free: 98 },
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex justify-between">
          <span>Free Parking Spaces</span>
          <button className="text-xs">+</button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {spots.map((spot) => (
          <div key={spot.name} className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>{spot.name}</span>
              <span>{spot.free}/{spot.total}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(spot.free / spot.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}