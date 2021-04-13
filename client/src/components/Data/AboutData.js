const ingredients = [{ name: "section wip", des: "description here" }];

const pricing = [
  {
    name: "extra sauces? (sweet & sour, gravy)",
    cost: "$1 (1/2 pint) / $2 (pint)",
  },
  { name: "extra shrimp?", cost: "$0.50 for every extra piece" },
  { name: "fried rice (regular)", cost: "$1 / $1.50" },
  { name: "fried rice (w. meat)", cost: "$2.50 / $3.75 " },
  { name: "lo mein (regular)", cost: "$1 / $ 1.50" },
  { name: "lo mein (w. meat)", cost: "$2.50 / $3.75" },
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
