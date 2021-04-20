import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

// fetching data from db
import axios from "axios";
import api from "../api";

import AppetizerMenuCard from "../MenuParts/AppetizerMenuCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  divider: { margin: theme.spacing(6) },
  subheadings: {
    marginBottom: 50,
  },
  menuHeadings: {
    // paddingBottom: 30,
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

const Appetizers = (props) => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(
    () =>
      api.get("/api/appetizers").then((res) => {
        console.log(res.data);
        setItems(res.data);
      }),
    []
  );

  const classes = useStyles();

  // loop thru out appetizer collection
  const itemGrid = items.map((appetizer) => (
    <Grid item xs={12} sm={6} md={4}>
      <AppetizerMenuCard
        itemName={appetizer.name}
        itemDescription={appetizer.description}
        img={appetizer.img}
        price={appetizer.price}
        priceSm={appetizer.priceSm}
        priceLg={appetizer.priceLg}
        reviews={appetizer.reviews}
      />
    </Grid>
  ));
  const filteredItemGrid = items.map((item) => {
    if (item.name.toLowerCase().includes(filter.toLowerCase())) {
      return (
        <Grid item xs={12} sm={6}>
          <AppetizerMenuCard
            itemName={item.name}
            item
            itemDescription={item.description}
            img={item.img}
            price={item.price}
            priceSm={item.priceSm}
            priceLg={item.priceLg}
            reviews={item.reviews}
          />
        </Grid>
      );
    }
  });

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
          Appetizers{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          Classic chinese appetizers to tease the appetite
        </Typography>{" "}
      </div>

      <Box marginTop={10}>
        <TextField
          name="orderRequests"
          style={{ width: "80%" }}
          id="outlined-textarea"
          label="Search for your dish"
          placeholder="Try... Dumplings"
          rows={1}
          rowsMax={1}
          multiline
          variant="outlined"
          inputProps={{ maxLength: 50 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />{" "}
        <Box marginTop={5}></Box>
        <Grid container spacing={3}>
          {filter === "" ? itemGrid : filteredItemGrid}
        </Grid>
      </Box>
    </Box>
  );
};

export default Appetizers;
