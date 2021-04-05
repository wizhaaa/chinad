import React, { useState, useEffect } from "react";
import axios from "axios";

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

const AxiosTest = () => {
  const [body, setBody] = useState("initial body");
  const [mydata, setmydata] = useState("initial data");

  const [cart, setCart] = useState([]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  var subt1 = 0;
  const randomData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => {
        setBody(response.data.body);
        console.log(response);
      });
    console.log("button hit");
  };

  const myPost = () => {
    console.log("Hitting our local server:");
    axios.get("http://localhost:4747/").then((res) => console.log(res.data));
  };

  useEffect(
    () =>
      axios.get("http://localhost:4747/suck").then((res) => {
        console.log(res.data);
        setCart(res.data);
      }),
    []
  );

  console.log(cart);

  return (
    <div class="cartContainer">
      {" "}
      <h1> Axios Test Page </h1>
      {/* <img src="/logo.png" alt="logo" /> */}
      <div></div>
      <div> server data:</div>
      <div>
        {" "}
        my cart:{" "}
        <TableRow>
          <TableCell>
            {" "}
            subtotal: {formatter.format(subt1)} <br /> taxes (6%):{" "}
            {formatter.format(subt1 * 0.06)}
            <br /> total: {formatter.format(subt1 * 1.06)} <br />
          </TableCell>
        </TableRow>
        {cart.map((item, index) => {
          const itemOptions = Object.entries(item.options)
            .map(([key, value]) => {
              return value;
            })
            .join(", ");
          const itemTotalPrice = item.cartUnitPrice * item.quantity;
          subt1 = subt1 + itemTotalPrice;

          return (
            <TableContainer component={Paper}>
              <Table aria-label="spanning table">
                <TableRow key={item.title}>
                  <TableCell>
                    <Typography> 🍱 {item.title} </Typography>
                    <Typography style={{ color: "#d1d1d1" }} variant="body2">
                      {" "}
                      🥠 {itemOptions}{" "}
                    </Typography>{" "}
                    <Typography style={{ color: "#d1d1d1" }} variant="body2">
                      {" "}
                      👩‍🍳 requests? {item.textFieldValue}{" "}
                    </Typography>
                    <Box variant="div" className="cartBottomOptions">
                      {" "}
                      <Typography> qty: {item.quantity}</Typography>
                      <Typography>
                        {" "}
                        {formatter.format(item.cartUnitPrice)}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          );
        })}
      </div>
      <button onClick={() => randomData()}> hit me </button>
      <button onClick={() => myPost()}> my server </button>
    </div>
  );
};

export default AxiosTest;
