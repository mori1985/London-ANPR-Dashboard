// src/app/page.tsx
// هدف: صفحه اول بعد از ورود — خوش‌آمدگویی + آمار کلی + لینک به بخش‌ها

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Camera,
  MapPin,
  Car,
  Trees,
  HeartPulse,
  Calendar,
  Shield,
} from "lucide-react";

export default function WelcomePage() {
  const quickLinks = [
    {
      title: "ANPR Cameras",
      icon: Camera,
      href: "/cameras",
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Live Map",
      icon: MapPin,
      href: "/map",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Mobility",
      icon: Car,
      href: "/mobility",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Environment",
      icon: Trees,
      href: "/environment",
      color: "from-teal-500 to-green-600",
    },
    {
      title: "Energy",
      icon: Zap,
      href: "/energy",
      color: "from-yellow-500 to-orange-600",
    },
    {
      title: "Health",
      icon: HeartPulse,
      href: "/health",
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Events",
      icon: Calendar,
      href: "/events",
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Security",
      icon: Shield,
      href: "/security",
      color: "from-gray-600 to-gray-800",
    },
  ];

  return (
    <div className="space-y-8">
      {/* خوش‌آمدگویی */}
      <div className="text-center py-12">
        <Badge className="mb-4">Smart City Control Center</Badge>
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to London Smart City Platform
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Real-time monitoring of traffic, environment, energy, health, and
          public safety — all in one intelligent dashboard.{" "}
        </p>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <CardContent className="pt-6 text-center">
            <Camera className="w-12 h-12 mx-auto mb-2" />
            <p className="text-4xl font-bold">247</p>
            <p className="text-sm opacity-90">Active Cameras</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
          <CardContent className="pt-6 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-2" />
            <p className="text-4xl font-bold">1,842</p>
            <p className="text-sm opacity-90">Parking Spaces</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
          <CardContent className="pt-6 text-center">
            <Trees className="w-12 h-12 mx-auto mb-2" />
            <p className="text-4xl font-bold">42</p>
            <p className="text-sm opacity-90">AQI (Good)</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
          <CardContent className="pt-6 text-center">
            <Zap className="w-12 h-12 mx-auto mb-2" />
            <p className="text-4xl font-bold">4.2 GWh</p>
            <p className="text-sm opacity-90">Daily Energy</p>
          </CardContent>
        </Card>
      </div>

      {/* دسترسی سریع */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card
                className={`bg-gradient-to-br ${link.color} text-white hover:scale-105 transition-transform cursor-pointer`}
              >
                <CardContent className="pt-8 text-center">
                  <link.icon className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-xl font-bold">{link.title}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
