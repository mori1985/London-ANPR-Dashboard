// src/app/events/page.tsx
// هدف: نمایش رویدادهای فرهنگی، ورزشی، عمومی
// وضعیت: کاملاً کار می‌کنه — Badge ایمپورت شد

"use client";

import { Calendar, MapPin, Users, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // اضافه شد!

export default function EventsPage() {
  const events = [
    { title: "London Marathon 2025", date: "April 27", attendees: "50,000+", type: "Sports" },
    { title: "Notting Hill Carnival", date: "Aug 24-25", attendees: "2M+", type: "Culture" },
    { title: "Wimbledon Championships", date: "Jun 30-Jul 13", attendees: "500,000+", type: "Sports" },
    { title: "London Fashion Week", date: "Sep 12-16", attendees: "100,000+", type: "Fashion" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
        <Calendar className="w-10 h-10 text-purple-400" />
        Events & Culture
      </h1>
      <p className className="text-gray-300 text-lg">Upcoming major events in London</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.title} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-purple-600">{event.type}</Badge>
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
            <p className="text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {event.date}
            </p>
            <p className="text-gray-300 flex items-center gap-2 mt-2">
              <Users className="w-4 h-4" />
              Expected: {event.attendees}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}