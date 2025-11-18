// src/app/layout.tsx
// هدف: سایدبار و هدر همیشه ثابت باشن (حتی در صفحه اصلی)
// کارکرد: 
//   - سایدبار همیشه سمت چپ باشه
//   - هدر همیشه بالا باشه
//   - در صفحه اصلی (/) → پس‌زمینه شفاف بشه تا لندینگ دیده بشه
//   - در بقیه صفحات → پس‌زمینه معمولی

"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
                <main
                  className={`flex-1 overflow-auto pt-16 ${
                    isHome
                      ? "bg-transparent" // در صفحه اصلی → شفاف (لندینگ دیده بشه)
                      : "bg-gray-100 dark:bg-gray-900 p-6" // در بقیه صفحات → معمولی
                  }`}
                >
                  {/* اگر صفحه اصلی باشه → لندینگ با پس‌زمینه گرادیانت */}
                  {isHome ? (
                    <div className="min-h-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
                      {children}
                    </div>
                  ) : (
                    // در بقیه صفحات → محتوای معمولی داشبورد
                    <div className="h-full">{children}</div>
                  )}
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