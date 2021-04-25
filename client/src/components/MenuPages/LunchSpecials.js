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
import api from "../api";

import LunchMenuCard from "../MenuParts/LunchMenuCard";

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
  const [lunches, setLunches] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.get("/api/lunches").then((res) => {
      setLunches(res.data);
    });
  }, []);

  const lunchGrid = lunches.map((lunch) => (
    <Grid item xs={12} sm={6} md={4}>
      <LunchMenuCard
        itemName={lunch.name}
        itemDescription={lunch.description}
        img={lunch.img}
        price={lunch.price}
        priceSm={lunch.priceSm}
        priceLg={lunch.priceLg}
        reviews={lunch.reviews}
      />
    </Grid>
  ));

  const filteredLunchGrid = lunches.map((lunch) => {
    if (lunch.name.toLowerCase().includes(filter.toLowerCase())) {
      return (
        <Grid item xs={12} sm={6} md={6}>
          <LunchMenuCard
            itemName={lunch.name}
            itemDescription={lunch.description}
            img={lunch.img}
            price={lunch.price}
            priceSm={lunch.priceSm}
            priceLg={lunch.priceLg}
            reviews={lunch.reviews}
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
          Lunch{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          Served with the choice of:{" "}
          <strong>
            {" "}
            Fried Rice, White Rice, Lo Mein (+1.5), or Pork Fried Rice (+1.5).{" "}
          </strong>
          <br />
          Optional: Choose Egg Drop Soup, Wonton Soup, or Hot & Sour Soup, Egg
          Roll, or Soda for $0.75
          <br />
          <br />
          <em style={{ color: "#B18944" }}>
            {" "}
            Note: Available daily until 3:30 PM{" "}
          </em>
        </Typography>{" "}
      </div>

      <Box marginTop={10}>
        <TextField
          name="orderRequests"
          style={{ width: "80%" }}
          id="outlined-textarea"
          label="Search for your dish"
          placeholder="Try... Egg Foo Young"
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
          {filter === "" ? lunchGrid : filteredLunchGrid}
        </Grid>
      </Box>
    </Box>
  );
};

export default LunchSpecials;
