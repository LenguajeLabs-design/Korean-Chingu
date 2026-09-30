# Korean Chingu

A mobile-first, offline-capable TOPIK I and TOPIK II grammar pocket guide. It uses plain HTML, CSS, and JavaScript so it can be hosted as a static site without a build step or external runtime dependencies.

## Use it

The GitHub Actions workflow deploys the site from `main` to GitHub Pages. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**. After the first deployment, open the HTTPS site once while online so the service worker can cache the interface and grammar data. Add it to your phone's home screen for quick access. Saved grammar is stored in that browser on that device.

- **iPhone:** Open the HTTPS site in Safari, tap Share, then **Add to Home Screen**.
- **Android:** Open the HTTPS site in Chrome, open the menu, then **Install app** or **Add to Home screen**.

The app uses no remote fonts, APIs, or images. Level labels are study guidance, not an official TOPIK syllabus.

## Local preview

Any static file server can serve this folder. For example, run `python3 -m http.server 8000` from this directory and open `http://localhost:8000` on the same computer. Service workers are supported on localhost; for phone installation and offline caching, use an HTTPS host.

## Content

Grammar entries live in `grammar.js`. Each entry includes a search form, level, meaning, attachment guidance, one example with translation, and a usage note. Keep the data bundled locally so search keeps working offline.
