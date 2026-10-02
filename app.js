import { grammar } from "./grammar.js?v=14";
import { vocabulary } from "./vocabulary.js?v=14";
import { freddieGrammarExamples, freddieVocabularyExamples } from "./freddie-examples.js?v=14";

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
const intro = document.querySelector(".intro");
const practiceView = document.querySelector("#practice-view");
const practiceHome = document.querySelector("#practice-home");
const missionPlay = document.querySelector("#mission-play");
const missionResults = document.querySelector("#mission-results");
const contextDialog = document.querySelector("#freddie-context-dialog");
const themeToggle = document.querySelector("#theme-toggle");

const bookmarkIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.8A1.8 1.8 0 0 1 8.3 3h7.4a1.8 1.8 0 0 1 1.8 1.8V21l-6.8-4-6.8 4z" /></svg>`;
const savedKeys = { grammar: "korean-chingu-saved-v1", vocabulary: "korean-chingu-saved-words-v1" };
const freddieModeKey = "korean-chingu-freddie-mode-v1";
const wordProgressKey = "korean-chingu-word-progress-v1";
const freddieContextKey = "korean-chingu-freddie-context-v1";
const practiceFreddieKey = "korean-chingu-practice-freddie-v1";
const themePreferenceKey = "korean-chingu-theme-v1";
const routeStampsKey = "korean-chingu-route-stamps-v1";
const contextLabels = {
  seoul: "Travel around Seoul",
  study: "Study breaks",
  work: "Work & commute",
  food: "Food",
  hobbies: "Hobbies",
  friends: "Friends"
};
const defaultFreddieContexts = ["seoul", "study"];
const routeMissions = [
  { id: "seongsu", location: "Seongsu", mapSubtitle: "Café & Culture", title: "Meet a friend in Seongsu", description: "Learn key words for getting around and meeting up near Seoul Forest.", contexts: ["seoul", "friends", "work", "study"], wordIds: ["jido", "yeok", "chulgu", "hwanseung", "dochakhada"] },
  { id: "hongdae", location: "Hongdae", mapSubtitle: "Music & People", title: "Find a favorite lunch spot", description: "Pick a place, order together, and find out how spicy it is.", contexts: ["food", "work", "friends", "study"], wordIds: ["menyu", "jumunhada", "maepda", "jaeryo", "gyesanseo"] },
  { id: "yeouido", location: "Yeouido", mapSubtitle: "Riverside Walks", title: "Take the long way by the river", description: "Ride across town and find a quiet spot along the Han River.", contexts: ["seoul", "study", "hobbies"], wordIds: ["jido", "beoseu", "pyo", "mul", "chulbalhada"] },
  { id: "gwangjang", location: "Gwangjang Market", title: "A market snack run", description: "Choose a bite, check the ingredients, and save the receipt.", category: "Food & Culture", contexts: ["food", "friends", "hobbies"], wordIds: ["gimbap", "allereugi", "jaeryo", "mul", "yeongsujeung"], bonus: true },
  { id: "rainy-commute", location: "Across Seoul", title: "A rainy commute", description: "Top up your transit card as traffic slows down.", category: "Work & Commute", contexts: ["work", "seoul", "study"], wordIds: ["gyotongkadeu", "jihacheol", "makhida", "hwanseung", "gojang-nada"], bonus: true }
];
const savedByMode = {
  grammar: readSaved(savedKeys.grammar),
  vocabulary: readSaved(savedKeys.vocabulary)
};
let activeMode = "grammar";
let activeView = "grammar";
let activeLevel = "all";
let activeCategory = "all";
let savedOnly = false;
let currentGrammarId = null;
let currentWordId = null;
let detailExamplesExpanded = false;
let freddieMode = readFreddieMode();
let deferredInstallPrompt = null;
let practiceFreddieEnabled = readPracticeFreddieEnabled();
let freddieContexts = readFreddieContexts();
let wordProgress = readWordProgress();
let routeStamps = readRouteStamps();
let missionSession = null;
let practiceStage = "home";
let themePreference = readThemePreference();

function readThemePreference() {
  try {
    const preference = localStorage.getItem(themePreferenceKey);
    return preference === "dark" || preference === "light" ? preference : "system";
  } catch {
    return "system";
  }
}

function applyThemePreference() {
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = themePreference === "dark" || (themePreference === "system" && systemPrefersDark);
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "day" : "night"} mode`);
  document.querySelector("#theme-label").textContent = isDark ? "Day" : "Night";
  themeToggle.title = `Switch to ${isDark ? "day" : "night"} mode. Preference is saved in this browser on this device.`;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#131815" : "#f6f6f3");
}

themeToggle.addEventListener("click", () => {
  themePreference = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(themePreferenceKey, themePreference);
  } catch {
    // The selected theme still applies for this visit if browser storage is unavailable.
  }
  applyThemePreference();
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
  if (themePreference === "system") applyThemePreference();
});
applyThemePreference();

function readRouteStamps() {
  try {
    const value = JSON.parse(localStorage.getItem(routeStampsKey) || "[]");
    if (!Array.isArray(value)) return [];
    const migratedIds = value.map((id) => ({ euljiro: "hongdae", "seoul-station": "yeouido" })[id] || id);
    return [...new Set(migratedIds.filter((id) => routeMissions.some((mission) => mission.id === id)))];
  } catch {
    return [];
  }
}

function persistRouteStamps() {
  try {
    localStorage.setItem(routeStampsKey, JSON.stringify(routeStamps));
  } catch {
    // Route progress remains available for this visit if browser storage is unavailable.
  }
}

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

function readPracticeFreddieEnabled() {
  try {
    const value = localStorage.getItem(practiceFreddieKey);
    return value === null ? true : value === "true";
  } catch {
    return true;
  }
}

function readFreddieContexts() {
  try {
    const value = localStorage.getItem(freddieContextKey);
    if (value === null) return [...defaultFreddieContexts];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((context) => Object.hasOwn(contextLabels, context)) : [...defaultFreddieContexts];
  } catch {
    return [...defaultFreddieContexts];
  }
}

function readWordProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(wordProgressKey) || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter(([id, progress]) => vocabulary.some((item) => item.id === id) && progress && typeof progress === "object"));
  } catch {
    return {};
  }
}

function persistWordProgress() {
  try {
    localStorage.setItem(wordProgressKey, JSON.stringify(wordProgress));
  } catch {
    // Practice still works for the current session when browser storage is unavailable.
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

function getNeedsPracticeItems() {
  return vocabulary
    .filter((item) => wordProgress[item.id]?.needsPractice)
    .sort((a, b) => (wordProgress[a.id].lastPracticedAt || 0) - (wordProgress[b.id].lastPracticedAt || 0));
}

function makeProgressWord(item) {
  const row = document.createElement("li");
  const form = document.createElement("b");
  form.lang = "ko";
  form.textContent = item.form;
  const meaning = document.createElement("span");
  meaning.textContent = item.meaning;
  row.append(form, meaning);
  return row;
}

function renderReviewOverview() {
  const dueItems = getNeedsPracticeItems();
  const practicedCount = Object.values(wordProgress).filter((progress) => progress.attempts > 0).length;
  document.querySelector("#practiced-count").textContent = String(practicedCount);

  const due = document.querySelector("#review-due");
  due.replaceChildren();
  const heading = document.createElement("p");
  heading.className = "review-due-heading";
  const list = document.createElement("ul");
  list.className = "review-word-list";
  if (dueItems.length) {
    heading.textContent = `Words to revisit · ${dueItems.length}`;
    dueItems.slice(0, 8).forEach((item) => list.append(makeProgressWord(item)));
    due.append(heading, list);
    if (dueItems.length > 8) {
      const more = document.createElement("p");
      more.className = "review-storage-note";
      more.textContent = `${dueItems.length - 8} more will return in later rounds.`;
      due.append(more);
    }
  } else {
    const empty = document.createElement("p");
    empty.className = "review-empty";
    empty.textContent = practicedCount
      ? "Nothing is waiting for another look. New words you miss will show up here."
      : "Words you miss in a round will return here for another look.";
    due.append(empty);
  }
}

function updateFreddieContextSummary() {
  const selected = freddieContexts.map((context) => contextLabels[context]).filter(Boolean);
  const summary = selected.length
    ? `${selected.join(" · ")} helps suggest your next stop. Freddie examples use familiar everyday scenes; you can change or clear these topics any time.`
    : "No topics selected. All Seoul stops stay open, and Freddie uses broad everyday examples.";
  document.querySelector("#context-summary").textContent = `${summary} Personal details are optional.`;
  document.querySelector("#practice-freddie-toggle").checked = practiceFreddieEnabled;
}

function renderPracticeHome() {
  renderReviewOverview();
  updateFreddieContextSummary();
  renderRouteOverview();
}

function getSuggestedMission() {
  const remainingMainRoute = routeMissions.filter((mission) => !mission.bonus && !routeStamps.includes(mission.id));
  const remaining = routeMissions.filter((mission) => !routeStamps.includes(mission.id));
  const candidates = remainingMainRoute.length
    ? remainingMainRoute
    : remaining.length ? remaining : routeMissions;
  const selected = new Set(freddieContexts);
  const score = (mission) => mission.contexts.filter((context) => selected.has(context)).length;
  const nextInRoute = candidates[0];
  if (score(nextInRoute) > 0) return nextInRoute;
  const bestFit = [...candidates].sort((a, b) => {
    return score(b) - score(a) || routeMissions.indexOf(a) - routeMissions.indexOf(b);
  })[0];
  return score(bestFit) > 0 ? bestFit : nextInRoute;
}

function renderRouteOverview() {
  const stopList = document.querySelector("#route-stops");
  const bonusList = document.querySelector("#bonus-mission-list");
  const suggested = getSuggestedMission();
  document.querySelector("#route-stamp-count").textContent = `${routeStamps.length} / ${routeMissions.length}`;
  const suggestedIndex = routeMissions.findIndex((mission) => mission.id === suggested.id);
  document.querySelector("#featured-mission-count").textContent = `MISSION ${suggestedIndex + 1} OF ${routeMissions.length}`;
  document.querySelector("#featured-mission-title").textContent = suggested.title;
  document.querySelector("#featured-mission-description").textContent = suggested.description;
  const featuredAction = routeStamps.includes(suggested.id)
    ? (suggested.bonus ? "Replay round" : "Revisit stop")
    : (suggested.bonus ? "Start bonus round" : "Start mission");
  setArrowButtonLabel(document.querySelector("#start-mission"), featuredAction);
  stopList.replaceChildren(...routeMissions.filter((mission) => !mission.bonus).map((mission) => {
    const index = routeMissions.indexOf(mission);
    const complete = routeStamps.includes(mission.id);
    const isSuggested = mission.id === suggested.id;
    const row = document.createElement("li");
    row.className = `route-stop${complete ? " is-complete" : ""}${isSuggested ? " is-suggested" : ""}`;
    const button = document.createElement("button");
    button.className = "route-stop-button";
    button.type = "button";
    button.dataset.missionId = mission.id;
    button.setAttribute("aria-label", `${complete ? "Replay" : "Play"} ${mission.location}: ${mission.title}`);
    const marker = document.createElement("span");
    marker.className = "route-stop-marker";
    marker.setAttribute("aria-hidden", "true");
    marker.textContent = complete ? "✓" : String(index + 1).padStart(2, "0");
    const copy = document.createElement("span");
    copy.className = "route-stop-copy";
    const title = document.createElement("strong");
    title.className = "route-stop-title";
    title.textContent = mission.location;
    const subtitle = document.createElement("small");
    subtitle.className = "route-stop-subtitle";
    subtitle.textContent = mission.mapSubtitle;
    copy.append(title, subtitle);
    button.append(marker, copy);
    button.setAttribute("aria-current", isSuggested ? "step" : "false");
    row.append(button);
    return row;
  }));
  bonusList.replaceChildren(...routeMissions.filter((mission) => mission.bonus).map((mission) => {
    const index = routeMissions.indexOf(mission);
    const complete = routeStamps.includes(mission.id);
    const card = document.createElement("article");
    card.className = `bonus-mission-card${complete ? " is-complete" : ""}`;
    const number = document.createElement("span");
    number.className = "bonus-mission-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = complete ? "✓" : String(index + 1).padStart(2, "0");
    const copy = document.createElement("div");
    copy.className = "bonus-mission-copy";
    const meta = document.createElement("p");
    meta.className = "section-label";
    meta.textContent = `ROUND ${index + 1} · ${mission.category.toUpperCase()}`;
    const title = document.createElement("h3");
    title.textContent = mission.title;
    const description = document.createElement("p");
    description.textContent = mission.description;
    const duration = document.createElement("small");
    duration.textContent = "3 minutes · 5 words";
    copy.append(meta, title, description, duration);
    const button = document.createElement("button");
    button.className = "bonus-mission-button";
    button.type = "button";
    button.dataset.missionId = mission.id;
    button.setAttribute("aria-label", `${complete ? "Replay" : "Start"} ${mission.title}, ${mission.location}`);
    setArrowButtonLabel(button, complete ? "Replay round" : "Start round");
    card.append(number, copy, button);
    return card;
  }));
}

function setArrowButtonLabel(button, label) {
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "→";
  button.replaceChildren(document.createTextNode(`${label} `), arrow);
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function makeAnswerOptions(item, questionType) {
  const sameCategory = vocabulary.filter((candidate) => candidate.id !== item.id && candidate.level === item.level && candidate.category === item.category);
  const sameLevel = vocabulary.filter((candidate) => candidate.id !== item.id && candidate.level === item.level);
  const allOther = vocabulary.filter((candidate) => candidate.id !== item.id);
  const candidates = shuffle([...sameCategory, ...sameLevel, ...allOther]);
  const labelFor = (candidate) => questionType === "meaning" ? candidate.meaning : candidate.form;
  const options = [{ id: item.id, label: labelFor(item) }];
  const labels = new Set([labelFor(item).toLocaleLowerCase()]);
  for (const candidate of candidates) {
    const label = labelFor(candidate);
    const key = label.toLocaleLowerCase();
    if (labels.has(key)) continue;
    labels.add(key);
    options.push({ id: candidate.id, label });
    if (options.length === 4) break;
  }
  return shuffle(options);
}

function getMissionExample(item) {
  return practiceFreddieEnabled && freddieVocabularyExamples[item.id]
    ? freddieVocabularyExamples[item.id]
    : { korean: item.example, translation: item.translation };
}

function findKoreanWordForm(item, sentence) {
  const conjugatedForms = {
    maepda: ["매웠어요", "매워요", "매웠", "매워"],
    dowajuda: ["도와줬어요", "도와줘요", "도와줬", "도와줘"]
  };
  const verbStem = item.partOfSpeech === "verb" || item.partOfSpeech === "adjective"
    ? item.form.replace(/하다$/, "").replace(/다$/, "")
    : "";
  const forms = [...new Set([item.form, verbStem, ...(conjugatedForms[item.id] || [])])]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  return forms.find((form) => sentence.includes(form)) || "";
}

function showKoreanSentence(container, sentence, item) {
  const targetWord = findKoreanWordForm(item, sentence);
  const start = targetWord ? sentence.indexOf(targetWord) : -1;
  if (start < 0) {
    container.textContent = sentence;
    return;
  }
  const highlighted = document.createElement("span");
  highlighted.className = "word-highlight";
  highlighted.lang = "ko";
  highlighted.textContent = targetWord;
  container.replaceChildren(
    document.createTextNode(sentence.slice(0, start)),
    highlighted,
    document.createTextNode(sentence.slice(start + targetWord.length))
  );
}

function startMission(missionId = getSuggestedMission().id) {
  const mission = routeMissions.find((candidate) => candidate.id === missionId) || getSuggestedMission();
  const routeItems = mission.wordIds.map((id) => vocabulary.find((item) => item.id === id)).filter(Boolean);
  const routeIds = new Set(routeItems.map((item) => item.id));
  const dueOutsideMission = getNeedsPracticeItems().filter((item) => !routeIds.has(item.id)).slice(0, 2);
  const items = [...dueOutsideMission, ...routeItems].slice(0, 5);
  missionSession = { missionId: mission.id, items, index: 0, correctCount: 0, answered: false, options: [] };
  practiceStage = "play";
  practiceHome.hidden = true;
  missionResults.hidden = true;
  missionPlay.hidden = false;
  document.body.classList.add("is-immersive-round");
  window.scrollTo(0, 0);
  document.querySelector("#mission-question-title").textContent = "A day around Seoul";
  const missionIndex = routeMissions.findIndex((candidate) => candidate.id === mission.id);
  document.querySelector("#results-mission-label").textContent = `MISSION ${missionIndex + 1} OF ${routeMissions.length} · SEOUL ROUTE`;
  renderMissionQuestion();
}

function renderMissionQuestion() {
  if (!missionSession) return;
  const item = missionSession.items[missionSession.index];
  const example = getMissionExample(item);
  const position = missionSession.index + 1;
  const schedule = ["meaning", "reverse", "cloze", "reverse", "meaning"];
  const clozeWord = findKoreanWordForm(item, example.korean);
  const clozeAvailable = Boolean(clozeWord);
  const requestedType = schedule[missionSession.index % schedule.length];
  const questionType = requestedType === "cloze" && !clozeAvailable ? "reverse" : requestedType;
  missionSession.questionType = questionType;
  document.querySelector("#question-count").textContent = `${position} / ${missionSession.items.length}`;
  const progressDots = document.querySelector("#mission-step-dots");
  progressDots.setAttribute("aria-valuemax", String(missionSession.items.length));
  progressDots.setAttribute("aria-valuenow", String(position));
  progressDots.replaceChildren(...missionSession.items.map((_, index) => {
    const dot = document.createElement("span");
    dot.className = `mission-step-dot${index < position ? " is-complete" : ""}`;
    dot.setAttribute("aria-hidden", "true");
    return dot;
  }));
  document.querySelector("#question-level").textContent = `TOPIK ${item.level}`;
  const questionWord = document.querySelector("#question-word");
  const questionExample = document.querySelector("#question-example");
  const questionTranslation = document.querySelector("#question-translation");
  const romanization = document.querySelector("#question-romanization");
  const prompt = document.querySelector("#question-prompt");
  const stageLabel = document.querySelector("#question-stage-label");
  const progress = wordProgress[item.id];
  stageLabel.textContent = progress?.needsPractice ? "ANOTHER LOOK" : progress?.attempts ? "QUICK REVIEW" : "NEW WORD";
  questionWord.textContent = questionType === "meaning" ? item.form : item.meaning;
  questionWord.lang = questionType === "meaning" ? "ko" : "en";
  questionWord.classList.toggle("is-english", questionType !== "meaning");
  romanization.textContent = questionType === "meaning" ? item.romanization : "";
  romanization.hidden = questionType !== "meaning";
  questionTranslation.hidden = false;
  if (questionType === "meaning") {
    prompt.textContent = "What does it mean?";
    questionExample.textContent = example.korean;
    questionExample.lang = "ko";
    questionExample.classList.remove("is-english");
    questionTranslation.textContent = example.translation;
  } else if (questionType === "reverse") {
    prompt.textContent = "Which Korean word matches this meaning?";
    questionExample.textContent = example.translation;
    questionExample.lang = "en";
    questionExample.classList.add("is-english");
    questionTranslation.hidden = true;
  } else {
    prompt.textContent = clozeWord === item.form ? "Fill the blank with the right word." : "Which dictionary form is hidden?";
    questionExample.textContent = example.korean.replace(clozeWord, "＿＿＿");
    questionExample.lang = "ko";
    questionExample.classList.remove("is-english");
    questionTranslation.textContent = example.translation;
  }

  const options = makeAnswerOptions(item, questionType);
  missionSession.options = options;
  missionSession.answered = false;
  const optionContainer = document.querySelector("#answer-options");
  optionContainer.setAttribute("aria-label", questionType === "meaning" ? "Choose the word meaning" : "Choose the Korean word");
  optionContainer.replaceChildren(...options.map((option) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    if (questionType !== "meaning") button.classList.add("is-korean");
    button.type = "button";
    button.dataset.choiceId = option.id;
    button.setAttribute("aria-pressed", "false");
    const label = document.createElement("span");
    label.textContent = option.label;
    label.lang = questionType === "meaning" ? "en" : "ko";
    button.append(label);
    return button;
  }));

  const feedback = document.querySelector("#answer-feedback");
  feedback.hidden = true;
  feedback.classList.remove("is-incorrect");
  document.querySelector("#feedback-title").textContent = "";
  document.querySelector("#feedback-copy").textContent = "";
  document.querySelector("#feedback-translation").textContent = "";
  const next = document.querySelector("#next-question");
  next.disabled = true;
  next.textContent = "Choose an answer";
  window.scrollTo(0, 0);
}

function recordWordAnswer(item, isCorrect) {
  const previous = wordProgress[item.id] || { attempts: 0, correct: 0, misses: 0, needsPractice: false, correctReviews: 0 };
  const progress = {
    ...previous,
    attempts: (previous.attempts || 0) + 1,
    correct: (previous.correct || 0) + (isCorrect ? 1 : 0),
    misses: (previous.misses || 0) + (isCorrect ? 0 : 1),
    lastPracticedAt: Date.now()
  };
  if (isCorrect && previous.needsPractice) {
    progress.correctReviews = (previous.correctReviews || 0) + 1;
    progress.needsPractice = progress.correctReviews < 2;
  } else if (!isCorrect) {
    progress.needsPractice = true;
    progress.correctReviews = 0;
  }
  wordProgress[item.id] = progress;
  persistWordProgress();
}

function answerQuestion(selectedId) {
  if (!missionSession || missionSession.answered) return;
  const item = missionSession.items[missionSession.index];
  const example = getMissionExample(item);
  const isCorrect = selectedId === item.id;
  missionSession.answered = true;
  if (isCorrect) missionSession.correctCount += 1;
  recordWordAnswer(item, isCorrect);

  document.querySelectorAll(".answer-option").forEach((button) => {
    const isAnswer = button.dataset.choiceId === item.id;
    const wasSelected = button.dataset.choiceId === selectedId;
    button.disabled = true;
    button.setAttribute("aria-pressed", String(wasSelected));
    if (isAnswer) {
      button.classList.add("is-correct");
      const mark = document.createElement("span");
      mark.className = "choice-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "✓";
      button.append(mark);
    } else if (wasSelected) {
      button.classList.add("is-incorrect");
      const mark = document.createElement("span");
      mark.className = "choice-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "↺";
      button.append(mark);
    }
  });

  const feedback = document.querySelector("#answer-feedback");
  feedback.hidden = false;
  feedback.classList.toggle("is-incorrect", !isCorrect);
  const updatedProgress = wordProgress[item.id];
  document.querySelector("#feedback-title").textContent = isCorrect ? "정답이에요!" : "Let’s try that one again.";
  const answerMeaning = `${item.form} means “${item.meaning}.”${item.note ? ` ${item.note}` : ""}`;
  document.querySelector("#feedback-copy").textContent = isCorrect
    ? `${updatedProgress.needsPractice ? "Good recall. One more correct review clears this word. " : "That’s right! "}${answerMeaning}`
    : `${answerMeaning} It’ll return for another look.`;
  document.querySelector("#feedback-translation").textContent = `In this sentence: ${example.translation}`;
  const questionExample = document.querySelector("#question-example");
  questionExample.lang = "ko";
  questionExample.classList.remove("is-english");
  showKoreanSentence(questionExample, example.korean, item);
  const questionTranslation = document.querySelector("#question-translation");
  questionTranslation.textContent = example.translation;
  questionTranslation.hidden = false;
  const next = document.querySelector("#next-question");
  next.disabled = false;
  next.textContent = missionSession.index === missionSession.items.length - 1 ? "See your round" : "Next word →";
}

function makeResultsWord(item) {
  const row = makeProgressWord(item);
  const progress = wordProgress[item.id];
  const status = document.createElement("span");
  status.textContent = progress.correctReviews === 1 ? "1 good review" : "needs another look";
  row.append(status);
  return row;
}

function finishMission() {
  if (!missionSession) return;
  const mission = routeMissions.find((candidate) => candidate.id === missionSession.missionId);
  const stampEarned = Boolean(mission && !routeStamps.includes(mission.id));
  if (stampEarned) {
    routeStamps.push(mission.id);
    persistRouteStamps();
  }
  practiceStage = "results";
  missionPlay.hidden = true;
  practiceHome.hidden = true;
  missionResults.hidden = false;
  const dueItems = getNeedsPracticeItems();
  const total = missionSession.items.length;
  document.querySelector("#results-score").textContent = `${missionSession.correctCount} of ${total} correct`;
  const missionIndex = routeMissions.findIndex((candidate) => candidate.id === missionSession.missionId);
  document.querySelector("#results-mission-label").textContent = `MISSION ${missionIndex + 1} OF ${routeMissions.length} · SEOUL ROUTE`;
  document.querySelector("#results-stamp-kicker").textContent = stampEarned ? "YOU EARNED A STAMP" : "STAMP COLLECTED";
  document.querySelector("#results-stamp-name").textContent = mission?.location || "Seoul";
  document.querySelector("#results-stamp-meta").textContent = `MISSION ${missionIndex + 1} OF ${routeMissions.length} · SEOUL ROUTE`;
  document.querySelector("#results-due-list").replaceChildren(...dueItems.slice(0, 8).map(makeResultsWord));
  document.querySelector("#results-due-list").hidden = dueItems.length === 0;
  document.querySelector("#results-review-title").textContent = dueItems.length ? "These words need another look" : "All clear for now";
  const helpfulItem = dueItems[0] || missionSession.items[0];
  const helpfulExample = getMissionExample(helpfulItem);
  document.querySelector("#results-example-korean").textContent = helpfulExample.korean;
  document.querySelector("#results-example-translation").textContent = helpfulExample.translation;
  const summary = document.querySelector("#results-summary");
  const nextMission = getSuggestedMission();
  if (dueItems.length) {
    summary.textContent = `${dueItems.length} ${dueItems.length === 1 ? "word needs" : "words need"} another look. Two correct reviews clear a word from your revisit list.`;
    setArrowButtonLabel(document.querySelector("#play-again"), "Review these words");
  } else {
    summary.textContent = routeStamps.length === routeMissions.length
      ? "Every Seoul stamp is yours. Pick a favorite round and go again."
      : `Next round: ${nextMission.location}. Keep your Seoul day going.`;
    setArrowButtonLabel(document.querySelector("#play-again"), routeStamps.length === routeMissions.length ? "Play another round" : "Start next round");
  }
  document.querySelector("#results-helpful-example").classList.toggle("has-due-words", dueItems.length > 0);
  renderPracticeHome();
  window.scrollTo(0, 0);
}

function returnToPracticeHome() {
  missionSession = null;
  practiceStage = "home";
  document.body.classList.remove("is-immersive-round");
  missionPlay.hidden = true;
  missionResults.hidden = true;
  practiceHome.hidden = false;
  renderPracticeHome();
  window.scrollTo(0, 0);
}

function saveFreddieContexts(contexts) {
  freddieContexts = contexts.filter((context) => Object.hasOwn(contextLabels, context));
  try {
    localStorage.setItem(freddieContextKey, JSON.stringify(freddieContexts));
  } catch {
    // The current round can still use these choices if browser storage is unavailable.
  }
  updateFreddieContextSummary();
  renderRouteOverview();
}

function syncContextDialog() {
  document.querySelectorAll("#context-options input[type='checkbox']").forEach((input) => {
    input.checked = freddieContexts.includes(input.value);
  });
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

function switchStudyView(view) {
  activeView = view;
  document.querySelectorAll(".mode-tab").forEach((tab) => {
    const active = tab.dataset.view === view;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-pressed", String(active));
  });
  const showPractice = view === "practice";
  intro.hidden = showPractice;
  document.querySelector("#library").hidden = showPractice;
  practiceView.hidden = !showPractice;
  if (showPractice && practiceStage === "home") renderPracticeHome();
}

document.querySelectorAll(".mode-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.view;
    if (view === "grammar" || view === "vocabulary") {
      activeMode = view;
      savedOnly = false;
      activeCategory = "all";
      syncTopicFilters();
      render();
    }
    switchStudyView(view);
  });
});

document.querySelector("#route-stops").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mission-id]");
  if (button) startMission(button.dataset.missionId);
});
document.querySelector("#bonus-mission-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mission-id]");
  if (button) startMission(button.dataset.missionId);
});
document.querySelector("#start-mission").addEventListener("click", () => startMission(getSuggestedMission().id));
document.querySelector("#leave-mission").addEventListener("click", returnToPracticeHome);
document.querySelector("#next-question").addEventListener("click", () => {
  if (!missionSession || !missionSession.answered) return;
  if (missionSession.index === missionSession.items.length - 1) {
    finishMission();
    return;
  }
  missionSession.index += 1;
  renderMissionQuestion();
});
document.querySelector("#answer-options").addEventListener("click", (event) => {
  const button = event.target.closest("[data-choice-id]");
  if (button) answerQuestion(button.dataset.choiceId);
});
document.querySelector("#play-again").addEventListener("click", () => {
  const missionId = getNeedsPracticeItems().length ? missionSession?.missionId : getSuggestedMission().id;
  startMission(missionId);
});
document.querySelector("#return-practice-home").addEventListener("click", returnToPracticeHome);
document.querySelector("#practice-freddie-toggle").addEventListener("change", (event) => {
  practiceFreddieEnabled = event.target.checked;
  try {
    localStorage.setItem(practiceFreddieKey, String(practiceFreddieEnabled));
  } catch {
    // The preference still applies during this visit.
  }
});
document.querySelector("#edit-freddie-context").addEventListener("click", () => {
  syncContextDialog();
  contextDialog.showModal();
});
document.querySelector("#close-context-dialog").addEventListener("click", () => contextDialog.close());
document.querySelector("#clear-context-topics").addEventListener("click", () => {
  document.querySelectorAll("#context-options input[type='checkbox']").forEach((input) => { input.checked = false; });
});
document.querySelector("#save-context-topics").addEventListener("click", () => {
  const contexts = [...document.querySelectorAll("#context-options input[type='checkbox']:checked")].map((input) => input.value);
  saveFreddieContexts(contexts);
  contextDialog.close();
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
  navigator.serviceWorker.register("./service-worker.js?v=14", { scope: "./" })
    .then(() => navigator.serviceWorker.ready)
    .then(() => setOfflineState("Offline-ready on this device", "ready"))
    .catch(() => setOfflineState("Open this page online on this device to save it", "error"));
} else {
  setOfflineState("Open this page online on this device to save it", "error");
}

render();
syncFreddieToggles();
