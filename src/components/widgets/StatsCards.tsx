// src/components/widgets/StatsCards.tsx
'use client';

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function StatsCards() {
  const [stats, setStats] = useState({
    total: 0, online: 0, offline: 0, alerts: 0, plates: 0
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "traffic_cameras"), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      const total = data.length;
      const online = data.filter(c => c.status === "online").length;
      const offline = total - online;
      const alerts = data.filter(c => c.alert).length;
      const plates = data.reduce((sum, c) => sum + (c.plates_count || 0), 0);
      setStats({ total, online, offline, alerts, plates });
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {[
        { label: "Total", value: stats.total, color: "bg-blue-500" },
        { label: "Online", value: stats.online, color: "bg-green-500", icon: CheckCircle },
        { label: "Offline", value: stats.offline, color: "bg-red-500", icon: XCircle },
        { label: "Alerts", value: stats.alerts, color: "bg-pink-500" },
        { label: "Plates Today", value: stats.plates, color: "bg-indigo-500" },
      ].map((stat) => (
        <Card key={stat.label} className={`${stat.color} text-white border-0`}>
          <CardContent className="p-3 md:p-4 text-center">
            <p className="text-xs md:text-sm opacity-90 flex items-center justify-center gap-1">
              {stat.icon && <stat.icon className="w-4 h-4" />}
              {stat.label}
            </p>
            <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}