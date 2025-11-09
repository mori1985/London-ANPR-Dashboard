// src/app/layout.tsx
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { ThemeProvider } from "next-themes";
import AuthButton from "@/components/AuthButton";
import ThemeToggle from "@/components/ThemeToggle";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-full bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <header className="border-b bg-card">
              <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-primary">London ANPR</h1>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <AuthButton />
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}