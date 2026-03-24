const fakeConversations = [
  {
    id: "Chat #001",
    lastMessage: "¿Qué necesito para reinscripción?",
    time: "24/03/2026 - 10:30 AM",
    messages: [
      { role: "user", text: "Hola", time: "10:28 AM" },
      { role: "bot", text: "Bienvenido al asistente de Logística Internacional y Aduanas.", time: "10:28 AM" },
      { role: "user", text: "1", time: "10:29 AM" },
      { role: "bot", text: "Inscripción y reinscripción:\n\n1. Cómo llenar la solicitud de inscripción\n2. Requisitos de reinscripción\n3. Documentación necesaria\n4. Fechas de inscripción\n9. Volver al menú principal", time: "10:29 AM" }
    ]
  },
  {
    id: "Chat #002",
    lastMessage: "¿Cómo inicio mi servicio social?",
    time: "24/03/2026 - 10:45 AM",
    messages: [
      { role: "user", text: "2", time: "10:44 AM" },
      { role: "bot", text: "Servicio social:\n\n1. Requisitos\n2. Proceso de inicio\n3. Documentos necesarios\n9. Volver al menú principal", time: "10:45 AM" }
    ]
  },
  {
    id: "Chat #003",
    lastMessage: "No entiendo la solicitud",
    time: "24/03/2026 - 11:02 AM",
    messages: [
      { role: "user", text: "1", time: "11:01 AM" },
      { role: "bot", text: "Cómo llenar la solicitud de inscripción:\n\n1. Ver instrucciones generales\n2. Ver imagen de ejemplo con apartados numerados\n3. Qué va en cada apartado\n4. Qué revisar antes de entregarla\n5. Ver enlace de horarios\n9. Volver al menú principal", time: "11:02 AM" }
    ]
  }
];

const conversationList = document.getElementById("conversationList");
const messagesView = document.getElementById("messagesView");

function renderConversationList() {
  conversationList.innerHTML = "";

  fakeConversations.forEach((conversation, index) => {
    const item = document.createElement("article");
    item.className = `conversation-item ${index === 0 ? "active" : ""}`;

    item.innerHTML = `
      <h3>${conversation.id}</h3>
      <p>Último mensaje: "${conversation.lastMessage}"</p>
      <span>${conversation.time}</span>
    `;

    item.addEventListener("click", () => {
      document.querySelectorAll(".conversation-item").forEach(card => card.classList.remove("active"));
      item.classList.add("active");
      renderMessages(conversation.messages);
    });

    conversationList.appendChild(item);
  });
}

function renderMessages(messages) {
  messagesView.innerHTML = "";

  messages.forEach((message) => {
    const bubble = document.createElement("div");
    bubble.className = `admin-message ${message.role}`;

    bubble.innerHTML = `
      <span class="message-role">${message.role === "user" ? "Estudiante" : "Bot"}</span>
      <p>${message.text}</p>
      <small>${message.time}</small>
    `;

    messagesView.appendChild(bubble);
  });
}

renderConversationList();
renderMessages(fakeConversations[0].messages);