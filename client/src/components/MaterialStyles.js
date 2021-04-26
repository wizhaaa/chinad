import { makeStyles, useTheme } from "@material-ui/core/styles";

// styling

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
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
    boxShadow: "none",
  },
  menuNavLink: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Hogback",
    fontSize: "2.5rem",
  },
  alignToCenter: {
    alignSelf: "center",
    width: "100%",
  },
  table: {
    minWidth: 700,
  },
}));

export default useStyles;
