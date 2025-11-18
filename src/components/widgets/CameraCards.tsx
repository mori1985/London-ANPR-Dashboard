// src/components/widgets/CameraCards.tsx
'use client';

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";
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
    const unsubscribe = onSnapshot(collection(db, "traffic_cameras"), (snapshot) => {
      const cameraData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CameraData));
      cameraData.forEach((item) => {
        if (item.alert && !alertedIds.current.has(item.id)) {
          toast.custom((t) => (
            <div className={`max-w-sm bg-white shadow-2xl rounded-xl p-4 ${t.visible ? "animate-enter" : "animate-leave"}`}>
              <p className="font-bold">Suspicious Plate!</p>
              <p><strong>{item.last_plate}</strong> at {item.name}</p>
            </div>
          ), { duration: 10000 });
          alertedIds.current.add(item.id);
        }
      });
      setData(cameraData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      <Toaster />
      {data.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3">
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                {item.name}
              </span>
              <Badge variant={item.status === "online" ? "default" : "destructive"} className="text-xs">
                {item.status.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <img src={item.image_url} alt="" className="w-full h-32 object-cover rounded-lg mb-2" />
            <div className="space-y-1 text-xs">
              <p><strong>Last Plate:</strong> {item.last_plate}</p>
              <p><strong>Plates Today:</strong> {item.plates_count}</p>
              {item.alert && <Badge variant="destructive" className="mt-1 text-xs">ALERT ACTIVE</Badge>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}