import {
  Home as HomeIcon,
  Info as InfoIcon,
  ShoppingCart as ShoppingCartIcon,
  RestaurantMenu as RestaurantMenuIcon,
} from "@material-ui/icons";

//get the title of appbar to be equal to the ${List.text}

const topList = [
  { text: "Home", icon: <HomeIcon />, routeTo: "/home" },
  {
    text: "About",
    icon: <InfoIcon />,
    routeTo: "/about",
  },
  {
    text: "Cart",
    icon: <ShoppingCartIcon />,
    routeTo: "/cart",
  },
  {
    text: "Menu",
    icon: <RestaurantMenuIcon />,
    routeTo: "/menu",
  },
];

const menuList = [
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
  { text: "Appetizers", routeTo: "/appetizers" },
];

export { topList, menuList };
