// Data for the GTA 6 chapter checklist (src/data/gta6Checklist.js).
//
// To add an entry, copy an item and edit it. Fields:
//   id        unique and stable (saved progress uses it, so never rename one)
//   chapter   1-4, must match a chapter below
//   title     short headline
//   detail    one or two sentences, in our own words
//   status    "tested"   = Stella Crew checked it in-game
//             "reported" = reported by other sites, not tested by us yet
//   spoiler   "none" or "light"
//   source    optional { label, href } for reported items

export const CHAPTERS = [
  { id: 1, title: "Chapter 1", note: "" },
  { id: 2, title: "Chapter 2", note: "" },
  { id: 3, title: "Chapter 3", note: "We haven't covered this chapter yet." },
  { id: 4, title: "Chapter 4", note: "We haven't covered this chapter yet." },
];

export const ITEMS = [
  {
    id: "ch1-dont-farm-cash",
    chapter: 1,
    title: "Don't farm cash in Chapter 1",
    detail:
      "Your money doesn't carry over when the chapter ends, so grinding for it is wasted time. Spend what you need and focus on the story. Some sites say money in the bank is safer than cash in your pocket. We haven't tested that yet.",
    status: "tested",
    spoiler: "light",
    source: {
      label: "Also reported by Power Up Gaming",
      href: "https://powerupgaming.co.uk/2026/11/19/gta-6-how-to-make-money-fast/",
    },
  },
  {
    id: "ch1-jasons-house",
    chapter: 1,
    title: "Jason's house is only available in Chapter 1",
    detail:
      "Reported: the house and what's inside it are gone for the rest of the game once the chapter ends, so grab or use anything you want before then.",
    status: "reported",
    spoiler: "light",
    source: {
      label: "Reported by thegameswiki.com",
      href: "https://thegameswiki.com/gta6/wiki/missable-content-and-points-of-no-return/history/da3cd3e9-fb29-4ad4-a3f3-80ff455b191e",
    },
  },
  {
    id: "ch1-finish-side-work",
    chapter: 1,
    title: "Finish side work before the last missions",
    detail:
      "Reported: a run of missions near the end of Chapter 1 leads straight into Chapter 2 without free roam in between. Finish anything you want to do first.",
    status: "reported",
    spoiler: "light",
    source: {
      label: "Reported by thegameswiki.com",
      href: "https://thegameswiki.com/gta6/wiki/missable-content-and-points-of-no-return/history/da3cd3e9-fb29-4ad4-a3f3-80ff455b191e",
    },
  },
  {
    id: "ch2-save-15k",
    chapter: 2,
    title: "Save at least $15,000 before ending Chapter 2",
    detail:
      "Reported: the mission that ends the chapter needs every other Chapter 2 main mission done and at least $15,000. Chapter 2 is where money gets easier to make.",
    status: "reported",
    spoiler: "light",
    source: {
      label: "Reported by thegameswiki.com",
      href: "https://thegameswiki.com/gta6/wiki/missable-content-and-points-of-no-return/history/da3cd3e9-fb29-4ad4-a3f3-80ff455b191e",
    },
  },
  {
    id: "ch2-motel-closes",
    chapter: 2,
    title: "The Starlet Motel closes when Chapter 2 ends",
    detail:
      "Reported: the motel stops being your home for good once the chapter ends, so finish anything you want to do there first.",
    status: "reported",
    spoiler: "light",
    source: {
      label: "Reported by thegameswiki.com",
      href: "https://thegameswiki.com/gta6/wiki/missable-content-and-points-of-no-return/history/da3cd3e9-fb29-4ad4-a3f3-80ff455b191e",
    },
  },
];
