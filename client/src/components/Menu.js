import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function Menu() {
  return (
    <div className="Cart">
      <Typography component="div">
        <Box textAlign="center" m={1}>
          <Typography textAlign="center" variant="h4" gutterBottom>
            Menu
          </Typography>
        </Box>
      </Typography>
    </div>
  );
}

export default Menu;
