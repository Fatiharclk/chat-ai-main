(function () {
  // Widget stillerini ekle
  const style = document.createElement("style");
  style.innerHTML = `
    #ai-chat-widget-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #0070f3;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      z-index: 9999;
    }
    
    #ai-chat-widget-container {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      overflow: hidden;
      display: none;
    }
    
    #ai-chat-widget-container iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  `;
  document.head.appendChild(style);

  // Widget HTML'ini oluştur
  const widgetButton = document.createElement("div");
  widgetButton.id = "ai-chat-widget-button";
  widgetButton.innerHTML =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/></svg>';

  const chatContainer = document.createElement("div");
  chatContainer.id = "ai-chat-widget-container";
  chatContainer.innerHTML = `<iframe src="https://chat-ai-main-nc0tjvcxe-fatihs-projects-c45cc66e.vercel.app/widget"></iframe>`;

  // Sayfaya ekle
  document.body.appendChild(widgetButton);
  document.body.appendChild(chatContainer);

  // Widget açma/kapama işlevselliği
  let isOpen = false;
  widgetButton.addEventListener("click", function () {
    isOpen = !isOpen;
    chatContainer.style.display = isOpen ? "block" : "none";
  });

  // Global nesne oluştur
  window.ChatWidget = {
    init: function (options) {
      // Özelleştirme seçenekleri burada işlenebilir
      console.log("Chat widget initialized", options);
    },
    open: function () {
      chatContainer.style.display = "block";
      isOpen = true;
    },
    close: function () {
      chatContainer.style.display = "none";
      isOpen = false;
    },
    toggle: function () {
      isOpen = !isOpen;
      chatContainer.style.display = isOpen ? "block" : "none";
    },
  };
})();
