# APEX RUSH — Motorsport Card Packs

A premium, browser-based motorsport card-collecting game spanning Formula 1, MotoGP and crossover legends. Open sealed packs, chase iconic finishes, complete albums, trade duplicates and build the greatest vault on the grid.

## Play

Open `index.html` through any static web server, then jump into the Garage.

```bash
python3 -m http.server 3002
# http://localhost:3002
```

All progress is saved locally in the browser. Use **Settings & Save** to export or import a collector profile.

## Features

- **454 cards** across five rarity tiers — Common, Rare, Epic, Legendary and Iconic.
- **Eight card finishes**, including Holo, Gold, Championship, Anniversary, Signature, Shadow and numbered Limited editions.
- **37 sealed packs** for F1, MotoGP, crossover and premium specials, including duplicate-protected, choice, event and rotating-offer packs, plus a daily free pack and a rotating discounted Pack of the Day.
- **Cinematic reveals** with tear, walkout, rare-pull celebration and choice-pack sequences.
- **19 era and discipline albums** with claimable rewards, now including 1960s Pioneer Era sets.
- **Collector economy** — marketplace singles, duplicate selling, trade offers, daily rewards, rotating objectives, achievements, challenge-earned pack tokens, level progression, live countdowns and rotating flash offers.
- **Live market** — an APEX 100 index, drifting card prices, 24-hour movement, price-history sparklines and a top-movers ticker, all refreshed while you browse.
- **Card grading** — send raw cards to the APEX grading lab, roll centering, corners, edges and surface into a 1–10 grade with a certificate, and seal them in a permanent slab. Grade 8+ multiplies market value; low grades can reduce it.
- **Disclosed pack odds** — every pack publishes its pool, guarantees and per-card rarity odds before purchase.
- **Statistics and career records** on every driver, rider, constructor, car, bike and historic moment.
- **Semi-realistic procedural artwork and audio** — layered SVG lighting, reflections, carbon texture and helmet detail, plus procedural Web Audio, so the game runs with no external asset or network dependencies.

## Market & grading

Prices are deterministic functions of time, so every screen agrees without a backend. The market drifts continuously while you browse: listings reprice live, the APEX 100 index and top-movers ticker update in place, and each card detail shows a 24-hour trend.

Grading is permanent. The APEX lab offers three services — Standard (coins), Express (gems, floor 4) and Black Label (gems, floor 6). Each roll produces four subgrades and an overall 1–10 grade stored on the card, with a certificate number. From grade 8 upward the market value is multiplied; below that it can fall. Graded cards show a slab badge on the card and a certificate panel in the detail view, and their value flows through selling, duplicates, trades and the live market.

## Tech

Vanilla JavaScript ES modules, hand-built CSS and SVG artwork, procedural Web Audio, and `localStorage` persistence. No build step required.

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Remixed using [OMGithub.com](https://go.ondev.store/).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://go.ondev.store/Prdgy-Sinister/PlayGround)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/Prdgy-Sinister/PlayGround)

- 🎮 [Open the project](https://go.ondev.store/Prdgy-Sinister/PlayGround).
- ✨ [Remix this project](https://go.ondev.store/Prdgy-Sinister/PlayGround?remix=1).
- 💻 [Explore the source](https://github.com/Prdgy-Sinister/PlayGround).
- 🛠️ [Check build runs](https://github.com/Prdgy-Sinister/PlayGround/actions).
- 🐛 [Report an issue](https://github.com/Prdgy-Sinister/PlayGround/issues).
- 👤 [Explore the creator's projects](https://go.ondev.store/Prdgy-Sinister).
- 🌍 [Create with OMGithub](https://go.ondev.store/).
- 🧬 [Explore the remix source](https://github.com/Prdgy-Sinister/PlayGround).
<!-- omgithub:readme:end -->
