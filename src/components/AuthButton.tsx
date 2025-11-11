// src/components/AuthButton.tsx
'use client';

import { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, LogIn, Loader2 } from "lucide-react";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      // فقط خطاهای واقعی رو نشون بده
      if (error.code !== "auth/cancelled-popup-request" && error.code !== "auth/popup-closed-by-user") {
        console.error("Sign in error:", error);
        alert("خطا در ورود. دوباره تلاش کنید.");
      }
      // اگر کاربر پاپ‌آپ رو بست → هیچی نشون نده (UX حرفه‌ای)
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) {
    return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />;
  }

  return user ? (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white">
          {user.displayName?.[0] || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="hidden md:block">
        <p className="text-sm font-medium">{user.displayName}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={handleSignOut}>
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  ) : (
    <Button onClick={handleSignIn} disabled={signingIn} className="gap-2">
      {signingIn ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          در حال ورود...
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4" />
          ورود با گوگل
        </>
      )}
    </Button>
  );
}