# Okada Boss

A rider-side app for commercial motorcycle riders in Ghana. **Not a ride-hailing app** —
no passengers, no dispatch, no two-sided marketplace. The rider is the customer.

It does three things a rider needs every day, and one thing he needs once:

| | |
|---|---|
| **Money** | Daily book: fares in, fuel/repairs/owner-drop/dues out, what's actually left. Week view. |
| **Papers** | Checklist against the Road Traffic Regulations, 2026 (L.I. 2519), with expiry tracking and a countdown to the transition deadline. |
| **Dues** | Union membership record and proof-of-payment log with MoMo references. |
| **SOS** | One tap builds a message with location + bike details and hands it to WhatsApp, SMS or a call. |

## Why it is built like this

The target phone is a 1GB Android Go handset on metered data, held in one hand, in direct
sunlight. So:

- **No framework, no build step, no bundler.** Plain HTML, CSS and JS.
- **68 KB total**, including icons. First load costs a rider roughly a tenth of a pesewa.
- **Offline-first.** A service worker caches the shell; all data is in `localStorage` on the
  rider's own phone. Verified to open and show correct data with the network fully cut.
- **No network calls at all.** Nothing is sent anywhere. There is no backend yet, by design —
  see `docs/SPEC.md` for when one gets added.
- **48px+ tap targets, high contrast, big numerals**, light and dark.

## Run it

```bash
cd okada-app
python3 -m http.server 8080
# open http://127.0.0.1:8080
```

A service worker needs `http://localhost` or HTTPS — opening `index.html` as a `file://`
URL works for everything except offline caching. To deploy, drop the folder on any static
host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Verified

Checked in headless Chromium at 390×844, zero console errors:

- money arithmetic (gross / paid out / net) — pass
- papers progress and expiry pills — pass
- dues logging and totals — pass
- SOS builds a correct `wa.me` deep link — pass
- EN↔TWI toggle — pass
- state survives reload — pass
- service worker activates — pass
- **full offline reload still shows correct data** — pass

## Known gaps — read before showing this to a rider

1. **The Twi is machine-written and needs a native speaker.** `TWI` in `app.js` is a partial
   dictionary that falls back to English per key. Do not ship it as-is. Ga, Hausa and Dagbani
   are not started.
2. **The compliance checklist is built from news reporting on L.I. 2519, not the gazetted
   instrument.** Sources contradict each other, especially on the minimum age (21 vs 25) and
   the fees. Verify against the gazette or a DVLA office before a rider acts on it.
3. **The deadline date is a placeholder** (`2027-02-28`) and is editable in the app for that
   reason.
4. **Dues are recorded, not collected.** No money moves. MoMo collection arrives with the
   union pilot — see the spec.
5. `localStorage` only. If the rider clears site data or changes phone, the data is gone
   unless they exported a backup. Accounts come with the backend.

## Files

```
index.html             app shell
app.js                 all logic + i18n  (no dependencies)
styles.css             design tokens, light + dark
sw.js                  service worker, cache-first shell
manifest.webmanifest   installable PWA
docs/SPEC.md           8-week MVP spec: data model, MoMo, WhatsApp, milestones
docs/UNION-PITCH.md    one-pager for a union chairman
```

This folder is self-contained and has no tie to the portfolio app around it. Lifting it into
its own repo is a `git mv` and nothing else.
