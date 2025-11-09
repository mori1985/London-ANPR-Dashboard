// src/middleware.ts
import { NextResponse } from "next/server";
import { getAuth } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function middleware(req: any) {
  const token = req.cookies.get("auth-token")?.value;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const user = await getAuth().currentUser;
      const idTokenResult = await user?.getIdTokenResult();
      const isAdmin = idTokenResult?.claims?.admin === true;

      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};