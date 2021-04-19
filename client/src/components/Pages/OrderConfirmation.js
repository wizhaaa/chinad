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
import { Launch as LaunchIcon } from "@material-ui/icons";

// context provider
import { useCartContext } from "../CartContext";

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

  const { prevOrder, orderPaid } = useCartContext();

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

  const pickUpDetails = (
    <div>
      {" "}
      Pick up Option: {pickUpOption}
      {pickUpOption === "custom time" ? (
        <div> Pick up time: {pickUpTime} </div>
      ) : null}{" "}
    </div>
  );

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
                  <Typography style={{ color: "#5e5e5e" }} variant="body2">
                    {" "}
                    🥠 {itemOptions}{" "}
                  </Typography>{" "}
                  <Typography style={{ color: "#5e5e5e" }} variant="body2">
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

  return (
    <div className="Cart">
      <Typography component="div">
        <Box textAlign="center" m={1} py={8} mx={"1%"}>
          <Box style={{ maxWidth: 650 }}>
            <Typography variant="h4" gutterBottom>
              🎉 Success! 🙌
            </Typography>
            <img
              src="https://i.pinimg.com/originals/5e/65/93/5e659326c2027e01b2c56a8c6d7908e7.gif"
              alt="celebration-gif"
              style={{ maxWidth: "80%" }}
            />
            <Box mb={5}> </Box>
            <Typography variant="body1" gutterBottom>
              {" "}
              🙏 Thank you {name} for your order! You should have received a
              confirmation email (at {email} or your junk/spam folder).{" "}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {" "}
              ❓ Still can't find it?{" "}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {" "}
              Call us at 410-877-9490 and ask if we received your order.{" "}
            </Typography>
            <Box mb={5}> </Box>
            <Typography variant="h5" gutterBottom>
              {" "}
              🏃‍♀️ What's next?{" "}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {" "}
              Come in to pick it up and tell us you placed an online order!{" "}
            </Typography>
            <Box mb={5}> </Box>
            <Typography variant="h5" gutterBottom>
              {" "}
              🔗 quick links{" "}
            </Typography>
            <Typography gutterBottom>
              {" "}
              <a href="/about">
                {" "}
                ⏰ order times
                <LaunchIcon
                  style={{ alignItems: "center", height: "1rem" }}
                />{" "}
              </a>{" "}
              for more details on estimated order times.
              <br />
              <a href="/about">
                {" "}
                💸 pricing
                <LaunchIcon
                  style={{ alignItems: "center", height: "1rem" }}
                />{" "}
              </a>{" "}
              for more details on what costs you can expect.{" "}
            </Typography>
            <Box mb={3}> </Box>
            <Typography gutterBottom>
              {" "}
              📞 If we have any questions, updates, or concerns about your
              order, we will contact you at {phone}.{" "}
            </Typography>
            <Box mb={3}> </Box>
            <Typography gutterBottom>
              <img
                style={{ maxWidth: 23 }}
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/271/man-technologist_1f468-200d-1f4bb.png"
                alt="typing-man"
              />{" "}
              How was the ordering experience? Email{" "}
              <a href="mailto:chinadelightmd@gmail.com">
                {" "}
                chinadelightmd@gmail.com{" "}
              </a>
              with any suggestions or feedback. Anything helps us improve and
              learn! <br />
              🤤 Enjoyed the food? Click{" "}
              <a href="https://www.google.com/search?q=china+delight&authuser=3&sxsrf=ALeKk0216R8L-eEzUxoNXNmYIss9qtYxsA%3A1617941364003&source=hp&ei=c9NvYOyvOsms5NoPqa2a6Aw&iflsig=AINFCbYAAAAAYG_hhGz9b7oNbJuNgiTNZyyGrLikw5Lt&oq=china+delight&gs_lcp=Cgdnd3Mtd2l6EAMyCAgAELEDEMkDMgUIABCSAzIFCAAQkgMyCAguEMcBEK8BMggILhDHARCvATICCAAyAggAMgIIADICCAAyAggAOgUIABCxAzoICAAQsQMQgwE6DgguELEDEIMBEMcBEKMCOgsILhCxAxDHARCjAjoOCC4QsQMQxwEQowIQkwI6CAguELEDEIMBOgUIABDJAzoFCC4QsQNQlhNYuSNg4yRoAnAAeACAAXOIAb8JkgEDOS40mAEAoAEBqgEHZ3dzLXdperABAA&sclient=gws-wiz&ved=0ahUKEwistZCipfDvAhVJFlkFHamWBs0Q4dUDCAk&uact=5#lrd=0x89c7deb7b8b012ab:0xd3e57330e03df815,3,,,">
                {" "}
                here
              </a>{" "}
              to leave us a review on Google! Any feedback is appreciated and
              helps us grow!
            </Typography>
            <Box mb={3}> </Box>
            <Typography>
              {" "}
              <strong> Order Time </strong> {timePlaced}
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
              <br /> <strong> Payment </strong> {paymentMethod} <br />{" "}
              <strong> Paid </strong> {formatter.format(amountPaid)} (includes
              .50 fee) <br />{" "}
              {total - amountPaid === 0 || total - amountPaid < 0 ? null : (
                <div>
                  {" "}
                  <strong> Have to pay: </strong>{" "}
                  {formatter.format(total - amountPaid)}{" "}
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
