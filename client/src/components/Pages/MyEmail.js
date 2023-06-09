import React from "react";
import {Email, Item} from "react-html-email";

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

const MyEmail = ({order}) => {
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
    var timeString = hour + ":" + minute + " " + ap;
    return timeString;
  }
  const orderTime = getClockTime();

  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const year = new Date().getFullYear();
  const fullDate = `${month}/${date}/${year}`;

  var subtotal = 0;
  cart.forEach(
    (item) => (subtotal = subtotal + item.cartUnitPrice * item.quantity)
  );
  var taxes = subtotal * 0.06;
  var total = subtotal * 1.06;

  // convert pickUpTime to 12 hour format
  const pickUpTime = order.pickUpTime;
  const pickUpTimeArr = pickUpTime.split(":");
  const pickUpHour = pickUpTimeArr[0];
  const pickUpMinute = pickUpTimeArr[1];
  const pickUpTime12Hour =
    Number(pickUpHour) > 12 ? Number(pickUpHour) - 12 : pickUpHour;
  const meridiem = Number(pickUpHour) >= 12 ? "PM" : "AM";
  const pickUpTime12HourStr = `${pickUpTime12Hour}:${pickUpMinute} ${meridiem}`;

  const pickUpDetails = (
    <b>
      <br />
      <h3>
        Pickup{" "}
        {order.pickUpOption === "ASAP"
          ? `ASAP around ${estimatedTime}`
          : "Custom Pick-Up Time"}{" "}
        {order.pickUpOption === "custom time" ? (
          <div> ⏰ Pick up time: {pickUpTime12HourStr} </div>
        ) : null}{" "}
      </h3>
    </b>
  );

  const paidOnline = (
    <b>
      <h3>
        Customer Paid Online {formatter.format(amountPaid)} (includes 1.15 fee)
        ✅ <br />
        {total - amountPaid === 0 || total - amountPaid < 0 ? null : (
          <div>
            <strong> Amount Due </strong>
            {formatter.format(total - amountPaid)}
          </div>
        )}
      </h3>
    </b>
  );

  const payInPerson = (
    <b>
      <h3>
        💵 Paying In Person
        <br />
      </h3>
    </b>
  );

  const filledCart = (
    <div>
      {cart.map((item, index) => {
        const sizeToStr = () => {
          switch (item.options.sizeValue) {
            case "Pint":
              return "Pt.";
            case "Quart":
              return "Qt.";
            default:
              return "";
          }
        };
        const itemSize = sizeToStr();
        const itemOptions =
          itemSize +
          " " +
          Object.entries(item.options)
            .map(([key, value]) => {
              if (key === "sizeValue") {
                return "";
              }
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
        const requestContent = (
          <>
            <b> Note: </b> <em>`${item.requestContent}</em>
          </>
        );

        return (
          <tr key={item.title}>
            <td>
              <div>
                <h4>
                  🍱
                  <b>
                    {" "}
                    ({item.quantity}) {itemSize} {item.title}
                  </b>
                </h4>
              </div>
              <div> &emsp; {itemOptions} </div>
              <br />
              <br />
              <div>
                &emsp;
                {item.requestContent === "" ? null : requestContent}
              </div>
              <div>
                <div> &emsp; QTY: {item.quantity}</div>
                <div>
                  {formatter.format(item.cartUnitPrice)} (x{item.quantity}) ={" "}
                  {formatter.format(itemTotalPrice)}
                </div>
              </div>
            </td>
          </tr>
        );
      })}
    </div>
  );

  const orderEmail = (
    <Email title="china delit order">
      <Item>
        <div
          style={{
            padding: "25px",
          }}
        >
          <h2> China Delight </h2>
          <h1>
            {" "}
            {name.split(" ")[0]}'s Order #{phone}
          </h1>
          {name} | {email} | {phone}
          <div>
            {fullDate} | {orderTime}
          </div>
          <div> {pickUpDetails} </div>
          <div>{paymentMethod === "In Person" ? payInPerson : paidOnline}</div>
          <table
            aria-label="spanning table"
            style={{
              padding: "20px 20px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              width: "85%",
            }}
          >
            <tr>
              <th align="center">
                <div>
                  <h3> Today's Receipt </h3>
                </div>
              </th>
            </tr>
            {filledCart}

            <tr>
              <td>
                <div>
                  <br />
                  <br />
                  {orderRequests && (
                    <strong> Customer's requests for the order: </strong>
                  )}
                  <br />
                  {orderRequests}
                  <br />
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      marginLeft: "-1px",
                      marginBottom: "8px",
                      background: "black",
                    }}
                  ></div>
                  <strong> Subtotal:</strong> {formatter.format(subtotal)}
                  <br /> <strong> Taxes (6%): </strong>{" "}
                  {formatter.format(taxes)}
                  <br />
                  <br />
                  <div>
                    <b> Total</b>
                  </div>
                  <div style={{fontSize: "2rem", fontWeight: "800"}}>
                    {formatter.format(total)}
                  </div>
                  <br />
                </div>
              </td>
            </tr>
          </table>
          <br />
          <br />
          Any questions?
          <br />
          Don't hesitate to email us at chinadelightmd@gmail.com. <br />
          Or, call us at 410-877-9490!
        </div>
      </Item>
    </Email>
  );

  return <div> {orderEmail} </div>;
};

export default MyEmail;
