// src/app/map/page.tsx
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
  const [cameras, setCameras] = useState<any[]>([]);
  const [sensors, setSensors] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    const unsubscribeCameras = onSnapshot(collection(db, "traffic_cameras"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        type: "camera",
        ...doc.data()
      }));
      setCameras(data);
    });

    const unsubscribeSensors = onSnapshot(collection(db, "environmental_sensors"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        type: "sensor",
        ...doc.data()
      }));
      setSensors(data);
    });

    return () => {
      unsubscribeCameras();
      unsubscribeSensors();
    };
  }, []);

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Live City Map</h1>
          <p className="text-gray-400 text-base md:text-lg">Real-time view of ANPR cameras and environmental sensors</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition">
            Traffic Layer
          </button>
          <button className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition">
            Heatmap
          </button>
        </div>
      </div>

      {/* نقشه */}
      <div className="rounded-xl overflow-hidden shadow-2xl h-80 md:h-96 lg:h-[600px]">
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
                <Camera className="w-5 h-5 md:w-6 md:h-6 text-white" />
                {cam.alert && <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 absolute -top-1 -right-1" />}
              </div>
            </Marker>
          ))}

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
              <div className="p-2 md:p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition bg-teal-500">
                <Wind className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </Marker>
          ))}

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
              <Card className="w-72 md:w-80 shadow-2xl border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base md:text-lg flex items-center gap-2">
                    {selectedItem.type === "camera" ? <Camera className="w-5 h-5" /> : <Wind className="w-5 h-5" />}
                    {selectedItem.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {selectedItem.type === "camera" && selectedItem.image_url && (
                    <img
                      src={selectedItem.image_url}
                      alt="Camera view"
                      className="w-full h-40 md:h-48 object-cover rounded-lg border border-white/20"
                    />
                  )}

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 md:p-6 text-center">
          <p className="text-3xl md:text-4xl font-bold text-green-400">{cameras.filter(c => c.status === "online").length}</p>
          <p className="text-gray-400 text-sm md:text-base">Online Cameras</p>
        </div>
        <div className="bg-teal-500/20 border border-teal-500/50 rounded-xl p-4 md:p-6 text-center">
          <p className="text-3xl md:text-4xl font-bold text-teal-400">{sensors.length}</p>
          <p className="text-gray-400 text-sm md:text-base">Active Sensors</p>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4 md:p-6 text-center">
          <p className="text-3xl md:text-4xl font-bold text-yellow-400">{cameras.filter(c => c.alert).length}</p>
          <p className="text-gray-400 text-sm md:text-base">Alerts</p>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4 md:p-6 text-center">
          <p className="text-3xl md:text-4xl font-bold text-blue-400">
            {cameras.reduce((sum, c) => sum + (c.plates_count || 0), 0)}
          </p>
          <p className="text-gray-400 text-sm md:text-base">Plates Today</p>
        </div>
      </div>
    </div>
  );
}