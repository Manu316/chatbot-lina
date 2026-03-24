const STORAGE_KEY = "chatbot_final_responses";

const defaultResponses = {
  solicitud_general: "Texto de ejemplo...",
  solicitud_apartados: "Texto de ejemplo...",
  solicitud_revision: "Texto de ejemplo...",
  solicitud_horarios: "https://www.uv.mx/coatza/admon/horarios/"
};

const editorGrid = document.getElementById("editorGrid");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const statusText = document.getElementById("statusText");

function loadResponses() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultResponses;
}

function render() {
  const data = loadResponses();
  editorGrid.innerHTML = "";

  Object.keys(data).forEach(key => {
    const card = document.createElement("div");
    card.className = "editor-card";

    const title = document.createElement("h3");
    title.textContent = key;

    const textarea = document.createElement("textarea");
    textarea.value = data[key];
    textarea.dataset.key = key;

    card.appendChild(title);
    card.appendChild(textarea);
    editorGrid.appendChild(card);
  });
}

function save() {
  const textareas = document.querySelectorAll("textarea");

  const data = {};
  textareas.forEach(t => {
    data[t.dataset.key] = t.value;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  statusText.textContent = "Guardado correctamente";
}

function reset() {
  localStorage.removeItem(STORAGE_KEY);
  render();
  statusText.textContent = "Restablecido";
}

saveBtn.onclick = save;
resetBtn.onclick = reset;

render();