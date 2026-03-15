import * as THREE from "three";

// ─── TEXTURES ─────────────────────────────────────────────────────────────────
export const TEXTURE_URLS = {
  carbon: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  brushed: "https://www.transparenttextures.com/patterns/brushed-alum-dark.png",
  worn: "https://www.transparenttextures.com/patterns/worn-dots.png",
};

// ─── MESH CLASSIFICATION ──────────────────────────────────────────────────────
export const SLOT_KEYWORDS = {
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

export function getSlot(name, overrides = {}) {
  if (!name) return "primary";
  if (overrides[name]) return overrides[name];
  const lower = name.toLowerCase();
  for (const [slot, keys] of Object.entries(SLOT_KEYWORDS)) {
    if (keys.some((k) => lower.includes(k))) return slot;
  }
  return "primary";
}

// ─── COLOR HELPERS ────────────────────────────────────────────────────────────
export function toThreeColor(hex) {
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

export function hexToRgb(hex) {
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

export const isGradient = (h) =>
  typeof h === "string" && (h.includes("gradient") || h.includes("linear"));

export function parseGradientStops(gradientStr) {
  const hexMatches = gradientStr.match(/#[0-9a-fA-F]{6}/g);
  if (!hexMatches || !hexMatches.length) return [new THREE.Color(0x111111)];
  return hexMatches.map((h) => new THREE.Color(h));
}

export function sampleGradient(stops, t) {
  if (stops.length === 1) return stops[0].clone();
  const scaled = t * (stops.length - 1);
  const lo = Math.floor(scaled);
  const hi = Math.min(lo + 1, stops.length - 1);
  return stops[lo].clone().lerp(stops[hi], scaled - lo);
}

// ─── TEXTURE BUILDERS ─────────────────────────────────────────────────────────
const texCache = {};
export function buildCompositeTexture(
  patternUrl,
  baseHex,
  crewHex,
  crewOpacity,
) {
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
      const luma = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      if (luma > 0.08) {
        const patOpacity = Math.pow((luma - 0.08) / 0.92, 0.6) * 0.45;
        ctx.globalAlpha = patOpacity;
        ctx.globalCompositeOperation = "multiply";
        const pat = ctx.createPattern(img, "repeat");
        if (pat) {
          ctx.fillStyle = pat;
          ctx.fillRect(0, 0, SIZE, SIZE);
        }
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = "source-over";
      }
      finish();
    };
    img.onerror = finish;
    img.src = patternUrl;
  });
  texCache[key] = p;
  return p;
}

const gradTexCache = {};
export function buildGradientCanvasTexture(stops, crewHex, crewOpacity) {
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
export function getPaintProfile(colorObj) {
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
    case "Metallic": {
      const luma = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
      const envI = luma < 0.05 ? 0 : Math.pow(luma, 0.7) * 0.8;
      return {
        color,
        roughness: 0.25,
        metalness: 0.6,
        clearcoat: 0.7,
        clearcoatRoughness: 0.1,
        envMapIntensity: envI,
        iridescence: 0,
      };
    }
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
    case "Worn": {
      const luma = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
      const envI = luma < 0.05 ? 0 : Math.pow(luma, 0.7) * 0.06;
      return {
        color,
        roughness: 0.88,
        metalness: 0.0,
        clearcoat: 0.05,
        clearcoatRoughness: 0.5,
        envMapIntensity: envI,
        iridescence: 0,
      };
    }
    case "Util": {
      const luma = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
      const envI = luma < 0.05 ? 0 : Math.pow(luma, 0.7) * 0.5;
      return {
        color,
        roughness: 0.15,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        envMapIntensity: envI,
        iridescence: 0,
      };
    }
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

export function needsTexture(colorObj) {
  return colorObj?.type === "Metals";
}
