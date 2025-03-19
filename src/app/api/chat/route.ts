import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("Chat API çağrıldı");

    const body = await request.json();
    console.log("Gelen mesaj:", body);

    const { message } = body;

    // Burada gerçek bir AI servisi veya kendi mantığınızı entegre edebilirsiniz
    // Örnek: OpenAI, Dialogflow, kendi NLP çözümünüz, vb.

    // Basit bir yanıt simülasyonu
    let response = "Mesajınız alındı.";

    if (message.toLowerCase().includes("merhaba")) {
      response = "Merhaba! Size nasıl yardımcı olabilirim?";
    } else if (message.toLowerCase().includes("yardım")) {
      response = "Size hangi konuda yardımcı olabilirim?";
    } else if (message.toLowerCase().includes("teşekkür")) {
      response = "Rica ederim! Başka bir sorunuz var mı?";
    }

    console.log("Gönderilen yanıt:", response);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "İşlem sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
}
