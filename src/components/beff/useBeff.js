import { useState, useEffect, useMemo } from "react";

// ─── Slot enums ──────────────────────────────────────────────────────────────
// Component IDs per forge.plebmasters.de
export const SLOT_ENUM = {
  head: 0,
  berd: 1, // masks
  hair: 2,
  uppr: 3, // torsos
  lowr: 4, // legs
  hand: 5, // bags + parachute
  feet: 6, // shoes
  teef: 7, // accessories
  accs: 8, // undershirts
  task: 9, // body armor
  decl: 10, // decals
  jbib: 11, // tops
};

// ─── Unified slot list (components + props) ───────────────────────────────────
// folderNum mirrors the numeric folder on disk (0-11 = components, 12+ = props)
// isProp / compID are only present on prop slots
export const SLOTS = [
  // Components
  { id: "jbib", label: "JBIB", desc: "Tops", folderNum: 11 },
  { id: "uppr", label: "UPPR", desc: "Torsos", folderNum: 3 },
  { id: "accs", label: "ACCS", desc: "Undershirts", folderNum: 8 },
  { id: "lowr", label: "LOWR", desc: "Legs", folderNum: 4 },
  { id: "feet", label: "FEET", desc: "Shoes", folderNum: 6 },
  { id: "teef", label: "TEEF", desc: "Accessories", folderNum: 7 },
  { id: "hand", label: "HAND", desc: "Bags / Parachute", folderNum: 5 },
  { id: "task", label: "TASK", desc: "Body Armor", folderNum: 9 },
  { id: "berd", label: "BERD", desc: "Masks", folderNum: 1 },
  { id: "head", label: "HEAD", desc: "Heads", folderNum: 0 },
  { id: "hair", label: "HAIR", desc: "Hair", folderNum: 2 },
  { id: "decl", label: "DECL", desc: "Decals", folderNum: 10 },
  // Props
  {
    id: "p_head",
    label: "Hats",
    desc: "Hats",
    folderNum: 12,
    isProp: true,
    compID: 0,
  },
  {
    id: "p_eyes",
    label: "Glasses",
    desc: "Glasses",
    folderNum: 13,
    isProp: true,
    compID: 1,
  },
  {
    id: "p_ears",
    label: "Ears",
    desc: "Ears",
    folderNum: 14,
    isProp: true,
    compID: 2,
  },
  {
    id: "p_lwrist",
    label: "Watches",
    desc: "Watches",
    folderNum: 18,
    isProp: true,
    compID: 6,
  },
  {
    id: "p_rwrist",
    label: "Bracelets",
    desc: "Bracelets",
    folderNum: 19,
    isProp: true,
    compID: 7,
  },
];

// Quick lookups
export const SLOT_MAP = Object.fromEntries(SLOTS.map((s) => [s.id, s]));
export const COMPONENT_SLOTS = SLOTS.filter((s) => !s.isProp);
export const PROP_SLOTS = SLOTS.filter((s) => s.isProp);

// ─── Genders ──────────────────────────────────────────────────────────────────
export const GENDERS = [
  { id: "m", label: "Male" },
  { id: "f", label: "Female" },
];

// ─── Image paths ─────────────────────────────────────────────────────────────
// Images live in public/beff/{gender}/{slot}/{folderNum}_{drawable}_{texture}.jpg
// e.g. public/beff/m/accs/8_0_0.jpg
// Vite serves public/ at the root — no import needed, just a direct URL.
export function imgPath(gender, slot, drawable, texture) {
  const { folderNum } = SLOT_MAP[slot] ?? {};
  return `/beff/${gender}/${slot}/${folderNum}_${drawable}_${texture}.jpg`;
}

export function placeholderImg(slot, drawable, texture) {
  const label = `${slot.toUpperCase()}%0A${drawable}_${texture}`;
  return `https://placehold.co/200x200/111111/D4AF37?text=${label}&font=monospace`;
}

// ─── Data fetching ────────────────────────────────────────────────────────────
export function useBeffSlot(gender, slot) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gender || !slot) return;
    setLoading(true);
    setError(null);
    fetch(`/data/beff/${gender}_${slot}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [gender, slot]);

  return { items: data, loading, error };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function groupByDrawable(items) {
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.drawable)) map.set(item.drawable, []);
    map.get(item.drawable).push(item);
  }
  return map;
}

/**
 * Unified build call — auto-routes based on whether `slot` is a prop or component.
 *
 * Components → SetPedComponentVariation(ped, enumVal, drawable, texture, 2)
 * Props      → SetPedPropIndex(ped, compID, drawable, texture, true)
 */
export function buildCall(slot, drawable, texture) {
  const def = SLOT_MAP[slot];
  if (def?.isProp) {
    return `SetPedPropIndex(ped, ${def.compID}, ${drawable}, ${texture}, true)`;
  }
  const enumVal = SLOT_ENUM[slot] ?? 0;
  return `SetPedComponentVariation(ped, ${enumVal}, ${drawable}, ${texture}, 2)`;
}

// Kept for backward-compat — prefer buildCall()
export const buildComponentCall = buildCall;
