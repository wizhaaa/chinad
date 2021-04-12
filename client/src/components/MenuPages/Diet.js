import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, makeStyles } from "@material-ui/core";

// fetching data from db
import api from "../api";

import DietMenuCard from "../MenuParts/DietMenuCard";

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

const Diet = (props) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);

  useEffect(
    () =>
      api.get("/api/diet").then((res) => {
        setItems(res.data);
      }),
    []
  );

  const itemGrid = items.map((item) => (
    <Grid item xs={12} sm={6} md={4}>
      <DietMenuCard
        itemName={item.name}
        itemDescription={item.description}
        img={item.img}
        price={item.price}
        priceSm={item.priceSm}
        priceLg={item.priceLg}
        reviews={item.reviews}
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
          Diet{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          Plain Steamed with Original Flavor, no M.S.G. Salt and Oil Used.
          <br />
          Seasoning Sauce be Served on the Side (White or Brown Sauce).
          <br /> Fried Rice Instead of White Rice $1.5 Extra
          <br /> Lo Mein or Chicken Fried Rice or Shrimp Fried Rice Instead of
          White Rice $3.75 Extra
        </Typography>{" "}
      </div>

      <Box marginTop={10}>
        <Grid container spacing={3}>
          {itemGrid}
        </Grid>
      </Box>
    </Box>
  );
};

export default Diet;
