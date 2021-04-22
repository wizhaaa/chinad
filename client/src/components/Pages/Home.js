import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Typography, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Grid } from "@material-ui/core";

function Home() {
  return (
    <div className="Home">
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="China Delight Chinese Restaurant, Forest Hill, MD，Chinese Food, Fast delivery, Online coupon, Restaurant Review, Take Out, Eat in, Dine in, Online, Order, Online Order, Menu, Maryland, Harford County"
        />
        <meta
          name="description"
          content="China Delight Chinese Restaurant based in Forest Hill, Maryland. Serve the Bel Air, Fallston, and Jarrestville area. We do dine-in, carryout, and online orders!"
        />
        {/* <meta name="author" content="Will Zhang" />
        <a href="https://www.chinadelightmd.com/menu"> Menu </a>
        <a href="https://www.chinadelightmd.com/dinner-combo"> Dinner </a>
        <a href="https://www.chinadelightmd.com/chef"> Specials </a>
        <a href="https://www.chinadelightmd.com/sides"> Sides </a>
        <a href="https://www.chinadelightmd.com/appetizers">
          {" "}
          Appetizers{" "}
        </a>{" "} */}
        <title> China Delight - Forest Hill, MD </title>
      </Helmet>
      <Typography component="div">
        <Box textAlign="center" m={1} py={8}>
          <Typography variant="h4" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            👋 Welcome the new China Delight website! We are a Chinese take-out
            (& limited Dine-In during COVID) restauraunt located in Forest Hill,
            MD.
          </Typography>
          <br />
          <Typography variant="body1" gutterBottom>
            🛒 Here, you may browse our menu and place online orders for
            pick-up! We recommend to use the side bar navigation to browse the
            menu, and not to scroll through the 200+ items! It's faster and less
            swiping.
          </Typography>{" "}
          <br />
          <Typography variant="body1" gutterBottom>
            <em> Disclaimer: the </em>{" "}
            <em>
              {" "}
              photos are not accurate replications of our dishes, only a
              reference to see what they look like{" "}
            </em>
          </Typography>
          <Box py={2}> </Box>
          {/* <a className="homeButton" size="large" href="/menu">
            Order Now
          </a>{" "} */}
          <Box py={2}> </Box>
          <Typography variant="body1" gutterBottom>
            <Typography variant="h4" gutterBottom>
              {" "}
              Hours{" "}
            </Typography>
            <Grid container spacing={3}>
              <Grid container item xs={6} justify="flex-end">
                Mondays - Thursdays{" "}
              </Grid>
              <Grid container item xs={6}>
                11 AM - 10 PM{" "}
              </Grid>
              <Grid container item xs={6} justify="flex-end">
                Fridays - Saturdays{" "}
              </Grid>
              <Grid container item xs={6}>
                11 AM - 10:30 PM{" "}
              </Grid>
              <Grid container item xs={6} justify="flex-end">
                Sundays{" "}
              </Grid>
              <Grid container item xs={6}>
                12 - 9:30 PM{" "}
              </Grid>
              <Grid container item xs={6} justify="flex-end">
                Tuesdays{" "}
              </Grid>
              <Grid container item xs={6}>
                CLOSED ❌{" "}
              </Grid>
            </Grid>
          </Typography>
          <Box py={2}> </Box>
          <Typography variant="body1" gutterBottom>
            <Typography variant="h4" gutterBottom>
              {" "}
              Contact{" "}
            </Typography>
            📞 PHONE: 410-877-9490 <br />
            📩 EMAIL:{" "}
            <a href="mailto:chinadelightmd@gmail.com">
              {" "}
              chinadelightmd@gmail.com{" "}
            </a>
          </Typography>
          <Box py={2}> </Box>
          <Typography variant="body1" gutterBottom>
            <Typography variant="h4" gutterBottom>
              {" "}
              Directions{" "}
            </Typography>
            📍 1 Newport Dr, Forest Hill, MD 21050
            <Box py={1.5}> </Box>
            On 24 (Rocks Spring Road), right across Enotria
            <Box py={1.5}> </Box>
            <iframe
              title="china delight map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.182788165903!2d-76.3879002845251!3d39.57803061414107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c7deb7b8b012ab%3A0xd3e57330e03df815!2sChina%20Delight!5e0!3m2!1sen!2sus!4v1617983002384!5m2!1sen!2sus"
              width="400"
              height="300"
              style={{ border: 0, maxWidth: 350 }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </Typography>
        </Box>
      </Typography>
    </div>
  );
}

export default Home;
