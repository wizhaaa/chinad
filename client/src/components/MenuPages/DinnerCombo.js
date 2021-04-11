import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, makeStyles } from "@material-ui/core";

// fetching data from db
import api from "../api";

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
  const [dinners, setDinners] = useState([]);

  useEffect(() => {
    api.get("/api/dinners").then((res) => {
      setDinners(res.data);
    });
  });

  const dinnerGrid = dinners.map((dinner) => (
    <Grid item xs={12} sm={6} md={4}>
      <DinnerMenuCard
        itemName={dinner.name}
        itemDescription={dinner.description}
        img={dinner.img}
        price={dinner.price}
        priceSm={dinner.priceSm}
        priceLg={dinner.priceLg}
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
          Dinner{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          * AKA Combo platters or Dinner platters *
          <br /> Can choose between <strong> fried or white rice </strong>
          <em> (for free!) </em>
          <br /> Each comes with an <strong> egg roll </strong>{" "}
          <em> (for free!) </em>
          <br /> Can choose to add a <strong> soup </strong> for +$1
        </Typography>{" "}
      </div>

      <Box marginTop={10}>
        <Grid container spacing={3}>
          {dinnerGrid}
        </Grid>
      </Box>
    </Box>
  );
};

export default DinnerCombo;
