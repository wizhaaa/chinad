/**
 * Single source of truth for v2 menu categories.
 * Maps URL slugs → API endpoint, display copy, and the dialog-options
 * config. The config encodes the v1 dialog logic so the v2 dialog can
 * mirror it precisely:
 *
 *   sizing: "fixed"   → uses item.price                (no Pint/Quart)
 *           "sized"   → uses item.priceSm / priceLg    (Pint/Quart)
 *           "either"  → fixed if item.price is set, otherwise sized
 *   rice:   { type: "dinner" | "fried-only" | null }
 *           "dinner"      → White / Fried (free) / Lo Mein / Pork Fried (+$2)
 *           "fried-only"  → White (free) / Fried (+$1.50)
 *           "fried-cm"    → White (free) / Fried (+$1.00 pint, +$1.50 quart) [chow mein only]
 *   side:   { type: "soup" | null }
 *           "soup"  → None / Wonton / Egg Drop / Hot & Sour (+$1.50)
 *   dinnerProtein: true  → for Egg Foo Young / Lo Mein / Fried Rice / Chow Mein
 *                          *as dinner items*: Chicken / Pork / Shrimp / Beef / Combo
 *   appetizerDumplings: true → if item.name has "Dumpling": Style + Filling pickers
 *   soupYatGaiMei: true → if item.name === "Yat Gai Mei": meat picker
 *   chowMeinStyle: true → "Chow Mein" / "Chop Suey" toggle
 */
const CATEGORIES = {
  lunch: {
    label: "Lunch", zh: "午餐", endpoint: "/api/lunches",
    type: "Lunch",
    eyebrow: "Specials served 11–3",
    titleAccent: "Lunch", titleRest: "specials",
    zhSubtitle: "午 餐 · 用 心 烹 製",
    lede: "Lunch combos available 11 AM – 3 PM. Comes with rice; pick the way you like it.",
    sizing: "fixed",
    rice: "dinner",
    side: null,           // v1 LunchDialog has it commented out
    dinnerProtein: true,  // matches DinnerDialog logic
  },
  dinner: {
    label: "Dinner", zh: "晚餐", endpoint: "/api/dinners",
    type: "Dinner",
    eyebrow: "From the kitchen",
    titleAccent: "Dinner", titleRest: "menu",
    zhSubtitle: "晚 餐 · 用 心 烹 製",
    lede: "Each dinner comes with complimentary rice and egg roll. Add a soup if you'd like — wonton, egg drop, or hot & sour.",
    sizing: "fixed",
    rice: "dinner",
    side: "soup",
    dinnerProtein: true,
  },
  chef: {
    label: "Chef's Specials", zh: "招牌", endpoint: "/api/chefspecial",
    type: "Chef Special",
    eyebrow: "House dishes",
    titleAccent: "Chef's", titleRest: "specials",
    zhSubtitle: "招 牌 · 用 心 烹 製",
    lede: "Specialties of the house — dishes our kitchen has perfected over the years.",
    sizing: "either",
    rice: "fried-only",
  },
  appetizers: {
    label: "Appetizers", zh: "前菜", endpoint: "/api/appetizers",
    type: "Appetizer",
    eyebrow: "Starters",
    titleAccent: "Appetizers", titleRest: "",
    zhSubtitle: "前 菜",
    lede: "Spring rolls, dumplings, wings — small plates to start.",
    sizing: "fixed",
    appetizerDumplings: true,
  },
  soups: {
    label: "Soups", zh: "湯", endpoint: "/api/soups",
    type: "Soup",
    eyebrow: "Warm bowls",
    titleAccent: "Soups", titleRest: "",
    zhSubtitle: "湯",
    lede: "Wonton, hot & sour, egg drop. Choose pint or quart.",
    sizing: "either",
    soupYatGaiMei: true,
  },
  "sweet-sour": {
    label: "Sweet & Sour", zh: "糖醋", endpoint: "/api/ss",
    type: "Sweet & Sour",
    eyebrow: "Mains",
    titleAccent: "Sweet &", titleRest: "Sour",
    zhSubtitle: "糖 醋",
    lede: "Crispy, breaded, and lacquered in sweet-chili sauce.",
    sizing: "either",     // Combination is fixed-price; others are sized
    rice: "fried-sized",  // adds the same rice picker as Beef/Pork/etc.
  },
  poultry: {
    label: "Poultry", zh: "禽", endpoint: "/api/poultry",
    type: "Poultry",
    eyebrow: "Mains",
    titleAccent: "Poultry", titleRest: "",
    zhSubtitle: "禽 類",
    lede: "Chicken — eight ways. Stir-fried, braised, lacquered, or steamed.",
    sizing: "either",
    rice: "fried-sized", // +$1 pint / +$1.50 quart or fixed
    poultrySauce: true,    // "Chicken w. Mixed Vegetables" gets a sauce picker
  },
  beef: {
    label: "Beef", zh: "牛肉", endpoint: "/api/beef",
    type: "Beef",
    eyebrow: "Mains",
    titleAccent: "Beef", titleRest: "",
    zhSubtitle: "牛 肉",
    lede: "Mongolian, pepper, broccoli — tender flank in every direction.",
    sizing: "either",
    rice: "fried-sized",
  },
  pork: {
    label: "Pork", zh: "豬肉", endpoint: "/api/pork",
    type: "Pork",
    eyebrow: "Mains",
    titleAccent: "Pork", titleRest: "",
    zhSubtitle: "豬 肉",
    lede: "Sweet & sour, garlic, twice-cooked. Pork done several ways.",
    sizing: "either",
    rice: "fried-sized",
  },
  seafood: {
    label: "Seafood", zh: "海鮮", endpoint: "/api/seafood",
    type: "Seafood",
    eyebrow: "Mains",
    titleAccent: "Seafood", titleRest: "",
    zhSubtitle: "海 鮮",
    lede: "Shrimp, scallops, fish — fresh, hot, finished in the wok.",
    sizing: "either",
    rice: "fried-sized",
    seafoodSauce: true,    // some seafood items have white/brown sauce picker
  },
  vegetable: {
    label: "Vegetable", zh: "蔬菜", endpoint: "/api/vegetable",
    type: "Vegetable",
    eyebrow: "Mains",
    titleAccent: "Vegetable", titleRest: "",
    zhSubtitle: "蔬 菜",
    lede: "Buddha's delight, garlic greens — bright, crisp, full of wok-hei.",
    sizing: "either",
    rice: "fried-sized",
  },
  "lo-mein": {
    label: "Lo Mein", zh: "撈麵", endpoint: "/api/lomein",
    type: "Lo Mein",
    eyebrow: "Noodles",
    titleAccent: "Lo Mein", titleRest: "",
    zhSubtitle: "撈 麵",
    lede: "Soft hand-pulled noodles. Each protein is its own dish — pick by name.",
    sizing: "sized",
    // protein picker omitted on purpose — each lo mein item already encodes the protein
  },
  "chow-mein": {
    label: "Chow Mein", zh: "炒麵", endpoint: "/api/chowmein",
    type: "Chow Mein",
    eyebrow: "Noodles",
    titleAccent: "Chow Mein", titleRest: "",
    zhSubtitle: "炒 麵",
    lede: "Crispy stir-fried noodles. Choose your style — chow mein or chop suey.",
    sizing: "sized",
    rice: "fried-cm",      // Fried Rice +$1 pint / +$1.50 quart
    chowMeinStyle: true,
  },
  "fried-rice": {
    label: "Fried Rice", zh: "炒飯", endpoint: "/api/friedrice",
    type: "Fried Rice",
    eyebrow: "Rice",
    titleAccent: "Fried Rice", titleRest: "",
    zhSubtitle: "炒 飯",
    lede: "Wok-tossed with egg, scallion, and your protein of choice.",
    sizing: "sized",
  },
  "egg-foo": {
    label: "Egg Foo Young", zh: "芙蓉蛋", endpoint: "/api/efy",
    type: "Egg Foo Young",
    eyebrow: "Egg",
    titleAccent: "Egg Foo", titleRest: "Young",
    zhSubtitle: "芙 蓉 蛋",
    lede: "Egg pancakes folded around your protein, finished in light gravy.",
    sizing: "either", // most EFY items are fixed-price in the API; "either" handles both
    rice: "fried-only",
  },
  "mei-fun": {
    label: "Mei Fun", zh: "米粉", endpoint: "/api/meifun",
    type: "Mei Fun",
    eyebrow: "Rice noodles",
    titleAccent: "Mei Fun", titleRest: "",
    zhSubtitle: "米 粉",
    lede: "Thin rice vermicelli, stir-fried with your choice of protein.",
    sizing: "sized",
  },
  udon: {
    label: "Udon", zh: "烏冬", endpoint: "/api/udon",
    type: "Udon",
    eyebrow: "Thick noodles",
    titleAccent: "Udon", titleRest: "",
    zhSubtitle: "烏 冬",
    lede: "Thick chewy wheat noodles in broth or stir-fried.",
    sizing: "sized",
  },
  "mu-shu": {
    label: "Mu Shu", zh: "木須", endpoint: "/api/mushu",
    type: "Mu Shu",
    eyebrow: "Rolled",
    titleAccent: "Mu Shu", titleRest: "",
    zhSubtitle: "木 須",
    lede: "Stir-fried protein with vegetables, served with thin pancakes.",
    sizing: "sized",
    rice: "fried-only",
  },
  diet: {
    label: "Diet", zh: "輕食", endpoint: "/api/diet",
    type: "Diet",
    eyebrow: "Light",
    titleAccent: "Diet", titleRest: "menu",
    zhSubtitle: "輕 食",
    lede: "Steamed, lighter sauces — same flavor, lighter touch.",
    sizing: "either",
    rice: "fried-only",
  },
  sides: {
    label: "Sides", zh: "小菜", endpoint: "/api/sides",
    type: "Side",
    eyebrow: "Small plates",
    titleAccent: "Sides", titleRest: "",
    zhSubtitle: "小 菜",
    lede: "Egg rolls, crab rangoon, plain rice, fortune cookies.",
    sizing: "either", // White Rice is sized; others fixed
  },
};

export default CATEGORIES;
