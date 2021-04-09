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
  const estimatedTime = order.estimatedTime;

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
      ) : (
        <div> Estimated pick up @ {estimatedTime} </div>
      )}{" "}
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
    <Email title="china delit order">
      <Item>
        {" "}
        <h1> China Delight Order </h1>
        <div> Thank you {name} for your order! </div>
        <div> Order Time: {date} </div>
        Order for: {name}
        <br /> Email: {email}
        <br /> Phone: {phone}
        <div>
          Subtotal: {formatter.format(subtotal)}
          <br /> Taxes (6%): {formatter.format(taxes)}
          <br /> Total: {formatter.format(total)} <br />{" "}
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
        <div className="divider"> </div>
        customer's requests for the order:
        <br />
        {orderRequests}
        <div className="divider"> </div>
        <br /> any questions? don't hesitate to email us at
        chinadelightmd@gmail.com or call us at 410-877-9490! <br />
      </Item>
    </Email>
  );
};

export default MyEmail;
