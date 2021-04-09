import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { Grid } from "@material-ui/core";

function Home() {
  return (
    <div className="Home">
      <Typography component="div">
        <Box textAlign="center" m={1} py={8}>
          <Typography variant="h4" gutterBottom>
            welcome!
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            welcome the new china delight website! we are a chinese take-out ( &
            dine-in whenever COVID decides it's safe enough ) restauraunt
            located in Forest Hill, MD.
          </Typography>
          <br />
          <Typography variant="body1" gutterBottom>
            here, you may browse our menu and place online orders for pick-up! I
            reccommend to use the side bar navigation to browse the menu, and
            not to scroll through the 200+ items! It's faster and less swiping.
          </Typography>
          <Box py={2}> </Box>
          <Typography variant="body1" gutterBottom>
            <Typography variant="h4" gutterBottom>
              {" "}
              hours{" "}
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
              contact{" "}
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
              directions{" "}
            </Typography>
            📍 1 Newport Dr, Forest Hill, MD 21050
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
