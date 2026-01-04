// src/components/layout/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
  { icon: Camera, label: "ANPR Cameras", href: "/cameras" },
  { icon: MapPin, label: "Live Map", href: "/map" },
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuContent = (
    <>
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          Smart City Pro
        </h1>
        <p className="text-xs text-gray-400 mt-1">London Control Center</p>
      </div>

      <nav className="mt-4 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
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

      <div className="p-6 border-t border-white/10">
        <p className="text-xs text-gray-500">© 2025 Smart City Pro</p>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger button برای موبایل */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-gray-800 rounded-lg shadow-lg"
      >
        {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* سایدبار */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 flex flex-col transform transition-transform duration-300 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static border-r border-white/10`}>
        {menuContent}
      </div>

      {/* Overlay برای بستن در موبایل */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}