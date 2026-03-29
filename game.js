import * as THREE from "three";

const PEER_SCRIPT_URL = "./vendor/peerjs.min.js";

const canvas = document.getElementById("gameCanvas");
const menuShell = document.getElementById("menuShell");
const menuTabs = document.getElementById("menuTabs");
const menuSubtitle = document.getElementById("menuSubtitle");
const coinValue = document.getElementById("coinValue");
const selectedMapName = document.getElementById("selectedMapName");
const selectedMapDescription = document.getElementById("selectedMapDescription");
const equippedDeckName = document.getElementById("equippedDeckName");
const menuBestValue = document.getElementById("menuBestValue");
const singlePlayerModeButton = document.getElementById("singlePlayerModeButton");
const versusModeButton = document.getElementById("versusModeButton");
const modeDescription = document.getElementById("modeDescription");
const modeScore = document.getElementById("modeScore");
const competitionToggleButton = document.getElementById("competitionToggleButton");
const competitionSummary = document.getElementById("competitionSummary");
const competitionRankCard = document.getElementById("competitionRankCard");
const competitionRankBadge = document.getElementById("competitionRankBadge");
const competitionRankName = document.getElementById("competitionRankName");
const competitionRankProgress = document.getElementById("competitionRankProgress");
const competitionStatus = document.getElementById("competitionStatus");
const competitionBoard = document.getElementById("competitionBoard");
const usernameInput = document.getElementById("usernameInput");
const usernameStatus = document.getElementById("usernameStatus");
const onlineControls = document.getElementById("onlineControls");
const roomCodeInput = document.getElementById("roomCodeInput");
const hostRoomButton = document.getElementById("hostRoomButton");
const joinRoomButton = document.getElementById("joinRoomButton");
const leaveRoomButton = document.getElementById("leaveRoomButton");
const onlineStatus = document.getElementById("onlineStatus");
const startRideButton = document.getElementById("startRideButton");
const installGameButton = document.getElementById("installGameButton");
const installStatus = document.getElementById("installStatus");
const installHint = document.getElementById("installHint");
const resumeRideButton = document.getElementById("resumeRideButton");
const recordClipButton = document.getElementById("recordClipButton");
const recordingStatus = document.getElementById("recordingStatus");
const skinBoxGrid = document.getElementById("skinBoxGrid");
const skinBoxStatus = document.getElementById("skinBoxStatus");
const shopGrid = document.getElementById("shopGrid");
const scooterGrid = document.getElementById("scooterGrid");
const bikeGrid = document.getElementById("bikeGrid");
const mapGrid = document.getElementById("mapGrid");
const trickGuideGrid = document.getElementById("trickGuideGrid");
const mobileControls = document.getElementById("mobileControls");
const mobilePushButton = document.getElementById("mobilePushButton");
const mobileBrakeButton = document.getElementById("mobileBrakeButton");
const mobileLeftButton = document.getElementById("mobileLeftButton");
const mobileRightButton = document.getElementById("mobileRightButton");
const mobileJumpButton = document.getElementById("mobileJumpButton");
const mobileTrickOneButton = document.getElementById("mobileTrickOneButton");
const mobileTrickTwoButton = document.getElementById("mobileTrickTwoButton");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const unlockToast = document.getElementById("unlockToast");
const unlockToastSwatch = document.getElementById("unlockToastSwatch");
const unlockToastLabel = document.getElementById("unlockToastLabel");
const unlockToastTitle = document.getElementById("unlockToastTitle");
const unlockToastMeta = document.getElementById("unlockToastMeta");

const TRACK_WIDTH = 16;
const TRACK_HALF = TRACK_WIDTH / 2;
const TRACK_THICKNESS = 1.5;
const BOARD_RIDE_HEIGHT = 0.72;
const BOARD_CARRY_HEIGHT = 1.02;
const GRAVITY = 58;
const MIN_SPEED = 22;
const CRUISE_SPEED = 32;
const MAX_SPEED = 64;
const WALK_SPEED = 10.5;
const JUMP_VELOCITY = 22;
const CAMERA_LERP = 0.09;
const FAR_AHEAD = 220;
const PLAYER_X_OFFSET = 8;
const CAMERA_DISTANCE = 22;
const CAMERA_HEIGHT = 6.5;
const CAMERA_LOOK_SENSITIVITY = 0.005;
const CAMERA_PITCH_MIN = -0.15;
const CAMERA_PITCH_MAX = 0.95;
const CITY_HALF_X = 188;
const CITY_HALF_Z = 164;
const SKATEPARK_HALF_X = 124;
const SKATEPARK_HALF_Z = 112;
const BOWL_HALF_X = 118;
const BOWL_HALF_Z = 112;
const MEGA_BOWL_HALF_X = 166;
const MEGA_BOWL_HALF_Z = 142;
const SURFACE_EDGE_TOLERANCE = 0.18;
const SURFACE_STEP_UP = 1.4;
const SURFACE_STEP_DOWN = 4.4;
const ONLINE_HOST_PREFIX = "sidewalk-session-room-";
const ONLINE_SYNC_INTERVAL = 0.08;
const COMPETITION_DURATION = 90;
const COMPETITION_WIN_BONUS = 400;
const SOLO_COMPETITION_CLEAR_BONUS = 250;
const SOLO_COMPETITION_BOT_NAMES = ["Mako", "Jinx", "Riot", "Axel", "Nova", "Blaze", "Koda", "Vex"];
const REMOTE_PLAYER_COLORS = ["#ffd166", "#7bdff2", "#b2f7ef", "#f7a072", "#cdb4db", "#90be6d"];
const STORAGE_KEYS = {
    best: "sidewalk-session-best",
    coins: "sidewalk-session-coins",
    selectedMap: "sidewalk-session-map",
    equippedDeck: "sidewalk-session-equipped-deck",
    ownedDecks: "sidewalk-session-owned-decks",
    equippedScooter: "sidewalk-session-equipped-scooter",
    ownedScooters: "sidewalk-session-owned-scooters",
    equippedBike: "sidewalk-session-equipped-bike",
    ownedBikes: "sidewalk-session-owned-bikes",
    equippedRideType: "sidewalk-session-equipped-ride-type",
    gameMode: "sidewalk-session-game-mode",
    username: "sidewalk-session-username",
    competitionEnabled: "sidewalk-session-competition-enabled",
    competitionWins: "sidewalk-session-competition-wins",
};
const MAP_DEFINITIONS = {
    city: {
        id: "city",
        name: "Open NYC",
        description: "An open Manhattan-style city map with avenues, cross streets, plazas, park space, rooftops of light, and skate spots spread across the grid.",
        flavor: "Open free-skate city blocks with distributed rails and ramps.",
    },
    skatepark: {
        id: "skatepark",
        name: "Stoner Plaza Replica",
        description: "An open skatepark map with plaza sections, quarters, ledges, stairs, a bowl pocket, and rails you can free-roam between.",
        flavor: "Open real-skatepark-inspired concrete layout with multiple lines.",
    },
    bowl: {
        id: "bowl",
        name: "Sunken Bowl",
        description: "A bowl-focused map with deep transitions, deck space, hips, pocket walls, and a fast central pit built for pumping lines.",
        flavor: "Open bowl session with roll-ins, pockets, and deck rails.",
    },
    megabowl: {
        id: "megabowl",
        name: "Titan Bowl",
        description: "A massive skate bowl with long walls, deep pockets, giant hips, and enough deck room to keep speed through full bowl lines.",
        flavor: "Huge bowl map built for long pumping lines and high-speed airs.",
    },
};
const SHOP_ITEMS = {
    classic: {
        id: "classic",
        name: "Classic Setup",
        price: 0,
        description: "The default city-ready board.",
        deck: "#142033",
        nose: "#ff7a59",
        tail: "#2d8f85",
        shirt: "#f5ead0",
    },
    neon: {
        id: "neon",
        name: "Neon Burst",
        price: 450,
        description: "High-contrast deck art with electric accents.",
        deck: "#0f1121",
        nose: "#84ff61",
        tail: "#2de2e6",
        shirt: "#fff3ce",
    },
    sunset: {
        id: "sunset",
        name: "Sunset Fade",
        price: 850,
        description: "Warm deck colors pulled from the evening sky.",
        deck: "#3c2146",
        nose: "#ffb347",
        tail: "#ff6b5e",
        shirt: "#ffe3c2",
    },
    chrome: {
        id: "chrome",
        name: "Chrome Drift",
        price: 1400,
        description: "Polished metal tones for late-game flex.",
        deck: "#283341",
        nose: "#e8f0ff",
        tail: "#a9d1ff",
        shirt: "#dfe6f0",
    },
    venom: {
        id: "venom",
        name: "Venom Strike",
        price: 1900,
        description: "Toxic green highlights over a blackout street deck.",
        deck: "#0a0f12",
        nose: "#9dff5c",
        tail: "#24b36b",
        shirt: "#dfffd1",
    },
    inferno: {
        id: "inferno",
        name: "Inferno Tape",
        price: 2350,
        description: "Scorched red-orange graphics built to stand out in sunset sessions.",
        deck: "#2b0f12",
        nose: "#ffb347",
        tail: "#ff5c4d",
        shirt: "#ffe0c9",
    },
    arctic: {
        id: "arctic",
        name: "Arctic Static",
        price: 2800,
        description: "Icy blues and pale silver for a clean technical look.",
        deck: "#1b2d40",
        nose: "#f5fbff",
        tail: "#6fd5ff",
        shirt: "#eef9ff",
    },
    royalty: {
        id: "royalty",
        name: "Royal Wreck",
        price: 3400,
        description: "Deep navy and gold trim with top-shelf sponsor energy.",
        deck: "#161d3b",
        nose: "#ffd76a",
        tail: "#8ea6ff",
        shirt: "#f8efd7",
    },
    graffiti: {
        id: "graffiti",
        name: "Graffiti Riot",
        price: 3950,
        description: "Custom street-art colors with loud nose and tail hits.",
        deck: "#15111f",
        nose: "#ff4fa3",
        tail: "#4dffcf",
        shirt: "#ffe8fb",
    },
    obsidian: {
        id: "obsidian",
        name: "Obsidian Gold",
        price: 4500,
        description: "Black-and-gold custom setup with polished late-game style.",
        deck: "#0c0c10",
        nose: "#f8d05f",
        tail: "#f59e0b",
        shirt: "#fff1c7",
    },
    glitchwave: {
        id: "glitchwave",
        name: "Glitchwave",
        price: 5200,
        description: "Cyber teal and magenta graphics for a fully custom contest look.",
        deck: "#101a2c",
        nose: "#48f0ff",
        tail: "#ff4fd8",
        shirt: "#e7f8ff",
    },
    phantom: {
        id: "phantom",
        name: "Phantom Signal",
        price: 6400,
        description: "Legendary box-only deck with ghost-white nose and blackout tail.",
        deck: "#090c14",
        nose: "#f7fbff",
        tail: "#55607f",
        shirt: "#eef4ff",
        boxOnly: true,
    },
    solarflare: {
        id: "solarflare",
        name: "Solar Flare",
        price: 6900,
        description: "Legendary box-only custom that burns from yellow nose into magma tail.",
        deck: "#28120c",
        nose: "#ffe56b",
        tail: "#ff5e3a",
        shirt: "#fff0c4",
        boxOnly: true,
    },
};
const SCOOTER_ITEMS = {
    streetline: {
        id: "streetline",
        name: "Streetline Complete",
        price: 0,
        description: "A clean all-round scooter for street sessions.",
        deck: "#1a2236",
        clamp: "#ffd166",
        grips: "#8bd3dd",
        shirt: "#f2ead4",
    },
    metro: {
        id: "metro",
        name: "Metro Raw",
        price: 520,
        description: "Brushed metal scooter built for city spots and rails.",
        deck: "#434f61",
        clamp: "#f2f6fb",
        grips: "#75d1ff",
        shirt: "#d9e8f5",
    },
    ember: {
        id: "ember",
        name: "Ember Drift",
        price: 980,
        description: "Warm anodized tones with bright clamp accents.",
        deck: "#562b2c",
        clamp: "#ffb25b",
        grips: "#ff7d6e",
        shirt: "#ffe0c8",
    },
    blackout: {
        id: "blackout",
        name: "Blackout Pro",
        price: 1500,
        description: "Dark pro setup with high-contrast hardware and bars.",
        deck: "#11151d",
        clamp: "#e6eef7",
        grips: "#a7ff83",
        shirt: "#dce4ec",
    },
    toxic: {
        id: "toxic",
        name: "Toxic Circuit",
        price: 2050,
        description: "Radioactive green hardware over a stealth street deck.",
        deck: "#101418",
        clamp: "#90ff57",
        grips: "#33d17a",
        shirt: "#ebffd8",
    },
    skyline: {
        id: "skyline",
        name: "Skyline Fade",
        price: 2480,
        description: "Cool skyline blue tones with polished city-night hardware.",
        deck: "#20364d",
        clamp: "#d7eefc",
        grips: "#63c7ff",
        shirt: "#e3f4ff",
    },
    magma: {
        id: "magma",
        name: "Magma Rail",
        price: 2960,
        description: "Molten orange and ember-red parts made for heavy rail sessions.",
        deck: "#3a1715",
        clamp: "#ff934f",
        grips: "#ff5d47",
        shirt: "#ffe3d4",
    },
    hologram: {
        id: "hologram",
        name: "Hologram Team",
        price: 3600,
        description: "Iridescent pastel hardware with full contest-final energy.",
        deck: "#1b2338",
        clamp: "#f8d7ff",
        grips: "#8ce8ff",
        shirt: "#f3ebff",
    },
    nebula: {
        id: "nebula",
        name: "Nebula Custom",
        price: 4180,
        description: "Galaxy-inspired custom parts with deep blue deck and pink clamp.",
        deck: "#171b38",
        clamp: "#ff79c6",
        grips: "#6cf0ff",
        shirt: "#f3e8ff",
    },
    riot: {
        id: "riot",
        name: "Riot Build",
        price: 4720,
        description: "Aggressive custom street build with hazard-yellow hardware.",
        deck: "#12161d",
        clamp: "#ffe66d",
        grips: "#ff8a5b",
        shirt: "#fff0cf",
    },
    frostbite: {
        id: "frostbite",
        name: "Frostbite LTD",
        price: 5350,
        description: "Ice-white custom clamp kit with frozen blue grips.",
        deck: "#203247",
        clamp: "#f7fcff",
        grips: "#8ed8ff",
        shirt: "#edfaff",
    },
    afterglow: {
        id: "afterglow",
        name: "Afterglow",
        price: 6500,
        description: "Legendary box-only scooter with radiant pink hardware and night-sky deck.",
        deck: "#12182c",
        clamp: "#ff7fd1",
        grips: "#8ef0ff",
        shirt: "#ffe7fb",
        boxOnly: true,
    },
    relic: {
        id: "relic",
        name: "Relic Gold",
        price: 7050,
        description: "Legendary box-only street build with black deck and gold competition clamp.",
        deck: "#0c0e12",
        clamp: "#ffd76a",
        grips: "#f59f45",
        shirt: "#fff0cd",
        boxOnly: true,
    },
};
const BIKE_ITEMS = {
    parkline: {
        id: "parkline",
        name: "Parkline BMX",
        price: 0,
        description: "A balanced BMX built for bowls, plazas, and quick park lines.",
        frame: "#2957d3",
        fork: "#f4f7fb",
        grips: "#121826",
        shirt: "#e9eef7",
    },
    bronze: {
        id: "bronze",
        name: "Bronze Cut",
        price: 700,
        description: "Warm metallic frame colors with crisp front-end hardware.",
        frame: "#8f4f2d",
        fork: "#f5c27a",
        grips: "#221814",
        shirt: "#ffe2ca",
    },
    glitch: {
        id: "glitch",
        name: "Glitch Signal",
        price: 1250,
        description: "A bright park build with cold metal fork tones and dark grips.",
        frame: "#14a0a4",
        fork: "#dce6f4",
        grips: "#11151d",
        shirt: "#d9f8f6",
    },
    lunar: {
        id: "lunar",
        name: "Lunar Raw",
        price: 1800,
        description: "Raw alloy fork, muted frame, and pro-level street-bike energy.",
        frame: "#394556",
        fork: "#eef3f7",
        grips: "#090c11",
        shirt: "#dbe3ea",
    },
    wildfire: {
        id: "wildfire",
        name: "Wildfire Frame",
        price: 2300,
        description: "Hot orange frame paint with clean fork contrast for big park lines.",
        frame: "#b9471c",
        fork: "#ffe2c8",
        grips: "#20110d",
        shirt: "#ffe4d3",
    },
    emerald: {
        id: "emerald",
        name: "Emerald Rush",
        price: 2780,
        description: "Rich green framework and silver front end for polished street clips.",
        frame: "#0f7b57",
        fork: "#e6f6f1",
        grips: "#0f1716",
        shirt: "#dcfff1",
    },
    midnight: {
        id: "midnight",
        name: "Midnight Signal",
        price: 3260,
        description: "Deep midnight frame with electric blue highlights and blackout grips.",
        frame: "#17223f",
        fork: "#b8cbff",
        grips: "#070a12",
        shirt: "#e3eaff",
    },
    aurora: {
        id: "aurora",
        name: "Aurora Chrome",
        price: 3950,
        description: "Premium chrome-and-teal colorway with a full pro contest look.",
        frame: "#3f6d76",
        fork: "#f5fcff",
        grips: "#091114",
        shirt: "#e8fffd",
    },
    venomline: {
        id: "venomline",
        name: "Venomline",
        price: 4450,
        description: "Custom blackout frame with poisonous green fork flashes.",
        frame: "#101610",
        fork: "#8fff61",
        grips: "#060a08",
        shirt: "#e6ffd8",
    },
    heatwave: {
        id: "heatwave",
        name: "Heatwave Park",
        price: 4980,
        description: "Sun-baked custom frame colors made for huge bowl lines.",
        frame: "#8c2f1c",
        fork: "#ffd1a6",
        grips: "#1b0d09",
        shirt: "#ffe5d3",
    },
    mirage: {
        id: "mirage",
        name: "Mirage Team",
        price: 5600,
        description: "Ultra-clean custom frame with pale fork metal and icy grips.",
        frame: "#355b74",
        fork: "#f7fdff",
        grips: "#0a1419",
        shirt: "#ebfbff",
    },
    eclipse: {
        id: "eclipse",
        name: "Eclipse Run",
        price: 6700,
        description: "Legendary box-only BMX with lunar silver fork and eclipse-black frame.",
        frame: "#0b1020",
        fork: "#f4f7ff",
        grips: "#05070d",
        shirt: "#edf1ff",
        boxOnly: true,
    },
    overdrive: {
        id: "overdrive",
        name: "Overdrive",
        price: 7250,
        description: "Legendary box-only custom frame with electric fork flash and rare pro finish.",
        frame: "#10213b",
        fork: "#61d4ff",
        grips: "#071118",
        shirt: "#e1f8ff",
        boxOnly: true,
    },
};
const SKIN_BOXES = {
    street: {
        id: "street",
        name: "Street Loot Box",
        price: 900,
        description: "Unlocks one random unowned skateboard skin.",
        rideTypes: ["board"],
        gradient: ["#ffd166", "#ff7b59", "#1b2338"],
    },
    barspin: {
        id: "barspin",
        name: "Barspin Box",
        price: 1050,
        description: "Unlocks one random unowned scooter skin.",
        rideTypes: ["scooter"],
        gradient: ["#8ce8ff", "#63c7ff", "#20364d"],
    },
    park: {
        id: "park",
        name: "Park Crate",
        price: 1200,
        description: "Unlocks one random unowned BMX skin.",
        rideTypes: ["bike"],
        gradient: ["#90ff57", "#1cc98a", "#15202a"],
    },
    allstar: {
        id: "allstar",
        name: "All-Star Vault",
        price: 1650,
        description: "Unlocks one random unowned premium skin from any ride type.",
        rideTypes: ["board", "scooter", "bike"],
        gradient: ["#f8d7ff", "#ffd166", "#63c7ff"],
    },
};
const BOARD_TRICK_LIBRARY = {
    KeyZ: { name: "Kickflip", points: 240, flipVelocity: -11.5 },
    KeyX: { name: "Heelflip", points: 280, flipVelocity: 12.2 },
    KeyC: { name: "Shuvit", points: 360, spinVelocity: 16.5 },
    KeyV: { name: "360 Flip", points: 540, flipVelocity: -10.8, spinVelocity: 16.8 },
    KeyB: { name: "Varial Heel", points: 520, flipVelocity: 10.6, spinVelocity: -12.8 },
    KeyN: { name: "Impossible", points: 560, rollVelocity: 18.5, spinVelocity: 5.6 },
    KeyF: { name: "Laser Flip", points: 680, flipVelocity: 12.6, spinVelocity: 17.2 },
    KeyG: { name: "Body Varial", points: 420, bodyVelocity: 12.5 },
};
const SCOOTER_TRICK_LIBRARY = {
    KeyZ: { name: "Tailwhip", points: 250, whipVelocity: -16.8 },
    KeyX: { name: "Heelwhip", points: 300, whipVelocity: 17.4 },
    KeyC: { name: "Barspin", points: 360, barVelocity: 18.4 },
    KeyV: { name: "Double Whip", points: 560, whipVelocity: -30.2 },
    KeyB: { name: "Whip Rewind", points: 520, whipVelocity: 15.4, barVelocity: -9.8 },
    KeyN: { name: "Bri Flip", points: 610, whipVelocity: -12.4, rollVelocity: 16.6, bodyVelocity: 8.4 },
    KeyF: { name: "Flair", points: 760, barVelocity: 16.8, rollVelocity: 12.2, bodyVelocity: 11.6 },
    KeyG: { name: "Fingerwhip", points: 470, whipVelocity: -9.8, barVelocity: 8.4, bodyVelocity: 8.2 },
};
const BIKE_TRICK_LIBRARY = {
    KeyZ: { name: "Barspin", points: 260, barVelocity: 18.6 },
    KeyX: { name: "Tailwhip", points: 360, whipVelocity: -14.8 },
    KeyC: { name: "X-Up", points: 220, barVelocity: 10.2 },
    KeyV: { name: "360", points: 430, spinVelocity: 15.2 },
    KeyB: { name: "Tabletop", points: 390, rollVelocity: 13.4 },
    KeyN: { name: "Turndown", points: 500, barVelocity: -9.4, bodyVelocity: 7.6, rollVelocity: -6.8 },
    KeyF: { name: "Backflip", points: 720, flipVelocity: -9.6 },
    KeyG: { name: "No-Hander", points: 340, bodyVelocity: 6.4 },
};
const BOWL_TRICK_LIBRARY = {
    board: {
        KeyZ: { name: "Indy Air", points: 320, bodyVelocity: 6.2, rollVelocity: -3.2 },
        KeyX: { name: "Melon Air", points: 340, bodyVelocity: 6.6, rollVelocity: 3.6 },
        KeyC: { name: "Lien Air", points: 390, spinVelocity: 11.8, bodyVelocity: 6.2 },
        KeyV: { name: "Method Air", points: 560, rollVelocity: 14.2, bodyVelocity: 8.8 },
        KeyB: { name: "Japan Air", points: 520, rollVelocity: -12.8, bodyVelocity: 8.6 },
        KeyN: { name: "Madonna", points: 620, bodyVelocity: 12.2, rollVelocity: 10.4 },
        KeyF: { name: "McTwist", points: 840, flipVelocity: -8.8, bodyVelocity: 10.6, spinVelocity: 14.4 },
        KeyG: { name: "Stalefish", points: 430, bodyVelocity: 7.8, rollVelocity: 4.4 },
    },
    scooter: {
        KeyZ: { name: "Can-Can", points: 300, bodyVelocity: 7.2 },
        KeyX: { name: "No-Foot Air", points: 320, bodyVelocity: 7.8 },
        KeyC: { name: "Toboggan", points: 360, barVelocity: 10.4, bodyVelocity: 6.6 },
        KeyV: { name: "Buttercup", points: 600, barVelocity: 13.6, whipVelocity: -13.6, bodyVelocity: 9.6 },
        KeyB: { name: "Seat Grab Air", points: 440, bodyVelocity: 8.6, rollVelocity: 6.2 },
        KeyN: { name: "Briflair", points: 720, whipVelocity: -12.6, rollVelocity: 12.4, bodyVelocity: 10.8 },
        KeyF: { name: "Cash Roll", points: 820, flipVelocity: -8.2, rollVelocity: 11.8, bodyVelocity: 11.2 },
        KeyG: { name: "Invert", points: 500, rollVelocity: 9.4, bodyVelocity: 8.8 },
    },
    bike: {
        KeyZ: { name: "Tuck No-Hander", points: 320, bodyVelocity: 8.6 },
        KeyX: { name: "Superman Seat Grab", points: 520, bodyVelocity: 11.6, rollVelocity: -6.6 },
        KeyC: { name: "Lookback Air", points: 320, bodyVelocity: 7.2, barVelocity: -8.2 },
        KeyV: { name: "Airtime 360", points: 500, spinVelocity: 15.8, bodyVelocity: 7.6 },
        KeyB: { name: "Table Air", points: 470, rollVelocity: 14.4, bodyVelocity: 8.4 },
        KeyN: { name: "Turndown Air", points: 560, barVelocity: -10.6, bodyVelocity: 8.2, rollVelocity: -8.6 },
        KeyF: { name: "Flair", points: 820, flipVelocity: -8.8, spinVelocity: 14.2, bodyVelocity: 10.4 },
        KeyG: { name: "One-Hander", points: 380, bodyVelocity: 7.8 },
    },
};
const BOWL_GRIND_LIBRARY = {
    board: {
        KeyZ: { name: "Coping Slide", points: 190, rollVelocity: 4.4 },
        KeyX: { name: "5-0 Stall", points: 220, bodyVelocity: 4.8 },
        KeyC: { name: "Smith Stall", points: 250, rollVelocity: 5.6, bodyVelocity: 4.2 },
        KeyV: { name: "Disaster", points: 300, spinVelocity: 5.2, rollVelocity: 6.2 },
        KeyB: { name: "Feeble Stall", points: 310, rollVelocity: -5.2, bodyVelocity: 5.4 },
        KeyN: { name: "Slash Grind", points: 340, rollVelocity: 6.6, bodyVelocity: -4.6 },
        KeyF: { name: "Blunt to Fakie", points: 380, spinVelocity: 6.2, rollVelocity: 7.2 },
        KeyG: { name: "Oververt", points: 360, bodyVelocity: 7.1, rollVelocity: 5.2 },
    },
    scooter: {
        KeyZ: { name: "Feeble Stall", points: 190, bodyVelocity: 4.2 },
        KeyX: { name: "Smith Stall", points: 220, rollVelocity: 4.8 },
        KeyC: { name: "Coping Crook", points: 250, rollVelocity: 5.4, bodyVelocity: 4.2 },
        KeyV: { name: "Hurricane Stall", points: 320, spinVelocity: 5.6, bodyVelocity: 5.8 },
        KeyB: { name: "Overcrook Stall", points: 330, rollVelocity: -6, bodyVelocity: 5.8 },
        KeyN: { name: "Suski Stall", points: 350, rollVelocity: 6.4, spinVelocity: 4.4 },
        KeyF: { name: "Icepick Stall", points: 390, bodyVelocity: 7.6, rollVelocity: 7.1 },
        KeyG: { name: "Invert Grind", points: 410, bodyVelocity: 8.1, rollVelocity: 6.2 },
    },
    bike: {
        KeyZ: { name: "Double Peg Stall", points: 190, bodyVelocity: 3.9 },
        KeyX: { name: "Ice Stall", points: 230, rollVelocity: 4.6 },
        KeyC: { name: "Tire Tap", points: 210, bodyVelocity: 4.4, spinVelocity: 3.2 },
        KeyV: { name: "Tooth Stall", points: 310, rollVelocity: 6.2, bodyVelocity: -5.1 },
        KeyB: { name: "Smith Stall", points: 320, rollVelocity: -5.6, bodyVelocity: 5.6 },
        KeyN: { name: "Luc-E Stall", points: 350, bodyVelocity: 7.1, spinVelocity: 3.8 },
        KeyF: { name: "Hang Five Stall", points: 390, bodyVelocity: 7.5, rollVelocity: 6.4 },
        KeyG: { name: "Coping Crook", points: 340, rollVelocity: 5.6, bodyVelocity: 4.8 },
    },
};
const GRIND_TRICK_LIBRARY = {
    board: {
        KeyZ: { name: "Boardslide", points: 170, rollVelocity: 4.2 },
        KeyX: { name: "Noseslide", points: 180, bodyVelocity: 4.4 },
        KeyC: { name: "Crooked Grind", points: 240, rollVelocity: 5.4, bodyVelocity: 3.8 },
        KeyV: { name: "Lipslide", points: 260, spinVelocity: 4.8, rollVelocity: 5.8 },
        KeyB: { name: "Feeble Grind", points: 280, rollVelocity: -4.8, bodyVelocity: 4.8 },
        KeyN: { name: "Smith Grind", points: 300, rollVelocity: 6.2, bodyVelocity: -4.4 },
        KeyF: { name: "Bluntslide", points: 340, spinVelocity: 5.6, rollVelocity: 6.8 },
        KeyG: { name: "Overcrook", points: 320, bodyVelocity: 6.6, rollVelocity: 4.8 },
    },
    scooter: {
        KeyZ: { name: "Feeble", points: 170, bodyVelocity: 4.2 },
        KeyX: { name: "Smith", points: 190, rollVelocity: 4.6 },
        KeyC: { name: "Crooked", points: 240, rollVelocity: 5.2, bodyVelocity: 4 },
        KeyV: { name: "Hurricane", points: 290, spinVelocity: 5.4, bodyVelocity: 5.4 },
        KeyB: { name: "Overcrook", points: 300, rollVelocity: -5.8, bodyVelocity: 5.8 },
        KeyN: { name: "Suski", points: 330, rollVelocity: 6.1, spinVelocity: 4.2 },
        KeyF: { name: "Icepick", points: 360, bodyVelocity: 7.4, rollVelocity: 6.8 },
        KeyG: { name: "Toothpick", points: 380, bodyVelocity: -6.8, rollVelocity: 6.4 },
    },
    bike: {
        KeyZ: { name: "Double Peg", points: 170, bodyVelocity: 3.8 },
        KeyX: { name: "Crank Arm", points: 200, rollVelocity: 4.2 },
        KeyC: { name: "Icepick", points: 250, bodyVelocity: 5.2, rollVelocity: 4.8 },
        KeyV: { name: "Toothpick", points: 280, rollVelocity: 5.8, bodyVelocity: -4.8 },
        KeyB: { name: "Smith", points: 300, rollVelocity: -5.4, bodyVelocity: 5.4 },
        KeyN: { name: "Luc-E", points: 330, bodyVelocity: 6.8, spinVelocity: 3.4 },
        KeyF: { name: "Hang Five", points: 360, bodyVelocity: 7.2, rollVelocity: 6.2 },
        KeyG: { name: "Crooked", points: 320, rollVelocity: 5.2, bodyVelocity: 4.6 },
    },
};
const GRIND_ANIMATION_LIBRARY = {
    board: {
        default: { torsoX: -0.16, torsoZ: 0.08, headY: 1.93, leftLegX: -0.42, rightLegX: -0.18, leftLegZ: -0.12, rightLegZ: 0.1, leftArmX: -0.45, rightArmX: 0.2, leftArmZ: -0.22, rightArmZ: 0.3, ridePitch: 0.04, rideYaw: 0.6, rideRoll: 0.08, riderLean: 0.12 },
        "50-50": { torsoX: -0.14, torsoZ: 0.06, ridePitch: 0.02, rideYaw: 0.58, rideRoll: 0.05, riderLean: 0.08 },
        Boardslide: { torsoX: -0.2, torsoZ: 0.12, leftLegX: -0.5, rightLegX: -0.22, rideYaw: 1.48, rideRoll: 0.04, riderLean: 0.18 },
        Noseslide: { torsoX: -0.22, torsoZ: 0.04, leftLegX: -0.68, rightLegX: -0.34, leftArmX: -0.62, rightArmX: -0.1, ridePitch: -0.1, rideYaw: 1.44, rideRoll: -0.02, riderLean: 0.1 },
        "Crooked Grind": { torsoX: -0.26, torsoZ: 0.18, leftLegX: -0.72, rightLegX: -0.24, leftLegZ: -0.2, rightLegZ: 0.14, ridePitch: -0.16, rideYaw: 0.78, rideRoll: 0.18, riderLean: 0.24 },
        Lipslide: { torsoX: -0.22, torsoZ: -0.1, leftLegX: -0.44, rightLegX: -0.26, rideYaw: 2.06, rideRoll: -0.08, riderLean: -0.18 },
        "Feeble Grind": { torsoX: -0.18, torsoZ: 0.14, leftLegX: -0.52, rightLegX: -0.22, ridePitch: 0.02, rideYaw: 0.74, rideRoll: 0.22, riderLean: 0.22 },
        "Smith Grind": { torsoX: -0.2, torsoZ: -0.08, leftLegX: -0.4, rightLegX: -0.54, ridePitch: -0.05, rideYaw: 0.68, rideRoll: -0.18, riderLean: -0.18 },
        Bluntslide: { torsoX: -0.28, torsoZ: 0.16, leftLegX: -0.36, rightLegX: -0.7, leftArmX: -0.58, rightArmX: 0.06, ridePitch: 0.14, rideYaw: 1.52, rideRoll: 0.18, riderLean: 0.26 },
        Overcrook: { torsoX: -0.27, torsoZ: 0.2, leftLegX: -0.76, rightLegX: -0.2, leftArmX: -0.66, rightArmX: -0.02, ridePitch: -0.2, rideYaw: 0.82, rideRoll: 0.2, riderLean: 0.28 },
    },
    scooter: {
        default: { torsoX: -0.12, torsoZ: 0.08, headY: 1.93, leftLegX: -0.32, rightLegX: -0.3, leftLegZ: -0.1, rightLegZ: 0.08, leftArmX: -0.42, rightArmX: -0.28, leftArmZ: -0.06, rightArmZ: 0.06, ridePitch: 0.03, rideYaw: Math.PI + 0.18, rideRoll: 0.06, riderLean: 0.12 },
        Feeble: { torsoX: -0.12, torsoZ: 0.12, rideYaw: Math.PI + 0.26, rideRoll: 0.12, riderLean: 0.18 },
        Smith: { torsoX: -0.14, torsoZ: -0.08, leftLegX: -0.28, rightLegX: -0.42, ridePitch: -0.06, rideYaw: Math.PI + 0.24, rideRoll: -0.12, riderLean: -0.16 },
        Crooked: { torsoX: -0.2, torsoZ: 0.18, leftLegX: -0.48, rightLegX: -0.22, leftArmX: -0.56, rightArmX: -0.34, ridePitch: -0.12, rideYaw: Math.PI + 0.34, rideRoll: 0.18, riderLean: 0.24 },
        Hurricane: { torsoX: -0.16, torsoZ: -0.16, rideYaw: Math.PI + 1.72, rideRoll: -0.16, riderLean: -0.24 },
        Overcrook: { torsoX: -0.22, torsoZ: 0.2, leftLegX: -0.52, rightLegX: -0.18, ridePitch: -0.18, rideYaw: Math.PI + 0.42, rideRoll: 0.2, riderLean: 0.26 },
        Suski: { torsoX: -0.18, torsoZ: 0.06, leftLegX: -0.34, rightLegX: -0.38, leftArmX: -0.64, rightArmX: -0.22, ridePitch: 0.04, rideYaw: Math.PI + 0.62, rideRoll: 0.1, riderLean: 0.14 },
        Icepick: { torsoX: -0.24, torsoZ: 0.16, leftLegX: -0.5, rightLegX: -0.16, ridePitch: 0.16, rideYaw: Math.PI + 0.38, rideRoll: 0.18, riderLean: 0.22 },
        Toothpick: { torsoX: -0.24, torsoZ: -0.12, leftLegX: -0.26, rightLegX: -0.54, ridePitch: 0.12, rideYaw: Math.PI + 0.36, rideRoll: -0.18, riderLean: -0.22 },
    },
    bike: {
        default: { torsoX: -0.08, torsoZ: 0.04, headY: 1.97, leftLegX: -0.72, rightLegX: -0.64, leftLegZ: -0.06, rightLegZ: 0.06, leftArmX: -0.62, rightArmX: -0.56, leftArmZ: -0.1, rightArmZ: 0.1, ridePitch: -0.04, rideYaw: 0.22, rideRoll: 0.06, riderLean: 0.08 },
        "Double Peg": { torsoX: -0.06, torsoZ: 0.06, rideYaw: 0.18, rideRoll: 0.04, riderLean: 0.08 },
        "Crank Arm": { torsoX: -0.12, torsoZ: -0.06, leftLegX: -0.6, rightLegX: -0.8, ridePitch: -0.08, rideYaw: 0.24, rideRoll: -0.1, riderLean: -0.14 },
        Icepick: { torsoX: -0.18, torsoZ: 0.16, leftLegX: -0.82, rightLegX: -0.52, leftArmX: -0.72, rightArmX: -0.48, ridePitch: 0.1, rideYaw: 0.3, rideRoll: 0.18, riderLean: 0.22 },
        Toothpick: { torsoX: -0.18, torsoZ: -0.12, leftLegX: -0.56, rightLegX: -0.82, ridePitch: 0.08, rideYaw: 0.26, rideRoll: -0.18, riderLean: -0.2 },
        Smith: { torsoX: -0.14, torsoZ: -0.08, leftLegX: -0.64, rightLegX: -0.78, ridePitch: -0.08, rideYaw: 0.24, rideRoll: -0.12, riderLean: -0.16 },
        "Luc-E": { torsoX: -0.16, torsoZ: 0.14, leftLegX: -0.86, rightLegX: -0.48, leftArmX: -0.78, rightArmX: -0.42, ridePitch: 0.04, rideYaw: 0.42, rideRoll: 0.14, riderLean: 0.18 },
        "Hang Five": { torsoX: -0.24, torsoZ: 0.08, leftLegX: -0.42, rightLegX: -0.92, leftArmX: -0.84, rightArmX: -0.58, ridePitch: -0.18, rideYaw: 0.12, rideRoll: 0.08, riderLean: 0.14 },
        Crooked: { torsoX: -0.18, torsoZ: 0.18, leftLegX: -0.84, rightLegX: -0.52, ridePitch: -0.14, rideYaw: 0.32, rideRoll: 0.18, riderLean: 0.2 },
    },
};

function createVersusSession() {
    return {
        activePlayerIndex: 0,
        scores: [0, 0],
        completedTurns: 0,
        winnerText: "",
    };
}

function createOnlineSession() {
    return {
        peer: null,
        peerId: "",
        role: "offline",
        roomCode: "",
        hostConnection: null,
        connections: new Map(),
        remotePlayers: new Map(),
        snapshots: new Map(),
        connected: false,
        status: "Switch to online multiplayer to host or join a room.",
        lastBroadcastAt: 0,
        competition: {
            enabled: false,
            startedAt: 0,
            duration: COMPETITION_DURATION,
            finished: false,
            standings: new Map(),
        },
    };
}

function createCompetitionState() {
    return {
        enabled: loadCompetitionEnabled(),
        duration: COMPETITION_DURATION,
        startedAt: 0,
        finished: false,
        finalScore: 0,
        wins: loadCompetitionWins(),
        lastBonusCoins: 0,
        resolvedRound: false,
        standings: [],
        bot: {
            active: false,
            name: "Mako",
            level: 1,
            score: 0,
            targetScore: 1500,
            x: 0,
            y: BOARD_RIDE_HEIGHT,
            z: 0,
            heading: 0,
            surfaceAngle: 0,
        },
    };
}

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.04;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffb66d");
scene.fog = new THREE.Fog("#ffb66d", 70, 240);

const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 500);
scene.add(camera);

const world = new THREE.Group();
scene.add(world);

const ambientLight = new THREE.HemisphereLight(0xfff3c6, 0x314158, 1.8);
scene.add(ambientLight);

const fillLight = new THREE.DirectionalLight(0x8eb6e8, 0.75);
fillLight.position.set(28, 18, -36);
scene.add(fillLight);

const sunLight = new THREE.DirectionalLight(0xfff1c2, 2.6);
sunLight.position.set(-24, 42, 18);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.bias = -0.00018;
sunLight.shadow.normalBias = 0.024;
sunLight.shadow.camera.left = -80;
sunLight.shadow.camera.right = 80;
sunLight.shadow.camera.top = 80;
sunLight.shadow.camera.bottom = -80;
sunLight.shadow.camera.near = 1;
sunLight.shadow.camera.far = 180;
scene.add(sunLight);

const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(7, 32, 32),
    new THREE.MeshBasicMaterial({ color: "#ffe7a8" })
);
sunMesh.position.set(120, 42, -90);
scene.add(sunMesh);

const sunHalo = new THREE.Mesh(
    new THREE.SphereGeometry(13, 28, 28),
    new THREE.MeshBasicMaterial({ color: "#ffd6a6", transparent: true, opacity: 0.22, depthWrite: false })
);
sunHalo.position.copy(sunMesh.position);
scene.add(sunHalo);

const atmosphereUniforms = {
    topColor: { value: new THREE.Color("#3e5f91") },
    horizonColor: { value: new THREE.Color("#f8b977") },
    bottomColor: { value: new THREE.Color("#fff0d2") },
    exponent: { value: 0.7 },
    offset: { value: 18 },
};

const skyDome = new THREE.Mesh(
    new THREE.SphereGeometry(360, 40, 24),
    new THREE.ShaderMaterial({
        uniforms: atmosphereUniforms,
        side: THREE.BackSide,
        depthWrite: false,
        vertexShader: `
            varying vec3 vWorldPosition;

            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 horizonColor;
            uniform vec3 bottomColor;
            uniform float exponent;
            uniform float offset;

            varying vec3 vWorldPosition;

            void main() {
                vec3 direction = normalize(vWorldPosition + vec3(0.0, offset, 0.0));
                float horizonMix = clamp(pow(max(direction.y, 0.0), exponent), 0.0, 1.0);
                float lowerMix = clamp(pow(max(-direction.y, 0.0), 0.65), 0.0, 1.0);
                vec3 sky = mix(horizonColor, topColor, horizonMix);
                sky = mix(sky, bottomColor, lowerMix * 0.7);
                gl_FragColor = vec4(sky, 1.0);
            }
        `,
    })
);
scene.add(skyDome);

const farGround = new THREE.Mesh(
    new THREE.PlaneGeometry(900, 500),
    new THREE.MeshStandardMaterial({ color: "#4f466e", roughness: 1, metalness: 0.02 })
);
farGround.rotation.x = -Math.PI / 2;
farGround.position.y = -5.2;
farGround.receiveShadow = true;
scene.add(farGround);

const skyline = new THREE.Group();
scene.add(skyline);

const cloudMaterial = new THREE.MeshStandardMaterial({
    color: "#fff3df",
    roughness: 1,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
});
const cloudLayer = new THREE.Group();
scene.add(cloudLayer);

const roadMaterial = new THREE.MeshStandardMaterial({ color: "#8a92a3", roughness: 0.9, metalness: 0.02 });
const curbMaterial = new THREE.MeshStandardMaterial({ color: "#f5ead0", roughness: 0.95 });
const stripeMaterial = new THREE.MeshStandardMaterial({ color: "#fff2bb", emissive: "#a58d39", emissiveIntensity: 0.12 });
const railMaterial = new THREE.MeshStandardMaterial({ color: "#ddf6ef", roughness: 0.25, metalness: 0.85 });
const coneMaterial = new THREE.MeshStandardMaterial({ color: "#ff7d58", roughness: 0.75 });
const barrierMaterial = new THREE.MeshStandardMaterial({ color: "#e5d4ab", roughness: 0.88 });
const pickupMaterial = new THREE.MeshStandardMaterial({ color: "#ffe082", emissive: "#a07008", emissiveIntensity: 0.7, roughness: 0.35, metalness: 0.2 });

const hudCanvas = document.createElement("canvas");
hudCanvas.width = 1024;
hudCanvas.height = 512;
const hudContext = hudCanvas.getContext("2d");
const hudTexture = new THREE.CanvasTexture(hudCanvas);
hudTexture.colorSpace = THREE.SRGBColorSpace;
const hudSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: hudTexture, transparent: true, depthTest: false, depthWrite: false })
);
hudSprite.position.set(-2.35, 1.3, -4.4);
hudSprite.scale.set(3.6, 1.8, 1);
camera.add(hudSprite);

const playerRoot = new THREE.Group();
const boardGroup = new THREE.Group();
const scooterGroup = new THREE.Group();
const bikeGroup = new THREE.Group();
const riderGroup = new THREE.Group();
playerRoot.add(boardGroup);
playerRoot.add(scooterGroup);
playerRoot.add(bikeGroup);
playerRoot.add(riderGroup);
world.add(playerRoot);

const boardDeckMaterial = new THREE.MeshPhysicalMaterial({ color: "#142033", roughness: 0.48, metalness: 0.06, clearcoat: 0.22, clearcoatRoughness: 0.36 });
const boardGripMaterial = new THREE.MeshStandardMaterial({ color: "#131923", roughness: 0.98, metalness: 0.02 });
const boardBoltMaterial = new THREE.MeshStandardMaterial({ color: "#dbe2e9", roughness: 0.22, metalness: 0.92 });
const boardDeckColorMeshes = [];
const boardNoseColorMeshes = [];
const boardTailColorMeshes = [];
const deck = new THREE.Mesh(
    new THREE.BoxGeometry(1.74, 0.08, 0.82),
    boardDeckMaterial
);
deck.castShadow = true;
deck.position.y = 0.02;
boardGroup.add(deck);
boardDeckColorMeshes.push(deck);

const deckSideRailLeft = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 0.05, 0.05),
    boardDeckMaterial
);
deckSideRailLeft.position.set(0, 0.03, -0.39);
deckSideRailLeft.castShadow = true;
boardGroup.add(deckSideRailLeft);
boardDeckColorMeshes.push(deckSideRailLeft);

const deckSideRailRight = deckSideRailLeft.clone();
deckSideRailRight.position.z = 0.39;
boardGroup.add(deckSideRailRight);
boardDeckColorMeshes.push(deckSideRailRight);

const deckUnderside = new THREE.Mesh(
    new THREE.BoxGeometry(2.48, 0.03, 0.78),
    new THREE.MeshStandardMaterial({ color: "#0c1119", roughness: 0.72, metalness: 0.04 })
);
deckUnderside.position.set(0, -0.02, 0);
deckUnderside.castShadow = true;
boardGroup.add(deckUnderside);

const deckGrip = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.02, 0.76),
    boardGripMaterial
);
deckGrip.position.set(0, 0.074, 0);
deckGrip.castShadow = true;
boardGroup.add(deckGrip);

[-0.95, 0.95].forEach((xOffset) => {
    [-0.22, 0.22].forEach((zOffset) => {
        const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.022, 10), boardBoltMaterial);
        bolt.rotation.x = Math.PI / 2;
        bolt.position.set(xOffset, 0.088, zOffset);
        bolt.castShadow = true;
        boardGroup.add(bolt);
    });
});

const noseGripCut = new THREE.Mesh(
    new THREE.BoxGeometry(0.44, 0.012, 0.72),
    new THREE.MeshStandardMaterial({ color: "#1d2330", roughness: 0.92 })
);
noseGripCut.position.set(-0.92, 0.086, 0);
noseGripCut.rotation.z = 0.18;
noseGripCut.castShadow = true;
boardGroup.add(noseGripCut);

const tailGripCut = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.012, 0.72),
    new THREE.MeshStandardMaterial({ color: "#1d2330", roughness: 0.92 })
);
tailGripCut.position.set(0.98, 0.084, 0);
tailGripCut.rotation.z = -0.16;
tailGripCut.castShadow = true;
boardGroup.add(tailGripCut);

const noseAccent = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.035, 0.8),
    new THREE.MeshStandardMaterial({ color: "#ff7a59", roughness: 0.5 })
);
noseAccent.position.set(-1.13, 0.104, 0);
noseAccent.rotation.z = 0.4;
noseAccent.castShadow = true;
boardGroup.add(noseAccent);
boardNoseColorMeshes.push(noseAccent);

const tailAccent = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.035, 0.8),
    new THREE.MeshStandardMaterial({ color: "#2d8f85", roughness: 0.5 })
);
tailAccent.position.set(1.13, 0.098, 0);
tailAccent.rotation.z = -0.32;
tailAccent.castShadow = true;
boardGroup.add(tailAccent);
boardTailColorMeshes.push(tailAccent);

const noseCore = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.07, 0.82),
    boardDeckMaterial
);
noseCore.position.set(-0.98, 0.045, 0);
noseCore.rotation.z = 0.25;
noseCore.castShadow = true;
boardGroup.add(noseCore);
boardDeckColorMeshes.push(noseCore);

const tailCore = new THREE.Mesh(
    new THREE.BoxGeometry(0.66, 0.07, 0.82),
    boardDeckMaterial
);
tailCore.position.set(1.0, 0.04, 0);
tailCore.rotation.z = -0.22;
tailCore.castShadow = true;
boardGroup.add(tailCore);
boardDeckColorMeshes.push(tailCore);

const noseTip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.38, 0.8, 18),
    boardDeckMaterial
);
noseTip.rotation.z = Math.PI / 2;
noseTip.position.set(-1.34, 0.11, 0);
noseTip.castShadow = true;
boardGroup.add(noseTip);
boardDeckColorMeshes.push(noseTip);

const tailTip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.36, 0.8, 18),
    boardDeckMaterial
);
tailTip.rotation.z = Math.PI / 2;
tailTip.position.set(1.34, 0.09, 0);
tailTip.castShadow = true;
boardGroup.add(tailTip);
boardDeckColorMeshes.push(tailTip);

const truckMaterial = new THREE.MeshPhysicalMaterial({ color: "#d5dce3", roughness: 0.24, metalness: 0.96, clearcoat: 0.18, clearcoatRoughness: 0.2 });
const wheelMaterial = new THREE.MeshStandardMaterial({ color: "#111822", roughness: 0.74, metalness: 0.04 });
const wheelMeshes = [];
const scooterWheelMeshes = [];
const bikeWheelMeshes = [];

[-0.95, 0.95].forEach((xOffset) => {
    const baseplate = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 0.34), truckMaterial);
    baseplate.position.set(xOffset, -0.06, 0);
    baseplate.castShadow = true;
    boardGroup.add(baseplate);

    const riser = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.26), new THREE.MeshStandardMaterial({ color: "#f2f5f8", roughness: 0.88 }));
    riser.position.set(xOffset, -0.015, 0);
    riser.castShadow = true;
    boardGroup.add(riser);

    [-0.12, 0.12].forEach((zOffset) => {
        const bushing = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.05, 12), new THREE.MeshStandardMaterial({ color: "#f3efe6", roughness: 0.76 }));
        bushing.position.set(xOffset, -0.11, zOffset);
        bushing.castShadow = true;
        boardGroup.add(bushing);
    });

    const kingpin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 0.08), truckMaterial);
    kingpin.position.set(xOffset, -0.145, 0);
    kingpin.castShadow = true;
    boardGroup.add(kingpin);

    const hanger = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.76), truckMaterial);
    hanger.position.set(xOffset, -0.185, 0);
    hanger.castShadow = true;
    boardGroup.add(hanger);

    const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.84, 12), truckMaterial);
    axle.rotation.x = Math.PI / 2;
    axle.position.set(xOffset, -0.185, 0);
    axle.castShadow = true;
    boardGroup.add(axle);

    [-0.32, 0.32].forEach((zOffset) => {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 16), wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(xOffset, -0.24, zOffset);
        wheel.castShadow = true;
        boardGroup.add(wheel);
        wheelMeshes.push(wheel);

        const wheelHub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.11, 12), new THREE.MeshStandardMaterial({ color: "#eef3f7", roughness: 0.24, metalness: 0.82 }));
        wheelHub.rotation.z = Math.PI / 2;
        wheelHub.position.copy(wheel.position);
        wheelHub.castShadow = true;
        boardGroup.add(wheelHub);

        const bearing = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.12, 10), truckMaterial);
        bearing.rotation.z = Math.PI / 2;
        bearing.position.copy(wheel.position);
        bearing.castShadow = true;
        boardGroup.add(bearing);
    });
});

const scooterDeckAssembly = new THREE.Group();
scooterDeckAssembly.position.set(-0.78, 0, 0);
scooterGroup.add(scooterDeckAssembly);

const scooterFrontAssembly = new THREE.Group();
scooterFrontAssembly.position.set(-0.78, 1.92, 0);
scooterGroup.add(scooterFrontAssembly);

const scooterDeck = new THREE.Mesh(
    new THREE.BoxGeometry(1.92, 0.09, 0.42),
    new THREE.MeshStandardMaterial({ color: "#1a2236", roughness: 0.58 })
);
scooterDeck.position.set(0.72, 0, 0);
scooterDeck.castShadow = true;
scooterDeckAssembly.add(scooterDeck);

const scooterStemMaterial = new THREE.MeshPhysicalMaterial({ color: "#dce5ef", roughness: 0.2, metalness: 0.94, clearcoat: 0.18, clearcoatRoughness: 0.22 });
const scooterDeckMaterial = scooterDeck.material;
const scooterClampMaterial = new THREE.MeshPhysicalMaterial({ color: "#ffd166", roughness: 0.26, metalness: 0.84, clearcoat: 0.22, clearcoatRoughness: 0.24 });
const scooterGripMaterial = new THREE.MeshStandardMaterial({ color: "#8bd3dd", roughness: 0.62, metalness: 0.08 });
const scooterDeckColorMeshes = [scooterDeck];
const scooterClampColorMeshes = [];
const scooterGripColorMeshes = [];

const scooterDeckSpine = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.06, 0.24), scooterDeckMaterial);
scooterDeckSpine.position.set(0.72, 0.065, 0);
scooterDeckSpine.castShadow = true;
scooterDeckAssembly.add(scooterDeckSpine);
scooterDeckColorMeshes.push(scooterDeckSpine);

const scooterGripTape = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.016, 0.28), new THREE.MeshStandardMaterial({ color: "#12161c", roughness: 0.96 }));
scooterGripTape.position.set(0.72, 0.092, 0);
scooterGripTape.castShadow = true;
scooterDeckAssembly.add(scooterGripTape);

const scooterDeckSideLeft = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.08, 0.035), scooterDeckMaterial);
scooterDeckSideLeft.position.set(0.7, 0.02, -0.19);
scooterDeckSideLeft.castShadow = true;
scooterDeckAssembly.add(scooterDeckSideLeft);
scooterDeckColorMeshes.push(scooterDeckSideLeft);

const scooterDeckSideRight = scooterDeckSideLeft.clone();
scooterDeckSideRight.position.z = 0.19;
scooterDeckAssembly.add(scooterDeckSideRight);
scooterDeckColorMeshes.push(scooterDeckSideRight);

const scooterDeckHeadtube = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.24, 18), scooterStemMaterial);
scooterDeckHeadtube.rotation.z = -0.18;
scooterDeckHeadtube.position.set(-0.1, 0.18, 0);
scooterDeckHeadtube.castShadow = true;
scooterDeckAssembly.add(scooterDeckHeadtube);

const scooterDeckNeck = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.08, 0.16), scooterDeckMaterial);
scooterDeckNeck.rotation.z = -0.46;
scooterDeckNeck.position.set(0.05, 0.14, 0);
scooterDeckNeck.castShadow = true;
scooterDeckAssembly.add(scooterDeckNeck);
scooterDeckColorMeshes.push(scooterDeckNeck);

const scooterDeckTail = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.38), scooterDeckMaterial);
scooterDeckTail.position.set(1.72, 0.02, 0);
scooterDeckTail.castShadow = true;
scooterDeckAssembly.add(scooterDeckTail);
scooterDeckColorMeshes.push(scooterDeckTail);

const scooterBrake = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.3), scooterClampMaterial);
scooterBrake.position.set(1.62, 0.08, 0);
scooterBrake.rotation.z = 0.34;
scooterBrake.castShadow = true;
scooterDeckAssembly.add(scooterBrake);
scooterClampColorMeshes.push(scooterBrake);

const scooterStem = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.06, 1.86, 18), scooterStemMaterial);
scooterStem.position.set(0, -0.86, 0);
scooterStem.rotation.z = -0.03;
scooterStem.castShadow = true;
scooterFrontAssembly.add(scooterStem);

const scooterClamp = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.16), scooterClampMaterial);
scooterClamp.position.set(0, 0.02, 0);
scooterClamp.castShadow = true;
scooterFrontAssembly.add(scooterClamp);
scooterClampColorMeshes.push(scooterClamp);

const scooterClampTop = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.07, 0.2), scooterClampMaterial);
scooterClampTop.position.set(0, 0.14, 0);
scooterClampTop.castShadow = true;
scooterFrontAssembly.add(scooterClampTop);
scooterClampColorMeshes.push(scooterClampTop);

[-0.11, -0.04, 0.03].forEach((yOffset) => {
    const spacer = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.028, 16), scooterClampMaterial);
    spacer.position.set(0, yOffset, 0);
    spacer.castShadow = true;
    scooterFrontAssembly.add(spacer);
    scooterClampColorMeshes.push(spacer);
});

const scooterBar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.07, 0.07), scooterStemMaterial);
scooterBar.position.set(0, 0.13, 0);
scooterBar.castShadow = true;
scooterFrontAssembly.add(scooterBar);

const scooterBarSleeveLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.2, 14), scooterClampMaterial);
scooterBarSleeveLeft.rotation.z = Math.PI / 2;
scooterBarSleeveLeft.position.set(-0.16, 0.13, 0);
scooterBarSleeveLeft.castShadow = true;
scooterFrontAssembly.add(scooterBarSleeveLeft);
scooterClampColorMeshes.push(scooterBarSleeveLeft);

const scooterBarSleeveRight = scooterBarSleeveLeft.clone();
scooterBarSleeveRight.position.x = 0.16;
scooterFrontAssembly.add(scooterBarSleeveRight);
scooterClampColorMeshes.push(scooterBarSleeveRight);

const scooterGripLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.22, 14), scooterGripMaterial);
scooterGripLeft.rotation.z = Math.PI / 2;
scooterGripLeft.position.set(-0.56, 0.13, 0);
scooterGripLeft.castShadow = true;
scooterFrontAssembly.add(scooterGripLeft);
scooterGripColorMeshes.push(scooterGripLeft);

const scooterGripRight = scooterGripLeft.clone();
scooterGripRight.position.x = 0.56;
scooterFrontAssembly.add(scooterGripRight);
scooterGripColorMeshes.push(scooterGripRight);

const scooterCrossbar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.62, 0.06), scooterStemMaterial);
scooterCrossbar.position.set(0, -0.18, 0);
scooterCrossbar.castShadow = true;
scooterFrontAssembly.add(scooterCrossbar);

const scooterFork = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.44, 0.08), scooterStemMaterial);
scooterFork.position.set(-0.02, -1.66, 0);
scooterFork.castShadow = true;
scooterFrontAssembly.add(scooterFork);

const scooterForkCrown = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.16), scooterClampMaterial);
scooterForkCrown.position.set(-0.02, -1.47, 0);
scooterForkCrown.castShadow = true;
scooterFrontAssembly.add(scooterForkCrown);
scooterClampColorMeshes.push(scooterForkCrown);

const scooterForkLeft = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.34, 0.04), scooterStemMaterial);
scooterForkLeft.position.set(-0.02, -1.8, -0.06);
scooterForkLeft.castShadow = true;
scooterFrontAssembly.add(scooterForkLeft);

const scooterForkRight = scooterForkLeft.clone();
scooterForkRight.position.z = 0.06;
scooterFrontAssembly.add(scooterForkRight);

const scooterFrontWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16), wheelMaterial.clone());
scooterFrontWheel.rotation.z = Math.PI / 2;
scooterFrontWheel.position.set(-0.04, -2.06, 0);
scooterFrontWheel.castShadow = true;
scooterFrontAssembly.add(scooterFrontWheel);
scooterWheelMeshes.push(scooterFrontWheel);

const scooterFrontHub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.13, 12), truckMaterial);
scooterFrontHub.rotation.z = Math.PI / 2;
scooterFrontHub.position.copy(scooterFrontWheel.position);
scooterFrontHub.castShadow = true;
scooterFrontAssembly.add(scooterFrontHub);

const scooterRearWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16), wheelMaterial.clone());
scooterRearWheel.rotation.z = Math.PI / 2;
scooterRearWheel.position.set(1.54, -0.16, 0);
scooterRearWheel.castShadow = true;
scooterDeckAssembly.add(scooterRearWheel);
scooterWheelMeshes.push(scooterRearWheel);

const scooterRearHub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.13, 12), truckMaterial);
scooterRearHub.rotation.z = Math.PI / 2;
scooterRearHub.position.copy(scooterRearWheel.position);
scooterRearHub.castShadow = true;
scooterDeckAssembly.add(scooterRearHub);

scooterGroup.visible = false;

const bikeFrameMaterial = new THREE.MeshPhysicalMaterial({ color: "#2957d3", roughness: 0.34, metalness: 0.46, clearcoat: 0.18, clearcoatRoughness: 0.26 });
const bikeForkMaterial = new THREE.MeshPhysicalMaterial({ color: "#f4f7fb", roughness: 0.22, metalness: 0.88, clearcoat: 0.16, clearcoatRoughness: 0.2 });
const bikeGripMaterial = new THREE.MeshStandardMaterial({ color: "#121826", roughness: 0.84 });
const bikeSeatMaterial = new THREE.MeshStandardMaterial({ color: "#10141b", roughness: 0.78 });
const bikeRimMaterial = new THREE.MeshPhysicalMaterial({ color: "#dbe3ee", roughness: 0.18, metalness: 0.94, clearcoat: 0.14, clearcoatRoughness: 0.18 });
const bikeSpokeMaterial = new THREE.MeshStandardMaterial({ color: "#c6d0db", roughness: 0.22, metalness: 0.88 });

const bikeFrameAssembly = new THREE.Group();
bikeGroup.add(bikeFrameAssembly);

const bikeFrontAssembly = new THREE.Group();
bikeFrontAssembly.position.set(0.72, 0.06, 0);
bikeGroup.add(bikeFrontAssembly);

const bikeRearWheel = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.055, 10, 24), wheelMaterial.clone());
bikeRearWheel.position.set(-0.72, -0.36, 0);
bikeRearWheel.castShadow = true;
bikeFrameAssembly.add(bikeRearWheel);
bikeWheelMeshes.push(bikeRearWheel);

const bikeRearRim = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.014, 8, 24), bikeRimMaterial);
bikeRearRim.position.copy(bikeRearWheel.position);
bikeRearRim.castShadow = true;
bikeFrameAssembly.add(bikeRearRim);

const bikeRearHub = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.18, 12), bikeSpokeMaterial);
bikeRearHub.rotation.z = Math.PI / 2;
bikeRearHub.position.copy(bikeRearWheel.position);
bikeRearHub.castShadow = true;
bikeFrameAssembly.add(bikeRearHub);

for (let index = 0; index < 10; index += 1) {
    const angle = index / 10 * Math.PI * 2;
    const rearSpoke = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.29, 6), bikeSpokeMaterial);
    rearSpoke.position.copy(bikeRearWheel.position);
    rearSpoke.rotation.z = Math.PI / 2;
    rearSpoke.rotation.y = angle;
    rearSpoke.rotation.x = Math.PI / 2 + 0.08;
    bikeFrameAssembly.add(rearSpoke);
}

const bikeFrontWheel = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.055, 10, 24), wheelMaterial.clone());
bikeFrontWheel.position.set(0, -0.36, 0);
bikeFrontWheel.castShadow = true;
bikeFrontAssembly.add(bikeFrontWheel);
bikeWheelMeshes.push(bikeFrontWheel);

const bikeFrontRim = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.014, 8, 24), bikeRimMaterial);
bikeFrontRim.position.copy(bikeFrontWheel.position);
bikeFrontRim.castShadow = true;
bikeFrontAssembly.add(bikeFrontRim);

const bikeFrontHub = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.18, 12), bikeSpokeMaterial);
bikeFrontHub.rotation.z = Math.PI / 2;
bikeFrontHub.position.copy(bikeFrontWheel.position);
bikeFrontHub.castShadow = true;
bikeFrontAssembly.add(bikeFrontHub);

for (let index = 0; index < 10; index += 1) {
    const angle = index / 10 * Math.PI * 2;
    const frontSpoke = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.29, 6), bikeSpokeMaterial);
    frontSpoke.position.copy(bikeFrontWheel.position);
    frontSpoke.rotation.z = Math.PI / 2;
    frontSpoke.rotation.y = angle;
    frontSpoke.rotation.x = Math.PI / 2 + 0.08;
    bikeFrontAssembly.add(frontSpoke);
}

const bikeTopTube = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.07, 0.08), bikeFrameMaterial);
bikeTopTube.position.set(-0.02, 0.13, 0);
bikeTopTube.rotation.z = -0.12;
bikeTopTube.castShadow = true;
bikeFrameAssembly.add(bikeTopTube);

const bikeDownTube = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.075, 0.08), bikeFrameMaterial);
bikeDownTube.position.set(-0.01, -0.05, 0);
bikeDownTube.rotation.z = 0.38;
bikeDownTube.castShadow = true;
bikeFrameAssembly.add(bikeDownTube);

const bikeSeatTube = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.07, 0.08), bikeFrameMaterial);
bikeSeatTube.position.set(-0.34, -0.03, 0);
bikeSeatTube.rotation.z = -0.9;
bikeSeatTube.castShadow = true;
bikeFrameAssembly.add(bikeSeatTube);

const bikeChainStay = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.07), bikeFrameMaterial);
bikeChainStay.position.set(-0.46, -0.28, 0);
bikeChainStay.rotation.z = -0.16;
bikeChainStay.castShadow = true;
bikeFrameAssembly.add(bikeChainStay);

const bikeSeatStay = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.05, 0.06), bikeFrameMaterial);
bikeSeatStay.position.set(-0.48, -0.02, 0);
bikeSeatStay.rotation.z = -0.72;
bikeSeatStay.castShadow = true;
bikeFrameAssembly.add(bikeSeatStay);

const bikeHeadTube = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.24, 0.09), bikeForkMaterial);
bikeHeadTube.position.set(0.38, 0.02, 0);
bikeHeadTube.rotation.z = 0.3;
bikeHeadTube.castShadow = true;
bikeFrameAssembly.add(bikeHeadTube);

const bikeSeatPost = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.28, 0.05), bikeForkMaterial);
bikeSeatPost.position.set(-0.31, 0.27, 0);
bikeSeatPost.rotation.z = 0.08;
bikeSeatPost.castShadow = true;
bikeFrameAssembly.add(bikeSeatPost);

const bikeSeat = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 0.16), bikeSeatMaterial);
bikeSeat.position.set(-0.34, 0.42, 0);
bikeSeat.rotation.z = -0.06;
bikeSeat.castShadow = true;
bikeFrameAssembly.add(bikeSeat);

const bikeCrank = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.2, 12), bikeForkMaterial);
bikeCrank.rotation.z = Math.PI / 2;
bikeCrank.position.set(-0.2, -0.2, 0);
bikeCrank.castShadow = true;
bikeFrameAssembly.add(bikeCrank);

const bikePedalBar = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.03, 0.03), bikeSpokeMaterial);
bikePedalBar.position.set(-0.2, -0.2, 0);
bikePedalBar.rotation.z = 0.24;
bikePedalBar.castShadow = true;
bikeFrameAssembly.add(bikePedalBar);

const bikeChainring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.015, 8, 24), bikeForkMaterial);
bikeChainring.position.set(-0.2, -0.2, 0);
bikeChainring.rotation.y = Math.PI / 2;
bikeChainring.castShadow = true;
bikeFrameAssembly.add(bikeChainring);

const bikeSeatRailLeft = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.02), bikeForkMaterial);
bikeSeatRailLeft.position.set(-0.34, 0.35, -0.04);
bikeSeatRailLeft.rotation.z = -0.22;
bikeSeatRailLeft.castShadow = true;
bikeFrameAssembly.add(bikeSeatRailLeft);

const bikeSeatRailRight = bikeSeatRailLeft.clone();
bikeSeatRailRight.position.z = 0.04;
bikeFrameAssembly.add(bikeSeatRailRight);

const bikeStem = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 0.08), bikeForkMaterial);
bikeStem.position.set(0, 0.08, 0);
bikeStem.rotation.z = 0.26;
bikeStem.castShadow = true;
bikeFrontAssembly.add(bikeStem);

const bikeFork = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.64, 0.08), bikeForkMaterial);
bikeFork.position.set(0, -0.1, 0);
bikeFork.rotation.z = 0.06;
bikeFork.castShadow = true;
bikeFrontAssembly.add(bikeFork);

const bikeBar = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.06, 0.06), bikeGripMaterial);
bikeBar.position.set(0.02, 0.19, 0);
bikeBar.castShadow = true;
bikeFrontAssembly.add(bikeBar);

bikeGroup.visible = false;

const skinMaterial = new THREE.MeshStandardMaterial({ color: "#d8af90", roughness: 0.7, metalness: 0.02 });
const hairMaterial = new THREE.MeshStandardMaterial({ color: "#201712", roughness: 0.76 });
const eyeMaterial = new THREE.MeshStandardMaterial({ color: "#181d24", roughness: 0.3 });
const torso = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.24, 0.9, 6, 10),
    new THREE.MeshStandardMaterial({ color: "#f5ead0", roughness: 0.78 })
);
torso.position.set(0, 1.22, 0);
torso.castShadow = true;
riderGroup.add(torso);

const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.27, 22, 22),
    skinMaterial
);
head.position.set(0, 2.0, 0);
head.castShadow = true;
riderGroup.add(head);

const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.275, 20, 18, 0, Math.PI * 2, 0, Math.PI * 0.58),
    hairMaterial
);
hairCap.position.y = 0.02;
head.add(hairCap);

const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 10), eyeMaterial);
leftEye.position.set(-0.08, 0.02, 0.23);
head.add(leftEye);

const rightEye = leftEye.clone();
rightEye.position.x = 0.08;
head.add(rightEye);

const nose = new THREE.Mesh(new THREE.CapsuleGeometry(0.028, 0.04, 3, 6), skinMaterial);
nose.position.set(0, -0.03, 0.24);
nose.rotation.x = Math.PI / 2;
head.add(nose);

[-0.25, 0.25].forEach((xOffset) => {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), skinMaterial);
    ear.scale.set(0.55, 0.78, 0.36);
    ear.position.set(xOffset, 0.02, 0.02);
    head.add(ear);
});

const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.16, 12), skinMaterial);
neck.position.set(0, 1.72, 0);
neck.castShadow = true;
riderGroup.add(neck);

const shoulderLine = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.58, 4, 8), torso.material);
shoulderLine.position.set(0, 1.45, 0);
shoulderLine.rotation.z = Math.PI / 2;
shoulderLine.castShadow = true;
riderGroup.add(shoulderLine);

const limbMaterial = new THREE.MeshStandardMaterial({ color: "#101825", roughness: 0.8 });
const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.24, 0.3), limbMaterial);
pelvis.position.set(0, 0.74, 0);
pelvis.castShadow = true;
riderGroup.add(pelvis);

const leftLeg = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.66, 5, 8), limbMaterial);
leftLeg.position.set(-0.2, 0.54, -0.15);
leftLeg.castShadow = true;
riderGroup.add(leftLeg);

const rightLeg = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.66, 5, 8), limbMaterial);
rightLeg.position.set(0.2, 0.54, 0.15);
rightLeg.castShadow = true;
riderGroup.add(rightLeg);

const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.56, 5, 8), limbMaterial);
leftArm.position.set(-0.4, 1.2, 0);
leftArm.castShadow = true;
riderGroup.add(leftArm);

const rightArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.56, 5, 8), limbMaterial);
rightArm.position.set(0.4, 1.2, 0);
rightArm.castShadow = true;
riderGroup.add(rightArm);

const leftForearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.38, 4, 8), skinMaterial);
leftForearm.position.set(0, -0.42, 0);
leftForearm.castShadow = true;
leftArm.add(leftForearm);

const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), skinMaterial);
leftHand.scale.set(0.9, 1.15, 0.65);
leftHand.position.set(0, -0.68, 0.02);
leftHand.castShadow = true;
leftArm.add(leftHand);

const rightForearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.38, 4, 8), skinMaterial);
rightForearm.position.set(0, -0.42, 0);
rightForearm.castShadow = true;
rightArm.add(rightForearm);

const rightHand = leftHand.clone();
rightHand.position.z = -0.02;
rightArm.add(rightHand);

const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.1, 0.16), new THREE.MeshStandardMaterial({ color: "#f2f4f7", roughness: 0.72 }));
leftShoe.position.set(0, -0.46, 0.03);
leftShoe.castShadow = true;
leftLeg.add(leftShoe);

const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.1, 0.16), new THREE.MeshStandardMaterial({ color: "#f2f4f7", roughness: 0.72 }));
rightShoe.position.set(0, -0.46, -0.03);
rightShoe.castShadow = true;
rightLeg.add(rightShoe);

const state = {
    width: window.innerWidth,
    height: window.innerHeight,
    mode: "menu",
    time: 0,
    best: loadBestScore(),
    score: 0,
    coins: loadCoins(),
    selectedMap: loadSelectedMap(),
    username: loadUsername(),
    equippedDeck: loadEquippedDeck(),
    ownedDecks: loadOwnedDecks(),
    equippedScooter: loadEquippedScooter(),
    ownedScooters: loadOwnedScooters(),
    equippedBike: loadEquippedBike(),
    ownedBikes: loadOwnedBikes(),
    equippedRideType: loadEquippedRideType(),
    gameMode: loadGameMode(),
    versus: createVersusSession(),
    competition: createCompetitionState(),
    menuVisible: true,
    activeMenuPanel: "home",
    lastSkinBoxMessage: "",
    activeRunMap: null,
    keys: new Set(),
    mobile: {
        enabled: false,
    },
    generationCursor: 0,
    terrainY: 0,
    cameraTarget: new THREE.Vector3(0, 0, 0),
    cameraLookAt: new THREE.Vector3(0, 0, 0),
    cameraOrbit: {
        yaw: 0.82,
        pitch: 0.34,
        dragging: false,
        pointerId: null,
        lastX: 0,
        lastY: 0,
    },
    trackSegments: [],
    citySurfaces: [],
    curvedSurfaces: [],
    rails: [],
    obstacles: [],
    pickups: [],
    props: [],
    solids: [],
    player: createPlayer(),
    hudPulse: 0,
    lastScoreEvent: "Drop in",
    lastRunCoins: 0,
};

const onlineState = createOnlineSession();
let deferredInstallPrompt = null;
let peerLibraryPromise = null;
let unlockToastTimer = null;
const clipRecorderState = {
    supported: typeof window.MediaRecorder !== "undefined" && typeof canvas.captureStream === "function",
    recorder: null,
    stream: null,
    chunks: [],
    recording: false,
    mimeType: "",
    lastClipUrl: "",
    lastClipName: "",
    status: "",
};

if (!state.username) {
    commitUsername(createDefaultUsername());
}

function replaceElementChildren(node, children) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    children.forEach((child) => node.appendChild(child));
}

function findClosestByClass(target, className, boundary) {
    let current = target;
    while (current && current !== boundary) {
        if (current.classList && current.classList.contains(className)) {
            return current;
        }
        current = current.parentNode;
    }
    return null;
}

function getClipRecorderMimeType() {
    if (!clipRecorderState.supported || typeof window.MediaRecorder.isTypeSupported !== "function") {
        return "video/webm";
    }

    const candidates = [
        "video/webm;codecs=vp9,opus",
        "video/webm;codecs=vp8,opus",
        "video/webm;codecs=h264,opus",
        "video/webm",
    ];
    return candidates.find((candidate) => window.MediaRecorder.isTypeSupported(candidate)) || "video/webm";
}

function getRecordingStatusText() {
    if (!clipRecorderState.supported) {
        return "Clip recorder is not supported in this browser.";
    }
    if (clipRecorderState.recording) {
        return "Recording clip now. Press L or use Stop Recording to save the WebM clip.";
    }
    if (clipRecorderState.lastClipName) {
        return `${clipRecorderState.lastClipName} saved. Press L during a ride to record another clip.`;
    }
    return "Clip recorder ready. Press L during a ride to start recording.";
}

function downloadRecordedClip(blob) {
    if (!blob) {
        return;
    }
    if (clipRecorderState.lastClipUrl) {
        URL.revokeObjectURL(clipRecorderState.lastClipUrl);
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const clipName = `sidewalk-session-clip-${timestamp}.webm`;
    const clipUrl = URL.createObjectURL(blob);
    clipRecorderState.lastClipUrl = clipUrl;
    clipRecorderState.lastClipName = clipName;
    const link = document.createElement("a");
    link.href = clipUrl;
    link.download = clipName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function stopClipRecording() {
    if (!clipRecorderState.recorder || !clipRecorderState.recording) {
        return false;
    }
    clipRecorderState.recorder.stop();
    return true;
}

function startClipRecording() {
    if (!clipRecorderState.supported || clipRecorderState.recording || (state.mode !== "playing" && state.mode !== "paused")) {
        return false;
    }

    clipRecorderState.mimeType = getClipRecorderMimeType();
    clipRecorderState.stream = canvas.captureStream(60);
    clipRecorderState.chunks = [];

    try {
        clipRecorderState.recorder = new window.MediaRecorder(clipRecorderState.stream, clipRecorderState.mimeType ? { mimeType: clipRecorderState.mimeType } : undefined);
    } catch (error) {
        clipRecorderState.recorder = null;
        clipRecorderState.stream = null;
        clipRecorderState.status = "Clip recorder failed to start in this browser.";
        renderMenu();
        return false;
    }

    clipRecorderState.recorder.addEventListener("dataavailable", (event) => {
        if (event.data && event.data.size > 0) {
            clipRecorderState.chunks.push(event.data);
        }
    });

    clipRecorderState.recorder.addEventListener("stop", () => {
        const blob = clipRecorderState.chunks.length > 0
            ? new Blob(clipRecorderState.chunks, { type: clipRecorderState.mimeType || "video/webm" })
            : null;
        clipRecorderState.chunks = [];
        clipRecorderState.recording = false;
        if (clipRecorderState.stream) {
            clipRecorderState.stream.getTracks().forEach((track) => track.stop());
        }
        clipRecorderState.stream = null;
        clipRecorderState.recorder = null;
        if (blob) {
            downloadRecordedClip(blob);
            clipRecorderState.status = `${clipRecorderState.lastClipName} saved.`;
            state.lastScoreEvent = `Clip saved: ${clipRecorderState.lastClipName}`;
        } else {
            clipRecorderState.status = "Recording stopped, but no clip data was captured.";
        }
        renderMenu();
    }, { once: true });

    clipRecorderState.recorder.start();
    clipRecorderState.recording = true;
    clipRecorderState.status = "Recording clip now.";
    state.lastScoreEvent = "Recording clip";
    renderMenu();
    return true;
}

function toggleClipRecording() {
    if (!clipRecorderState.supported) {
        clipRecorderState.status = "Clip recorder is not supported in this browser.";
        renderMenu();
        return false;
    }
    if (clipRecorderState.recording) {
        return stopClipRecording();
    }
    return startClipRecording();
}

function loadPeerLibrary() {
    if (window.Peer) {
        return Promise.resolve(window.Peer);
    }
    if (peerLibraryPromise) {
        return peerLibraryPromise;
    }

    peerLibraryPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = PEER_SCRIPT_URL;
        script.async = true;
        script.onload = () => {
            if (window.Peer) {
                resolve(window.Peer);
                return;
            }
            peerLibraryPromise = null;
            reject(new Error("PeerJS did not initialize."));
        };
        script.onerror = () => {
            peerLibraryPromise = null;
            reject(new Error("PeerJS failed to load."));
        };
        document.head.appendChild(script);
    });

    return peerLibraryPromise;
}

function bindUiPress(button, handler) {
    if (!button) {
        return;
    }

    let lastPointerActivation = 0;

    button.addEventListener("pointerup", (event) => {
        if (event.pointerType === "mouse") {
            return;
        }
        event.preventDefault();
        lastPointerActivation = Date.now();
        handler(event);
    });

    button.addEventListener("click", (event) => {
        if (Date.now() - lastPointerActivation < 450) {
            return;
        }
        handler(event);
    });
}

function getPeerErrorText(error, fallbackMessage) {
    if (!error) {
        return fallbackMessage;
    }
    return error.type || error.message || fallbackMessage;
}

function createPeerOptions() {
    return {
        host: "0.peerjs.com",
        port: 443,
        path: "/",
        secure: true,
        debug: 1,
    };
}

function createPlayer() {
    return {
        x: PLAYER_X_OFFSET,
        y: BOARD_RIDE_HEIGHT,
        z: 0,
        heading: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        lateralVelocity: 0,
        speed: CRUISE_SPEED,
        crouch: 0,
        airborne: false,
        grinding: false,
        grindRail: null,
        grindDirection: 1,
        carryingBoard: false,
        manualing: false,
        manualDuration: 0,
        surfaceAngle: 0,
        bodyLean: 0,
        trickFlip: 0,
        trickFlipVelocity: 0,
        trickSpin: 0,
        trickSpinVelocity: 0,
        trickRoll: 0,
        trickRollVelocity: 0,
        bodySpin: 0,
        bodySpinVelocity: 0,
        scooterBarSpin: 0,
        scooterBarSpinVelocity: 0,
        scooterTailwhip: 0,
        scooterTailwhipVelocity: 0,
        comboPoints: 0,
        comboMultiplier: 1,
        comboMoves: [],
        activeGrindTrick: "",
        tricksThisAir: 0,
        lastTrickAt: -999,
        lastGrindTrickAt: -999,
        lastManualAt: -999,
        grindBaseQueued: false,
        grindTricksThisRail: 0,
        lastBumpAt: -999,
    };
}

function loadBestScore() {
    try {
        return Number(window.localStorage.getItem(STORAGE_KEYS.best) || 0);
    } catch (error) {
        return 0;
    }
}

function saveBestScore() {
    try {
        window.localStorage.setItem(STORAGE_KEYS.best, String(state.best));
    } catch (error) {
        return;
    }
}

function loadCoins() {
    try {
        return Number(window.localStorage.getItem(STORAGE_KEYS.coins) || 0);
    } catch (error) {
        return 0;
    }
}

function loadSelectedMap() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEYS.selectedMap) || "city";
        return MAP_DEFINITIONS[value] ? value : "city";
    } catch (error) {
        return "city";
    }
}

function sanitizeUsername(value) {
    return String(value || "")
        .replace(/\s+/g, " ")
        .replace(/[^a-zA-Z0-9 _-]/g, "")
        .trim()
        .slice(0, 16);
}

function createDefaultUsername() {
    return `Rider${Math.floor(1000 + Math.random() * 9000)}`;
}

function getUnlockGradient(rideType, item) {
    if (rideType === "scooter") {
        return `linear-gradient(135deg, ${item.clamp}, ${item.deck} 52%, ${item.grips})`;
    }
    if (rideType === "bike") {
        return `linear-gradient(135deg, ${item.fork}, ${item.frame} 52%, ${item.grips})`;
    }
    return `linear-gradient(135deg, ${item.nose}, ${item.deck} 52%, ${item.tail})`;
}

function equipRideItem(rideType, itemId) {
    if (rideType === "board") {
        state.equippedDeck = itemId;
    } else if (rideType === "scooter") {
        state.equippedScooter = itemId;
    } else {
        state.equippedBike = itemId;
    }

    state.equippedRideType = rideType;
    applyRideSkin();
    saveProfile();
}

function showUnlockToast(rideType, item) {
    if (!unlockToast || !unlockToastLabel || !unlockToastTitle || !unlockToastMeta || !unlockToastSwatch) {
        return;
    }

    if (unlockToastTimer) {
        window.clearTimeout(unlockToastTimer);
    }

    unlockToastLabel.textContent = item.boxOnly ? "Legendary Unlock" : "New Unlock";
    unlockToastTitle.textContent = item.name;
    unlockToastMeta.textContent = `${getRideTypeLabel(rideType)} skin unlocked and equipped automatically. Visible for 10 seconds.`;
    unlockToastSwatch.style.background = getUnlockGradient(rideType, item);
    unlockToast.hidden = false;

    unlockToastTimer = window.setTimeout(() => {
        unlockToast.hidden = true;
    }, 10000);
}

function loadUsername() {
    try {
        return sanitizeUsername(window.localStorage.getItem(STORAGE_KEYS.username) || "");
    } catch (error) {
        return "";
    }
}

function loadOwnedDecks() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEYS.ownedDecks);
        const parsed = raw ? JSON.parse(raw) : ["classic"];
        const owned = Array.isArray(parsed) ? parsed.filter((id) => SHOP_ITEMS[id]) : ["classic"];
        return owned.includes("classic") ? owned : ["classic", ...owned];
    } catch (error) {
        return ["classic"];
    }
}

function loadEquippedDeck() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEYS.equippedDeck) || "classic";
        return SHOP_ITEMS[value] ? value : "classic";
    } catch (error) {
        return "classic";
    }
}

function loadOwnedBikes() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEYS.ownedBikes);
        const parsed = raw ? JSON.parse(raw) : ["parkline"];
        const owned = Array.isArray(parsed) ? parsed.filter((id) => BIKE_ITEMS[id]) : ["parkline"];
        return owned.includes("parkline") ? owned : ["parkline", ...owned];
    } catch (error) {
        return ["parkline"];
    }
}

function loadEquippedBike() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEYS.equippedBike) || "parkline";
        return BIKE_ITEMS[value] ? value : "parkline";
    } catch (error) {
        return "parkline";
    }
}

function loadOwnedScooters() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEYS.ownedScooters);
        const parsed = raw ? JSON.parse(raw) : ["streetline"];
        const owned = Array.isArray(parsed) ? parsed.filter((id) => SCOOTER_ITEMS[id]) : ["streetline"];
        return owned.includes("streetline") ? owned : ["streetline", ...owned];
    } catch (error) {
        return ["streetline"];
    }
}

function loadEquippedScooter() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEYS.equippedScooter) || "streetline";
        return SCOOTER_ITEMS[value] ? value : "streetline";
    } catch (error) {
        return "streetline";
    }
}

function loadEquippedRideType() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEYS.equippedRideType) || "board";
        return value === "scooter" || value === "bike" ? value : "board";
    } catch (error) {
        return "board";
    }
}

function loadGameMode() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEYS.gameMode) || "single";
        return value === "online" ? "online" : "single";
    } catch (error) {
        return "single";
    }
}

function loadCompetitionEnabled() {
    try {
        return window.localStorage.getItem(STORAGE_KEYS.competitionEnabled) === "true";
    } catch (error) {
        return false;
    }
}

function loadCompetitionWins() {
    try {
        return Number(window.localStorage.getItem(STORAGE_KEYS.competitionWins) || 0);
    } catch (error) {
        return 0;
    }
}

function saveProfile() {
    try {
        window.localStorage.setItem(STORAGE_KEYS.coins, String(state.coins));
        window.localStorage.setItem(STORAGE_KEYS.selectedMap, state.selectedMap);
        window.localStorage.setItem(STORAGE_KEYS.username, state.username);
        window.localStorage.setItem(STORAGE_KEYS.equippedDeck, state.equippedDeck);
        window.localStorage.setItem(STORAGE_KEYS.ownedDecks, JSON.stringify(state.ownedDecks));
        window.localStorage.setItem(STORAGE_KEYS.equippedScooter, state.equippedScooter);
        window.localStorage.setItem(STORAGE_KEYS.ownedScooters, JSON.stringify(state.ownedScooters));
        window.localStorage.setItem(STORAGE_KEYS.equippedBike, state.equippedBike);
        window.localStorage.setItem(STORAGE_KEYS.ownedBikes, JSON.stringify(state.ownedBikes));
        window.localStorage.setItem(STORAGE_KEYS.equippedRideType, state.equippedRideType);
        window.localStorage.setItem(STORAGE_KEYS.gameMode, state.gameMode);
        window.localStorage.setItem(STORAGE_KEYS.competitionEnabled, state.competition.enabled ? "true" : "false");
        window.localStorage.setItem(STORAGE_KEYS.competitionWins, String(state.competition.wins));
    } catch (error) {
        return;
    }
}

function hasUsername() {
    return Boolean(state.username);
}

function isStandaloneApp() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isIOSDevice() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isAndroidDevice() {
    return /android/i.test(window.navigator.userAgent);
}

function isSafariBrowser() {
    const userAgent = window.navigator.userAgent;
    return /safari/i.test(userAgent) && !/chrome|crios|android|edg|opr/i.test(userAgent);
}

function isSamsungInternetBrowser() {
    return /samsungbrowser/i.test(window.navigator.userAgent);
}

function isFirefoxBrowser() {
    return /firefox|fxios/i.test(window.navigator.userAgent);
}

function isChromiumBrowser() {
    return /chrome|crios|edg/i.test(window.navigator.userAgent) && !isSamsungInternetBrowser();
}

function isPhoneDevice() {
    return isIOSDevice() || isAndroidDevice() || detectMobileControls();
}

function getInstallButtonLabel() {
    if (isStandaloneApp()) {
        return "Installed";
    }
    if (isIOSDevice()) {
        return "Add To Home Screen";
    }
    if (isAndroidDevice()) {
        return deferredInstallPrompt ? "Install On Phone" : "Phone Install Help";
    }
    return "Install Game";
}

function getInstallStatusText() {
    if (isStandaloneApp()) {
        return "Installed. You can launch the game offline from your device like an app.";
    }
    if (isAndroidDevice() && deferredInstallPrompt) {
        return "Ready to install on Android. Tap Install On Phone to save it as an app for offline play.";
    }
    if (deferredInstallPrompt) {
        return "Ready to install. Use Install Game to download it for offline play.";
    }
    if (isIOSDevice()) {
        return isSafariBrowser()
            ? "On iPhone or iPad Safari, tap Share and then Add to Home Screen to install the game as an app."
            : "On iPhone or iPad, open this site in Safari to use Add to Home Screen. Some iOS browsers cannot install PWAs directly.";
    }
    if (isAndroidDevice()) {
        if (isSamsungInternetBrowser()) {
            return deferredInstallPrompt
                ? "Ready to install in Samsung Internet. Tap Install On Phone, or use the browser menu and choose Add page to or Install apps."
                : "In Samsung Internet, use the browser menu and choose Add page to or Install apps to put the game on your phone.";
        }
        if (isFirefoxBrowser()) {
            return "Firefox on Android may only offer Add to Home Screen instead of a full install prompt, depending on version.";
        }
        if (isChromiumBrowser()) {
            return "On Android Chrome or Edge, use Install On Phone or open the browser menu and choose Install App or Add to Home Screen.";
        }
        return "On Android, use the browser menu and choose Install App or Add to Home Screen when your browser supports it.";
    }
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        return "Offline cache is active. Install Game will appear when your browser allows app installation.";
    }
    return "This build supports offline caching. Install Game appears when your browser exposes the install prompt.";
}

function getInstallHintText() {
    if (isStandaloneApp()) {
        return "The game is already installed and should open like a full-screen app on your phone.";
    }
    if (isIOSDevice()) {
        return isSafariBrowser()
            ? "iPhone or iPad Safari: Share button -> Add to Home Screen."
            : "iPhone or iPad: open the site in Safari, then use Share -> Add to Home Screen.";
    }
    if (isAndroidDevice()) {
        if (isSamsungInternetBrowser()) {
            return deferredInstallPrompt
                ? "Samsung Internet: tap Install On Phone or use Menu -> Add page to -> Home screen."
                : "Samsung Internet: Menu -> Add page to -> Home screen, or use Install apps when available.";
        }
        if (isFirefoxBrowser()) {
            return "Firefox Android: open the browser menu and use Add to Home Screen if no install prompt appears.";
        }
        return deferredInstallPrompt
            ? "Android Chrome or Edge: tap Install On Phone, accept the prompt, then launch it from your home screen."
            : "Android: open the browser menu and choose Install App or Add to Home Screen if no prompt appears.";
    }
    if (isPhoneDevice()) {
        return "Phone install depends on browser support. Use Install App or Add to Home Screen when your browser exposes it.";
    }
    return "Desktop and phone installs both work when the browser exposes the install prompt.";
}

function getUsernameStatusText() {
    return hasUsername()
        ? `Playing as ${state.username}`
    : "A rider name will be created automatically when you start.";
}

function commitUsername(value) {
    const username = sanitizeUsername(value);
    state.username = username;
    if (usernameInput && usernameInput.value !== username) {
        usernameInput.value = username;
    }
    saveProfile();
    if (isVersusMode() && onlineState.connected) {
        broadcastLocalSnapshot(true);
    }
}

function ensureUsername() {
    if (hasUsername()) {
        return true;
    }
    commitUsername(createDefaultUsername());
    state.lastScoreEvent = `Joined as ${state.username}.`;
    updateOnlineStatus(`Playing as ${state.username}.`);
    renderMenu();
    return true;
}

function isVersusMode() {
    return state.gameMode === "online";
}

function resetVersusSession() {
    state.versus = createVersusSession();
}

function getActivePlayerLabel() {
    return isVersusMode() ? "Online" : "Solo";
}

function getModeDescriptionText() {
    return isVersusMode()
        ? state.competition.enabled
            ? "Online multiplayer competition mode: host a room, start the challenge, and race every rider on the same scoreboard."
            : "Online multiplayer mode: host a room or join one with a code, then ride together live in the same map."
        : state.competition.enabled
            ? "Solo AI competition mode: a rival bot scores live beside you, and every new level makes the next round harder to win."
            : "Solo session with one continuous score and normal restart flow.";
}

function getModeScoreText() {
    if (!isVersusMode()) {
        return state.competition.enabled
            ? `Solo competition is active. Rival ${getSoloCompetitionBotPreview().name} waits at Level ${getSoloCompetitionBotPreview().level}.`
            : "Single-player mode is active.";
    }
    return state.competition.enabled
        ? `Competition is ${onlineState.competition.enabled ? "armed" : "waiting"}. ${onlineState.status}`
        : onlineState.status;
}

function getCompetitionRemainingTime() {
    if (!state.competition.enabled || state.mode !== "playing" || state.competition.finished || state.competition.startedAt <= 0) {
        return state.competition.duration;
    }
    return clamp(state.competition.duration - (state.time - state.competition.startedAt), 0, state.competition.duration);
}

function getSoloCompetitionLevel(wins = state.competition.wins) {
    return Math.max(1, 1 + Math.floor(Math.max(0, wins) / 2));
}

function getSoloCompetitionBotPreview(level = getSoloCompetitionLevel(), mapId = state.selectedMap) {
    const safeLevel = Math.max(1, level);
    const bestSeed = Math.max(900, state.best || 0);
    const baseTarget = Math.max(1500, Math.round(bestSeed * 0.76));
    const levelBonus = (safeLevel - 1) * 240;
    const curveBonus = Math.round(Math.pow(safeLevel - 1, 1.18) * 85);
    const mapBonus = mapId === "megabowl" ? 180 : mapId === "bowl" ? 140 : mapId === "skatepark" ? 110 : 80;
    return {
        name: SOLO_COMPETITION_BOT_NAMES[(safeLevel - 1) % SOLO_COMPETITION_BOT_NAMES.length],
        level: safeLevel,
        targetScore: baseTarget + levelBonus + curveBonus + mapBonus,
    };
}

function getSoloCompetitionTarget() {
    if (state.competition.bot.active) {
        return state.competition.bot.targetScore;
    }
    return getSoloCompetitionBotPreview().targetScore;
}

function getLocalCompetitionPeerId() {
    return isVersusMode() ? (onlineState.peerId || "local") : "local";
}

function getCompetitionRank(wins) {
    if (wins >= 30) {
        return {
            key: "legend",
            badge: "Legend",
            name: "Legend Tier",
            nextAt: null,
        };
    }
    if (wins >= 15) {
        return {
            key: "elite",
            badge: "Elite",
            name: "Elite Tier",
            nextAt: 30,
        };
    }
    if (wins >= 8) {
        return {
            key: "pro",
            badge: "Pro",
            name: "Pro Tier",
            nextAt: 15,
        };
    }
    if (wins >= 3) {
        return {
            key: "contender",
            badge: "Contender",
            name: "Contender Tier",
            nextAt: 8,
        };
    }
    return {
        key: "rookie",
        badge: "Rookie",
        name: "Rookie Tier",
        nextAt: 3,
    };
}

function getCompetitionRankProgressText() {
    const rank = getCompetitionRank(state.competition.wins);
    if (!rank.nextAt) {
        return `${formatScore(state.competition.wins)} wins • Top rank reached.`;
    }
    const winsLeft = Math.max(0, rank.nextAt - state.competition.wins);
    const nextRank = getCompetitionRank(rank.nextAt);
    return `${formatScore(state.competition.wins)} wins • Win ${formatScore(winsLeft)} more round${winsLeft === 1 ? "" : "s"} to reach ${nextRank.badge}.`;
}

function resetCompetitionRoundState() {
    state.competition.finished = false;
    state.competition.finalScore = 0;
    state.competition.lastBonusCoins = 0;
    state.competition.resolvedRound = false;
    state.competition.bot.active = false;
    state.competition.bot.score = 0;
    state.competition.bot.x = 0;
    state.competition.bot.y = BOARD_RIDE_HEIGHT;
    state.competition.bot.z = 0;
    state.competition.bot.heading = 0;
    state.competition.bot.surfaceAngle = 0;
    removeSoloCompetitionBotAvatar();
}

function startSoloCompetitionBotRound() {
    const preview = getSoloCompetitionBotPreview();
    state.competition.bot.active = true;
    state.competition.bot.name = preview.name;
    state.competition.bot.level = preview.level;
    state.competition.bot.score = 0;
    state.competition.bot.targetScore = preview.targetScore;
}

function removeSoloCompetitionBotAvatar() {
    removeRemotePlayer("solo-bot");
    onlineState.competition.standings.delete("solo-bot");
}

function syncSoloCompetitionBotAvatar() {
    const bot = state.competition.bot;
    if (!bot.active || isVersusMode()) {
        removeSoloCompetitionBotAvatar();
        return;
    }

    const rideType = state.equippedRideType;
    const surface = getSurfaceInfo(bot.x, bot.z, bot.y - BOARD_RIDE_HEIGHT) || getSurfaceInfo(bot.x, bot.z);
    const botPhase = Math.sin(state.time * (2.4 + bot.level * 0.06) + bot.level * 0.9);
    const grinding = isBowlMap() && botPhase < -0.88;
    const airborne = !grinding && botPhase > 0.84;
    const trickAmount = airborne ? clamp((botPhase - 0.84) / 0.16, 0, 1) : 0;
    const baseY = (surface ? surface.y : bot.y - BOARD_RIDE_HEIGHT) + BOARD_RIDE_HEIGHT;
    const bodyLean = clamp((state.player.z - bot.z) * -0.02 + Math.sin(state.time * 0.8 + bot.level) * 0.08, -0.35, 0.35);

    applyRemoteSnapshot("solo-bot", {
        username: `${bot.name} AI`,
        score: Math.round(bot.score || 0),
        x: bot.x,
        y: baseY + (airborne ? 0.95 + trickAmount * 0.6 : 0),
        z: bot.z,
        heading: bot.heading,
        surfaceAngle: bot.surfaceAngle,
        speed: 26 + bot.level * 1.6,
        crouch: airborne ? 0.28 : 0.08 + Math.max(0, bodyLean) * 0.4,
        airborne,
        grinding,
        carryingBoard: false,
        activeGrindTrick: grinding ? getDefaultGrindNameForRide(rideType, state.selectedMap) : "",
        bodyLean,
        trickFlip: rideType === "board" && airborne ? Math.sin(state.time * 8.2) * 0.9 * trickAmount : rideType === "bike" && airborne ? -0.35 * trickAmount : 0,
        trickSpin: airborne ? Math.sin(state.time * 3.8 + bot.level) * 1.2 * trickAmount : 0,
        trickRoll: airborne ? Math.cos(state.time * 5.6 + bot.level) * 0.55 * trickAmount : grinding ? 0.1 : 0,
        bodySpin: 0,
        scooterBarSpin: rideType === "scooter" && airborne ? trickAmount * 2.6 : 0,
        scooterTailwhip: rideType === "scooter" && airborne ? trickAmount * 3.2 : 0,
        rideType,
        equippedDeck: state.equippedDeck,
        equippedScooter: state.equippedScooter,
        equippedBike: state.equippedBike,
        competitionEnabled: true,
    });
}

function updateSoloCompetitionBot(delta) {
    if (isVersusMode() || !state.competition.enabled || state.competition.finished || state.mode !== "playing" || state.competition.startedAt <= 0) {
        removeSoloCompetitionBotAvatar();
        return;
    }

    const bot = state.competition.bot;
    if (!bot.active) {
        return;
    }

    const elapsed = Math.max(0, state.time - state.competition.startedAt);
    const progress = clamp(elapsed / state.competition.duration, 0, 1);
    const expectedScore = bot.targetScore * (progress * 0.62 + Math.pow(progress, 1.75) * 0.38);
    const basePace = bot.targetScore / state.competition.duration;
    const surge = 0.88 + bot.level * 0.025 + (Math.sin(state.time * (1.4 + bot.level * 0.035) + bot.level) + 1) * 0.12;
    const catchup = Math.max(0, expectedScore - bot.score) * 0.7;
    const pressure = Math.max(0, state.score - bot.score) * 0.032;
    bot.score = Math.min(bot.targetScore, bot.score + (basePace * surge + catchup + pressure) * delta);

    const leadDistance = clamp((bot.score - state.score) / 130, -18, 24);
    let targetX;
    let targetZ;
    let surface;

    if (isOpenWorldMap()) {
        const bounds = getActiveWorldBounds();
        targetX = clamp(state.player.x + leadDistance + Math.sin(state.time * 0.34 + bot.level) * 4.2, -bounds.halfX + 8, bounds.halfX - 8);
        targetZ = clamp(state.player.z + Math.cos(state.time * 0.82 + bot.level) * 10.5, -bounds.halfZ + 8, bounds.halfZ - 8);
        surface = getSurfaceInfo(targetX, targetZ, state.player.y - getPlayerRideHeight(state.player)) || getSurfaceInfo(targetX, state.player.z, state.player.y - getPlayerRideHeight(state.player));
        if (!surface) {
            targetZ = state.player.z;
        }
    } else {
        targetX = state.player.x + leadDistance;
        targetZ = Math.sin(state.time * 0.9 + bot.level) * (TRACK_HALF - 2.5);
        surface = getSurfaceInfo(targetX, targetZ, bot.y - BOARD_RIDE_HEIGHT) || getSurfaceInfo(targetX, targetZ);
    }

    bot.x = lerp(bot.x, targetX, clamp(delta * 2.8, 0, 1));
    bot.z = lerp(bot.z, targetZ, clamp(delta * 2.4, 0, 1));

    surface = getSurfaceInfo(bot.x, bot.z, bot.y - BOARD_RIDE_HEIGHT) || surface || getSurfaceInfo(bot.x, bot.z);
    if (surface) {
        bot.y = surface.y + BOARD_RIDE_HEIGHT;
        const headingTarget = isOpenWorldMap()
            ? state.player.heading + Math.sin(state.time * 0.42 + bot.level) * 0.18
            : 0;
        bot.heading = normalizedAngle(lerp(bot.heading, headingTarget, clamp(delta * 4.2, 0, 1)));
        const surfaceAngleTarget = isOpenWorldMap()
            ? getSurfaceTravelAngle({ heading: bot.heading }, surface)
            : surface.angle || 0;
        bot.surfaceAngle = lerp(bot.surfaceAngle, surfaceAngleTarget, clamp(delta * 3.6, 0, 1));
    }

    syncSoloCompetitionBotAvatar();
}

function buildCompetitionStandings() {
    const standings = [];
    const localName = state.username || "You";
    standings.push({
        id: onlineState.peerId || "local",
        username: localName,
        score: state.score,
        isLocal: true,
    });

    if (isVersusMode()) {
        onlineState.competition.standings.forEach((entry, peerId) => {
            if (peerId === onlineState.peerId) {
                return;
            }
            standings.push({
                id: peerId,
                username: entry.username || `Rider ${peerId.slice(-4).toUpperCase()}`,
                score: entry.score || 0,
                isLocal: false,
            });
        });
    } else if (state.competition.enabled) {
        const previewBot = state.competition.bot.active
            ? state.competition.bot
            : getSoloCompetitionBotPreview();
        standings.push({
            id: "solo-bot",
            username: `${previewBot.name} AI`,
            score: Math.round(previewBot.score || 0),
            isLocal: false,
            isBot: true,
            level: previewBot.level,
        });
    }

    standings.sort((left, right) => right.score - left.score);
    return standings.slice(0, 6);
}

function syncCompetitionStandings() {
    state.competition.standings = buildCompetitionStandings();
}

function updateCompetitionStatusText() {
    if (!state.competition.enabled) {
        return "Turn competition on to race a live scoreboard instead of free skating.";
    }
    if (isVersusMode()) {
        if (!onlineState.connected) {
            return "Host or join a room, then start a 90 second score race.";
        }
        if (state.mode === "playing") {
            return `${Math.ceil(getCompetitionRemainingTime())} seconds left. Highest score wins the room.`;
        }
        if (state.competition.resolvedRound && state.competition.lastBonusCoins > 0) {
            return `Round won. Bonus ${formatScore(state.competition.lastBonusCoins)} coins added. Total wins ${formatScore(state.competition.wins)}.`;
        }
        return onlineState.competition.finished
            ? "Challenge finished. Start another round when the room is ready."
            : "Competition ready. The host starts the countdown for everyone.";
    }
    if (state.mode === "playing") {
        return `${Math.ceil(getCompetitionRemainingTime())} seconds left to beat ${state.competition.bot.name} Level ${state.competition.bot.level} at ${formatScore(getSoloCompetitionTarget())}.`;
    }
    if (state.competition.finished) {
        if (state.competition.lastBonusCoins > 0) {
            return `Challenge cleared. Bonus ${formatScore(state.competition.lastBonusCoins)} coins awarded. Total wins ${formatScore(state.competition.wins)}.`;
        }
        return state.competition.finalScore >= getSoloCompetitionTarget()
            ? `Challenge cleared with ${formatScore(state.competition.finalScore)}.`
            : `Challenge missed. ${state.competition.bot.name} held ${formatScore(getSoloCompetitionTarget())} and you finished on ${formatScore(state.competition.finalScore)}.`;
    }
    return `Solo AI rival ${getSoloCompetitionBotPreview().name} starts at Level ${getSoloCompetitionBotPreview().level}. Beat ${formatScore(getSoloCompetitionTarget())} in 90 seconds.`;
}

function renderCompetitionBoard() {
    if (!competitionBoard) {
        return;
    }
    syncCompetitionStandings();
    const standings = state.competition.standings.length > 0
        ? state.competition.standings
        : [{ id: "local", username: state.username || "You", score: 0, isLocal: true }];
    const rows = standings.map((entry, index) => {
        const row = document.createElement("div");
        row.className = `competition-entry${entry.isLocal ? " is-local" : ""}`;

        const left = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = `${index + 1}. ${entry.username}`;
        const detail = document.createElement("span");
        detail.textContent = entry.isLocal
            ? `You • ${getCompetitionRank(state.competition.wins).badge} • ${formatScore(state.competition.wins)} wins`
            : entry.isBot
                ? `AI rival • Level ${formatScore(entry.level || 1)}`
            : "Room rider";
        left.append(name, detail);

        const score = document.createElement("strong");
        score.textContent = formatScore(entry.score || 0);

        row.append(left, score);
        return row;
    });
    replaceElementChildren(competitionBoard, rows);
}

function setCompetitionEnabled(enabled) {
    if (isOnlineGuest()) {
        updateOnlineStatus("Only the host can change the competition rules for an online room.");
        renderMenu();
        return;
    }
    state.competition.enabled = Boolean(enabled);
    resetCompetitionRoundState();
    state.competition.startedAt = 0;
    onlineState.competition.enabled = state.competition.enabled;
    onlineState.competition.finished = false;
    onlineState.competition.startedAt = 0;
    onlineState.competition.duration = COMPETITION_DURATION;
    onlineState.competition.standings = new Map();
    if (isOnlineHost()) {
        broadcastToGuests({
            type: "competition-sync",
            enabled: state.competition.enabled,
            startedAt: 0,
            finished: false,
            peerId: onlineState.peerId,
            username: state.username,
            score: 0,
        });
    }
    saveProfile();
    renderMenu();
}

function applyCompetitionResult(result) {
    if (!result || state.competition.resolvedRound) {
        return;
    }

    state.competition.finished = true;
    state.competition.resolvedRound = true;
    onlineState.competition.finished = true;
    state.competition.finalScore = state.score;

    const localPeerId = getLocalCompetitionPeerId();
    const localWon = result.winnerPeerId === localPeerId;
    state.competition.lastBonusCoins = 0;

    if (localWon) {
        state.competition.wins += 1;
        state.competition.lastBonusCoins = result.bonusCoins || 0;
        if (state.competition.lastBonusCoins > 0) {
            state.coins += state.competition.lastBonusCoins;
        }
        saveProfile();
    }

    state.lastScoreEvent = localWon
        ? `You won the round and earned ${formatScore(state.competition.lastBonusCoins)} bonus coins.`
        : `${result.winnerUsername} won with ${formatScore(result.winnerScore || 0)}.`;
}

function updateCompetitionScore(force = false) {
    if (!state.competition.enabled) {
        return;
    }
    onlineState.competition.standings.set(onlineState.peerId || "local", {
        username: state.username || "You",
        score: state.score,
    });
    if (isVersusMode() && onlineState.connected) {
        const payload = {
            type: "competition-sync",
            enabled: true,
            startedAt: onlineState.competition.startedAt,
            finished: onlineState.competition.finished,
            peerId: onlineState.peerId,
            username: state.username,
            score: state.score,
        };
        if (isOnlineHost()) {
            broadcastToGuests(payload);
        } else if (force || (onlineState.hostConnection && onlineState.hostConnection.open)) {
            safeSend(onlineState.hostConnection, payload);
        }
    }
}

function finishCompetitionRound() {
    if (!state.competition.enabled || state.competition.finished) {
        return;
    }
    state.competition.finished = true;
    state.competition.finalScore = state.score;
    onlineState.competition.finished = true;
    state.lastRunCoins = Math.max(0, Math.round(state.score / 180));
    if (state.lastRunCoins > 0) {
        state.coins += state.lastRunCoins;
        saveProfile();
    }
    updateCompetitionScore(true);

    if (isVersusMode()) {
        const standings = buildCompetitionStandings();
        const winner = standings[0];
        if (isOnlineHost() && winner) {
            const result = {
                type: "competition-result",
                winnerPeerId: winner.id,
                winnerUsername: winner.username,
                winnerScore: winner.score,
                bonusCoins: COMPETITION_WIN_BONUS,
            };
            broadcastToGuests(result);
            applyCompetitionResult(result);
        } else if (!isOnlineHost()) {
            state.lastScoreEvent = "Round finished. Waiting for the host result.";
        } else {
            state.lastScoreEvent = "Competition finished.";
        }
        state.mode = "menu";
        state.menuVisible = true;
        state.activeMenuPanel = "home";
        renderMenu();
        return;
    }

    const botScore = state.competition.bot.active
        ? Math.round(Math.max(state.competition.bot.score, state.competition.bot.targetScore * 0.96))
        : getSoloCompetitionTarget();
    state.competition.bot.score = botScore;

    if (state.score >= botScore) {
        applyCompetitionResult({
            winnerPeerId: "local",
            winnerUsername: state.username || "You",
            winnerScore: state.score,
            bonusCoins: SOLO_COMPETITION_CLEAR_BONUS,
        });
    } else {
        applyCompetitionResult({
            winnerPeerId: "solo-bot",
            winnerUsername: `${state.competition.bot.name} AI`,
            winnerScore: botScore,
            bonusCoins: 0,
        });
    }
    removeSoloCompetitionBotAvatar();
    state.mode = "menu";
    state.menuVisible = true;
    state.activeMenuPanel = "home";
    renderMenu();
}

function setGameMode(mode) {
    if (state.gameMode === mode) {
        return;
    }

    state.gameMode = mode;
    state.score = 0;
    state.lastRunCoins = 0;
    state.lastScoreEvent = mode === "online" ? "Online session ready" : "Drop in";
    if (state.mode === "paused") {
        state.mode = "menu";
        state.activeRunMap = null;
    }
    if (mode !== "online") {
        leaveOnlineRoom(false);
    }
    saveProfile();
    renderMenu();
}

function sanitizeRoomCode(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 16);
}

function updateOnlineStatus(message) {
    onlineState.status = message;
    if (onlineStatus) {
        onlineStatus.textContent = message;
    }
}

function isOnlineHost() {
    return isVersusMode() && onlineState.role === "host" && onlineState.connected;
}

function isOnlineGuest() {
    return isVersusMode() && onlineState.role === "guest" && onlineState.connected;
}

function safeSend(connection, payload) {
    if (!connection || !connection.open) {
        return;
    }
    try {
        connection.send(payload);
    } catch (error) {
        return;
    }
}

function createRemoteLabel(text) {
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = 256;
    labelCanvas.height = 96;
    const context = labelCanvas.getContext("2d");
    context.clearRect(0, 0, labelCanvas.width, labelCanvas.height);
    context.fillStyle = "rgba(10, 16, 28, 0.72)";
    context.fillRect(0, 16, labelCanvas.width, 56);
    context.fillStyle = "#fff7da";
    context.font = "700 28px Arial";
    context.textAlign = "center";
    context.fillText(text, labelCanvas.width / 2, 54);
    const texture = new THREE.CanvasTexture(labelCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
    sprite.scale.set(2.6, 0.9, 1);
    sprite.position.set(0, 3.3, 0);
    return sprite;
}

function createRemoteAvatar(peerId) {
    const color = REMOTE_PLAYER_COLORS[onlineState.remotePlayers.size % REMOTE_PLAYER_COLORS.length];
    const root = new THREE.Group();
    const rider = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({ color, roughness: 0.72 });
    const skin = new THREE.MeshStandardMaterial({ color: "#ddb595", roughness: 0.88 });
    const dark = new THREE.MeshStandardMaterial({ color: "#101825", roughness: 0.82 });

    const torsoMesh = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.92, 0.28), bodyMaterial);
    torsoMesh.position.set(0, 1.25, 0);
    torsoMesh.castShadow = true;
    rider.add(torsoMesh);

    const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.23, 16, 14), skin);
    headMesh.position.set(0, 1.98, 0);
    headMesh.castShadow = true;
    rider.add(headMesh);

    const leftLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.74, 0.16), dark);
    leftLegMesh.position.set(-0.16, 0.55, -0.08);
    leftLegMesh.castShadow = true;
    rider.add(leftLegMesh);

    const rightLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.74, 0.16), dark);
    rightLegMesh.position.set(0.16, 0.55, 0.08);
    rightLegMesh.castShadow = true;
    rider.add(rightLegMesh);

    const leftArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.62, 0.14), dark);
    leftArmMesh.position.set(-0.34, 1.18, 0);
    leftArmMesh.castShadow = true;
    rider.add(leftArmMesh);

    const rightArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.62, 0.14), dark);
    rightArmMesh.position.set(0.34, 1.18, 0);
    rightArmMesh.castShadow = true;
    rider.add(rightArmMesh);

    const boardRide = new THREE.Group();
    const boardDeck = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.08, 0.68), new THREE.MeshStandardMaterial({ color: "#142033", roughness: 0.58 }));
    boardDeck.position.y = 0.02;
    boardDeck.castShadow = true;
    boardRide.add(boardDeck);

    const boardNoseMesh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.03, 0.66), new THREE.MeshStandardMaterial({ color: "#ff7a59", roughness: 0.52 }));
    boardNoseMesh.position.set(-0.92, 0.09, 0);
    boardNoseMesh.rotation.z = 0.3;
    boardNoseMesh.castShadow = true;
    boardRide.add(boardNoseMesh);

    const boardTailMesh = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.03, 0.66), new THREE.MeshStandardMaterial({ color: "#2d8f85", roughness: 0.52 }));
    boardTailMesh.position.set(0.94, 0.08, 0);
    boardTailMesh.rotation.z = -0.24;
    boardTailMesh.castShadow = true;
    boardRide.add(boardTailMesh);

    const scooterRide = new THREE.Group();
    const scooterDeckMesh = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.08, 0.36), new THREE.MeshStandardMaterial({ color: "#1a2236", roughness: 0.58 }));
    scooterDeckMesh.position.set(0.32, 0, 0);
    scooterDeckMesh.castShadow = true;
    scooterRide.add(scooterDeckMesh);

    const scooterClampMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.14), new THREE.MeshStandardMaterial({ color: "#ffd166", roughness: 0.36, metalness: 0.7 }));
    scooterClampMesh.position.set(-0.5, 1.42, 0);
    scooterClampMesh.castShadow = true;
    scooterRide.add(scooterClampMesh);

    const scooterStemMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 1.46, 14), new THREE.MeshStandardMaterial({ color: "#dce5ef", roughness: 0.3, metalness: 0.8 }));
    scooterStemMesh.position.set(-0.5, 0.76, 0);
    scooterStemMesh.castShadow = true;
    scooterRide.add(scooterStemMesh);

    const scooterBarMesh = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.06, 0.06), new THREE.MeshStandardMaterial({ color: "#8bd3dd", roughness: 0.44 }));
    scooterBarMesh.position.set(-0.5, 1.54, 0);
    scooterBarMesh.castShadow = true;
    scooterRide.add(scooterBarMesh);

    const scooterBarPostMesh = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.48, 0.05), new THREE.MeshStandardMaterial({ color: "#dce5ef", roughness: 0.3, metalness: 0.8 }));
    scooterBarPostMesh.position.set(-0.5, 1.26, 0);
    scooterBarPostMesh.castShadow = true;
    scooterRide.add(scooterBarPostMesh);

    const bikeRide = new THREE.Group();
    const bikeFrame = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.08, 0.08), new THREE.MeshStandardMaterial({ color: "#2957d3", roughness: 0.5 }));
    bikeFrame.rotation.z = -0.18;
    bikeFrame.position.set(-0.04, 0.06, 0);
    bikeFrame.castShadow = true;
    bikeRide.add(bikeFrame);
    const bikeFrontFork = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.7, 0.08), new THREE.MeshStandardMaterial({ color: "#f4f7fb", roughness: 0.32, metalness: 0.64 }));
    bikeFrontFork.position.set(0.54, 0.12, 0);
    bikeFrontFork.castShadow = true;
    bikeRide.add(bikeFrontFork);

    const label = createRemoteLabel(`Rider ${peerId.slice(-4).toUpperCase()}`);
    root.add(boardRide);
    root.add(scooterRide);
    root.add(bikeRide);
    root.add(rider);
    root.add(label);
    world.add(root);

    return {
        root,
        rider,
        torsoMesh,
        headMesh,
        leftLegMesh,
        rightLegMesh,
        leftArmMesh,
        rightArmMesh,
        boardRide,
        boardDeck,
        boardNoseMesh,
        boardTailMesh,
        scooterRide,
        scooterDeckMesh,
        scooterClampMesh,
        scooterBarMesh,
        bikeRide,
        bikeFrame,
        label,
        snapshot: null,
    };
}

function removeRemotePlayer(peerId) {
    const remote = onlineState.remotePlayers.get(peerId);
    if (!remote) {
        return;
    }
    world.remove(remote.root);
    onlineState.remotePlayers.delete(peerId);
    onlineState.snapshots.delete(peerId);
}

function clearRemotePlayers() {
    Array.from(onlineState.remotePlayers.keys()).forEach((peerId) => removeRemotePlayer(peerId));
}

function leaveOnlineRoom(shouldRender = true) {
    if (onlineState.hostConnection) {
        try {
            onlineState.hostConnection.close();
        } catch (error) {
            return;
        }
    }
    onlineState.connections.forEach((connection) => {
        try {
            connection.close();
        } catch (error) {
            return;
        }
    });
    if (onlineState.peer) {
        try {
            onlineState.peer.destroy();
        } catch (error) {
            return;
        }
    }
    clearRemotePlayers();
    onlineState.peer = null;
    onlineState.peerId = "";
    onlineState.role = "offline";
    onlineState.roomCode = "";
    onlineState.hostConnection = null;
    onlineState.connections = new Map();
    onlineState.snapshots = new Map();
    onlineState.connected = false;
    onlineState.lastBroadcastAt = 0;
    onlineState.competition.enabled = state.competition.enabled;
    onlineState.competition.startedAt = 0;
    onlineState.competition.finished = false;
    onlineState.competition.standings = new Map();
    updateOnlineStatus("Switch to online multiplayer to host or join a room.");
    if (shouldRender) {
        renderMenu();
    }
}

function getHostPeerId(roomCode) {
    return `${ONLINE_HOST_PREFIX}${roomCode}`;
}

function buildLocalSnapshot() {
    return {
        username: state.username,
        score: state.score,
        x: state.player.x,
        y: state.player.y,
        z: state.player.z,
        heading: state.player.heading,
        surfaceAngle: state.player.surfaceAngle,
        speed: state.player.speed,
        crouch: state.player.crouch,
        airborne: state.player.airborne,
        grinding: state.player.grinding,
        carryingBoard: state.player.carryingBoard,
        activeGrindTrick: state.player.activeGrindTrick,
        bodyLean: state.player.bodyLean,
        trickFlip: state.player.trickFlip,
        trickSpin: state.player.trickSpin,
        trickRoll: state.player.trickRoll,
        bodySpin: state.player.bodySpin,
        scooterBarSpin: state.player.scooterBarSpin,
        scooterTailwhip: state.player.scooterTailwhip,
        rideType: state.equippedRideType,
        equippedDeck: state.equippedDeck,
        equippedScooter: state.equippedScooter,
        equippedBike: state.equippedBike,
        competitionEnabled: state.competition.enabled,
    };
}

function setRemoteLabel(remote, text) {
    if (!remote || !remote.label) {
        return;
    }
    const labelText = String(text || "Rider").slice(0, 16) || "Rider";
    const canvas = remote.label.material.map.image;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(10, 16, 28, 0.72)";
    context.fillRect(0, 16, canvas.width, 56);
    context.fillStyle = "#fff7da";
    context.font = "700 28px Arial";
    context.textAlign = "center";
    context.fillText(labelText, canvas.width / 2, 54);
    remote.label.material.map.needsUpdate = true;
}

function applyRemoteSnapshot(peerId, snapshot) {
    if (!snapshot || peerId === onlineState.peerId) {
        return;
    }
    let remote = onlineState.remotePlayers.get(peerId);
    if (!remote) {
        remote = createRemoteAvatar(peerId);
        onlineState.remotePlayers.set(peerId, remote);
    }
    remote.snapshot = snapshot;
    setRemoteLabel(remote, snapshot.username || `Rider ${peerId.slice(-4).toUpperCase()}`);
    onlineState.snapshots.set(peerId, snapshot);
    onlineState.competition.standings.set(peerId, {
        username: snapshot.username,
        score: snapshot.score || 0,
    });
}

function updateRemotePlayers(delta) {
    onlineState.remotePlayers.forEach((remote) => {
        if (!remote.snapshot) {
            return;
        }

        const snapshot = remote.snapshot;
        remote.root.position.lerp(new THREE.Vector3(snapshot.x, snapshot.y, snapshot.z), 0.18);
        remote.root.rotation.y = lerp(remote.root.rotation.y, snapshot.heading || 0, 0.18);
        remote.root.rotation.z = lerp(remote.root.rotation.z, snapshot.surfaceAngle || 0, 0.18);

        remote.boardRide.visible = snapshot.rideType === "board";
        remote.scooterRide.visible = snapshot.rideType === "scooter";
        remote.bikeRide.visible = snapshot.rideType === "bike";

        const remoteBoardSkin = SHOP_ITEMS[snapshot.equippedDeck] || SHOP_ITEMS.classic;
        const remoteScooterSkin = SCOOTER_ITEMS[snapshot.equippedScooter] || SCOOTER_ITEMS.streetline;
        const remoteBikeSkin = BIKE_ITEMS[snapshot.equippedBike] || BIKE_ITEMS.parkline;
        remote.boardDeck.material.color.set(remoteBoardSkin.deck);
        remote.boardNoseMesh.material.color.set(remoteBoardSkin.nose);
        remote.boardTailMesh.material.color.set(remoteBoardSkin.tail);
        remote.scooterDeckMesh.material.color.set(remoteScooterSkin.deck);
        remote.scooterClampMesh.material.color.set(remoteScooterSkin.clamp);
        remote.scooterBarMesh.material.color.set(remoteScooterSkin.grips);
        remote.bikeFrame.material.color.set(remoteBikeSkin.frame);

        remote.boardRide.rotation.x = snapshot.trickFlip || 0;
        remote.boardRide.rotation.y = snapshot.trickSpin || 0;
        remote.boardRide.rotation.z = snapshot.trickRoll || 0;
        remote.scooterRide.rotation.x = snapshot.trickFlip || 0;
        remote.scooterRide.rotation.y = (snapshot.trickSpin || 0) + Math.PI;
        remote.scooterRide.rotation.z = snapshot.trickRoll || 0;
        remote.bikeRide.rotation.x = snapshot.trickFlip || 0;
        remote.bikeRide.rotation.y = snapshot.trickSpin || 0;
        remote.bikeRide.rotation.z = snapshot.trickRoll || 0;

        const remoteCarryingBoard = snapshot.rideType === "board" && !!snapshot.carryingBoard;
        remote.rider.position.y = remoteCarryingBoard
            ? 0.34
            : snapshot.rideType === "bike"
                ? 0.56 - (snapshot.crouch || 0) * 0.18
                : 0.2 - (snapshot.crouch || 0) * 0.35;
        remote.rider.rotation.y = snapshot.bodySpin || 0;
        if (remoteCarryingBoard) {
            remote.rider.rotation.z = (snapshot.bodyLean || 0) * 0.15;
            remote.torsoMesh.rotation.x = 0.12;
            remote.torsoMesh.rotation.z = 0;
            remote.headMesh.position.y = 1.98;
            remote.headMesh.rotation.x = 0;
            remote.leftLegMesh.rotation.x = 0.22;
            remote.rightLegMesh.rotation.x = -0.22;
            remote.leftLegMesh.rotation.z = 0;
            remote.rightLegMesh.rotation.z = 0;
            remote.leftArmMesh.rotation.x = -0.3;
            remote.rightArmMesh.rotation.x = -0.9;
            remote.leftArmMesh.rotation.z = -0.08;
            remote.rightArmMesh.rotation.z = 0.48;
            remote.boardRide.position.set(0.62, 1.04, 0.18);
            remote.boardRide.rotation.set(-0.18, 1.18, Math.PI / 2);
        } else if (snapshot.grinding) {
            const grindProfile = getGrindAnimationProfile(snapshot.rideType, snapshot.activeGrindTrick || getDefaultGrindNameForRide(snapshot.rideType));
            remote.rider.rotation.z = grindProfile.riderLean;
            remote.torsoMesh.rotation.x = grindProfile.torsoX;
            remote.torsoMesh.rotation.z = grindProfile.torsoZ;
            remote.headMesh.position.y = grindProfile.headY || (snapshot.rideType === "bike" ? 1.97 : 1.93);
            remote.headMesh.rotation.x = 0.08;
            remote.leftLegMesh.rotation.x = grindProfile.leftLegX;
            remote.rightLegMesh.rotation.x = grindProfile.rightLegX;
            remote.leftLegMesh.rotation.z = grindProfile.leftLegZ;
            remote.rightLegMesh.rotation.z = grindProfile.rightLegZ;
            remote.leftArmMesh.rotation.x = grindProfile.leftArmX;
            remote.rightArmMesh.rotation.x = grindProfile.rightArmX;
            remote.leftArmMesh.rotation.z = grindProfile.leftArmZ;
            remote.rightArmMesh.rotation.z = grindProfile.rightArmZ;
            if (snapshot.rideType === "board") {
                remote.boardRide.rotation.x = grindProfile.ridePitch;
                remote.boardRide.rotation.y = grindProfile.rideYaw;
                remote.boardRide.rotation.z = grindProfile.rideRoll;
            } else if (snapshot.rideType === "scooter") {
                remote.scooterRide.rotation.x = grindProfile.ridePitch;
                remote.scooterRide.rotation.y = grindProfile.rideYaw;
                remote.scooterRide.rotation.z = grindProfile.rideRoll;
            } else {
                remote.bikeRide.rotation.x = grindProfile.ridePitch;
                remote.bikeRide.rotation.y = grindProfile.rideYaw;
                remote.bikeRide.rotation.z = grindProfile.rideRoll;
            }
        } else {
            remote.rider.rotation.z = snapshot.bodyLean || 0;
            remote.torsoMesh.rotation.x = snapshot.airborne ? -0.18 : 0.02;
            remote.torsoMesh.rotation.z = (snapshot.trickRoll || 0) * 0.06;
            remote.headMesh.position.y = snapshot.airborne ? 1.9 : 1.98;
            remote.headMesh.rotation.x = 0;
            remote.leftLegMesh.rotation.x = snapshot.rideType === "bike" ? -0.84 : snapshot.airborne ? -0.52 : -0.14;
            remote.rightLegMesh.rotation.x = snapshot.rideType === "bike" ? -0.9 : snapshot.airborne ? -0.46 : -0.12;
            remote.leftLegMesh.rotation.z = 0;
            remote.rightLegMesh.rotation.z = 0;
            remote.leftArmMesh.rotation.x = snapshot.rideType === "bike" ? -0.76 : -0.56;
            remote.rightArmMesh.rotation.x = snapshot.rideType === "bike" ? -0.76 : -0.56;
            remote.leftArmMesh.rotation.z = 0;
            remote.rightArmMesh.rotation.z = 0;
        }
        if (!remoteCarryingBoard) {
            remote.boardRide.position.set(0, snapshot.rideType === "board" ? Math.sin(state.time * 8) * 0.02 : 0, 0);
        }
        remote.scooterRide.position.y = snapshot.rideType === "scooter" ? Math.sin(state.time * 8) * 0.02 : 0;
        remote.bikeRide.position.y = snapshot.rideType === "bike" ? Math.sin(state.time * 8) * 0.015 - 0.04 : 0;
        remote.label.position.y = 3.35;
    });
}

function broadcastToGuests(payload, excludedPeerId = "") {
    onlineState.connections.forEach((connection, peerId) => {
        if (peerId === excludedPeerId) {
            return;
        }
        safeSend(connection, payload);
    });
}

function syncMapSelection(mapId) {
    if (!MAP_DEFINITIONS[mapId]) {
        return;
    }
    state.selectedMap = mapId;
    applyMapTheme();
}

function handleOnlinePayload(connection, payload) {
    if (!payload || typeof payload !== "object") {
        return;
    }

    if (payload.type === "sync-state") {
        syncMapSelection(payload.mapId || state.selectedMap);
        (payload.peers || []).forEach(([peerId, snapshot]) => applyRemoteSnapshot(peerId, snapshot));
        state.competition.enabled = Boolean(payload.competitionEnabled);
        onlineState.competition.enabled = Boolean(payload.competitionEnabled);
        onlineState.competition.startedAt = payload.competitionStartedAt || 0;
        onlineState.competition.finished = Boolean(payload.competitionFinished);
        if (payload.playing) {
            startRun(true);
        }
        renderMenu();
        return;
    }

    if (payload.type === "map-sync") {
        syncMapSelection(payload.mapId);
        saveProfile();
        renderMenu();
        return;
    }

    if (payload.type === "start-run") {
        syncMapSelection(payload.mapId || state.selectedMap);
        state.competition.enabled = Boolean(payload.competitionEnabled);
        onlineState.competition.enabled = Boolean(payload.competitionEnabled);
        onlineState.competition.startedAt = payload.competitionStartedAt || 0;
        onlineState.competition.finished = false;
        startRun(true);
        return;
    }

    if (payload.type === "snapshot") {
        if (!isOnlineHost()) {
            return;
        }
        applyRemoteSnapshot(connection.peer, payload.snapshot);
        broadcastToGuests({ type: "peer-snapshot", peerId: connection.peer, snapshot: payload.snapshot }, connection.peer);
        return;
    }

    if (payload.type === "peer-snapshot") {
        applyRemoteSnapshot(payload.peerId, payload.snapshot);
        return;
    }

    if (payload.type === "peer-left") {
        removeRemotePlayer(payload.peerId);
        onlineState.competition.standings.delete(payload.peerId);
        renderCompetitionBoard();
        return;
    }

    if (payload.type === "competition-sync") {
        state.competition.enabled = Boolean(payload.enabled);
        onlineState.competition.enabled = Boolean(payload.enabled);
        onlineState.competition.startedAt = payload.startedAt || 0;
        onlineState.competition.finished = Boolean(payload.finished);
        if (payload.peerId) {
            onlineState.competition.standings.set(payload.peerId, {
                username: payload.username || `Rider ${payload.peerId.slice(-4).toUpperCase()}`,
                score: payload.score || 0,
            });
        }
        if (isOnlineHost() && connection && connection.peer && payload.peerId === connection.peer) {
            broadcastToGuests(payload, connection.peer);
        }
        renderMenu();
        return;
    }

    if (payload.type === "competition-result") {
        applyCompetitionResult(payload);
        state.mode = "menu";
        state.menuVisible = true;
        state.activeMenuPanel = "home";
        renderMenu();
        return;
    }
}

function attachConnectionHandlers(connection, isHostSide) {
    connection.on("data", (payload) => handleOnlinePayload(connection, payload));
    connection.on("close", () => {
        if (isHostSide) {
            onlineState.connections.delete(connection.peer);
            removeRemotePlayer(connection.peer);
            broadcastToGuests({ type: "peer-left", peerId: connection.peer }, connection.peer);
            updateOnlineStatus(`Hosting room ${onlineState.roomCode}. Riders connected: ${onlineState.connections.size + 1}.`);
        } else {
            clearRemotePlayers();
            onlineState.connected = false;
            onlineState.role = "offline";
            onlineState.hostConnection = null;
            updateOnlineStatus("Disconnected from room. Host a room or join again.");
        }
        renderMenu();
    });
}

async function hostOnlineRoom() {
    if (!ensureUsername()) {
        return;
    }
    const initialCode = sanitizeRoomCode(roomCodeInput.value) || Math.random().toString(36).slice(2, 8);
    roomCodeInput.value = initialCode;

    let PeerConstructor;
    updateOnlineStatus("Loading multiplayer services...");
    renderMenu();
    try {
        PeerConstructor = await loadPeerLibrary();
    } catch (error) {
        updateOnlineStatus("Could not load multiplayer. Check your connection and try again.");
        renderMenu();
        return;
    }

    leaveOnlineRoom(false);
    onlineState.role = "host";
    onlineState.roomCode = initialCode;
    updateOnlineStatus(`Starting room ${initialCode}...`);
    const peer = new PeerConstructor(getHostPeerId(initialCode), createPeerOptions());
    onlineState.peer = peer;

    peer.on("open", (peerId) => {
        onlineState.peerId = peerId;
        onlineState.connected = true;
        updateOnlineStatus(`Hosting room ${initialCode}. Riders connected: 1.`);
        renderMenu();
    });

    peer.on("connection", (connection) => {
        connection.on("open", () => {
            onlineState.connections.set(connection.peer, connection);
            attachConnectionHandlers(connection, true);
            safeSend(connection, {
                type: "sync-state",
                mapId: state.selectedMap,
                playing: state.mode === "playing",
                peers: Array.from(onlineState.snapshots.entries()),
                competitionEnabled: state.competition.enabled,
                competitionStartedAt: onlineState.competition.startedAt,
                competitionFinished: onlineState.competition.finished,
            });
            updateOnlineStatus(`Hosting room ${initialCode}. Riders connected: ${onlineState.connections.size + 1}.`);
            renderMenu();
        });
    });

    peer.on("error", (error) => {
        updateOnlineStatus(`Host failed: ${getPeerErrorText(error, "unknown error")}.`);
        leaveOnlineRoom(false);
        renderMenu();
    });
}

async function joinOnlineRoom() {
    if (!ensureUsername()) {
        return;
    }
    const roomCode = sanitizeRoomCode(roomCodeInput.value);
    if (!roomCode) {
        updateOnlineStatus("Enter a room code first.");
        renderMenu();
        return;
    }

    let PeerConstructor;
    updateOnlineStatus("Loading multiplayer services...");
    renderMenu();
    try {
        PeerConstructor = await loadPeerLibrary();
    } catch (error) {
        updateOnlineStatus("Could not load multiplayer. Check your connection and try again.");
        renderMenu();
        return;
    }

    leaveOnlineRoom(false);
    onlineState.role = "guest";
    onlineState.roomCode = roomCode;
    updateOnlineStatus(`Joining room ${roomCode}...`);
    const peer = new PeerConstructor(undefined, createPeerOptions());
    onlineState.peer = peer;

    peer.on("open", (peerId) => {
        onlineState.peerId = peerId;
        const connection = peer.connect(getHostPeerId(roomCode), { reliable: true });
        onlineState.hostConnection = connection;
        connection.on("open", () => {
            onlineState.connected = true;
            attachConnectionHandlers(connection, false);
            updateOnlineStatus(`Connected to room ${roomCode}. Waiting for host to start.`);
            renderMenu();
        });
        connection.on("error", (error) => {
            updateOnlineStatus(`Join failed: ${getPeerErrorText(error, "unknown error")}.`);
            leaveOnlineRoom(false);
            renderMenu();
        });
    });

    peer.on("error", (error) => {
        updateOnlineStatus(`Peer setup failed: ${getPeerErrorText(error, "unknown error")}.`);
        leaveOnlineRoom(false);
        renderMenu();
    });
}

function broadcastLocalSnapshot(force = false) {
    if (!isVersusMode() || !onlineState.connected) {
        return;
    }
    if (!force && state.time - onlineState.lastBroadcastAt < ONLINE_SYNC_INTERVAL) {
        return;
    }
    onlineState.lastBroadcastAt = state.time;
    const snapshot = buildLocalSnapshot();
    onlineState.snapshots.set(onlineState.peerId, snapshot);

    if (isOnlineHost()) {
        broadcastToGuests({ type: "peer-snapshot", peerId: onlineState.peerId, snapshot });
        return;
    }

    safeSend(onlineState.hostConnection, { type: "snapshot", snapshot });
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function lerp(start, end, amount) {
    return start + (end - start) * amount;
}

function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}

function isOpenWorldMap(mapId = state.selectedMap) {
    return mapId === "city" || mapId === "skatepark" || mapId === "bowl" || mapId === "megabowl";
}

function isBowlMap(mapId = state.selectedMap) {
    return mapId === "bowl" || mapId === "megabowl";
}

function getActiveWorldBounds(mapId = state.selectedMap) {
    if (mapId === "megabowl") {
        return { halfX: MEGA_BOWL_HALF_X, halfZ: MEGA_BOWL_HALF_Z };
    }
    if (mapId === "bowl") {
        return { halfX: BOWL_HALF_X, halfZ: BOWL_HALF_Z };
    }
    if (mapId === "skatepark") {
        return { halfX: SKATEPARK_HALF_X, halfZ: SKATEPARK_HALF_Z };
    }
    return { halfX: CITY_HALF_X, halfZ: CITY_HALF_Z };
}

function getActiveTrickLibrary() {
    let library = BOARD_TRICK_LIBRARY;
    if (state.equippedRideType === "scooter") {
        library = SCOOTER_TRICK_LIBRARY;
    } else if (state.equippedRideType === "bike") {
        library = BIKE_TRICK_LIBRARY;
    }

    if (!isBowlMap()) {
        return library;
    }

    return {
        ...library,
        ...(BOWL_TRICK_LIBRARY[state.equippedRideType] || BOWL_TRICK_LIBRARY.board),
    };
}

function getActiveGrindLibrary() {
    if (isBowlMap()) {
        return BOWL_GRIND_LIBRARY[state.equippedRideType] || BOWL_GRIND_LIBRARY.board;
    }
    return GRIND_TRICK_LIBRARY[state.equippedRideType] || GRIND_TRICK_LIBRARY.board;
}

function getDefaultGrindNameForRide(rideType, mapId = state.selectedMap) {
    if (isBowlMap(mapId)) {
        if (rideType === "scooter") {
            return "Feeble Stall";
        }
        if (rideType === "bike") {
            return "Double Peg Stall";
        }
        return "Coping Slide";
    }
    if (rideType === "scooter") {
        return "Feeble";
    }
    if (rideType === "bike") {
        return "Double Peg";
    }
    return "50-50";
}

function getDefaultGrindName() {
    return getDefaultGrindNameForRide(state.equippedRideType);
}

function getActiveControlLibrary() {
    return state.player.grinding ? getActiveGrindLibrary() : getActiveTrickLibrary();
}

function getActiveTrickHint() {
    if (isBowlMap()) {
        if (state.equippedRideType === "scooter") {
            return "Z Can-Can X No-Foot Air C Toboggan V Buttercup B Seat Grab Air N Briflair F Cash Roll G Invert";
        }
        if (state.equippedRideType === "bike") {
            return "Z Tuck No-Hander X Superman Seat Grab C Lookback Air V Airtime 360 B Table Air N Turndown Air F Flair G One-Hander";
        }
        return "Z Indy Air X Melon Air C Lien Air V Method Air B Japan Air N Madonna F McTwist G Stalefish";
    }
    if (state.equippedRideType === "scooter") {
        return "Z Tailwhip X Heelwhip C Barspin V Double Whip B Whip Rewind N Bri Flip F Flair G Fingerwhip";
    }
    if (state.equippedRideType === "bike") {
        return "Z Barspin X Tailwhip C X-Up V 360 B Tabletop N Turndown F Backflip G No-Hander";
    }
    return "Z Kickflip X Heelflip C Shuvit V 360 Flip B Varial Heel N Impossible F Laser Flip G Body Varial";
}

function getActiveGrindHint() {
    if (isBowlMap()) {
        if (state.equippedRideType === "scooter") {
            return "Grinding: Z Feeble Stall X Smith Stall C Coping Crook V Hurricane Stall B Overcrook Stall N Suski Stall F Icepick Stall G Invert Grind";
        }
        if (state.equippedRideType === "bike") {
            return "Grinding: Z Double Peg Stall X Ice Stall C Tire Tap V Tooth Stall B Smith Stall N Luc-E Stall F Hang Five Stall G Coping Crook";
        }
        return "Grinding: Z Coping Slide X 5-0 Stall C Smith Stall V Disaster B Feeble Stall N Slash Grind F Blunt to Fakie G Oververt";
    }
    if (state.equippedRideType === "scooter") {
        return "Grinding: Z Feeble X Smith C Crooked V Hurricane B Overcrook N Suski F Icepick G Toothpick";
    }
    if (state.equippedRideType === "bike") {
        return "Grinding: Z Double Peg X Crank Arm C Icepick V Toothpick B Smith N Luc-E F Hang Five G Crooked";
    }
    return "Grinding: Z Boardslide X Noseslide C Crooked V Lipslide B Feeble N Smith F Bluntslide G Overcrook";
}

function getActiveControlHint() {
    if (state.player.grinding) {
        return getActiveGrindHint();
    }
    if (state.equippedRideType === "board") {
        if (state.player.carryingBoard) {
            return "Arrow keys walk while carrying. R puts the board down.";
        }
        return `${getActiveTrickHint()} Grounded Z starts a manual. R picks up the board.`;
    }
    return getActiveTrickHint();
}

function getActiveGrindTrickName(player = state.player) {
    return player.activeGrindTrick || getDefaultGrindNameForRide(state.equippedRideType);
}

function getGrindAnimationProfile(rideType, trickName) {
    const rideProfiles = GRIND_ANIMATION_LIBRARY[rideType] || GRIND_ANIMATION_LIBRARY.board;
    return { ...rideProfiles.default, ...(rideProfiles[trickName] || {}) };
}

function queueBaseGrindMove(player) {
    if (player.grindBaseQueued) {
        return;
    }
    player.activeGrindTrick = getDefaultGrindName();
    player.comboMoves.push(player.activeGrindTrick);
    player.grindBaseQueued = true;
}

function leaveGrind(player, launchVelocity = 4) {
    player.grinding = false;
    player.grindRail = null;
    player.grindDirection = 1;
    player.airborne = true;
    player.vy = launchVelocity;
    player.grindBaseQueued = false;
    player.grindTricksThisRail = 0;
    player.activeGrindTrick = "";
}

function enterGrind(player, rail) {
    const travelVelocity = isOpenWorldMap()
        ? player.vx || Math.cos(player.heading || 0) * Math.max(10, player.speed || 0)
        : player.speed;
    const grindDirection = travelVelocity < 0 ? -1 : 1;
    player.grinding = true;
    player.grindRail = rail;
    player.grindDirection = grindDirection;
    player.airborne = false;
    player.y = rail.y + 0.3;
    player.z = rail.z;
    player.vy = 0;
    if (isOpenWorldMap()) {
        player.heading = grindDirection > 0 ? 0 : Math.PI;
    }
    player.grindBaseQueued = false;
    player.grindTricksThisRail = 0;
    player.lastGrindTrickAt = -999;
    resetTrickState(player);
    player.comboPoints += 140;
    player.comboMultiplier = Math.max(player.comboMultiplier, 2);
    queueBaseGrindMove(player);
}

function performGrindTrick(trick) {
    const player = state.player;
    if (state.mode !== "playing" || !player.grinding) {
        return;
    }
    if (state.time - player.lastGrindTrickAt < 0.22 || player.grindTricksThisRail >= 6) {
        return;
    }
    if (player.comboMoves[player.comboMoves.length - 1] === trick.name) {
        return;
    }

    player.lastGrindTrickAt = state.time;
    player.grindTricksThisRail += 1;
    player.activeGrindTrick = trick.name;
    player.comboPoints += trick.points;
    player.comboMoves.push(trick.name);
    player.comboMultiplier = clamp(1 + Math.floor(player.comboMoves.length / 2), 1, 6);
    state.lastScoreEvent = `${trick.name} locked for ${formatScore(trick.points)}`;
    player.trickRollVelocity += trick.rollVelocity || 0;
    player.trickSpinVelocity += trick.spinVelocity || 0;
    player.bodySpinVelocity += trick.bodyVelocity || 0;
}

function drawRoundedRect(x, y, width, height, radius, fillStyle, strokeStyle) {
    hudContext.beginPath();
    hudContext.moveTo(x + radius, y);
    hudContext.arcTo(x + width, y, x + width, y + height, radius);
    hudContext.arcTo(x + width, y + height, x, y + height, radius);
    hudContext.arcTo(x, y + height, x, y, radius);
    hudContext.arcTo(x, y, x + width, y, radius);
    hudContext.closePath();
    hudContext.fillStyle = fillStyle;
    hudContext.fill();
    if (strokeStyle) {
        hudContext.strokeStyle = strokeStyle;
        hudContext.lineWidth = 3;
        hudContext.stroke();
    }
}

function formatScore(value) {
    return Math.floor(value).toLocaleString();
}

function ownsDeck(deckId) {
    return state.ownedDecks.includes(deckId);
}

function applyDeckSkin() {
    const skin = SHOP_ITEMS[state.equippedDeck] || SHOP_ITEMS.classic;
    boardDeckColorMeshes.forEach((mesh) => mesh.material.color.set(skin.deck));
    boardNoseColorMeshes.forEach((mesh) => mesh.material.color.set(skin.nose));
    boardTailColorMeshes.forEach((mesh) => mesh.material.color.set(skin.tail));
}

function ownsScooter(scooterId) {
    return state.ownedScooters.includes(scooterId);
}

function ownsBike(bikeId) {
    return state.ownedBikes.includes(bikeId);
}

function getBoxRewardPool(box) {
    const rewards = [];
    if (box.rideTypes.includes("board")) {
        Object.values(SHOP_ITEMS)
            .filter((item) => item.price > 0 && !ownsDeck(item.id))
            .forEach((item) => rewards.push({ rideType: "board", item }));
    }
    if (box.rideTypes.includes("scooter")) {
        Object.values(SCOOTER_ITEMS)
            .filter((item) => item.price > 0 && !ownsScooter(item.id))
            .forEach((item) => rewards.push({ rideType: "scooter", item }));
    }
    if (box.rideTypes.includes("bike")) {
        Object.values(BIKE_ITEMS)
            .filter((item) => item.price > 0 && !ownsBike(item.id))
            .forEach((item) => rewards.push({ rideType: "bike", item }));
    }
    return rewards;
}

function getRideTypeLabel(rideType) {
    if (rideType === "board") {
        return "board";
    }
    if (rideType === "scooter") {
        return "scooter";
    }
    return "BMX bike";
}

function unlockSkinBox(boxId) {
    const box = SKIN_BOXES[boxId];
    if (!box || state.coins < box.price) {
        return;
    }

    const pool = getBoxRewardPool(box);
    if (!pool.length) {
        state.lastSkinBoxMessage = `${box.name} is sold out. You already own every skin in this box.`;
        renderMenu();
        return;
    }

    const reward = pool[Math.floor(Math.random() * pool.length)];
    state.coins -= box.price;

    if (reward.rideType === "board") {
        state.ownedDecks = [...state.ownedDecks, reward.item.id];
    } else if (reward.rideType === "scooter") {
        state.ownedScooters = [...state.ownedScooters, reward.item.id];
    } else {
        state.ownedBikes = [...state.ownedBikes, reward.item.id];
    }

    equipRideItem(reward.rideType, reward.item.id);
    const rarityText = reward.item.boxOnly ? " legendary" : "";
    state.lastSkinBoxMessage = `${box.name} unlocked ${reward.item.name}, a new${rarityText} ${getRideTypeLabel(reward.rideType)} skin and equipped it automatically.`;
    showUnlockToast(reward.rideType, reward.item);
    renderMenu();
}

function applyScooterSkin() {
    const scooter = SCOOTER_ITEMS[state.equippedScooter] || SCOOTER_ITEMS.streetline;
    scooterDeckColorMeshes.forEach((mesh) => mesh.material.color.set(scooter.deck));
    scooterClampColorMeshes.forEach((mesh) => mesh.material.color.set(scooter.clamp));
    scooterGripColorMeshes.forEach((mesh) => mesh.material.color.set(scooter.grips));
}

function applyBikeSkin() {
    const bike = BIKE_ITEMS[state.equippedBike] || BIKE_ITEMS.parkline;
    bikeFrameMaterial.color.set(bike.frame);
    bikeForkMaterial.color.set(bike.fork);
    bikeGripMaterial.color.set(bike.grips);
}

function getEquippedRide() {
    if (state.equippedRideType === "scooter") {
        return SCOOTER_ITEMS[state.equippedScooter] || SCOOTER_ITEMS.streetline;
    }
    if (state.equippedRideType === "bike") {
        return BIKE_ITEMS[state.equippedBike] || BIKE_ITEMS.parkline;
    }
    return SHOP_ITEMS[state.equippedDeck] || SHOP_ITEMS.classic;
}

function applyRideSkin() {
    const usingScooter = state.equippedRideType === "scooter";
    const usingBike = state.equippedRideType === "bike";
    applyDeckSkin();
    applyScooterSkin();
    applyBikeSkin();
    const ride = getEquippedRide();
    torso.material.color.set(ride.shirt);
    boardGroup.visible = !usingScooter && !usingBike;
    scooterGroup.visible = usingScooter;
    bikeGroup.visible = usingBike;
}

function applyAtmosphere(options) {
    scene.background = new THREE.Color(options.background);
    scene.fog = new THREE.Fog(options.background, options.fogNear, options.fogFar);
    farGround.material.color.set(options.ground);
    ambientLight.color.set(options.hemiSky);
    ambientLight.groundColor.set(options.hemiGround);
    ambientLight.intensity = options.hemiIntensity;
    fillLight.color.set(options.fillColor);
    fillLight.intensity = options.fillIntensity;
    sunLight.color.set(options.sunColor);
    sunLight.intensity = options.sunIntensity;
    sunMesh.material.color.set(options.sunColor);
    sunHalo.material.color.set(options.sunHalo);
    sunHalo.material.opacity = options.sunHaloOpacity;
    renderer.toneMappingExposure = options.exposure;
    atmosphereUniforms.topColor.value.set(options.skyTop);
    atmosphereUniforms.horizonColor.value.set(options.skyHorizon);
    atmosphereUniforms.bottomColor.value.set(options.skyBottom);
    cloudMaterial.color.set(options.cloudColor);
    cloudMaterial.opacity = options.cloudOpacity;
    skyline.visible = options.showSkyline;
    cloudLayer.visible = options.showClouds;
}

function applyMapTheme() {
    if (state.selectedMap === "megabowl") {
        applyAtmosphere({
            background: "#7db2c5",
            fogNear: 88,
            fogFar: 292,
            ground: "#5f826f",
            hemiSky: "#f4f7f3",
            hemiGround: "#43545d",
            hemiIntensity: 1.85,
            fillColor: "#8db6d8",
            fillIntensity: 0.82,
            sunColor: "#fff1d2",
            sunIntensity: 2.75,
            sunHalo: "#ffd8ad",
            sunHaloOpacity: 0.2,
            skyTop: "#4b7298",
            skyHorizon: "#a7d0da",
            skyBottom: "#f6efe0",
            cloudColor: "#f4f6f7",
            cloudOpacity: 0.7,
            exposure: 1.02,
            showSkyline: false,
            showClouds: true,
        });
        farGround.material.color.set("#557c68");
        roadMaterial.color.set("#a6b0ba");
        curbMaterial.color.set("#ece4d6");
        stripeMaterial.color.set("#ff8c5f");
        stripeMaterial.emissive.set("#7f392a");
        sunMesh.position.set(state.player.x + 96, 54, -84);
        sunHalo.position.copy(sunMesh.position);
        return;
    }

    if (state.selectedMap === "bowl") {
        applyAtmosphere({
            background: "#81b6c9",
            fogNear: 80,
            fogFar: 255,
            ground: "#668d73",
            hemiSky: "#f4f5ef",
            hemiGround: "#4b5c61",
            hemiIntensity: 1.82,
            fillColor: "#8cb8da",
            fillIntensity: 0.78,
            sunColor: "#ffe7c0",
            sunIntensity: 2.68,
            sunHalo: "#ffd3aa",
            sunHaloOpacity: 0.2,
            skyTop: "#4a6e92",
            skyHorizon: "#9dcfdf",
            skyBottom: "#f7eddd",
            cloudColor: "#f5f5f2",
            cloudOpacity: 0.72,
            exposure: 1.01,
            showSkyline: false,
            showClouds: true,
        });
        farGround.material.color.set("#5e8b71");
        roadMaterial.color.set("#aeb6bf");
        curbMaterial.color.set("#e4ddd1");
        stripeMaterial.color.set("#ff9966");
        stripeMaterial.emissive.set("#7a402f");
        sunMesh.position.set(state.player.x + 84, 50, -76);
        sunHalo.position.copy(sunMesh.position);
        return;
    }

    if (state.selectedMap === "skatepark") {
        applyAtmosphere({
            background: "#91d1d0",
            fogNear: 86,
            fogFar: 270,
            ground: "#719c80",
            hemiSky: "#f5f8f4",
            hemiGround: "#50605b",
            hemiIntensity: 1.86,
            fillColor: "#8ab9d4",
            fillIntensity: 0.8,
            sunColor: "#fff0cf",
            sunIntensity: 2.62,
            sunHalo: "#ffd7af",
            sunHaloOpacity: 0.18,
            skyTop: "#4d6f94",
            skyHorizon: "#a9ddd8",
            skyBottom: "#fdf0dd",
            cloudColor: "#fbf7ef",
            cloudOpacity: 0.76,
            exposure: 1.04,
            showSkyline: false,
            showClouds: true,
        });
        farGround.material.color.set("#6a9e80");
        roadMaterial.color.set("#b5bcc5");
        curbMaterial.color.set("#d7eef1");
        stripeMaterial.color.set("#ff845f");
        stripeMaterial.emissive.set("#7b3b26");
        sunMesh.position.set(state.player.x + 90, 48, -70);
        sunHalo.position.copy(sunMesh.position);
        return;
    }

    applyAtmosphere({
        background: "#f3b271",
        fogNear: 74,
        fogFar: 252,
        ground: "#58506f",
        hemiSky: "#fff0cb",
        hemiGround: "#32445b",
        hemiIntensity: 1.92,
        fillColor: "#8ca9cf",
        fillIntensity: 0.74,
        sunColor: "#ffe4b3",
        sunIntensity: 2.72,
        sunHalo: "#ffcfa3",
        sunHaloOpacity: 0.22,
        skyTop: "#4d5f92",
        skyHorizon: "#f4b87d",
        skyBottom: "#fff0d0",
        cloudColor: "#fff1dc",
        cloudOpacity: 0.8,
        exposure: 1.06,
        showSkyline: true,
        showClouds: true,
    });
    farGround.material.color.set("#4f466e");
    roadMaterial.color.set("#8a92a3");
    curbMaterial.color.set("#f5ead0");
    stripeMaterial.color.set("#fff2bb");
    stripeMaterial.emissive.set("#a58d39");
    sunMesh.position.set(state.player.x + 110, 42, -90);
    sunHalo.position.copy(sunMesh.position);
}

function setMenuPanel(panel) {
    state.activeMenuPanel = panel;
    menuTabs.querySelectorAll(".menu-tab").forEach((button) => {
        button.classList.toggle("active", button.dataset.panel === panel);
    });
    menuShell.querySelectorAll(".menu-panel").forEach((section) => {
        section.classList.toggle("active", section.dataset.panel === panel);
    });
}

function renderShopGrid() {
    const cards = Object.values(SHOP_ITEMS).filter((item) => !item.boxOnly).map((item) => {
        const card = document.createElement("article");
        card.className = "shop-card";
        card.classList.toggle("equipped", state.equippedRideType === "board" && state.equippedDeck === item.id);

        const swatch = document.createElement("div");
        swatch.className = "shop-swatch";
        swatch.style.background = `linear-gradient(135deg, ${item.nose}, ${item.deck} 48%, ${item.tail})`;

        const title = document.createElement("strong");
        title.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        const meta = document.createElement("div");
        meta.className = "shop-meta";
        meta.innerHTML = `<span>${ownsDeck(item.id) ? "Owned" : `${formatScore(item.price)} coins`}</span><span>${state.equippedRideType === "board" && state.equippedDeck === item.id ? "Active" : "Deck"}</span>`;

        const button = document.createElement("button");
        button.type = "button";
        if (state.equippedDeck === item.id && state.equippedRideType === "board") {
            button.textContent = "Using Board";
            button.disabled = true;
        } else if (state.equippedDeck === item.id) {
            button.textContent = "Switch To Board";
            bindUiPress(button, () => {
                equipRideItem("board", item.id);
                renderMenu();
            });
        } else if (ownsDeck(item.id)) {
            button.textContent = "Equip";
            bindUiPress(button, () => {
                equipRideItem("board", item.id);
                renderMenu();
            });
        } else {
            button.textContent = `Buy ${formatScore(item.price)}`;
            button.disabled = state.coins < item.price;
            bindUiPress(button, () => {
                if (state.coins < item.price) {
                    return;
                }
                state.coins -= item.price;
                state.ownedDecks = [...state.ownedDecks, item.id];
                equipRideItem("board", item.id);
                renderMenu();
            });
        }

        card.append(swatch, title, description, meta, button);
        return card;
    });

    replaceElementChildren(shopGrid, cards);
}

function renderSkinBoxGrid() {
    const cards = Object.values(SKIN_BOXES).map((box) => {
        const pool = getBoxRewardPool(box);
        const soldOut = pool.length === 0;
        const card = document.createElement("article");
        card.className = "shop-card lootbox-card";

        const swatch = document.createElement("div");
        swatch.className = "shop-swatch";
        swatch.style.background = `linear-gradient(135deg, ${box.gradient[0]}, ${box.gradient[1]} 48%, ${box.gradient[2]})`;

        const title = document.createElement("strong");
        title.textContent = box.name;

        const description = document.createElement("p");
        description.textContent = box.description;

        const meta = document.createElement("div");
        meta.className = "shop-meta";
        meta.innerHTML = `<span>${soldOut ? "Sold out" : `${formatScore(box.price)} coins`}</span><span>${pool.length} skins left</span>`;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = soldOut ? "Sold Out" : `Open ${formatScore(box.price)}`;
        button.disabled = soldOut || state.coins < box.price;
        bindUiPress(button, () => {
            unlockSkinBox(box.id);
        });

        card.append(swatch, title, description, meta, button);
        return card;
    });

    replaceElementChildren(skinBoxGrid, cards);
    skinBoxStatus.textContent = state.lastSkinBoxMessage || "Open a box to pull a fresh board, scooter, or BMX skin.";
}

function renderScooterGrid() {
    const cards = Object.values(SCOOTER_ITEMS).filter((item) => !item.boxOnly).map((item) => {
        const card = document.createElement("article");
        card.className = "shop-card";
        card.classList.toggle("equipped", state.equippedRideType === "scooter" && state.equippedScooter === item.id);

        const swatch = document.createElement("div");
        swatch.className = "shop-swatch";
        swatch.style.background = `linear-gradient(135deg, ${item.clamp}, ${item.deck} 54%, ${item.grips})`;

        const title = document.createElement("strong");
        title.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        const meta = document.createElement("div");
        meta.className = "shop-meta";
        meta.innerHTML = `<span>${ownsScooter(item.id) ? "Owned" : `${formatScore(item.price)} coins`}</span><span>${state.equippedRideType === "scooter" && state.equippedScooter === item.id ? "Equipped" : "Scooter"}</span>`;

        const button = document.createElement("button");
        button.type = "button";
        if (state.equippedRideType === "scooter" && state.equippedScooter === item.id) {
            button.textContent = "Using Scooter";
            button.disabled = true;
        } else if (state.equippedScooter === item.id) {
            button.textContent = "Switch To Scooter";
            bindUiPress(button, () => {
                equipRideItem("scooter", item.id);
                renderMenu();
            });
        } else if (ownsScooter(item.id)) {
            button.textContent = "Equip";
            bindUiPress(button, () => {
                equipRideItem("scooter", item.id);
                renderMenu();
            });
        } else {
            button.textContent = `Buy ${formatScore(item.price)}`;
            button.disabled = state.coins < item.price;
            bindUiPress(button, () => {
                if (state.coins < item.price) {
                    return;
                }
                state.coins -= item.price;
                state.ownedScooters = [...state.ownedScooters, item.id];
                equipRideItem("scooter", item.id);
                renderMenu();
            });
        }

        card.append(swatch, title, description, meta, button);
        return card;
    });

    replaceElementChildren(scooterGrid, cards);
}

function renderBikeGrid() {
    const cards = Object.values(BIKE_ITEMS).filter((item) => !item.boxOnly).map((item) => {
        const card = document.createElement("article");
        card.className = "shop-card";
        card.classList.toggle("equipped", state.equippedRideType === "bike" && state.equippedBike === item.id);

        const swatch = document.createElement("div");
        swatch.className = "shop-swatch";
        swatch.style.background = `linear-gradient(135deg, ${item.fork}, ${item.frame} 54%, ${item.grips})`;

        const title = document.createElement("strong");
        title.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        const meta = document.createElement("div");
        meta.className = "shop-meta";
        meta.innerHTML = `<span>${ownsBike(item.id) ? "Owned" : `${formatScore(item.price)} coins`}</span><span>${state.equippedRideType === "bike" && state.equippedBike === item.id ? "Equipped" : "BMX"}</span>`;

        const button = document.createElement("button");
        button.type = "button";
        if (state.equippedRideType === "bike" && state.equippedBike === item.id) {
            button.textContent = "Using BMX";
            button.disabled = true;
        } else if (state.equippedBike === item.id) {
            button.textContent = "Switch To BMX";
            bindUiPress(button, () => {
                equipRideItem("bike", item.id);
                renderMenu();
            });
        } else if (ownsBike(item.id)) {
            button.textContent = "Equip";
            bindUiPress(button, () => {
                equipRideItem("bike", item.id);
                renderMenu();
            });
        } else {
            button.textContent = `Buy ${formatScore(item.price)}`;
            button.disabled = state.coins < item.price;
            bindUiPress(button, () => {
                if (state.coins < item.price) {
                    return;
                }
                state.coins -= item.price;
                state.ownedBikes = [...state.ownedBikes, item.id];
                equipRideItem("bike", item.id);
                renderMenu();
            });
        }

        card.append(swatch, title, description, meta, button);
        return card;
    });

    replaceElementChildren(bikeGrid, cards);
}

function renderMapGrid() {
    const cards = Object.values(MAP_DEFINITIONS).map((map) => {
        const card = document.createElement("article");
        card.className = "map-card";
        card.classList.toggle("selected", state.selectedMap === map.id);

        const title = document.createElement("strong");
        title.textContent = map.name;

        const description = document.createElement("p");
        description.textContent = map.description;

        const meta = document.createElement("div");
        meta.className = "map-meta";
        meta.innerHTML = `<span>${map.flavor}</span><span>${state.selectedMap === map.id ? "Selected" : "Available"}</span>`;

        const button = document.createElement("button");
        button.type = "button";
        if (state.selectedMap === map.id) {
            button.textContent = "Selected";
            button.disabled = true;
        } else {
            button.textContent = "Choose Map";
            bindUiPress(button, () => {
                if (isOnlineGuest()) {
                    updateOnlineStatus("Only the host can change the map for an online session.");
                    renderMenu();
                    return;
                }
                state.selectedMap = map.id;
                applyMapTheme();
                saveProfile();
                if (isOnlineHost()) {
                    broadcastToGuests({ type: "map-sync", mapId: map.id });
                }
                renderMenu();
            });
        }

        card.append(title, description, meta, button);
        return card;
    });

    replaceElementChildren(mapGrid, cards);
}

function getKeyLabel(code) {
    return String(code || "")
        .replace("Key", "")
        .replace("Arrow", "Arrow ")
        .trim();
}

function createTrickGuideCard(titleText, descriptionText, library, contextLabel) {
    const card = document.createElement("article");
    card.className = "trick-card";

    const label = document.createElement("span");
    label.className = "panel-label";
    label.textContent = contextLabel;

    const title = document.createElement("h3");
    title.textContent = titleText;

    const description = document.createElement("p");
    description.textContent = descriptionText;

    const list = document.createElement("div");
    list.className = "trick-list";

    Object.entries(library).forEach(([code, trick]) => {
        const row = document.createElement("div");
        row.className = "trick-row";

        const left = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = trick.name;
        const detail = document.createElement("span");
        detail.textContent = `${formatScore(trick.points)} pts`;
        left.append(name, detail);

        const key = document.createElement("div");
        key.className = "trick-key";
        key.textContent = getKeyLabel(code);

        row.append(left, key);
        list.append(row);
    });

    card.append(label, title, description, list);
    return card;
}

function renderTrickGuide() {
    if (!trickGuideGrid) {
        return;
    }

    const cards = [];

    cards.push(createTrickGuideCard(
        "Session Basics",
        "Use these controls to start runs, ollie, steer, and switch into rail tricks.",
        {
            Space: { name: "Ollie / Hop Out", points: 0 },
            ArrowUp: { name: "Push", points: 0 },
            ArrowDown: { name: "Brake / Crouch", points: 0 },
            KeyZ: { name: "Manual (board only when grounded)", points: 0 },
            KeyR: { name: "Pick Up / Put Down Board", points: 0 },
            KeyL: { name: "Start / Stop Clip Recording", points: 0 },
            ArrowLeft: { name: "Turn Left", points: 0 },
            ArrowRight: { name: "Turn Right", points: 0 },
            Escape: { name: "Open Menu", points: 0 },
        },
        "General Controls"
    ));

    cards.push(createTrickGuideCard(
        "Skateboard Air Tricks",
        "Jump first, then press a trick key while airborne on a skateboard.",
        BOARD_TRICK_LIBRARY,
        "Board"
    ));

    cards.push(createTrickGuideCard(
        "Scooter Air Tricks",
        "Jump first, then press a trick key while airborne on a scooter.",
        SCOOTER_TRICK_LIBRARY,
        "Scooter"
    ));

    cards.push(createTrickGuideCard(
        "BMX Air Tricks",
        "Jump first, then press a trick key while airborne on a BMX.",
        BIKE_TRICK_LIBRARY,
        "BMX"
    ));

    if (isBowlMap()) {
        cards.push(createTrickGuideCard(
            "Bowl Air Tricks",
            "On bowl maps, your air-trick buttons swap to transition-friendly bowl tricks with their own scoring.",
            getActiveTrickLibrary(),
            "Current Bowl Set"
        ));

        cards.push(createTrickGuideCard(
            "Bowl Grind Tricks",
            "On bowl maps, coping and bowl rails use a bowl-specific grind set.",
            getActiveGrindLibrary(),
            "Current Bowl Grinds"
        ));
    }

    cards.push(createTrickGuideCard(
        "Skateboard Grind Tricks",
        "Land on a rail first. While grinding, these keys switch the trick you are holding.",
        GRIND_TRICK_LIBRARY.board,
        "Board Grinds"
    ));

    cards.push(createTrickGuideCard(
        "Scooter Grind Tricks",
        "Land on a rail first. While grinding, these keys switch the trick you are holding.",
        GRIND_TRICK_LIBRARY.scooter,
        "Scooter Grinds"
    ));

    cards.push(createTrickGuideCard(
        "BMX Grind Tricks",
        "Land on a rail first. While grinding, these keys switch the trick you are holding.",
        GRIND_TRICK_LIBRARY.bike,
        "BMX Grinds"
    ));

    replaceElementChildren(trickGuideGrid, cards);
}

function renderMenu() {
    menuShell.classList.toggle("hidden", !state.menuVisible);
    updateMobileControlsVisibility();
    updateMobileControlLabels();
    const selectedMap = MAP_DEFINITIONS[state.selectedMap];
    const equippedRide = getEquippedRide();
    const versusMode = isVersusMode();

    coinValue.textContent = formatScore(state.coins);
    selectedMapName.textContent = selectedMap.name;
    selectedMapDescription.textContent = selectedMap.description;
    equippedDeckName.textContent = equippedRide.name;
    menuBestValue.textContent = formatScore(state.best);
    resumeRideButton.disabled = state.mode !== "paused" || state.selectedMap !== state.activeRunMap;
    if (versusMode) {
        startRideButton.textContent = isOnlineGuest() ? "Host Controls Start" : isOnlineHost() ? "Start Online Ride" : "Host Or Join Room";
        startRideButton.disabled = !isOnlineHost();
        menuSubtitle.textContent = isOnlineHost()
            ? `Room ${onlineState.roomCode} is live. Pick a map and start a shared session.`
            : isOnlineGuest()
                ? `Connected to room ${onlineState.roomCode}. The host controls map and run start.`
                : "Switch to online multiplayer, host a room, or join one with a code to ride together.";
    } else {
        startRideButton.textContent = state.competition.enabled
            ? state.mode === "crashed"
                ? "Restart AI Battle"
                : "Start AI Battle"
            : state.mode === "crashed"
                ? "Restart Ride"
                : "Start Ride";
        startRideButton.disabled = false;
        menuSubtitle.textContent = state.mode === "crashed"
            ? `You banked ${formatScore(state.score)} points and earned ${formatScore(state.lastRunCoins)} coins. Change your setup and go again.`
            : state.competition.enabled
                ? `Pick a map and drop into a live score race against ${getSoloCompetitionBotPreview().name} AI.`
                : "Pick a map, switch between boards, scooters, and BMX bikes, and drop into your next run.";
    }
    singlePlayerModeButton.classList.toggle("active", !versusMode);
    versusModeButton.classList.toggle("active", versusMode);
    modeDescription.textContent = getModeDescriptionText();
    modeScore.textContent = getModeScoreText();
    competitionSummary.textContent = isVersusMode()
        ? `Compete live with everyone in the room. Winner gets ${formatScore(COMPETITION_WIN_BONUS)} bonus coins. Wins ${formatScore(state.competition.wins)}.`
        : `Battle ${getSoloCompetitionBotPreview().name} AI at Level ${getSoloCompetitionBotPreview().level} in a 90 second score race. Win for ${formatScore(SOLO_COMPETITION_CLEAR_BONUS)} bonus coins. Wins ${formatScore(state.competition.wins)}.`;
    const competitionRank = getCompetitionRank(state.competition.wins);
    competitionRankBadge.textContent = competitionRank.badge;
    competitionRankName.textContent = competitionRank.name;
    competitionRankProgress.textContent = getCompetitionRankProgressText();
    competitionRankCard.className = `competition-rank-card tier-${competitionRank.key}`;
    competitionStatus.textContent = updateCompetitionStatusText();
    competitionToggleButton.textContent = versusMode
        ? state.competition.enabled ? "Competition On" : "Competition Off"
        : state.competition.enabled ? "AI Rival On" : "AI Rival Off";
    competitionToggleButton.classList.toggle("active", state.competition.enabled);
    competitionToggleButton.disabled = isOnlineGuest();
    if (recordClipButton) {
        recordClipButton.textContent = clipRecorderState.recording ? "Stop Recording" : "Record Clip";
        recordClipButton.disabled = !clipRecorderState.supported || (!clipRecorderState.recording && state.mode !== "playing" && state.mode !== "paused");
    }
    if (recordingStatus) {
        recordingStatus.textContent = clipRecorderState.status || getRecordingStatusText();
    }
    usernameInput.value = state.username;
    usernameStatus.textContent = getUsernameStatusText();
    installStatus.textContent = getInstallStatusText();
    installHint.textContent = getInstallHintText();
    installGameButton.textContent = getInstallButtonLabel();
    installGameButton.disabled = !deferredInstallPrompt && !isIOSDevice() && !isAndroidDevice() && !isStandaloneApp();
    onlineControls.classList.toggle("active", versusMode);
    hostRoomButton.disabled = false;
    joinRoomButton.disabled = false;
    leaveRoomButton.disabled = !versusMode || (!onlineState.peer && !onlineState.connected);
    if (versusMode && onlineState.roomCode) {
        roomCodeInput.value = onlineState.roomCode;
    }
    onlineStatus.textContent = onlineState.status;

    renderCompetitionBoard();
    setMenuPanel(state.activeMenuPanel);
    renderSkinBoxGrid();
    renderShopGrid();
    renderScooterGrid();
    renderBikeGrid();
    renderMapGrid();
    renderTrickGuide();
    hudSprite.visible = !state.menuVisible;
}

function detectMobileControls() {
    return window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 900 || navigator.maxTouchPoints > 0;
}

function updateMobileControlsVisibility() {
    state.mobile.enabled = detectMobileControls();
    mobileControls.classList.toggle("active", state.mobile.enabled && !state.menuVisible);
    mobileControls.classList.toggle("hidden", !state.mobile.enabled || state.menuVisible);
}

function updateMobileControlLabels() {
    const trickLibrary = getActiveControlLibrary();
    mobileTrickOneButton.textContent = trickLibrary.KeyZ ? trickLibrary.KeyZ.name : "Trick 1";
    mobileTrickTwoButton.textContent = trickLibrary.KeyC ? trickLibrary.KeyC.name : "Trick 2";
}

function setControlKey(code, pressed) {
    if (pressed) {
        state.keys.add(code);
    } else {
        state.keys.delete(code);
    }
}

function bindHoldButton(button, code) {
    if (!button) {
        return;
    }

    const press = (event) => {
        event.preventDefault();
        event.stopPropagation();
        button.classList.add("is-active");
        setControlKey(code, true);
    };

    const release = (event) => {
        event.preventDefault();
        event.stopPropagation();
        button.classList.remove("is-active");
        setControlKey(code, false);
    };

    button.addEventListener("pointerdown", press);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("pointerleave", release);
}

function bindTapButton(button, handler) {
    if (!button) {
        return;
    }

    button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();
        button.classList.add("is-active");
    });

    const release = () => {
        button.classList.remove("is-active");
    };

    button.addEventListener("pointerup", (event) => {
        event.preventDefault();
        event.stopPropagation();
        release();
        handler();
    });
    button.addEventListener("pointercancel", release);
    button.addEventListener("pointerleave", release);
}

function performMobileTrick(code) {
    if (state.menuVisible || state.mode !== "playing") {
        return;
    }

    if (code === "KeyR") {
        toggleBoardCarry(state.player);
        return;
    }

    if (code === "KeyZ" && state.equippedRideType === "board" && !state.player.airborne && !state.player.grinding) {
        if (state.player.manualing) {
            endManual(state.player, true);
        } else {
            startManual(state.player);
        }
        return;
    }

    const trick = getActiveControlLibrary()[code];
    if (trick) {
        if (state.player.grinding) {
            performGrindTrick(trick);
        } else {
            performTrick(trick);
        }
    }
}

function openMenu(panel = "home") {
    if (state.mode === "playing") {
        state.mode = "paused";
    }
    state.menuVisible = true;
    state.activeMenuPanel = panel;
    renderMenu();
}

function closeMenu() {
    if (state.mode !== "paused") {
        return;
    }
    state.menuVisible = false;
    state.mode = "playing";
    renderMenu();
}

function updateHud() {
    const player = state.player;
    const comboScore = Math.round(player.comboPoints * player.comboMultiplier);
    const comboLabel = player.comboMoves.length > 0 ? player.comboMoves.slice(-3).join(" + ") : "No combo banked";
    const scoreLabel = isVersusMode() ? "ONLINE" : "SCORE";

    hudContext.clearRect(0, 0, hudCanvas.width, hudCanvas.height);
    drawRoundedRect(24, 20, 976, 208, 34, "rgba(10, 16, 28, 0.58)", "rgba(255, 242, 196, 0.24)");
    drawRoundedRect(24, 248, 976, 240, 34, "rgba(10, 16, 28, 0.36)", "rgba(255, 242, 196, 0.14)");

    hudContext.fillStyle = "rgba(255, 242, 196, 0.72)";
    hudContext.font = "600 34px Arial";
    hudContext.fillText(scoreLabel, 58, 72);
    hudContext.fillText("BEST", 372, 72);
    hudContext.fillText("COMBO", 630, 72);
    hudContext.fillText(state.competition.enabled ? "TIME" : "COINS", 820, 196);

    hudContext.fillStyle = "#fff7da";
    hudContext.font = "700 82px Arial";
    hudContext.fillText(formatScore(state.score), 56, 152);
    hudContext.fillText(formatScore(state.best), 368, 152);
    hudContext.fillText(comboScore > 0 ? formatScore(comboScore) : "0", 626, 152);

    hudContext.fillStyle = "rgba(255, 242, 196, 0.62)";
    hudContext.font = "600 28px Arial";
    hudContext.fillText(`MULTI x${player.comboMultiplier}`, 628, 196);
    hudContext.fillText(`SPEED ${Math.round(player.speed * 2.3)} MPH`, 806, 72);
    hudContext.fillText(state.competition.enabled ? `${Math.ceil(getCompetitionRemainingTime())}s` : formatScore(state.coins), 820, 236);
    if (clipRecorderState.recording) {
        hudContext.fillStyle = "#ff7b59";
        hudContext.font = "700 26px Arial";
        hudContext.fillText("REC", 924, 72);
    }

    hudContext.fillStyle = "#fff0bf";
    hudContext.font = "700 42px Arial";
    hudContext.fillText(comboLabel, 58, 316);

    hudContext.fillStyle = state.mode === "crashed" ? "#ff9e7c" : "rgba(255, 242, 196, 0.88)";
    hudContext.font = "600 30px Arial";
    const statusText = state.mode === "crashed"
        ? `Bailed. Space or Enter to restart. Last: ${state.lastScoreEvent}`
        : `Last: ${state.lastScoreEvent}`;
    hudContext.fillText(statusText, 58, 372);

    hudContext.fillStyle = "rgba(255, 242, 196, 0.74)";
    hudContext.font = "500 26px Arial";
    hudContext.fillText(`Drag to look around. Esc opens the home menu. Space to ollie. ${getActiveControlHint()}.`, 58, 432);
    if (isVersusMode()) {
        const riderCount = isOnlineHost() ? onlineState.connections.size + 1 : isOnlineGuest() ? onlineState.remotePlayers.size + 1 : 1;
        hudContext.fillText(`Room ${onlineState.roomCode || "----"} | Riders ${riderCount}`, 58, 468);
        if (state.competition.enabled) {
            const leader = buildCompetitionStandings()[0];
            const leaderName = leader && leader.username ? leader.username : "You";
            const leaderScore = leader && leader.score ? leader.score : 0;
            hudContext.fillText(`Leader ${leaderName} ${formatScore(leaderScore)}`, 460, 468);
        }
    } else if (state.competition.enabled) {
        const bot = state.competition.bot.active ? state.competition.bot : getSoloCompetitionBotPreview();
        const botScore = state.competition.bot.active ? Math.round(state.competition.bot.score || 0) : 0;
        hudContext.fillText(`${bot.name} L${bot.level} ${formatScore(botScore)} / ${formatScore(getSoloCompetitionTarget())}`, 58, 468);
    }

    hudSprite.material.opacity = 0.88 + Math.sin(state.time * 6) * 0.04 * state.hudPulse;
    hudSprite.visible = !state.menuVisible;
    hudTexture.needsUpdate = true;
}

function removeRoot(entry) {
    if (entry && entry.root) {
        world.remove(entry.root);
    }
}

function clearWorld() {
    state.trackSegments.forEach(removeRoot);
    state.citySurfaces.forEach(removeRoot);
    state.curvedSurfaces.forEach(removeRoot);
    state.rails.forEach(removeRoot);
    state.obstacles.forEach(removeRoot);
    state.pickups.forEach(removeRoot);
    state.props.forEach(removeRoot);
    state.trackSegments = [];
    state.citySurfaces = [];
    state.curvedSurfaces = [];
    state.rails = [];
    state.obstacles = [];
    state.pickups = [];
    state.props = [];
    state.solids = [];
}

function createRoadSegmentRoot(x0, x1, y0, y1) {
    const run = x1 - x0;
    const rise = y1 - y0;
    const length = Math.hypot(run, rise);
    const angle = Math.atan2(rise, run);
    const midX = (x0 + x1) / 2;
    const midY = (y0 + y1) / 2;
    const normalX = -Math.sin(angle);
    const normalY = Math.cos(angle);
    const root = new THREE.Group();

    const slab = new THREE.Mesh(new THREE.BoxGeometry(length, TRACK_THICKNESS, TRACK_WIDTH), roadMaterial);
    slab.castShadow = true;
    slab.receiveShadow = true;
    slab.position.set(midX - normalX * (TRACK_THICKNESS / 2), midY - normalY * (TRACK_THICKNESS / 2), 0);
    slab.rotation.z = angle;
    root.add(slab);

    [-TRACK_HALF + 0.35, TRACK_HALF - 0.35].forEach((zOffset) => {
        const curb = new THREE.Mesh(new THREE.BoxGeometry(length, 0.18, 0.28), curbMaterial);
        curb.position.set(midX, midY + 0.1, zOffset);
        curb.rotation.z = angle;
        curb.castShadow = true;
        root.add(curb);
    });

    const stripe = new THREE.Mesh(new THREE.BoxGeometry(Math.max(length * 0.42, 2.2), 0.05, 0.22), stripeMaterial);
    stripe.position.set(midX, midY + 0.08, 0);
    stripe.rotation.z = angle;
    stripe.castShadow = true;
    root.add(stripe);

    world.add(root);
    return { root, angle };
}

function addTrackSegment(x0, x1, y0, y1) {
    const { root, angle } = createRoadSegmentRoot(x0, x1, y0, y1);
    state.trackSegments.push({ x0, x1, y0, y1, angle, root });
    state.generationCursor = x1;
    state.terrainY = y1;
}

function addRail(x0, x1, y, z = 0) {
    const root = new THREE.Group();
    const length = x1 - x0;
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, length, 14), railMaterial);
    bar.rotation.z = Math.PI / 2;
    bar.position.set((x0 + x1) / 2, y, z);
    bar.castShadow = true;
    root.add(bar);

    for (let x = x0 + 2.4; x < x1 - 1.4; x += 4.5) {
        const support = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.2, 0.12), railMaterial);
        support.position.set(x, y - 0.7, z);
        support.castShadow = true;
        root.add(support);
    }

    world.add(root);
    state.rails.push({ x0, x1, y, z, root });
}

function addObstacle(x, type = "cone", z = randomBetween(-TRACK_HALF + 1.6, TRACK_HALF - 1.6)) {
    const surface = getSurfaceInfo(x, z);
    if (!surface) {
        return;
    }

    const root = new THREE.Group();
    let height = 1.6;
    let radius = 0.7;

    if (type === "barrier") {
        const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.3, 0.7), barrierMaterial);
        body.castShadow = true;
        body.position.y = 0.65;
        root.add(body);
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.18, 0.72), coneMaterial);
        stripe.position.y = 0.9;
        stripe.castShadow = true;
        root.add(stripe);
        height = 1.3;
        radius = 1.2;
    } else {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.4, 18), coneMaterial);
        cone.castShadow = true;
        cone.position.y = 0.7;
        root.add(cone);
        const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.12, 16), curbMaterial);
        stripe.position.y = 0.52;
        stripe.castShadow = true;
        root.add(stripe);
        height = 1.4;
        radius = 0.75;
    }

    root.position.set(x, surface.y, z);
    world.add(root);
    state.obstacles.push({ x, y: surface.y, z, height, radius, root, hit: false });
    state.solids.push({
        minX: x - radius,
        maxX: x + radius,
        minZ: z - radius,
        maxZ: z + radius,
        y: surface.y,
        topY: surface.y + height,
        recoil: type === "barrier" ? 0.22 : 0.16,
    });
}

function addPickup(x, y, z = randomBetween(-TRACK_HALF + 1.3, TRACK_HALF - 1.3)) {
    const root = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.15, 12, 24), pickupMaterial);
    ring.rotation.y = Math.PI / 2;
    ring.castShadow = true;
    root.add(ring);

    const core = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 0.12), new THREE.MeshStandardMaterial({ color: "#43396b", emissive: "#18102d", emissiveIntensity: 0.25 }));
    core.castShadow = true;
    root.add(core);

    root.position.set(x, y, z);
    world.add(root);
    state.pickups.push({ x, y, z, bob: Math.random() * Math.PI * 2, root, collected: false });
}

function addSolidBox(centerX, centerZ, width, depth, options = {}) {
    const {
        y = 0,
        height = 3,
        recoil = 0.18,
    } = options;

    state.solids.push({
        minX: centerX - width / 2,
        maxX: centerX + width / 2,
        minZ: centerZ - depth / 2,
        maxZ: centerZ + depth / 2,
        y,
        topY: y + height,
        recoil,
    });
}

function addSurfaceEdgeSolid(centerX, centerZ, width, depth, minY, maxY, recoil = 0.16) {
    const safeHeight = Math.max(0.4, maxY - minY);
    addSolidBox(centerX, centerZ, width, depth, { y: minY, height: safeHeight, recoil });
}

function addRampEdgeSolids(centerX, centerZ, width, depth, y, slopeX, slopeZ) {
    void centerX;
    void centerZ;
    void width;
    void depth;
    void y;
    void slopeX;
    void slopeZ;
}

function addPerimeterWalls(halfX, halfZ, color = "#7a756d", options = {}) {
    const {
        baseY = 0,
        height = 3.2,
    } = options;
    const wallHeight = height;
    const wallThickness = 3;
    const segments = [
        { x: 0, z: -halfZ + wallThickness / 2, width: halfX * 2, depth: wallThickness },
        { x: 0, z: halfZ - wallThickness / 2, width: halfX * 2, depth: wallThickness },
        { x: -halfX + wallThickness / 2, z: 0, width: wallThickness, depth: halfZ * 2 },
        { x: halfX - wallThickness / 2, z: 0, width: wallThickness, depth: halfZ * 2 },
    ];

    segments.forEach((segment) => {
        const wall = new THREE.Mesh(
            new THREE.BoxGeometry(segment.width, wallHeight, segment.depth),
            new THREE.MeshStandardMaterial({ color, roughness: 0.95 })
        );
        wall.position.set(segment.x, baseY + wallHeight / 2, segment.z);
        wall.castShadow = true;
        wall.receiveShadow = true;
        world.add(wall);
        state.props.push({ x: segment.x, root: wall });
        addSolidBox(segment.x, segment.z, segment.width, segment.depth, { y: baseY, height: wallHeight, recoil: 0.2 });
    });
}

function addPropCluster(x) {
    const root = new THREE.Group();

    [-1, 1].forEach((side) => {
        for (let index = 0; index < 3; index += 1) {
            const building = new THREE.Mesh(
                new THREE.BoxGeometry(randomBetween(4, 8), randomBetween(10, 22), randomBetween(4, 8)),
                new THREE.MeshStandardMaterial({ color: side > 0 ? "#4c456d" : "#5b4d72", roughness: 0.98 })
            );
            building.position.set(
                x + index * randomBetween(6, 11),
                building.geometry.parameters.height / 2 - 4.8,
                side * randomBetween(26, 42)
            );
            building.receiveShadow = true;
            root.add(building);
        }
    });

    world.add(root);
    state.props.push({ x, root });
}

function addCitySurface(centerX, centerZ, width, depth, options = {}) {
    const {
        y = 0,
        slopeX = 0,
        slopeZ = 0,
        color = "#8a92a3",
        roughness = 0.92,
        accent = false,
        solidEdges = true,
        opacity = 1,
        priority = (Math.abs(slopeX) > 0.01 || Math.abs(slopeZ) > 0.01) ? 2 : (accent ? 1 : 0),
    } = options;
    const root = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness: 0.03,
        transparent: opacity < 0.999,
        opacity,
    });
    const slab = new THREE.Mesh(new THREE.BoxGeometry(width, TRACK_THICKNESS, depth), material);
    slab.castShadow = true;
    slab.receiveShadow = true;
    slab.position.set(centerX, y - TRACK_THICKNESS / 2, centerZ);
    slab.rotation.z = Math.atan(slopeX);
    slab.rotation.x = -Math.atan(slopeZ);
    root.add(slab);

    if (accent) {
        const ledge = new THREE.Mesh(
            new THREE.BoxGeometry(width * 0.94, 0.18, depth * 0.94),
            new THREE.MeshStandardMaterial({
                color: "#d9d1ba",
                roughness: 0.95,
                transparent: opacity < 0.999,
                opacity,
            })
        );
        ledge.position.set(centerX, y + 0.1, centerZ);
        ledge.rotation.copy(slab.rotation);
        ledge.castShadow = true;
        root.add(ledge);
    }

    world.add(root);
    state.citySurfaces.push({
        root,
        centerX,
        centerZ,
        width,
        depth,
        y,
        slopeX,
        slopeZ,
        priority,
        minX: centerX - width / 2,
        maxX: centerX + width / 2,
        minZ: centerZ - depth / 2,
        maxZ: centerZ + depth / 2,
    });

    if (solidEdges && (Math.abs(slopeX) > 0.01 || Math.abs(slopeZ) > 0.01)) {
        addRampEdgeSolids(centerX, centerZ, width, depth, y, slopeX, slopeZ);
    }
}

function getHalfPipeProfile(offset, halfWidth, depth) {
    const clampedOffset = clamp(offset, -halfWidth, halfWidth);
    const normalized = Math.abs(clampedOffset) / Math.max(0.001, halfWidth);
    const y = -depth * Math.cos(normalized * Math.PI / 2);
    const slopeMagnitude = depth * (Math.PI / 2) / Math.max(0.001, halfWidth) * Math.sin(normalized * Math.PI / 2);
    return {
        y,
        slope: Math.sign(clampedOffset) * slopeMagnitude,
    };
}

function addHalfPipe(centerX, centerZ, width, length, depth, options = {}) {
    const {
        deckY = 0,
        deckExtension = 10,
        orientation = "x",
        segments = 22,
        color = "#b8c1ca",
        deckColor = "#d2d7dd",
        copingColor = "#d7d0c0",
    } = options;
    const halfWidth = width / 2;
    const segmentCount = Math.max(10, Math.floor(segments));

    if (orientation === "x") {
        addCitySurface(centerX - halfWidth - deckExtension / 2, centerZ, deckExtension, length, { y: deckY, color: deckColor, accent: true });
        addCitySurface(centerX + halfWidth + deckExtension / 2, centerZ, deckExtension, length, { y: deckY, color: deckColor, accent: true });
    } else {
        addCitySurface(centerX, centerZ - halfWidth - deckExtension / 2, length, deckExtension, { y: deckY, color: deckColor, accent: true });
        addCitySurface(centerX, centerZ + halfWidth + deckExtension / 2, length, deckExtension, { y: deckY, color: deckColor, accent: true });
    }

    for (let index = 0; index < segmentCount; index += 1) {
        const start = -halfWidth + width * (index / segmentCount);
        const end = -halfWidth + width * ((index + 1) / segmentCount);
        const center = (start + end) / 2;
        const profile = getHalfPipeProfile(center, halfWidth, depth);
        const bandSize = end - start + 0.04;

        if (orientation === "x") {
            addCitySurface(centerX + center, centerZ, bandSize, length, {
                y: deckY + profile.y,
                slopeX: profile.slope,
                color,
                accent: true,
                solidEdges: false,
            });
        } else {
            addCitySurface(centerX, centerZ + center, length, bandSize, {
                y: deckY + profile.y,
                slopeZ: profile.slope,
                color,
                accent: true,
                solidEdges: false,
            });
        }
    }

    const copingRadius = 0.24;
    const copingLength = Math.max(2, length - 0.6);
    [-1, 1].forEach((side) => {
        const coping = new THREE.Mesh(
            new THREE.CylinderGeometry(copingRadius, copingRadius, copingLength, 18),
            new THREE.MeshStandardMaterial({ color: copingColor, roughness: 0.5, metalness: 0.55 })
        );
        coping.castShadow = true;
        coping.receiveShadow = true;
        if (orientation === "x") {
            coping.rotation.x = Math.PI / 2;
            coping.position.set(centerX + side * halfWidth, deckY + 0.18, centerZ);
        } else {
            coping.rotation.z = Math.PI / 2;
            coping.position.set(centerX, deckY + 0.18, centerZ + side * halfWidth);
        }
        world.add(coping);
        state.curvedSurfaces.push({ root: coping });
    });
}

function addCityBlock(centerX, centerZ, width, depth, stories, tone) {
    const root = new THREE.Group();
    const podium = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.8, depth),
        new THREE.MeshStandardMaterial({ color: "#3b4452", roughness: 1 })
    );
    podium.position.set(centerX, 0.4, centerZ);
    podium.receiveShadow = true;
    root.add(podium);

    for (let index = 0; index < 3; index += 1) {
        const towerWidth = width * randomBetween(0.34, 0.58);
        const towerDepth = depth * randomBetween(0.34, 0.58);
        const towerHeight = stories * randomBetween(2.4, 4.4);
        const tower = new THREE.Mesh(
            new THREE.BoxGeometry(towerWidth, towerHeight, towerDepth),
            new THREE.MeshStandardMaterial({ color: tone, roughness: 0.98 })
        );
        tower.position.set(
            centerX + randomBetween(-width * 0.18, width * 0.18),
            towerHeight / 2 + 0.8,
            centerZ + randomBetween(-depth * 0.18, depth * 0.18)
        );
        tower.castShadow = true;
        tower.receiveShadow = true;
        root.add(tower);
    }

    world.add(root);
    state.props.push({ x: centerX, root });
    addSolidBox(centerX, centerZ, width, depth, { y: 0, height: stories * 4.8, recoil: 0.18 });
}

function addCityStripe(centerX, centerZ, width, depth, color = "#fff2bb") {
    const stripe = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.03, depth),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.08, roughness: 0.55 })
    );
    stripe.position.set(centerX, 0.04, centerZ);
    stripe.receiveShadow = true;
    world.add(stripe);
    state.props.push({ x: centerX, root: stripe });
}

function createCityMap() {
    addCitySurface(0, 0, CITY_HALF_X * 2, CITY_HALF_Z * 2, { y: 0, color: "#7f8797", roughness: 0.94, priority: -2 });
    addPerimeterWalls(CITY_HALF_X, CITY_HALF_Z, "#5c5567");

    const avenueXs = [-112, -56, 0, 56, 112];
    const crossStreetZs = [-114, -58, 0, 58, 114];

    avenueXs.forEach((x) => {
        addCitySurface(x, 0, 20, CITY_HALF_Z * 2, { y: 0.02, color: "#727a8b" });
        for (let z = -146; z <= 146; z += 18) {
            addCityStripe(x, z, 1.3, 7.5);
        }
    });

    crossStreetZs.forEach((z) => {
        addCitySurface(0, z, CITY_HALF_X * 2, 18, { y: 0.02, color: "#727a8b" });
        for (let x = -174; x <= 174; x += 22) {
            addCityStripe(x, z, 8.5, 1.1);
        }
    });

    addCitySurface(0, 0, 38, 78, { y: 0.08, color: "#6e8b6d", roughness: 1, accent: true });
    addCitySurface(-148, -92, 22, 18, { y: 0.4, slopeX: 0.22, color: "#9ca4b0", accent: true });
    addCitySurface(-86, 88, 24, 18, { y: 0.35, slopeZ: -0.18, color: "#9ca4b0", accent: true });
    addCitySurface(-18, 82, 18, 14, { y: 0.52, slopeX: 0.28, color: "#aab2be", accent: true });
    addCitySurface(72, -92, 24, 18, { y: 0.44, slopeZ: 0.24, color: "#aab2be", accent: true });
    addCitySurface(142, 96, 22, 16, { y: 0.38, slopeX: -0.2, color: "#9ea7b2", accent: true });
    addCitySurface(116, -18, 20, 20, { y: 0.48, slopeZ: -0.18, color: "#aab2be", accent: true });
    addCitySurface(-124, 20, 22, 18, { y: 0.46, slopeX: 0.2, color: "#aab2be", accent: true });
    addCitySurface(0, -138, 34, 18, { y: 0.42, slopeX: 0.14, color: "#aab2be", accent: true });
    addHalfPipe(0, 0, 26, 54, 6.2, {
        deckY: 0.28,
        deckExtension: 9,
        orientation: "z",
        color: "#a6b0bb",
        deckColor: "#d4d8de",
    });

    [
        [-156, -96, 1.45, -84],
        [-96, -34, 1.32, -18],
        [-22, 42, 1.3, 84],
        [34, 96, 1.4, -56],
        [98, 154, 1.35, 92],
        [-148, -92, 1.3, 18],
        [82, 136, 1.34, -112],
    ].forEach(([x0, x1, y, z]) => addRail(x0, x1, y, z));

    [
        [-146, 5.1, -84],
        [-64, 4.8, -20],
        [-8, 4.9, 86],
        [0, 2.8, 0],
        [52, 4.7, -58],
        [116, 5.2, 92],
        [142, 5.1, -110],
        [-116, 4.8, 24],
        [92, 4.9, -14],
    ].forEach(([x, y, z]) => addPickup(x, y, z));

    [
        [-34, "barrier", -58],
        [48, "cone", 58],
        [84, "barrier", -14],
        [-74, "cone", 118],
        [134, "cone", -88],
        [-132, "barrier", 28],
        [14, "cone", -112],
    ].forEach(([x, type, z]) => addObstacle(x, type, z));

    const blockTones = ["#4c456d", "#5b4d72", "#65536f", "#455467"];
    const blockCenters = [];
    [-150, -94, -38, 38, 94, 150].forEach((x) => {
        [-138, -82, -28, 28, 82, 138].forEach((z) => {
            if (Math.abs(x) < 48 && Math.abs(z) < 88) {
                return;
            }
            blockCenters.push([x, z]);
        });
    });
    blockCenters.forEach(([x, z], index) => {
        addCityBlock(x, z, 24, 24, 6 + (index % 5), blockTones[index % blockTones.length]);
    });
}

function createReplicaSkatepark() {
    addCitySurface(0, 0, SKATEPARK_HALF_X * 2, SKATEPARK_HALF_Z * 2, { y: 0, color: "#bcc3ca", roughness: 0.92, priority: -2 });
    addPerimeterWalls(SKATEPARK_HALF_X, SKATEPARK_HALF_Z, "#8d867e");
    addCitySurface(0, 0, 146, 92, { y: 0.04, color: "#c7cdd4", accent: true });
    addCitySurface(-64, 28, 48, 26, { y: 0.4, slopeX: 0.22, color: "#b4bcc5", accent: true });
    addCitySurface(66, 30, 52, 28, { y: 0.45, slopeX: -0.24, color: "#b4bcc5", accent: true });
    addCitySurface(-8, -46, 56, 24, { y: 0.36, slopeZ: 0.22, color: "#b4bcc5", accent: true });
    addCitySurface(10, 54, 58, 26, { y: 0.42, slopeZ: -0.2, color: "#b4bcc5", accent: true });
    addCitySurface(-80, -34, 24, 20, { y: 0.82, color: "#cdd3da", accent: true });
    addCitySurface(-56, -34, 18, 20, { y: 1.42, color: "#cfd5dc", accent: true });
    addCitySurface(-32, -34, 12, 20, { y: 2.1, color: "#d5dbe0", accent: true });
    addCitySurface(78, -30, 22, 18, { y: 0.78, color: "#cdd3da", accent: true });
    addCitySurface(56, -30, 18, 18, { y: 1.45, color: "#d5dbe0", accent: true });
    addCitySurface(0, -82, 34, 32, { y: -1.1, color: "#adb6c0", accent: true });
    addCitySurface(0, -82, 20, 18, { y: -2.2, color: "#a4aeb9", accent: true });
    addCitySurface(-28, 78, 28, 24, { y: 0.7, slopeX: 0.18, color: "#b8c0c9", accent: true });
    addCitySurface(30, 80, 30, 24, { y: 0.76, slopeX: -0.18, color: "#b8c0c9", accent: true });
    addCitySurface(0, 94, 40, 16, { y: 1.2, color: "#cdd3da", accent: true });
    addHalfPipe(0, 6, 30, 62, 7.2, {
        deckY: 0.14,
        deckExtension: 10,
        orientation: "x",
        color: "#aab4bf",
        deckColor: "#d6dbe0",
    });

    [
        [-84, -38, 1.75, -18],
        [-26, 28, 0.95, -8],
        [36, 88, 1.78, -8],
        [-34, 22, 1.1, 16],
        [-18, 40, 1.45, 62],
        [50, 96, 1.55, 18],
    ].forEach(([x0, x1, y, z]) => addRail(x0, x1, y, z));

    [
        [-84, 4.3, -18],
        [-54, 5.2, 20],
        [-6, 4.7, -44],
        [0, 5.3, 0],
        [18, 5.1, 58],
        [52, 5.5, -26],
        [82, 4.8, 18],
        [0, 0.9, -82],
        [0, 5.9, 95],
    ].forEach(([x, y, z]) => addPickup(x, y, z));

    [
        [-64, "barrier", -2],
        [-12, "cone", 28],
        [28, "cone", -22],
        [74, "barrier", 42],
        [10, "cone", 90],
    ].forEach(([x, type, z]) => addObstacle(x, type, z));

    [
        [-118, -102], [118, -102], [-118, 102], [118, 102],
    ].forEach(([x, z], index) => {
        addCityBlock(x, z, 18, 18, 3 + index, index % 2 === 0 ? "#7a746c" : "#6b6761");
    });
}

function createBowlMap() {
    const deckY = 4.9;
    addPerimeterWalls(BOWL_HALF_X, BOWL_HALF_Z, "#7c786f", { baseY: 1.1, height: 7.6 });

    [
        [0, -56, 156, 18],
        [0, 56, 156, 18],
        [-92, 0, 18, 126],
        [92, 0, 18, 126],
    ].forEach(([x, z, width, depth]) => {
        addCitySurface(x, z, width, depth, { y: deckY, color: "#c8ced5", accent: true });
    });

    [
        [-80.5, -56, 5, 18],
        [80.5, -56, 5, 18],
        [-80.5, 56, 5, 18],
        [80.5, 56, 5, 18],
    ].forEach(([x, z, width, depth]) => {
        addCitySurface(x, z, width, depth, { y: deckY, color: "#c8ced5", accent: true });
    });

    addHalfPipe(0, 0, 82, 144, 7.4, {
        deckY,
        deckExtension: 9,
        orientation: "z",
        color: "#a8b2bd",
        deckColor: "#d3d8de",
    });

    addCitySurface(0, -74, 38, 18, { y: 5.1, slopeZ: 0.18, color: "#bcc4cc", accent: true, solidEdges: true });
    addCitySurface(-72, 0, 18, 34, { y: 5.15, slopeX: 0.18, color: "#bcc4cc", accent: true, solidEdges: true });
    addCitySurface(72, 0, 18, 34, { y: 5.15, slopeX: -0.18, color: "#bcc4cc", accent: true, solidEdges: true });

    [
        [-66, 66, 5.08, -41],
        [-66, 66, 5.08, 41],
        [-54, 54, 5.18, -57],
        [-54, 54, 5.18, 57],
        [-34, 34, 2.45, 0],
    ].forEach(([x0, x1, y, z]) => addRail(x0, x1, y, z));

    [
        [-82, 8.0, -78],
        [-58, 7.1, 0],
        [0, 0.7, 0],
        [56, 7.1, 0],
        [82, 8.0, 78],
        [0, 8.2, 90],
        [0, 8.1, -90],
    ].forEach(([x, y, z]) => addPickup(x, y, z));

    [
        [-90, "cone", -48],
        [92, "barrier", -34],
        [-84, "barrier", 52],
        [78, "cone", 66],
    ].forEach(([x, type, z]) => addObstacle(x, type, z));

    [
        [-96, -92], [96, -92], [-96, 92], [96, 92],
    ].forEach(([x, z], index) => {
        addCityBlock(x, z, 18, 18, 3 + index, index % 2 === 0 ? "#736d66" : "#666b70");
    });
}

function createMegaBowlMap() {
    addCitySurface(0, 0, MEGA_BOWL_HALF_X * 2, MEGA_BOWL_HALF_Z * 2, { y: -3.8, color: "#8f99a4", roughness: 0.95, priority: -2 });
    addPerimeterWalls(MEGA_BOWL_HALF_X, MEGA_BOWL_HALF_Z, "#746f67", { baseY: -4.6, height: 7.4 });

    [
        [-108, 0, 56, 166],
        [108, 0, 56, 166],
        [0, -96, 156, 48],
        [0, 96, 156, 48],
        [-112, -102, 52, 36],
        [112, -102, 52, 36],
        [-112, 102, 52, 36],
        [112, 102, 52, 36],
        [0, 0, 52, 40],
    ].forEach(([x, z, width, depth]) => {
        addCitySurface(x, z, width, depth, { y: 0.04, color: "#c8ced4", accent: true });
    });

    addCitySurface(-54, 0, 38, 140, { y: -1.75, slopeX: -0.108, color: "#a8b2bd", accent: true, solidEdges: false });
    addCitySurface(54, 0, 38, 140, { y: -1.75, slopeX: 0.108, color: "#a8b2bd", accent: true, solidEdges: false });
    addCitySurface(0, -56, 132, 28, { y: -1.6, slopeZ: -0.13, color: "#aab4bf", accent: true, solidEdges: false });
    addCitySurface(0, 56, 132, 28, { y: -1.6, slopeZ: 0.13, color: "#aab4bf", accent: true, solidEdges: false });

    addCitySurface(-88, -10, 24, 94, { y: -0.75, slopeX: -0.11, color: "#b3bcc6", accent: true, solidEdges: false });
    addCitySurface(88, 10, 24, 94, { y: -0.75, slopeX: 0.11, color: "#b3bcc6", accent: true, solidEdges: false });
    addCitySurface(0, -90, 58, 20, { y: -0.8, slopeZ: -0.14, color: "#b3bcc6", accent: true, solidEdges: false });
    addCitySurface(0, 90, 58, 20, { y: -0.8, slopeZ: 0.14, color: "#b3bcc6", accent: true, solidEdges: false });

    addCitySurface(-34, -34, 26, 28, { y: -2.45, slopeX: -0.08, slopeZ: -0.09, color: "#9aa6b3", accent: true, solidEdges: false });
    addCitySurface(34, -34, 26, 28, { y: -2.45, slopeX: 0.08, slopeZ: -0.09, color: "#9aa6b3", accent: true, solidEdges: false });
    addCitySurface(-34, 34, 26, 28, { y: -2.45, slopeX: -0.08, slopeZ: 0.09, color: "#9aa6b3", accent: true, solidEdges: false });
    addCitySurface(34, 34, 26, 28, { y: -2.45, slopeX: 0.08, slopeZ: 0.09, color: "#9aa6b3", accent: true, solidEdges: false });
    addCitySurface(0, 0, 44, 44, { y: -3.74, color: "#8b96a3", accent: true });

    addCitySurface(-124, 0, 18, 40, { y: 0.5, slopeX: 0.18, color: "#bdc6ce", accent: true, solidEdges: true });
    addCitySurface(124, 0, 18, 40, { y: 0.5, slopeX: -0.18, color: "#bdc6ce", accent: true, solidEdges: true });
    addCitySurface(0, -116, 42, 18, { y: 0.46, slopeZ: 0.18, color: "#bdc6ce", accent: true, solidEdges: true });
    addCitySurface(0, 116, 42, 18, { y: 0.46, slopeZ: -0.18, color: "#bdc6ce", accent: true, solidEdges: true });
    addHalfPipe(0, 102, 30, 116, 8.6, {
        deckY: 0.04,
        deckExtension: 10,
        orientation: "z",
        color: "#a5afba",
        deckColor: "#d4d8de",
    });

    [
        [-126, -68, 1.28, -84],
        [40, 126, 1.28, -84],
        [-118, -36, 1.42, 84],
        [26, 116, 1.42, 84],
        [-32, 34, -2.7, 0],
        [-12, 48, -1.6, -40],
    ].forEach(([x0, x1, y, z]) => addRail(x0, x1, y, z));

    [
        [-126, 4.1, -88],
        [-92, 0.35, 0],
        [-42, -1.45, -38],
        [0, -0.75, 0],
        [38, -1.45, 38],
        [94, 0.3, 0],
        [126, 4.2, 88],
        [0, 4.0, 116],
        [0, 4.0, -116],
    ].forEach(([x, y, z]) => addPickup(x, y, z));

    [
        [-142, "cone", -62],
        [144, "cone", 58],
        [-138, "barrier", 94],
        [138, "barrier", -98],
        [0, "cone", 130],
    ].forEach(([x, type, z]) => addObstacle(x, type, z));

    [
        [-142, -118], [142, -118], [-142, 118], [142, 118],
    ].forEach(([x, z], index) => {
        addCityBlock(x, z, 20, 20, 3 + index, index % 2 === 0 ? "#6f6a63" : "#666f74");
    });
}

function getSurfaceInfo(x, z = 0, preferredY = null) {
    if (isOpenWorldMap()) {
        let bestMatch = null;
        let bestDistance = Number.POSITIVE_INFINITY;

        for (let index = 0; index < state.citySurfaces.length; index += 1) {
            const surface = state.citySurfaces[index];
            if (
                x < surface.minX - SURFACE_EDGE_TOLERANCE
                || x > surface.maxX + SURFACE_EDGE_TOLERANCE
                || z < surface.minZ - SURFACE_EDGE_TOLERANCE
                || z > surface.maxZ + SURFACE_EDGE_TOLERANCE
            ) {
                continue;
            }

            const sampleX = clamp(x, surface.minX, surface.maxX);
            const sampleZ = clamp(z, surface.minZ, surface.maxZ);
            const localX = sampleX - surface.centerX;
            const localZ = sampleZ - surface.centerZ;
            const candidate = {
                y: surface.y + localX * surface.slopeX + localZ * surface.slopeZ,
                angle: Math.atan(surface.slopeX),
                slopeX: surface.slopeX,
                slopeZ: surface.slopeZ,
                segment: surface,
            };

            if (preferredY !== null && Number.isFinite(preferredY)) {
                const distance = Math.abs(candidate.y - preferredY);
                if (
                    distance < bestDistance - 0.001
                    || (Math.abs(distance - bestDistance) <= 0.001 && (!bestMatch || candidate.y > bestMatch.y))
                ) {
                    bestMatch = candidate;
                    bestDistance = distance;
                }
                continue;
            }

            if (!bestMatch || candidate.y > bestMatch.y) {
                bestMatch = candidate;
            }
        }

        return bestMatch;
    }

    for (const segment of state.trackSegments) {
        if (x < segment.x0 || x > segment.x1) {
            continue;
        }
        const amount = (x - segment.x0) / Math.max(0.0001, segment.x1 - segment.x0);
        return {
            y: lerp(segment.y0, segment.y1, amount),
            angle: segment.angle,
            segment,
        };
    }
    return null;
}

function getPlayerRideHeight(player = state.player) {
    return state.equippedRideType === "board" && player.carryingBoard ? BOARD_CARRY_HEIGHT : BOARD_RIDE_HEIGHT;
}

function getPlayerSurfaceInfo(player, sampleX = player.x, sampleZ = player.z) {
    if (!isOpenWorldMap()) {
        return getSurfaceInfo(sampleX, sampleZ);
    }

    const rideHeight = getPlayerRideHeight(player);
    const supportY = player.y - rideHeight;
    const maxStepUp = player.airborne ? 0.9 : SURFACE_STEP_UP;
    const maxStepDown = player.airborne ? Math.max(6, SURFACE_STEP_DOWN + Math.abs(player.vy) * 0.08) : SURFACE_STEP_DOWN;
    let bestSupported = null;
    let bestFallback = null;
    let bestFallbackDistance = Number.POSITIVE_INFINITY;

    for (let index = 0; index < state.citySurfaces.length; index += 1) {
        const surface = state.citySurfaces[index];
        if (
            sampleX < surface.minX - SURFACE_EDGE_TOLERANCE
            || sampleX > surface.maxX + SURFACE_EDGE_TOLERANCE
            || sampleZ < surface.minZ - SURFACE_EDGE_TOLERANCE
            || sampleZ > surface.maxZ + SURFACE_EDGE_TOLERANCE
        ) {
            continue;
        }

        const clampedX = clamp(sampleX, surface.minX, surface.maxX);
        const clampedZ = clamp(sampleZ, surface.minZ, surface.maxZ);
        const localX = clampedX - surface.centerX;
        const localZ = clampedZ - surface.centerZ;
        const candidate = {
            y: surface.y + localX * surface.slopeX + localZ * surface.slopeZ,
            angle: Math.atan(surface.slopeX),
            slopeX: surface.slopeX,
            slopeZ: surface.slopeZ,
            segment: surface,
        };
        const verticalOffset = candidate.y - supportY;
        const surfaceSlope = Math.hypot(surface.slopeX, surface.slopeZ);
        const candidateStepUp = !player.airborne && surfaceSlope > 0.035
            ? Math.max(maxStepUp, 3.35)
            : maxStepUp;
        const distance = Math.abs(verticalOffset);
        const priority = Number.isFinite(surface.priority) ? surface.priority : 0;
        const bestSupportedPriority = bestSupported && Number.isFinite(bestSupported.segment.priority)
            ? bestSupported.segment.priority
            : 0;

        if (distance < bestFallbackDistance - 0.001 || (Math.abs(distance - bestFallbackDistance) <= 0.001 && (!bestFallback || candidate.y > bestFallback.y))) {
            bestFallback = candidate;
            bestFallbackDistance = distance;
        }

        if (verticalOffset > candidateStepUp || verticalOffset < -maxStepDown) {
            continue;
        }

        if (
            !bestSupported
            || priority > bestSupportedPriority
            || (
                priority === bestSupportedPriority
                && (
                    distance < Math.abs(bestSupported.y - supportY) - 0.001
                    || (Math.abs(distance - Math.abs(bestSupported.y - supportY)) <= 0.001 && candidate.y > bestSupported.y)
                )
            )
        ) {
            bestSupported = candidate;
        }
    }

    return bestSupported || bestFallback;
}

function getSurfaceTravelAngle(player, surface) {
    const slopeX = surface && Number.isFinite(surface.slopeX) ? surface.slopeX : 0;
    const slopeZ = surface && Number.isFinite(surface.slopeZ) ? surface.slopeZ : 0;
    const heading = Number.isFinite(player.heading) ? player.heading : 0;
    const travelSlope = slopeX * Math.cos(heading) - slopeZ * Math.sin(heading);
    return Math.atan(travelSlope);
}

function getRailUnderPlayer() {
    const player = state.player;
    if (player.vy > -2.5 || player.carryingBoard) {
        return null;
    }

    return state.rails.find((rail) => {
        return player.x > rail.x0 + 0.8 && player.x < rail.x1 - 0.8 && Math.abs(player.z - rail.z) < 1.1 && Math.abs(player.y - (rail.y + 0.28)) < 0.75;
    }) || null;
}

function generateStarterCourse() {
    if (state.selectedMap === "city") {
        createCityMap();
        return;
    }

    if (state.selectedMap === "skatepark") {
        createReplicaSkatepark();
        return;
    }

    if (state.selectedMap === "bowl") {
        createBowlMap();
        return;
    }

    if (state.selectedMap === "megabowl") {
        createMegaBowlMap();
        return;
    }

    addTrackSegment(0, 28, 0, 0);
    addTrackSegment(28, 44, 0, 4.8);
    addTrackSegment(44, 58, 4.8, 4.8);
    addRail(46, 56, 5.9, 0);
    addPickup(52, 8.4, 0);
    addTrackSegment(58, 72, 4.8, 1.2);
    state.generationCursor = 88;
    addTrackSegment(88, 110, 1.2, 0);
    addObstacle(102, "cone", -2.2);
    addTrackSegment(110, 138, 0, 0);
    addPickup(124, 4.2, 2.4);
    addPropCluster(16);
    addPropCluster(84);
}

function decorateSegment(x0, x1, y0, y1) {
    if (state.selectedMap === "skatepark") {
        const length = x1 - x0;
        if (length > 8 && Math.random() < 0.82) {
            addRail(x0 + 1.2, x1 - 1.2, Math.max(y0, y1) + randomBetween(1.2, 2.2), randomBetween(-3.4, 3.4));
        }
        if (length > 8 && Math.random() < 0.78) {
            addPickup(x0 + length * randomBetween(0.28, 0.74), Math.max(y0, y1) + randomBetween(3, 5.6), randomBetween(-3, 3));
        }
        if (length > 10 && Math.random() < 0.35) {
            addObstacle(x0 + length * randomBetween(0.35, 0.7), Math.random() < 0.4 ? "barrier" : "cone", randomBetween(-3.2, 3.2));
        }
        return;
    }

    const length = x1 - x0;
    const flatEnough = Math.abs(y1 - y0) < 1.2;
    if (flatEnough && length > 16 && Math.random() < 0.6) {
        addRail(x0 + 2, x1 - 2, Math.max(y0, y1) + 1.4, randomBetween(-2.6, 2.6));
    }

    if (length > 12 && Math.random() < 0.65) {
        addPickup(x0 + length * randomBetween(0.35, 0.75), Math.max(y0, y1) + randomBetween(3.4, 5.2));
    }

    if (flatEnough && length > 14 && Math.random() < 0.55) {
        addObstacle(x0 + length * randomBetween(0.28, 0.76), Math.random() < 0.25 ? "barrier" : "cone");
    }

    if (Math.random() < 0.48) {
        addPropCluster(x0 + length * 0.5);
    }
}

function generateWorldAhead(targetX) {
    if (isOpenWorldMap()) {
        return;
    }

    while (state.generationCursor < targetX) {
        const start = state.generationCursor;
        const currentY = state.terrainY;
        const roll = Math.random();

        if (roll < 0.22) {
            const end = start + randomBetween(18, 30);
            const nextY = clamp(currentY + randomBetween(-2, 2.2), -2, 9);
            addTrackSegment(start, end, currentY, nextY);
            decorateSegment(start, end, currentY, nextY);
            continue;
        }

        if (roll < 0.46) {
            const rise = clamp(currentY + randomBetween(2.8, 5.2), -1, 12);
            const rampEnd = start + randomBetween(10, 16);
            const plateauEnd = rampEnd + randomBetween(10, 15);
            const dropEnd = plateauEnd + randomBetween(12, 18);
            addTrackSegment(start, rampEnd, currentY, rise);
            addTrackSegment(rampEnd, plateauEnd, rise, rise);
            addTrackSegment(plateauEnd, dropEnd, rise, clamp(currentY + randomBetween(-1.5, 1.5), -2, 9));
            decorateSegment(rampEnd, plateauEnd, rise, rise);
            continue;
        }

        if (roll < 0.64) {
            const dip = clamp(currentY - randomBetween(2.2, 4.8), -4, 7);
            const dipEnd = start + randomBetween(12, 18);
            const riseEnd = dipEnd + randomBetween(14, 22);
            addTrackSegment(start, dipEnd, currentY, dip);
            addTrackSegment(dipEnd, riseEnd, dip, clamp(currentY + randomBetween(-0.8, 2), -1, 8));
            decorateSegment(dipEnd, riseEnd, dip, state.terrainY);
            continue;
        }

        if (roll < 0.82) {
            const takeoffEnd = start + randomBetween(10, 15);
            const gapWidth = randomBetween(9, 16);
            const landingStart = takeoffEnd + gapWidth;
            const landingY = clamp(currentY + randomBetween(-1.2, 1.8), -2, 8);
            const landingEnd = landingStart + randomBetween(16, 24);
            addTrackSegment(start, takeoffEnd, currentY, currentY + randomBetween(0.8, 1.8));
            state.generationCursor = landingStart;
            addTrackSegment(landingStart, landingEnd, landingY, clamp(landingY + randomBetween(-1, 1.3), -2, 8));
            addPickup(landingStart + 4, landingY + 4.2, randomBetween(-2.8, 2.8));
            continue;
        }

        const flatEnd = start + randomBetween(16, 28);
        addTrackSegment(start, flatEnd, currentY, currentY);
        decorateSegment(start, flatEnd, currentY, currentY);
    }
}

function pruneCollection(collection, keepEntry) {
    const kept = [];
    for (const entry of collection) {
        if (keepEntry(entry)) {
            kept.push(entry);
            continue;
        }
        removeRoot(entry);
    }
    return kept;
}

function pruneWorld() {
    if (isOpenWorldMap()) {
        return;
    }

    const cutoff = state.player.x - 50;
    state.trackSegments = pruneCollection(state.trackSegments, (segment) => segment.x1 > cutoff);
    state.rails = pruneCollection(state.rails, (rail) => rail.x1 > cutoff);
    state.obstacles = pruneCollection(state.obstacles, (obstacle) => obstacle.x > cutoff && !obstacle.hit);
    state.pickups = pruneCollection(state.pickups, (pickup) => pickup.x > cutoff && !pickup.collected);
    state.props = pruneCollection(state.props, (prop) => prop.x > cutoff - 25);
}

function startRun(fromNetwork = false) {
    if (!fromNetwork && !ensureUsername()) {
        return;
    }
    if (isVersusMode() && !fromNetwork) {
        if (!isOnlineHost()) {
            updateOnlineStatus(onlineState.connected ? "Only the host can start an online run." : "Host a room or join a room first.");
            renderMenu();
            return;
        }
        broadcastToGuests({
            type: "start-run",
            mapId: state.selectedMap,
            competitionEnabled: state.competition.enabled,
            competitionStartedAt: state.time,
        });
    }
    clearWorld();
    applyMapTheme();
    applyRideSkin();
    state.mode = "playing";
    state.menuVisible = false;
    state.activeRunMap = state.selectedMap;
    state.score = 0;
    state.hudPulse = 0;
    state.lastScoreEvent = isVersusMode() ? "Online drop in" : "Drop in";
    state.lastRunCoins = 0;
    resetCompetitionRoundState();
    state.competition.startedAt = state.competition.enabled ? state.time : 0;
    if (state.competition.enabled && !isVersusMode()) {
        startSoloCompetitionBotRound();
        state.lastScoreEvent = `${state.competition.bot.name} AI dropped in. Beat ${formatScore(state.competition.bot.targetScore)}.`;
    }
    onlineState.competition.enabled = state.competition.enabled;
    onlineState.competition.finished = false;
    onlineState.competition.startedAt = state.competition.startedAt;
    onlineState.competition.standings = new Map();
    state.player = createPlayer();
    state.generationCursor = 0;
    state.terrainY = 0;
    generateStarterCourse();
    generateWorldAhead(FAR_AHEAD);
    if (state.selectedMap === "city") {
        state.player.x = -148;
        state.player.z = -34;
    } else if (state.selectedMap === "megabowl") {
        state.player.x = -132;
        state.player.z = -88;
    } else if (state.selectedMap === "bowl") {
        state.player.x = -82;
        state.player.z = -62;
    } else if (state.selectedMap === "skatepark") {
        state.player.x = -88;
        state.player.z = -8;
    }
    const surface = getSurfaceInfo(state.player.x, state.player.z);
    state.player.y = ((surface && surface.y) || 0) + getPlayerRideHeight(state.player);
    if (state.competition.enabled && !isVersusMode()) {
        state.competition.bot.x = state.player.x - 10;
        state.competition.bot.z = state.player.z + 7;
        state.competition.bot.y = state.player.y;
        state.competition.bot.heading = state.player.heading;
        state.competition.bot.surfaceAngle = state.player.surfaceAngle;
        syncSoloCompetitionBotAvatar();
    }
    updatePlayerVisuals();
    updateCamera();
    updateCompetitionScore(true);
    broadcastLocalSnapshot(true);
    renderMenu();
}

function normalizedAngle(angle) {
    return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function landingError(player) {
    return Math.max(
        Math.abs(normalizedAngle(player.trickFlip)),
        Math.abs(normalizedAngle(player.trickSpin)),
        Math.abs(normalizedAngle(player.trickRoll)),
        Math.abs(normalizedAngle(player.bodySpin)),
        Math.abs(normalizedAngle(player.scooterBarSpin)),
        Math.abs(normalizedAngle(player.scooterTailwhip))
    );
}

function cashOutCombo() {
    const player = state.player;
    if (player.comboPoints <= 0) {
        return;
    }
    const landedScore = Math.round(player.comboPoints * player.comboMultiplier);
    state.score += landedScore;
    state.best = Math.max(state.best, state.score);
    saveBestScore();
    state.hudPulse = 1;
    state.lastScoreEvent = `Landed ${player.comboMoves.join(" + ")} for ${formatScore(landedScore)}`;
    player.comboPoints = 0;
    player.comboMultiplier = 1;
    player.comboMoves = [];
    updateCompetitionScore();
}

function crash() {
    if (state.mode !== "playing") {
        return;
    }
    state.best = Math.max(state.best, state.score);
    state.competition.finalScore = state.score;
    state.lastRunCoins = Math.max(0, Math.round(state.score / 180));
    if (state.lastRunCoins > 0) {
        state.coins += state.lastRunCoins;
        saveProfile();
    }
    state.hudPulse = 1;
    saveBestScore();

    if (isVersusMode()) {
        state.mode = "menu";
        state.menuVisible = true;
        state.activeMenuPanel = "home";
        updateCompetitionScore(true);
        state.lastScoreEvent = state.lastRunCoins > 0
            ? `You bailed and banked ${formatScore(state.lastRunCoins)} coins. Start again when ready.`
            : "You bailed. Start again when ready.";
        renderMenu();
        return;
    }

    state.mode = "crashed";
    removeSoloCompetitionBotAvatar();
    state.lastScoreEvent = state.lastRunCoins > 0 ? `Run over. Coins earned ${formatScore(state.lastRunCoins)}` : "Run over";
    openMenu("home");
}

function handleJump() {
    if (state.mode !== "playing") {
        return;
    }

    const player = state.player;
    if (player.carryingBoard) {
        return;
    }
    if (player.grinding) {
        leaveGrind(player, JUMP_VELOCITY * 0.82);
        return;
    }

    if (player.manualing) {
        endManual(player, false);
    }

    if (!player.airborne) {
        player.airborne = true;
        player.vy = JUMP_VELOCITY + player.crouch * 7 + Math.max(0, player.surfaceAngle) * 8;
        player.y += 0.12;
    }
}

function canToggleBoardCarry(player = state.player) {
    return state.mode === "playing"
        && !state.menuVisible
        && state.equippedRideType === "board"
        && !player.airborne
        && !player.grinding;
}

function toggleBoardCarry(player = state.player) {
    if (!canToggleBoardCarry(player)) {
        return false;
    }

    if (player.manualing) {
        endManual(player, false);
    }

    player.carryingBoard = !player.carryingBoard;
    player.speed = Math.min(player.speed, player.carryingBoard ? WALK_SPEED : MAX_SPEED);
    player.vx = clamp(player.vx, -WALK_SPEED, WALK_SPEED);
    player.vz = clamp(player.vz, -WALK_SPEED, WALK_SPEED);
    const surface = isOpenWorldMap() ? getPlayerSurfaceInfo(player) : getSurfaceInfo(player.x, player.z);
    if (surface) {
        player.y = surface.y + getPlayerRideHeight(player);
    }
    state.lastScoreEvent = player.carryingBoard ? "Board picked up" : "Board put down";
    state.hudPulse = Math.max(state.hudPulse, 0.3);
    return true;
}

function canStartManual(player = state.player) {
    return state.mode === "playing"
        && !state.menuVisible
        && state.equippedRideType === "board"
        && !player.carryingBoard
        && !player.airborne
        && !player.grinding
        && player.speed > 6;
}

function startManual(player = state.player) {
    if (player.manualing) {
        return true;
    }
    if (!canStartManual(player) || state.time - player.lastManualAt < 0.2) {
        return false;
    }

    player.manualing = true;
    player.manualDuration = 0;
    player.lastManualAt = state.time;
    player.comboMoves.push("Manual");
    player.comboMultiplier = Math.max(player.comboMultiplier, 2);
    state.lastScoreEvent = "Manual locked in";
    state.hudPulse = Math.max(state.hudPulse, 0.35);
    return true;
}

function endManual(player = state.player, bankScore = true) {
    if (!player.manualing) {
        return false;
    }

    const shortManual = player.manualDuration < 0.08;
    player.manualing = false;
    player.manualDuration = 0;
    player.lastManualAt = state.time;
    if (shortManual && player.comboMoves[player.comboMoves.length - 1] === "Manual") {
        player.comboMoves.pop();
        if (player.comboMoves.length === 0 && player.comboPoints <= 0) {
            player.comboMultiplier = 1;
        }
    }
    if (bankScore && !player.airborne && !player.grinding && player.comboPoints > 0) {
        cashOutCombo();
    }
    return true;
}

function performTrick(trick) {
    const player = state.player;
    if (state.mode !== "playing" || !player.airborne || player.grinding || player.carryingBoard) {
        return;
    }
    if (state.time - player.lastTrickAt < 0.18 || player.tricksThisAir >= 4) {
        return;
    }

    player.lastTrickAt = state.time;
    player.tricksThisAir += 1;
    player.comboPoints += trick.points;
    player.comboMoves.push(trick.name);
    player.comboMultiplier = clamp(1 + Math.floor(player.comboMoves.length / 2), 1, 6);
    state.lastScoreEvent = `${trick.name} queued for ${formatScore(trick.points)}`;
    player.trickFlipVelocity += trick.flipVelocity || 0;
    player.trickSpinVelocity += trick.spinVelocity || 0;
    player.trickRollVelocity += trick.rollVelocity || 0;
    player.bodySpinVelocity += trick.bodyVelocity || 0;
    player.scooterBarSpinVelocity += trick.barVelocity || 0;
    player.scooterTailwhipVelocity += trick.whipVelocity || 0;
}

function resetTrickState(player) {
    player.trickFlip = 0;
    player.trickFlipVelocity = 0;
    player.trickSpin = 0;
    player.trickSpinVelocity = 0;
    player.trickRoll = 0;
    player.trickRollVelocity = 0;
    player.bodySpin = 0;
    player.bodySpinVelocity = 0;
    player.scooterBarSpin = 0;
    player.scooterBarSpinVelocity = 0;
    player.scooterTailwhip = 0;
    player.scooterTailwhipVelocity = 0;
}

function updateTrickMotion(player, delta) {
    player.trickFlip += player.trickFlipVelocity * delta;
    player.trickSpin += player.trickSpinVelocity * delta;
    player.trickRoll += player.trickRollVelocity * delta;
    player.bodySpin += player.bodySpinVelocity * delta;
    player.scooterBarSpin += player.scooterBarSpinVelocity * delta;
    player.scooterTailwhip += player.scooterTailwhipVelocity * delta;
    player.trickFlipVelocity *= 0.986;
    player.trickSpinVelocity *= 0.988;
    player.trickRollVelocity *= 0.986;
    player.bodySpinVelocity *= 0.989;
    player.scooterBarSpinVelocity *= 0.988;
    player.scooterTailwhipVelocity *= 0.986;
}

function dampTrickMotion(player, amount) {
    player.trickFlipVelocity *= amount;
    player.trickSpinVelocity *= amount;
    player.trickRollVelocity *= amount;
    player.bodySpinVelocity *= amount;
    player.scooterBarSpinVelocity *= amount;
    player.scooterTailwhipVelocity *= amount;
}

function updateManualState(player, delta) {
    if (!player.manualing) {
        return;
    }

    if (state.equippedRideType !== "board" || player.carryingBoard || player.airborne || player.grinding || player.speed < 5.5) {
        endManual(player, !player.airborne && !player.grinding);
        return;
    }

    player.manualDuration += delta;
    player.comboPoints += (68 + player.speed * 1.35) * delta;
    player.comboMultiplier = Math.max(player.comboMultiplier, 2);
}

function updateCityPlayer(delta) {
    const player = state.player;
    const bounds = getActiveWorldBounds();
    const rideHeight = getPlayerRideHeight(player);
    const carryingBoard = state.equippedRideType === "board" && player.carryingBoard;
    const forwardInput = Number(state.keys.has("ArrowUp") || state.keys.has("KeyW")) - Number(state.keys.has("ArrowDown") || state.keys.has("KeyS"));
    const strafeInput = Number(state.keys.has("KeyD") || state.keys.has("ArrowRight")) - Number(state.keys.has("KeyA") || state.keys.has("ArrowLeft"));
    const crouching = state.keys.has("ArrowDown") || state.keys.has("KeyS");

    const forwardX = Math.cos(state.cameraOrbit.yaw);
    const forwardZ = -Math.sin(state.cameraOrbit.yaw);
    const rightX = -forwardZ;
    const rightZ = forwardX;
    const inputMagnitude = Math.hypot(forwardInput, strafeInput) || 1;

    if (!player.airborne && !player.grinding) {
        const acceleration = carryingBoard ? 13 : crouching ? 15 : 22;
        player.vx += ((forwardX * forwardInput + rightX * strafeInput) / inputMagnitude) * acceleration * delta;
        player.vz += ((forwardZ * forwardInput + rightZ * strafeInput) / inputMagnitude) * acceleration * delta;
        if (forwardInput === 0 && strafeInput === 0) {
            const coastDamping = Math.max(0, 1 - (carryingBoard ? 5.2 : 2.4) * delta);
            player.vx *= coastDamping;
            player.vz *= coastDamping;
        }
    }

    if (player.airborne) {
        player.vx *= 0.998;
        player.vz *= 0.998;
    }

    const horizontalSpeedLimit = carryingBoard ? WALK_SPEED : MAX_SPEED;
    player.vx = clamp(player.vx, -horizontalSpeedLimit, horizontalSpeedLimit);
    player.vz = clamp(player.vz, -horizontalSpeedLimit, horizontalSpeedLimit);
    player.x += player.vx * delta;
    player.z += player.vz * delta;
    const clampedX = clamp(player.x, -bounds.halfX + 2.2, bounds.halfX - 2.2);
    const clampedZ = clamp(player.z, -bounds.halfZ + 2.2, bounds.halfZ - 2.2);
    if (clampedX !== player.x) {
        player.x = clampedX;
        player.vx *= -0.22;
        player.speed *= 0.94;
    }
    if (clampedZ !== player.z) {
        player.z = clampedZ;
        player.vz *= -0.22;
        player.speed *= 0.94;
    }
    player.crouch = crouching ? clamp(player.crouch + delta * 2.2, 0, 1) : clamp(player.crouch - delta * 3, 0, 1);

    if (player.grinding) {
        const rail = player.grindRail;
        const grindDirection = player.grindDirection || 1;
        const railExitReached = rail && (grindDirection > 0
            ? player.x >= rail.x1 - 0.3
            : player.x <= rail.x0 + 0.3);
        if (!rail || railExitReached) {
            leaveGrind(player, 4);
        } else {
            player.x += 16 * grindDirection * delta;
            player.z = lerp(player.z, rail.z, 0.22);
            player.y = rail.y + 0.3;
            player.vx = 16 * grindDirection;
            player.vz = 0;
            player.vy = 0;
            player.surfaceAngle = 0;
            player.comboPoints += 24 * delta;
            player.comboMultiplier = Math.max(player.comboMultiplier, 2);
            queueBaseGrindMove(player);
        }
    }

    if (!player.grinding && player.airborne) {
        player.vy -= GRAVITY * delta;
        player.y += player.vy * delta;
        updateTrickMotion(player, delta);

        const rail = getRailUnderPlayer();
        if (rail) {
            enterGrind(player, rail);
            return;
        }

        const surface = getPlayerSurfaceInfo(player);
        if (surface && player.vy <= 0 && player.y <= surface.y + rideHeight) {
            if (landingError(player) > 0.5) {
                crash();
                return;
            }
            player.airborne = false;
            player.y = surface.y + rideHeight;
            player.vy = 0;
            player.surfaceAngle = getSurfaceTravelAngle(player, surface);
            resetTrickState(player);
            player.tricksThisAir = 0;
            cashOutCombo();
            return;
        }

        if (player.y < -12) {
            crash();
        }
        return;
    }

    if (!player.manualing && state.keys.has("KeyZ")) {
        startManual(player);
    }

    const surface = getPlayerSurfaceInfo(player);
    if (!surface) {
        endManual(player, false);
        player.airborne = true;
        player.vy = Math.max(2, Math.hypot(player.vx, player.vz) * 0.15);
        return;
    }

    const currentSurfaceAngle = getSurfaceTravelAngle(player, surface);
    if (carryingBoard) {
        player.airborne = false;
        player.y = surface.y + rideHeight;
        player.surfaceAngle = currentSurfaceAngle;
        player.speed = clamp(Math.hypot(player.vx, player.vz), 0, WALK_SPEED);
        if (player.speed > 0.2) {
            player.heading = Math.atan2(-player.vz, player.vx);
        }
        player.bodyLean = lerp(player.bodyLean, clamp(-player.vz * 0.028 + player.vx * 0.008, -0.25, 0.25), 0.18);
        dampTrickMotion(player, 0.78);
        return;
    }
    const travelSpeed = Math.hypot(player.vx, player.vz);
    const travelHeading = travelSpeed > 0.45 ? Math.atan2(-player.vz, player.vx) : player.heading;
    const sampleDistance = clamp(1.1 + player.speed * 0.05, 1.1, 3.1);
    const farSampleDistance = sampleDistance + 0.8;
    const aheadX = player.x + Math.cos(travelHeading) * sampleDistance;
    const aheadZ = player.z - Math.sin(travelHeading) * sampleDistance;
    const farAheadX = player.x + Math.cos(travelHeading) * farSampleDistance;
    const farAheadZ = player.z - Math.sin(travelHeading) * farSampleDistance;
    const aheadSurface = getSurfaceInfo(aheadX, aheadZ);
    const farAheadSurface = getSurfaceInfo(farAheadX, farAheadZ);
    const lipDropsAway = !aheadSurface || aheadSurface.y < surface.y - 0.24;
    const farLipDropsAway = !farAheadSurface || farAheadSurface.y < surface.y - 0.38;

    if (
        currentSurfaceAngle > 0.025
        && (lipDropsAway || farLipDropsAway)
    ) {
        endManual(player, false);
        player.airborne = true;
        player.y = surface.y + rideHeight + 0.08;
        player.surfaceAngle = currentSurfaceAngle;
        player.vy = Math.max(4.2, player.speed * Math.max(0.11, currentSurfaceAngle + 0.13));
        return;
    }

    player.airborne = false;
    player.y = surface.y + rideHeight;
    const slopeForce = crouching ? 36 : 28;
    player.vx += -(surface.slopeX || 0) * slopeForce * delta;
    player.vz += -(surface.slopeZ || 0) * slopeForce * delta;
    updateManualState(player, delta);
    player.surfaceAngle = currentSurfaceAngle;
    player.trickFlipVelocity *= 0.82;
    player.trickSpinVelocity *= 0.82;
    player.trickRollVelocity *= 0.82;
    player.bodySpinVelocity *= 0.82;
    player.scooterBarSpinVelocity *= 0.82;
    player.scooterTailwhipVelocity *= 0.82;
    player.speed = clamp(Math.hypot(player.vx, player.vz), 0, MAX_SPEED);
    if (player.speed > 0.4) {
        player.heading = Math.atan2(-player.vz, player.vx);
    }
    player.bodyLean = lerp(player.bodyLean, clamp(-player.vz * 0.035 + player.vx * 0.01, -0.4, 0.4), 0.18);
}

function updatePlayer(delta) {
    if (isOpenWorldMap()) {
        updateCityPlayer(delta);
        return;
    }

    const player = state.player;
    const carryingBoard = state.equippedRideType === "board" && player.carryingBoard;
    const rideHeight = getPlayerRideHeight(player);
    const steer = Number(state.keys.has("ArrowRight") || state.keys.has("KeyD")) - Number(state.keys.has("ArrowLeft") || state.keys.has("KeyA"));
    const accelerate = Number(state.keys.has("ArrowUp") || state.keys.has("KeyW"));
    const crouching = state.keys.has("ArrowDown") || state.keys.has("KeyS");

    if (carryingBoard) {
        const forwardInput = accelerate - Number(crouching);
        player.speed += forwardInput * 18 * delta;
        player.speed *= Math.max(0, 1 - 4.4 * delta);
        player.speed = clamp(player.speed, -WALK_SPEED * 0.45, WALK_SPEED);
    } else {
        player.speed += accelerate * 22 * delta;
        player.speed -= (crouching ? 4 : 2.2) * delta;
        player.speed = clamp(player.speed, MIN_SPEED, MAX_SPEED);
    }

    player.lateralVelocity += steer * (player.airborne ? 7.5 : carryingBoard ? 8 : 12) * delta;
    player.lateralVelocity = clamp(player.lateralVelocity, carryingBoard ? -5.5 : -8.5, carryingBoard ? 5.5 : 8.5);
    player.z += player.lateralVelocity * delta;
    player.crouch = crouching ? clamp(player.crouch + delta * 2.2, 0, 1) : clamp(player.crouch - delta * 3, 0, 1);
    player.x += player.speed * delta * (player.grinding ? (player.grindDirection || 1) : 1);

    if (player.grinding) {
        const rail = player.grindRail;
        const grindDirection = player.grindDirection || 1;
        const railExitReached = rail && (grindDirection > 0
            ? player.x >= rail.x1 - 0.3
            : player.x <= rail.x0 + 0.3);
        if (!rail || railExitReached) {
            leaveGrind(player, 4);
        } else {
            player.y = rail.y + 0.3;
            player.z = lerp(player.z, rail.z, 0.22);
            player.vy = 0;
            player.surfaceAngle = 0;
            player.speed = clamp(player.speed + 3 * delta, MIN_SPEED, MAX_SPEED + 3);
            player.heading = grindDirection > 0 ? 0 : Math.PI;
            player.comboPoints += 24 * delta;
            player.comboMultiplier = Math.max(player.comboMultiplier, 2);
            queueBaseGrindMove(player);
        }
    }

    if (!player.grinding && player.airborne) {
        player.vy -= GRAVITY * delta;
        player.y += player.vy * delta;
        updateTrickMotion(player, delta);

        const rail = getRailUnderPlayer();
        if (rail) {
            enterGrind(player, rail);
            return;
        }

        const surface = getSurfaceInfo(player.x);
        if (surface && player.vy <= 0 && player.y <= surface.y + rideHeight) {
            if (Math.abs(player.z) > TRACK_HALF - 0.8 || landingError(player) > 0.5) {
                crash();
                return;
            }
            player.airborne = false;
            player.y = surface.y + rideHeight;
            player.vy = 0;
            player.surfaceAngle = surface.angle;
            resetTrickState(player);
            player.tricksThisAir = 0;
            cashOutCombo();
            return;
        }

        if (player.y < -18) {
            crash();
        }
        return;
    }

    if (!player.manualing && state.keys.has("KeyZ")) {
        startManual(player);
    }

    if (!player.airborne && !player.grinding) {
        const surface = getSurfaceInfo(player.x);
        const ahead = getSurfaceInfo(player.x + 0.6);
        if (!surface || !ahead) {
            endManual(player, false);
            player.airborne = true;
            player.vy = Math.max(3, player.speed * Math.max(0.08, player.surfaceAngle + 0.12));
            return;
        }
        if (Math.abs(player.z) > TRACK_HALF - 0.8) {
            crash();
            return;
        }

        player.y = surface.y + rideHeight;
        player.surfaceAngle = ahead.angle;
        player.speed += carryingBoard ? 0 : clamp(-surface.angle * 12, -4, 8) * delta;
        player.lateralVelocity *= 0.88;
        if (!carryingBoard) {
            updateManualState(player, delta);
        }
        dampTrickMotion(player, 0.82);
    }

    player.bodyLean = lerp(player.bodyLean, -player.lateralVelocity * (carryingBoard ? 0.035 : 0.06), 0.16);
}

function updatePickups(delta) {
    const player = state.player;
    state.pickups.forEach((pickup) => {
        if (pickup.collected) {
            return;
        }
        pickup.root.rotation.y += delta * 1.8;
        pickup.root.position.y = pickup.y + Math.sin(state.time * 3 + pickup.bob) * 0.3;

        const dx = player.x - pickup.x;
        const dy = player.y + 0.8 - pickup.root.position.y;
        const dz = player.z - pickup.z;
        if (Math.hypot(dx, dy, dz) < 1.2) {
            pickup.collected = true;
            state.score += 180;
            state.best = Math.max(state.best, state.score);
            state.hudPulse = 1;
            state.lastScoreEvent = "Tape collected +180";
            player.comboPoints += 90;
            player.comboMoves.push("Tape");
            updateCompetitionScore();
            removeRoot(pickup);
        }
    });
}

function updateObstacles() {
    if (isOpenWorldMap()) {
        return;
    }

    const player = state.player;
    state.obstacles.forEach((obstacle) => {
        if (obstacle.hit || Math.abs(player.x - obstacle.x) > 1.2) {
            return;
        }

        const lateral = Math.abs(player.z - obstacle.z);
        const clearance = player.y - (obstacle.y + obstacle.height);
        if (lateral < obstacle.radius && clearance < 0.9 && !player.grinding) {
            obstacle.hit = true;
            crash();
        }
    });
}

function updateSolidCollisions() {
    if (!isOpenWorldMap()) {
        return;
    }

    const player = state.player;
    const radius = 0.72;

    state.solids.forEach((solid) => {
        if (player.y + 0.35 < solid.y || player.y - 1.6 > solid.topY) {
            return;
        }

        const minX = solid.minX - radius;
        const maxX = solid.maxX + radius;
        const minZ = solid.minZ - radius;
        const maxZ = solid.maxZ + radius;

        if (player.x <= minX || player.x >= maxX || player.z <= minZ || player.z >= maxZ) {
            return;
        }

        const pushLeft = player.x - minX;
        const pushRight = maxX - player.x;
        const pushTop = player.z - minZ;
        const pushBottom = maxZ - player.z;
        const minPush = Math.min(pushLeft, pushRight, pushTop, pushBottom);
        const recoil = solid.recoil || 0.18;

        if (minPush === pushLeft) {
            player.x = minX;
            player.vx = -Math.abs(player.vx) * recoil;
        } else if (minPush === pushRight) {
            player.x = maxX;
            player.vx = Math.abs(player.vx) * recoil;
        } else if (minPush === pushTop) {
            player.z = minZ;
            player.vz = -Math.abs(player.vz) * recoil;
        } else {
            player.z = maxZ;
            player.vz = Math.abs(player.vz) * recoil;
        }

        player.speed *= 0.94;
        player.lateralVelocity *= 0.6;
        if (state.time - player.lastBumpAt > 0.28) {
            player.lastBumpAt = state.time;
            state.lastScoreEvent = "Clipped a wall";
            state.hudPulse = Math.max(state.hudPulse, 0.35);
        }
    });
}

function updateCamera() {
    const player = state.player;
    farGround.position.x = player.x + 120;
    sunMesh.position.x = player.x + (isOpenWorldMap() ? 60 : 110);

    if (isOpenWorldMap()) {
        const orbitDistance = CAMERA_DISTANCE;
        const orbitRadius = Math.cos(state.cameraOrbit.pitch) * orbitDistance;
        const offsetX = -Math.cos(state.cameraOrbit.yaw) * orbitRadius;
        const offsetZ = Math.sin(state.cameraOrbit.yaw) * orbitRadius;
        const offsetY = Math.sin(state.cameraOrbit.pitch) * orbitDistance + CAMERA_HEIGHT;

        state.cameraLookAt.set(player.x, player.y + 2.4, player.z);
        state.cameraTarget.set(
            state.cameraLookAt.x + offsetX,
            state.cameraLookAt.y + offsetY,
            state.cameraLookAt.z + offsetZ
        );
        camera.position.lerp(state.cameraTarget, CAMERA_LERP);
        camera.lookAt(state.cameraLookAt);
        return;
    }

    const lookDistance = 10;
    const orbitDistance = CAMERA_DISTANCE;
    const orbitRadius = Math.cos(state.cameraOrbit.pitch) * orbitDistance;
    const offsetX = -Math.cos(state.cameraOrbit.yaw) * orbitRadius;
    const offsetZ = Math.sin(state.cameraOrbit.yaw) * orbitRadius;
    const offsetY = Math.sin(state.cameraOrbit.pitch) * orbitDistance + CAMERA_HEIGHT;

    state.cameraLookAt.set(player.x + lookDistance, player.y + 2.4, player.z);
    state.cameraTarget.set(
        state.cameraLookAt.x + offsetX,
        state.cameraLookAt.y + offsetY,
        state.cameraLookAt.z + offsetZ
    );
    camera.position.lerp(state.cameraTarget, CAMERA_LERP);
    camera.lookAt(state.cameraLookAt);
}

function updatePlayerVisuals() {
    const player = state.player;
    const surface = isOpenWorldMap() ? getPlayerSurfaceInfo(player) : null;
    const usingScooter = state.equippedRideType === "scooter";
    const usingBike = state.equippedRideType === "bike";
    const usingBoard = !usingScooter && !usingBike;
    const carryingBoard = usingBoard && player.carryingBoard;
    const activeRideGroup = usingBike ? bikeGroup : usingScooter ? scooterGroup : boardGroup;
    const rideYawOffset = usingScooter ? Math.PI : 0;
    const grounded = !player.airborne && !player.grinding;
    const manualing = usingBoard && player.manualing;
    const manualYawOffset = manualing ? Math.PI : 0;
    const boardWheelDirection = manualing ? -1 : 1;
    const speedRatio = clamp(player.speed / (carryingBoard ? WALK_SPEED : MAX_SPEED), 0, 1);
    const motionPhase = state.time * (4 + player.speed * 0.9);
    const stride = grounded ? Math.sin(motionPhase) * speedRatio : 0;
    const bounce = grounded ? Math.abs(Math.sin(motionPhase * 2)) * 0.045 * speedRatio : Math.sin(state.time * 9) * 0.03;
    const boardBob = grounded ? Math.sin(motionPhase * 2) * 0.02 * speedRatio : Math.sin(state.time * 8) * 0.05;
    const boardPitch = grounded ? -player.crouch * 0.12 + bounce * 0.8 + (manualing ? 0.32 : 0) : 0.08;
    const boardRoll = player.grinding ? 0.08 : 0;
    const scooterBarTurn = usingScooter ? player.scooterBarSpin : 0;
    const scooterDeckTurn = usingScooter ? player.scooterTailwhip : 0;
    const bikeBarTurn = usingBike ? player.scooterBarSpin : 0;
    const bikeFrameTurn = usingBike ? player.scooterTailwhip * 0.72 : 0;

    playerRoot.position.set(player.x, player.y, player.z);

    wheelMeshes.forEach((wheel, index) => {
        wheel.rotation.x = carryingBoard ? 0 : state.time * (6 + player.speed * 2.4) * (index % 2 === 0 ? 1 : 1.02) * boardWheelDirection;
    });

    scooterWheelMeshes.forEach((wheel, index) => {
        wheel.rotation.x = state.time * (6.4 + player.speed * 2.2) * (index === 0 ? 1 : 1.03);
    });

    bikeWheelMeshes.forEach((wheel, index) => {
        wheel.rotation.z = state.time * (5.8 + player.speed * 1.9) * (index === 0 ? 1 : 1.02);
    });

    boardGroup.position.set(0, usingScooter || usingBike ? 0 : boardBob, 0);
    scooterGroup.position.y = usingScooter ? boardBob : 0;
    bikeGroup.position.y = usingBike ? boardBob * 0.45 - 0.04 : 0;
    scooterFrontAssembly.rotation.set(0, scooterBarTurn, 0);
    scooterDeckAssembly.rotation.set(0, scooterDeckTurn, 0);
    bikeFrontAssembly.rotation.set(0, bikeBarTurn, 0);
    bikeFrameAssembly.rotation.set(0, bikeFrameTurn, 0);
    riderGroup.position.y = usingBike ? 0.56 - player.crouch * 0.18 + bounce * 0.35 : 0.2 - player.crouch * 0.35 + bounce;

    if (player.airborne) {
        torso.rotation.x = usingBike ? -0.18 - player.crouch * 0.08 : -0.28 - player.crouch * 0.14;
        torso.rotation.z = player.trickRoll * 0.08;
        head.position.y = usingBike ? 1.98 : 1.9;
        head.rotation.x = usingBike ? 0.08 : 0.18;
        leftLeg.rotation.x = usingBike ? -1.02 + player.trickFlip * 0.02 : usingScooter ? -0.54 : -0.7 - player.trickFlip * 0.04;
        rightLeg.rotation.x = usingBike ? -0.96 - player.trickFlip * 0.02 : usingScooter ? -0.48 : -0.35 + player.trickFlip * 0.04;
        leftLeg.rotation.z = usingBike ? -0.08 : -0.15;
        rightLeg.rotation.z = usingBike ? 0.08 : 0.15;
        leftArm.rotation.x = usingBike ? -0.94 : usingScooter ? -0.76 : -1.1;
        rightArm.rotation.x = usingBike ? -0.94 : usingScooter ? -0.76 : -0.7;
        leftArm.rotation.z = usingBike ? -0.16 : usingScooter ? -0.12 : -0.35;
        rightArm.rotation.z = usingBike ? 0.16 : usingScooter ? 0.12 : 0.35;
    } else if (player.grinding) {
        const grindProfile = getGrindAnimationProfile(state.equippedRideType, getActiveGrindTrickName(player));
        torso.rotation.x = grindProfile.torsoX;
        torso.rotation.z = grindProfile.torsoZ;
        head.position.y = grindProfile.headY || (usingBike ? 1.97 : 1.93);
        head.rotation.x = 0.08;
        leftLeg.rotation.x = grindProfile.leftLegX;
        rightLeg.rotation.x = grindProfile.rightLegX;
        leftLeg.rotation.z = grindProfile.leftLegZ;
        rightLeg.rotation.z = grindProfile.rightLegZ;
        leftArm.rotation.x = grindProfile.leftArmX;
        rightArm.rotation.x = grindProfile.rightArmX;
        leftArm.rotation.z = grindProfile.leftArmZ;
        rightArm.rotation.z = grindProfile.rightArmZ;
    } else {
        torso.rotation.x = carryingBoard ? 0.12 : manualing ? 0.14 : usingBike ? 0.06 - player.crouch * 0.12 : -0.06 - player.crouch * 0.24 + Math.abs(stride) * 0.08;
        torso.rotation.z = player.bodyLean * 0.3;
        head.position.y = (usingBike ? 1.99 : 1.95) + bounce * 0.2;
        head.rotation.x = carryingBoard ? 0 : manualing ? -0.02 : usingBike ? 0.02 + player.crouch * 0.05 : 0.04 + player.crouch * 0.08;
        leftLeg.rotation.x = carryingBoard ? 0.2 + stride * 0.55 : manualing ? -0.56 : usingBike ? -0.8 + stride * 0.08 : usingScooter ? -0.18 + stride * 0.18 : stride * 0.65 - player.crouch * 0.2;
        rightLeg.rotation.x = carryingBoard ? -0.2 - stride * 0.55 : manualing ? -0.92 : usingBike ? -0.86 - stride * 0.08 : usingScooter ? -0.2 - stride * 0.18 : -stride * 0.65 - player.crouch * 0.2;
        leftLeg.rotation.z = usingBike ? -0.06 - player.bodyLean * 0.08 : -player.bodyLean * 0.15;
        rightLeg.rotation.z = usingBike ? 0.06 + player.bodyLean * 0.08 : player.bodyLean * 0.15;
        leftArm.rotation.x = carryingBoard ? -0.32 : manualing ? -0.42 : usingBike ? -0.78 : usingScooter ? -0.6 : -stride * 0.45 - 0.18;
        rightArm.rotation.x = carryingBoard ? -0.92 : manualing ? -0.68 : usingBike ? -0.78 : usingScooter ? -0.6 : stride * 0.45 - 0.18;
        leftArm.rotation.z = carryingBoard ? -0.08 : usingBike ? -0.1 - player.bodyLean * 0.08 : usingScooter ? -0.08 - player.bodyLean * 0.08 : -0.12 - player.bodyLean * 0.12;
        rightArm.rotation.z = carryingBoard ? 0.48 : usingBike ? 0.1 + player.bodyLean * 0.08 : usingScooter ? 0.08 + player.bodyLean * 0.08 : 0.12 + player.bodyLean * 0.12;
    }

    if (carryingBoard) {
        boardGroup.position.set(0.62, 1.04, 0.18);
    }

    if (isOpenWorldMap()) {
        playerRoot.rotation.set(0, player.heading, 0);
        if (player.grinding) {
            const grindProfile = getGrindAnimationProfile(state.equippedRideType, getActiveGrindTrickName(player));
            activeRideGroup.rotation.x = grindProfile.ridePitch - ((surface && surface.slopeZ) || 0) * 0.35;
            activeRideGroup.rotation.y = grindProfile.rideYaw;
            activeRideGroup.rotation.z = grindProfile.rideRoll + ((surface && surface.slopeX) || 0) * 0.22;
            riderGroup.rotation.y = player.bodySpin;
            riderGroup.rotation.z = grindProfile.riderLean;
            return;
        }
        if (carryingBoard) {
            activeRideGroup.rotation.set(-0.18, 1.18, Math.PI / 2);
            riderGroup.rotation.y = player.bodySpin;
            riderGroup.rotation.z = player.bodyLean * 0.15;
            return;
        }
        activeRideGroup.rotation.x = player.trickFlip + boardPitch - ((surface && surface.slopeZ) || 0) * 0.35;
        activeRideGroup.rotation.y = player.trickSpin + rideYawOffset + manualYawOffset;
        activeRideGroup.rotation.z = player.trickRoll + boardRoll + player.bodyLean * 0.16 + ((surface && surface.slopeX) || 0) * 0.22;
        riderGroup.rotation.y = player.bodySpin + manualYawOffset;
        riderGroup.rotation.z = player.bodyLean;
        return;
    }

    playerRoot.rotation.set(0, player.bodyLean * 0.42, player.surfaceAngle);

    if (player.grinding) {
        const grindProfile = getGrindAnimationProfile(state.equippedRideType, getActiveGrindTrickName(player));
        activeRideGroup.rotation.x = grindProfile.ridePitch;
        activeRideGroup.rotation.y = grindProfile.rideYaw;
        activeRideGroup.rotation.z = grindProfile.rideRoll;
        riderGroup.rotation.y = player.bodySpin;
        riderGroup.rotation.z = grindProfile.riderLean;
        return;
    }

    if (carryingBoard) {
        activeRideGroup.rotation.set(-0.18, 1.18, Math.PI / 2);
        riderGroup.rotation.y = player.bodySpin;
        riderGroup.rotation.z = player.bodyLean * 0.15;
        return;
    }

    activeRideGroup.rotation.x = player.trickFlip + boardPitch;
    activeRideGroup.rotation.y = player.trickSpin + rideYawOffset + manualYawOffset;
    activeRideGroup.rotation.z = player.trickRoll + boardRoll;
    riderGroup.rotation.y = player.bodySpin + manualYawOffset;
    riderGroup.rotation.z = player.bodyLean;
}

function update(delta) {
    if (state.mode !== "playing") {
        state.hudPulse = Math.max(0, state.hudPulse - delta * 2.4);
        updateRemotePlayers(delta);
        updateHud();
        return;
    }

    generateWorldAhead(state.player.x + FAR_AHEAD);
    updatePlayer(delta);
    updateSoloCompetitionBot(delta);
    updateSolidCollisions();
    updatePickups(delta);
    updateObstacles();
    pruneWorld();
    updatePlayerVisuals();
    updateCamera();
    broadcastLocalSnapshot();
    updateRemotePlayers(delta);
    state.hudPulse = Math.max(0, state.hudPulse - delta * 2.4);
    if (state.competition.enabled && !state.competition.finished && getCompetitionRemainingTime() <= 0) {
        finishCompetitionRound();
        return;
    }
    updateHud();
}

function createSkyline() {
    for (let index = 0; index < 18; index += 1) {
        const width = randomBetween(10, 22);
        const height = randomBetween(12, 34);
        const depth = randomBetween(8, 14);
        const material = new THREE.MeshStandardMaterial({ color: index % 2 === 0 ? "#5c4e76" : "#4a446c", roughness: 1 });
        const left = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
        left.position.set(index * 22 - 80, height / 2 - 6, -56 - randomBetween(0, 10));
        skyline.add(left);

        const right = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material.clone());
        right.position.set(index * 22 - 80, height / 2 - 6, 56 + randomBetween(0, 10));
        skyline.add(right);
    }
}

function createCloudLayer() {
    for (let index = 0; index < 14; index += 1) {
        const cluster = new THREE.Group();
        const puffCount = 3 + (index % 3);
        const baseScale = randomBetween(0.9, 1.6);

        for (let puffIndex = 0; puffIndex < puffCount; puffIndex += 1) {
            const puff = new THREE.Mesh(new THREE.SphereGeometry(4.6, 18, 14), cloudMaterial);
            puff.castShadow = false;
            puff.receiveShadow = false;
            puff.scale.set(
                baseScale * randomBetween(1.2, 2.2),
                baseScale * randomBetween(0.5, 0.9),
                baseScale * randomBetween(0.8, 1.4)
            );
            puff.position.set(
                puffIndex * randomBetween(4.2, 7.4),
                randomBetween(-1.4, 1.4),
                randomBetween(-3, 3)
            );
            cluster.add(puff);
        }

        cluster.position.set(
            index * 34 - 210,
            randomBetween(30, 58),
            index % 2 === 0 ? randomBetween(-150, -82) : randomBetween(82, 150)
        );
        cluster.userData.baseX = cluster.position.x;
        cluster.userData.drift = randomBetween(0.4, 1.1);
        cluster.userData.phase = randomBetween(0, Math.PI * 2);
        cloudLayer.add(cluster);
    }
}

function animate(timestamp = 0) {
    const currentTime = timestamp / 1000;
    const delta = Math.min(0.033, currentTime - state.time || 0.016);
    state.time = currentTime;

    update(delta);

    skyline.position.x = Math.floor(state.player.x / 22) * 22;
    skyDome.position.set(camera.position.x, 24, camera.position.z);
    cloudLayer.position.x = state.player.x * 0.2;
    cloudLayer.children.forEach((cloud, index) => {
        cloud.position.x = cloud.userData.baseX + Math.sin(state.time * cloud.userData.drift + cloud.userData.phase) * (6 + index * 0.12);
        cloud.position.y += Math.sin(state.time * 0.18 + cloud.userData.phase) * 0.0025;
    });
    sunHalo.position.copy(sunMesh.position);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function resize() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    renderer.setSize(state.width, state.height, false);
    camera.aspect = state.width / state.height;
    camera.updateProjectionMatrix();
    updateMobileControlsVisibility();
}

function beginLook(pointerId, clientX, clientY) {
    state.cameraOrbit.dragging = true;
    state.cameraOrbit.pointerId = pointerId;
    state.cameraOrbit.lastX = clientX;
    state.cameraOrbit.lastY = clientY;
}

function updateLook(clientX, clientY) {
    if (!state.cameraOrbit.dragging) {
        return;
    }

    const deltaX = clientX - state.cameraOrbit.lastX;
    const deltaY = clientY - state.cameraOrbit.lastY;
    state.cameraOrbit.lastX = clientX;
    state.cameraOrbit.lastY = clientY;
    state.cameraOrbit.yaw -= deltaX * CAMERA_LOOK_SENSITIVITY;
    state.cameraOrbit.pitch = clamp(
        state.cameraOrbit.pitch - deltaY * CAMERA_LOOK_SENSITIVITY,
        CAMERA_PITCH_MIN,
        CAMERA_PITCH_MAX
    );
}

function endLook(pointerId) {
    if (state.cameraOrbit.pointerId !== pointerId) {
        return;
    }

    state.cameraOrbit.dragging = false;
    state.cameraOrbit.pointerId = null;
}

document.addEventListener("keydown", (event) => {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Escape"].includes(event.code)) {
        event.preventDefault();
    }

    if (event.code === "Escape") {
        if (state.menuVisible) {
            closeMenu();
        } else {
            openMenu("home");
        }
        return;
    }

    if ((event.code === "Space" || event.code === "Enter") && (state.mode === "menu" || state.mode === "crashed")) {
        startRun();
        return;
    }

    if (event.code === "KeyL") {
        toggleClipRecording();
        return;
    }

    if (state.menuVisible) {
        return;
    }

    state.keys.add(event.code);
    if (event.repeat) {
        return;
    }

    if (event.code === "Space") {
        handleJump();
    }
    if (event.code === "KeyR" && toggleBoardCarry(state.player)) {
        return;
    }
    if (event.code === "KeyZ" && startManual(state.player)) {
        return;
    }
    const trick = getActiveControlLibrary()[event.code];
    if (trick) {
        if (state.player.grinding) {
            performGrindTrick(trick);
        } else {
            performTrick(trick);
        }
    }
});

document.addEventListener("keyup", (event) => {
    state.keys.delete(event.code);
    if (event.code === "KeyZ") {
        endManual(state.player, true);
    }
});

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    renderMenu();
});

window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    renderMenu();
});

usernameInput.addEventListener("input", () => {
    commitUsername(usernameInput.value);
    renderMenu();
});

usernameInput.addEventListener("change", () => {
    commitUsername(usernameInput.value);
    renderMenu();
});

const handleMenuTabPress = (event) => {
    const button = findClosestByClass(event.target, "menu-tab", menuTabs);
    if (!button) {
        return;
    }
    state.activeMenuPanel = button.dataset.panel;
    renderMenu();
};

menuTabs.addEventListener("click", handleMenuTabPress);
menuTabs.addEventListener("pointerup", (event) => {
    if (event.pointerType === "mouse") {
        return;
    }
    event.preventDefault();
    handleMenuTabPress(event);
});

bindUiPress(singlePlayerModeButton, () => {
    setGameMode("single");
});

bindUiPress(versusModeButton, () => {
    setGameMode("online");
});

bindUiPress(competitionToggleButton, () => {
    setCompetitionEnabled(!state.competition.enabled);
});

bindUiPress(hostRoomButton, () => {
    if (!isVersusMode()) {
        setGameMode("online");
    }
    hostOnlineRoom();
});

bindUiPress(joinRoomButton, () => {
    if (!isVersusMode()) {
        setGameMode("online");
    }
    joinOnlineRoom();
});

bindUiPress(leaveRoomButton, () => {
    leaveOnlineRoom();
});

bindUiPress(startRideButton, () => {
    startRun();
});

bindUiPress(installGameButton, async () => {
    if (isStandaloneApp()) {
        renderMenu();
        return;
    }
    if (isIOSDevice()) {
        installStatus.textContent = "iPhone or iPad install: tap Share, then Add to Home Screen.";
        installHint.textContent = "After adding it, launch Sidewalk Session from your home screen like a normal phone app.";
        return;
    }
    if (!deferredInstallPrompt) {
        installStatus.textContent = getInstallStatusText();
        installHint.textContent = getInstallHintText();
        return;
    }

    try {
        await deferredInstallPrompt.prompt();
        await deferredInstallPrompt.userChoice;
    } catch (error) {
        return;
    } finally {
        deferredInstallPrompt = null;
        renderMenu();
    }
});

bindUiPress(resumeRideButton, () => {
    closeMenu();
});

bindUiPress(recordClipButton, () => {
    toggleClipRecording();
});

canvas.addEventListener("pointerdown", (event) => {
    if (state.menuVisible) {
        return;
    }
    beginLook(event.pointerId, event.clientX, event.clientY);
    if (typeof canvas.setPointerCapture === "function") {
        canvas.setPointerCapture(event.pointerId);
    }
});

canvas.addEventListener("pointermove", (event) => {
    if (state.cameraOrbit.pointerId !== event.pointerId) {
        return;
    }
    updateLook(event.clientX, event.clientY);
});

canvas.addEventListener("pointerup", (event) => {
    endLook(event.pointerId);
    if (typeof canvas.releasePointerCapture === "function") {
        canvas.releasePointerCapture(event.pointerId);
    }
});

canvas.addEventListener("pointercancel", (event) => {
    endLook(event.pointerId);
});

canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

bindHoldButton(mobilePushButton, "ArrowUp");
bindHoldButton(mobileBrakeButton, "ArrowDown");
bindHoldButton(mobileLeftButton, "ArrowLeft");
bindHoldButton(mobileRightButton, "ArrowRight");
bindTapButton(mobileJumpButton, () => {
    if ((state.mode === "menu" || state.mode === "crashed") && state.menuVisible) {
        startRun();
        return;
    }
    handleJump();
});
bindTapButton(mobileTrickOneButton, () => performMobileTrick("KeyZ"));
bindTapButton(mobileTrickTwoButton, () => performMobileTrick("KeyC"));
bindTapButton(mobileMenuButton, () => {
    if (state.menuVisible) {
        closeMenu();
    } else {
        openMenu("home");
    }
});

window.addEventListener("resize", resize);

createSkyline();
createCloudLayer();
applyRideSkin();
resize();
startRun();
openMenu("home");
requestAnimationFrame(animate);