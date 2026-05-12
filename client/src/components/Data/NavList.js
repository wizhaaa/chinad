import {
  Home as HomeIcon,
  Info as InfoIcon,
  ShoppingCart as ShoppingCartIcon,
  RestaurantMenu as RestaurantMenuIcon,
} from "@material-ui/icons";

//get the title of appbar to be equal to the ${List.text}

const topList = [
  { text: "Home", icon: <HomeIcon color="primary" />, routeTo: "/v0/home" },
  {
    text: "About",
    icon: <InfoIcon color="primary" />,
    routeTo: "/v0/about",
  },
  {
    text: "Cart",
    icon: <ShoppingCartIcon color="primary" />,
    routeTo: "/v0/cart",
  },
  {
    text: "Menu",
    icon: <RestaurantMenuIcon color="primary" />,
    routeTo: "/v0/menu",
  },
];

const menuList = [
  { text: "Lunch Specials", routeTo: "/v0/lunch" },
  { text: "Dinner", routeTo: "/v0/dinner-combo" },
  { text: "Soup", routeTo: "/v0/soups" },
  { text: "Appetizers", routeTo: "/v0/appetizers" },
  { text: "Sweet and Sour", routeTo: "/v0/sweet-and-sour" },
  { text: "Egg Foo Young", routeTo: "/v0/egg-foo-young" },
  { text: "Fried Rice", routeTo: "/v0/fried-rice" },
  { text: "Lo Mein", routeTo: "/v0/lo-mein" },
  { text: "Mei Fun", routeTo: "/v0/mei-fun" },
  { text: "Chow Mein/Chop Suey", routeTo: "/v0/chow-mein" },
  { text: "Poultry", routeTo: "/v0/poultry" },
  { text: "Pork", routeTo: "/v0/pork" },
  { text: "Seafood", routeTo: "/v0/seafood" },
  { text: "Beef", routeTo: "/v0/beef" },
  { text: "Mu Shu", routeTo: "/v0/mu-shu" },
  { text: "Vegetable", routeTo: "/v0/vegetable" },
  { text: "Udon Noodles", routeTo: "/v0/udon" },
  { text: "Chef's Specials", routeTo: "/v0/chef" },
  { text: "Diet", routeTo: "/v0/diet" },
  { text: "Sides", routeTo: "/v0/sides" },
];

export { topList, menuList };
