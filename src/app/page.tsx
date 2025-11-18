// src/app/page.tsx
// src/app/page.tsx
// هدف: لندینگ پیج خفن — اما حالا با سایدبار و هدر ثابت
// نکته: پس‌زمینه گرادیانت داره و محتوا روی اون نشون داده میشه

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Globe, Camera, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      <section className="container mx-auto px-6 py-24 text-center">
        <Badge className="mb-4 bg-white/20 backdrop-blur">Smart City Control Center</Badge>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
          London ANPR & Smart City Platform
        </h1>
        <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
          Real-time traffic monitoring, parking management, air quality tracking, and public safety — all in one intelligent dashboard.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild className="bg-white text-black hover:bg-gray-200">
            <Link href="/dashboard">Launch Dashboard</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
            Get Custom Version
          </Button>
        </div>
      </section>

      {/* Demo Cards */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Live Demo</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Camera className="w-8 h-8" />
                ANPR Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white/20 rounded-lg h-48 flex items-center justify-center text-white/70">
                Real-time Plate Recognition & Alerts
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Globe className="w-8 h-8" />
                Interactive Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white/20 rounded-lg h-48 flex items-center justify-center text-white/70">
                MapLibre GL + Live Camera Locations
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose This Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Secure & Private", desc: "GDPR-compliant, encrypted data" },
              { icon: Zap, title: "Real-time Updates", desc: "Firebase + WebSocket sync" },
              { icon: Globe, title: "Scalable", desc: "From 10 to 10,000+ cameras" },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <item.icon className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Need a Custom Version?</h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
          We can deploy this for your city with your branding, language, and integrations.
        </p>
        <Button size="lg" className="bg-gradient-to-r from-pink-500 to-blue-500">
          Contact for Quote <ArrowRight className="ml-2" />
        </Button>
      </section>
    </div>
  );
}