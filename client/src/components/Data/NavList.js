import {
  Home as HomeIcon,
  Info as InfoIcon,
  ShoppingCart as ShoppingCartIcon,
  RestaurantMenu as RestaurantMenuIcon,
} from "@material-ui/icons";

//get the title of appbar to be equal to the ${List.text}

const topList = [
  { text: "Home", icon: <HomeIcon color="primary" />, routeTo: "/home" },
  {
    text: "About",
    icon: <InfoIcon color="primary" />,
    routeTo: "/about",
  },
  {
    text: "Cart",
    icon: <ShoppingCartIcon color="primary" />,
    routeTo: "/cart",
  },
  {
    text: "Menu",
    icon: <RestaurantMenuIcon color="primary" />,
    routeTo: "/menu",
  },
];

const menuList = [
  { text: "Lunch Specials", routeTo: "/lunch" },
  { text: "Dinner", routeTo: "/dinner-combo" },
  { text: "Soup", routeTo: "/soups" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Sweet and Sour", routeTo: "/sweet-and-sour" },
  { text: "Egg Foo Young", routeTo: "/egg-foo-young" },
  { text: "Fried Rice", routeTo: "/fried-rice" },
  { text: "Lo Mein", routeTo: "/lo-mein" },
  { text: "Mei Fun", routeTo: "/mei-fun" },
  { text: "Chow Mein/Chop Suey", routeTo: "/chow-mein" },
  { text: "Poultry", routeTo: "/poultry" },
  { text: "Pork", routeTo: "/pork" },
  { text: "Seafood", routeTo: "/seafood" },
  { text: "Beef", routeTo: "/beef" },
  { text: "Mu Shu", routeTo: "/mu-shu" },
  { text: "Vegetable", routeTo: "/vegetable" },
  { text: "Udon Moodles", routeTo: "/udon" },
  { text: "Chef's Specials", routeTo: "/chef" },
  { text: "Diet", routeTo: "/diet" },
  { text: "Sides", routeTo: "/sides" },
];

export { topList, menuList };
