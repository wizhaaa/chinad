import React, { useState } from "react";
import { Typography, Box, Grid, makeStyles } from "@material-ui/core";

import DinnerMenuCard from "../MenuParts/DinnerMenuCard";

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

const DinnerCombo = (props) => {
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
          dinner{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          * aka combo platters or dinner platters *
          <br /> can choose between <strong> fried or white rice </strong>
          <em> (for free!) </em>
          <br /> each comes with an <strong> egg roll </strong>{" "}
          <em> (for free!) </em>
          <br /> can choose to add a <strong>soup </strong> for +$1
        </Typography>{" "}
      </div>

      <Box marginTop={10}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <DinnerMenuCard
              itemName={"sweet and sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://copykat.com/wp-content/uploads/2016/12/Sweet-and-Sour-Chicken-Pin.jpg"
              }
              price={9.95}
              priceSm={2.5}
              priceLg={3.75}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DinnerMenuCard
              itemName={"sweet and sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://copykat.com/wp-content/uploads/2016/12/Sweet-and-Sour-Chicken-Pin.jpg"
              }
              price={9.95}
              priceSm={2.5}
              priceLg={3.75}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DinnerMenuCard
              itemName={"sweet and sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://copykat.com/wp-content/uploads/2016/12/Sweet-and-Sour-Chicken-Pin.jpg"
              }
              price={9.95}
              priceSm={2.5}
              priceLg={3.75}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DinnerMenuCard
              itemName={"sweet and sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://copykat.com/wp-content/uploads/2016/12/Sweet-and-Sour-Chicken-Pin.jpg"
              }
              price={9.95}
              priceSm={2.5}
              priceLg={3.75}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DinnerMenuCard
              itemName={"sweet and sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://copykat.com/wp-content/uploads/2016/12/Sweet-and-Sour-Chicken-Pin.jpg"
              }
              price={9.95}
              priceSm={2.5}
              priceLg={3.75}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DinnerMenuCard
              itemName={"sweet and sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://copykat.com/wp-content/uploads/2016/12/Sweet-and-Sour-Chicken-Pin.jpg"
              }
              price={9.95}
              priceSm={2.5}
              priceLg={3.75}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DinnerCombo;
