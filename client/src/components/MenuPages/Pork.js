import React, {useState, useEffect} from "react";
import {Typography, Box, Grid, makeStyles, TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

// fetching data from db
import api from "../api";

import PorkMenuCard from "../MenuParts/PorkMenuCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  divider: {margin: theme.spacing(6)},
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

const Pork = (props) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(
    () =>
      api.get("/api/pork").then((res) => {
        setItems(res.data);
      }),
    []
  );

  const itemGrid = items.map((item) => (
    <Grid item xs={12} sm={6} md={4}>
      <PorkMenuCard
        itemName={item.name}
        itemDescription={item.description}
        img={item.img}
        price={item.price}
        priceSm={item.priceSm}
        priceLg={item.priceLg}
        reviews={item.reviews}
      />
    </Grid>
  ));
  const filteredItemGrid = items.map((item) => {
    if (item.name.toLowerCase().includes(filter.toLowerCase())) {
      return (
        <Grid item xs={12} sm={6}>
          <PorkMenuCard
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
    <Box textAlign="center" m={1} py={8} style={{width: "100%"}}>
      <div>
        {" "}
        <Typography
          variant="h3"
          className={(classes.menuHeadings, classes.bold)}
          gutterBottom
        >
          Pork
        </Typography>
        <Typography className={classes.subheadings}>
          Land fish served with white rice.
        </Typography>{" "}
      </div>

      <Box marginTop={10} style={{width: "100%"}}>
        <TextField
          name="orderRequests"
          style={{width: "80%"}}
          id="outlined-textarea"
          label="Search for your dish"
          placeholder="Try... Scallions"
          rows={1}
          rowsMax={1}
          multiline
          variant="outlined"
          inputProps={{maxLength: 50}}
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
          {/* {filter === "" ? itemGrid : filteredItemGrid} */}
          Oops! Something went wrong.
        </Grid>
      </Box>
    </Box>
  );
};

export default Pork;
