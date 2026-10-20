# dongwooky.github.io

Personal homepage of Dongwook Kwon — AI Research Engineer (LLM multi-agent systems, anomaly detection for critical infrastructure).

Live: https://dongwooky.github.io · Korean: https://dongwooky.github.io/?lang=ko

## Structure

```
index.html              page skeleton (EN/KO strings swapped by JS)
404.html
Dongwook_Kwon_CV.pdf    the CV linked from the page
assets/
  css/main.css          design tokens (dark default, light via system/toggle) + layout
  js/main.js            renders every section from cv.json, nav, theme, lightbox
  js/network-bg.js      hero node-graph background (static under reduced motion)
  data/cv.json          ★ all content — publications, patents, experience, education, awards
  img/                  profile, og image, logos/, awards/
.github/workflows/      GitHub Pages deploy
```

No build step. Plain HTML/CSS/JS, deployed as-is by GitHub Pages.

## Updating content

Edit `assets/data/cv.json`. Every user-facing string is an object with `en` and `ko` keys;
anything that is the same in both languages (titles of English papers, patent numbers) is a plain string.

- **New paper** → add to `publications`; set `"featured": true` to show it above the fold, pick a `badge`
  (venue name, e.g. `EMNLP`, `ACL`, `IBEC`, or `JOURNAL`; `EMNLP`/`ACL` render filled, `JOURNAL` outlined) and add `links` (DOI / Anthology / arXiv).
- **New patent** → add to `patents` with `status` `registered` or `pending`.
- **New award** → add to `awards`; drop a web-sized certificate image (≤1400px) in `assets/img/awards/` and set `image`.
- **Stats strip** → `stats`; numeric `value`s count up on scroll.
- **New CV** → replace `Dongwook_Kwon_CV.pdf`.

UI labels (nav, section titles, buttons) live in the `UI` object at the top of `assets/js/main.js`.

## Local preview

```
python3 -m http.server 8000
# open http://localhost:8000  (and ?lang=ko)
```
