import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function Home() {
  return (
    <div className="Home">
      <Typography component="div">
        <Box textAlign="center" m={1}>
          <Typography textAlign="center" variant="h4" gutterBottom>
            Welcome!
          </Typography>
          <Typography textAlign="center" variant="body" gutterBottom>
            {" "}
            Welcome to China Delight's Online Web Store. Navigate to the side
            menu to browse our menu and add items to your cart. When you are
            finished, goto your cart to checkout!{" "}
          </Typography>
          <br />
          <Typography textAlign="center" variant="body" gutterBottom>
            {" "}
            We are a Chinese take-out located in Forest Hill, Maryland. Hours
            Here: Address Here: Click Here to find directions!{" "}
          </Typography>
        </Box>
      </Typography>
    </div>
  );
}

export default Home;
