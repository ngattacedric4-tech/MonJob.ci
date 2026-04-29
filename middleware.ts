import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { sendTelegramNotification } from "./src/lib/telegram/sendNotification";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Ignore static assets and API calls.
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "IP inconnue";
  const message = `Nouvelle visite sur ${path} depuis l'IP ${ip}`;

  await sendTelegramNotification(message);

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
