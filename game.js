import * as THREE from "three";

const canvas = document.getElementById("gameCanvas");
const menuShell = document.getElementById("menuShell");
const menuTabs = document.getElementById("menuTabs");
const menuSubtitle = document.getElementById("menuSubtitle");
const coinValue = document.getElementById("coinValue");
const selectedMapName = document.getElementById("selectedMapName");
const selectedMapDescription = document.getElementById("selectedMapDescription");
const equippedDeckName = document.getElementById("equippedDeckName");
const menuBestValue = document.getElementById("menuBestValue");
const startRideButton = document.getElementById("startRideButton");
const resumeRideButton = document.getElementById("resumeRideButton");
const shopGrid = document.getElementById("shopGrid");
const scooterGrid = document.getElementById("scooterGrid");
const mapGrid = document.getElementById("mapGrid");
const mobileControls = document.getElementById("mobileControls");
const mobilePushButton = document.getElementById("mobilePushButton");
const mobileBrakeButton = document.getElementById("mobileBrakeButton");
const mobileLeftButton = document.getElementById("mobileLeftButton");
const mobileRightButton = document.getElementById("mobileRightButton");
const mobileJumpButton = document.getElementById("mobileJumpButton");
const mobileTrickOneButton = document.getElementById("mobileTrickOneButton");
const mobileTrickTwoButton = document.getElementById("mobileTrickTwoButton");
const mobileMenuButton = document.getElementById("mobileMenuButton");

const TRACK_WIDTH = 16;
const TRACK_HALF = TRACK_WIDTH / 2;
const TRACK_THICKNESS = 1.5;
const BOARD_RIDE_HEIGHT = 0.72;
const GRAVITY = 58;
const MIN_SPEED = 18;
const CRUISE_SPEED = 26;
const MAX_SPEED = 52;
const JUMP_VELOCITY = 20;
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
const SURFACE_EDGE_TOLERANCE = 0.65;
const STORAGE_KEYS = {
    best: "sidewalk-session-best",
    coins: "sidewalk-session-coins",
    selectedMap: "sidewalk-session-map",
    equippedDeck: "sidewalk-session-equipped-deck",
    ownedDecks: "sidewalk-session-owned-decks",
    equippedScooter: "sidewalk-session-equipped-scooter",
    ownedScooters: "sidewalk-session-owned-scooters",
    equippedRideType: "sidewalk-session-equipped-ride-type",
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

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
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

const sunLight = new THREE.DirectionalLight(0xfff1c2, 2.6);
sunLight.position.set(-24, 42, 18);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
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

const farGround = new THREE.Mesh(
    new THREE.PlaneGeometry(900, 500),
    new THREE.MeshStandardMaterial({ color: "#4f466e", roughness: 1 })
);
farGround.rotation.x = -Math.PI / 2;
farGround.position.y = -5.2;
farGround.receiveShadow = true;
scene.add(farGround);

const skyline = new THREE.Group();
scene.add(skyline);

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
const riderGroup = new THREE.Group();
playerRoot.add(boardGroup);
playerRoot.add(scooterGroup);
playerRoot.add(riderGroup);
world.add(playerRoot);

const deck = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.12, 0.82),
    new THREE.MeshStandardMaterial({ color: "#142033", roughness: 0.65 })
);
deck.castShadow = true;
boardGroup.add(deck);

const noseAccent = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.03, 0.8),
    new THREE.MeshStandardMaterial({ color: "#ff7a59", roughness: 0.5 })
);
noseAccent.position.set(-0.75, 0.08, 0);
noseAccent.castShadow = true;
boardGroup.add(noseAccent);

const tailAccent = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.03, 0.8),
    new THREE.MeshStandardMaterial({ color: "#2d8f85", roughness: 0.5 })
);
tailAccent.position.set(0.75, 0.08, 0);
tailAccent.castShadow = true;
boardGroup.add(tailAccent);

const truckMaterial = new THREE.MeshStandardMaterial({ color: "#d5dce3", roughness: 0.35, metalness: 0.8 });
const wheelMaterial = new THREE.MeshStandardMaterial({ color: "#111822", roughness: 0.85 });
const wheelMeshes = [];
const scooterWheelMeshes = [];

[-0.95, 0.95].forEach((xOffset) => {
    const axle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, 0.78), truckMaterial);
    axle.position.set(xOffset, -0.12, 0);
    axle.castShadow = true;
    boardGroup.add(axle);

    [-0.32, 0.32].forEach((zOffset) => {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 16), wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(xOffset, -0.22, zOffset);
        wheel.castShadow = true;
        boardGroup.add(wheel);
        wheelMeshes.push(wheel);
    });
});

const scooterDeckAssembly = new THREE.Group();
scooterDeckAssembly.position.set(-0.78, 0, 0);
scooterGroup.add(scooterDeckAssembly);

const scooterFrontAssembly = new THREE.Group();
scooterFrontAssembly.position.set(-0.78, 1.92, 0);
scooterGroup.add(scooterFrontAssembly);

const scooterDeck = new THREE.Mesh(
    new THREE.BoxGeometry(2.15, 0.12, 0.5),
    new THREE.MeshStandardMaterial({ color: "#1a2236", roughness: 0.58 })
);
scooterDeck.position.set(0.78, 0, 0);
scooterDeck.castShadow = true;
scooterDeckAssembly.add(scooterDeck);

const scooterStemMaterial = new THREE.MeshStandardMaterial({ color: "#dce5ef", roughness: 0.28, metalness: 0.82 });
const scooterDeckMaterial = scooterDeck.material;
const scooterClampMaterial = new THREE.MeshStandardMaterial({ color: "#ffd166", roughness: 0.36, metalness: 0.7 });
const scooterGripMaterial = new THREE.MeshStandardMaterial({ color: "#8bd3dd", roughness: 0.42, metalness: 0.22 });

const scooterStem = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.0, 0.12), scooterStemMaterial);
scooterStem.position.set(0, -0.92, 0);
scooterStem.castShadow = true;
scooterFrontAssembly.add(scooterStem);

const scooterClamp = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.18), scooterClampMaterial);
scooterClamp.position.set(0, 0, 0);
scooterClamp.castShadow = true;
scooterFrontAssembly.add(scooterClamp);

const scooterBar = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.1, 0.1), scooterGripMaterial);
scooterBar.position.set(0, 0.1, 0);
scooterBar.castShadow = true;
scooterFrontAssembly.add(scooterBar);

const scooterFork = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.38, 0.1), scooterStemMaterial);
scooterFork.position.set(-0.04, -1.72, 0);
scooterFork.castShadow = true;
scooterFrontAssembly.add(scooterFork);

const scooterFrontWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16), wheelMaterial.clone());
scooterFrontWheel.rotation.z = Math.PI / 2;
scooterFrontWheel.position.set(-0.08, -2.1, 0);
scooterFrontWheel.castShadow = true;
scooterFrontAssembly.add(scooterFrontWheel);
scooterWheelMeshes.push(scooterFrontWheel);

const scooterRearWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16), wheelMaterial.clone());
scooterRearWheel.rotation.z = Math.PI / 2;
scooterRearWheel.position.set(1.62, -0.18, 0);
scooterRearWheel.castShadow = true;
scooterDeckAssembly.add(scooterRearWheel);
scooterWheelMeshes.push(scooterRearWheel);

scooterGroup.visible = false;

const torso = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 1.15, 0.42),
    new THREE.MeshStandardMaterial({ color: "#f5ead0", roughness: 0.92 })
);
torso.position.set(0, 1.15, 0);
torso.castShadow = true;
riderGroup.add(torso);

const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 20, 20),
    new THREE.MeshStandardMaterial({ color: "#101825", roughness: 0.7 })
);
head.position.set(0, 1.95, 0);
head.castShadow = true;
riderGroup.add(head);

const limbMaterial = new THREE.MeshStandardMaterial({ color: "#101825", roughness: 0.8 });
const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.9, 0.14), limbMaterial);
leftLeg.position.set(-0.22, 0.6, -0.18);
leftLeg.castShadow = true;
riderGroup.add(leftLeg);

const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.9, 0.14), limbMaterial);
rightLeg.position.set(0.22, 0.6, 0.18);
rightLeg.castShadow = true;
riderGroup.add(rightLeg);

const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.8, 0.14), limbMaterial);
leftArm.position.set(-0.42, 1.15, 0);
leftArm.castShadow = true;
riderGroup.add(leftArm);

const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.8, 0.14), limbMaterial);
rightArm.position.set(0.42, 1.15, 0);
rightArm.castShadow = true;
riderGroup.add(rightArm);

const state = {
    width: window.innerWidth,
    height: window.innerHeight,
    mode: "menu",
    time: 0,
    best: loadBestScore(),
    score: 0,
    coins: loadCoins(),
    selectedMap: loadSelectedMap(),
    equippedDeck: loadEquippedDeck(),
    ownedDecks: loadOwnedDecks(),
    equippedScooter: loadEquippedScooter(),
    ownedScooters: loadOwnedScooters(),
    equippedRideType: loadEquippedRideType(),
    menuVisible: true,
    activeMenuPanel: "home",
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
        tricksThisAir: 0,
        lastTrickAt: -999,
        lastBumpAt: -999,
    };
}

function loadBestScore() {
    try {
        return Number(window.localStorage.getItem(STORAGE_KEYS.best) || 0);
    } catch {
        return 0;
    }
}

function saveBestScore() {
    try {
        window.localStorage.setItem(STORAGE_KEYS.best, String(state.best));
    } catch {
        return;
    }
}

function loadCoins() {
    try {
        return Number(window.localStorage.getItem(STORAGE_KEYS.coins) || 0);
    } catch {
        return 0;
    }
}

function loadSelectedMap() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEYS.selectedMap) || "city";
        return MAP_DEFINITIONS[value] ? value : "city";
    } catch {
        return "city";
    }
}

function loadOwnedDecks() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEYS.ownedDecks);
        const parsed = raw ? JSON.parse(raw) : ["classic"];
        const owned = Array.isArray(parsed) ? parsed.filter((id) => SHOP_ITEMS[id]) : ["classic"];
        return owned.includes("classic") ? owned : ["classic", ...owned];
    } catch {
        return ["classic"];
    }
}

function loadEquippedDeck() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEYS.equippedDeck) || "classic";
        return SHOP_ITEMS[value] ? value : "classic";
    } catch {
        return "classic";
    }
}

function loadOwnedScooters() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEYS.ownedScooters);
        const parsed = raw ? JSON.parse(raw) : ["streetline"];
        const owned = Array.isArray(parsed) ? parsed.filter((id) => SCOOTER_ITEMS[id]) : ["streetline"];
        return owned.includes("streetline") ? owned : ["streetline", ...owned];
    } catch {
        return ["streetline"];
    }
}

function loadEquippedScooter() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEYS.equippedScooter) || "streetline";
        return SCOOTER_ITEMS[value] ? value : "streetline";
    } catch {
        return "streetline";
    }
}

function loadEquippedRideType() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEYS.equippedRideType) || "board";
        return value === "scooter" ? "scooter" : "board";
    } catch {
        return "board";
    }
}

function saveProfile() {
    try {
        window.localStorage.setItem(STORAGE_KEYS.coins, String(state.coins));
        window.localStorage.setItem(STORAGE_KEYS.selectedMap, state.selectedMap);
        window.localStorage.setItem(STORAGE_KEYS.equippedDeck, state.equippedDeck);
        window.localStorage.setItem(STORAGE_KEYS.ownedDecks, JSON.stringify(state.ownedDecks));
        window.localStorage.setItem(STORAGE_KEYS.equippedScooter, state.equippedScooter);
        window.localStorage.setItem(STORAGE_KEYS.ownedScooters, JSON.stringify(state.ownedScooters));
        window.localStorage.setItem(STORAGE_KEYS.equippedRideType, state.equippedRideType);
    } catch {
        return;
    }
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
    return state.equippedRideType === "scooter" ? SCOOTER_TRICK_LIBRARY : BOARD_TRICK_LIBRARY;
}

function getActiveTrickHint() {
    return state.equippedRideType === "scooter"
        ? "Z Tailwhip X Heelwhip C Barspin V Double Whip B Whip Rewind N Bri Flip F Flair G Fingerwhip"
        : "Z Kickflip X Heelflip C Shuvit V 360 Flip B Varial Heel N Impossible F Laser Flip G Body Varial";
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
    deck.material.color.set(skin.deck);
    noseAccent.material.color.set(skin.nose);
    tailAccent.material.color.set(skin.tail);
}

function ownsScooter(scooterId) {
    return state.ownedScooters.includes(scooterId);
}

function applyScooterSkin() {
    const scooter = SCOOTER_ITEMS[state.equippedScooter] || SCOOTER_ITEMS.streetline;
    scooterDeck.material.color.set(scooter.deck);
    scooterClamp.material.color.set(scooter.clamp);
    scooterBar.material.color.set(scooter.grips);
}

function getEquippedRide() {
    if (state.equippedRideType === "scooter") {
        return SCOOTER_ITEMS[state.equippedScooter] || SCOOTER_ITEMS.streetline;
    }
    return SHOP_ITEMS[state.equippedDeck] || SHOP_ITEMS.classic;
}

function applyRideSkin() {
    const usingScooter = state.equippedRideType === "scooter";
    applyDeckSkin();
    applyScooterSkin();
    const ride = getEquippedRide();
    torso.material.color.set(ride.shirt);
    boardGroup.visible = !usingScooter;
    scooterGroup.visible = usingScooter;
}

function applyMapTheme() {
    if (state.selectedMap === "megabowl") {
        scene.background = new THREE.Color("#76b0c7");
        scene.fog = new THREE.Fog("#76b0c7", 84, 270);
        farGround.material.color.set("#557c68");
        roadMaterial.color.set("#a6b0ba");
        curbMaterial.color.set("#ece4d6");
        stripeMaterial.color.set("#ff8c5f");
        stripeMaterial.emissive.set("#7f392a");
        skyline.visible = false;
        sunMesh.position.set(state.player.x + 96, 54, -84);
        return;
    }

    if (state.selectedMap === "bowl") {
        scene.background = new THREE.Color("#7fb6cc");
        scene.fog = new THREE.Fog("#7fb6cc", 76, 240);
        farGround.material.color.set("#5e8b71");
        roadMaterial.color.set("#aeb6bf");
        curbMaterial.color.set("#e4ddd1");
        stripeMaterial.color.set("#ff9966");
        stripeMaterial.emissive.set("#7a402f");
        skyline.visible = false;
        sunMesh.position.set(state.player.x + 84, 50, -76);
        return;
    }

    if (state.selectedMap === "skatepark") {
        scene.background = new THREE.Color("#8cd0cf");
        scene.fog = new THREE.Fog("#8cd0cf", 80, 255);
        farGround.material.color.set("#6a9e80");
        roadMaterial.color.set("#b5bcc5");
        curbMaterial.color.set("#d7eef1");
        stripeMaterial.color.set("#ff845f");
        stripeMaterial.emissive.set("#7b3b26");
        skyline.visible = false;
        sunMesh.position.set(state.player.x + 90, 48, -70);
        return;
    }

    scene.background = new THREE.Color("#ffb66d");
    scene.fog = new THREE.Fog("#ffb66d", 70, 240);
    farGround.material.color.set("#4f466e");
    roadMaterial.color.set("#8a92a3");
    curbMaterial.color.set("#f5ead0");
    stripeMaterial.color.set("#fff2bb");
    stripeMaterial.emissive.set("#a58d39");
    skyline.visible = false;
    sunMesh.position.set(state.player.x + 110, 42, -90);
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
    const cards = Object.values(SHOP_ITEMS).map((item) => {
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
            button.addEventListener("click", () => {
                state.equippedRideType = "board";
                applyRideSkin();
                saveProfile();
                renderMenu();
            });
        } else if (ownsDeck(item.id)) {
            button.textContent = "Equip";
            button.addEventListener("click", () => {
                state.equippedDeck = item.id;
                state.equippedRideType = "board";
                applyRideSkin();
                saveProfile();
                renderMenu();
            });
        } else {
            button.textContent = `Buy ${formatScore(item.price)}`;
            button.disabled = state.coins < item.price;
            button.addEventListener("click", () => {
                if (state.coins < item.price) {
                    return;
                }
                state.coins -= item.price;
                state.ownedDecks = [...state.ownedDecks, item.id];
                state.equippedDeck = item.id;
                state.equippedRideType = "board";
                applyRideSkin();
                saveProfile();
                renderMenu();
            });
        }

        card.append(swatch, title, description, meta, button);
        return card;
    });

    shopGrid.replaceChildren(...cards);
}

function renderScooterGrid() {
    const cards = Object.values(SCOOTER_ITEMS).map((item) => {
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
            button.addEventListener("click", () => {
                state.equippedRideType = "scooter";
                applyRideSkin();
                saveProfile();
                renderMenu();
            });
        } else if (ownsScooter(item.id)) {
            button.textContent = "Equip";
            button.addEventListener("click", () => {
                state.equippedScooter = item.id;
                state.equippedRideType = "scooter";
                applyRideSkin();
                saveProfile();
                renderMenu();
            });
        } else {
            button.textContent = `Buy ${formatScore(item.price)}`;
            button.disabled = state.coins < item.price;
            button.addEventListener("click", () => {
                if (state.coins < item.price) {
                    return;
                }
                state.coins -= item.price;
                state.ownedScooters = [...state.ownedScooters, item.id];
                state.equippedScooter = item.id;
                state.equippedRideType = "scooter";
                applyRideSkin();
                saveProfile();
                renderMenu();
            });
        }

        card.append(swatch, title, description, meta, button);
        return card;
    });

    scooterGrid.replaceChildren(...cards);
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
            button.addEventListener("click", () => {
                state.selectedMap = map.id;
                applyMapTheme();
                saveProfile();
                renderMenu();
            });
        }

        card.append(title, description, meta, button);
        return card;
    });

    mapGrid.replaceChildren(...cards);
}

function renderMenu() {
    menuShell.classList.toggle("hidden", !state.menuVisible);
    updateMobileControlsVisibility();
    updateMobileControlLabels();
    const selectedMap = MAP_DEFINITIONS[state.selectedMap];
    const equippedRide = getEquippedRide();

    coinValue.textContent = formatScore(state.coins);
    selectedMapName.textContent = selectedMap.name;
    selectedMapDescription.textContent = selectedMap.description;
    equippedDeckName.textContent = equippedRide.name;
    menuBestValue.textContent = formatScore(state.best);
    resumeRideButton.disabled = state.mode !== "paused" || state.selectedMap !== state.activeRunMap;
    startRideButton.textContent = state.mode === "crashed" ? "Restart Ride" : "Start Ride";
    menuSubtitle.textContent = state.mode === "crashed"
        ? `You banked ${formatScore(state.score)} points and earned ${formatScore(state.lastRunCoins)} coins. Change your setup and go again.`
        : "Pick a map, switch between boards and scooters, and drop into your next run.";

    setMenuPanel(state.activeMenuPanel);
    renderShopGrid();
    renderScooterGrid();
    renderMapGrid();
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
    const trickLibrary = getActiveTrickLibrary();
    mobileTrickOneButton.textContent = trickLibrary.KeyZ?.name || "Trick 1";
    mobileTrickTwoButton.textContent = trickLibrary.KeyC?.name || "Trick 2";
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

    const trick = getActiveTrickLibrary()[code];
    if (trick) {
        performTrick(trick);
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

    hudContext.clearRect(0, 0, hudCanvas.width, hudCanvas.height);
    drawRoundedRect(24, 20, 976, 208, 34, "rgba(10, 16, 28, 0.58)", "rgba(255, 242, 196, 0.24)");
    drawRoundedRect(24, 248, 976, 240, 34, "rgba(10, 16, 28, 0.36)", "rgba(255, 242, 196, 0.14)");

    hudContext.fillStyle = "rgba(255, 242, 196, 0.72)";
    hudContext.font = "600 34px Arial";
    hudContext.fillText("SCORE", 58, 72);
    hudContext.fillText("BEST", 372, 72);
    hudContext.fillText("COMBO", 630, 72);
    hudContext.fillText("COINS", 820, 196);

    hudContext.fillStyle = "#fff7da";
    hudContext.font = "700 82px Arial";
    hudContext.fillText(formatScore(state.score), 56, 152);
    hudContext.fillText(formatScore(state.best), 368, 152);
    hudContext.fillText(comboScore > 0 ? formatScore(comboScore) : "0", 626, 152);

    hudContext.fillStyle = "rgba(255, 242, 196, 0.62)";
    hudContext.font = "600 28px Arial";
    hudContext.fillText(`MULTI x${player.comboMultiplier}`, 628, 196);
    hudContext.fillText(`SPEED ${Math.round(player.speed * 2.3)} MPH`, 806, 72);
    hudContext.fillText(formatScore(state.coins), 820, 236);

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
    hudContext.fillText("Drag to look around. Esc opens the home menu. Space to ollie. Z X C V B N F G for tricks.", 58, 432);

    hudSprite.material.opacity = 0.88 + Math.sin(state.time * 6) * 0.04 * state.hudPulse;
    hudSprite.visible = !state.menuVisible;
    hudTexture.needsUpdate = true;
}

function removeRoot(entry) {
    if (entry?.root) {
        world.remove(entry.root);
    }
}

function clearWorld() {
    state.trackSegments.forEach(removeRoot);
    state.citySurfaces.forEach(removeRoot);
    state.rails.forEach(removeRoot);
    state.obstacles.forEach(removeRoot);
    state.pickups.forEach(removeRoot);
    state.props.forEach(removeRoot);
    state.trackSegments = [];
    state.citySurfaces = [];
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
    const edgeThickness = 0.9;
    const edgeHeights = [
        y - width / 2 * slopeX,
        y + width / 2 * slopeX,
        y - depth / 2 * slopeZ,
        y + depth / 2 * slopeZ,
    ];
    const minY = Math.min(0, ...edgeHeights) - 0.1;
    const maxY = Math.max(...edgeHeights) + TRACK_THICKNESS + 0.18;

    if (Math.abs(slopeX) > 0.01) {
        const highSideX = centerX + Math.sign(slopeX) * (width / 2 + edgeThickness / 2);
        addSurfaceEdgeSolid(highSideX, centerZ, edgeThickness, depth, minY, maxY, 0.16);
    }

    if (Math.abs(slopeZ) > 0.01) {
        const highSideZ = centerZ + Math.sign(slopeZ) * (depth / 2 + edgeThickness / 2);
        addSurfaceEdgeSolid(centerX, highSideZ, width, edgeThickness, minY, maxY, 0.16);
    }
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
    } = options;
    const root = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.03 });
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
            new THREE.MeshStandardMaterial({ color: "#d9d1ba", roughness: 0.95 })
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
        minX: centerX - width / 2,
        maxX: centerX + width / 2,
        minZ: centerZ - depth / 2,
        maxZ: centerZ + depth / 2,
    });

    if (solidEdges && (Math.abs(slopeX) > 0.01 || Math.abs(slopeZ) > 0.01)) {
        addRampEdgeSolids(centerX, centerZ, width, depth, y, slopeX, slopeZ);
    }
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
    addCitySurface(0, 0, CITY_HALF_X * 2, CITY_HALF_Z * 2, { y: 0, color: "#7f8797", roughness: 0.94 });
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
    addCitySurface(0, 0, SKATEPARK_HALF_X * 2, SKATEPARK_HALF_Z * 2, { y: 0, color: "#bcc3ca", roughness: 0.92 });
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
    addCitySurface(0, 0, BOWL_HALF_X * 2, BOWL_HALF_Z * 2, { y: -2.2, color: "#95a0ab", roughness: 0.94 });
    addPerimeterWalls(BOWL_HALF_X, BOWL_HALF_Z, "#7c786f", { baseY: -2.8, height: 6 });

    [
        [-74, 0, 44, 124],
        [74, 0, 44, 124],
        [0, -72, 104, 40],
        [0, 72, 104, 40],
        [-76, -78, 40, 28],
        [76, -78, 40, 28],
        [-76, 78, 40, 28],
        [76, 78, 40, 28],
    ].forEach(([x, z, width, depth]) => {
        addCitySurface(x, z, width, depth, { y: 0.04, color: "#c8ced5", accent: true });
    });

    addCitySurface(-30, 0, 28, 84, { y: -0.95, slopeX: -0.1125, color: "#adb6c0", accent: true, solidEdges: false });
    addCitySurface(30, 0, 28, 84, { y: -0.95, slopeX: 0.1125, color: "#adb6c0", accent: true, solidEdges: false });
    addCitySurface(0, -32, 72, 20, { y: -0.95, slopeZ: -0.17, color: "#aeb7c1", accent: true, solidEdges: false });
    addCitySurface(0, 32, 72, 20, { y: -0.95, slopeZ: 0.17, color: "#aeb7c1", accent: true, solidEdges: false });
    addCitySurface(0, 0, 42, 46, { y: -2.18, color: "#97a2af", accent: true });

    addCitySurface(-40, -44, 22, 24, { y: -1.25, slopeX: -0.09, slopeZ: -0.11, color: "#a8b2bc", accent: true, solidEdges: false });
    addCitySurface(40, -44, 22, 24, { y: -1.25, slopeX: 0.09, slopeZ: -0.11, color: "#a8b2bc", accent: true, solidEdges: false });
    addCitySurface(-40, 44, 22, 24, { y: -1.25, slopeX: -0.09, slopeZ: 0.11, color: "#a8b2bc", accent: true, solidEdges: false });
    addCitySurface(40, 44, 22, 24, { y: -1.25, slopeX: 0.09, slopeZ: 0.11, color: "#a8b2bc", accent: true, solidEdges: false });

    addCitySurface(-66, 0, 16, 28, { y: 0.48, slopeX: 0.16, color: "#bcc4cc", accent: true, solidEdges: true });
    addCitySurface(66, 0, 16, 28, { y: 0.48, slopeX: -0.16, color: "#bcc4cc", accent: true, solidEdges: true });
    addCitySurface(0, -58, 28, 16, { y: 0.44, slopeZ: 0.16, color: "#bcc4cc", accent: true, solidEdges: true });
    addCitySurface(0, 58, 28, 16, { y: 0.44, slopeZ: -0.16, color: "#bcc4cc", accent: true, solidEdges: true });

    [
        [-72, -18, 1.2, -60],
        [22, 74, 1.2, -60],
        [-50, -6, 1.55, 60],
        [18, 58, -1.25, 0],
    ].forEach(([x0, x1, y, z]) => addRail(x0, x1, y, z));

    [
        [-78, 3.6, -62],
        [-54, 3.2, 0],
        [0, 0.15, 0],
        [44, 0.2, -18],
        [62, 3.3, 58],
        [0, 3.4, 78],
        [82, 3.5, -72],
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
    addCitySurface(0, 0, MEGA_BOWL_HALF_X * 2, MEGA_BOWL_HALF_Z * 2, { y: -3.8, color: "#8f99a4", roughness: 0.95 });
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

function getPlayerSurfaceInfo(player, sampleX = player.x, sampleZ = player.z) {
    if (!isOpenWorldMap()) {
        return getSurfaceInfo(sampleX, sampleZ);
    }

    return getSurfaceInfo(sampleX, sampleZ, player.y - BOARD_RIDE_HEIGHT);
}

function getRailUnderPlayer() {
    const player = state.player;
    if (player.vy > -2.5) {
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

function startRun() {
    clearWorld();
    applyMapTheme();
    applyRideSkin();
    state.mode = "playing";
    state.menuVisible = false;
    state.activeRunMap = state.selectedMap;
    state.score = 0;
    state.hudPulse = 0;
    state.lastScoreEvent = "Drop in";
    state.lastRunCoins = 0;
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
    state.player.y = (surface?.y || 0) + BOARD_RIDE_HEIGHT;
    updatePlayerVisuals();
    updateCamera();
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
}

function crash() {
    if (state.mode !== "playing") {
        return;
    }
    state.mode = "crashed";
    state.best = Math.max(state.best, state.score);
    state.lastRunCoins = Math.max(0, Math.round(state.score / 180));
    if (state.lastRunCoins > 0) {
        state.coins += state.lastRunCoins;
        saveProfile();
    }
    state.hudPulse = 1;
    state.lastScoreEvent = state.lastRunCoins > 0 ? `Run over. Coins earned ${formatScore(state.lastRunCoins)}` : "Run over";
    saveBestScore();
    openMenu("home");
}

function handleJump() {
    if (state.mode !== "playing") {
        return;
    }

    const player = state.player;
    if (player.grinding) {
        player.grinding = false;
        player.grindRail = null;
        player.airborne = true;
        player.vy = JUMP_VELOCITY * 0.82;
        return;
    }

    if (!player.airborne) {
        player.airborne = true;
        player.vy = JUMP_VELOCITY + player.crouch * 7 + Math.max(0, player.surfaceAngle) * 8;
        player.y += 0.12;
    }
}

function performTrick(trick) {
    const player = state.player;
    if (state.mode !== "playing" || !player.airborne || player.grinding) {
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

function updateCityPlayer(delta) {
    const player = state.player;
    const bounds = getActiveWorldBounds();
    const forwardInput = Number(state.keys.has("ArrowUp") || state.keys.has("KeyW")) - Number(state.keys.has("ArrowDown") || state.keys.has("KeyS"));
    const strafeInput = Number(state.keys.has("KeyD") || state.keys.has("ArrowRight")) - Number(state.keys.has("KeyA") || state.keys.has("ArrowLeft"));
    const crouching = state.keys.has("ArrowDown") || state.keys.has("KeyS");

    const forwardX = Math.cos(state.cameraOrbit.yaw);
    const forwardZ = -Math.sin(state.cameraOrbit.yaw);
    const rightX = -forwardZ;
    const rightZ = forwardX;
    const inputMagnitude = Math.hypot(forwardInput, strafeInput) || 1;

    if (!player.airborne && !player.grinding) {
        const acceleration = crouching ? 12 : 18;
        player.vx += ((forwardX * forwardInput + rightX * strafeInput) / inputMagnitude) * acceleration * delta;
        player.vz += ((forwardZ * forwardInput + rightZ * strafeInput) / inputMagnitude) * acceleration * delta;
        if (forwardInput === 0 && strafeInput === 0) {
            player.vx *= 0.9;
            player.vz *= 0.9;
        }
    }

    if (player.airborne) {
        player.vx *= 0.998;
        player.vz *= 0.998;
    }

    player.vx = clamp(player.vx, -MAX_SPEED, MAX_SPEED);
    player.vz = clamp(player.vz, -MAX_SPEED, MAX_SPEED);
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
        if (!rail || player.x >= rail.x1 - 0.3) {
            player.grinding = false;
            player.grindRail = null;
            player.airborne = true;
            player.vy = 4;
        } else {
            player.x += 16 * delta;
            player.z = lerp(player.z, rail.z, 0.22);
            player.y = rail.y + 0.3;
            player.vx = 16;
            player.vz = 0;
            player.vy = 0;
            player.surfaceAngle = 0;
            player.comboPoints += 24 * delta;
            player.comboMultiplier = Math.max(player.comboMultiplier, 2);
            if (player.comboMoves[player.comboMoves.length - 1] !== "Grind") {
                player.comboMoves.push("Grind");
            }
        }
    }

    if (!player.grinding && player.airborne) {
        player.vy -= GRAVITY * delta;
        player.y += player.vy * delta;
        updateTrickMotion(player, delta);

        const rail = getRailUnderPlayer();
        if (rail) {
            player.grinding = true;
            player.grindRail = rail;
            player.airborne = false;
            player.y = rail.y + 0.3;
            player.z = rail.z;
            player.vy = 0;
            resetTrickState(player);
            player.comboPoints += 140;
            player.comboMultiplier = Math.max(player.comboMultiplier, 2);
            return;
        }

        const surface = getPlayerSurfaceInfo(player);
        if (surface && player.vy <= 0 && player.y <= surface.y + BOARD_RIDE_HEIGHT) {
            if (landingError(player) > 0.5) {
                crash();
                return;
            }
            player.airborne = false;
            player.y = surface.y + BOARD_RIDE_HEIGHT;
            player.vy = 0;
            player.surfaceAngle = Math.atan(surface.slopeX || 0);
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

    const surface = getPlayerSurfaceInfo(player);
    if (!surface) {
        player.airborne = true;
        player.vy = Math.max(2, Math.hypot(player.vx, player.vz) * 0.15);
        return;
    }

    player.airborne = false;
    player.y = surface.y + BOARD_RIDE_HEIGHT;
    player.surfaceAngle = Math.atan(surface.slopeX || 0);
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
    const steer = Number(state.keys.has("ArrowRight") || state.keys.has("KeyD")) - Number(state.keys.has("ArrowLeft") || state.keys.has("KeyA"));
    const accelerate = Number(state.keys.has("ArrowUp") || state.keys.has("KeyW"));
    const crouching = state.keys.has("ArrowDown") || state.keys.has("KeyS");

    player.speed += accelerate * 18 * delta;
    player.speed -= (crouching ? 4 : 2.2) * delta;
    player.speed = clamp(player.speed, MIN_SPEED, MAX_SPEED);

    player.lateralVelocity += steer * (player.airborne ? 7.5 : 12) * delta;
    player.lateralVelocity = clamp(player.lateralVelocity, -8.5, 8.5);
    player.z += player.lateralVelocity * delta;
    player.crouch = crouching ? clamp(player.crouch + delta * 2.2, 0, 1) : clamp(player.crouch - delta * 3, 0, 1);
    player.x += player.speed * delta;

    if (player.grinding) {
        const rail = player.grindRail;
        if (!rail || player.x >= rail.x1 - 0.3) {
            player.grinding = false;
            player.grindRail = null;
            player.airborne = true;
            player.vy = 4;
        } else {
            player.y = rail.y + 0.3;
            player.z = lerp(player.z, rail.z, 0.22);
            player.vy = 0;
            player.surfaceAngle = 0;
            player.speed = clamp(player.speed + 3 * delta, MIN_SPEED, MAX_SPEED + 3);
            player.comboPoints += 24 * delta;
            player.comboMultiplier = Math.max(player.comboMultiplier, 2);
            if (player.comboMoves[player.comboMoves.length - 1] !== "Grind") {
                player.comboMoves.push("Grind");
            }
        }
    }

    if (!player.grinding && player.airborne) {
        player.vy -= GRAVITY * delta;
        player.y += player.vy * delta;
        updateTrickMotion(player, delta);

        const rail = getRailUnderPlayer();
        if (rail) {
            player.grinding = true;
            player.grindRail = rail;
            player.airborne = false;
            player.y = rail.y + 0.3;
            player.z = rail.z;
            player.vy = 0;
            resetTrickState(player);
            player.comboPoints += 140;
            player.comboMultiplier = Math.max(player.comboMultiplier, 2);
            return;
        }

        const surface = getSurfaceInfo(player.x);
        if (surface && player.vy <= 0 && player.y <= surface.y + BOARD_RIDE_HEIGHT) {
            if (Math.abs(player.z) > TRACK_HALF - 0.8 || landingError(player) > 0.5) {
                crash();
                return;
            }
            player.airborne = false;
            player.y = surface.y + BOARD_RIDE_HEIGHT;
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

    if (!player.airborne && !player.grinding) {
        const surface = getSurfaceInfo(player.x);
        const ahead = getSurfaceInfo(player.x + 0.6);
        if (!surface || !ahead) {
            player.airborne = true;
            player.vy = Math.max(3, player.speed * Math.max(0.08, player.surfaceAngle + 0.12));
            return;
        }
        if (Math.abs(player.z) > TRACK_HALF - 0.8) {
            crash();
            return;
        }

        player.y = surface.y + BOARD_RIDE_HEIGHT;
        player.surfaceAngle = ahead.angle;
        player.speed += clamp(-surface.angle * 12, -4, 8) * delta;
        player.lateralVelocity *= 0.88;
        dampTrickMotion(player, 0.82);
    }

    player.bodyLean = lerp(player.bodyLean, -player.lateralVelocity * 0.06, 0.16);
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
    const activeRideGroup = usingScooter ? scooterGroup : boardGroup;
    const grounded = !player.airborne && !player.grinding;
    const speedRatio = clamp(player.speed / MAX_SPEED, 0, 1);
    const motionPhase = state.time * (4 + player.speed * 0.9);
    const stride = grounded ? Math.sin(motionPhase) * speedRatio : 0;
    const bounce = grounded ? Math.abs(Math.sin(motionPhase * 2)) * 0.045 * speedRatio : Math.sin(state.time * 9) * 0.03;
    const boardBob = grounded ? Math.sin(motionPhase * 2) * 0.02 * speedRatio : Math.sin(state.time * 8) * 0.05;
    const boardPitch = grounded ? -player.crouch * 0.12 + bounce * 0.8 : 0.08;
    const boardRoll = player.grinding ? 0.08 : 0;
    const scooterBarTurn = usingScooter ? player.scooterBarSpin : 0;
    const scooterDeckTurn = usingScooter ? player.scooterTailwhip : 0;

    playerRoot.position.set(player.x, player.y, player.z);

    wheelMeshes.forEach((wheel, index) => {
        wheel.rotation.x = state.time * (6 + player.speed * 2.4) * (index % 2 === 0 ? 1 : 1.02);
    });

    scooterWheelMeshes.forEach((wheel, index) => {
        wheel.rotation.x = state.time * (6.4 + player.speed * 2.2) * (index === 0 ? 1 : 1.03);
    });

    boardGroup.position.y = usingScooter ? 0 : boardBob;
    scooterGroup.position.y = usingScooter ? boardBob : 0;
    scooterFrontAssembly.rotation.set(0, scooterBarTurn, 0);
    scooterDeckAssembly.rotation.set(0, scooterDeckTurn, 0);
    riderGroup.position.y = 0.2 - player.crouch * 0.35 + bounce;

    if (player.airborne) {
        torso.rotation.x = -0.28 - player.crouch * 0.14;
        torso.rotation.z = player.trickRoll * 0.08;
        head.position.y = 1.9;
        head.rotation.x = 0.18;
        leftLeg.rotation.x = usingScooter ? -0.54 : -0.7 - player.trickFlip * 0.04;
        rightLeg.rotation.x = usingScooter ? -0.48 : -0.35 + player.trickFlip * 0.04;
        leftLeg.rotation.z = -0.15;
        rightLeg.rotation.z = 0.15;
        leftArm.rotation.x = usingScooter ? -0.76 : -1.1;
        rightArm.rotation.x = usingScooter ? -0.76 : -0.7;
        leftArm.rotation.z = usingScooter ? -0.12 : -0.35;
        rightArm.rotation.z = usingScooter ? 0.12 : 0.35;
    } else if (player.grinding) {
        torso.rotation.x = -0.16;
        torso.rotation.z = 0.08;
        head.position.y = 1.93;
        head.rotation.x = 0.08;
        leftLeg.rotation.x = usingScooter ? -0.32 : -0.42;
        rightLeg.rotation.x = usingScooter ? -0.3 : -0.18;
        leftLeg.rotation.z = -0.12;
        rightLeg.rotation.z = 0.1;
        leftArm.rotation.x = usingScooter ? -0.42 : -0.45;
        rightArm.rotation.x = usingScooter ? -0.28 : 0.2;
        leftArm.rotation.z = usingScooter ? -0.06 : -0.22;
        rightArm.rotation.z = usingScooter ? 0.06 : 0.3;
    } else {
        torso.rotation.x = -0.06 - player.crouch * 0.24 + Math.abs(stride) * 0.08;
        torso.rotation.z = player.bodyLean * 0.3;
        head.position.y = 1.95 + bounce * 0.2;
        head.rotation.x = 0.04 + player.crouch * 0.08;
        leftLeg.rotation.x = usingScooter ? -0.18 + stride * 0.18 : stride * 0.65 - player.crouch * 0.2;
        rightLeg.rotation.x = usingScooter ? -0.2 - stride * 0.18 : -stride * 0.65 - player.crouch * 0.2;
        leftLeg.rotation.z = -player.bodyLean * 0.15;
        rightLeg.rotation.z = player.bodyLean * 0.15;
        leftArm.rotation.x = usingScooter ? -0.6 : -stride * 0.45 - 0.18;
        rightArm.rotation.x = usingScooter ? -0.6 : stride * 0.45 - 0.18;
        leftArm.rotation.z = usingScooter ? -0.08 - player.bodyLean * 0.08 : -0.12 - player.bodyLean * 0.12;
        rightArm.rotation.z = usingScooter ? 0.08 + player.bodyLean * 0.08 : 0.12 + player.bodyLean * 0.12;
    }

    if (isOpenWorldMap()) {
        playerRoot.rotation.set(0, player.heading, 0);
        activeRideGroup.rotation.x = player.trickFlip + boardPitch - (surface?.slopeZ || 0) * 0.35;
        activeRideGroup.rotation.y = player.grinding ? 0.6 : player.trickSpin;
        activeRideGroup.rotation.z = player.trickRoll + boardRoll + player.bodyLean * 0.16 + (surface?.slopeX || 0) * 0.22;
        riderGroup.rotation.y = player.bodySpin;
        riderGroup.rotation.z = player.grinding ? 0.12 : player.bodyLean;
        return;
    }

    playerRoot.rotation.set(0, player.bodyLean * 0.42, player.surfaceAngle);

    activeRideGroup.rotation.x = player.trickFlip + boardPitch;
    activeRideGroup.rotation.y = player.grinding ? 0.6 : player.trickSpin;
    activeRideGroup.rotation.z = player.trickRoll + boardRoll;
    riderGroup.rotation.y = player.bodySpin;
    riderGroup.rotation.z = player.grinding ? 0.12 : player.bodyLean;
}

function update(delta) {
    if (state.mode !== "playing") {
        state.hudPulse = Math.max(0, state.hudPulse - delta * 2.4);
        updateHud();
        return;
    }

    generateWorldAhead(state.player.x + FAR_AHEAD);
    updatePlayer(delta);
    updateSolidCollisions();
    updatePickups(delta);
    updateObstacles();
    pruneWorld();
    updatePlayerVisuals();
    updateCamera();
    state.hudPulse = Math.max(0, state.hudPulse - delta * 2.4);
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

function animate(timestamp = 0) {
    const currentTime = timestamp / 1000;
    const delta = Math.min(0.033, currentTime - state.time || 0.016);
    state.time = currentTime;

    update(delta);

    skyline.position.x = Math.floor(state.player.x / 22) * 22;
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
    const trick = getActiveTrickLibrary()[event.code];
    if (trick) {
        performTrick(trick);
    }
});

document.addEventListener("keyup", (event) => {
    state.keys.delete(event.code);
});

menuTabs.addEventListener("click", (event) => {
    const button = event.target.closest(".menu-tab");
    if (!button) {
        return;
    }
    state.activeMenuPanel = button.dataset.panel;
    renderMenu();
});

startRideButton.addEventListener("click", () => {
    startRun();
});

resumeRideButton.addEventListener("click", () => {
    closeMenu();
});

canvas.addEventListener("pointerdown", (event) => {
    if (state.menuVisible) {
        return;
    }
    beginLook(event.pointerId, event.clientX, event.clientY);
    canvas.setPointerCapture?.(event.pointerId);
});

canvas.addEventListener("pointermove", (event) => {
    if (state.cameraOrbit.pointerId !== event.pointerId) {
        return;
    }
    updateLook(event.clientX, event.clientY);
});

canvas.addEventListener("pointerup", (event) => {
    endLook(event.pointerId);
    canvas.releasePointerCapture?.(event.pointerId);
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
applyRideSkin();
resize();
startRun();
openMenu("home");
requestAnimationFrame(animate);