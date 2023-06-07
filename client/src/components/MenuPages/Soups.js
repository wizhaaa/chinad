import React, {useState, useEffect} from "react";
import {Typography, Box, Grid, makeStyles} from "@material-ui/core";

// fetching data from db
import api from "../api";

import SoupMenuCard from "../MenuParts/SoupMenuCard";

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
  pBottom: {
    paddingBottom: theme.spacing(6),
  },
  pTop: {
    paddingTop: theme.spacing(6),
  },
}));

const Soups = (props) => {
  const classes = useStyles();
  const [soups, setSoups] = useState([]);

  useEffect(
    () =>
      api.get("/api/soups").then((res) => {
        setSoups(res.data);
      }),
    []
  );

  const soupGrid = soups.map((soup) => (
    <Grid item xs={12} sm={6} md={4}>
      <SoupMenuCard
        itemName={soup.name}
        itemDescription={soup.description}
        img={soup.img}
        price={soup.price}
        priceSm={soup.priceSm}
        priceLg={soup.priceLg}
        reviews={soup.reviews}
      />
    </Grid>
  ));

  return (
    <Box textAlign="center" m={1} py={8}>
      <div>
        {" "}
        <Typography
          variant="h3"
          className={(classes.menuHeadings, classes.bold)}
          gutterBottom
        >
          Soups
        </Typography>
        <Typography className={classes.subheadings}>
          Something to warm you up on cold nights.
          <br /> Each soup comes with a bag of fried noodles.
          <br /> (Pints come with 1 bag; quarts come with 2 bags)
        </Typography>
      </div>

      <Box marginTop={10}>
        <Grid container spacing={3}>
          {soupGrid}
        </Grid>
      </Box>
    </Box>
  );
};

export default Soups;
