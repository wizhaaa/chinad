import React, { useState } from "react";
import { Typography, Box } from "@material-ui/core";

import { Button, Chip } from "@material-ui/core";

import { Button as ButtonIcon, Delete as DeleteIcon } from "@material-ui/icons";

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from "@material-ui/core";

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

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function Cart() {
  const [count, setCount] = useLocalStorage("count", 0);
  const classes = useStyles();
  const tableClasses = tableStyles();

  return (
    <div className="Cart">
      {/* <Box textAlign="center" className={classes.alignToCenter}>
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
        
      </Box> */}
      <Typography component="div">
        <Box textAlign="center" m={1}>
          <Typography textAlign="center" variant="h4" gutterBottom>
            my cart
          </Typography>
          <Typography textAlign="center" variant="body" gutterBottom>
            {" "}
          </Typography>

          <TableContainer component={Paper}>
            <Table className={tableClasses.table} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> Item </TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.desc}>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.unit}</TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                    <TableCell align="right">
                      {" "}
                      <IconButton>
                        <DeleteIcon> </DeleteIcon>
                      </IconButton>{" "}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {ccyFormat(invoiceSubtotal)}
                  </TableCell>
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
