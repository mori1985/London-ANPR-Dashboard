// src/components/widgets/ParkingSpaces.tsx
import { Car } from "lucide-react";

export default function ParkingSpaces() {
  const spots = [
    { name: "Parkhaus am Seebach", total: 850, free: 350 },
    { name: "Parkhaus am Schlachthof", total: 750, free: 200 },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg text-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">FREIE PARKPLÄTZE</h3>
        <button className="text-xs">+</button>
      </div>
      {spots.map((spot) => (
        <div key={spot.name} className="mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span>{spot.name}</span>
            <span>{spot.free}/{spot.total}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-blue-500 h-2 rounded-full"
              style={{ width: `${(spot.free / spot.total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}