// src/components/AuthButton.tsx
'use client';

import { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, LogIn } from "lucide-react";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) return <div className="w-10 h-10 animate-pulse bg-gray-200 rounded-full" />;

  return user ? (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
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
    <Button onClick={handleSignIn} className="gap-2">
      <LogIn className="w-4 h-4" />
      Sign in with Google
    </Button>
  );
}