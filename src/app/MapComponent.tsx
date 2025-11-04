'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CameraData {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  status: 'online' | 'offline';
  last_plate: string;
  plates_count: number;
  alert: boolean;
  image_url: string;
}

export default function MapComponent({ data }: { data: CameraData[] }) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // اگر قبلاً map ساخته شده، destroy کن
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    if (!mapContainerRef.current) return;

    // ساخت Leaflet map فقط یک‌بار
    const map = L.map(mapContainerRef.current).setView([51.5074, -0.1278], 12);
    mapRef.current = map;

    // اضافه کردن TileLayer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // ساخت آیکون سفارشی
    const createIcon = () =>
      L.divIcon({
        html: `
          <div class="relative">
            <div class="absolute inset-0 bg-pink-500 rounded-full blur-md animate-ping"></div>
            <div class="relative bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full p-2 shadow-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917z"/>
              </svg>
            </div>
          </div>
        `,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

    // اضافه کردن markerها
    if (data && data.length > 0) {
      data.forEach((item) => {
        const marker = L.marker([item.location.lat, item.location.lng], {
          icon: createIcon(),
        }).addTo(map);

        marker.bindPopup(`
          <div class="p-3 max-w-xs">
            <img src="${item.image_url}" class="w-full h-32 object-cover rounded-lg mb-3 shadow-md"/>
            <h3 class="font-bold text-lg">${item.name}</h3>
            <p class="text-sm"><strong>Plate:</strong> ${item.last_plate}</p>
            <p class="text-sm"><strong>Today:</strong> ${item.plates_count} plates</p>
            <div class="flex justify-between items-center mt-2">
              <span class="font-bold text-sm ${item.status === 'online' ? 'text-green-600' : 'text-red-600'}">
                ${item.status.toUpperCase()}
              </span>
              ${
                item.alert
                  ? `<span class="px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full">
                    ALERT!
                  </span>`
                  : ''
              }
            </div>
          </div>
        `);
      });
    }

    // cleanup در unmount
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [data]);

  return (
    <div className="h-full w-full bg-gray-50">
      <div ref={mapContainerRef} className="h-full w-full rounded-xl overflow-hidden" />
    </div>
  );
}
