import React from "react";

import {
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
import {AccountCircle, CalendarToday} from "@material-ui/icons";

// context provider
import {useCartContext} from "../CartContext";

const tableStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 650,
  },
}));

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

function Confirmation() {
  const tableClasses = tableStyles();

  const {prevOrder} = useCartContext();

  const cart = prevOrder.cart;
  const name = prevOrder.name;
  const email = prevOrder.email;
  const phone = prevOrder.phone;

  const pickUpOption = prevOrder.pickUpOption;
  const pickUpTime = prevOrder.pickUpTime;
  const timePlaced = prevOrder.timePlaced;
  const orderReqs = prevOrder.orderReqs;

  const estimatedTime = prevOrder.estimatedTime;
  const pickUpTimeArr = pickUpTime ? pickUpTime.split(":") : ["00", "00"];
  const pickUpHour = pickUpTimeArr[0];
  const pickUpMinute = pickUpTimeArr[1];
  const pickUpTime12Hour =
    Number(pickUpHour) > 12 ? Number(pickUpHour) - 12 : pickUpHour;
  const meridiem = Number(pickUpHour) >= 12 ? "PM" : "AM";
  const pickUpTime12HourStr = `${pickUpTime12Hour}:${pickUpMinute} ${meridiem}`;

  const paymentMethod = prevOrder.paymentMethod;
  const amountPaid = prevOrder.amountPaid;

  var subt1 = 0;
  cart.forEach((item) => (subt1 = subt1 + item.cartUnitPrice * item.quantity));
  var taxes = subt1 * 0.06;
  var total = subt1 * 1.06;

  const filledCart = (
    <TableContainer component={Paper}>
      <Table
        className={(tableClasses.table, Confirmation)}
        aria-label="spanning table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Box>
                <Typography variant="h5"> ‿୨ order ୧‿　</Typography>{" "}
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography gutterBottom>
                Subtotal: {formatter.format(subt1)} <br /> Taxes (6%):{" "}
                {formatter.format(taxes)}
                <br /> <strong> Total </strong>
                {formatter.format(total)} <br />
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((item, index) => {
            const itemOptions = Object.entries(item.options)
              .map(([key, value]) => {
                return value;
              })
              .join(", ");
            const itemTotalPrice = item.cartUnitPrice * item.quantity;
            subt1 = subt1 + itemTotalPrice;

            return (
              <TableRow key={item.title}>
                <TableCell>
                  <Typography> 🍱 {item.title} </Typography>
                  <Typography style={{color: "#5e5e5e"}} variant="body2">
                    {" "}
                    🥠 {itemOptions}{" "}
                  </Typography>{" "}
                  <Typography style={{color: "#5e5e5e"}} variant="body2">
                    {" "}
                    👩‍🍳 Requests? {item.requestContent}{" "}
                  </Typography>
                  <Box variant="div" className="cartBottomOptions">
                    {" "}
                    <Typography> qty: {item.quantity}</Typography>
                    <Typography>
                      {" "}
                      {formatter.format(item.cartUnitPrice)} ( x {item.quantity}{" "}
                      ) = {formatter.format(itemTotalPrice)}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow key="orderReqs">
            <TableCell>
              <Typography>
                Order Requests: {orderReqs === "" ? "N/A" : orderReqs}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  // minions gif:
  // https://i.pinimg.com/originals/5e/65/93/5e659326c2027e01b2c56a8c6d7908e7.gif
  // quby (little monk)
  // https://1.bp.blogspot.com/-SQd93ExJA70/W9h0023ZyQI/AAAAAAA0VjY/pTA1Op9ysxQQqinq6V1v4aFJvGO7ujnvACLcBGAs/s1600/AW2158645_18.gif
  // thank you girl
  // https://i.pinimg.com/originals/fd/4a/58/fd4a58bfd60ee8d07ca3acc265c4b72a.gif
  return (
    <>
      <Box
        textAlign="left"
        py={1}
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box px={6}>
          <Box mb={5}> </Box>
          <Box
            style={{
              display: "flex",
              flexFlow: "row wrap",
            }}
          >
            {/* <img
              src="https://1.bp.blogspot.com/-SQd93ExJA70/W9h0023ZyQI/AAAAAAA0VjY/pTA1Op9ysxQQqinq6V1v4aFJvGO7ujnvACLcBGAs/s1600/AW2158645_18.gif"
              alt="celebration-gif"
              style={{
                maxWidth: "80%",
                maxHeight: "100px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            /> */}
          </Box>
          <Typography
            color="primary"
            style={{
              fontSize: "3rem",
              fontWeight: "900",
              textAlign: "center",
            }}
            gutterBottom
          >
            Order Confirmed!
          </Typography>
          <Box
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
              gap: "20px",
              alignItems: "center",
              padding: "10px 5px",
              margin: "auto",
              borderRadius: "5px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              maxWidth: "350px",
            }}
          >
            <AccountCircle fontSize="large" />
            <Box>
              <Typography
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "-1rem",
                }}
              >
                {name.split(" ")[0]}
              </Typography>
              <br />
              <a href={`mailto:${email}`}> {email} </a>
            </Box>
          </Box>
          <Box mb={5}> </Box>
          <Box
            style={{
              display: "flex",
              flexFlow: "column wrap",
              justifyContent: "center",
              gap: "20px",
              alignItems: "center",
              padding: "5% 30px",
              margin: "auto",
              borderRadius: "5px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              maxWidth: "650px",
            }}
          >
            <CalendarToday fontSize="large" />
            <Typography style={{color: "darkgrey"}}>
              Estimated Pick Up Time
            </Typography>
            <Typography
              style={{fontSize: "2.5rem", fontWeight: "900"}}
              gutterBottom
            >
              <b>
                {" "}
                {pickUpOption === "ASAP" ? estimatedTime : pickUpTime12HourStr}
              </b>
            </Typography>
          </Box>
          <Box mb={5}> </Box>
          <Typography variant="body1" gutterBottom>
            It will usually take our staff around <b>25-40 minutes</b> to
            prepare your order. Larger orders or orders placed during dinner
            time (4-9PM) and holidays, may take upwards to an hour. Thank you so
            much for your patience!
            <br />
            <br />
            <em>
              Note, we do not deliver - just come in and let us know you placed
              an online order!
            </em>
          </Typography>
          <Box mb={5}> </Box> <Box mb={5}> </Box>
          <Typography variant="h6" gutterBottom>
            <b> More Info: </b>
          </Typography>
          <Typography gutterBottom>
            <Typography variant="body1" gutterBottom>
              Thank you for your order! You should receive a confirmation email
              shortly at
              <a href={`mailto:${email}`}> {email} </a>.
              <br />
              <br />
              Check your spam/junk if you can't find it - or call us at
              410-877-9490 and ask if we received your order.
            </Typography>
            See <a href="/about">Order times</a> for more details on estimated
            order times.
            <br />
            See <a href="/about">Pricing</a> for more details on what costs you
            can expect.
          </Typography>
          <Box mb={3}> </Box>
          <Typography gutterBottom>
            If we have any questions, updates, or concerns about your order, we
            will contact you at {phone}.
          </Typography>
          <Box mb={3}> </Box>
          <Typography variant="h6" gutterBottom>
            <b> How was the experience? </b>
          </Typography>
          <Typography gutterBottom>
            Enjoyed the food? Click
            <a href="https://g.page/chinadelightforesthill/review?rc"> here </a>
            to leave us a review on Google! Any feedback is appreciated and
            helps us grow!
            <br />
            Also feel free to email
            <a href="mailto:chinadelightmd@gmail.com">
              {" "}
              chinadelightmd@gmail.com{" "}
            </a>
            with any suggestions or feedback.
          </Typography>
          <Box mb={3}> </Box>
          <Typography>
            <strong> Order Time </strong> {timePlaced}
            <br /> <strong> Pick Up Option </strong> {pickUpOption}
            {pickUpOption === "custom time" ? (
              <>
                {" "}
                <br /> <strong> Picking Up At </strong> {pickUpTime}{" "}
              </>
            ) : null}
            {pickUpOption === "ASAP" ? (
              <>
                {" "}
                <br /> <strong> Estimated Pick Up Time</strong> {estimatedTime}{" "}
              </>
            ) : null}
            <br />{" "}
            {paymentMethod === "In Person" ? (
              <div>
                {" "}
                <strong> Payment </strong> {paymentMethod} <br />{" "}
              </div>
            ) : (
              <div>
                <strong> ✅ Payment </strong> {paymentMethod} <br />{" "}
                <strong> ✅ Paid </strong> {formatter.format(amountPaid)}{" "}
                (includes 1.15 fee) <br />{" "}
                {total - amountPaid === 0 || total - amountPaid < 0 ? null : (
                  <div>
                    {" "}
                    <strong> ⛔ Have to pay: </strong>{" "}
                    {formatter.format(total - amountPaid)}{" "}
                  </div>
                )}
              </div>
            )}
          </Typography>
          <Box mb={5}> </Box>{" "}
        </Box>

        <Box style={{padding: "0 50px", width: "100%"}}>{filledCart} </Box>
      </Box>
    </>
  );
}

export default Confirmation;
