import React, { useState, useContext } from "react";
import { Typography, Box, Grid, makeStyles, Divider } from "@material-ui/core";

import LunchSpecials from "../MenuPages/LunchSpecials";
import Soups from "../MenuPages/Soups";
import Appetizers from "../MenuPages/Appetizers";
import DinnerCombo from "../MenuPages/DinnerCombo";
import SweetAndSour from "../MenuPages/SweetAndSour";
import EFY from "../MenuPages/EggFooYoung";
import FR from "../MenuPages/FriedRice";
import LoMein from "../MenuPages/LoMein";
import MeiFun from "../MenuPages/MeiFun";
import ChowMein from "../MenuPages/ChowMein";
import Poultry from "../MenuPages/Poultry";
import Pork from "../MenuPages/Pork";
import Seafood from "../MenuPages/Seafood";
import Beef from "../MenuPages/Beef";
import MuShu from "../MenuPages/MuShu";
import Vegetable from "../MenuPages/Vegetable";
import Udon from "../MenuPages/Udon";
import Chef from "../MenuPages/Chef";
import Diet from "../MenuPages/Diet";
import Side from "../MenuPages/Side";

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
      {console.log("menu page is being rendered")}
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
          <DinnerCombo />
          <Divider className={classes.divider} />
          <Soups />
          <Divider className={classes.divider} />
          <Appetizers />
          <Divider className={classes.divider} />
          <SweetAndSour />
          <Divider className={classes.divider} />
          <EFY />
          <Divider className={classes.divider} />
          <FR />
          <Divider className={classes.divider} />
          <LoMein />
          <Divider className={classes.divider} />
          <MeiFun />
          <Divider className={classes.divider} />
          <ChowMein />
          <Divider className={classes.divider} />
          <Poultry />
          <Divider className={classes.divider} />
          <Pork />
          <Divider className={classes.divider} />
          <Seafood />
          <Divider className={classes.divider} />
          <Beef />
          <Divider className={classes.divider} />
          <MuShu />
          <Divider className={classes.divider} />
          <Vegetable />
          <Divider className={classes.divider} />
          <Udon />
          <Divider className={classes.divider} />
          <Chef />
          <Divider className={classes.divider} />
          <Diet />
          <Divider className={classes.divider} />
          <Side />
        </Box>
      </Typography>
    </div>
  );
}

export default Menu;
