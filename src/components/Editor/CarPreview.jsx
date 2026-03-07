/**
 * CarPreview.jsx — 3D Car Visualizer with Vehicle Class Tabs
 * ─────────────────────────────────────────────────────────────────────────────
 * Props: { config, crewVisible, crewTarget }
 *
 * VEHICLE MODELS — download each GLB from Sketchfab and place in /public/models/:
 *   Muscle  → mustang.glb    (already done — Ford Mustang GT Drift Spec)
 *   Sports  → wrx.glb        → search: "Subaru WRX STI" or "Elegy RH8"
 *   Super   → turismo.glb    → search: "Ferrari 458 Italia" or "Turismo R"
 *   SUV     → granger.glb    → search: "Chevrolet Suburban" or "Granger"
 *   Coupe   → felon.glb      → search: "Jaguar XE" or "Felon GTA V"
 *   Sedan   → stafford.glb   → search: "Lincoln Town Car" or "Stafford GTA"
 *   Offroad → rebel.glb      → search: "Ford F-150 Raptor" or "Rebel GTA V"
 *
 * Each vehicle needs its own MESH_OVERRIDES entry — use the ⊕ ASSIGN MESHES
 * picker after placing the GLB, export the map, paste it into the vehicle's
 * overrides object below.
 */

import {
  useRef,
  useEffect,
  useMemo,
  Suspense,
  useState,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  Html,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";

// ─── VEHICLE CLASS REGISTRY ───────────────────────────────────────────────────
// Add each vehicle here. icon is an emoji used in the tab row.
// overrides: mesh → slot map (use the picker tool to generate these per vehicle).
const VEHICLES = [
  {
    id: "muscle",
    label: "Muscle",
    icon: "🔥",
    model: "/models/mustang.glb",
    overrides: {
      Object_27: "primary",
      Object_28: "primary",
      Object_29: "secondary",
      Object_30: "secondary",
      Object_31: "secondary",
      Object_32: "secondary",
      Object_3: "tire",
      Object_35: "secondary",
      Object_36: "secondary",
      Object_37: "secondary",
      Object_38: "secondary",
      Object_25: "rim",
      Object_33: "rim",
      Object_39: "rim",
      Object_40: "rim",
      Object_41: "rim",
      Object_45: "rim",
      Object_47: "rim",
      Object_49: "rim",
      Object_51: "rim",
      Object_23: "glass",
      Object_53: "tire",
      Object_54: "tire",
    },
  },
  {
    id: "sports",
    label: "Sports",
    icon: "⚡",
    model: "/models/r8.glb",
    overrides: {
      Object_97: "secondary",
      Object_99: "glass",
      Object_225: "secondary",
      Object_304: "glass",
      Object_313: "rim",
      Object_338: "rim",
      Object_340: "rim",
      Object_317: "rim",
      Object_315: "rim",
      Object_336: "rim",
      Object_334: "rim",
      Object_319: "rim",
      Object_352: "rim",
      Object_354: "rim",
      Object_356: "rim",
      Object_350: "rim",
      Object_361: "rim",
      Object_363: "rim",
      Object_365: "rim",
      Object_367: "rim",
      Object_372: "tire",
      Object_345: "tire",
      Object_329: "tire",
      Object_324: "tire",
      Object_39: "glass",
      Object_17: "glass",
      Object_41: "glass",
      Object_11: "glass",
      Object_45: "glass",
      Object_29: "glass",
      Object_269: "glass",
      Object_244: "glass",
      Object_102: "glass",
      Object_131: "tire",
      Object_128: "tire",
      Object_122: "tire",
      Object_125: "tire",
      Object_126: "rim",
      Object_123: "rim",
      Object_132: "rim",
      Object_129: "rim",
      Object_90: "secondary",
    },
  },
  {
    id: "super",
    label: "Super",
    icon: "🏎",
    model: "/models/p1.glb",
    overrides: {
      polymsh_detached73_SUB1_Windows_alpha_0: "glass",
      polymsh5_SUB5_Windows_alpha_0: "glass",
      g_Window_B_SUB0_Windows_alpha_0: "glass",
      GEO_DOOR_RR_SUB2_Windows_alpha_0: "glass",
      g_Body_SUB1_Carpaint_Black_0: "secondary",
      g_Bumper_F_SUB0_Carbon_Mult50_0: "secondary",
      polymsh5_SUB1_Carpaint_Black_0: "secondary",
      GEO_DOOR_RR_SUB1_Carpaint_Black_0: "secondary",
      g_Diffuser_2_INT_carbon_0: "secondary",
      Rim_LF1_SUB0_Rim_0: "rim",
    },
  },
  {
    id: "suv",
    label: "SUV",
    icon: "🚙",
    model: "/models/g63.glb",
    overrides: {
      Object_519: "rim",
      Object_531: "rim",
      Object_549: "rim",
      Object_551: "rim",
      Object_541: "rim",
      Object_425: "rim",
      Object_529: "rim",
      Object_521: "tire",
      Object_523: "tire",
      Object_543: "tire",
      Object_533: "tire",
      Object_410: "secondary",
      Object_415: "secondary",
      Object_255: "primary",
      Object_305: "secondary",
      Object_201: "secondary",
      Object_192: "secondary",
      Object_251: "primary",
      Object_206: "secondary",
    },
  },
  {
    id: "coupe",
    label: "Coupe",
    icon: "✨",
    model: "/models/jag.glb",
    overrides: {
      Object_39: "glass",
      Object_17: "glass",
      Object_41: "glass",
      Object_11: "glass",
      Object_97: "secondary",
      Object_99: "secondary",
      Object_225: "secondary",
      Object_83: "secondary",
      Object_304: "secondary",
      Object_319: "rim",
      Object_313: "rim",
      Object_340: "rim",
      Object_338: "rim",
      Object_336: "rim",
      Object_334: "rim",
      Object_317: "rim",
      Object_315: "rim",
      Object_208: "primary",
      Object_350: "rim",
      Object_356: "rim",
      Object_352: "rim",
      Object_354: "rim",
      Object_361: "rim",
      Object_367: "rim",
      Object_365: "rim",
      Object_363: "rim",
      Object_329: "tire",
      Object_324: "tire",
      Object_345: "tire",
      Object_372: "tire",
      Object_29: "glass",
      Object_45: "glass",
    },
  },
  {
    id: "sedan",
    label: "Sedan",
    icon: "🚗",
    model: "/models/m5.glb",
    overrides: {
      Object_93: "glass",
      Object_144: "tire",
      Object_149: "tire",
      Object_159: "tire",
      Object_154: "tire",
      Object_162: "rim",
      Object_161: "rim",
      Object_157: "rim",
      Object_156: "rim",
      Object_146: "rim",
      Object_108: "primary",
      Object_147: "rim",
      Object_151: "rim",
      Object_152: "rim",
      Object_140: "secondary",
      Object_134: "secondary",
      Object_142: "secondary",
      Object_84: "secondary",
      Object_132: "secondary",
      Object_51: "secondary",
      Object_136: "secondary",
      Object_57: "secondary",
    },
  },
  {
    id: "offroad",
    label: "Off-Road",
    icon: "🛻",
    model: "/models/jeep.glb",
    overrides: {
      Object_8: "rim",
      Object_104: "rim",
      Object_96: "rim",
      Object_47: "rim",
      Object_65: "tire",
      Object_29: "tire",
      Object_59: "tire",
      Object_23: "tire",
      Object_71: "glass",
      Object_76: "secondary",
      Object_117: "secondary",
    },
  },
];

// ─── TEXTURES ─────────────────────────────────────────────────────────────────
const TEXTURE_URLS = {
  carbon: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  brushed: "https://www.transparenttextures.com/patterns/brushed-alum-dark.png",
  worn: "https://www.transparenttextures.com/patterns/worn-dots.png",
};

// ─── MESH CLASSIFICATION ──────────────────────────────────────────────────────
const SLOT_KEYWORDS = {
  primary: [
    "body",
    "hood",
    "door",
    "trunk",
    "fender",
    "roof",
    "bumper",
    "panel",
    "quarter",
    "spoiler",
    "cap",
    "shell",
    "exterior",
    "paint",
    "car_body",
    "chassis",
  ],
  secondary: [
    "secondary",
    "trim",
    "detail",
    "stripe",
    "accent",
    "sill",
    "skirt",
    "lower",
    "rocker",
    "splitter",
    "lip",
  ],
  rim: [
    "rim",
    "spoke",
    "alloy",
    "hubcap",
    "center",
    "wheel_r",
    "wheel_f",
    "disc",
    "caliper",
  ],
  glass: ["glass", "window", "windshield", "windscreen", "screen", "visor"],
  tire: ["tire", "tyre", "rubber"],
  chrome: [
    "chrome",
    "grill",
    "grille",
    "exhaust",
    "pipe",
    "mirror",
    "badge",
    "light",
    "headlight",
    "taillight",
  ],
  interior: [
    "interior",
    "seat",
    "dash",
    "dashboard",
    "cabin",
    "steering",
    "carpet",
    "console",
  ],
};

function getSlot(name, overrides = {}) {
  if (!name) return "primary";
  if (overrides[name]) return overrides[name];
  const lower = name.toLowerCase();
  for (const [slot, keys] of Object.entries(SLOT_KEYWORDS)) {
    if (keys.some((k) => lower.includes(k))) return slot;
  }
  return "primary";
}

// ─── COLOR HELPERS ────────────────────────────────────────────────────────────
function toThreeColor(hex) {
  if (!hex || hex === "transparent") return new THREE.Color(0x111111);
  if (
    typeof hex === "string" &&
    (hex.includes("gradient") || hex.includes("linear"))
  )
    return new THREE.Color(0x111111);
  const c = hex.startsWith("#") ? hex : `#${hex.replace("#", "")}`;
  try {
    return new THREE.Color(c);
  } catch {
    return new THREE.Color(0x111111);
  }
}

function hexToRgb(hex) {
  const c = (hex || "111111")
    .replace(/^#/, "")
    .replace(/[^0-9a-fA-F]/g, "0")
    .padEnd(6, "0");
  return {
    r: parseInt(c.slice(0, 2), 16),
    g: parseInt(c.slice(2, 4), 16),
    b: parseInt(c.slice(4, 6), 16),
  };
}

const isGradient = (h) =>
  typeof h === "string" && (h.includes("gradient") || h.includes("linear"));

function parseGradientStops(gradientStr) {
  const m = gradientStr.match(/#[0-9a-fA-F]{6}/g);
  if (!m || !m.length) return [new THREE.Color(0x111111)];
  return m.map((h) => new THREE.Color(h));
}

function sampleGradient(stops, t) {
  if (stops.length === 1) return stops[0].clone();
  const scaled = t * (stops.length - 1);
  const lo = Math.floor(scaled);
  const hi = Math.min(lo + 1, stops.length - 1);
  return stops[lo].clone().lerp(stops[hi], scaled - lo);
}

// ─── TEXTURE BUILDERS ─────────────────────────────────────────────────────────
const texCache = {};
function buildCompositeTexture(patternUrl, baseHex, crewHex, crewOpacity) {
  const key = `${patternUrl}|${baseHex}|${crewHex}|${crewOpacity.toFixed(2)}`;
  if (texCache[key]) return texCache[key];
  const p = new Promise((resolve) => {
    const SIZE = 512;
    const cv = document.createElement("canvas");
    cv.width = cv.height = SIZE;
    const ctx = cv.getContext("2d");
    const { r, g, b } = hexToRgb(baseHex);
    const crew = hexToRgb(crewHex || "ffffff");
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, SIZE, SIZE);
    const img = new Image();
    img.crossOrigin = "anonymous";
    const finish = () => {
      if (crewOpacity > 0.01) {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(${crew.r},${crew.g},${crew.b},${crewOpacity})`;
        ctx.fillRect(0, 0, SIZE, SIZE);
      }
      ctx.globalCompositeOperation = "source-over";
      const tex = new THREE.CanvasTexture(cv);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.onload = () => {
      ctx.globalAlpha = 0.45;
      ctx.globalCompositeOperation = "multiply";
      const pat = ctx.createPattern(img, "repeat");
      if (pat) {
        ctx.fillStyle = pat;
        ctx.fillRect(0, 0, SIZE, SIZE);
      }
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";
      finish();
    };
    img.onerror = finish;
    img.src = patternUrl;
  });
  texCache[key] = p;
  return p;
}

const gradTexCache = {};
function buildGradientCanvasTexture(stops, crewHex, crewOpacity) {
  const key =
    stops.map((c) => c.getHexString()).join(",") +
    "|" +
    crewHex +
    "|" +
    crewOpacity.toFixed(2);
  if (gradTexCache[key]) return gradTexCache[key];
  const W = 512;
  const H = 512;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = `#${stops[0].getHexString()}`;
  ctx.fillRect(0, 0, W, H);
  const blobs = [
    {
      x: W * 0.75,
      y: H * 0.35,
      r: W * 0.7,
      si: Math.floor(stops.length * 0.65),
    },
    {
      x: W * 0.25,
      y: H * 0.65,
      r: W * 0.55,
      si: Math.floor(stops.length * 0.5),
    },
    {
      x: W * 0.85,
      y: H * 0.8,
      r: W * 0.45,
      si: Math.floor(stops.length * 0.8),
    },
  ];
  blobs.forEach(({ x, y, r, si }) => {
    const stop = stops[Math.min(si, stops.length - 1)];
    const dark = stops[0];
    const rad = ctx.createRadialGradient(x, y, 0, x, y, r);
    rad.addColorStop(0, `#${stop.getHexString()}`);
    rad.addColorStop(0.6, `#${stop.getHexString()}aa`);
    rad.addColorStop(1, `#${dark.getHexString()}00`);
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, W, H);
  });
  ctx.globalCompositeOperation = "source-over";
  if (crewOpacity > 0.01) {
    const { r, g, b } = hexToRgb(crewHex);
    ctx.fillStyle = `rgba(${r},${g},${b},${crewOpacity})`;
    ctx.fillRect(0, 0, W, H);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  tex.needsUpdate = true;
  gradTexCache[key] = tex;
  return tex;
}

// ─── PBR PROFILES ─────────────────────────────────────────────────────────────
function getPaintProfile(colorObj) {
  if (!colorObj)
    return {
      roughness: 0.5,
      metalness: 0.0,
      clearcoat: 0,
      envMapIntensity: 0.1,
      iridescence: 0,
    };
  const color = toThreeColor(colorObj.hex);
  const type = colorObj.type || "Metallic";
  const name = (colorObj.name || "").toLowerCase();
  switch (type) {
    case "Metallic":
      return {
        color,
        roughness: 0.2,
        metalness: 0.7,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        envMapIntensity: 0.9,
        iridescence: 0,
      };
    case "Matte":
      return {
        color,
        roughness: 1.0,
        metalness: 0.0,
        clearcoat: 0,
        clearcoatRoughness: 0,
        envMapIntensity: 0.0,
        iridescence: 0,
      };
    case "Chrome":
      return {
        color: new THREE.Color("#C8CDD0"),
        roughness: 0.0,
        metalness: 1.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        envMapIntensity: 2.5,
        iridescence: 0,
      };
    case "Metals": {
      const brushed = name.includes("brushed");
      return {
        color,
        roughness: brushed ? 0.55 : 0.25,
        metalness: brushed ? 0.7 : 0.9,
        clearcoat: brushed ? 0.0 : 0.5,
        clearcoatRoughness: brushed ? 0.0 : 0.1,
        envMapIntensity: brushed ? 0.4 : 1.2,
        iridescence: 0,
        _tex: brushed ? TEXTURE_URLS.brushed : TEXTURE_URLS.carbon,
      };
    }
    case "Chameleon": {
      const gradStops = isGradient(colorObj.hex)
        ? parseGradientStops(colorObj.hex)
        : null;
      const baseColor = gradStops
        ? sampleGradient(gradStops, 0.15)
        : new THREE.Color(0x111111);
      return {
        color: baseColor,
        roughness: 0.25,
        metalness: 0.35,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
        iridescence: 0.55,
        iridescenceIOR: 1.8,
        iridescenceThicknessRange: [150, 500],
        envMapIntensity: 0.3,
        _gradStops: gradStops,
        _isChameleon: true,
      };
    }
    case "Worn":
      return {
        color,
        roughness: 0.92,
        metalness: 0.0,
        clearcoat: 0,
        clearcoatRoughness: 0,
        envMapIntensity: 0.0,
        iridescence: 0,
        _tex: TEXTURE_URLS.worn,
      };
    case "Util":
      return {
        color,
        roughness: 0.75,
        metalness: 0.0,
        clearcoat: 0.05,
        clearcoatRoughness: 0,
        envMapIntensity: 0.05,
        iridescence: 0,
      };
    case "Rim":
      return {
        color,
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.0,
        iridescence: 0,
      };
    default:
      return {
        color,
        roughness: 0.4,
        metalness: 0.3,
        clearcoat: 0.2,
        envMapIntensity: 0.3,
        iridescence: 0,
      };
  }
}

function needsTexture(colorObj) {
  return (
    colorObj?.isTexture ||
    ["Metals", "Worn", "Chameleon"].includes(colorObj?.type || "")
  );
}

// ─── CAMERA AUTO-FIT ──────────────────────────────────────────────────────────
function CameraRig({ target }) {
  const { camera } = useThree();
  useEffect(() => {
    if (!target) return;
    const box = new THREE.Box3().setFromObject(target);
    const sz = new THREE.Vector3();
    const ctr = new THREE.Vector3();
    box.getSize(sz);
    box.getCenter(ctr);
    const d =
      (Math.max(sz.x, sz.y, sz.z) /
        2 /
        Math.tan((camera.fov * Math.PI) / 360)) *
      1.35;
    camera.position.set(ctr.x + d * 0.75, ctr.y + d * 0.36, ctr.z + d * 0.65);
    camera.lookAt(ctr);
    camera.near = d * 0.004;
    camera.far = d * 14;
    camera.updateProjectionMatrix();
  }, [target, camera]);
  return null;
}

// ─── CAR MODEL ────────────────────────────────────────────────────────────────
function CarModel({ config, autoRotate, onLoaded, vehicleOverrides }) {
  const { scene } = useGLTF(config._modelPath);
  const groupRef = useRef();
  const matCache = useRef({});
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const ctr = new THREE.Vector3();
    box.getCenter(ctr);
    cloned.position.set(-ctr.x, -box.min.y, -ctr.z);
  }, [cloned]);

  useEffect(() => {
    if (onLoaded) onLoaded(cloned);
  }, [cloned, onLoaded]);

  const allOverrides = vehicleOverrides;

  useEffect(() => {
    if (!cloned) return;
    const { primary, secondary, pearl, rim, crew } = config;
    const crewHex = crew?.hex || "#ffffff";
    const crewActive = crew?.active ?? false;
    const crewTarget = crew?.target || "both";
    const crewOp = crewActive ? 0.92 : 0;

    const hasPearl = pearl?.hex && pearl.hex !== "transparent";
    const pearlColor = hasPearl ? toThreeColor(pearl.hex) : null;

    const crewOnSlot = (slot) => {
      if (!crewActive) return false;
      if (crewTarget === "both")
        return slot === "primary" || slot === "secondary";
      if (crewTarget === "primary") return slot === "primary";
      if (crewTarget === "secondary") return slot === "secondary";
      return false;
    };

    const applyMesh = async (child, slot) => {
      if (slot === "ignore") {
        child.visible = false;
        return;
      }
      child.visible = true;

      if (!matCache.current[child.uuid])
        matCache.current[child.uuid] = new THREE.MeshPhysicalMaterial();
      const mat = matCache.current[child.uuid];
      child.material = mat;

      mat.map = null;
      mat.transparent = false;
      mat.opacity = 1;
      mat.emissive = new THREE.Color(0, 0, 0);
      mat.emissiveIntensity = 0;
      mat.clearcoatColor = undefined;

      if (slot === "glass") {
        Object.assign(mat, {
          color: new THREE.Color("#6fa8c4"),
          roughness: 0.03,
          metalness: 0.05,
          transparent: true,
          opacity: 0.28,
          clearcoat: 1.0,
          clearcoatRoughness: 0.0,
          envMapIntensity: 1.8,
          iridescence: 0,
        });
        mat.needsUpdate = true;
        return;
      }
      if (slot === "tire") {
        Object.assign(mat, {
          color: new THREE.Color("#0d0d0d"),
          roughness: 0.93,
          metalness: 0.0,
          clearcoat: 0,
          iridescence: 0,
        });
        mat.needsUpdate = true;
        return;
      }
      if (slot === "chrome") {
        Object.assign(mat, {
          color: new THREE.Color("#A8B2B6"),
          roughness: 0.0,
          metalness: 1.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.0,
          envMapIntensity: 2.6,
          iridescence: 0,
        });
        mat.needsUpdate = true;
        return;
      }
      if (slot === "interior") {
        mat.map = null;
        Object.assign(mat, {
          color: new THREE.Color("#141414"),
          roughness: 0.82,
          metalness: 0.0,
          clearcoat: 0,
          iridescence: 0,
          envMapIntensity: 0,
        });
        mat.needsUpdate = true;
        return;
      }

      const colorObj =
        slot === "secondary" ? secondary : slot === "rim" ? rim : primary;
      if (!colorObj) {
        mat.needsUpdate = true;
        return;
      }

      const profile = getPaintProfile(colorObj);
      mat.color = profile.color;
      mat.roughness = profile.roughness ?? 0.5;
      mat.metalness = profile.metalness ?? 0.3;
      mat.clearcoat = profile.clearcoat ?? 0;
      mat.clearcoatRoughness = profile.clearcoatRoughness ?? 0;
      mat.envMapIntensity = profile.envMapIntensity ?? 1.0;
      mat.iridescence = profile.iridescence ?? 0;
      mat.iridescenceIOR = profile.iridescenceIOR ?? 1.5;
      mat.iridescenceThicknessRange = profile.iridescenceThicknessRange ?? [
        100, 400,
      ];

      if (pearlColor && (slot === "primary" || slot === "secondary")) {
        mat.clearcoatColor = pearlColor;
        mat.clearcoat = Math.max(mat.clearcoat, 0.92);
        mat.clearcoatRoughness = Math.min(mat.clearcoatRoughness, 0.06);
      }

      const withCrew = crewOnSlot(slot);

      if (colorObj.type === "Chameleon" && profile._gradStops) {
        const tex = buildGradientCanvasTexture(
          profile._gradStops,
          crewHex,
          withCrew ? crewOp : 0,
        );
        mat.map = tex;
        mat.color = new THREE.Color("#ffffff");
        const peakStop = sampleGradient(profile._gradStops, 0.65);
        mat.emissive = peakStop.clone().multiplyScalar(0.5);
        mat.emissiveIntensity = 0.22;
      } else if (needsTexture(colorObj)) {
        const texUrl = profile._tex || TEXTURE_URLS.carbon;
        const tex = await buildCompositeTexture(
          texUrl,
          (colorObj.hex || "111111").replace("#", ""),
          crewHex,
          withCrew ? crewOp : 0,
        );
        mat.map = tex;
        mat.color = new THREE.Color("#ffffff");
      } else if (withCrew) {
        const base = toThreeColor(colorObj.hex);
        const crew = toThreeColor(crewHex);
        mat.color = base.clone().lerp(crew, 0.9);
      }

      mat.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    };

    cloned.traverse((child) => {
      if (child.isMesh) applyMesh(child, getSlot(child.name, allOverrides));
    });
  }, [cloned, config, allOverrides]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current)
      groupRef.current.rotation.y += delta * 0.28;
  });

  return <primitive ref={groupRef} object={cloned} />;
}

// ─── LOADER ───────────────────────────────────────────────────────────────────
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ textAlign: "center", fontFamily: "monospace" }}>
        <div
          style={{
            color: "#EAB308",
            fontSize: 10,
            letterSpacing: "0.2em",
            fontWeight: 900,
            marginBottom: 10,
          }}
        >
          LOADING MODEL
        </div>
        <div
          style={{
            width: 180,
            height: 2,
            background: "#181818",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "#EAB308",
              transition: "width 0.2s",
              borderRadius: 2,
            }}
          />
        </div>
        <div style={{ color: "#444", fontSize: 9, marginTop: 5 }}>
          {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
}

// ─── 3D SCENE ─────────────────────────────────────────────────────────────────
function Scene({ config, autoRotate, onModelLoaded, vehicleOverrides }) {
  const [model, setModel] = useState(null);
  const handleLoaded = (m) => {
    setModel(m);
    if (onModelLoaded) onModelLoaded(m);
  };

  const { orbitTarget, minDist, maxDist } = useMemo(() => {
    if (!model) return { orbitTarget: [0, 0.5, 0], minDist: 1, maxDist: 50 };
    const box = new THREE.Box3().setFromObject(model);
    const sz = new THREE.Vector3();
    box.getSize(sz);
    const d = Math.max(sz.x, sz.y, sz.z);
    return {
      orbitTarget: [0, sz.y * 0.35, 0],
      minDist: d * 0.5,
      maxDist: d * 5.5,
    };
  }, [model]);

  return (
    <>
      <PerspectiveCamera makeDefault fov={38} />
      <CameraRig target={model} />
      <OrbitControls
        enablePan={false}
        minDistance={minDist}
        maxDistance={maxDist}
        minPolarAngle={0.04}
        maxPolarAngle={Math.PI / 2.04}
        autoRotate={autoRotate}
        autoRotateSpeed={0.65}
        target={orbitTarget}
        enableDamping
        dampingFactor={0.06}
      />
      <directionalLight
        position={[8, 10, 6]}
        intensity={0.9}
        color="#fff6ee"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.0004}
      />
      <directionalLight
        position={[-8, 6, -6]}
        intensity={0.35}
        color="#cce0ff"
      />
      <directionalLight position={[0, -5, 2]} intensity={0.1} color="#aaaaaa" />
      <ambientLight intensity={0.15} />
      <Environment preset="night" />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.72}
        scale={28}
        blur={3.2}
        far={5}
      />
      <Suspense fallback={<Loader />}>
        <CarModel
          config={config}
          autoRotate={autoRotate}
          onLoaded={handleLoaded}
          vehicleOverrides={vehicleOverrides}
        />
      </Suspense>
    </>
  );
}

// ─── VEHICLE TAB ROW ──────────────────────────────────────────────────────────
function VehicleTabRow({ vehicles, activeId, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        background: "#060606",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      <style>{`.vtabs::-webkit-scrollbar{display:none}`}</style>
      {vehicles.map((v) => {
        const active = v.id === activeId;
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            style={{
              flex: "0 0 auto",
              background: active ? "rgba(234,179,8,0.07)" : "transparent",
              border: "none",
              borderBottom: `2px solid ${active ? "#EAB308" : "transparent"}`,
              borderRight: "1px solid rgba(255,255,255,0.04)",
              padding: "10px 18px 8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              transition: "all 0.15s",
              minWidth: 72,
            }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>{v.icon}</span>
            <span
              style={{
                fontSize: 8,
                fontWeight: 900,
                letterSpacing: "0.1em",
                color: active ? "#EAB308" : "rgba(255,255,255,0.3)",
                transition: "color 0.15s",
              }}
            >
              {v.label.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── WHEEL HUD (floating, bottom-right of canvas) ────────────────────────────
function WheelHud({ wheelStyle }) {
  const [expanded, setExpanded] = useState(false);
  if (!wheelStyle) return null;
  const hasImg = wheelStyle.img && wheelStyle.img !== "/no-stock.png";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 12,
        right: 12,
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 6,
      }}
    >
      {expanded && hasImg && (
        <div
          style={{
            background: "rgba(6,6,6,0.94)",
            border: "1px solid rgba(234,179,8,0.18)",
            borderRadius: 8,
            padding: "12px 12px 8px",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 12px 40px rgba(0,0,0,0.8)",
            animation: "wfadeup 0.15s ease",
          }}
        >
          <style>{`@keyframes wfadeup{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
          <img
            src={wheelStyle.img}
            alt={wheelStyle.name}
            referrerPolicy="no-referrer"
            style={{
              width: 110,
              height: 110,
              objectFit: "contain",
              filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.9))",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 900,
                color: "#EAB308",
                letterSpacing: "0.06em",
              }}
            >
              {wheelStyle.name}
            </div>
            {wheelStyle.category && (
              <div
                style={{
                  fontSize: 7.5,
                  color: "#444",
                  marginTop: 2,
                  letterSpacing: "0.1em",
                }}
              >
                {wheelStyle.category.replace(/_/g, " ").toUpperCase()}
              </div>
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          background: expanded ? "rgba(234,179,8,0.1)" : "rgba(6,6,6,0.85)",
          border: `1px solid ${expanded ? "rgba(234,179,8,0.3)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 20,
          padding: "4px 10px 4px 7px",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "all 0.15s",
        }}
      >
        {hasImg && (
          <img
            src={wheelStyle.img}
            alt=""
            referrerPolicy="no-referrer"
            style={{
              width: 16,
              height: 16,
              objectFit: "contain",
              filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
            }}
          />
        )}
        <span
          style={{
            fontSize: 8,
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: expanded ? "#EAB308" : "rgba(255,255,255,0.45)",
          }}
        >
          {wheelStyle.name?.toUpperCase() || "WHEEL"}
        </span>
        <span style={{ fontSize: 7, color: "#333" }}>
          {expanded ? "▲" : "▼"}
        </span>
      </button>
    </div>
  );
}

// ─── PAINT HUD ────────────────────────────────────────────────────────────────
const TYPE_BADGE = {
  Chrome: { bg: "#0c1c26", border: "#3a7a9a", text: "#78b8d8", icon: "✦" },
  Matte: { bg: "#141414", border: "#383838", text: "#787878", icon: "◼" },
  Chameleon: { bg: "#10081e", border: "#6a4aaa", text: "#b890f4", icon: "◈" },
  Metals: { bg: "#181208", border: "#7a5018", text: "#c09030", icon: "⬡" },
  Metallic: { bg: "#08101e", border: "#2a4880", text: "#70a0d0", icon: "◇" },
  Worn: { bg: "#141010", border: "#4a3028", text: "#886050", icon: "◧" },
};

function PaintHud({ config, crewVisible, crewTarget }) {
  const getBg = (c) => {
    if (!c?.hex || c.hex === "transparent") return "#1a1a1a";
    if (isGradient(c.hex)) return c.hex;
    return `#${c.hex.replace("#", "")}`;
  };
  const slots = [
    { label: "PRI", c: config.primary },
    { label: "SEC", c: config.secondary },
    {
      label: "PRL",
      c: config.pearl?.hex !== "transparent" ? config.pearl : null,
    },
    { label: "RIM", c: config.rim },
  ].filter((s) => s.c);
  const badge = TYPE_BADGE[config.primary?.type];
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 30,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        {slots.map(({ label, c }) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 3 }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 3,
                background: getBg(c),
                border: "1px solid rgba(255,255,255,0.1)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,0.28)",
                fontWeight: 800,
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      {config.primary && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.55)",
              fontWeight: 900,
            }}
          >
            {config.primary.name}
          </span>
          {badge && (
            <span
              style={{
                background: badge.bg,
                border: `1px solid ${badge.border}`,
                borderRadius: 3,
                padding: "1px 5px",
                fontSize: 7.5,
                color: badge.text,
                fontWeight: 900,
              }}
            >
              {badge.icon} {config.primary.type?.toUpperCase()}
            </span>
          )}
        </div>
      )}
      {crewVisible && (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 2,
              background: config.crew?.hex || "#ff00ff",
              border: "1px solid rgba(234,179,8,0.5)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 7.5,
              fontWeight: 900,
              letterSpacing: "0.1em",
              color: "rgba(234,179,8,0.75)",
            }}
          >
            CREW · {(crewTarget || "BOTH").toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function CarPreview({
  config,
  crewVisible,
  crewTarget = "both",
}) {
  const [activeVehicleId, setActiveVehicleId] = useState(VEHICLES[0].id);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hintsDone, setHintsDone] = useState(false);
  const activeVehicle =
    VEHICLES.find((v) => v.id === activeVehicleId) || VEHICLES[0];
  const vehicleOverrides = activeVehicle.overrides || {};

  const handleVehicleChange = useCallback((id) => {
    setActiveVehicleId(id);
  }, []);

  const enrichedConfig = useMemo(
    () => ({
      ...config,
      _modelPath: activeVehicle.model,
      crew: { ...config.crew, active: crewVisible, target: crewTarget },
    }),
    [config, crewVisible, crewTarget, activeVehicle],
  );

  return (
    <div
      className="w-full rounded-sm border border-white/5 overflow-hidden shadow-2xl"
      style={{ background: "#060606" }}
    >
      {/* ── VEHICLE TAB ROW ── */}
      <VehicleTabRow
        vehicles={VEHICLES}
        activeId={activeVehicleId}
        onChange={handleVehicleChange}
      />

      {/* ── 3D CANVAS ── */}
      <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
        <Canvas
          shadows
          onPointerDown={() => setHintsDone(true)}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.85,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Scene
            config={enrichedConfig}
            autoRotate={autoRotate}
            vehicleOverrides={vehicleOverrides}
          />
        </Canvas>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Paint HUD */}
        <PaintHud
          config={enrichedConfig}
          crewVisible={crewVisible}
          crewTarget={crewTarget}
        />

        {/* Top-right controls */}
        <button
          onClick={() => setAutoRotate((v) => !v)}
          className="absolute top-3 right-3 z-30"
          style={{
            background: autoRotate ? "rgba(234,179,8,0.1)" : "rgba(0,0,0,0.6)",
            border: `1px solid ${autoRotate ? "rgba(234,179,8,0.3)" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 20,
            padding: "3px 10px",
            color: autoRotate ? "#EAB308" : "#2a2a2a",
            fontSize: 8,
            fontWeight: 900,
            letterSpacing: "0.15em",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            transition: "all 0.15s",
          }}
        >
          {autoRotate ? "⟳ ROTATING" : "⟳ PAUSED"}
        </button>

        {/* Controls hint */}
        {!hintsDone && (
          <div className="absolute bottom-12 left-3 z-20 pointer-events-none flex gap-4">
            {[
              ["Drag", "Rotate"],
              ["Scroll", "Zoom"],
            ].map(([k, a]) => (
              <span
                key={k}
                style={{
                  fontSize: 8,
                  color: "rgba(255,255,255,0.18)",
                  fontFamily: "monospace",
                }}
              >
                {k} <span style={{ opacity: 0.4 }}>→</span> {a}
              </span>
            ))}
          </div>
        )}

        {/* Wheel HUD */}
        <WheelHud wheelStyle={config.wheelStyle} />
      </div>
    </div>
  );
}
