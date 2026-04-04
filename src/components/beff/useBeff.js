import { useState, useEffect, useMemo } from "react";

// ─── Slot enums ──────────────────────────────────────────────────────────────
export const SLOT_ENUM = {
  head: 0,
  berd: 1,
  hair: 2,
  uppr: 3,
  lowr: 4,
  hand: 5,
  feet: 6,
  teef: 7,
  accs: 8,
  task: 9,
  decl: 10,
  jbib: 11,
};

// ─── Unified slot list (components + props) ───────────────────────────────────
export const SLOTS = [
  { id: "jbib", label: "JBIB", desc: "Tops (Torso 2)", folderNum: 11 },
  { id: "uppr", label: "UPPR", desc: "Torsos (Gloves)", folderNum: 3 },
  { id: "accs", label: "ACCS", desc: "Undershirts (Torso 1)", folderNum: 8 },
  { id: "lowr", label: "LOWR", desc: "Legs", folderNum: 4 },
  { id: "feet", label: "FEET", desc: "Shoes", folderNum: 6 },
  { id: "teef", label: "TEEF", desc: "Accessories", folderNum: 7 },
  { id: "hand", label: "HAND", desc: "Bags / Parachute", folderNum: 5 },
  { id: "task", label: "TASK", desc: "Body Armor", folderNum: 9 },
  { id: "berd", label: "BERD", desc: "Masks", folderNum: 1 },
  { id: "head", label: "HEAD", desc: "Heads", folderNum: 0 },
  { id: "hair", label: "HAIR", desc: "Hair", folderNum: 2 },
  { id: "decl", label: "DECL", desc: "Decals", folderNum: 10 },
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

export const SLOT_MAP = Object.fromEntries(SLOTS.map((s) => [s.id, s]));
export const COMPONENT_SLOTS = SLOTS.filter((s) => !s.isProp);
export const PROP_SLOTS = SLOTS.filter((s) => s.isProp);

export const GENDERS = [
  { id: "m", label: "Male" },
  { id: "f", label: "Female" },
];

// ─── Flip type ────────────────────────────────────────────────────────────────
//
// "c1_drives" — JBIB / TASK / p_head
//   C1 = the drawable+texture you CHOOSE — its texture is the color/pattern.
//   C2 = the piece being flipped — use texture 0 (any texture works here).
//   Result = C2 wearing C1's color.
//
// "c2_drives" — all other slots
//   C1 = a fixed base drawable (e.g. uppr 3) — this doesn't change.
//   C2 = the piece you want — its TEXTURE is the final result color.
//   Result = the finished look.
//
export const FLIP_TYPE = {
  jbib: "c1_drives",
  task: "c1_drives",
  p_head: "c1_drives",
};

export function getFlipType(slot) {
  return FLIP_TYPE[slot] ?? "c2_drives";
}

// ─── Flip companion ───────────────────────────────────────────────────────────
//
// The secondary item that must be equipped alongside C1+C2 to achieve the flip.
// drawable/texture values are placeholders — update with confirmed in-game IDs.
//
// Classic Parachute → feet, uppr (belt/torso 1), teef (accessories)
// Israel Parachute  → jbib (torso 2), lowr, task, decl
// Glasses           → p_head (hats need glasses equipped)
// Gloves            → hand (bags need gloves equipped)
//
export const FLIP_COMPANION = {
  // ── hand slot companions ───────────────────────────────────────────────────
  jbib: { slot: "hand", drawable: 21, texture: 19, label: "Israel Parachute" },
  lowr: { slot: "hand", drawable: 21, texture: 19, label: "Israel Parachute" },
  task: { slot: "hand", drawable: 21, texture: 19, label: "Israel Parachute" },
  decl: { slot: "hand", drawable: 21, texture: 19, label: "Israel Parachute" },
  feet: { slot: "hand", drawable: 68, texture: 0, label: "Classic Parachute" },
  uppr: { slot: "hand", drawable: 68, texture: 0, label: "Classic Parachute" },
  teef: { slot: "hand", drawable: 68, texture: 0, label: "Classic Parachute" },
  // ── prop companions ────────────────────────────────────────────────────────
  p_head: { slot: "p_eyes", drawable: 0, texture: 0, label: "Glasses" },
  // ── teef companion ─────────────────────────────────────────────────────────
  hand: { slot: "teef", drawable: 0, texture: 0, label: "Gloves" },
};

/** Returns the companion item required for flipping a given slot, or null. */
export function getFlipCompanion(slot) {
  return FLIP_COMPANION[slot] ?? null;
}

// ─── Baseline C1 options ──────────────────────────────────────────────────────
//
// Pre-curated starting points shown in the flip panel.
//
// c1_drives slots → JBIB/TASK/HAT drawables with many texture variations.
// c2_drives slots → common UPPR (torso) base values used as C1.
//
export const BASELINE_C1S = {
  // ── c1_drives ─────────────────────────────────────────────────────────────
  jbib: [
    {
      drawable: 190,
      textures: 26,
      label: "Basic Tee",
      note: "26 colors — best all-rounder",
    },
    {
      drawable: 14,
      textures: 14,
      label: "Crew Neck Sweater",
      note: "14 colors",
    },
    { drawable: 33, textures: 16, label: "Zip-Up Hoodie", note: "16 colors" },
  ],
  task: [
    { drawable: 0, textures: 1, label: "No Armor" },
    { drawable: 6, textures: 12, label: "Light Armor", note: "12 colors" },
    { drawable: 14, textures: 12, label: "Heavy Armor", note: "12 colors" },
  ],
  p_head: [
    { drawable: 1, textures: 26, label: "Baseball Cap", note: "26 colors" },
    { drawable: 10, textures: 14, label: "Beanie", note: "14 colors" },
    { drawable: 45, textures: 16, label: "Snapback", note: "16 colors" },
  ],

  // ── c2_drives — common UPPR bases ─────────────────────────────────────────
  uppr: [
    { drawable: 3, label: "UPPR 3", note: "works with most tops" },
    { drawable: 5, label: "UPPR 5", note: "open jacket base" },
    { drawable: 9, label: "UPPR 9", note: "tucked shirt base" },
    { drawable: 14, label: "UPPR 14", note: "t-shirt base" },
  ],
  accs: [
    { drawable: 32, label: "ACCS 32", note: "standard undershirt" },
    { drawable: 33, label: "ACCS 33", note: "alternative base" },
    { drawable: 119, label: "ACCS 119", note: "hoodie undershirt" },
  ],
  lowr: [
    { drawable: 3, label: "UPPR 3", note: "standard" },
    { drawable: 9, label: "UPPR 9", note: "tucked" },
  ],
  feet: [
    { drawable: 3, label: "UPPR 3", note: "standard" },
    { drawable: 9, label: "UPPR 9", note: "tucked" },
  ],
  berd: [{ drawable: 3, label: "UPPR 3", note: "standard base" }],
  teef: [{ drawable: 3, label: "UPPR 3", note: "standard base" }],
  hand: [{ drawable: 3, label: "UPPR 3", note: "standard base" }],
  decl: [{ drawable: 14, label: "UPPR 14", note: "t-shirt base for decals" }],
  p_eyes: [{ drawable: 3, label: "UPPR 3", note: "standard base" }],
  p_ears: [{ drawable: 3, label: "UPPR 3", note: "standard base" }],
  p_lwrist: [{ drawable: 3, label: "UPPR 3", note: "standard base" }],
  p_rwrist: [{ drawable: 3, label: "UPPR 3", note: "standard base" }],
};

// ─── Image paths ──────────────────────────────────────────────────────────────
// Both components and props use {folderNum}_{drawable}_{texture}.jpg
// e.g. public/beff/m/accs/8_0_0.jpg  |  public/beff/m/p_head/12_0_0.jpg
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
    fetch(`/data/beff/${gender}/${gender}_${slot}.json`)
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

export function buildCall(slot, drawable, texture) {
  const def = SLOT_MAP[slot];
  if (def?.isProp) {
    return `SetPedPropIndex(ped, ${def.compID}, ${drawable}, ${texture}, true)`;
  }
  const enumVal = SLOT_ENUM[slot] ?? 0;
  return `SetPedComponentVariation(ped, ${enumVal}, ${drawable}, ${texture}, 2)`;
}

export const buildComponentCall = buildCall;
