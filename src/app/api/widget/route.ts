/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Widget içeriğini önbelleğe al
let cachedWidget: string | null = null;
let lastUpdated = 0;

export async function GET() {
  try {
    const now = Date.now();
    const cacheTime = 3600 * 1000; // 1 saat

    // Önbellekteki widget'ı kontrol et
    if (cachedWidget && now - lastUpdated < cacheTime) {
      return new NextResponse(cachedWidget, {
        headers: {
          "Content-Type": "application/javascript",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // Widget dosyasını oku
    const filePath = path.join(
      process.cwd(),
      "src",
      "widgets",
      "chatbot-widget.js"
    );
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Önbelleğe al
    cachedWidget = fileContent;
    lastUpdated = now;

    // JavaScript dosyası olarak dön
    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Widget dosyası okunamadı:", error);
    return NextResponse.json(
      { error: "Widget dosyası bulunamadı" },
      { status: 500 }
    );
  }
}
