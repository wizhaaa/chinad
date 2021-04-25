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
  // const { orderPaid } = useCartContext();

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
  const paymentMethod = order.paymentMethod;
  const amountPaid = order.amountPaid;

  function getClockTime() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var ap = "AM";
    if (hour > 11) {
      ap = "PM";
    }
    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour === 0) {
      hour = 12;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    var timeString = hour + ":" + minute + ":" + second + " " + ap;
    return timeString;
  }
  const orderTime = getClockTime();

  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const year = new Date().getFullYear();
  const fullDate = `${month} - ${date} - ${year}`;

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
        <div> ⏰ Pick up time: {order.pickUpTime} </div>
      ) : null}{" "}
    </div>
  );

  const filledCart = (
    <div>
      {cart.map((item, index) => {
        const itemOptions = Object.entries(item.options)
          .map(([key, value]) => {
            switch (value) {
              case "Lunch":
                return "L";
              case "Dinner":
                return "#";
              case "White Rice":
                return "WR";
              case "Fried Rice":
                return "FR";
              default:
                return value;
            }
          })
          .join(", ");
        const itemTotalPrice = item.cartUnitPrice * item.quantity;

        return (
          <div>
            <br />
            <tr key={item.title}>
              <td>
                <div> 🍱 {item.title} </div>
                <div> &emsp; {itemOptions} </div>{" "}
                <div>
                  {" "}
                  &emsp;{" "}
                  {item.requestContent === ""
                    ? null
                    : `> ${item.requestContent}`}{" "}
                </div>
                <div>
                  {" "}
                  <div> &emsp; QTY: {item.quantity}</div>
                  <div>
                    {formatter.format(item.cartUnitPrice)} ( x {item.quantity} )
                    = {formatter.format(itemTotalPrice)}
                  </div>{" "}
                </div>
              </td>
            </tr>{" "}
            <br />
          </div>
        );
      })}
    </div>
  );

  const orderEmail = (
    <Email title="china delit order">
      <Item>
        {" "}
        <h1> China Delight Order </h1>
        <div>🙇‍♀️ Thank you {name} for your order! </div>
        <div>
          {" "}
          Order Time: {fullDate} {orderTime}{" "}
        </div>
        Order for: {name}
        <br /> Email: {email}
        <br /> Phone: {phone}
        <div> {pickUpDetails} </div>
        <div>
          Subtotal: {formatter.format(subtotal)}
          <br /> Taxes (6%): {formatter.format(taxes)}
          <br /> Total: {formatter.format(total)} <br />
          {paymentMethod === "In Person" ? (
            <div>
              {" "}
              <strong> ⛔ Payment </strong> {paymentMethod} <br />{" "}
            </div>
          ) : (
            <div>
              <strong> ✅ Payment </strong> {paymentMethod} <br />{" "}
              <strong> ✅ Paid </strong> {formatter.format(amountPaid)}{" "}
              (includes .50 fee) <br />{" "}
              {total - amountPaid === 0 || total - amountPaid < 0 ? null : (
                <div>
                  {" "}
                  <strong> ⛔ Have to pay: </strong>{" "}
                  {formatter.format(total - amountPaid)}{" "}
                </div>
              )}
            </div>
          )}
        </div>
        <table aria-label="spanning table">
          <tr>
            <th align="center">
              {" "}
              <div>
                <h3> ~ order ~ </h3>{" "}
              </div>
            </th>
          </tr>
          {filledCart}
        </table>
        <br />
        <br />
        <div className="divider"> </div>
        <strong> Customer's requests for the order: </strong>
        <br />
        {orderRequests}
        <br />
        <br />
        <div>
          {" "}
          <strong> Subtotal:</strong> {formatter.format(subtotal)}
          <br /> <strong> Taxes (6%): </strong> {formatter.format(taxes)}
          <br /> <strong> Total: </strong> {formatter.format(total)} <br />
        </div>
        <div className="divider"> </div>
        <br />
        <br /> Any questions? Don't hesitate to email us at
        chinadelightmd@gmail.com or call us at 410-877-9490! <br />
      </Item>
    </Email>
  );

  return <div> {orderEmail} </div>;
};

export default MyEmail;
