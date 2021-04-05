import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, makeStyles } from "@material-ui/core";

// fetching data from db
import axios from "axios";
import api from "../api";

import AppetizerMenuCard from "../MenuParts/AppetizerMenuCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  divider: { margin: theme.spacing(6) },
  subheadings: {
    marginBottom: 50,
  },
  menuHeadings: {
    // paddingBottom: 30,
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

const Appetizers = (props) => {
  const [appetizers, setAppetizers] = useState([]);

  useEffect(
    () =>
      api.get("/appetizers").then((res) => {
        console.log(res.data);
        setAppetizers(res.data);
      }),
    []
  );

  const classes = useStyles();

  const appetizerGrid = appetizers.map((appetizer) => (
    <Grid item xs={12} sm={6} md={4}>
      <AppetizerMenuCard
        itemName={appetizer.name}
        itemDescription={appetizer.description}
        img={appetizer.img}
        price={appetizer.price}
        priceSm={appetizer.priceSm}
        priceLg={appetizer.priceLg}
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
          {" "}
          appetizers{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          classic chinese appetizers to tease the appetite
        </Typography>{" "}
      </div>

      <Box marginTop={10}>
        <Grid container spacing={3}>
          {appetizerGrid}
        </Grid>
      </Box>
    </Box>
  );
};

export default Appetizers;
