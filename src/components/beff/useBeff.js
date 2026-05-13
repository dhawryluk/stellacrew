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
  { id: "uppr", label: "UPPR", desc: "Gloves", folderNum: 3 },
  { id: "accs", label: "ACCS", desc: "Undershirts (Torso 1)", folderNum: 8 },
  { id: "lowr", label: "LOWR", desc: "Legs", folderNum: 4 },
  { id: "feet", label: "FEET", desc: "Shoes", folderNum: 6 },
  { id: "teef", label: "TEEF", desc: "Accessories", folderNum: 7 },
  { id: "hand", label: "HAND", desc: "Bags / Parachute", folderNum: 5 },
  { id: "task", label: "TASK", desc: "Body Armor", folderNum: 9 },
  { id: "berd", label: "BERD", desc: "Masks", folderNum: 1 },
  // { id: "head",  label: "HEAD",    desc: "Heads",                 folderNum: 0  },
  // { id: "hair",  label: "HAIR",    desc: "Hair",                  folderNum: 2  },
  { id: "decl", label: "DECL", desc: "Decals", folderNum: 10 },
  {
    id: "p_head",
    label: "P_HEAD",
    desc: "Hats",
    folderNum: 12,
    isProp: true,
    compID: 0,
  },
  {
    id: "p_eyes",
    label: "P_EYES",
    desc: "Glasses",
    folderNum: 13,
    isProp: true,
    compID: 1,
  },
  {
    id: "p_ears",
    label: "P_EARS",
    desc: "Ears",
    folderNum: 14,
    isProp: true,
    compID: 2,
  },
  {
    id: "p_lwrist",
    label: "P_LWRIST",
    desc: "Watches",
    folderNum: 18,
    isProp: true,
    compID: 6,
  },
  {
    id: "p_rwrist",
    label: "P_RWRIST",
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
// "c1_drives" — JBIB / TASK / DECL / p_head
//   C1 = palette drawable + texture you choose → sets color
//   C2 = the piece being flipped, texture 0 ("any texture works")
//   Result = C2 wearing C1's color
//
// "c2_drives" — all other slots
//   C1 = the item you want + texture you want (this IS the result)
//   C2 = the flip piece + same texture
//   Result = C1
export const FLIP_TYPE = {
  jbib: "c1_drives",
  task: "c1_drives",
  p_head: "c1_drives",
  decl: "c1_drives",
  p_eyes: "c1_drives",
};

export function getFlipType(slot) {
  return FLIP_TYPE[slot] ?? "c2_drives";
}

// ─── Flip companion ───────────────────────────────────────────────────────────
// Secondary item that must be equipped alongside C1+C2 to activate the flip.
//
// Classic Parachute → feet, accs (torso 1), teef, berd
// Israel Parachute  → jbib (torso 2), lowr, task, decl, uppr
// Glasses           → p_head
// Gloves (uppr)     → hand
export const FLIP_COMPANION = {
  jbib: { slot: "hand", drawable: 22, texture: 19, label: "Israel Parachute" },
  lowr: { slot: "hand", drawable: 22, texture: 19, label: "Israel Parachute" },
  task: { slot: "hand", drawable: 22, texture: 19, label: "Israel Parachute" },
  decl: { slot: "hand", drawable: 22, texture: 19, label: "Israel Parachute" },
  uppr: { slot: "hand", drawable: 22, texture: 19, label: "Israel Parachute" },
  feet: { slot: "hand", drawable: 48, texture: 0, label: "Classic Parachute" },
  accs: { slot: "hand", drawable: 48, texture: 0, label: "Classic Parachute" },
  teef: { slot: "hand", drawable: 48, texture: 0, label: "Classic Parachute" },
  berd: { slot: "hand", drawable: 48, texture: 0, label: "Classic Parachute" },
  p_head: { slot: "p_eyes", drawable: 2, texture: 0, label: "Glasses" },
  p_eyes: { slot: "p_head", drawable: 55, texture: 0, label: "Hat" },
  hand: { slot: "uppr", drawable: 29, texture: 0, label: "Gloves" },
};

export function getFlipCompanion(slot) {
  return FLIP_COMPANION[slot] ?? null;
}

// ─── Baseline C1 options ──────────────────────────────────────────────────────
// Keyed by gender then slot.
// c1_drives → palette drawables with many texture variations
// c2_drives → confirmed flip piece drawables (C2 gets same texture as C1)
export const BASELINE_C1S = {
  m: {
    // c1_drives
    jbib: [
      {
        drawable: 190,
        textures: 26,
        label: "Designer Sweater",
        note: "26 colors — best all-rounder",
      },
      { drawable: 208, textures: 24, label: "Camo T-Shirt", note: "24 colors" },
      {
        drawable: 191,
        textures: 26,
        label: "Puffer Jacket",
        note: "26 colors",
      },
    ],
    task: [
      { drawable: 1, textures: 5, label: "Task Armor", note: "5 colors" },
      { drawable: 16, textures: 3, label: "CEO Armor", note: "3 colors" },
      { drawable: 23, textures: 10, label: "Crew Armor", note: "10 colors" },
    ],
    p_head: [
      { drawable: 55, textures: 26, label: "Snapback", note: "26 colors" },
      { drawable: 89, textures: 10, label: "Dome", note: "10 colors" },
      { drawable: 45, textures: 16, label: "Snapback", note: "16 colors" },
    ],
    p_eyes: [{ drawable: 45, label: "P_EYES 45", note: "26 colors" }],

    // c2_drives
    uppr: [
      { drawable: 137, label: "UPPR 137", note: "Tactical Gloves" },
      { drawable: 136, label: "UPPR 136", note: "Armored Gloves" },
    ],
    accs: [
      { drawable: 172, label: "ACCS 172", note: "Strapz Vest" },
      { drawable: 170, label: "ACCS 170", note: "Plate Carrier" },
    ],
    lowr: [
      { drawable: 86, label: "LOWR 86", note: "Cargo Pants" },
      { drawable: 141, label: "LOWR 141", note: "Strait Chinos" },
    ],
    feet: [
      { drawable: 59, label: "FEET 59", note: "Cross Trainers" },
      { drawable: 72, label: "FEET 72", note: "Trail Boots" },
    ],
    berd: [
      { drawable: 49, label: "BERD 49", note: "Paper Bag" },
      { drawable: 104, label: "BERD 104", note: "Tactical Mask" },
    ],
    teef: [
      { drawable: 30, label: "TEEF 30", note: "Scarf" },
      { drawable: 29, label: "TEEF 29", note: "Skinny Tie" },
    ],
    hand: [
      { drawable: 21, label: "HAND 21", note: "Parachute" },
      { drawable: 82, label: "HAND 82", note: "Duffel Bag" },
    ],
    decl: [
      { drawable: 11, textures: 6, label: "DECL 11", note: "Racing Logo" },
      { drawable: 12, textures: 8, label: "DECL 12", note: "Biker Logo" },
      { drawable: 63, textures: 19, label: "DECL 63", note: "Arcade Logo" },
    ],
    p_ears: [{ drawable: 137, label: "P_EARS 137", note: "placeholder" }],
    p_lwrist: [{ drawable: 137, label: "P_LWRIST 137", note: "placeholder" }],
    p_rwrist: [{ drawable: 137, label: "P_RWRIST 137", note: "placeholder" }],
  },

  f: {
    // c1_drives
    jbib: [
      {
        drawable: 192,
        textures: 26,
        label: "Designer Sweater",
        note: "26 colors — best all-rounder",
      },
      { drawable: 212, textures: 24, label: "Camo T-Shirt", note: "24 colors" },
      {
        drawable: 193,
        textures: 26,
        label: "Puffer Jacket",
        note: "26 colors",
      },
    ],
    task: [
      { drawable: 1, textures: 5, label: "Task Armor", note: "5 colors" },
      { drawable: 18, textures: 3, label: "CEO Armor", note: "3 colors" },
      { drawable: 24, textures: 10, label: "Crew Armor", note: "10 colors" },
    ],
    p_head: [
      { drawable: 55, textures: 26, label: "Snapback", note: "26 colors" },
      { drawable: 88, textures: 10, label: "Dome", note: "10 colors" },
      { drawable: 102, textures: 20, label: "Cap", note: "20 colors" },
    ],
    p_eyes: [{ drawable: 45, label: "P_EYES 45", note: "26 colors" }],

    // c2_drives
    uppr: [
      { drawable: 187, label: "UPPR 187", note: "Tactical Gloves" },
      { drawable: 171, label: "UPPR 171", note: "Armored Gloves" },
    ],
    accs: [
      { drawable: 209, label: "ACCS 209", note: "Strapz Vest" },
      { drawable: 161, label: "ACCS 161", note: "Plate Carrier" },
    ],
    lowr: [
      { drawable: 89, label: "LOWR 89", note: "Cargo Pants" },
      { drawable: 148, label: "LOWR 148", note: "Strait Chinos" },
      { drawable: 133, label: "LOWR 133", note: "Slacks" },
    ],
    feet: [
      { drawable: 62, label: "FEET 62", note: "Cross Trainers" },
      { drawable: 75, label: "FEET 75", note: "Trail Boots" },
      { drawable: 7, label: "FEET 7", note: "Combat Boots" },
    ],
    berd: [
      { drawable: 49, label: "BERD 49", note: "Paper Bag" },
      { drawable: 104, label: "BERD 104", note: "Tactical Mask" },
    ],
    teef: [
      { drawable: 13, label: "TEEF 13", note: "Bow Scarf" },
      { drawable: 22, label: "TEEF 22", note: "Strait Tie" },
    ],
    hand: [
      { drawable: 21, label: "HAND 21", note: "Parachute" },
      { drawable: 82, label: "HAND 82", note: "Duffel Bag" },
    ],
    decl: [
      { drawable: 10, textures: 5, label: "DECL 10", note: "Racing Logo" },
      { drawable: 11, textures: 8, label: "DECL 11", note: "Biker Logo" },
      { drawable: 72, textures: 19, label: "DECL 72", note: "Arcade Logo" },
    ],
    p_ears: [{ drawable: 137, label: "P_EARS 137", note: "placeholder" }],
    p_lwrist: [{ drawable: 137, label: "P_LWRIST 137", note: "placeholder" }],
    p_rwrist: [{ drawable: 137, label: "P_RWRIST 137", note: "placeholder" }],
  },
};

/** Returns baselines for a given gender + slot. */
export function getBaselines(gender, slot) {
  return BASELINE_C1S[gender]?.[slot] ?? [];
}

// ─── Image paths ──────────────────────────────────────────────────────────────
// Both components and props: {folderNum}_{drawable}_{texture}.jpg
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
