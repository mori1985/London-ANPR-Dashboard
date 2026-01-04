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
  const [sensors, setSensors] = useState<any[]>([]);
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
        setSensors(data);

        if (data.length > 0) {
          const avgAqi =
            data.reduce((sum: number, s: any) => sum + (s.aqi || 0), 0) / data.length;
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
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
          <Trees className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
          Environment Monitoring
        </h1>
        <p className="text-gray-300 text-base md:text-lg mt-2">
          Air quality, noise levels, and environmental sensors across the city
        </p>
      </div>

      {/* کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* گیج AQI */}
        <div className="bg-gradient-to-br from-teal-600 to-green-600 rounded-xl p-6 md:p-8 text-white">
          <h3 className="text-xl md:text-2xl font-bold">Air Quality Index</h3>
          <div className="mt-6 flex justify-center">
            <SimpleGauge
              value={aqi > 150 ? 100 : Math.round((aqi / 150) * 100)}
              size={200}
              label="AQI"
            />
          </div>
          <p className={`text-2xl md:text-3xl font-bold text-center mt-6 ${getAqiColor()}`}>
            {aqiLevel}
          </p>
        </div>

        {/* PM2.5 */}
        <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-6 md:p-8 text-white">
          <h3 className="text-xl md:text-2xl font-bold">PM2.5</h3>
          <p className="text-5xl md:text-6xl font-bold mt-4">18 µg/m³</p>
        </div>

        {/* Noise Level */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 md:p-8 text-white">
          <h3 className="text-xl md:text-2xl font-bold">Noise Level</h3>
          <p className="text-5xl md:text-6xl font-bold mt-4">58 dB</p>
          <p className="text-orange-400 text-2xl md:text-3xl font-bold mt-2">Moderate</p>
        </div>
      </div>

      {/* نقشه */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Environmental Sensors Map
        </h2>
        <div className="rounded-xl overflow-hidden shadow-2xl h-80 md:h-96 lg:h-[600px]">
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