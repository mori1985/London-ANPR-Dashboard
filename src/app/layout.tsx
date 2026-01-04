// src/app/layout.tsx (یا RootLayout)
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 md:ml-64"> {/* md:ml-64 برای دسکتاپ، در موبایل 0 */}
            <Header />
            <main className="p-4 md:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}