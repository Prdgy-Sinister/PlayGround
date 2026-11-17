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

Use the sidebar to switch between **Cards**, **Albums**, **Archive**, **Memorabilia**, **Merchandise**, **Marketplace**, **My Showroom**, the **Collector Vault**, trading, challenges and the daily hub.

## Features

- **1,341 cards** across five rarity tiers — Common, Rare, Epic, Legendary and Iconic, plus 207 serialised exclusives and 60 autograph cards.
- **Eight card finishes**, including Holo, Gold, Championship, Anniversary, Signature, Shadow and numbered Limited editions.
- **229 sealed card packs** for F1, MotoGP, crossover, historical seasons and premium specials, including duplicate-protected, choice, event and rotating-offer packs, plus a daily free pack and a rotating discounted Pack of the Day.
- **Historical Archive** — all 77 Formula 1 seasons (1950–2026) and 78 premier-class motorcycle seasons (1949–2026), each with a completable four-card collection, a dedicated season pack and factual champion/constructor/machine cards. Search or group by year, decade, championship and country. The 2026 seasons are marked in progress with no champion card.
- **216 historical challenges** — per-season, decade, manufacturer, machine, rookie, rivalry and milestone goals with live progress, difficulty tiers and full reward previews. Rewards include capped collector editions, challenge-only vault packs, XP, Collector Tokens and showroom decorations. Archive prestige and collector titles grow as seasons are completed.
- **253 fictional collectibles** — 150 memorabilia pieces (helmets, suits, parts, artefacts and signed replicas) and 103 merchandise items (apparel, accessories, miniatures and premium collections).
- **Six memorabilia rarity levels** from Standard Collectible through Museum Piece, with fixed numbered runs and a permanent serial ledger.
- **Four memorabilia packs** with published per-tier odds, plus four rotating daily merchandise collections and limited seasonal drops.
- **Seven collectible albums** with claimable coins, gems, Collector Tokens, showroom decorations and unique bonus pieces.
- **Cinematic reveals** with tear, walkout, rare-pull celebration, certificate panels and choice-pack sequences.
- **Collector Vault** — redeem Collector Tokens for serialised autograph editions, signed certificates and exclusive cards. One-of-One editions are never sold.
- **Collector economy** — marketplace singles, duplicate selling, trade offers, daily rewards, rotating objectives, achievements, challenge-earned pack tokens, level progression and flash offers.
- **Live market** — a genuinely two-sided simulated exchange. Prices rise *and* fall through per-card multi-week trends, sentiment waves, daily shocks and dated events (anniversaries, race weeks, champion demand). Every card shows 24-hour, 7-day and 30-day changes, price history charts and market indicators (rising/falling, demand, supply, hype, events). The APEX 100 index, top gainers/losers and a top-movers ticker round it out. Memorabilia listings, pre-cased graded lots, sale history and a global auction circuit sit alongside cards.
- **Grading with condition reports** — send raw cards **and** raw memorabilia/merchandise to the APEX lab. Four category scores roll into a permanent 1–10 grade with a certificate, and the written report names the exact flaws behind the number — a dented corner, a bent mounting plate, edge wear, clouding, a creased hang tag and more. Cards are sealed in clear slabs; replicas are sealed in display cases. Grade 8+ multiplies value.
- **Global auction circuit** — thirteen fictional APEX salerooms in real motorsport cities across Europe, the Americas, Asia–Pacific and the Middle East (London, Monaco, Geneva, Milan, Paris, New York, Los Angeles, Mexico City, São Paulo, Tokyo, Singapore, Melbourne and Dubai). Each house has its own focus, local bidder pool, buyer premium and three live lots that rotate by city; win in a new city to fill out your circuit record.
- **Interactive 2.5D showroom** — an isometric Canvas museum with drag-to-orbit, zoom, procedural display models, click-to-inspect, nine unlockable rooms, collectible-driven prestige, custom themes, floors, lighting, banners and layouts.
- **Simulated community** — visit, like and rank rival showrooms generated from your local save; all auctions, visits and prices are local, with no backend.
- **Semi-realistic procedural artwork and audio** — layered SVG lighting, reflections, carbon texture and helmet detail, plus procedural Web Audio, so the game runs with no external asset or network dependencies.

## Fictional replicas

Every memorabilia piece, autograph and merchandise item in this project is a **fictional digital replica** created for gameplay. Nothing is officially licensed, genuinely race-used, or an authenticated autograph. This disclosure is shown in the collecting departments, item details, pack odds, reveals and marketplace.

Historical season champions, constructors/manufacturers and country data are factual championship records. The cards, "Champion Edition" variants (and "Season Edition" exclusives for in-progress years), artwork, ratings, pack odds and challenge rewards are fictional digital collectibles created for gameplay; they are not officially licensed or authenticated items. The 2026 seasons are represented as in progress and carry no champion card. Auction houses, bidders, prices and results are simulated; the cities, regions and time zones are factual.

## Market & grading

Prices are deterministic functions of time, so every screen agrees without a backend. The market drifts continuously while you browse: listings reprice live, the APEX 100 index and top-movers ticker update in place, and each card detail shows 24-hour, 7-day and 30-day changes plus market indicators. Values genuinely fall as well as rise — roughly half of all cards are on a down-trend at any moment — and daily shocks can spike or dent a price. Anniversary years and race weeks create dated demand events. Memorabilia values follow rarity, signature status and scarcity, with deterministic rival listings and auctions.

Grading is permanent. The APEX lab offers three services — Standard (coins), Express (gems, floor 4) and Black Label (gems, floor 6). Each roll produces four category scores and an overall 1–10 grade with a certificate number. The written condition report is generated from the lowest categories, so the grade always explains itself: a grade 6 might cite a visible small dent on a plaque, while a grade 9 reports only a faint surface scuff. Cards are sealed in tamper-evident slabs and replicas in display cases; both show their casing, certificate and condition notes in the detail view, and slab chrome appears on graded cards throughout the collection, market and trade screens. From grade 8 upward the market value is multiplied; below that it can fall. Graded value flows through selling, duplicates, trades, auctions and showroom prestige. Existing saves are upgraded on load, so old numeric-only grades gain a full report automatically.

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
