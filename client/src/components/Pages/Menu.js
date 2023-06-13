import React from "react";
import {
  Typography,
  Box,
  makeStyles,
  Divider,
  Fab,
  Button,
} from "@material-ui/core";
import {ArrowUpward as ArrowUpwardIcon} from "@material-ui/icons";

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
  divider: {margin: theme.spacing(6)},
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
            ゜・ Menu ・ ゜
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            Items here will be added to your cart (see top left). Use the
            quick-links below or the sidebar to quickly navigate through our
            menu. <br />
          </Typography>
          <br />
          <Typography variant="body1" gutterBottom>
            Note: If your requests contain extra sauce, extra meat, or anything
            extra, they are liable to extra fees not calculated in the final
            price below. Please see <a href="/about"> pricing</a> for more
            details on what costs you can expect.{" "}
          </Typography>
          <br />
          <Typography variant="body1" gutterBottom>
            {" "}
            <div id="top"></div>
            <em> Disclaimer: The </em>{" "}
            <em>
              {" "}
              photos not exact replications of our dishes and are to serve as
              references.{" "}
            </em>
          </Typography>{" "}
          <br />
          <Typography variant="h5" gutterBottom>
            Quick Links
          </Typography>{" "}
          <br />
          <Button>
            {" "}
            <a href="#lunch"> Lunch </a>
          </Button>
          <Button>
            {" "}
            <a href="#dinner"> Dinner </a>
          </Button>
          <Button>
            {" "}
            <a href="#soup"> Soup </a>{" "}
          </Button>{" "}
          <Button>
            {" "}
            <a href="#appetizer"> Appetizer </a>{" "}
          </Button>
          <Button>
            {" "}
            <a href="#ss"> Sweet & Sour </a>
          </Button>
          <Button>
            <a href="#efy"> Egg Foo Young </a>{" "}
          </Button>
          <Button>
            {" "}
            <a href="#fr"> Fried Rice </a>{" "}
          </Button>
          <Button>
            {" "}
            <a href="#lm"> Lo Mein </a>
          </Button>{" "}
          <Button>
            {" "}
            <a href="#rn"> Mei Fun </a>{" "}
          </Button>
          <Button>
            {" "}
            <a href="#chow mein"> Chow Mein </a>
          </Button>{" "}
          <Button>
            {" "}
            <a href="#ch"> Poultry </a>{" "}
          </Button>{" "}
          <Button>
            {" "}
            <a href="#pk"> Pork </a>{" "}
          </Button>{" "}
          <Button>
            {" "}
            <a href="#shr"> Seafood </a>{" "}
          </Button>{" "}
          <Button>
            {" "}
            <a href="#bf"> Beef </a>{" "}
          </Button>{" "}
          <Button>
            {" "}
            <a href="#mushu"> Mu Shu </a>{" "}
          </Button>{" "}
          <Button>
            {" "}
            <a href="#veg"> Vegetable </a>{" "}
          </Button>{" "}
          <Button>
            {" "}
            <a href="#udon"> Udon </a>{" "}
          </Button>{" "}
          <Button>
            {" "}
            <a href="#chef"> Specials </a>{" "}
          </Button>
          <Button>
            {" "}
            <a href="#diet"> Diet </a>{" "}
          </Button>
          <Button>
            <a href="#side"> Sides </a>{" "}
          </Button>
          <div className="toTop">
            <Fab className="toTop" color="primary" href="#top">
              <ArrowUpwardIcon />
            </Fab>
          </div>
          <div id="lunch"> </div>
          <Divider className={classes.divider} />
          <LunchSpecials />
          <div id="dinner"> </div>
          <Divider className={classes.divider} />
          <DinnerCombo />
          <div id="soup"> </div>
          <Divider className={classes.divider} />
          <Soups />
          <div id="appetizer"> </div>
          <Divider className={classes.divider} />
          <Appetizers />
          <div id="ss"> </div>
          <Divider className={classes.divider} />
          <SweetAndSour />
          <div id="efy"> </div>
          <Divider className={classes.divider} />
          <EFY />
          <div id="fr"> </div>
          <Divider className={classes.divider} />
          <FR />
          <div id="lm"> </div>
          <Divider className={classes.divider} />
          <LoMein />
          <div id="rn"> </div>
          <Divider className={classes.divider} />
          <MeiFun />
          <div id="chow mein"> </div>
          <Divider className={classes.divider} />
          <ChowMein />
          <div id="ch"> </div>
          <Divider className={classes.divider} />
          <Poultry />
          <div id="pk"> </div>
          <Divider className={classes.divider} />
          <Pork />
          <div id="shr"> </div>
          <Divider className={classes.divider} />
          <Seafood />
          <div id="bf"> </div>
          <Divider className={classes.divider} />
          <Beef />
          <div id="mushu"> </div>
          <Divider className={classes.divider} />
          <MuShu />
          <div id="veg"> </div>
          <Divider className={classes.divider} />
          <Vegetable />
          <div id="udon"> </div>
          <Divider className={classes.divider} />
          <Udon />
          <div id="chef"> </div>
          <Divider className={classes.divider} />
          <Chef />
          <div id="diet"> </div>
          <Divider className={classes.divider} />
          <Diet />
          <div id="side"> </div>
          <Divider className={classes.divider} />
          <Side />
        </Box>
      </Typography>
    </div>
  );
}

export default Menu;
