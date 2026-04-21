/**
 * beffMergeData.js
 *
 * Curated merge combinations per gender and slot.
 *
 * bag: which parachute activates this slot
 *   "classic"  → hand drawable 48 tex 0
 *   "israel"   → hand drawable 22 tex 19
 *   "both"     → either works
 */

export const MERGE_DATA = {
  m: [
    {
      id: "hands",
      label: "Hands",
      slot: "uppr",
      bag: "both",
      note: "Use when unable to set gloves to none. Apply C1 left, C2 right.",
      combos: [
        {
          label: "No Gloves Merge",
          c1: { slot: "uppr", drawable: 15, texture: 0, label: "No Gloves" },
          c2: {
            slot: "uppr",
            drawable: 137,
            texture: 3,
            label: "Grey Digital Tactical Gloves",
          },
        },
        {
          label: "Clean Hands",
          c1: {
            slot: "uppr",
            drawable: 29,
            texture: 0,
            label: "Bare Hands Base",
          },
          c2: {
            slot: "uppr",
            drawable: 170,
            texture: 7,
            label: "White & Green Armored Gloves",
          },
        },
      ],
    },
    {
      id: "accessories",
      label: "Accessories",
      slot: "teef",
      bag: "classic",
      note: "Apply C1 accessory on the left, C2 accessory on the right..  Note: some accessories can only be applied to certain tops, key point here is that your C2 accessory must be a higher available texture than your C1 accessory to merge.",
      combos: [
        {
          label: "Chain Merge",
          c1: {
            slot: "teef",
            drawable: 44,
            texture: 0,
            label: "Platinum Balaclava Necklace",
          },
          c2: { slot: "teef", drawable: 30, texture: 5, label: "Green Scarf" },
        },
        {
          label: "Skinny Tie Merge",
          c1: {
            slot: "teef",
            drawable: 112,
            texture: 0,
            label: "Tan Desert Scarf",
          },
          c2: {
            slot: "teef",
            drawable: 29,
            texture: 15,
            label: "Gent Skinny Tie",
          },
        },
      ],
    },
    {
      id: "torso1",
      label: "Torso 1 (ACCS)",
      slot: "accs",
      bag: "classic",
      note: "No torso 1 required on C1. Any race belt, strike vest or gun/paramedic belt on C1 lets you change C2 to these items.",
      combos: [
        {
          label: "No Torso 1 Merge",
          c1: { slot: "accs", drawable: 15, texture: 0, label: "No Torso 1" },
          c2: {
            slot: "accs",
            drawable: 170,
            texture: 10,
            label: "Peach Plate Carrier",
          },
        },
        {
          label: "Suit Vest Merge",
          c1: {
            slot: "accs",
            drawable: 22,
            texture: 0,
            label: "Black Band Vest Shirt",
          },
          c2: { slot: "accs", drawable: 7, texture: 15, label: "Lemon Shirt" },
        },
        {
          label: "Racing Belt Merge",
          c1: {
            slot: "accs",
            drawable: 78,
            texture: 0,
            label: "Navy Racing Belt",
          },
          c2: {
            slot: "accs",
            drawable: 172,
            texture: 19,
            label: "Color Block Strapz Vest",
          },
        },
      ],
    },
    {
      id: "torso2",
      label: "Torso 2 (JBIB)",
      slot: "jbib",
      bag: "israel",
      note: "Use any of the combos below to merge your C2 outfit's torso 2 onto your C1 outfit. Key point here is that your C2 torso 2 must be a higher available texture than your C1 torso 2 to merge.",
      combos: [
        {
          label: "Standard Torso 2 Merge",
          c1: {
            slot: "jbib",
            drawable: 208,
            texture: 19,
            label: "Sand T-Shirt",
          },
          c2: {
            slot: "jbib",
            drawable: 106,
            texture: 0,
            label: "Navy Quilted Jacket",
          },
        },
        {
          label: "Designer Sweater Merge",
          c1: {
            slot: "jbib",
            drawable: 190,
            texture: 25,
            label: "Black Manor Dem Sweater",
          },
          c2: {
            slot: "jbib",
            drawable: 63,
            texture: 0,
            label: "Black Rolled Shirt",
          },
        },
        {
          label: "Vest Merge",
          c1: {
            slot: "jbib",
            drawable: 120,
            texture: 11,
            label: "Royal Check Suit Vest",
          },
          c2: { slot: "jbib", drawable: 40, texture: 0, label: "Red Vest" },
        },
      ],
    },
    {
      id: "armor",
      label: "Armor",
      slot: "task",
      bag: "israel",
      note: "Equip Heavy Armor from the interaction menu (Inventory → Show Armor) on C1. No armor on C2. Merge armor over the torso 2 you want, then merge both together with the rest of your outfit. Note: once armor is merged on it is no longer possible to change the pants.",
      combos: [
        {
          label: "Heavy Armor Merge",
          c1: { slot: "task", drawable: 6, texture: 2, label: "Heavy Armor" },
          c2: null,
        },
        {
          label: "CEO Armor Merge",
          c1: { slot: "task", drawable: 16, texture: 2, label: "Heavy Armor" },
          c2: null,
        },
        {
          label: "SWAT Armor Merge",
          c1: { slot: "task", drawable: 15, texture: 2, label: "Heavy Armor" },
          c2: null,
        },
      ],
    },
    {
      id: "legs",
      label: "Legs",
      slot: "lowr",
      bag: "both",
      note: "Sand Cargos on C2 lets you merge any Racing Suit, Air Racing Suit, Deadline Suit, Jeans or Sports Pants. Useful when pants default or to pull shoes from a suit.",
      combos: [
        {
          label: "Sand Cargo Merge",
          c1: {
            slot: "lowr",
            drawable: 53,
            texture: 0,
            label: "Gold Print Fitted Pants",
          },
          c2: {
            slot: "lowr",
            drawable: 86,
            texture: 19,
            label: "Sand Cargo Pants",
          },
        },
        {
          label: "Boxer's Merge",
          c1: {
            slot: "lowr",
            drawable: 21,
            texture: 0,
            label: "Love Heart Boxer Shorts",
          },
          c2: {
            slot: "lowr",
            drawable: 141,
            texture: 25,
            label: "Strait Chinos",
          },
        },
        {
          label: "Combat Pants Merge",
          c1: {
            slot: "lowr",
            drawable: 31,
            texture: 0,
            label: "Black Combat Pants",
          },
          c2: {
            slot: "lowr",
            drawable: 86,
            texture: 19,
            label: "Strait Chinos",
          },
        },
      ],
    },
    {
      id: "shoes",
      label: "Shoes",
      slot: "feet",
      bag: "classic",
      note: "Use the C1 + C2 combo appropriate to the leg style you want. Any combo below can be mixed.  Note: some shoes can only be applied to certain leg styles, key point here is that your C2 shoes must be a higher available texture than your C1 shoes to merge.",
      combos: [
        {
          label: "Cross Trainer Merge",
          c1: { slot: "feet", drawable: 34, texture: 0, label: "No Shoes" },
          c2: {
            slot: "feet",
            drawable: 59,
            texture: 25,
            label: "Red Cross Trainers",
          },
        },
        {
          label: "Flight Boot Merge",
          c1: {
            slot: "feet",
            drawable: 24,
            texture: 0,
            label: "Black Flight Boots",
          },
          c2: {
            slot: "feet",
            drawable: 70,
            texture: 25,
            label: "Chocolate Rubberized Boots",
          },
        },
      ],
    },
  ],

  f: [
    {
      id: "hands",
      label: "Hands",
      slot: "uppr",
      bag: "both",
      note: "Use when unable to set gloves to none. Apply C1 left, C2 right.",
      combos: [
        {
          label: "No Gloves Merge",
          c1: {
            slot: "uppr",
            drawable: 3,
            texture: 0,
            label: "No Gloves",
          },
          c2: {
            slot: "uppr",
            drawable: 190,
            texture: 3,
            label: "Gray Digital Tactical Gloves",
          },
        },
        {
          label: "Clean Hands",
          c1: {
            slot: "uppr",
            drawable: 23,
            texture: 0,
            label: "Black Driving Gloves",
          },
          c2: {
            slot: "uppr",
            drawable: 174,
            texture: 19,
            label: "Sand Armored Gloves",
          },
        },
      ],
    },
    {
      id: "accessories",
      label: "Accessories",
      slot: "teef",
      bag: "classic",
      note: "Apply C1 accessory on the left, C2 accessory on the right..  Note: some accessories can only be applied to certain tops, key point here is that your C2 accessory must be a higher available texture than your C1 accessory to merge.",
      combos: [
        {
          label: "Floral Bangles Merge",
          c1: {
            slot: "teef",
            drawable: 10,
            texture: 0,
            label: "Floral Bangles",
          },
          c2: {
            slot: "teef",
            drawable: 6,
            texture: 5,
            label: "Amethyst Pendant",
          },
        },
        {
          label: "Platinum Balaclava Necklace Merge",
          c1: {
            slot: "teef",
            drawable: 38,
            texture: 0,
            label: "Platinum Balaclava",
          },
          c2: {
            slot: "teef",
            drawable: 83,
            texture: 2,
            label: "Black Desert Scarf",
          },
        },
        {
          label: "Black Desert Scarf Merge",
          c1: {
            slot: "teef",
            drawable: 83,
            texture: 2,
            label: "Black Desert Scarf",
          },
          c2: {
            slot: "teef",
            drawable: 13,
            texture: 5,
            label: "White Bow Scarf",
          },
        },
      ],
    },
    {
      id: "torso1",
      label: "Torso 1 (ACCS)",
      slot: "accs",
      bag: "classic",
      note: "No torso 1 required on C1. Use race belt or strike vest on C1 to enable C2 merge.",
      combos: [
        {
          label: "Plate Carrier Merge",
          c1: { slot: "accs", drawable: 2, texture: 0, label: "No Torso 1" },
          c2: {
            slot: "accs",
            drawable: 207,
            texture: 10,
            label: "Peach Plate Carrier",
          },
        },
        {
          label: "Race Belt Merge",
          c1: {
            slot: "accs",
            drawable: 81,
            texture: 0,
            label: "Navy Racing Belt",
          },
          c2: {
            slot: "accs",
            drawable: 209,
            texture: 19,
            label: "Color Block Strapz Vest",
          },
        },
      ],
    },
    {
      id: "torso2",
      label: "Torso 2 (JBIB)",
      slot: "jbib",
      bag: "israel",
      note: "Use any of the combos below to merge your C2 outfit's torso 2 onto your C1 outfit. Key point here is that your C2 torso 2 must be a higher available texture than your C1 torso 2 to merge.",
      combos: [
        {
          label: "Designer Sweater Merge",
          c1: {
            slot: "jbib",
            drawable: 192,
            texture: 25,
            label: "Black Manor Dem Sweater",
          },
          c2: {
            slot: "jbib",
            drawable: 17,
            texture: 0,
            label: "Parrot Print Shirt",
          },
        },
        {
          label: "Puffer Merge",
          c1: {
            slot: "jbib",
            drawable: 193,
            texture: 25,
            label: "Blue Sprayed Güffy Puffer",
          },
          c2: {
            slot: "jbib",
            drawable: 97,
            texture: 0,
            label: "Navy Quilted Jacket",
          },
        },
      ],
    },
    {
      id: "armor",
      label: "Armor",
      slot: "task",
      bag: "israel",
      note: "Equip Heavy Armor from the interaction menu (Inventory → Show Armor) on C1. No armor on C2. Merge armor over the torso 2 you want, then merge both together with the rest of your outfit. Note: once armor is merged on it is no longer possible to change the pants.",
      combos: [
        {
          label: "Heavy Armor Merge",
          c1: { slot: "task", drawable: 0, texture: 0, label: "Heavy Armor" },
          c2: null,
        },
      ],
    },
    {
      id: "legs",
      label: "Legs",
      slot: "lowr",
      bag: "both",
      note: "Sand Cargos on C2 merges Racing Suits, Deadline Suits, Jeans and Sports Pants.",
      combos: [
        {
          label: "Sand Cargo Merge",
          c1: { slot: "lowr", drawable: 24, texture: 0, label: "Jeans" },
          c2: {
            slot: "lowr",
            drawable: 89,
            texture: 19,
            label: "Sand Cargo Pants",
          },
        },
        {
          label: "Chinos Merge",
          c1: { slot: "lowr", drawable: 89, texture: 0, label: "Cargo Pants" },
          c2: {
            slot: "lowr",
            drawable: 148,
            texture: 0,
            label: "Strait Chinos",
          },
        },
      ],
    },
    {
      id: "shoes",
      label: "Shoes",
      slot: "feet",
      bag: "classic",
      note: "Use the C1 + C2 combo appropriate to your leg style.  Any combo below can be mixed.  Note: some shoes can only be applied to certain leg styles, key point here is that your C2 shoes must be a higher available texture than your C1 shoes to merge.",
      combos: [
        {
          label: "Cross Trainer Merge",
          c1: { slot: "feet", drawable: 10, texture: 0, label: "Dress Shoes" },
          c2: {
            slot: "feet",
            drawable: 62,
            texture: 0,
            label: "Cross Trainers",
          },
        },
        {
          label: "Trail Boot Merge",
          c1: { slot: "feet", drawable: 10, texture: 0, label: "Dress Shoes" },
          c2: { slot: "feet", drawable: 75, texture: 0, label: "Trail Boots" },
        },
        {
          label: "Combat Boot Merge",
          c1: { slot: "feet", drawable: 10, texture: 0, label: "Dress Shoes" },
          c2: { slot: "feet", drawable: 7, texture: 0, label: "Combat Boots" },
        },
      ],
    },
  ],
};

export const BAG_INFO = {
  classic: {
    slot: "hand",
    drawable: 48,
    texture: 0,
    label: "Classic Parachute",
  },
  israel: {
    slot: "hand",
    drawable: 22,
    texture: 19,
    label: "Israel Parachute",
  },
};
