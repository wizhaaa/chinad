import React, { useState } from "react";
import { Typography, Box, Grid, makeStyles } from "@material-ui/core";

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
          gutterBottom
        >
          {" "}
          soups{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          yummy & warm soups !
          <br /> every soup comes with a bag of fried noodles !
          <br /> pints come with 1 bag , quarts come with 2 bags
        </Typography>{" "}
      </div>

      <Box marginTop={10}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <SoupMenuCard
              itemName={"wonton soup"}
              itemDescription={"pork wrapped in wontons in a chicken broth"}
              img={
                "https://www.marionskitchen.com/wp-content/uploads/2019/05/Wonton-Soup1.jpg"
              }
              price={null}
              priceSm={2.5}
              priceLg={3.75}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SoupMenuCard
              itemName={"hot & sour soup"}
              itemDescription={"pork wrapped in wontons in a chicken broth"}
              img={
                "https://www.recipetineats.com/wp-content/uploads/2019/02/Hot-and-Sour-Soup_1_6.jpg"
              }
              price={null}
              priceSm={2.5}
              priceLg={3.75}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SoupMenuCard
              itemName={"egg drop soup"}
              itemDescription={"pork wrapped in wontons in a chicken broth"}
              img={
                "https://healthyrecipesblogs.com/wp-content/uploads/2014/04/egg-drop-soup-featured.jpg"
              }
              price={null}
              priceSm={2.5}
              priceLg={3.75}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SoupMenuCard
              itemName={"young chow wonton soup"}
              itemDescription={"pork wrapped in wontons in a chicken broth"}
              img={
                "https://www.marionskitchen.com/wp-content/uploads/2019/05/Wonton-Soup1.jpg"
              }
              price={6.5}
              priceSm={2.5}
              priceLg={3.75}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SoupMenuCard
              itemName={"house special soup"}
              itemDescription={"pork wrapped in wontons in a chicken broth"}
              img={
                "https://i.pinimg.com/originals/91/12/3c/91123c1d0f7afaf26ccc3587e1da5d69.jpg"
              }
              price={6.5}
              priceSm={2.5}
              priceLg={3.75}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Soups;
