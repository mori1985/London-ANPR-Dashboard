// src/app/page.tsx
// نسخه ShadCN + Tailwind — UI حرفه‌ای

"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

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

export default function Home() {
  const [data, setData] = useState<CameraData[]>([]);
  const alertedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "traffic_cameras"),
      (snapshot) => {
        const cameraData = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as CameraData))
          .filter(Boolean);

        cameraData.forEach((item) => {
          if (item.alert && !alertedIds.current.has(item.id)) {
            // داخل useEffect، بخش toast
            toast.custom(
              (t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } max-w-sm w-full bg-white shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all`}
                >
                  <div className="flex-1 p-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                          <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-bold text-gray-900">
                          Suspicious Plate!
                        </p>
                        <p className="mt-1 text-xs text-gray-600">
                          <strong>{item.last_plate}</strong> at{" "}
                          <span className="font-medium">{item.name}</span>
                        </p>
                      </div>
                      <img
                        src={item.image_url}
                        alt="plate"
                        className="w-16 h-16 object-cover rounded-r-xl"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ),
              { duration: 15000, position: "top-right" }
            );
            alertedIds.current.add(item.id);
          }
          if (!item.alert && alertedIds.current.has(item.id)) {
            alertedIds.current.delete(item.id);
          }
        });

        setData(cameraData);
      }
    );

    return () => unsubscribe();
  }, []);

  const stats = {
    total: data.length,
    online: data.filter((c) => c.status === "online").length,
    offline: data.filter((c) => c.status === "offline").length,
    alerts: data.filter((c) => c.alert).length,
    plates: data.reduce((sum, c) => sum + c.plates_count, 0),
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-3">
              <Camera className="w-10 h-10" />
              London ANPR Dashboard
            </h1>
            <Badge variant="secondary" className="text-sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Live System
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Total", value: stats.total, color: "bg-blue-500" },
              {
                label: "Online",
                value: stats.online,
                color: "bg-green-500",
                icon: CheckCircle,
              },
              {
                label: "Offline",
                value: stats.offline,
                color: "bg-red-500",
                icon: XCircle,
              },
              { label: "Alerts", value: stats.alerts, color: "bg-pink-500" },
              {
                label: "Plates Today",
                value: stats.plates,
                color: "bg-indigo-500",
              },
            ].map((stat) => (
              <Card
                key={stat.label}
                className={`${stat.color} text-white border-0`}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-sm opacity-90 flex items-center justify-center gap-1">
                    {stat.icon && <stat.icon className="w-4 h-4" />}
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-shadow"
              >
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      {item.name}
                    </span>
                    <Badge
                      variant={
                        item.status === "online" ? "default" : "destructive"
                      }
                    >
                      {item.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <img
                    src={item.image_url}
                    alt=""
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Last Plate:</strong> {item.last_plate}
                    </p>
                    <p>
                      <strong>Plates Today:</strong> {item.plates_count}
                    </p>
                    {item.alert && (
                      <Badge variant="destructive" className="mt-2">
                        ALERT ACTIVE
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* --- نقشه --- */}
          <div className="rounded-xl shadow-xl overflow-hidden bg-white">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 flex items-center gap-2">
              <Camera className="w-6 h-6" />
              <h3 className="text-lg font-bold">Live Camera Map</h3>
            </div>
            <div className="h-96 md:h-[600px] lg:h-[700px]">
              <MapComponent data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
