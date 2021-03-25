import React, { useState } from "react";
import { Typography, Box, Grid, makeStyles, Divider } from "@material-ui/core";

import MenuCard from "./MenuCard";

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
}));

function Menu() {
  const classes = useStyles();

  return (
    <div className="Cart">
      <Typography component="div" className={classes.root}>
        <Box textAlign="center" m={1}>
          <Typography textAlign="center" variant="h1" gutterBottom>
            ゜・ menu ・゜
          </Typography>
          <Typography textAlign="center" variant="body" gutterBottom>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          <br />
          <Typography
            textAlign="center"
            variant="body"
            gutterBottom
          ></Typography>

          <Divider className={classes.divider} />
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
              {" "}
              <em> available daily until 3:30 PM </em>
            </Typography>{" "}
          </div>

          <Box marginTop={10}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <MenuCard
                  menuItemName={"fried rice"}
                  menuItemDescription={"some fried rice!"}
                  priceSmall={7.25}
                  priceLarge={9.95}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MenuCard
                  menuItemName={"fried rice"}
                  menuItemDescription={"some fried rice!"}
                  priceSmall={7.25}
                  priceLarge={9.95}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MenuCard
                  menuItemName={"fried rice"}
                  menuItemDescription={"some fried rice!"}
                  priceSmall={7.25}
                  priceLarge={9.95}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MenuCard
                  menuItemName={"fried rice"}
                  menuItemDescription={"some fried rice!"}
                  priceSmall={7.25}
                  priceLarge={9.95}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MenuCard
                  menuItemName={"fried rice"}
                  menuItemDescription={"some fried rice!"}
                  priceSmall={7.25}
                  priceLarge={9.95}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MenuCard
                  menuItemName={"fried rice"}
                  menuItemDescription={"some fried rice!"}
                  priceSmall={7.25}
                  priceLarge={9.95}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MenuCard
                  menuItemName={"fried rice"}
                  menuItemDescription={"some fried rice!"}
                  priceSmall={7.25}
                  priceLarge={9.95}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MenuCard
                  menuItemName={"fried rice"}
                  menuItemDescription={"some fried rice!"}
                  priceSmall={7.25}
                  priceLarge={9.95}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Typography>
    </div>
  );
}

export default Menu;
