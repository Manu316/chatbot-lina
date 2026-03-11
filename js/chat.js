const API_URL = "http://localhost:3000/chat";
const USE_BACKEND = false;
const SOLICITUD_IMAGE = "img/Solicitud.png";

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
2. Acreditación ingles
3. Alta de materias
4. Baja de materias
5. Horarios y materias (pagina de la facultad)
6. Tramites (mandar al sitLina)
7. Contacto con coordinación
8. Baja temporal del periodo
9. Baja definitiva
0. Ver menú principal nuevamente`,
    options: {
      "1": "inscripcion",
      "2": "ingles",
      "3": "alta",
      "4": "baja",
      "5": "horarios",
      "6": "tramites",
      "7": "contacto",
      "8": "temporal",
      "9": "definitiva",
      "0": "main"
    }
  },

  inscripcion: {
    text:
`Inscripción y reinscripción:

1. Cómo llenar la solicitud de inscripción
2. Requisitos de reinscripción
3. Documentación necesaria
4. Fechas de inscripción
9. Volver al menú principal`,
    options: {
      "1": "solicitud_inscripcion",
      "2": "inscripcion_requisitos",
      "3": "inscripcion_documentacion",
      "4": "inscripcion_fechas",
      "9": "main"
    }
  },

  solicitud_inscripcion: {
    text:
`Cómo llenar la solicitud de inscripción:

1. Ver instrucciones generales
2. Ver imagen de ejemplo con apartados numerados
3. Qué va en cada apartado
4. Qué revisar antes de entregarla
5. Ver enlace de horarios
9. Volver al menú principal`,
    options: {
      "1": "solicitud_general",
      "2": "solicitud_imagen",
      "3": "solicitud_apartados",
      "4": "solicitud_revision",
      "5": "solicitud_horarios",
      "9": "main"
    }
  },

  ingles: {
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

  alta: {
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

  tramites: {
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
  },

  temporal: {
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
  
  definitiva: {
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
  }  
};

const finalResponses = {
  solicitud_general:
    `Guía para llenar la Solicitud de Inscripción a Créditos.
Periodo: Agosto 2026 – Enero 2027.

Antes de iniciar, se recomienda tener a la mano:
- Matrícula
- Horario de experiencias educativas
- Datos personales actualizados

Importante: las materias que aparecen en la imagen son solo un ejemplo ilustrativo. Cada estudiante deberá usar la solicitud correspondiente a su grupo, la cual podrá encontrar publicada en Eminus.`,

  solicitud_imagen: {
    text:
`Aquí puedes ver un ejemplo de la Solicitud de Inscripción a Créditos con los apartados numerados.

Los números indican qué información corresponde en cada espacio del formato. Revísala cuidadosamente antes de llenar tu solicitud.`,
    image: {
      src: SOLICITUD_IMAGE,
      alt: "Ejemplo de solicitud de inscripción"
    },
    link: {
      href: SOLICITUD_IMAGE,
      text: "Abrir imagen en grande"
    }
  },

  solicitud_apartados:
    `La solicitud se llena de la siguiente manera:

1. Nombre completo
Debes escribir primer apellido, segundo apellido y nombre(s), exactamente como aparecen en el sistema institucional.

2. Matrícula
Anota tu número de matrícula completo asignado por la Universidad Veracruzana.

3. Domicilio actual
Escribe tu dirección completa, incluyendo calle, número, colonia, código postal y municipio.

4. Contacto de emergencia
Anota el nombre completo de la persona a contactar en caso de emergencia y su número de teléfono.

5. Número de seguro médico
Escribe tu Número de Seguridad Social (NSS) correspondiente al servicio médico con el que cuentas, por ejemplo IMSS.

6. Correo electrónico y número telefónico
Escribe un correo electrónico activo y un número de teléfono vigente.

7. Inscripción a experiencias educativas
Debes indicar las experiencias educativas que cursarás durante el periodo y verificar que cada materia coincida con su NRC correspondiente.

8. Tutor(a) académico(a)
Escribe el nombre de tu tutor o tutora académica asignado por el programa educativo.

9. Fecha y firma del alumno(a)
Debes escribir la fecha correspondiente y firmar en el apartado de Firma del Alumno(a).`,

  solicitud_revision:
    `Antes de entregar la solicitud, revisa cuidadosamente lo siguiente:

- Que tu nombre esté escrito correctamente
- Que tu matrícula sea correcta
- Que tu domicilio actual esté completo
- Que el contacto de emergencia tenga nombre completo y teléfono
- Que tu NSS esté escrito correctamente
- Que tu correo y número telefónico estén actualizados
- Que el NRC corresponda a la experiencia educativa correcta
- Que el horario coincida con el grupo seleccionado
- Que no existan empalmes de horario
- Que hayas escrito el nombre de tu tutor(a)
- Que la solicitud tenga fecha y firma del alumno(a)`,

  solicitud_horarios:
    `Para confirmar NRC y horarios correctamente, consulta el listado oficial en el siguiente enlace:

https://www.uv.mx/coatza/admon/horarios/`,

  inscripcion_requisitos:
    `Para reinscripción, normalmente debes revisar la convocatoria o fechas oficiales, validar tu situación académica y seguir el procedimiento institucional correspondiente.`,

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

function addMessage(content, sender = "bot") {
  const wrapper = document.createElement("div");
  wrapper.className = `message-wrap ${sender}`;

  const label = document.createElement("div");
  label.className = "message-label";
  label.textContent = sender === "bot" ? "Asistente" : "Tú";

  const bubble = document.createElement("div");
  bubble.className = `message ${sender}`;

  if (typeof content === "string") {
    bubble.textContent = content;
  } else {
    if (content.text) {
      const textBlock = document.createElement("div");
      textBlock.textContent = content.text;
      bubble.appendChild(textBlock);
    }

    if (content.image) {
      const image = document.createElement("img");
      image.src = content.image.src;
      image.alt = content.image.alt || "Imagen";
      image.className = "chat-image";
      bubble.appendChild(image);
    }

    if (content.link) {
      const link = document.createElement("a");
      link.href = content.link.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "chat-image-link";
      link.textContent = content.link.text || "Abrir imagen";
      bubble.appendChild(link);
    }
  }

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
    if (typeof response === "string") {
      return `${response}

Escribe 9 para volver al menú principal.`;
    }

    return {
      ...response,
      text: `${response.text}

Escribe 9 para volver al menú principal.`
    };
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