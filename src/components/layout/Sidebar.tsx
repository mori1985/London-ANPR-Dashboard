// src/components/layout/Sidebar.tsx
// هدف: منوی سمت چپ ثابت (همیشه نمایش داده می‌شود)
// شامل: Home, ANPR Cameras, Live Map, Mobility, Environment, Energy, Health, Events, Admin
// نکته: active state با مسیر فعلی مقایسه میشه

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Camera,
  MapPin,
  Car,
  Trees,
  Zap,
  HeartPulse,
  Calendar,
  Shield,
  Settings,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Camera, label: "ANPR Cameras", href: "/cameras" },        // جدید: دوربین‌ها
  { icon: MapPin, label: "Live Map", href: "/map" },               // جدید: نقشه زنده
  { icon: Car, label: "Mobility", href: "/mobility" },
  { icon: Trees, label: "Environment", href: "/environment" },
  { icon: Zap, label: "Energy", href: "/energy" },
  { icon: HeartPulse, label: "Health", href: "/health" },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: Shield, label: "Security", href: "/security" },
  { icon: Settings, label: "Admin", href: "/admin" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto border-r border-white/10">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          Smart City Pro
        </h1>
        <p className="text-xs text-gray-400 mt-1">London Control Center</p>
      </div>

      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 transition-all ${
                isActive
                  ? "bg-gradient-to-r from-pink-600 to-blue-600 text-white border-r-4 border-white"
                  : "hover:bg-white/10 text-gray-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
        <p className="text-xs text-gray-500">© 2025 Smart City Pro</p>
      </div>
    </div>
  );
}