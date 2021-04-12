import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, makeStyles } from "@material-ui/core";

// fetching data from db
import api from "../api";

import SSMenuCard from "../MenuParts/SSMenuCard";

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

const SweetAndSour = (props) => {
  const classes = useStyles();
  const [sss, setSss] = useState([]);

  useEffect(
    () =>
      api.get("/api/ss").then((res) => {
        setSss(res.data);
      }),
    []
  );

  const ssGrid = sss.map((ss) => (
    <Grid item xs={12} sm={6} md={4}>
      <SSMenuCard
        itemName={ss.name}
        itemDescription={ss.description}
        img={ss.img}
        price={ss.price}
        priceSm={ss.priceSm}
        priceLg={ss.priceLg}
        reviews={ss.reviews}
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
          Sweet and Sour{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          Breaded meats deep-fried served with sweet and sour sauce on the side.
        </Typography>{" "}
      </div>

      <Box marginTop={10}>
        <Grid container spacing={3}>
          {ssGrid}
        </Grid>
      </Box>
    </Box>
  );
};

export default SweetAndSour;
