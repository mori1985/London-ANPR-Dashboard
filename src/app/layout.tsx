// src/app/layout.tsx
import "./globals.css";
import "leaflet/dist/leaflet.css";
import AuthButton from "@/components/AuthButton";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-blue-600">London ANPR</h1>
              <AuthButton />
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}