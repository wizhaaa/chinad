import React, { useState } from "react";
import { Email, Item } from "react-html-email";

// import { useCartContext } from "../CartContext";

// import {
//   Button as ButtonIcon,
//   Delete as DeleteIcon,
//   ShoppingCart as ShoppingCartIcon,
// } from "@material-ui/icons";
// import {
//   IconButton,
//   Button,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   makeStyles,
// } from "@material-ui/core";

// const tableStyles = makeStyles((theme) => ({
//   table: {
//     width: "100%",
//     maxWidth: 805,
//   },
// }));

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const MyEmail = ({ order }) => {
  //   const { cart, setCart, userCartCount } = useCartContext();

  //   const tableClasses = tableStyles();

  //   const [cartSubtotal, setCartSubtotal] = useState(0);
  //   var subt1 = 0;
  //   cart.forEach((item) => (subt1 = subt1 + item.cartUnitPrice * item.quantity));
  //   var taxes = subt1 * 0.06;
  //   var total = subt1 * 1.06;

  const name = order.name;
  const email = order.email;
  const phone = order.phone;
  const cart = order.cart;
  const orderRequests = order.orderReqs;
  var orderPickUpTime = order.pickUpTime;

  const date = new Date().toString();
  const emailTotal = order.cart.total;

  var subtotal = 0;
  cart.forEach(
    (item) => (subtotal = subtotal + item.cartUnitPrice * item.quantity)
  );
  var taxes = subtotal * 0.06;
  var total = subtotal * 1.06;

  const pickUpDetails = (
    <div>
      {" "}
      Pick up Option: {order.pickUpOption}
      {order.pickUpOption === "custom time" ? (
        <div> Pick up time: {order.pickUpTime} </div>
      ) : null}{" "}
    </div>
  );

  const filledCart = (
    <div>
      {cart.map((item, index) => {
        const itemOptions = Object.entries(item.options)
          .map(([key, value]) => {
            return value;
          })
          .join(", ");
        const itemTotalPrice = item.cartUnitPrice * item.quantity;

        return (
          <tr key={item.title}>
            <td>
              <div> 🍱 {item.title} </div>
              <div> 🥠 {itemOptions} </div>{" "}
              <div> 👩‍🍳 requests? {item.requestContent} </div>
              <div>
                {" "}
                <div> qty: {item.quantity}</div>
                <div>
                  {" "}
                  {formatter.format(item.cartUnitPrice)} ( x {item.quantity} ) ={" "}
                  {formatter.format(itemTotalPrice)}
                </div>{" "}
              </div>
            </td>
          </tr>
        );
      })}
    </div>
  );

  return (
    <Email title="title !">
      <Item>
        {" "}
        <h1> China Delight Order </h1>
        <div> Thank you {name} for your order! </div>
        <div> Order Time: {date} </div>
        Order for: {name}
        <br /> Email: {email}
        <br /> Phone: {phone}
        <br /> Order Cost: {emailTotal}
        <div>
          subtotal: {formatter.format(subtotal)}
          <br /> taxes (6%): {formatter.format(taxes)}
          <br /> total: {formatter.format(total)} <br />{" "}
        </div>
        <div> {pickUpDetails} </div>
        <table aria-label="spanning table">
          <tr>
            <th align="center">
              {" "}
              <div>
                <h3> ~ order ~</h3>{" "}
              </div>
            </th>
          </tr>
          {filledCart}
        </table>
        customer's requests for the order:
        <br />
        {orderRequests}
        <br /> any questions? don't hesitate to email us at
        chinadelightmd@gmail.com or call us at 410-877-9490! <br />
      </Item>
    </Email>
  );
};

export default MyEmail;
