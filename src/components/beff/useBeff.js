import { useState, useEffect, useMemo } from "react";

// Correct component IDs per forge.plebmasters.de
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

export const SLOTS = [
  { id: "jbib", label: "JBIB", desc: "Tops" },
  { id: "uppr", label: "UPPR", desc: "Torsos" },
  { id: "accs", label: "ACCS", desc: "Undershirts" },
  { id: "lowr", label: "LOWR", desc: "Legs" },
  { id: "feet", label: "FEET", desc: "Shoes" },
  { id: "teef", label: "TEEF", desc: "Accessories" },
  { id: "hand", label: "HAND", desc: "Bags / Parachute" },
  { id: "task", label: "TASK", desc: "Body Armor" },
  { id: "berd", label: "BERD", desc: "Masks" },
  { id: "head", label: "HEAD", desc: "Heads" },
  { id: "hair", label: "HAIR", desc: "Hair" },
  { id: "decl", label: "DECL", desc: "Decals" },
];

export const PROP_SLOTS = [
  { id: "p_head", label: "Hats", compID: 0 },
  { id: "p_eyes", label: "Glasses", compID: 1 },
  { id: "p_ears", label: "Ears", compID: 2 },
  { id: "p_lwrist", label: "Watches", compID: 6 },
  { id: "p_rwrist", label: "Bracelets", compID: 7 },
];

export const GENDERS = [
  { id: "m", label: "Male" },
  { id: "f", label: "Female" },
];

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

export function groupByDrawable(items) {
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.drawable)) map.set(item.drawable, []);
    map.get(item.drawable).push(item);
  }
  return map;
}

export function buildComponentCall(slot, drawable, texture) {
  const enumVal = SLOT_ENUM[slot] ?? 0;
  return `SetPedComponentVariation(ped, ${enumVal}, ${drawable}, ${texture}, 2)`;
}

export function imgPath(gender, slot, drawable, texture) {
  return `/beff/${gender}/${slot}/${drawable}_${texture}.webp`;
}

export function placeholderImg(slot, drawable, texture) {
  const label = `${slot.toUpperCase()}%0A${drawable}_${texture}`;
  return `https://placehold.co/200x200/111111/D4AF37?text=${label}&font=monospace`;
}
