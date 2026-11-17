# APEX RUSH — Motorsport Collecting Universe

A premium, browser-based collecting game spanning Formula 1, MotoGP and crossover legends. Open sealed card packs, chase signed and numbered editions, collect fictional memorabilia and merchandise, trade on a simulated market, and build a personal 2.5D showroom for your museum.

## Play

Open `index.html` through any static web server, then jump into the Garage.

```bash
python3 -m http.server 3002
# http://localhost:3002
```

All progress is saved locally in the browser. Use **Settings & Save** to export or import a collector profile. New fields are migrated automatically, so existing saves keep their cards, currency, albums, vault rewards and market history.

## Departments

Use the sidebar to switch between **Cards**, **Albums**, **Memorabilia**, **Merchandise**, **Marketplace**, **My Showroom**, the **Collector Vault**, trading and the daily hub.

## Features

- **560 cards** across five rarity tiers — Common, Rare, Epic, Legendary and Iconic, plus 46 serialised exclusives and 60 autograph cards.
- **Eight card finishes**, including Holo, Gold, Championship, Anniversary, Signature, Shadow and numbered Limited editions.
- **37 sealed card packs** for F1, MotoGP, crossover and premium specials, including duplicate-protected, choice, event and rotating-offer packs, plus a daily free pack and a rotating discounted Pack of the Day.
- **253 fictional collectibles** — 150 memorabilia pieces (helmets, suits, parts, artefacts and signed replicas) and 103 merchandise items (apparel, accessories, miniatures and premium collections).
- **Six memorabilia rarity levels** from Standard Collectible through Museum Piece, with fixed numbered runs and a permanent serial ledger.
- **Four memorabilia packs** with published per-tier odds, plus four rotating daily merchandise collections and limited seasonal drops.
- **Seven collectible albums** with claimable coins, gems, Collector Tokens, showroom decorations and unique bonus pieces.
- **Cinematic reveals** with tear, walkout, rare-pull celebration, certificate panels and choice-pack sequences.
- **Collector Vault** — redeem Collector Tokens for serialised autograph editions, signed certificates and exclusive cards. One-of-One editions are never sold.
- **Collector economy** — marketplace singles, duplicate selling, trade offers, daily rewards, rotating objectives, achievements, challenge-earned pack tokens, level progression and flash offers.
- **Live market** — an APEX 100 index, drifting card prices, price-history sparklines and a top-movers ticker. Memorabilia listings, simulated rival auctions and sale history sit alongside cards.
- **Card grading** — send raw cards to the APEX lab, roll subgrades into a permanent 1–10 slab with a certificate; grade 8+ multiplies value.
- **Interactive 2.5D showroom** — an isometric Canvas museum with drag-to-orbit, zoom, procedural display models, click-to-inspect, nine unlockable rooms, collectible-driven prestige, custom themes, floors, lighting, banners and layouts.
- **Simulated community** — visit, like and rank rival showrooms generated from your local save; all auctions, visits and prices are local, with no backend.
- **Semi-realistic procedural artwork and audio** — layered SVG lighting, reflections, carbon texture and helmet detail, plus procedural Web Audio, so the game runs with no external asset or network dependencies.

## Fictional replicas

Every memorabilia piece, autograph and merchandise item in this project is a **fictional digital replica** created for gameplay. Nothing is officially licensed, genuinely race-used, or an authenticated autograph. This disclosure is shown in the collecting departments, item details, pack odds, reveals and marketplace.

## Market & grading

Prices are deterministic functions of time, so every screen agrees without a backend. The market drifts continuously while you browse: listings reprice live, the APEX 100 index and top-movers ticker update in place, and each card detail shows a 24-hour trend. Memorabilia values follow rarity, signature status and scarcity, with deterministic rival listings and auctions.

Grading is permanent. The APEX lab offers three services — Standard (coins), Express (gems, floor 4) and Black Label (gems, floor 6). Each roll produces four subgrades and an overall 1–10 grade stored on the card, with a certificate number. From grade 8 upward the market value is multiplied; below that it can fall. Graded cards show a slab badge on the card and a certificate panel in the detail view, and their value flows through selling, duplicates, trades and the live market.

## Tech

Vanilla JavaScript ES modules, hand-built CSS and SVG artwork, a Canvas 2.5D renderer, procedural Web Audio, and `localStorage` persistence. No build step required.

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
