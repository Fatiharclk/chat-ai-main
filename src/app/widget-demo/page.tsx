"use client";

import { useEffect, useState } from "react";

export default function WidgetDemo() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sayfa yüklendikten sonra widget'ı ekle
    const loadWidget = () => {
      // Önceden yüklenmiş bir widget varsa kaldır
      const existingWidget = document.getElementById("nextjs-chatbot-widget");
      if (existingWidget && existingWidget.parentElement) {
        existingWidget.parentElement.removeChild(existingWidget);
      }

      // Yeni widget script'ini ekle
      const script = document.createElement("script");
      script.src = "/api/widget";
      script.onload = () => {
        console.log("Widget script yüklendi");
        setIsLoaded(true);
      };
      script.onerror = (error) => {
        console.error("Widget script yüklenirken hata oluştu:", error);
      };
      document.body.appendChild(script);
    };

    loadWidget();

    // Hata ayıklama için
    const checkWidgetStatus = setInterval(() => {
      const widget = document.getElementById("nextjs-chatbot-widget");
      if (widget) {
        console.log("Widget DOM'da bulundu:", widget);
        clearInterval(checkWidgetStatus);
      }
    }, 1000);

    // Temizleme fonksiyonu
    return () => {
      const existingWidget = document.getElementById("nextjs-chatbot-widget");
      if (existingWidget && existingWidget.parentElement) {
        existingWidget.parentElement.removeChild(existingWidget);
      }
      clearInterval(checkWidgetStatus);
    };
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Chatbot Widget Demo</h1>
      <p className="mb-4">
        Bu sayfada &apos;chatbot-widget&apos; bileşeninin nasıl çalıştığını
        görebilirsiniz.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Widget Entegrasyon Kodu</h2>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
          {`<script src="${
            typeof window !== "undefined" ? window.location.origin : ""
          }/api/widget"></script>`}
        </pre>
      </div>

      <div className="mt-4 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Widget Durumu</h2>
        <p>{isLoaded ? "✅ Widget yüklendi" : "⏳ Widget yükleniyor..."}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sayfayı Yenile
        </button>
      </div>
    </div>
  );
}
