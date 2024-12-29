import { Session } from "better-auth";
import { NextRequest, NextResponse } from "next/server";

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/config/routes";

export async function middleware(request: NextRequest) {
  try {
    const { nextUrl } = request;

    const pathname = nextUrl.pathname;

    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);

    if (isApiAuthRoute) return NextResponse.next();

    const response = await fetch(`${nextUrl.origin}/api/auth/get-session`, {
      method: "GET",
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    const session: Session | null = await response.json();
    const isLoggedIn = !!session;

    if (isAuthRoute) {
      return isLoggedIn
        ? NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        : NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
      const callbackUrl = `${pathname}${nextUrl.search || ""}`;
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erro ao verificar a sessão:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
