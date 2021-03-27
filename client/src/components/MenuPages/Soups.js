import React, { useState } from "react";
import { Typography, Box, Grid, makeStyles } from "@material-ui/core";

import MenuCard from "../MenuParts/LunchMenuCard";
import SoupMenuCard from "../MenuParts/SoupMenuCard";

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
  pBottom: {
    paddingBottom: theme.spacing(6),
  },
  pTop: {
    paddingTop: theme.spacing(6),
  },
}));

const Soups = (props) => {
  const classes = useStyles();

  return (
    <Box textAlign="center" m={1} py={8}>
      <div>
        {" "}
        <Typography
          variant="h3"
          className={(classes.menuHeadings, classes.bold)}
        >
          {" "}
          soups{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          yummy warm soups !
        </Typography>{" "}
      </div>

      <Box marginTop={10}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <SoupMenuCard
              itemName={"wonton soup"}
              itemDescription={
                "pork wrapped in wontons in a chicken broth"
              }
              img={
                "https://copykat.com/wp-content/uploads/2016/12/Sweet-and-Sour-Chicken-Pin.jpg"
              }
              price={6.25}
              priceSm={null}
              priceLg={null}
            />
          </Grid>{" "}
          <Grid item xs={12} sm={6} md={4}>
            <SoupMenuCard
              itemName={"sweet & sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://copykat.com/wp-content/uploads/2016/12/Sweet-and-Sour-Chicken-Pin.jpg"
              }
              price={6.25}
              priceSm={null}
              priceLg={null}
            />
          </Grid>{" "}
          <Grid item xs={12} sm={6} md={4}>
            <SoupMenuCard
              itemName={"sweet & sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://copykat.com/wp-content/uploads/2016/12/Sweet-and-Sour-Chicken-Pin.jpg"
              }
              price={6.25}
              priceSm={null}
              priceLg={null}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Soups;
