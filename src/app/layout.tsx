// src/app/layout.tsx
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        <AuthProvider>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64">
              <Header />
              <main className="p-8">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}