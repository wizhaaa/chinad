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
import {Launch as LaunchIcon} from "@material-ui/icons";

// context provider
import {useCartContext} from "../CartContext";

import CheckoutDialog from "./CheckoutDialog";

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

  const {prevOrder, orderPaid} = useCartContext();

  const cart = prevOrder.cart;
  const name = prevOrder.name;
  const email = prevOrder.email;
  const phone = prevOrder.phone;

  const pickUpOption = prevOrder.pickUpOption;
  const pickUpTime = prevOrder.pickUpTime;
  const timePlaced = prevOrder.timePlaced;
  const orderReqs = prevOrder.orderReqs;

  const estimatedTime = prevOrder.estimatedTime;

  const paymentMethod = prevOrder.paymentMethod;
  const amountPaid = prevOrder.amountPaid;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
              {" "}
              <Box>
                <Typography variant="h5"> ‿୨ order ୧‿　</Typography>{" "}
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography gutterBottom>
                {" "}
                Subtotal: {formatter.format(subt1)} <br /> Taxes (6%):{" "}
                {formatter.format(taxes)}
                <br /> <strong> Total </strong>
                {formatter.format(total)} <br />{" "}
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
            {" "}
            <TableCell>
              <Typography>
                {" "}
                Order Requests: {orderReqs === "" ? "N/A" : orderReqs}{" "}
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
    <div className="Cart">
      <Typography component="div">
        <Box textAlign="left" m={1} py={8} mx={"1%"}>
          <Box style={{maxWidth: 650}}>
            <img
              src="https://1.bp.blogspot.com/-SQd93ExJA70/W9h0023ZyQI/AAAAAAA0VjY/pTA1Op9ysxQQqinq6V1v4aFJvGO7ujnvACLcBGAs/s1600/AW2158645_18.gif"
              alt="celebration-gif"
              style={{
                maxWidth: "80%",
                maxHeight: "200px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />
            <Box mb={5}> </Box>
            <Typography variant="h3" style={{fontSize: "3.5rem"}} gutterBottom>
              谢谢 Order Confirmation
            </Typography>
            <Typography variant="body1" gutterBottom>
              {" "}
              Thank you {name} for your order! You should have received a
              confirmation email at <a href={`mailto:${email}`}> {email} </a>.
            </Typography>
            <Typography variant="body1" gutterBottom>
              {" "}
              <b> Still can't find it? </b>{" "}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {" "}
              Check your junk/spam folder or call us at 410-877-9490 and ask if
              we received your order.{" "}
            </Typography>
            <Box mb={5}> </Box>
            <Typography variant="h5" gutterBottom>
              {" "}
              <b> What's next?</b>{" "}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {" "}
              Come in to pick it up and tell us you placed an online order!{" "}
              <br />
              <b> Please Note: </b>
              We do not deliver. You must come in to pick it up.
            </Typography>
            <Box mb={5}> </Box>{" "}
            <Typography variant="h5" gutterBottom>
              {" "}
              <b> How long?</b>{" "}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {" "}
              Regular wait times are usually 15-20 minutes.
              <br />
              Orders placed during dinner time (5-8 PM) on Fridays/Saturdays may
              take over 30 minutes. Major Holidays may take over an hour. Thank
              you for your patience!{" "}
            </Typography>
            <Box mb={5}> </Box>
            <Typography variant="h5" gutterBottom>
              {" "}
              <b> More Info </b>{" "}
            </Typography>
            <Typography gutterBottom>
              {" "}
              <a href="/about">
                {" "}
                Order times
                {/* <LaunchIcon
                  style={{ alignItems: "center", height: "1rem" }}
                />{" "} */}
              </a>{" "}
              for more details on estimated order times.
              <br />
              <a href="/about">
                {" "}
                Pricing
                {/* <LaunchIcon
                  style={{ alignItems: "center", height: "1rem" }}
                />{" "} */}
              </a>{" "}
              for more details on what costs you can expect.{" "}
            </Typography>
            <Box mb={3}> </Box>
            <Typography gutterBottom>
              {" "}
              If we have any questions, updates, or concerns about your order,
              we will contact you at {phone}.{" "}
            </Typography>
            <Box mb={3}> </Box>
            <Typography gutterBottom>
              <img
                style={{maxWidth: 23}}
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/271/man-technologist_1f468-200d-1f4bb.png"
                alt="typing-man"
              />{" "}
              How was the ordering experience? Email{" "}
              <a href="mailto:chinadelightmd@gmail.com">
                {" "}
                chinadelightmd@gmail.com{" "}
              </a>
              with any suggestions or feedback.
              <br />
              🤤 Enjoyed the food? Click{" "}
              <a href="https://g.page/chinadelightforesthill/review?rc">
                {" "}
                here
              </a>{" "}
              to leave us a review on Google! Any feedback is appreciated and
              helps us grow!
            </Typography>
            <Box mb={3}> </Box>
            <Typography>
              {" "}
              <strong> 📆 Order Time </strong> {timePlaced}
              <br /> <strong> Pick Up Option </strong> {pickUpOption}{" "}
              {pickUpOption === "custom time" ? (
                <>
                  {" "}
                  <br /> <strong> Picking Up At </strong> {pickUpTime}{" "}
                </>
              ) : null}
              {pickUpOption === "ASAP" ? (
                <>
                  {" "}
                  <br /> <strong> Estimated Pick Up Time</strong>{" "}
                  {estimatedTime}{" "}
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

          <Typography gutterBottom>{filledCart} </Typography>

          <Typography variant="body" gutterBottom>
            <Box mb={5}></Box>
            <Box p={22}> </Box>
          </Typography>
        </Box>
      </Typography>
      <CheckoutDialog open={open} onClose={handleClose} total={total} />
    </div>
  );
}

export default Confirmation;
