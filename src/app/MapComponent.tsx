// src/app/MapComponent.tsx
'use client';

import { useEffect, useRef } from "react";

interface CameraData {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  status: "online" | "offline";
  last_plate: string;
  plates_count: number;
  alert: boolean;
  image_url: string;
}

export default function MapComponent({ data }: { data: CameraData[] }) {
  const mapContainer = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white rounded-full p-8 shadow-2xl mb-4">
          <svg className="w-16 h-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 17V7m0 0L9 4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Interactive Map</h3>
        <p className="text-sm text-gray-600 mt-2">Coming Soon with MapLibre GL</p>
      </div>
    </div>
  );
}