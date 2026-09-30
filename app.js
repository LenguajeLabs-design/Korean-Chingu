import { grammar } from "./grammar.js";

const list = document.querySelector("#grammar-list");
const searchInput = document.querySelector("#search-input");
const clearSearch = document.querySelector("#clear-search");
const emptyState = document.querySelector("#empty-state");
const resultsLabel = document.querySelector("#results-label");
const resultsCount = document.querySelector("#results-count");
const savedCount = document.querySelector("#saved-count");
const savedToggle = document.querySelector("#saved-toggle");
const surpriseButton = document.querySelector("#surprise-button");
const detailDialog = document.querySelector("#detail-dialog");
const installDialog = document.querySelector("#install-dialog");
const offlineStatus = document.querySelector("#offline-status");
const offlineLabel = document.querySelector("#offline-label");

const bookmarkIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.8A1.8 1.8 0 0 1 8.3 3h7.4a1.8 1.8 0 0 1 1.8 1.8V21l-6.8-4-6.8 4z" /></svg>`;
const savedKey = "korean-chingu-saved-v1";
let saved = readSaved();
let activeLevel = "all";
let savedOnly = false;
let currentGrammarId = null;
let deferredInstallPrompt = null;

function readSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(savedKey) || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

function persistSaved() {
  try {
    localStorage.setItem(savedKey, JSON.stringify([...saved]));
  } catch {
    // The guide remains usable when browser storage is unavailable.
  }
}

function escapeText(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function searchableText(item) {
  return [item.form, item.meaning, item.category, item.connection, item.example, item.translation, item.note, item.searchTerms]
    .join(" ").normalize("NFKC").toLocaleLowerCase();
}

function getVisibleGrammar() {
  const query = searchInput.value.trim().normalize("NFKC").toLocaleLowerCase();
  return grammar.filter((item) => {
    const matchesLevel = activeLevel === "all" || String(item.level) === activeLevel;
    const matchesSaved = !savedOnly || saved.has(item.id);
    const matchesSearch = !query || searchableText(item).includes(query);
    return matchesLevel && matchesSaved && matchesSearch;
  });
}

function makeCard(item) {
  const article = document.createElement("article");
  article.className = "grammar-card";
  article.dataset.level = String(item.level);

  const openButton = document.createElement("button");
  openButton.className = "grammar-main";
  openButton.type = "button";
  openButton.dataset.open = item.id;
  openButton.setAttribute("aria-label", `${item.form}: ${item.meaning}. Open grammar details.`);

  const marker = document.createElement("span");
  marker.className = "grammar-level-mark";
  marker.setAttribute("aria-hidden", "true");
  const text = document.createElement("span");
  text.className = "grammar-text";
  const form = document.createElement("span");
  form.className = "grammar-form";
  form.lang = "ko";
  form.textContent = item.form;
  const meaning = document.createElement("span");
  meaning.className = "grammar-meaning";
  meaning.textContent = item.meaning;
  text.append(form, meaning);
  openButton.append(marker, text);

  const meta = document.createElement("span");
  meta.className = "card-meta";
  const tag = document.createElement("span");
  tag.className = "level-tag";
  tag.textContent = `TOPIK ${item.level}`;
  const bookmark = document.createElement("button");
  bookmark.className = `bookmark-button${saved.has(item.id) ? " is-saved" : ""}`;
  bookmark.type = "button";
  bookmark.dataset.save = item.id;
  bookmark.setAttribute("aria-label", saved.has(item.id) ? `Remove ${item.form} from saved` : `Save ${item.form}`);
  bookmark.setAttribute("aria-pressed", String(saved.has(item.id)));
  bookmark.innerHTML = bookmarkIcon;
  meta.append(tag, bookmark);
  article.append(openButton, meta);
  return article;
}

function render() {
  const visible = getVisibleGrammar();
  list.replaceChildren(...visible.map(makeCard));
  list.hidden = visible.length === 0;
  emptyState.hidden = visible.length !== 0;
  clearSearch.hidden = !searchInput.value;

  if (savedOnly) {
    resultsLabel.textContent = "Saved grammar";
    savedToggle.setAttribute("aria-pressed", "true");
  } else {
    resultsLabel.textContent = activeLevel === "all" ? "All grammar" : `TOPIK ${activeLevel} grammar`;
    savedToggle.setAttribute("aria-pressed", "false");
  }
  resultsCount.textContent = `${visible.length} ${visible.length === 1 ? "pattern" : "patterns"}`;
  savedCount.textContent = String(saved.size);
}

function toggleSaved(id) {
  if (saved.has(id)) saved.delete(id);
  else saved.add(id);
  persistSaved();
  render();
  updateDetailSaveButton();
}

function updateDetailSaveButton() {
  const item = grammar.find((entry) => entry.id === currentGrammarId);
  if (!item) return;
  const isSaved = saved.has(item.id);
  const button = document.querySelector("#detail-save");
  button.classList.toggle("is-saved", isSaved);
  button.setAttribute("aria-label", isSaved ? "Remove from saved grammar" : "Save grammar point");
  button.setAttribute("aria-pressed", String(isSaved));
  button.innerHTML = bookmarkIcon;
}

function openDetail(id) {
  const item = grammar.find((entry) => entry.id === id);
  if (!item) return;
  currentGrammarId = id;
  detailDialog.dataset.level = String(item.level);
  document.querySelector("#detail-level").textContent = `TOPIK ${item.level}`;
  document.querySelector("#detail-category").textContent = item.category;
  const form = document.querySelector("#detail-form");
  form.textContent = item.form;
  form.lang = "ko";
  document.querySelector("#detail-meaning").textContent = item.meaning;
  document.querySelector("#detail-connection").textContent = item.connection;
  const example = document.querySelector("#detail-example");
  example.textContent = item.example;
  example.lang = "ko";
  document.querySelector("#detail-translation").textContent = item.translation;
  document.querySelector("#detail-note").textContent = item.note;
  updateDetailSaveButton();
  detailDialog.showModal();
}

document.querySelectorAll(".filter-tab").forEach((button) => {
  button.addEventListener("click", () => {
    activeLevel = button.dataset.level;
    savedOnly = false;
    document.querySelectorAll(".filter-tab").forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    render();
  });
});

searchInput.addEventListener("input", render);
document.querySelector("#search-form").addEventListener("submit", (event) => event.preventDefault());
clearSearch.addEventListener("click", () => { searchInput.value = ""; searchInput.focus(); render(); });
document.querySelector("#reset-search").addEventListener("click", () => { searchInput.value = ""; savedOnly = false; render(); searchInput.focus(); });
savedToggle.addEventListener("click", () => { savedOnly = !savedOnly; render(); });
list.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    event.stopPropagation();
    toggleSaved(saveButton.dataset.save);
    return;
  }
  const openButton = event.target.closest("[data-open]");
  if (openButton) openDetail(openButton.dataset.open);
});
surpriseButton.addEventListener("click", () => {
  const options = getVisibleGrammar();
  if (!options.length) return;
  const item = options[Math.floor(Math.random() * options.length)];
  openDetail(item.id);
});
document.querySelector("#detail-save").addEventListener("click", () => {
  if (currentGrammarId) toggleSaved(currentGrammarId);
});
document.querySelector("#close-detail").addEventListener("click", () => detailDialog.close());
document.querySelector("#close-install").addEventListener("click", () => installDialog.close());
document.querySelector("#install-button").addEventListener("click", async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    return;
  }
  installDialog.showModal();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  if (event.key === "Escape" && !detailDialog.open && installDialog.open) installDialog.close();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  document.querySelector("#install-button").setAttribute("aria-label", "Install Korean Chingu");
});

function setOfflineState(label, state) {
  offlineLabel.textContent = label;
  offlineStatus.classList.toggle("is-ready", state === "ready");
  offlineStatus.classList.toggle("is-error", state === "error");
}

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./service-worker.js", { scope: "./" })
    .then(() => navigator.serviceWorker.ready)
    .then(() => setOfflineState("Saved for offline", "ready"))
    .catch(() => setOfflineState("Open once online to save", "error"));
} else {
  setOfflineState("Open once online to save", "error");
}

render();
