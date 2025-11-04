// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css"; // حتماً این خط باشه

export const metadata: Metadata = {
  title: "London ANPR Dashboard",
  description: "Real-time traffic monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {children}
      </body>
    </html>
  );
}