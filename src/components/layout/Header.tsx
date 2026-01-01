// src/components/layout/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, AlertTriangle, Camera, Shield } from "lucide-react";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // بستن dropdown با کلیک جای دیگه
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // نوتیفیکیشن‌های نمونه
  const notifications = [
    { id: 1, title: "Suspicious Plate Detected", description: "AB12 CDE at Piccadilly Circus", time: "5 min ago", type: "alert" },
    { id: 2, title: "Camera Offline", description: "Oxford Street Cam", time: "15 min ago", type: "warning" },
    { id: 3, title: "High Traffic Volume", description: "Westminster Bridge", time: "1 hour ago", type: "info" },
  ];

  return (
    <header className="h-16 bg-gray-900 border-b border-white/10 flex items-center justify-between px-6">
      {/* Quick Stats جایگزین سرچ شد */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-xs text-gray-400">Online Cameras</p>
            <p className="text-lg font-bold text-white">238</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <div>
            <p className="text-xs text-gray-400">Active Alerts</p>
            <p className="text-lg font-bold text-white">7</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-xs text-gray-400">System Status</p>
            <p className="text-lg font-bold text-green-400">Operational</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* نوتیفیکیشن با dropdown */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-white/10 rounded-lg transition"
          >
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="absolute -top-1 -right-1 text-xs text-white bg-red-600 rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {notifications.length}
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 bg-gray-800 rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">Notifications ({notifications.length})</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-4 hover:bg-white/5 transition border-b border-white/5 last:border-0">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-6 h-6 ${
                        notif.type === "alert" ? "text-red-400" : 
                        notif.type === "warning" ? "text-yellow-400" : "text-blue-400"
                      }`} />
                      <div className="flex-1">
                        <p className="text-white font-medium">{notif.title}</p>
                        <p className="text-gray-400 text-sm mt-1">{notif.description}</p>
                        <p className="text-gray-500 text-xs mt-2">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-white/5 text-center">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* کاربر */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <div>
            <p className="text-white font-medium">Morteza Mahmodi</p>
            <p className="text-gray-400 text-xs">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}