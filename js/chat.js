const API_URL = "http://localhost:3000/chat";

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const clearChatBtn = document.getElementById("clearChatBtn");
const quickButtons = document.querySelectorAll(".quick-btn");
const apiStatus = document.getElementById("apiStatus");

function addMessage(text, sender = "bot") {
  const wrapper = document.createElement("div");
  wrapper.className = `message-wrap ${sender}`;

  const label = document.createElement("div");
  label.className = "message-label";
  label.textContent = sender === "bot" ? "Asistente" : "Tú";

  const bubble = document.createElement("div");
  bubble.className = `message ${sender}`;
  bubble.textContent = text;

  wrapper.appendChild(label);
  wrapper.appendChild(bubble);
  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
  const wrapper = document.createElement("div");
  wrapper.className = "message-wrap bot";
  wrapper.id = "typingIndicator";

  const label = document.createElement("div");
  label.className = "message-label";
  label.textContent = "Asistente";

  const bubble = document.createElement("div");
  bubble.className = "message bot";
  bubble.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';

  wrapper.appendChild(label);
  wrapper.appendChild(bubble);
  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

function clearChat() {
  chatMessages.innerHTML = "";
  showWelcomeMessage();
}

function showWelcomeMessage() {
  addMessage(
    "Hola. Soy el asistente de la carrera de Logística Internacional y Aduanas. Puedo ayudarte con dudas frecuentes sobre trámites, materias y procesos escolares.",
    "bot"
  );
}

async function sendMessage(prefilledText = "") {
  const text = (prefilledText || messageInput.value).trim();
  if (!text) return;

  addMessage(text, "user");
  messageInput.value = "";
  messageInput.style.height = "58px";
  sendBtn.disabled = true;
  addTypingIndicator();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener respuesta del servidor.");
    }

    const data = await response.json();
    removeTypingIndicator();
    addMessage(data.reply || "No hubo respuesta disponible.", "bot");
    apiStatus.textContent = "Backend conectado correctamente.";
  } catch (error) {
    removeTypingIndicator();
    addMessage("No fue posible conectar con el servidor. Verifica que el backend esté encendido y que la URL del endpoint sea correcta.", "bot");
    apiStatus.textContent = "Error de conexión con el backend.";
  } finally {
    sendBtn.disabled = false;
  }
}

function autoResizeTextarea() {
  messageInput.style.height = "58px";
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 180)}px`;
}

sendBtn.addEventListener("click", () => sendMessage());

messageInput.addEventListener("input", autoResizeTextarea);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

clearChatBtn.addEventListener("click", clearChat);

quickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    sendMessage(question);
  });
});

showWelcomeMessage();