// src/app/layout.tsx
// هدف: سایدبار و هدر همیشه باشن — در همه صفحات (حتی صفحه اصلی)
// بدون لندینگ پیج جدا — مستقیم وارد داشبورد می‌شی

"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AuthProvider>
            <div className="flex h-screen">
              {/* سایدبار همیشه هست */}
              <Sidebar />

              <div className="flex-1 flex flex-col ml-64">
                {/* هدر همیشه هست */}
                <Header />

                {/* محتوا */}
                <main className="flex-1 overflow-auto pt-16 p-6">
                  {children}
                </main>
              </div>
            </div>

            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}