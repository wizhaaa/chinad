import { React, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import {
  Add as AddIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  RestaurantMenu as RestaurantMenuIcon,
  Close as CloseIcon,
} from "@material-ui/icons";

import {
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  Button,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Hidden,
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { topList, menuList } from "./Data/NavList";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  navLinks: {
    textDecoration: "none",
    color: "inherit",
  },
  menuNavLink: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />

      <List>
        {topList.map((item, index) => {
          const { text, icon, routeTo } = item;

          return (
            <Link className={classes.navLinks} to={routeTo}>
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
            <Link className={classes.navLinks} to={routeTo}>
              {" "}
              <ListItem button key={text}>
                {icon && <ListItemIcon> {icon} </ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          );
        })}
      </List>
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
          <Typography variant="h6" className={classes.title}>
            <IconButton color="inherit" href="/">
              {" "}
              China Delight{" "}
            </IconButton>
          </Typography>

          <Link className={classes.navLinks} to="/cart">
            {" "}
            <IconButton color="inherit" button>
              {" "}
              <ShoppingCartIcon />{" "}
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
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
        <Hidden smDown implementation="css">
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
