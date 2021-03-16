import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";

// import MenuIcon from "@material-ui/icons/Menu";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import HomeIcon from "@material-ui/icons/Home";
// import InfoIcon from "@material-ui/icons/Info";
// import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  RestaurantMenu as RestaurantMenuIcon,
} from "@material-ui/icons";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  flexBox: {
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: theme.spacing(4),
    // margin: theme.spacing(1),
  },
}));

const HeaderNav = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  //react-router setups
  const { history } = props;
  const itemsList = [
    { text: "Home", icon: <HomeIcon />, onClick: () => history.push("/") },
    {
      text: "About",
      icon: <InfoIcon />,
      onClick: () => history.push("/about"),
    },
    {
      text: "Cart",
      icon: <ShoppingCartIcon />,
      onClick: () => history.push("/cart"),
    },
    {
      text: "Menu",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
  ];
  const menuList = [
    {
      text: "Lunch Specials",
      icon: <AddIcon />,
      onClick: () => history.push("/"),
    },
    {
      text: "Combination Platters",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/about"),
    },
    {
      text: "Fried Rice",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/cart"),
    },
    {
      text: "Lo Mein",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Beef",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Seafood",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Pork",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Poultry",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Vegetable",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Mu Shu",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Udon Noodles",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Chow Mein/Chop Suey",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Mei Fun/Rice Noodles",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Egg Foo Young",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Sweet and Sour",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Appetizers",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Sides",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
    {
      text: "Special Health Diet Dishes",
      icon: <RestaurantMenuIcon />,
      onClick: () => history.push("/menu"),
    },
  ];

  // for our drawer
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  // list of items for drawer
  const list = () => (
    <div>
      {/* <div className={classes.toolbar}>
        <div className={classes.flexBox}>
          <IconButton onClick={toggleDrawer(false)}>
            {" "}
            <CloseIcon />{" "}
          </IconButton>
        </div>
      </div> */}

      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem>
            <IconButton onClick={toggleDrawer(false)}>
              {" "}
              <CloseIcon />{" "}
            </IconButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon> {icon} </ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {menuList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon> {icon} </ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Button
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </Button>
          <SwipeableDrawer
            anchor={"left"}
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
          <Typography variant="h6" className={classes.title}>
            <IconButton onClick={() => history.push("/home")} color="inherit">
              {" "}
              China Delight{" "}
            </IconButton>
          </Typography>
          <IconButton
            color="inherit"
            button
            onClick={() => history.push("/cart")}
          >
            {" "}
            <ShoppingCartIcon />{" "}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default withRouter(HeaderNav);
