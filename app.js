import { grammar } from "./grammar.js?v=6";
import { vocabulary } from "./vocabulary.js?v=6";
import { freddieGrammarExamples, freddieVocabularyExamples } from "./freddie-examples.js?v=6";

const list = document.querySelector("#grammar-list");
const searchInput = document.querySelector("#search-input");
const clearSearch = document.querySelector("#clear-search");
const emptyState = document.querySelector("#empty-state");
const resultsLabel = document.querySelector("#results-label");
const resultsCount = document.querySelector("#results-count");
const savedCount = document.querySelector("#saved-count");
const savedLabel = document.querySelector("#saved-label");
const savedToggle = document.querySelector("#saved-toggle");
const surpriseButton = document.querySelector("#surprise-button");
const surpriseTitle = document.querySelector("#surprise-title");
const surpriseSubtitle = document.querySelector("#surprise-subtitle");
const storageNote = document.querySelector("#storage-note");
const resetSearchButton = document.querySelector("#reset-search");
const detailDialog = document.querySelector("#detail-dialog");
const wordDialog = document.querySelector("#word-dialog");
const installDialog = document.querySelector("#install-dialog");
const detailExamples = document.querySelector("#detail-examples");
const examplesCount = document.querySelector("#examples-count");
const examplesToggle = document.querySelector("#examples-toggle");
const freddieToggleButtons = document.querySelectorAll(".freddie-toggle");
const topicFilter = document.querySelector("#topic-filter");
const pageTitle = document.querySelector("#page-title-text");
const introCopy = document.querySelector("#intro-copy");
const offlineStatus = document.querySelector("#offline-status");
const offlineLabel = document.querySelector("#offline-label");

const bookmarkIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.8A1.8 1.8 0 0 1 8.3 3h7.4a1.8 1.8 0 0 1 1.8 1.8V21l-6.8-4-6.8 4z" /></svg>`;
const savedKeys = { grammar: "korean-chingu-saved-v1", vocabulary: "korean-chingu-saved-words-v1" };
const freddieModeKey = "korean-chingu-freddie-mode-v1";
const savedByMode = {
  grammar: readSaved(savedKeys.grammar),
  vocabulary: readSaved(savedKeys.vocabulary)
};
let activeMode = "grammar";
let activeLevel = "all";
let activeCategory = "all";
let savedOnly = false;
let currentGrammarId = null;
let currentWordId = null;
let detailExamplesExpanded = false;
let freddieMode = readFreddieMode();
let deferredInstallPrompt = null;

function readSaved(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

function readFreddieMode() {
  try {
    return localStorage.getItem(freddieModeKey) === "true";
  } catch {
    return false;
  }
}

function persistSaved(mode) {
  try {
    localStorage.setItem(savedKeys[mode], JSON.stringify([...savedByMode[mode]]));
  } catch {
    // The guide remains usable when browser storage is unavailable.
  }
}

function getCurrentSaved() {
  return savedByMode[activeMode];
}

function searchableText(item, mode) {
  if (mode === "vocabulary") {
    const personalExample = freddieVocabularyExamples[item.id];
    return [item.form, item.romanization, item.meaning, item.partOfSpeech, item.category, item.example, item.translation, personalExample?.korean, personalExample?.translation, item.note, item.searchTerms]
      .join(" ").normalize("NFKC").toLocaleLowerCase();
  }
  const exampleText = (item.examples || []).flatMap((example) => [example.korean, example.translation]);
  const personalExample = freddieGrammarExamples[item.id];
  return [item.form, item.meaning, item.category, item.connection, ...exampleText, personalExample?.korean, personalExample?.translation, item.note, item.searchTerms]
    .join(" ").normalize("NFKC").toLocaleLowerCase();
}

function getVisibleItems() {
  const source = activeMode === "grammar" ? grammar : vocabulary;
  const query = searchInput.value.trim().normalize("NFKC").toLocaleLowerCase();
  return source.filter((item) => {
    const matchesLevel = activeLevel === "all" || String(item.level) === activeLevel;
    const matchesCategory = activeMode !== "vocabulary" || activeCategory === "all" || item.category === activeCategory;
    const matchesSaved = !savedOnly || getCurrentSaved().has(item.id);
    const matchesSearch = !query || searchableText(item, activeMode).includes(query);
    return matchesLevel && matchesCategory && matchesSaved && matchesSearch;
  });
}

function makeLibraryCard(item) {
  const isWord = activeMode === "vocabulary";
  const saved = getCurrentSaved().has(item.id);
  const article = document.createElement("article");
  article.className = "grammar-card";
  article.dataset.level = String(item.level);
  article.dataset.mode = activeMode;

  const openButton = document.createElement("button");
  openButton.className = "grammar-main";
  openButton.type = "button";
  openButton.dataset.open = item.id;
  openButton.dataset.kind = activeMode;
  openButton.setAttribute("aria-label", `${item.form}: ${item.meaning}. Open ${isWord ? "word" : "grammar"} details.`);

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
  meaning.textContent = isWord ? `${item.romanization} · ${item.meaning}` : item.meaning;
  text.append(form, meaning);
  openButton.append(marker, text);

  const meta = document.createElement("span");
  meta.className = "card-meta";
  const tag = document.createElement("span");
  tag.className = "level-tag";
  tag.textContent = `TOPIK ${item.level}`;
  const bookmark = document.createElement("button");
  bookmark.className = `bookmark-button${saved ? " is-saved" : ""}`;
  bookmark.type = "button";
  bookmark.dataset.save = item.id;
  bookmark.dataset.saveKind = activeMode;
  bookmark.setAttribute("aria-label", saved ? `Remove ${item.form} from saved ${isWord ? "words" : "grammar"}` : `Save ${item.form}`);
  bookmark.setAttribute("aria-pressed", String(saved));
  bookmark.innerHTML = bookmarkIcon;
  meta.append(tag, bookmark);
  article.append(openButton, meta);
  return article;
}

function renderTopicFilters() {
  const allButton = document.createElement("button");
  allButton.className = "topic-tab is-active";
  allButton.type = "button";
  allButton.dataset.category = "all";
  allButton.setAttribute("aria-pressed", "true");
  allButton.textContent = "All topics";
  topicFilter.append(allButton);

  [...new Set(vocabulary.map((item) => item.category))].forEach((category) => {
    const button = document.createElement("button");
    button.className = "topic-tab";
    button.type = "button";
    button.dataset.category = category;
    button.setAttribute("aria-pressed", "false");
    button.textContent = category;
    topicFilter.append(button);
  });

  topicFilter.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    savedOnly = false;
    syncTopicFilters();
    render();
  });
}

function syncTopicFilters() {
  topicFilter.querySelectorAll("[data-category]").forEach((button) => {
    const active = button.dataset.category === activeCategory;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function syncLevelFilters() {
  document.querySelectorAll(".filter-tab").forEach((button) => {
    const active = button.dataset.level === activeLevel;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function render() {
  const visible = getVisibleItems();
  const currentSaved = getCurrentSaved();
  const isWordMode = activeMode === "vocabulary";
  list.replaceChildren(...visible.map(makeLibraryCard));
  list.hidden = visible.length === 0;
  emptyState.hidden = visible.length !== 0;
  surpriseButton.hidden = visible.length === 0;
  clearSearch.hidden = !searchInput.value;
  storageNote.hidden = !savedOnly;
  topicFilter.hidden = !isWordMode;

  pageTitle.textContent = isWordMode ? "Korean words for the way" : "Korean, one grammar point at a time";
  introCopy.textContent = isWordMode
    ? "Quick meanings, practical topics, and useful examples—ready offline."
    : "A pocket-sized guide to the patterns that make Korean click. Search, save, and come back to it anywhere.";
  document.querySelector("#library").setAttribute("aria-label", isWordMode ? "Vocabulary library" : "Grammar library");
  document.querySelector("#search-input").placeholder = isWordMode ? "Search Hangul, romanization, or meaning" : "Try a form, meaning, or example";
  document.querySelector("label[for='search-input']").textContent = isWordMode ? "Search vocabulary" : "Search grammar";
  savedLabel.textContent = isWordMode ? "Saved words" : "Saved";
  savedToggle.setAttribute("aria-label", isWordMode ? "Show saved words" : "Show saved grammar");
  savedToggle.setAttribute("aria-pressed", String(savedOnly));
  savedCount.textContent = String(currentSaved.size);

  if (savedOnly) {
    resultsLabel.textContent = isWordMode ? "Saved words" : "Saved grammar";
    storageNote.textContent = `Saved ${isWordMode ? "words" : "grammar points"} are stored in this browser on this device. They don’t sync, and clearing site data may remove them.`;
  } else if (isWordMode && activeCategory !== "all") {
    resultsLabel.textContent = activeLevel === "all" ? activeCategory : `${activeCategory} · TOPIK ${activeLevel}`;
  } else if (activeLevel === "all") {
    resultsLabel.textContent = isWordMode ? "All vocabulary" : "All grammar";
  } else {
    resultsLabel.textContent = `TOPIK ${activeLevel} ${isWordMode ? "vocabulary" : "grammar"}`;
  }

  resultsCount.textContent = `${visible.length} ${isWordMode ? (visible.length === 1 ? "word" : "words") : (visible.length === 1 ? "pattern" : "patterns")}`;
  surpriseTitle.textContent = isWordMode ? "Pick a word for me" : "Pick one for me";
  surpriseSubtitle.textContent = isWordMode ? "A quick vocabulary break" : "A quick grammar break";

  if (visible.length === 0) {
    const emptyTitle = document.querySelector("#empty-title");
    const emptyCopy = document.querySelector("#empty-copy");
    if (savedOnly && currentSaved.size === 0) {
      emptyTitle.textContent = isWordMode ? "No saved words yet" : "Nothing saved yet";
      emptyCopy.textContent = `Tap the bookmark beside any ${isWordMode ? "word" : "grammar point"} to keep it here for later.`;
      resetSearchButton.textContent = isWordMode ? "Browse vocabulary" : "Browse grammar";
    } else if (savedOnly) {
      emptyTitle.textContent = isWordMode ? "No saved words match" : "No saved grammar matches";
      emptyCopy.textContent = "Your saved entries are still here. Try clearing the search and filters.";
      resetSearchButton.textContent = "Show all saved";
    } else {
      emptyTitle.textContent = "No matches yet";
      emptyCopy.textContent = isWordMode
        ? "Try a Korean word, romanization, English meaning, or topic."
        : "Try a Korean form, English meaning, or a word from an example.";
      resetSearchButton.textContent = "Clear search and filters";
    }
  }
}

function toggleSaved(id, mode = activeMode) {
  const saved = savedByMode[mode];
  if (saved.has(id)) saved.delete(id);
  else saved.add(id);
  persistSaved(mode);
  render();
  if (mode === "grammar") updateDetailSaveButton();
  else updateWordSaveButton();
}

function updateDetailSaveButton() {
  const item = grammar.find((entry) => entry.id === currentGrammarId);
  if (!item) return;
  const isSaved = savedByMode.grammar.has(item.id);
  const button = document.querySelector("#detail-save");
  button.classList.toggle("is-saved", isSaved);
  button.setAttribute("aria-label", isSaved ? "Remove from saved grammar" : "Save grammar point");
  button.setAttribute("aria-pressed", String(isSaved));
  button.innerHTML = bookmarkIcon;
}

function updateWordSaveButton() {
  const item = vocabulary.find((entry) => entry.id === currentWordId);
  if (!item) return;
  const isSaved = savedByMode.vocabulary.has(item.id);
  const button = document.querySelector("#word-save");
  button.classList.toggle("is-saved", isSaved);
  button.setAttribute("aria-label", isSaved ? "Remove from saved words" : "Save word");
  button.setAttribute("aria-pressed", String(isSaved));
  button.innerHTML = bookmarkIcon;
}

function renderDetailExamples(item) {
  const standardExamples = item.examples || [{ korean: item.example, translation: item.translation }];
  const examples = freddieMode && freddieGrammarExamples[item.id] ? [freddieGrammarExamples[item.id]] : standardExamples;
  const visibleExamples = freddieMode || detailExamplesExpanded ? examples : examples.slice(0, 2);
  detailExamples.replaceChildren(...visibleExamples.map((example, index) => {
    const row = document.createElement("li");
    row.className = "example-item";
    const number = document.createElement("span");
    number.className = "example-index";
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(index + 1).padStart(2, "0");
    const copy = document.createElement("div");
    copy.className = "example-copy";
    const korean = document.createElement("p");
    korean.className = "example-korean";
    korean.lang = "ko";
    korean.textContent = example.korean;
    const translation = document.createElement("p");
    translation.className = "example-translation";
    translation.textContent = example.translation;
    copy.append(korean, translation);
    row.append(number, copy);
    return row;
  }));
  examplesCount.textContent = freddieMode ? "Everyday example" : `${examples.length} examples`;
  examplesToggle.hidden = freddieMode || examples.length <= 2;
  examplesToggle.setAttribute("aria-expanded", String(detailExamplesExpanded));
  examplesToggle.textContent = detailExamplesExpanded ? "Show fewer examples" : `Show ${examples.length - 2} more example${examples.length - 2 === 1 ? "" : "s"}`;
}

function renderWordExample(item) {
  const example = freddieMode && freddieVocabularyExamples[item.id]
    ? freddieVocabularyExamples[item.id]
    : { korean: item.example, translation: item.translation };
  const korean = document.querySelector("#word-example");
  korean.textContent = example.korean;
  korean.lang = "ko";
  document.querySelector("#word-translation").textContent = example.translation;
  document.querySelector("#word-example-count").textContent = freddieMode ? "Everyday example" : "Example";
}

function syncFreddieToggles() {
  freddieToggleButtons.forEach((button) => {
    button.classList.toggle("is-active", freddieMode);
    button.setAttribute("aria-pressed", String(freddieMode));
    const state = button.querySelector(".freddie-state");
    if (state) state.textContent = freddieMode ? "On" : "Off";
  });
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
  detailExamplesExpanded = false;
  renderDetailExamples(item);
  document.querySelector("#detail-note").textContent = item.note;
  updateDetailSaveButton();
  detailDialog.showModal();
}

function openWordDetail(id) {
  const item = vocabulary.find((entry) => entry.id === id);
  if (!item) return;
  currentWordId = id;
  wordDialog.dataset.level = String(item.level);
  document.querySelector("#word-level").textContent = `TOPIK ${item.level}`;
  document.querySelector("#word-category").textContent = item.category.toUpperCase();
  const form = document.querySelector("#word-form");
  form.textContent = item.form;
  form.lang = "ko";
  document.querySelector("#word-pronunciation").textContent = item.romanization;
  document.querySelector("#word-meaning").textContent = item.meaning;
  document.querySelector("#word-type").textContent = item.partOfSpeech;
  renderWordExample(item);
  const note = document.querySelector("#word-note");
  note.textContent = item.note || "";
  note.parentElement.hidden = !item.note;
  updateWordSaveButton();
  syncFreddieToggles();
  wordDialog.showModal();
}

document.querySelectorAll(".mode-tab").forEach((button) => {
  button.addEventListener("click", () => {
    activeMode = button.dataset.mode;
    savedOnly = false;
    activeCategory = "all";
    document.querySelectorAll(".mode-tab").forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    syncTopicFilters();
    render();
  });
});

renderTopicFilters();
document.querySelectorAll(".filter-tab").forEach((button) => {
  button.addEventListener("click", () => {
    activeLevel = button.dataset.level;
    savedOnly = false;
    syncLevelFilters();
    render();
  });
});

searchInput.addEventListener("input", render);
document.querySelector("#search-form").addEventListener("submit", (event) => event.preventDefault());
clearSearch.addEventListener("click", () => { searchInput.value = ""; searchInput.focus(); render(); });
resetSearchButton.addEventListener("click", () => {
  searchInput.value = "";
  activeLevel = "all";
  activeCategory = "all";
  if (!savedOnly || getCurrentSaved().size === 0) savedOnly = false;
  syncLevelFilters();
  syncTopicFilters();
  render();
  searchInput.focus();
});
savedToggle.addEventListener("click", () => { savedOnly = !savedOnly; render(); });
list.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    event.stopPropagation();
    toggleSaved(saveButton.dataset.save, saveButton.dataset.saveKind);
    return;
  }
  const openButton = event.target.closest("[data-open]");
  if (openButton) {
    if (openButton.dataset.kind === "vocabulary") openWordDetail(openButton.dataset.open);
    else openDetail(openButton.dataset.open);
  }
});
surpriseButton.addEventListener("click", () => {
  const options = getVisibleItems();
  if (!options.length) return;
  const item = options[Math.floor(Math.random() * options.length)];
  if (activeMode === "vocabulary") openWordDetail(item.id);
  else openDetail(item.id);
});
document.querySelector("#detail-save").addEventListener("click", () => {
  if (currentGrammarId) toggleSaved(currentGrammarId, "grammar");
});
document.querySelector("#word-save").addEventListener("click", () => {
  if (currentWordId) toggleSaved(currentWordId, "vocabulary");
});
examplesToggle.addEventListener("click", () => {
  const item = grammar.find((entry) => entry.id === currentGrammarId);
  if (!item) return;
  detailExamplesExpanded = !detailExamplesExpanded;
  renderDetailExamples(item);
});
  freddieToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      freddieMode = !freddieMode;
      detailExamplesExpanded = false;
      try {
      localStorage.setItem(freddieModeKey, String(freddieMode));
    } catch {
      // Personal examples still work for this session when storage is unavailable.
    }
    syncFreddieToggles();
    const grammarItem = grammar.find((entry) => entry.id === currentGrammarId);
    const wordItem = vocabulary.find((entry) => entry.id === currentWordId);
    if (detailDialog.open && grammarItem) renderDetailExamples(grammarItem);
    if (wordDialog.open && wordItem) renderWordExample(wordItem);
  });
});
document.querySelector("#close-detail").addEventListener("click", () => detailDialog.close());
document.querySelector("#close-word").addEventListener("click", () => wordDialog.close());
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
  if (event.key === "Escape" && !detailDialog.open && !wordDialog.open && installDialog.open) installDialog.close();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  document.querySelector("#install-button").setAttribute("aria-label", "Install Korean Chingu (optional)");
});

function setOfflineState(label, state) {
  offlineLabel.textContent = label;
  offlineStatus.classList.toggle("is-ready", state === "ready");
  offlineStatus.classList.toggle("is-error", state === "error");
}

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./service-worker.js?v=6", { scope: "./" })
    .then(() => navigator.serviceWorker.ready)
    .then(() => setOfflineState("Offline-ready on this device", "ready"))
    .catch(() => setOfflineState("Open this page online on this device to save it", "error"));
} else {
  setOfflineState("Open this page online on this device to save it", "error");
}

render();
syncFreddieToggles();
