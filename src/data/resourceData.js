// src/data/resourceData.js
export const resourceCategories = [
  {
    id: "tools",
    label: "Tactical Utilities",
    resources: [
      {
        name: "Modded Car Builder",
        desc: "Visual architect for unselected paints & wheels",
        link: "/car-builder",
        type: "TOOL",
        comingSoon: false,
      },
    ],
  },
  {
    id: "masterlists",
    label: "Intelligence Database",
    resources: [
      {
        name: "BEFF ID Masterlist",
        desc: "Complete database of component IDs for Outfits",
        link: "/beff/components",
        type: "DATABASE",
        comingSoon: false,
        hot: true,
      },
    ],
  },
];
