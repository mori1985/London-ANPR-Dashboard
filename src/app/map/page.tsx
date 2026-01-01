// src/app/map/page.tsx
// هدف: صفحه نقشه زنده با موقعیت دوربین‌ها و سنسورها از Firestore
// کارکرد: داده‌ها رو زنده می‌گیره و روی MapLibre GL نمایش می‌ده
// ویژگی: آیکون متفاوت + پاپ‌آپ کارت خفن با تصویر دوربین

"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import { Camera, AlertTriangle, Wind, Thermometer, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapPage() {
  const [cameras, setCameras] = useState<any[]>([]); // رفع خطا
  const [sensors, setSensors] = useState<any[]>([]); // رفع خطا
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // داده دوربین‌ها
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "traffic_cameras"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        type: "camera",
        ...doc.data()
      }));
      setCameras(data);
    });
    return () => unsubscribe();
  }, []);

  // داده سنسورها
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "environmental_sensors"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        type: "sensor",
        ...doc.data()
      }));
      setSensors(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Live City Map</h1>
          <p className="text-gray-400">Real-time view of ANPR cameras and environmental sensors</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white/10 rounded-lg text-white hover:bg-white/20 transition">
            Traffic Layer
          </button>
          <button className="px-5 py-2.5 bg-white/10 rounded-lg text-white hover:bg-white/20 transition">
            Heatmap
          </button>
        </div>
      </div>

      {/* نقشه واقعی */}
      <div className="rounded-xl overflow-hidden shadow-2xl h-96 md:h-[600px]">
        <Map
          initialViewState={{
            longitude: -0.1278,
            latitude: 51.5074,
            zoom: 11
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          onClick={() => setSelectedItem(null)}
        >
          {/* دوربین‌ها */}
          {cameras.map((cam) => (
            <Marker
              key={cam.id}
              longitude={cam.location.lng}
              latitude={cam.location.lat}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedItem(cam);
              }}
            >
              <div className={`p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition ${
                cam.status === "online" ? "bg-green-500" : "bg-red-500"
              }`}>
                <Camera className="w-6 h-6 text-white" />
                {cam.alert && <AlertTriangle className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />}
              </div>
            </Marker>
          ))}

          {/* سنسورها */}
          {sensors.map((sensor) => (
            <Marker
              key={sensor.id}
              longitude={sensor.location.lng}
              latitude={sensor.location.lat}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedItem(sensor);
              }}
            >
              <div className="p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition bg-teal-500">
                <Wind className="w-6 h-6 text-white" />
              </div>
            </Marker>
          ))}

          {/* پاپ‌آپ کارت خفن */}
          {selectedItem && (
            <Popup
              longitude={selectedItem.location.lng}
              latitude={selectedItem.location.lat}
              onClose={() => setSelectedItem(null)}
              closeButton={true}
              closeOnClick={false}
              anchor="bottom"
              offset={30}
            >
              <Card className="w-80 shadow-2xl border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {selectedItem.type === "camera" ? <Camera className="w-5 h-5" /> : <Wind className="w-5 h-5" />}
                    {selectedItem.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* تصویر دوربین */}
                  {selectedItem.type === "camera" && selectedItem.image_url && (
                    <img
                      src={selectedItem.image_url}
                      alt="Camera view"
                      className="w-full h-48 object-cover rounded-lg border border-white/20"
                    />
                  )}

                  {/* داده‌های دوربین */}
                  {selectedItem.type === "camera" && (
                    <>
                      <p><strong>Last Plate:</strong> {selectedItem.last_plate || "N/A"}</p>
                      <p><strong>Plates Today:</strong> {selectedItem.plates_count || 0}</p>
                      <div className="flex items-center gap-2">
                        <strong>Status:</strong>
                        <Badge variant={selectedItem.status === "online" ? "default" : "destructive"}>
                          {selectedItem.status?.toUpperCase()}
                        </Badge>
                      </div>
                      {selectedItem.alert && <Badge variant="destructive">ALERT ACTIVE</Badge>}
                    </>
                  )}

                  {/* داده‌های سنسور */}
                  {selectedItem.type === "sensor" && (
                    <>
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-5 h-5 text-orange-400" />
                        <strong>Temperature:</strong> {selectedItem.temperature}°C
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-blue-400" />
                        <strong>Humidity:</strong> {selectedItem.humidity}%
                      </div>
                      <p><strong>AQI:</strong> {selectedItem.aqi} ({selectedItem.aqi_level})</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </Popup>
          )}
        </Map>
      </div>

      {/* آمار پایین نقشه */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-green-400">{cameras.filter(c => c.status === "online").length}</p>
          <p className="text-gray-400">Online Cameras</p>
        </div>
        <div className="bg-teal-500/20 border border-teal-500/50 rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-teal-400">{sensors.length}</p>
          <p className="text-gray-400">Active Sensors</p>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-yellow-400">{cameras.filter(c => c.alert).length}</p>
          <p className="text-gray-400">Alerts</p>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-blue-400">
            {cameras.reduce((sum, c) => sum + (c.plates_count || 0), 0)}
          </p>
          <p className="text-gray-400">Plates Today</p>
        </div>
      </div>
    </div>
  );
}