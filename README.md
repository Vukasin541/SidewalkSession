# Sidewalk Session

Sidewalk Session is a 3D skating game built with Three.js that now runs as an installable web app. It supports skateboards, scooters, BMX, offline app-style play, and online multiplayer rooms while staying a static-site project.

## Features

- 3D third-person skating rendered with Three.js
- procedural ramps, dips, flat runs, rails, gaps, and street obstacles
- trick rotation and landing checks in the air
- rail grinding, pickups, combo scoring, and best-score saving
- in-scene score HUD showing score, best, combo bank, and last scoring event
- home menu with skateboard, scooter, and BMX shops plus map select for a larger open NYC-style city, an open real-skatepark-inspired replica map, a bowl-focused session map, and a massive bowl map
- animated skater and board motion tied to speed, airtime, crouching, and grinds
- required username before play
- installable PWA flow for offline app-style play
- online multiplayer room hosting and joining
- fullscreen canvas with no overlay GUI

## Run

Use a local server so the ES module import map loads reliably:

```powershell
cd c:\Users\pavicv13\Documents\FightingGame2
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Install As An App

The game now behaves like an app through its Progressive Web App setup.

### Desktop Chrome Or Edge

1. Open the live game URL over HTTPS.
2. Click `Install Game` in the menu, or use the browser install icon in the address bar.
3. After install, launch it like a normal app from the desktop or app launcher.

### Android

1. Open the live game URL in Chrome.
2. Tap `Install Game` or use the browser menu install option.
3. The game will install to the home screen and run in standalone mode.

### iPhone Or iPad

1. Open the live game URL in Safari.
2. Use `Share` then `Add to Home Screen`.
3. Launch it from the home screen like an app.

## Publish For Chrome And Edge

The project is set up as a static Progressive Web App, so it can be hosted anywhere that serves plain files over HTTPS and then installed as an app in supported browsers.

### Fastest option: GitHub Pages

1. Create a GitHub repository and push this folder.
2. Push to the `main` branch so the included GitHub Actions workflow runs.
3. In the repository settings, open `Pages` and set the source to `GitHub Actions`.
4. Wait for the `Deploy To GitHub Pages` workflow to finish.
5. Open the public `https://...github.io/...` URL from the workflow or Pages settings.
6. In Chrome or Edge, use the browser `Install app` prompt.

### What was added

- `manifest.webmanifest` for app install metadata and shortcuts
- `sw.js` for app-shell caching
- local `vendor/three.module.js` so the app does not depend on a CDN to start
- install icons in `icons/`
- `.nojekyll` so GitHub Pages serves the site without Jekyll processing
- `.github/workflows/deploy-pages.yml` for automatic GitHub Pages deployment on push to `main`

### Important limitation

I cannot directly publish this to Google Search, the Chrome Web Store, or Microsoft services from here because those require your accounts, payment details in some cases, and manual ownership verification. What is done here is the code and hosting setup needed so the game can run publicly in Chrome and Edge once you upload it.

## Controls

- `Escape`: open or close the home menu during a run
- `A` / `D` or `Left` / `Right`: steer across the width of the course
- `W` or `Up`: push for more speed
- `S` or `Down`: crouch and preload your jump
- drag the mouse or drag on touch: look around the skater
- `Space`: ollie or pop out of a grind
- board tricks: `Z` kickflip, `X` heelflip, `C` shuvit, `V` 360 flip, `B` varial heel, `N` impossible, `F` laser flip, `G` body varial
- scooter tricks: `Z` tailwhip, `X` heelwhip, `C` barspin, `V` double whip, `B` whip rewind, `N` bri flip, `F` flair, `G` fingerwhip
- BMX tricks: `Z` barspin, `X` tailwhip, `C` x-up, `V` 360, `B` tabletop, `N` turndown, `F` backflip, `G` no-hander
- `Space` or `Enter` after a bail: restart the run

## Goal

Stay on the course, clear gaps, collect tapes, lock into rails, and land tricks level. Open-world walls and objects now block you and kick back with a small recoil. If you hit a runner obstacle, drift off the side, or land mid-flip, the run ends.

## Menu

- `Home`: enter a username, install the app, start a new run, resume a paused run, and manage multiplayer room setup
- `Shop`: buy and equip skateboards, scooters, or BMX setups with coins earned from scoring runs
- `Maps`: switch between `Open NYC`, the open-world `Stoner Plaza Replica`, the bowl-focused `Sunken Bowl`, and the massive `Titan Bowl`