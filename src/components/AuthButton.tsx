// src/components/AuthButton.tsx
// هدف: دکمه ورود با گوگل و نمایش پروفایل کاربر
// کارکرد: استفاده از useAuth() از AuthContext
// نکته: حتماً export default باشه!

"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

export default function AuthButton() {
  const { user, signIn, signOutUser } = useAuth();

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src={user.photoURL || "https://via.placeholder.com/40"}
            alt={user.displayName || "User"}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20 shadow-lg"
          />
          <div className="hidden md:block">
            <p className="text-white font-medium">{user.displayName || "Administrator"}</p>
            <p className="text-gray-400 text-xs">Smart City Pro</p>
          </div>
        </div>

        <Button
          onClick={signOutUser}
          variant="destructive"
          size="sm"
          className="bg-red-600 hover:bg-red-700 shadow-lg"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={signIn}
      size="lg"
      className="bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 text-white font-bold px-8 py-6 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105"
    >
      <LogIn className="w-5 h-5 mr-3" />
      Sign In with Google
    </Button>
  );
}