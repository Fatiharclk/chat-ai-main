(function (config = {}) {
  console.log("Chatbot widget başlatılıyor...");

  // Basit bir widget oluştur
  const widgetHTML = `
    <div id="nextjs-chatbot-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: sans-serif;">
      <button id="chatbot-toggle" style="background-color: #3b82f6; color: white; border: none; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      <div id="chatbot-window" style="display: none; position: absolute; bottom: 70px; right: 0; width: 320px; height: 400px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); border: 1px solid #e5e7eb;">
        <div style="background-color: #3b82f6; color: white; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 16px;">Canlı Destek</h3>
          <button id="chatbot-close" style="background: transparent; border: none; color: white; cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div style="padding: 16px; height: calc(100% - 120px); overflow-y: auto;">
          <div style="background-color: #f3f4f6; color: #1f2937; padding: 8px 12px; border-radius: 8px; display: inline-block; margin-bottom: 8px;">
            Merhaba! Size nasıl yardımcı olabilirim?
          </div>
        </div>
        <div style="display: flex; border-top: 1px solid #e5e7eb; padding: 8px; position: absolute; bottom: 0; width: 100%; box-sizing: border-box;">
          <input type="text" id="chatbot-message-input" placeholder="Mesajınızı yazın..." style="flex: 1; border: 1px solid #d1d5db; border-radius: 4px 0 0 4px; padding: 8px 12px; outline: none;">
          <button id="chatbot-send" style="background-color: #3b82f6; color: white; border: none; border-radius: 0 4px 4px 0; padding: 0 12px; cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Widget'ı sayfaya ekle
  const widgetContainer = document.createElement("div");
  widgetContainer.innerHTML = widgetHTML;
  document.body.appendChild(widgetContainer);

  // DOM yüklendikten sonra event listener'ları ekle
  window.addEventListener("DOMContentLoaded", function () {
    initChatbot();
  });

  // Eğer DOM zaten yüklendiyse hemen başlat
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(initChatbot, 1);
  }

  function initChatbot() {
    console.log("Chatbot başlatılıyor...");

    const toggleButton = document.getElementById("chatbot-toggle");
    const closeButton = document.getElementById("chatbot-close");
    const chatWindow = document.getElementById("chatbot-window");

    console.log("DOM elementleri:", { toggleButton, closeButton, chatWindow });

    if (!toggleButton || !closeButton || !chatWindow) {
      console.error("Chatbot elementleri bulunamadı!");
      return;
    }

    // Toggle button click event
    toggleButton.addEventListener("click", function () {
      console.log("Toggle button tıklandı");
      if (chatWindow.style.display === "none") {
        chatWindow.style.display = "block";
      } else {
        chatWindow.style.display = "none";
      }
    });

    // Close button click event
    closeButton.addEventListener("click", function () {
      console.log("Close button tıklandı");
      chatWindow.style.display = "none";
    });

    console.log("Chatbot event listener'ları eklendi");
  }
})();
