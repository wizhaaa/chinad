import React, { useState } from "react";
import { Typography, Box, Grid, makeStyles } from "@material-ui/core";

import MenuCard from "../MenuCard";

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

const LunchSpecials = (props) => {
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
          lunch specials{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          served with the choice of{" "}
          <strong>
            {" "}
            fried rice, white rice, lo mein (+1.75), or pork fried rice (+1.75).{" "}
          </strong>
          <br />
          optional: choose egg drop soup, wonton soup, or hot & sour soup, egg
          roll, or soda for $0.75 <em> available daily until 3:30 PM </em>
        </Typography>{" "}
      </div>

      <Box marginTop={10}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <MenuCard
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
          <Grid item xs={12} sm={6} md={4}>
            <MenuCard
              itemName={"sweet & sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg"
              }
              price={6.25}
              priceSm={null}
              priceLg={null}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MenuCard
              itemName={"sweet & sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg"
              }
              price={6.25}
              priceSm={null}
              priceLg={null}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MenuCard
              itemName={"sweet & sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg"
              }
              price={6.25}
              priceSm={null}
              priceLg={null}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MenuCard
              itemName={"sweet & sour chicken"}
              itemDescription={
                "crispy, breaded chicken with sweet and sour sauce on the side"
              }
              img={
                "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg"
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

export default LunchSpecials;
