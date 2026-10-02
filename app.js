import { grammar } from "./grammar.js?v=28";
import { vocabulary } from "./vocabulary.js?v=28";
import { freddieGrammarExamples, freddieVocabularyExamples } from "./freddie-examples.js?v=28";
import { examRounds } from "./exam-rounds.js?v=28";

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
const grammarPath = document.querySelector("#grammar-path");
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
const activeMapKey = "korean-chingu-active-map-v1";
const grammarProgressKey = "korean-chingu-grammar-progress-v1";
const contextLabels = {
  seoul: "Travel around Seoul",
  study: "Study breaks",
  work: "Work & commute",
  food: "Food",
  hobbies: "Hobbies",
  friends: "Friends",
  family: "Family"
};
const defaultFreddieContexts = ["seoul", "study"];
const routeMissions = [
  { id: "seongsu", location: "Seongsu", mapSubtitle: "Café & Culture", title: "Meet a friend in Seongsu", description: "Learn key words for getting around and meeting up near Seoul Forest.", contexts: ["seoul", "friends", "work", "study"], wordIds: ["jido", "yeok", "chulgu", "hwanseung", "dochakhada"] },
  { id: "hongdae", location: "Hongdae", mapSubtitle: "Music & People", title: "Find a favorite lunch spot", description: "Pick a place, order together, and find out how spicy it is.", contexts: ["food", "work", "friends", "study"], wordIds: ["menyu", "jumunhada", "maepda", "jaeryo", "gyesanseo"] },
  { id: "yeouido", location: "Yeouido", mapSubtitle: "Riverside Walks", title: "Take the long way by the river", description: "Ride across town and find a quiet spot along the Han River.", contexts: ["seoul", "study", "hobbies"], wordIds: ["jido", "beoseu", "pyo", "mul", "chulbalhada"] },
  { id: "taxi-ride", location: "A taxi to COEX", mapSubtitle: "Ride across Gangnam", title: "Tell the driver where to go", description: "Share your destination, check the fare, and get across town.", category: "Taxi & Transit", contexts: ["seoul", "work"], wordIds: ["taeksi", "mokjeokji", "yogeum", "gisanim", "juso"], bonus: true },
  { id: "gs25-stop", location: "GS25", title: "Make a quick convenience-store stop", description: "Pick up a snack, ask for a bag, and heat it up for the walk.", category: "Shopping & Snacks", contexts: ["food", "seoul", "study"], wordIds: ["pyeonuijeom", "bongtu", "halin", "deuda", "yeongsujeung"], bonus: true },
  { id: "coffee-order", location: "A café in Seongsu", mapSubtitle: "Coffee stop", title: "Order your coffee just right", description: "Choose it warm or iced, and tell the barista how you like it.", category: "Coffee & Cafés", contexts: ["food", "study", "friends"], wordIds: ["keopi", "aiseukeopi", "ttatteuthada", "sireop", "jumunhada"], bonus: true },
  { id: "coworker-school", location: "Lunch in Hongdae", mapSubtitle: "Talk about school", title: "Talk about school over lunch", description: "Swap a few stories about classes, studying, and the next exam.", category: "Work & Study", contexts: ["work", "study"], wordIds: ["dongnyo", "hakgyo", "sueop", "siheom", "gongbuhada"], bonus: true },
  { id: "family-catchup", location: "A family call", title: "Catch up with your family", description: "Ask how everyone is doing and share a small story from Seoul.", category: "Family & People", contexts: ["family", "study", "seoul"], wordIds: ["gajok", "bumonim", "jumal", "jinaeda", "anbu"], bonus: true },
  { id: "subway-reroute", location: "Seoul subway", title: "Reroute a changing commute", description: "Check a delay, switch lines, and see if you can still catch the last train.", category: "Transit plans", contexts: ["seoul", "work", "study"], wordIds: ["jiyeondoeda", "noseon", "galatada", "makcha", "unhaenghada"], bonus: true },
  { id: "seoul-gallery", location: "A Yongsan gallery", mapSubtitle: "Weekend art", title: "Find an exhibition for the weekend", description: "Check the entrance fee, pick a favorite work, and take your time looking.", category: "Art & culture", contexts: ["hobbies", "seoul", "friends"], wordIds: ["jeonsihoe", "ipjangnyo", "jakpum", "jeonsihada", "gamsanghada"], bonus: true },
  { id: "quiet-hotel-room", location: "Your Seoul stay", title: "Ask for a quieter room", description: "Make a polite request, check what is possible, and ask about extra fees.", category: "Travel & stay", contexts: ["seoul", "study", "family"], wordIds: ["joyoteohada", "bakkuda", "yocheonghada", "ganeunghada", "chuga-yogeum"], bonus: true },
  { id: "gwangjang", location: "Gwangjang Market", title: "A market snack run", description: "Choose a bite, check the ingredients, and save the receipt.", category: "Food & Culture", contexts: ["food", "friends", "hobbies"], wordIds: ["gimbap", "allereugi", "jaeryo", "mul", "yeongsujeung"], bonus: true },
  { id: "rainy-commute", location: "Across Seoul", title: "A rainy commute", description: "Top up your transit card as traffic slows down.", category: "Work & Commute", contexts: ["work", "seoul", "study"], wordIds: ["gyotongkadeu", "jihacheol", "makhida", "hwanseung", "gojang-nada"], bonus: true },
  { id: "myeongdong-check-in", location: "Myeongdong", title: "Check in near Myeongdong", description: "Find your stay, hand over your bag, and check when check-in begins.", category: "Travel & Stay", contexts: ["seoul", "study", "work"], wordIds: ["jido", "juso", "sukso", "jim", "chekeuin"], bonus: true },
  { id: "myeongdong-snack", location: "Myeongdong", title: "Pick a street-food favorite", description: "Get a recommendation, check the spice, and take a snack to go.", category: "Food & Culture", contexts: ["food", "friends", "seoul", "study"], wordIds: ["menyu", "chucheonhada", "maepda", "gimbap", "pojanghada"], bonus: true },
  { id: "topik1-quick-replies", location: "TOPIK I · Quick replies", title: "Choose what fits the conversation", description: "Make sense of short questions, simple replies, and everyday details.", category: "TOPIK I exam practice", contexts: ["seoul", "food", "work", "study", "family"], questions: examRounds["topik1-quick-replies"], bonus: true },
  { id: "topik2-seoul-reading", location: "TOPIK II · Seoul reading", title: "Read between the Seoul lines", description: "Read a small chart, follow a story, and spot the main idea.", category: "TOPIK II exam practice", contexts: ["seoul", "work", "hobbies", "study"], questions: examRounds["topik2-seoul-reading"], bonus: true },
  { id: "gyeongbokgung-palace", location: "Gyeongbokgung Palace", mapSubtitle: "Royal courtyards", title: "A morning at the palace", description: "Find Gwanghwamun, try on a hanbok, and take a photo in the palace grounds.", category: "Seoul landmarks", contexts: ["seoul", "hobbies", "friends", "study"], wordIds: ["gyeongbokgung", "gung", "gwanghwamun", "hanbok", "sajin"], bonus: true },
  { id: "bukchon-hanok-village", location: "Bukchon Hanok Village", mapSubtitle: "Quiet hanok lanes", title: "A quiet hanok lane", description: "Walk through this living neighborhood gently: keep voices low and homes private.", category: "Seoul landmarks", contexts: ["seoul", "hobbies", "study"], wordIds: ["bukchon", "hanok", "golmok", "geotda", "joyoteohada"], bonus: true },
  { id: "insadong-stroll", location: "Insadong", mapSubtitle: "Tea & craft shops", title: "Find a small Seoul keepsake", description: "Stroll the lively street, stop for tea, and find a handmade gift.", category: "Seoul landmarks", contexts: ["seoul", "food", "friends", "hobbies"], wordIds: ["insadong", "cha", "gongye-pum", "geori", "sada"], bonus: true },
  { id: "cheonggyecheon-evening", location: "Cheonggyecheon", mapSubtitle: "An evening walk", title: "Follow the stream at dusk", description: "Slow down beside the water and notice how the city changes at night.", category: "Seoul landmarks", contexts: ["seoul", "hobbies", "study"], wordIds: ["cheonggyecheon", "sanchaek", "punggyeong", "bamm", "geotda"], bonus: true },
  { id: "namsan-sunset", location: "Namsan Seoul Tower", mapSubtitle: "Cable car & skyline", title: "Catch the city at sunset", description: "Ride up Namsan, look out over Seoul, and save the view in a photo.", category: "Seoul landmarks", contexts: ["seoul", "friends", "hobbies"], wordIds: ["namsan", "n-seoul-tower", "keibeulka", "jeonmang", "sajin"], bonus: true },
  { id: "changdeokgung-garden", location: "Changdeokgung Palace", mapSubtitle: "Palace garden", title: "Take the garden path", description: "Notice the palace garden, then share one detail that stayed with you.", category: "Seoul landmarks", contexts: ["seoul", "hobbies", "study"], wordIds: ["changdeokgung", "jeongwon", "munhwa", "yumul", "gwanramhada"], bonus: true },
  { id: "ddp-after-dark", location: "Dongdaemun Design Plaza", mapSubtitle: "Design after dark", title: "Explore DDP after dark", description: "Look around the curved landmark, then choose one exhibition or artwork to explore.", category: "Seoul landmarks", contexts: ["seoul", "hobbies", "friends"], wordIds: ["ddp", "geonchuk", "jeonsihoe", "jakpum", "ipjangnyo"], bonus: true },
  { id: "national-museum-day", location: "National Museum of Korea", mapSubtitle: "History & culture", title: "Choose an object with a story", description: "Find a historical object, read its description, and tell a friend what you learned.", category: "Seoul landmarks", contexts: ["seoul", "hobbies", "study", "family"], wordIds: ["national-museum", "munhwa", "yumul", "gwanramhada", "seolmyeong"], bonus: true },
  { id: "mangwon-market-run", location: "Mangwon Market", mapSubtitle: "Market snacks", title: "Pick a market snack", description: "Ask the price, choose something warm, and share a few bites as you explore.", category: "Seoul landmarks", contexts: ["seoul", "food", "friends"], wordIds: ["mangwon-sijang", "sijang", "tteokbokki", "mandu", "eolma"], bonus: true },
  { id: "coex-bongeunsa", location: "COEX & Bongeunsa", mapSubtitle: "A city inside the city", title: "Find a quiet corner at COEX", description: "Browse the huge indoor complex, then take a peaceful pause at nearby Bongeunsa.", category: "Seoul landmarks", contexts: ["seoul", "study", "hobbies"], wordIds: ["coex", "bongeunsa", "doseogwan", "chaek", "gonggan"], bonus: true },
  { id: "lotte-world-tower-view", location: "Lotte World Tower · Seoul Sky", mapSubtitle: "High above Seoul", title: "See Seoul from above", description: "Take the elevator up and describe the view from one of the city’s highest points.", category: "Seoul landmarks", contexts: ["seoul", "hobbies", "study"], wordIds: ["lotte-world-tower", "seoul-sky", "jeonmangdae", "nophda", "ellebeiteo"], bonus: true },
  { id: "seokchon-lake-loop", location: "Seokchon Lake", mapSubtitle: "Lakeside loop", title: "Take the long way around the lake", description: "Choose a gentle loop, spot the flowers, and decide whether to walk or ride.", category: "Seoul landmarks", contexts: ["seoul", "hobbies", "friends"], wordIds: ["seokchon-hosu", "hosu", "jajeongeo", "joging", "kkot"], bonus: true },
  { id: "banpo-rainbow-fountain", location: "Banpo Hangang Park", mapSubtitle: "Bridge lights & river", title: "A river evening in Banpo", description: "Watch the bridge lights by the river. Fountain shows are seasonal and weather-dependent.", category: "Seoul landmarks", contexts: ["seoul", "hobbies", "friends", "food"], wordIds: ["banpo-daegyo", "banpo-hangang-park", "hangang", "bunsu", "bich"], bonus: true },
  { id: "naksan-city-wall", location: "Naksan Park & Seoul City Wall", mapSubtitle: "A hilltop night view", title: "Follow the old city wall", description: "Take a steady walk along the wall and pause for a view over downtown Seoul.", category: "Seoul landmarks", contexts: ["seoul", "hobbies", "friends"], wordIds: ["naksan-park", "seoul-city-wall", "olagada", "jeonmang", "sanchaek"], bonus: true },
  { id: "gyeonghuigung-palace", location: "Gyeonghuigung Palace", mapSubtitle: "A quiet royal courtyard", title: "Find the palace of the west", description: "Walk the calm palace grounds, then follow the story toward Seodaemun.", category: "Seoul heritage", contexts: ["seoul", "hobbies", "study"], wordIds: ["gyeonghuigung", "gung", "geotda", "sajin", "munhwa"], bonus: true },
  { id: "seoul-history-museum", location: "Seoul Museum of History", mapSubtitle: "Old Seoul, one room at a time", title: "See how Seoul changed", description: "Read a short exhibit label and spot how the city has changed over time.", category: "Seoul heritage", contexts: ["seoul", "study", "hobbies"], wordIds: ["seoul-history-museum", "yumul", "sajin", "jido", "munhwa"], bonus: true },
  { id: "donuimun-village", location: "Donuimun Museum Village", mapSubtitle: "Preserved neighborhood lanes", title: "Explore a historic lane", description: "Follow a small lane of old Seoul and notice what feels different today.", category: "Seoul heritage", contexts: ["seoul", "hobbies", "friends"], wordIds: ["donuimun-museum-village", "golmok", "geori", "hanok", "punggyeong"], bonus: true },
  { id: "dongnimmun-gate", location: "Dongnimmun Gate", mapSubtitle: "Independence Gate", title: "Meet by the old gate", description: "Find a landmark beside the city wall and share its story with a friend.", category: "Seoul heritage", contexts: ["seoul", "friends", "study"], wordIds: ["dongnimmun", "seoul-city-wall", "yeoksa", "jido", "sajin"], bonus: true },
  { id: "seodaemun-park", location: "Seodaemun Independence Park", mapSubtitle: "An open-air history walk", title: "Close the loop in Seodaemun", description: "Take a quiet park walk and recap one thing you learned along the way.", category: "Seoul heritage", contexts: ["seoul", "hobbies", "study"], wordIds: ["seodaemun-independence-park", "sanchaek", "punggyeong", "munhwa", "yeoksa"], bonus: true },
  { id: "ttukseom-riverside", location: "Ttukseom Hangang Park", mapSubtitle: "A riverside bike ride", title: "Take the river path", description: "Choose a bike or a slow walk and follow the Han River through the park.", category: "Parks & outdoors", contexts: ["seoul", "hobbies", "friends"], wordIds: ["ttukseom-hangang-park", "hangang", "jajeongeo", "sanchaek", "punggyeong"], bonus: true },
  { id: "konkuk-lunch", location: "Konkuk University", mapSubtitle: "Lunch near campus", title: "Find a lunch spot near campus", description: "Meet a friend after class, choose a menu, and ask for a recommendation.", category: "Campus & food", contexts: ["food", "friends", "study"], wordIds: ["konkuk-university", "menyu", "chucheonhada", "gimbap", "keopi"], bonus: true },
  { id: "childrens-grand-park", location: "Children's Grand Park", mapSubtitle: "Gardens and open paths", title: "Take a garden break", description: "Follow a leafy path, spot the flowers, and enjoy a slower afternoon.", category: "Parks & outdoors", contexts: ["seoul", "hobbies", "family"], wordIds: ["childrens-grand-park", "kkot", "jajeongeo", "sanchaek", "sajin"], bonus: true },
  { id: "achasan-trail", location: "Achasan", mapSubtitle: "A hilltop view of Seoul", title: "Climb for the city view", description: "Take the trail at your own pace and look out across eastern Seoul.", category: "Parks & outdoors", contexts: ["seoul", "hobbies", "study"], wordIds: ["achasan", "olagada", "jeonmang", "punggyeong", "joging"], bonus: true },
  { id: "suwon-station", location: "Suwon Station", mapSubtitle: "Start the day trip", title: "Set off for Suwon", description: "Check the station, find the right exit, and get ready for a day out.", category: "Day trips", contexts: ["seoul", "study", "friends"], wordIds: ["yeok", "pyo", "chulgu", "jido", "chulbalhada"], bonus: true },
  { id: "paldalmun-gate", location: "Paldalmun Gate", mapSubtitle: "The south gate of Hwaseong", title: "Find the southern gate", description: "Meet near the gate and check where the fortress trail begins.", category: "Suwon heritage", contexts: ["seoul", "friends", "study"], wordIds: ["paldalmun", "hwaseong-fortress", "yeoksa", "sajin", "geotda"], bonus: true },
  { id: "suwon-market", location: "A market in old Suwon", mapSubtitle: "A traditional market break", title: "Choose a market snack", description: "Check the price, pick something warm, and save room for the walk.", category: "Day trips & food", contexts: ["food", "friends", "seoul"], wordIds: ["sijang", "eolma", "mandu", "sada", "gimbap"], bonus: true },
  { id: "suwon-haenggung", location: "Hwaseong Haenggung", mapSubtitle: "The temporary palace", title: "Step into the palace courtyard", description: "Explore the royal grounds and notice one detail worth remembering.", category: "Suwon heritage", contexts: ["seoul", "hobbies", "study"], wordIds: ["suwon-haenggung", "hanbok", "gung", "gwanramhada", "sajin"], bonus: true },
  { id: "banghwasuryujeong", location: "Banghwasuryujeong Pavilion", mapSubtitle: "A pond-side pause", title: "Take in the pavilion view", description: "Slow down beside Yongyeon Pond and describe the view from the pavilion.", category: "Suwon heritage", contexts: ["seoul", "hobbies", "friends"], wordIds: ["banghwasuryujeong", "jeonmang", "punggyeong", "sanchaek", "mul"], bonus: true }
];
const mapChapters = [
  {
    id: "seoul-day", title: "A day around Seoul", area: "Seongsu · Hongdae · Yeouido",
    description: "Follow the original neighborhood route from Seongsu to the Han River.",
    image: "./assets/seoul-route-map.jpg?v=28",
    alt: "Watercolor Seoul map connecting neighborhood cafés, lively streets, and the Han River.",
    missionIds: ["seongsu", "coffee-order", "hongdae", "coworker-school", "yeouido"],
    points: [[35, 50], [45, 68], [57, 48], [66, 67], [83, 48]]
  },
  {
    id: "royal-seoul", title: "Royal Seoul", area: "Palaces · hanok lanes · stream",
    description: "Wander from palace courtyards through quiet hanok lanes and old Seoul streets.",
    image: "./assets/royal-seoul-map.jpg?v=28",
    alt: "Watercolor route through palace courtyards, hanok lanes, tea shops, gardens, and Cheonggyecheon.",
    missionIds: ["gyeongbokgung-palace", "bukchon-hanok-village", "insadong-stroll", "changdeokgung-garden", "cheonggyecheon-evening"],
    points: [[36, 51], [48, 42], [59, 55], [71, 45], [83, 51]]
  },
  {
    id: "old-seoul-evening", title: "Old Seoul after dark", area: "Myeongdong · markets · city wall",
    description: "Check in, find a market snack, and follow the evening lights toward Naksan.",
    image: "./assets/downtown-seoul-map.jpg?v=28",
    alt: "Watercolor Seoul evening route past market stalls, DDP, the old city wall, and Myeongdong lights.",
    missionIds: ["myeongdong-check-in", "myeongdong-snack", "gwangjang", "ddp-after-dark", "naksan-city-wall"],
    points: [[36, 48], [47, 57], [58, 43], [70, 56], [83, 48]]
  },
  {
    id: "river-and-views", title: "River & city views", area: "Mangwon · Banpo · Namsan",
    description: "Follow the river from a neighborhood market toward museums and hilltop views.",
    image: "./assets/river-seoul-map.jpg?v=28",
    alt: "Watercolor Seoul river route from a neighborhood market past Banpo, a museum, and Namsan.",
    missionIds: ["mangwon-market-run", "banpo-rainbow-fountain", "national-museum-day", "seoul-gallery", "namsan-sunset"],
    points: [[36, 48], [48, 57], [60, 44], [71, 56], [83, 48]]
  },
  {
    id: "gangnam-jamsil", title: "Gangnam to Jamsil", area: "COEX · Bongeunsa · Seokchon",
    description: "Ride across Gangnam, pause by the lake, and finish high above the city.",
    image: "./assets/gangnam-seoul-map.jpg?v=28",
    alt: "Watercolor route through COEX, Bongeunsa, Seokchon Lake, and the Lotte World Tower skyline.",
    missionIds: ["taxi-ride", "coex-bongeunsa", "subway-reroute", "seokchon-lake-loop", "lotte-world-tower-view"],
    points: [[36, 50], [48, 43], [60, 56], [72, 44], [84, 52]]
  },
  {
    id: "everyday-seoul", title: "An everyday Seoul day", area: "Your stay · corner shop · commute",
    description: "Make a few familiar stops and end the day with a call home.",
    image: "./assets/everyday-seoul-map.jpg?v=28",
    alt: "Watercolor everyday Seoul route past a hotel, convenience store, subway, and a quiet room.",
    missionIds: ["quiet-hotel-room", "gs25-stop", "rainy-commute", "family-catchup"],
    points: [[39, 49], [53, 57], [68, 44], [83, 52]]
  },
  {
    id: "seodaemun-walk", title: "Old Seoul westward", area: "Gyeonghuigung · Donuimun · Seodaemun",
    description: "Walk from a quiet palace through old city streets toward Seodaemun.",
    image: "./assets/seodaemun-route-map.jpg?v=28",
    alt: "Watercolor walking route through a historic Seoul palace, hanok lanes, old city wall, and leafy museum courtyard.",
    missionIds: ["gyeonghuigung-palace", "seoul-history-museum", "donuimun-village", "dongnimmun-gate", "seodaemun-park"],
    points: [[36, 50], [46, 42], [57, 55], [69, 44], [82, 52]]
  },
  {
    id: "eastern-parks", title: "Eastern Seoul outdoors", area: "Ttukseom · Konkuk · Achasan",
    description: "Follow the river past neighborhood parks and finish with a view over eastern Seoul.",
    image: "./assets/eastern-parks-map.jpg?v=28",
    alt: "Watercolor route along the Han River in eastern Seoul, with Ttukseom lawns, a cycling path, trees, and distant rooftops.",
    missionIds: ["ttukseom-riverside", "konkuk-lunch", "childrens-grand-park", "achasan-trail"],
    points: [[39, 49], [53, 43], [67, 57], [82, 49]]
  },
  {
    id: "suwon-day", title: "A Suwon fortress day", area: "Suwon Station · Hwaseong · Haenggung",
    description: "Take a day trip south for Suwon's market, royal courtyard, and UNESCO-listed fortress.",
    image: "./assets/suwon-fortress-map.jpg?v=28",
    alt: "Watercolor route through Suwon's stone fortress walls, traditional gate, palace rooftops, and market lane.",
    missionIds: ["suwon-station", "paldalmun-gate", "suwon-market", "suwon-haenggung", "banghwasuryujeong"],
    points: [[35, 50], [46, 42], [57, 55], [69, 44], [82, 52]]
  }
];
const mappedMissionIds = new Set(mapChapters.flatMap((chapter) => chapter.missionIds));
const savedByMode = {
  grammar: readSaved(savedKeys.grammar),
  vocabulary: readSaved(savedKeys.vocabulary)
};
let activeMode = "grammar";
let activeView = "grammar";
let activeLevel = "1";
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
let completedGrammarIds = readGrammarProgress();
let routeStamps = readRouteStamps();
let activeMapId = readActiveMapId();
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
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#171922" : "#f6f6f3");
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

function readGrammarProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(grammarProgressKey) || "[]");
    if (!Array.isArray(value)) return new Set();
    return new Set(value.filter((id) => grammar.some((item) => item.id === id)));
  } catch {
    return new Set();
  }
}

function persistGrammarProgress() {
  try {
    localStorage.setItem(grammarProgressKey, JSON.stringify([...completedGrammarIds]));
  } catch {
    // Grammar progress remains available for this visit if browser storage is unavailable.
  }
}

function getGrammarPathItems(level) {
  return grammar.filter((item) => item.level === level);
}

function getNextGrammarItem(level) {
  const items = getGrammarPathItems(level);
  return items.find((item) => !completedGrammarIds.has(item.id)) || items[0] || null;
}

function renderGrammarPath() {
  const isWordMode = activeMode === "vocabulary";
  const isBrowsing = !searchInput.value.trim() && !savedOnly;
  grammarPath.hidden = isWordMode || !isBrowsing;
  if (grammarPath.hidden) return;

  const level = activeLevel === "2" ? 2 : 1;
  const items = getGrammarPathItems(level);
  const completeCount = items.filter((item) => completedGrammarIds.has(item.id)).length;
  const complete = items.length > 0 && completeCount === items.length;
  const nextItem = complete ? items[0] : getNextGrammarItem(level);
  const progress = items.length ? Math.round((completeCount / items.length) * 100) : 0;

  document.querySelector("#grammar-path-state").textContent = complete ? `PATH COMPLETE · TOPIK ${level}` : `YOUR NEXT PATTERN · TOPIK ${level}`;
  const pathForm = document.querySelector("#grammar-path-form");
  pathForm.textContent = complete ? `TOPIK ${level} complete` : nextItem?.form || "No patterns yet";
  pathForm.lang = complete ? "en" : "ko";
  document.querySelector("#grammar-path-meaning").textContent = complete
    ? "You’ve marked every pattern as understood. Choose one below to review."
    : nextItem?.meaning || "Add a grammar pattern to begin.";
  document.querySelector("#grammar-path-count").textContent = `${completeCount} of ${items.length} patterns understood`;
  document.querySelector("#grammar-path-percent").textContent = `${progress}%`;
  document.querySelector("#grammar-path-fill").style.width = `${progress}%`;
  const progressTrack = document.querySelector(".grammar-path-track");
  progressTrack.setAttribute("aria-label", `TOPIK ${level} grammar progress`);
  progressTrack.setAttribute("aria-valuemax", String(items.length));
  progressTrack.setAttribute("aria-valuenow", String(completeCount));
  const buttonLabel = complete ? "Review first pattern" : completeCount ? `Continue with ${nextItem?.form}` : "Start your first pattern";
  document.querySelector("#grammar-path-start").innerHTML = `${buttonLabel} <span aria-hidden="true">→</span>`;
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
  meta.classList.toggle("is-level-filtered", activeLevel !== "all");
  const tag = document.createElement("span");
  tag.className = "level-tag";
  tag.textContent = `TOPIK ${item.level}`;
  tag.hidden = activeLevel !== "all";
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
  renderGrammarPath();

  pageTitle.textContent = isWordMode ? "Korean words for the way" : "Korean grammar";
  introCopy.textContent = isWordMode
    ? "Quick meanings, practical topics, and useful examples—ready offline."
    : "Learn one pattern at a time. Mark it understood when you’re ready, then move on.";
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

function getMissionDifficulty(mission) {
  if (mission.questions?.length) return Number(mission.questions[0].level) === 2 ? 2 : 1;
  const levels = (mission.wordIds || []).map((id) => vocabulary.find((item) => item.id === id)?.level);
  const topikOneCount = levels.filter((level) => level === 1).length;
  const topikTwoCount = levels.filter((level) => level === 2).length;
  return topikTwoCount > topikOneCount ? 2 : 1;
}

function getMissionsByDifficulty(missions = routeMissions) {
  return [...missions].sort((a, b) => getMissionDifficulty(a) - getMissionDifficulty(b) || routeMissions.indexOf(a) - routeMissions.indexOf(b));
}

function readActiveMapId() {
  try {
    const savedMapId = localStorage.getItem(activeMapKey);
    return mapChapters.some((chapter) => chapter.id === savedMapId) ? savedMapId : mapChapters[0].id;
  } catch {
    return mapChapters[0].id;
  }
}

function persistActiveMapId() {
  try {
    localStorage.setItem(activeMapKey, activeMapId);
  } catch {
    // Map selection still applies for this visit if browser storage is unavailable.
  }
}

function getMapMissions(mapId = activeMapId) {
  const chapter = mapChapters.find((candidate) => candidate.id === mapId);
  return chapter ? chapter.missionIds.map((id) => routeMissions.find((mission) => mission.id === id)).filter(Boolean) : [];
}

function getMissionMapLabel(mission) {
  const chapter = mapChapters.find((candidate) => candidate.missionIds.includes(mission.id));
  if (!chapter) return `TOPIK ${getMissionDifficulty(mission)} · EXAM PRACTICE`;
  const mapIndex = mapChapters.indexOf(chapter) + 1;
  const stopIndex = chapter.missionIds.indexOf(mission.id) + 1;
  return `MAP ${String(mapIndex).padStart(2, "0")} · STOP ${stopIndex} OF ${chapter.missionIds.length}`;
}

function getSuggestedMission(mapId = activeMapId) {
  const missions = getMapMissions(mapId);
  return missions.find((mission) => !routeStamps.includes(mission.id)) || missions[0] || routeMissions[0];
}

function renderMapChapterPicker() {
  const picker = document.querySelector("#map-chapter-picker");
  const scrollLeft = picker.scrollLeft;
  picker.replaceChildren(...mapChapters.map((chapter, index) => {
    const missions = getMapMissions(chapter.id);
    const completed = missions.filter((mission) => routeStamps.includes(mission.id)).length;
    const button = document.createElement("button");
    button.className = `map-chapter-tab${chapter.id === activeMapId ? " is-active" : ""}${completed === missions.length ? " is-complete" : ""}`;
    button.type = "button";
    button.dataset.mapId = chapter.id;
    button.setAttribute("aria-pressed", String(chapter.id === activeMapId));
    button.setAttribute("aria-label", `Map ${index + 1}: ${chapter.title}, ${completed} of ${missions.length} stops complete`);
    const number = document.createElement("small");
    number.className = "map-chapter-number";
    number.textContent = `MAP ${String(index + 1).padStart(2, "0")}`;
    const title = document.createElement("strong");
    title.textContent = chapter.title;
    const area = document.createElement("span");
    area.className = "map-chapter-area";
    area.textContent = chapter.area;
    const progress = document.createElement("span");
    progress.className = "map-chapter-progress";
    progress.textContent = `${completed} / ${missions.length} stops`;
    button.append(number, title, area, progress);
    return button;
  }));
  picker.scrollLeft = scrollLeft;
}

function makeRoutePath(points) {
  if (points.length < 2) return "";
  return points.slice(0, -1).map((_, index) => makeRouteSegment(points, index)).join(" ");
}

function makeRouteSegment(points, index) {
  const coordinates = points.map(([top, left]) => [left, top]);
  const previous = coordinates[index - 1] || coordinates[index];
  const current = coordinates[index];
  const next = coordinates[index + 1];
  const following = coordinates[index + 2] || next;
  const controlOne = [current[0] + (next[0] - previous[0]) / 6, current[1] + (next[1] - previous[1]) / 6];
  const controlTwo = [next[0] - (following[0] - current[0]) / 6, next[1] - (following[1] - current[1]) / 6];
  return `M ${current[0]} ${current[1]} C ${controlOne[0]} ${controlOne[1]} ${controlTwo[0]} ${controlTwo[1]} ${next[0]} ${next[1]}`;
}

function renderRouteOverview() {
  const stopList = document.querySelector("#route-stops");
  const bonusList = document.querySelector("#bonus-mission-list");
  const chapter = mapChapters.find((candidate) => candidate.id === activeMapId) || mapChapters[0];
  const mapIndex = mapChapters.indexOf(chapter);
  const missions = getMapMissions(chapter.id);
  const suggested = getSuggestedMission(chapter.id);
  const completedStops = missions.filter((mission) => routeStamps.includes(mission.id)).length;
  renderMapChapterPicker();
  const routeScene = document.querySelector(".route-scene");
  const routeArt = document.querySelector("#route-scene-art");
  routeScene.dataset.mapId = chapter.id;
  routeArt.src = chapter.image;
  routeArt.alt = chapter.alt;
  document.querySelector("#route-map-eyebrow").textContent = `SEOUL ROUTE · MAP ${String(mapIndex + 1).padStart(2, "0")} OF ${String(mapChapters.length).padStart(2, "0")}`;
  document.querySelector("#practice-title").textContent = chapter.title;
  document.querySelector("#practice-lead").textContent = chapter.description;
  document.querySelector("#route-stamp-count").textContent = `${completedStops} / ${missions.length}`;
  document.querySelector("#route-stamp-counter").setAttribute("aria-label", `${chapter.title}: ${completedStops} of ${missions.length} stops complete`);
  const suggestedIndex = missions.findIndex((mission) => mission.id === suggested.id);
  const mapComplete = completedStops === missions.length;
  document.querySelector("#featured-mission-count").textContent = mapComplete
    ? `MAP ${String(mapIndex + 1).padStart(2, "0")} · COMPLETE`
    : `STOP ${suggestedIndex + 1} OF ${missions.length} · MAP ${String(mapIndex + 1).padStart(2, "0")}`;
  document.querySelector("#featured-mission-title").textContent = mapComplete ? "You explored this map" : suggested.title;
  document.querySelector("#featured-mission-description").textContent = mapComplete
    ? "Every stop is complete. Choose another illustrated route or revisit a favorite."
    : suggested.description;
  const featuredAction = mapComplete ? "Replay first stop" : (routeStamps.includes(suggested.id) ? "Replay round" : "Start next stop");
  setArrowButtonLabel(document.querySelector("#start-mission"), featuredAction);
  const routePath = makeRoutePath(chapter.points.slice(0, missions.length));
  document.querySelector("#route-path-halo").setAttribute("d", routePath);
  document.querySelector("#route-path-line").setAttribute("d", routePath);
  const completedPath = missions.slice(0, -1).flatMap((mission, index) => {
    const nextMission = missions[index + 1];
    if (!routeStamps.includes(mission.id) || !routeStamps.includes(nextMission.id)) return [];
    return [makeRouteSegment(chapter.points.slice(0, missions.length), index)];
  }).join(" ");
  document.querySelector("#route-path-progress-halo").setAttribute("d", completedPath);
  document.querySelector("#route-path-progress").setAttribute("d", completedPath);
  stopList.replaceChildren(...missions.map((mission, index) => {
    const complete = routeStamps.includes(mission.id);
    const isSuggested = mission.id === suggested.id;
    const difficulty = getMissionDifficulty(mission);
    const [top, left] = chapter.points[index];
    const row = document.createElement("li");
    row.className = `route-stop${left > 52 ? " label-left" : ""}${complete ? " is-complete" : ""}${isSuggested ? " is-suggested" : ""}`;
    row.dataset.level = String(difficulty);
    row.style.setProperty("--stop-top", `${top}%`);
    row.style.setProperty("--stop-left", `${left}%`);
    const button = document.createElement("button");
    button.className = "route-stop-button";
    button.type = "button";
    button.dataset.missionId = mission.id;
    button.setAttribute("aria-label", `TOPIK ${difficulty}. ${complete ? "Replay" : "Play"} ${mission.title} at ${mission.location}`);
    button.title = `TOPIK ${difficulty} · ${mission.location}: ${mission.title}`;
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
    subtitle.textContent = `TOPIK ${difficulty} · ${mission.mapSubtitle || mission.category}`;
    copy.append(title, subtitle);
    button.append(marker, copy);
    button.setAttribute("aria-current", isSuggested ? "step" : "false");
    row.append(button);
    return row;
  }));
  const bonusMissions = getMissionsByDifficulty(routeMissions.filter((mission) => !mappedMissionIds.has(mission.id)));
  const groups = [1, 2].map((difficulty) => {
    const missions = bonusMissions.filter((mission) => getMissionDifficulty(mission) === difficulty);
    if (!missions.length) return null;
    const group = document.createElement("section");
    group.className = `bonus-difficulty-group topik-${difficulty}-group`;
    group.dataset.level = String(difficulty);
    const heading = document.createElement("div");
    heading.className = "bonus-difficulty-heading";
    const levelLabel = document.createElement("p");
    levelLabel.className = "section-label";
    levelLabel.textContent = `TOPIK ${difficulty}`;
    const levelTitle = document.createElement("h3");
    levelTitle.textContent = difficulty === 1 ? "Build your everyday base" : "Take the next step";
    const count = document.createElement("span");
    count.textContent = `${missions.length} ${missions.length === 1 ? "round" : "rounds"}`;
    heading.append(levelLabel, levelTitle, count);
    const cards = document.createElement("div");
    cards.className = "bonus-mission-level-list";
    missions.forEach((mission) => {
      const index = bonusMissions.findIndex((candidate) => candidate.id === mission.id);
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
      meta.textContent = mission.questions?.length ? `EXAM PRACTICE · TOPIK ${difficulty}` : `ROUND ${index + 1} · ${mission.category.toUpperCase()}`;
      const title = document.createElement("h3");
      title.textContent = mission.title;
      const description = document.createElement("p");
      description.textContent = mission.description;
      const duration = document.createElement("small");
      duration.textContent = mission.questions ? "3 minutes · 5 questions" : "3 minutes · 5 words";
      copy.append(meta, title, description, duration);
      const button = document.createElement("button");
      button.className = "bonus-mission-button";
      button.type = "button";
      button.dataset.missionId = mission.id;
      button.setAttribute("aria-label", `TOPIK ${difficulty}. ${complete ? "Replay" : "Start"} ${mission.title}, ${mission.location}`);
      setArrowButtonLabel(button, complete ? "Replay round" : "Start round");
      card.append(number, copy, button);
      cards.append(card);
    });
    group.append(heading, cards);
    return group;
  }).filter(Boolean);
  bonusList.replaceChildren(...groups);
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
    geotda: ["걸었어요", "걸어요", "걸으며", "걷기"],
    maepda: ["매웠어요", "매워요", "매웠", "매워"],
    dowajuda: ["도와줬어요", "도와줘요", "도와줬", "도와줘"],
    ttatteuthada: ["따뜻한", "따뜻해요", "따뜻해"],
    deuda: ["데워 주세요", "데워 먹었어요", "데워서"],
    jiyeondoeda: ["지연됐어요", "지연돼서", "지연될"],
    joyoteohada: ["조용한", "조용해요", "조용해"],
    bakkuda: ["바꿔도", "바꿔 주세요", "바꾸면"]
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
  const isExam = Array.isArray(mission.questions);
  const routeItems = (mission.wordIds || []).map((id) => vocabulary.find((item) => item.id === id)).filter(Boolean);
  const routeIds = new Set(routeItems.map((item) => item.id));
  const dueOutsideMission = isExam ? [] : getNeedsPracticeItems().filter((item) => !routeIds.has(item.id)).slice(0, 2);
  const items = isExam ? mission.questions : [...dueOutsideMission, ...routeItems].slice(0, 5);
  missionSession = { missionId: mission.id, mode: isExam ? "exam" : "vocabulary", items, index: 0, correctCount: 0, answered: false, options: [] };
  practiceStage = "play";
  practiceHome.hidden = true;
  missionResults.hidden = true;
  missionPlay.hidden = false;
  document.body.classList.add("is-immersive-round");
  window.scrollTo(0, 0);
  document.querySelector("#mission-question-title").textContent = mission.title;
  document.querySelector("#results-mission-label").textContent = getMissionMapLabel(mission);
  renderMissionQuestion();
}

function renderExamChart(question) {
  const chart = document.querySelector("#exam-chart");
  const rows = document.querySelector("#exam-chart-rows");
  const chartRows = question.chartRows || [];
  chart.hidden = chartRows.length === 0;
  rows.replaceChildren();
  if (!chartRows.length) return;
  document.querySelector("#exam-chart-title").textContent = question.chartTitle || "Survey results";
  const highestValue = Math.max(...chartRows.map((row) => row.value));
  chartRows.forEach((row) => {
    const listItem = document.createElement("li");
    const label = document.createElement("span");
    label.className = "exam-chart-label";
    label.lang = "ko";
    label.textContent = row.label;
    const track = document.createElement("span");
    track.className = "exam-chart-track";
    track.setAttribute("aria-hidden", "true");
    const bar = document.createElement("span");
    bar.className = "exam-chart-bar";
    bar.style.width = `${Math.round((row.value / highestValue) * 100)}%`;
    track.append(bar);
    const value = document.createElement("span");
    value.className = "exam-chart-value";
    value.textContent = `${row.value}%`;
    listItem.append(label, track, value);
    rows.append(listItem);
  });
}

function renderMissionQuestion() {
  if (!missionSession) return;
  const isExam = missionSession.mode === "exam";
  const question = missionSession.items[missionSession.index];
  const item = isExam ? vocabulary.find((candidate) => candidate.id === question.focusWordId) : question;
  const example = isExam ? null : getMissionExample(item);
  const position = missionSession.index + 1;
  const schedule = ["meaning", "reverse", "cloze", "reverse", "meaning"];
  const clozeWord = isExam ? "" : findKoreanWordForm(item, example.korean);
  const clozeAvailable = Boolean(clozeWord);
  const requestedType = schedule[missionSession.index % schedule.length];
  const questionType = isExam ? "exam" : requestedType === "cloze" && !clozeAvailable ? "reverse" : requestedType;
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
  document.querySelector("#question-level").textContent = `TOPIK ${isExam ? question.level : item.level}`;
  const questionWord = document.querySelector("#question-word");
  const questionExample = document.querySelector("#question-example");
  const questionTranslation = document.querySelector("#question-translation");
  const romanization = document.querySelector("#question-romanization");
  const prompt = document.querySelector("#question-prompt");
  const stageLabel = document.querySelector("#question-stage-label");
  const exampleBlock = document.querySelector(".question-sentence-block");
  const examBlock = document.querySelector("#exam-question-block");
  const progress = item ? wordProgress[item.id] : null;
  stageLabel.textContent = isExam ? question.skill : progress?.needsPractice ? "ANOTHER LOOK" : progress?.attempts ? "QUICK REVIEW" : "NEW WORD";
  questionWord.hidden = isExam;
  romanization.hidden = isExam;
  exampleBlock.hidden = isExam;
  examBlock.hidden = !isExam;
  if (isExam) {
    questionWord.textContent = "";
    questionWord.classList.remove("is-english");
    romanization.textContent = "";
    prompt.textContent = question.prompt;
    const passage = document.querySelector("#exam-passage");
    passage.textContent = question.passage || "";
    passage.hidden = !question.passage;
    renderExamChart(question);
    const translation = document.querySelector("#exam-translation");
    translation.textContent = question.translation || "";
    translation.hidden = true;
    questionTranslation.hidden = true;
  } else if (questionType === "meaning") {
    questionWord.textContent = item.form;
    questionWord.lang = "ko";
    questionWord.classList.remove("is-english");
    romanization.textContent = item.romanization;
    romanization.hidden = false;
    questionTranslation.hidden = false;
    prompt.textContent = "What does it mean?";
    questionExample.textContent = example.korean;
    questionExample.lang = "ko";
    questionExample.classList.remove("is-english");
    questionTranslation.textContent = example.translation;
  } else if (questionType === "reverse") {
    questionWord.textContent = item.meaning;
    questionWord.lang = "en";
    questionWord.classList.add("is-english");
    romanization.textContent = "";
    romanization.hidden = true;
    questionTranslation.hidden = true;
    prompt.textContent = "Which Korean word matches this meaning?";
    questionExample.textContent = example.translation;
    questionExample.lang = "en";
    questionExample.classList.add("is-english");
  } else {
    questionWord.textContent = item.meaning;
    questionWord.lang = "en";
    questionWord.classList.add("is-english");
    romanization.textContent = "";
    romanization.hidden = true;
    questionTranslation.hidden = false;
    prompt.textContent = clozeWord === item.form ? "Fill the blank with the right word." : "Which dictionary form is hidden?";
    questionExample.textContent = example.korean.replace(clozeWord, "＿＿＿");
    questionExample.lang = "ko";
    questionExample.classList.remove("is-english");
    questionTranslation.textContent = example.translation;
  }

  const options = isExam
    ? question.choices.map((choice) => ({ id: choice.id, label: choice.text }))
    : makeAnswerOptions(item, questionType);
  missionSession.options = options;
  missionSession.answered = false;
  const optionContainer = document.querySelector("#answer-options");
  optionContainer.setAttribute("aria-label", isExam ? "Choose the best answer" : questionType === "meaning" ? "Choose the word meaning" : "Choose the Korean word");
  optionContainer.replaceChildren(...options.map((option) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    if (isExam || questionType !== "meaning") button.classList.add("is-korean");
    button.type = "button";
    button.dataset.choiceId = option.id;
    button.setAttribute("aria-pressed", "false");
    const label = document.createElement("span");
    label.textContent = option.label;
    label.lang = isExam || questionType !== "meaning" ? "ko" : "en";
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
  const isExam = missionSession.mode === "exam";
  const question = missionSession.items[missionSession.index];
  const item = isExam ? vocabulary.find((candidate) => candidate.id === question.focusWordId) : question;
  const example = item ? getMissionExample(item) : null;
  const correctChoice = isExam ? question.choices.find((choice) => choice.id === question.correctChoiceId) : null;
  const isCorrect = isExam ? selectedId === question.correctChoiceId : selectedId === item.id;
  missionSession.answered = true;
  if (isCorrect) missionSession.correctCount += 1;
  if (item) recordWordAnswer(item, isCorrect);

  document.querySelectorAll(".answer-option").forEach((button) => {
    const isAnswer = button.dataset.choiceId === (isExam ? question.correctChoiceId : item.id);
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
  const updatedProgress = item ? wordProgress[item.id] : null;
  document.querySelector("#feedback-title").textContent = isCorrect ? "정답이에요!" : "Let’s try that one again.";
  if (isExam) {
    const reviewMessage = item && updatedProgress.needsPractice
      ? (isCorrect ? ` One more correct review clears ${item.form} from your revisit list.` : ` ${item.form} will come back for practice.`)
      : "";
    document.querySelector("#feedback-copy").textContent = `${question.explanation}${reviewMessage}`;
    document.querySelector("#feedback-translation").textContent = correctChoice?.translation ? `Best answer: ${correctChoice.translation}` : "";
    const translation = document.querySelector("#exam-translation");
    translation.hidden = !question.translation;
    document.querySelector("#question-translation").hidden = true;
  } else {
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
  }
  const next = document.querySelector("#next-question");
  next.disabled = false;
  next.textContent = missionSession.index === missionSession.items.length - 1 ? "See your round" : isExam ? "Next question →" : "Next word →";
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
  const currentMap = mapChapters.find((chapter) => chapter.missionIds.includes(mission?.id));
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
  document.querySelector("#results-mission-label").textContent = getMissionMapLabel(mission);
  document.querySelector("#results-stamp-kicker").textContent = stampEarned ? "YOU EARNED A STAMP" : "STAMP COLLECTED";
  document.querySelector("#results-stamp-name").textContent = mission?.location || "Seoul";
  document.querySelector("#results-stamp-meta").textContent = getMissionMapLabel(mission);
  if (currentMap) {
    const mapImage = document.querySelector("#results-stamp .stamp-postage img");
    mapImage.src = currentMap.image;
    document.querySelector(".results-hero").style.setProperty("--results-map-art", `url("${currentMap.image}")`);
  } else {
    document.querySelector("#results-stamp .stamp-postage img").src = "./assets/seoul-route-map.jpg?v=28";
    document.querySelector(".results-hero").style.removeProperty("--results-map-art");
  }
  document.querySelector("#results-due-list").replaceChildren(...dueItems.slice(0, 8).map(makeResultsWord));
  document.querySelector("#results-due-list").hidden = dueItems.length === 0;
  document.querySelector("#results-review-title").textContent = dueItems.length ? "These words need another look" : "All clear for now";
  const firstItem = missionSession.items[0];
  const firstHelpfulWord = missionSession.mode === "exam"
    ? vocabulary.find((item) => item.id === firstItem.focusWordId)
    : firstItem;
  const helpfulItem = dueItems[0] || firstHelpfulWord || vocabulary[0];
  const helpfulExample = getMissionExample(helpfulItem);
  document.querySelector("#results-example-korean").textContent = helpfulExample.korean;
  document.querySelector("#results-example-translation").textContent = helpfulExample.translation;
  const summary = document.querySelector("#results-summary");
  const nextMission = getSuggestedMission();
  const examMissions = getMissionsByDifficulty(routeMissions.filter((candidate) => !mappedMissionIds.has(candidate.id)));
  const nextExamMission = examMissions.find((candidate) => !routeStamps.includes(candidate.id));
  const currentMapComplete = currentMap && getMapMissions(currentMap.id).every((candidate) => routeStamps.includes(candidate.id));
  if (dueItems.length) {
    summary.textContent = `${dueItems.length} ${dueItems.length === 1 ? "word needs" : "words need"} another look. Two correct reviews clear a word from your revisit list.`;
    setArrowButtonLabel(document.querySelector("#play-again"), "Review these words");
  } else if (currentMapComplete) {
    summary.textContent = `That was the last stop on ${currentMap.title}. Choose another map when you’re ready.`;
    setArrowButtonLabel(document.querySelector("#play-again"), "Replay first stop");
  } else if (mission?.questions?.length && nextExamMission) {
    summary.textContent = `Next exam set: ${nextExamMission.location}. Your illustrated maps are always open too.`;
    setArrowButtonLabel(document.querySelector("#play-again"), "Start next exam set");
  } else {
    summary.textContent = routeStamps.length === routeMissions.length
      ? "Every stamp is yours. Pick a favorite round and go again."
      : `Next stop: ${nextMission.location}. Keep your Korean day going.`;
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

function renderGrammarStep(item) {
  const pathItems = getGrammarPathItems(item.level);
  const position = pathItems.findIndex((candidate) => candidate.id === item.id);
  if (position < 0 || pathItems.length === 0) return;
  const nextItem = pathItems[position + 1];
  const step = position + 1;
  document.querySelector("#grammar-step-level").textContent = `TOPIK ${item.level} PATH`;
  document.querySelector("#grammar-step-count").textContent = `Pattern ${step} of ${pathItems.length}`;
  document.querySelector("#grammar-step-fill").style.width = `${(step / pathItems.length) * 100}%`;
  const progress = document.querySelector("#grammar-step-progress");
  progress.setAttribute("aria-valuemax", String(pathItems.length));
  progress.setAttribute("aria-valuenow", String(step));
  document.querySelector("#grammar-next-hint").textContent = nextItem
    ? `Next: ${nextItem.form}`
    : `End of TOPIK ${item.level} · review any pattern when you’re ready`;
  document.querySelector("#continue-grammar").innerHTML = nextItem
    ? 'I understand · next pattern <span aria-hidden="true">→</span>'
    : `Finish TOPIK ${item.level} <span aria-hidden="true">✓</span>`;
}

function continueGrammarPath() {
  const item = grammar.find((candidate) => candidate.id === currentGrammarId);
  if (!item) return;
  const pathItems = getGrammarPathItems(item.level);
  const position = pathItems.findIndex((candidate) => candidate.id === item.id);
  if (position < 0) return;
  completedGrammarIds.add(item.id);
  persistGrammarProgress();
  render();
  const nextItem = pathItems[position + 1];
  if (nextItem) openDetail(nextItem.id);
  else detailDialog.close();
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
  renderGrammarStep(item);
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

document.querySelector("#map-chapter-picker").addEventListener("click", (event) => {
  const button = event.target.closest("[data-map-id]");
  if (!button) return;
  activeMapId = button.dataset.mapId;
  persistActiveMapId();
  renderRouteOverview();
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
  const examMissions = getMissionsByDifficulty(routeMissions.filter((candidate) => !mappedMissionIds.has(candidate.id)));
  const nextExamMission = examMissions.find((candidate) => !routeStamps.includes(candidate.id));
  const missionId = getNeedsPracticeItems().length
    ? missionSession?.missionId
    : missionSession?.mode === "exam" && nextExamMission
      ? nextExamMission.id
      : getSuggestedMission().id;
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
document.querySelector("#grammar-path-start").addEventListener("click", () => {
  const level = activeLevel === "2" ? 2 : 1;
  const nextItem = getNextGrammarItem(level);
  if (nextItem) openDetail(nextItem.id);
});
document.querySelector("#continue-grammar").addEventListener("click", continueGrammarPath);
document.querySelector("#done-for-now").addEventListener("click", () => detailDialog.close());
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
  navigator.serviceWorker.register("./service-worker.js?v=28", { scope: "./" })
    .then(() => navigator.serviceWorker.ready)
    .then(() => setOfflineState("Offline-ready on this device", "ready"))
    .catch(() => setOfflineState("Open this page online on this device to save it", "error"));
} else {
  setOfflineState("Open this page online on this device to save it", "error");
}

render();
syncFreddieToggles();
