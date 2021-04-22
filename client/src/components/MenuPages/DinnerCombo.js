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
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.get("/api/dinners").then((res) => {
      setDinners(res.data);
    });
  }, []);

  const dinnerGrid = dinners.map((dinner) => (
    <Grid item xs={12} sm={6} md={4}>
      <DinnerMenuCard
        itemName={dinner.name}
        itemDescription={dinner.description}
        img={dinner.img}
        price={dinner.price}
        priceSm={dinner.priceSm}
        priceLg={dinner.priceLg}
        reviews={dinner.reviews}
      />
    </Grid>
  ));

  const filteredDinnerGrid = dinners.map((dinner) => {
    if (dinner.name.toLowerCase().includes(filter.toLowerCase())) {
      return (
        <Grid item xs={12} sm={6} md={6}>
          <DinnerMenuCard
            itemName={dinner.name}
            itemDescription={dinner.description}
            img={dinner.img}
            price={dinner.price}
            priceSm={dinner.priceSm}
            priceLg={dinner.priceLg}
            reviews={dinner.reviews}
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
          Dinner{" "}
        </Typography>
        <Typography className={classes.subheadings}>
          * AKA Combo platters or Dinner platters *
          <br /> Can choose between <strong> Fried or White Rice </strong>
          <em> (free of charge) </em>
          <br /> Each comes with an <strong> Egg Roll </strong>{" "}
          <em> (free of charge) </em>
          <br /> Can choose to add a <strong> Soup </strong> for +$1
        </Typography>{" "}
      </div>{" "}
      <TextField
        name="orderRequests"
        style={{ width: "80%" }}
        id="outlined-textarea"
        label="Search for your dish"
        placeholder="Try... Crispy Beef"
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
      <Box marginTop={10}>
        <Grid container spacing={3}>
          {filter === "" ? dinnerGrid : filteredDinnerGrid}
        </Grid>
      </Box>
    </Box>
  );
};

export default DinnerCombo;
