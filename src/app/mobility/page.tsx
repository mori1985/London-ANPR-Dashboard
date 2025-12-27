// src/app/mobility/page.tsx
// هدف: داده‌های پارکینگ و ترافیک رو زنده از Firestore بگیره

"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function MobilityPage() {
  const [parkingData, setParkingData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "parking_lots"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setParkingData(data);
    });
    return () => unsubscribe();
  }, []);

  const totalFree = parkingData.reduce((sum, lot) => sum + lot.free_spaces, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Mobility & Traffic</h1>
      <p className="text-gray-400 text-lg">Real-time parking availability, traffic flow, and public transport monitoring</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold">Free Parking Spaces</h3>
          <p className="text-6xl font-bold mt-4">1,842</p>
          <p className="text-white/80 mt-2">Across 24 car parks</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold">Average Speed</h3>
          <p className="text-6xl font-bold mt-4">28 mph</p>
          <p className="text-white/80 mt-2">-12% vs yesterday</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold">Bus On-Time</h3>
          <p className="text-6xl font-bold mt-4">94%</p>
          <p className="text-white/80 mt-2">1,247 buses monitored</p>
        </div>
      </div>
    </div>
  );
}