// src/components/layout/Header.tsx
// هدف: هدر بالایی داشبورد (جستجو + نوتیفیکیشن + دکمه ورود)
// همیشه نمایش داده میشه (در همه صفحات به جز لندینگ)

"use client";

import { Bell, Search } from "lucide-react";
import AuthButton from "@/components/AuthButton";

export default function Header() {
  return (
    <header className="h-16 bg-gray-900/95 backdrop-blur border-b border-white/10 fixed top-0 right-0 left-64 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* جستجو */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cameras, plates, alerts..."
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/50 w-80"
            />
          </div>
        </div>

        {/* راست: نوتیف + کاربر */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}