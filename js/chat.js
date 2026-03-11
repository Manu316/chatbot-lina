const API_URL = "http://localhost:3000/chat";
const USE_BACKEND = false;

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const clearChatBtn = document.getElementById("clearChatBtn");
const quickButtons = document.querySelectorAll(".quick-btn");
const apiStatus = document.getElementById("apiStatus");

let currentMenu = "main";

const menuTree = {
  main: {
    text:
`Bienvenido al asistente de Logística Internacional y Aduanas.

Selecciona una opción escribiendo el número correspondiente:

1. Inscripción y reinscripción
2. Servicio social
3. Baja de materias
4. Horarios y materias
5. Constancias
6. Contacto con coordinación
0. Ver menú principal nuevamente`,
    options: {
      "1": "inscripcion",
      "2": "servicio",
      "3": "baja",
      "4": "horarios",
      "5": "constancias",
      "6": "contacto",
      "0": "main"
    }
  },

  inscripcion: {
    text:
`Inscripción y reinscripción:

1. Requisitos
2. Documentación
3. Fechas
9. Volver al menú principal`,
    options: {
      "1": "inscripcion_requisitos",
      "2": "inscripcion_documentacion",
      "3": "inscripcion_fechas",
      "9": "main"
    }
  },

  servicio: {
    text:
`Servicio social:

1. Requisitos
2. Proceso de inicio
3. Documentos necesarios
9. Volver al menú principal`,
    options: {
      "1": "servicio_requisitos",
      "2": "servicio_proceso",
      "3": "servicio_documentos",
      "9": "main"
    }
  },

  baja: {
    text:
`Baja de materias:

1. Proceso general
2. Recomendaciones
9. Volver al menú principal`,
    options: {
      "1": "baja_proceso",
      "2": "baja_recomendaciones",
      "9": "main"
    }
  },

  horarios: {
    text:
`Horarios y materias:

1. Dónde consultarlos
2. Qué hacer si hay problemas
9. Volver al menú principal`,
    options: {
      "1": "horarios_consulta",
      "2": "horarios_problemas",
      "9": "main"
    }
  },

  constancias: {
    text:
`Constancias:

1. Cómo solicitarlas
2. Recomendaciones
9. Volver al menú principal`,
    options: {
      "1": "constancias_solicitud",
      "2": "constancias_recomendaciones",
      "9": "main"
    }
  },

  contacto: {
    text:
`Contacto con coordinación:

1. Cuándo acudir
2. Qué información tener lista
9. Volver al menú principal`,
    options: {
      "1": "contacto_cuando",
      "2": "contacto_info",
      "9": "main"
    }
  }
};

const finalResponses = {
  inscripcion_requisitos:
    `Para inscripción o reinscripción, normalmente debes revisar la convocatoria o fechas oficiales, validar tu situación académica y seguir el procedimiento institucional correspondiente.`,

  inscripcion_documentacion:
    `La documentación puede variar según el trámite. Lo más recomendable es consultar la información oficial de la carrera o control escolar para confirmar requisitos actualizados.`,

  inscripcion_fechas:
    `Las fechas de inscripción y reinscripción dependen del periodo escolar vigente. Revisa los avisos oficiales o consulta directamente con la coordinación.`,

  servicio_requisitos:
    `Para iniciar servicio social, normalmente debes cumplir con el avance académico requerido y seguir el procedimiento que marque tu institución.`,

  servicio_proceso:
    `El proceso de inicio de servicio social generalmente incluye revisar requisitos, elegir programa o dependencia, entregar documentación y esperar validación.`,

  servicio_documentos:
    `Los documentos para servicio social pueden incluir formatos institucionales, identificación o comprobantes académicos. Verifica siempre la versión oficial vigente.`,

  baja_proceso:
    `Para dar de baja una materia, revisa primero si estás dentro del periodo permitido y consulta el procedimiento correspondiente con el área académica o escolar.`,

  baja_recomendaciones:
    `Antes de dar de baja una materia, considera cómo puede afectar tu carga académica, avance y seriación de experiencias educativas.`,

  horarios_consulta:
    `Los horarios y materias normalmente se consultan en la plataforma institucional correspondiente o mediante los medios oficiales de la facultad.`,

  horarios_problemas:
    `Si detectas errores en horarios o materias, lo recomendable es comunicarte con coordinación o con el área académica lo antes posible.`,

  constancias_solicitud:
    `Para solicitar constancias, revisa el procedimiento institucional y confirma si el trámite se realiza en línea o de manera presencial.`,

  constancias_recomendaciones:
    `Antes de solicitar una constancia, verifica qué tipo necesitas y si hay requisitos previos, pagos o tiempos de entrega.`,

  contacto_cuando:
    `Debes acudir con coordinación cuando tengas dudas sobre carga académica, trámites escolares, seguimiento de procesos o situaciones que no puedas resolver por medios institucionales.`,

  contacto_info:
    `Antes de contactar a coordinación, ten a la mano tu información académica relevante, el detalle del problema y, si aplica, capturas o evidencias.`
};

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
  currentMenu = "main";
  showWelcomeMessage();
}

function showWelcomeMessage() {
  addMessage(
    "Hola. Soy el asistente de la carrera de Logística Internacional y Aduanas.",
    "bot"
  );
  addMessage(menuTree.main.text, "bot");
}

function autoResizeTextarea() {
  messageInput.style.height = "58px";
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 180)}px`;
}

function getMenuResponse(input) {
  const selectedOption = input.trim();

  if (!/^\d+$/.test(selectedOption)) {
    return "Por favor, escribe únicamente el número de la opción que deseas consultar.";
  }

  const currentConfig = menuTree[currentMenu];

  if (!currentConfig || !currentConfig.options[selectedOption]) {
    return "Opción no válida. Por favor selecciona un número que aparezca en el menú actual.";
  }

  const nextStep = currentConfig.options[selectedOption];

  if (menuTree[nextStep]) {
    currentMenu = nextStep;
    return menuTree[nextStep].text;
  }

  if (nextStep === "main") {
    currentMenu = "main";
    return menuTree.main.text;
  }

  const response = finalResponses[nextStep];

  if (response) {
    return `${response}

Escribe 9 para volver al menú principal.`;
  }

  return "No encontré información para esa opción.";
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
    let reply = "";

    if (USE_BACKEND) {
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
      reply = data.reply || "No hubo respuesta disponible.";
      apiStatus.textContent = "Backend conectado correctamente.";
    } else {
      await new Promise(resolve => setTimeout(resolve, 700));
      reply = getMenuResponse(text);
      apiStatus.textContent = "Modo menú local activo.";
    }

    removeTypingIndicator();
    addMessage(reply, "bot");
  } catch (error) {
    removeTypingIndicator();
    addMessage(
      "No fue posible conectar con el servidor. Verifica que el backend esté encendido y que la URL del endpoint sea correcta.",
      "bot"
    );
    apiStatus.textContent = "Error de conexión con el backend.";
  } finally {
    sendBtn.disabled = false;
  }
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

quickButtons.forEach((button, index) => {
  button.textContent = `${index + 1}. ${button.textContent}`;
  button.addEventListener("click", () => {
    sendMessage(String(index + 1));
  });
});

showWelcomeMessage();