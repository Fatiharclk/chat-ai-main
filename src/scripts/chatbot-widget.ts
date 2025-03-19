// Bu dosyayı build edip CDN'e yükleyebilirsiniz
(function () {
  // Widget HTML'i
  const widgetHTML = `
    <div id="chatbot-widget" class="chatbot-container">
      <button id="chatbot-toggle" class="chatbot-toggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      <div id="chatbot-window" class="chatbot-window hidden">
        <div class="chatbot-header">
          <h3>Canlı Destek</h3>
          <button id="chatbot-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div id="chatbot-messages" class="chatbot-messages"></div>
        <div class="chatbot-input">
          <input type="text" id="chatbot-message-input" placeholder="Mesajınızı yazın...">
          <button id="chatbot-send">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // CSS Stilleri
  const styles = `
    .chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .chatbot-toggle {
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .chatbot-toggle:hover {
      background-color: #2563eb;
    }
    .chatbot-window {
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 320px;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      border: 1px solid #e5e7eb;
    }
    .hidden {
      display: none;
    }
    .chatbot-header {
      background-color: #3b82f6;
      color: white;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .chatbot-header h3 {
      margin: 0;
      font-size: 16px;
    }
    .chatbot-header button {
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
    }
    .chatbot-messages {
      padding: 16px;
      overflow-y: auto;
      max-height: 300px;
      min-height: 200px;
    }
    .message {
      margin-bottom: 12px;
      max-width: 80%;
      word-wrap: break-word;
    }
    .message-content {
      padding: 8px 12px;
      border-radius: 8px;
      display: inline-block;
    }
    .user-message {
      margin-left: auto;
      text-align: right;
    }
    .user-message .message-content {
      background-color: #3b82f6;
      color: white;
    }
    .bot-message .message-content {
      background-color: #f3f4f6;
      color: #1f2937;
    }
    .message-time {
      font-size: 11px;
      color: #6b7280;
      margin-top: 4px;
    }
    .chatbot-input {
      display: flex;
      border-top: 1px solid #e5e7eb;
      padding: 8px;
    }
    .chatbot-input input {
      flex: 1;
      border: 1px solid #d1d5db;
      border-radius: 4px 0 0 4px;
      padding: 8px 12px;
      outline: none;
    }
    .chatbot-input input:focus {
      border-color: #3b82f6;
    }
    .chatbot-input button {
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      padding: 0 12px;
      cursor: pointer;
    }
    .chatbot-input button:hover {
      background-color: #2563eb;
    }
  `;

  // Stil ekle
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  // Widget'ı ekle
  const widgetContainer = document.createElement("div");
  widgetContainer.innerHTML = widgetHTML;
  document.body.appendChild(widgetContainer);

  // DOM elementlerini seç
  const toggleButton = document.getElementById("chatbot-toggle");
  const closeButton = document.getElementById("chatbot-close");
  const chatWindow = document.getElementById("chatbot-window");
  const messagesContainer = document.getElementById("chatbot-messages");
  const messageInput = document.getElementById("chatbot-message-input") as HTMLInputElement;
  const sendButton = document.getElementById("chatbot-send");

  // Başlangıç mesajı
  addMessage("Merhaba! Size nasıl yardımcı olabilirim?", "bot");

  // Event listeners
  if (toggleButton && chatWindow) {
    toggleButton.addEventListener("click", () => {
      chatWindow.classList.toggle("hidden");
    });
  }

  if (closeButton && chatWindow) {
    closeButton.addEventListener("click", () => {
      chatWindow.classList.add("hidden");
    });
  }

  if (sendButton) {
    sendButton.addEventListener("click", sendMessage);
  }

  if (messageInput) {
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  function sendMessage(): void {
    if (!messageInput) return;
    
    const message = messageInput.value.trim();
    if (!message) return;

    // Kullanıcı mesajını ekle
    addMessage(message, "user");
    messageInput.value = "";

    // API'ye istek gönder (veya basit yanıt simülasyonu)
    setTimeout(() => {
      // Burada gerçek bir API çağrısı yapabilirsiniz
      const botResponse = getBotResponse(message);
      addMessage(botResponse, "bot");
    }, 1000);
  }

  function addMessage(text: string, sender: "user" | "bot"): void {
    if (!messagesContainer) return;
    
    const messageElement = document.createElement("div");
    messageElement.className = `message ${sender}-message`;

    const now = new Date();
    const timeString =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0");

    messageElement.innerHTML = `
      <div class="message-content">${text}</div>
      <div class="message-time">${timeString}</div>
    `;

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function getBotResponse(message: string): string {
    // Basit yanıt mantığı (gerçek uygulamada API kullanılabilir)
    message = message.toLowerCase();

    if (message.includes("merhaba") || message.includes("selam")) {
      return "Merhaba! Size nasıl yardımcı olabilirim?";
    } else if (message.includes("yardım")) {
      return "Size hangi konuda yardımcı olabilirim?";
    } else if (message.includes("teşekkür")) {
      return "Rica ederim! Başka bir sorunuz var mı?";
    } else if (message.includes("fiyat") || message.includes("ücret")) {
      return "Fiyatlarımız hakkında bilgi almak için lütfen satış ekibimizle iletişime geçin.";
    } else {
      return "Mesajınız için teşekkürler. En kısa sürede size dönüş yapacağız.";
    }
  }
})();
