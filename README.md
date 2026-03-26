# Sidewalk Session

Sidewalk Session is now a 3D browser skate game built with Three.js. It uses a third-person camera, procedural street sections, rails, gaps, and pickups while keeping the project as a single static site.

## Features

- 3D third-person skate line rendered with Three.js
- procedural ramps, dips, flat runs, rails, gaps, and street obstacles
- trick rotation and landing checks in the air
- rail grinding, pickups, combo scoring, and best-score saving
- in-scene score HUD showing score, best, combo bank, and last scoring event
- home menu with board and scooter shops plus map select for a larger open NYC-style city and an open real-skatepark-inspired replica map
- animated skater and board motion tied to speed, airtime, crouching, and grinds
- fullscreen canvas with no overlay GUI

## Run

Use a local server so the ES module import map loads reliably:

```powershell
cd c:\Users\pavicv13\Documents\FightingGame2
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish For Chrome And Edge

The project is now set up as a static Progressive Web App, so it can be hosted anywhere that serves plain files over HTTPS and then installed in both Google Chrome and Microsoft Edge.

### Fastest option: GitHub Pages

1. Create a GitHub repository and push this folder.
2. Push to the `main` branch so the included GitHub Actions workflow runs.
3. In the repository settings, open `Pages` and set the source to `GitHub Actions`.
4. Wait for the `Deploy To GitHub Pages` workflow to finish.
5. Open the public `https://...github.io/...` URL from the workflow or Pages settings.
6. In Chrome or Edge, use the browser `Install app` prompt.

### What was added

- `manifest.webmanifest` for install metadata
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
- `Space` or `Enter` after a bail: restart the run

## Goal

Stay on the course, clear gaps, collect tapes, lock into rails, and land tricks level. Open-world walls and objects now block you and kick back with a small recoil. If you hit a runner obstacle, drift off the side, or land mid-flip, the run ends.

## Menu

- `Home`: start a new run, resume a paused run, and see your active setup
- `Shop`: buy and equip either skateboards or scooters with coins earned from scoring runs
- `Maps`: switch between `Open NYC` and the open-world `Stoner Plaza Replica`