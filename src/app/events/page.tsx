// src/app/events/page.tsx
"use client";

import { Calendar, Users, Star, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EventsPage() {
  const events = [
    {
      title: "London Marathon 2025",
      date: "April 27",
      attendees: "50,000+",
      type: "Sports",
      image_url: "https://picsum.photos/seed/marathon/800/400",
    },
    {
      title: "Notting Hill Carnival",
      date: "Aug 24-25",
      attendees: "2M+",
      type: "Culture",
      image_url: "https://picsum.photos/seed/carnival/800/400",
    },
    {
      title: "Wimbledon Championships",
      date: "Jun 30-Jul 13",
      attendees: "500,000+",
      type: "Sports",
      image_url: "https://picsum.photos/seed/wimbledon/800/400",
    },
    {
      title: "London Fashion Week",
      date: "Sep 12-16",
      attendees: "100,000+",
      type: "Fashion",
      image_url: "https://picsum.photos/seed/fashionweek/800/400",
    },
  ];

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Sports": return "bg-green-600";
      case "Culture": return "bg-blue-600";
      case "Fashion": return "bg-pink-600";
      default: return "bg-purple-600";
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Calendar className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
          Events & Culture
        </h1>
        <p className="text-gray-300 text-base md:text-lg">Upcoming major events in London</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {events.map((event) => (
          <div
            key={event.title}
            className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all hover:shadow-2xl"
          >
            <div className="h-48 md:h-56 relative">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <Badge className={getBadgeColor(event.type)}>
                  {event.type}
                </Badge>
                <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{event.title}</h3>

              <div className="space-y-2 md:space-y-3 text-gray-300 text-sm md:text-base">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4 md:w-5 md:h-5" />
                  Expected: {event.attendees}
                </p>
              </div>

              <button className="mt-4 md:mt-6 w-full bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-white font-medium transition">
                View Details
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}