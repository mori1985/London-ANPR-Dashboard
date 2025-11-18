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
      <div className="flex items-center gap-3">
        <img
          src={user.photoURL || "/placeholder-user.jpg"}
          alt={user.displayName || "User"}
          className="w-9 h-9 rounded-full object-cover border-2 border-white/20"
        />
        <span className="text-sm font-medium hidden md:block text-white">
          {user.displayName}
        </span>
        <Button size="sm" variant="ghost" onClick={signOutUser} className="text-white hover:bg-white/10">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={signIn} size="sm" className="bg-white text-black hover:bg-gray-200">
      <LogIn className="w-4 h-4 mr-2" />
      Sign In with Google
    </Button>
  );
}