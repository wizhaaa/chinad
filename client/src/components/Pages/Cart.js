import React, { useState, useContext } from "react";

import { Button as ButtonIcon, Delete as DeleteIcon } from "@material-ui/icons";
import {
  IconButton,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from "@material-ui/core";

// context provider
import { useCartContext } from "../CartContext";

// styling
import useStyles from "../MaterialStyles";

const tableStyles = makeStyles((theme) => ({
  table: {
    minWidth: 470,
  },
}));

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const TAX_RATE = 0.06;

function ccyFormat(num) {
  return `${formatter.format(num)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(itemName, desc, requests, qty, unit) {
  const price = priceRow(qty, unit);
  return { itemName, desc, requests, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow(
    "Sweet & Sour Chicken",
    "dinner, small, fried rice, egg roll, hot & sour soup",
    "extra spicy please",
    20,
    1.15
  ),
  createRow(
    "General Tso Chicken",
    "this is the description",
    "extra spicy please",
    10,
    45.99
  ),
  createRow(
    "Combination of Shrimp & Chicken",
    "this is the description",
    "extra spicy please",
    2,
    17.99
  ),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function Cart() {
  const tableClasses = tableStyles();

  const jsonRows = JSON.stringify(rows);
  localStorage.setItem("orderItems", JSON.stringify(rows));
  var storedOrderItems = JSON.parse(localStorage.getItem("orderItems"));

  const { cart, setCart, userCartCount } = useCartContext();

  const handleDelete = (i) => {
    console.log("deleting item @ index : ", i);
    setCart((prevItems) => {
      return prevItems.filter((cartItem, index) => {
        return index !== i;
      });
    });
  };

  const filledCart = (
    <TableContainer component={Paper}>
      <Table className={tableClasses.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
            <Table cell align="right">
              {" "}
            </Table>
          </TableRow>
          <TableRow>
            <TableCell> Item </TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {storedOrderItems.map((row) => (
            <TableRow key={row.itemName}>
              <TableCell>
                <Typography>{row.itemName} </Typography>
                <Typography style={{ color: "#d1d1d1" }} variant="body2">
                  {" "}
                  {row.desc}{" "}
                </Typography>{" "}
                <Typography style={{ color: "#d1d1d1" }} variant="body2">
                  {" "}
                  notes: {row.requests}{" "}
                </Typography>
              </TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              <TableCell align="right">
                {" "}
                <IconButton onClick={() => console.log("deleted item")}>
                  <DeleteIcon> </DeleteIcon>
                </IconButton>{" "}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  const emptyCart = (
    <Typography>
      {" "}
      woops! looks like your cart is empty! head over to the menu and add items
      to your cart ~{" "}
    </Typography>
  );

  const testCart = cart.map((item, index) => (
    <div>
      {" "}
      item @ index {index} is called {item.title} ({item.quantity} of them) and
      it costs {item.cartUnitPrice}.
      <br />
      Special requests: {item.textFieldValue}
      <br /> Item options is: {item.options.riceValue} ;{" "}
      {item.options.sideValue}. <br />{" "}
      <Button onClick={() => handleDelete(index)}> delete this item! </Button>
    </div>
  ));

  // every option object is not the same. They will have different options. some include option with sizes,or what not
  const testMap = cart.map((item, index) => {
    const optionArray = [];
    const obj = item.options;
    for (var key in obj) {
      console.log(obj[key]);
      optionArray.push(obj[key]);
    }
    return optionArray;
  });

  return (
    <div className="Cart">
      <Typography component="div">
        <Box textAlign="center" m={1}>
          <Typography textAlign="center" variant="h4" gutterBottom>
            my cart ({userCartCount})
          </Typography>
          <Typography> test map {testMap} </Typography>
          <Typography textAlign="center" variant="body" gutterBottom>
            <Button onClick={() => setCart([])}> Confirm & Place Order </Button>
            <Button onClick={() => setCart([1, 2, 3])}>
              {" "}
              Reset Cart to default{" "}
            </Button>
          </Typography>
          {userCartCount > 0 ? filledCart : emptyCart}
        </Box>
      </Typography>
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
