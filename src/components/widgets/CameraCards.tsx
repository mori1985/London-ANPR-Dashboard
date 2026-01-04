// src/components/widgets/CameraCards.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, AlertTriangle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface CameraData {
  id: string;
  name: string;
  status: "online" | "offline";
  last_plate: string;
  plates_count: number;
  alert: boolean;
  image_url: string;
}

export default function CameraCards() {
  const [data, setData] = useState<CameraData[]>([]);
  const alertedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "traffic_cameras"),
      (snapshot) => {
        const cameraData = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as CameraData)
        );
        cameraData.forEach((item) => {
          if (item.alert && !alertedIds.current.has(item.id)) {
            toast.custom(
              (t) => (
                <div className={`max-w-md w-full bg-gray-900 border border-red-500/50 shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${t.visible ? "animate-enter" : "animate-leave"}`}>
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <AlertTriangle className="h-8 w-8 md:h-10 md:w-10 text-red-400" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm md:text-base font-bold text-red-400">
                          Suspicious Plate Detected!
                        </p>
                        <p className="mt-1 text-base md:text-lg font-semibold text-white">
                          {item.last_plate}
                        </p>
                        <p className="mt-1 text-sm text-gray-300">
                          at <span className="font-medium">{item.name}</span>
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                          {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-700">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-white focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ),
              { duration: 8000, position: "top-right" }
            );
            alertedIds.current.add(item.id);
          }
        });
        setData(cameraData);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-6">
      <Toaster />
      {data.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden hover:shadow-xl transition-shadow"
        >
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3 md:p-4">
            <CardTitle className="flex items-center justify-between text-sm md:text-base">
              <span className="flex items-center gap-2">
                <Camera className="w-4 h-4 md:w-5 md:h-5" />
                {item.name}
              </span>
              <Badge
                variant={item.status === "online" ? "default" : "destructive"}
                className="text-xs md:text-sm"
              >
                {item.status.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 p-3 md:p-4">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-32 md:h-40 object-cover rounded-lg mb-2"
            />
            <div className="space-y-1 text-xs md:text-sm">
              <p>
                <strong>Last Plate:</strong> {item.last_plate}
              </p>
              <p>
                <strong>Plates Today:</strong> {item.plates_count}
              </p>
              {item.alert && (
                <Badge variant="destructive" className="mt-1 text-xs md:text-sm">
                  ALERT ACTIVE
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}