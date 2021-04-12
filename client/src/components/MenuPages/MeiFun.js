import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, makeStyles } from "@material-ui/core";

// fetching data from db
import api from "../api";

import MeiFunMenuCard from "../MenuParts/MeiFunMenuCard";

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

const MeiFun = (props) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);

  useEffect(
    () =>
      api.get("/api/meifun").then((res) => {
        setItems(res.data);
      }),
    []
  );

  const itemGrid = items.map((item) => (
    <Grid item xs={12} sm={6} md={4}>
      <MeiFunMenuCard
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
          Mei Fun{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          Also known as Rice Noodles. <br /> Stir-fried rice-based noodles with
          meats of your choice.
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

export default MeiFun;
