import React, { useState, useContext } from "react";
import { Typography, Box, Grid, makeStyles, Divider } from "@material-ui/core";

import LunchSpecials from "../MenuPages/LunchSpecials";
import Soups from "../MenuPages/Soups";
import Appetizers from "../MenuPages/Appetizers";
import DinnerCombo from "../MenuPages/DinnerCombo";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  divider: { margin: theme.spacing(6) },
  subheadings: {
    marginBottom: 50,
  },
  menuHeadings: {
    // marginBottom: 20,
  },
  menuCards: {
    padding: theme.spacing(2),
    textAlign: "center",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
}));

function Menu() {
  const classes = useStyles();

  return (
    <div className="Cart">
      <Typography component="div" className={classes.root}>
        <Box textAlign="center" m={1} py={8}>
          <Typography variant="h1" gutterBottom>
            ゜・ Menu ・゜
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            Hi there! Welcome to the page where <em> every </em> menu item is
            listed. <br /> You will be able to customize some items and then add
            them to your cart{" "}
            <em> (see your top right, or under the menubar) </em> <br /> It's
            quite a long menu, so we recommend you navigate using the sidebar
            menu to find what you are looking for!
            <br />
            <em>
              {" "}
              Note: the drawings and photos are not accurate replications of our
              dishes, only a reference to see what they look like{" "}
            </em>
          </Typography>
          <br />
          <Typography variant="body1" gutterBottom></Typography>

          <Divider className={classes.divider} />
          <LunchSpecials />
          <Divider className={classes.divider} />
          <Soups />
          <Divider className={classes.divider} />
          <Appetizers />
          <Divider className={classes.divider} />
          <DinnerCombo />
        </Box>
      </Typography>
    </div>
  );
}

export default Menu;
