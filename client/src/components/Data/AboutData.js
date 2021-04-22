const ingredients = [
  {
    name: "Mixed Vegetables [Basic]",
    des:
      "Mushrooms, bamboo shoots, celery, baby corn, snow peas, water chestnut, cabbage, carrots, broccoli, buck choy. White sauce for Shrimp and Chicken dishes. Brown sauce for Beef and Pork dishes",
  },
  {
    name: "Moo Goo Gai Pan",
    des:
      "Bamboo shoots, buck choy, mushrooms, snow peas, green peppers. White sauce.",
  },
  { name: "🔥 Garlic Sauce", des: "[Basic] + green peppers. Brown sauce." },
  { name: "🔥 Hunan", des: "[Basic] + green peppers and onions. Brown sauce." },
  {
    name: "🔥 Szechuan",
    des:
      "Green peppers, onions, celery, carrot, baby corn, and snow peas. Brown sauce.",
  },
  {
    name: "🔥 Curry",
    des:
      "Onions, green pepper, snow peas, carrot, bamboo shoots, baby corn, water chestnuts, mushrooms, and celery. Curry sauce.",
  },
  { name: "Black Bean", des: "[Curry] + broccoli." },
  {
    name: "Chow Mein",
    des: "Cabbage, bean sprouts, onions, celery. White sauce.",
  },
  {
    name: "Chop Suey",
    des:
      "[Chow Mein] + bamboo shoots, water chestnuts, carrot, snow pea, and mushrooms. White sauce.",
  },
  {
    name: "🔥 Kung Pao / Cashew",
    des:
      "Mushroom, celery, baby corn, water chestnuts, broccoli, green pepper. Brown sauce.",
  },
  { name: "Mu Shu", des: "Cabbage, mushrooms, and scallions." },
  { name: "Lo Mein", des: "Bean spoutrs, cabbage, onions, and carrot." },
  {
    name: "Rice Noodles",
    des:
      "Gluten-Free. Cabbage, carrots, celery, bean sprouts, snow peas, eggs. Stir fried and no sauce.",
  },
  {
    name: "Salt and Pepper",
    des: "Green peppers and onions. Stir fried and no sauce.",
  },
  { name: "Seafood Rice Noodles", des: "Shrimp, scallops, and lobster." },
  {
    name: "Lobster Fried Rice/Lo Mein",
    des: "Baby lobster and imitation crab meat.",
  },
  { name: "Combination / 🔥 Szechuan", des: "Shrimp, Chicken, and Beef." },
  { name: "Egg Drop Soup", des: "Egg and corn starch." },
  {
    name: "Seafood Soup",
    des:
      "Chop Suey vegetables, corn starch (broth), white egg, clear sauce, imitation crab, shrimp, scallops, baby lobster. ",
  },
];

const pricing = [
  {
    name: "Extra Sauces? (sweet & sour, gravy)",
    cost: "$1 (1/2 pint) / $2 (pint)",
  },
  { name: "Extra Shrimp?", cost: "$0.50 for every extra piece" },
  { name: "Fried Rice (regular)", cost: "$1 / $1.50" },
  { name: "Fried Rice (w. meat)", cost: "$2.50 / $3.75 " },
  { name: "Lo Mein (regular)", cost: "$1 / $ 1.50" },
  { name: "Lo Mein (w. meat)", cost: "$2.50 / $3.75" },
];

const orderTimes = [
  {
    name: "soups",
    time:
      "most soups like hot & sour, egg drop, & wonton broths are always ready",
  },
  { name: "appetizers", time: "frying them takes anywhere from 5-10 mins" },
  { name: "egg foo young", time: "these are very meticulous. ~10 minutes" },

  { name: "dumplings", time: "steamed ~ 10 mins / fried ~ 15 mins" },
  { name: "most stir fries", time: "5-10 mins" },
];

export { ingredients, pricing, orderTimes };
