import { React, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import {
  Add as AddIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  RestaurantMenu as RestaurantMenuIcon,
  Close as CloseIcon,
  ShoppingBasket as ShoppingBasketIcon,
} from "@material-ui/icons";

import {
  AppBar,
  Toolbar,
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Hidden,
  Badge,
} from "@material-ui/core";

import { useTheme } from "@material-ui/core/styles";

import { topList, menuList } from "./Data/NavList";

import { useCartContext } from "./CartContext";

//styling
import useStyles from "./MaterialStyles";

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { userCartCount } = useCartContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // defining our drawer. loops through imported lists
  // add this to wrapper div to make it close on click onClick={handleDrawerToggle}
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />

      <List>
        {topList.map((item, index) => {
          const { text, icon, routeTo } = item;

          return (
            <Link key={text} className={classes.navLinks} to={routeTo}>
              {" "}
              <ListItem button key={text}>
                {icon && <ListItemIcon> {icon} </ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider />
      <List>
        {menuList.map((item, index) => {
          const { text, icon, routeTo } = item;
          return (
            <Link key={text} className={classes.navLinks} to={routeTo}>
              {" "}
              <ListItem button key={text}>
                {icon && <ListItemIcon> {icon} </ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Box pt={50}> if your reading this, its too late </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          {/* Our Heading  */}
          <Typography variant="h5" className={classes.title}>
            <Link className={classes.navLinks} to="/">
              {" "}
              <strong> China Delight </strong>{" "}
            </Link>
          </Typography>

          {/* Shopping Cart Icon */}
          <Link className={classes.navLinks} to="/cart">
            {" "}
            <IconButton color="inherit" button>
              {" "}
              <Badge color="secondary" badgeContent={userCartCount}>
                <ShoppingBasketIcon />{" "}
              </Badge>{" "}
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar> 
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        {/* Temp drawer that hides on large and higher screens */}
        <Hidden lgUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        {/* Perm drawer that is hidden on md & down screens= */}
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;
