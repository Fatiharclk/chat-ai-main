import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // API rotaları için CORS başlıklarını ekle
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // OPTIONS isteklerini işle (preflight)
    if (request.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 200 });

      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      response.headers.set("Access-Control-Max-Age", "86400");

      return response;
    }

    const response = NextResponse.next();

    // Tüm API yanıtlarına CORS başlıklarını ekle
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
