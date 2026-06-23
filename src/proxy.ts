import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (role !== "ADMIN") {
      const url = new URL("/admin/login", req.url);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/membros/area")) {
    if (!req.auth) {
      const url = new URL("/membros/login", req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/membros/area/:path*"],
};
