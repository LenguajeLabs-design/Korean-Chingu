# Korean Chingu

A mobile-first, offline-capable TOPIK I and TOPIK II grammar, vocabulary, and short practice guide. It uses plain HTML, CSS, and JavaScript so it can be hosted as a static site without a build step.

## Use it

The GitHub Actions workflow deploys the site from `main` to GitHub Pages. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**. After the first deployment, open the HTTPS site once while online so the service worker can cache the interface and grammar data. Adding it to your phone's home screen is optional. Core study remains available offline.

- **iPhone:** Open the HTTPS site in Safari, tap Share, then **Add to Home Screen**.
- **Android:** Open the HTTPS site in Chrome, open the menu, then **Install app** or **Add to Home screen**.

The app uses no remote fonts or images; the illustrated Seoul routes are bundled locally. Vocabulary is grouped into practical topics and can be searched by Hangul, romanization, and English meaning. The **Play** section offers short rounds about Seoul travel, everyday routines, and TOPIK-style questions. Level labels are study guidance, not an official TOPIK syllabus.

### Optional account sync

Account sync uses Google sign-in and Cloud Firestore. The Firebase SDK is loaded only when a learner chooses to connect; the study guide itself keeps working offline. Synced data is limited to route stamps, completed grammar, saved grammar and words, word-review counts, Korean text size, and theme. Freddie topics and personal context stay in the browser on that device. Google may process synced progress; Firebase Analytics is not enabled.

Before enabling account sync, fill the public web-app values in `firebase-config.js`, enable Google as an Authentication provider, add the GitHub Pages domain to Firebase's authorized domains, create a Firestore database, and publish `firestore.rules`. The rules restrict each progress document to its signed-in owner. Never put a Firebase service-account key in this static site.

With Sync off, saved entries and study history remain in the current browser and may be removed when site data is cleared. With Sync on, new changes sync when online; offline changes remain local until a connection returns.

## Local preview

Any static file server can serve this folder. For example, run `python3 -m http.server 8000` from this directory and open `http://localhost:8000` on the same computer. Service workers are supported on localhost; for phone installation and offline caching, use an HTTPS host.

## Content

Grammar entries live in `grammar.js`; vocabulary entries live in `vocabulary.js`; Freddie examples live in `freddie-examples.js`. Keep all content bundled locally so search and examples keep working offline.
