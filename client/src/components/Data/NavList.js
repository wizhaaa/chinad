import {
  Home as HomeIcon,
  Info as InfoIcon,
  ShoppingCart as ShoppingCartIcon,
  RestaurantMenu as RestaurantMenuIcon,
} from "@material-ui/icons";

//get the title of appbar to be equal to the ${List.text}

const topList = [
  { text: "home", icon: <HomeIcon />, routeTo: "/home" },
  {
    text: "about",
    icon: <InfoIcon />,
    routeTo: "/about",
  },
  {
    text: "cart",
    icon: <ShoppingCartIcon />,
    routeTo: "/cart",
  },
  {
    text: "menu",
    icon: <RestaurantMenuIcon />,
    routeTo: "/menu",
  },
];

const menuList = [
  { text: "lunch specials", routeTo: "/lunch" },
  { text: "soup", routeTo: "/soups" },
  { text: "appetizers", routeTo: "/appetizers" },
  { text: "sweet and sour", routeTo: "/sweet-and-sour" },
  { text: "egg foo young", routeTo: "/egg-foo-young" },
  { text: "fried rice", routeTo: "/fried-rice" },
  { text: "lo mein", routeTo: "/lo-mein" },
  { text: "mei fun", routeTo: "/mei-fun" },
  { text: "chow mein/chop suey", routeTo: "/chow-mein" },
  { text: "poultry", routeTo: "/poultry" },
  { text: "pork", routeTo: "/pork" },
  { text: "seafood", routeTo: "/seafood" },
  { text: "beef", routeTo: "/beef" },
  { text: "mu shu", routeTo: "/mu-shu" },
  { text: "vegetable", routeTo: "/vegetable" },
  { text: "udon noodles", routeTo: "/udon" },
  { text: "chef's specials", routeTo: "/chef" },
  { text: "diet", routeTo: "/diet" },
  { text: "combination platters", routeTo: "/dinner-combo" },
  { text: "sides", routeTo: "/sides" },
];

export { topList, menuList };
