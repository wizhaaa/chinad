import React, { useState } from "react";
import { Typography, Box } from "@material-ui/core";

import { Button, Chip } from "@material-ui/core";

import { Button as ButtonIcon } from "@material-ui/icons";

// styling
import useStyles from "../MaterialStyles";

function Cart() {
  const [count, setCount] = useLocalStorage("count", 0);
  const classes = useStyles();

  return (
    <div className="Cart">
      <Box textAlign="center" className={classes.alignToCenter}>
        <Box> Box 1 </Box>
        <Typography component="div">
          <Typography variant="h4" gutterBottom>
            my cart
          </Typography>
          <Typography variant="subheading"> counter: {count} </Typography>
          <Button color="inherit" onClick={() => setCount(count + 1)}>
            {" "}
            Add{" "}
          </Button>
          <Chip
            onClick={() => setCount(count + 1)}
            label="add"
            onDelete={() => {}}
          />{" "}
        </Typography>
      </Box>
    </div>
  );
}

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default Cart;
