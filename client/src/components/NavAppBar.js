import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

const ButtonAppBar = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  //react-router setups
  const { history } = props;
  const itemsList = [
    { text: "Home", icon: <MailIcon />, onClick: () => history.push("/") },
    {
      text: "About",
      icon: <MailIcon />,
      onClick: () => history.push("/about"),
    },
    { text: "Cart", icon: <MailIcon />, onClick: () => history.push("/cart") },
    { text: "Menu", icon: <MailIcon />, onClick: () => history.push("/menu") },
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
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
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
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <React.Fragment>
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
          </React.Fragment>

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

export default withRouter(ButtonAppBar);
