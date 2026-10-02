# Korean Chingu

A mobile-first, offline-capable TOPIK I and TOPIK II grammar and vocabulary guide. It uses plain HTML, CSS, and JavaScript so it can be hosted as a static site without a build step or external runtime dependencies.

## Use it

The GitHub Actions workflow deploys the site from `main` to GitHub Pages. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**. After the first deployment, open the HTTPS site once while online so the service worker can cache the interface and grammar data. Adding it to your phone's home screen is optional. Saved grammar lives in that browser on that device; it does not sync, and clearing site data may remove it.

- **iPhone:** Open the HTTPS site in Safari, tap Share, then **Add to Home Screen**.
- **Android:** Open the HTTPS site in Chrome, open the menu, then **Install app** or **Add to Home screen**.

The app uses no remote fonts, APIs, or images. Vocabulary is grouped into practical travel topics and can be searched by Hangul, romanization, and English meaning. Freddie mode adds first-person examples about work, hobbies, commuting, meals, friends, and travel around Seoul. Saved grammar, words, and Freddie mode are stored in the current browser on this device and do not sync. Level labels are study guidance, not an official TOPIK syllabus.

## Local preview

Any static file server can serve this folder. For example, run `python3 -m http.server 8000` from this directory and open `http://localhost:8000` on the same computer. Service workers are supported on localhost; for phone installation and offline caching, use an HTTPS host.

## Content

Grammar entries live in `grammar.js`; vocabulary entries live in `vocabulary.js`; Freddie examples live in `freddie-examples.js`. Keep all content bundled locally so search and examples keep working offline.
