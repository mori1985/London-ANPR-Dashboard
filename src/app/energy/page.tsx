// src/app/environment/page.tsx
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Map, { Marker } from "react-map-gl/maplibre";
import { Wind, Trees } from "lucide-react";
import SimpleGauge from "@/components/ui/SimpleGauge";
import "maplibre-gl/dist/maplibre-gl.css";
export default function EnvironmentPage() {
  const renewableShare = 76;
  const [sensors, setSensors] = useState<any[]>([]); // رفع خطا — نوع any[]
  const [aqi, setAqi] = useState(42);
  const [aqiLevel, setAqiLevel] = useState("Good");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "environmental_sensors"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSensors(data); // حالا خطا نمی‌ده

        if (data.length > 0) {
          const avgAqi =
            data.reduce((sum: number, s: any) => sum + s.aqi, 0) / data.length;
          setAqi(Math.round(avgAqi));
          if (avgAqi <= 50) setAqiLevel("Good");
          else if (avgAqi <= 100) setAqiLevel("Moderate");
          else setAqiLevel("Poor");
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const getAqiColor = () => {
    if (aqiLevel === "Good") return "text-green-400";
    if (aqiLevel === "Moderate") return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white flex items-center gap-3">
        <Trees className="w-10 h-10 text-green-400" />
        Environment Monitoring
      </h1>
      <p className="text-gray-300 text-lg">
        Air quality, noise levels, and environmental sensors across the city
      </p>

      {/* کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* گیج AQI */}
        <div className="bg-gradient-to-br from-teal-600 to-green-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold">Air Quality Index</h3>
          <div className="mt-4">
            <div className="mt-4">
              <SimpleGauge value={renewableShare} size={180} label="Renewable" />
            </div>
            <p className="text-sm opacity-90 text-center -mt-4">
              Renewable Share
            </p>
          </div>
          <p className={`text-3xl font-bold text-center mt-4 ${getAqiColor()}`}>
            {aqiLevel}
          </p>
        </div>

        {/* PM2.5 و Noise */}
        {/* ... بقیه کارت‌ها */}
      </div>

      {/* نقشه */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Environmental Sensors Map
        </h2>
        <div className="rounded-xl overflow-hidden shadow-2xl h-96">
          <Map
            initialViewState={{
              longitude: -0.1278,
              latitude: 51.5074,
              zoom: 11,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          >
            {sensors.map((sensor) => (
              <Marker
                key={sensor.id}
                longitude={sensor.location.lng}
                latitude={sensor.location.lat}
              >
                <div className="p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition bg-teal-500">
                  <Wind className="w-6 h-6 text-white" />
                </div>
              </Marker>
            ))}
          </Map>
        </div>
      </div>
    </div>
  );
}
