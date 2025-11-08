// src/components/AlertList.tsx
'use client';

import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, Volume2 } from "lucide-react";

interface AlertItem {
  id: string;
  plate: string;
  camera: string;
  time: Date;
  image: string;
}

export default function AlertList() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const playSound = () => {
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3");
    audio.play();
  };

  const showNotification = (alert: AlertItem) => {
    if (Notification.permission === "granted") {
      new Notification("Suspicious Plate!", {
        body: `${alert.plate} at ${alert.camera}`,
        icon: alert.image,
      });
    }
  };

  // شبیه‌سازی هشدار جدید
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert: AlertItem = {
          id: Date.now().toString(),
          plate: "AB12 CDE",
          camera: "Kensington High St",
          time: new Date(),
          image: "https://picsum.photos/200",
        };
        setAlerts((prev) => [newAlert, ...prev].slice(0, 5));
        playSound();
        showNotification(newAlert);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // درخواست مجوز نوتیفیکیشن
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <Alert key={alert.id} className="border-pink-200 bg-pink-50">
          <Bell className="h-4 w-4 text-pink-600" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              <strong>{alert.plate}</strong> at <strong>{alert.camera}</strong>
            </span>
            <span className="text-xs text-muted-foreground">
              {alert.time.toLocaleTimeString()}
            </span>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}