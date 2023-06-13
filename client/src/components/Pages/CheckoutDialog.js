import {React, useState} from "react";
import {useTheme} from "@material-ui/core/styles";
import {Close as CloseIcon} from "@material-ui/icons";
import {
  Grid,
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  useMediaQuery,
  makeStyles,
  Divider,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {AlertTitle} from "@material-ui/lab";

import {useCartContext} from "../CartContext";
//email
import MyEmail from "./MyEmail";
import {renderEmail} from "react-html-email";
import api from "../api";
import Paypal from "./Paypal";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {margin: 10},
  gridPadding: {
    padding: 15,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  addIcon: {
    display: "flex",
    justifyContent: "flex-end",
  },
  bottomText: {
    justifyContent: "center",
  },
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    paddingBottom: theme.spacing(3),
    flexWrap: "wrap",
  },
  img: {
    maxWidth: 300,
    maxHeight: 300,
    height: 230,
    width: "100%",
    objectFit: "cover",
  },

  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  divider: {margin: theme.spacing(3)},
  selectedValue: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,

    marginLeft: 10,
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textFields: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  boldHeading: {
    fontWeight: 800,
  },
}));

const CheckoutDialog = (props) => {
  const {onClose, open, total} = props;

  const {cart, setCart, setPrevOrder, orderPaid} = useCartContext();

  const [orderReqs, setOrderReqs] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState();
  const [pickUpOption, setPickUpOption] = useState("ASAP");
  const [customTime, setCustomTime] = useState("16:00");
  const [paymentPage, setPaymentPage] = useState(false);
  const [finalPage, setFinalPage] = useState(false);
  const [firstPage, setFirstPage] = useState(true);
  const [showPayPal, setShowPayPal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("In Person");
  const [amountPaid, setAmountPaid] = useState(0);

  const [backdrop, setBackdrop] = useState(false);

  // handling alerts
  const [formAlert, setFormAlert] = useState(false);
  const formAlertClose = () => {
    setFormAlert(false);
  };

  const [emptyAlert, setEmptyAlert] = useState(false);
  const emptyAlertClose = () => {
    setEmptyAlert(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  let order = {};
  let date = new Date().toString();

  // Calculate Order Wait Time, for ASAP orders which take 30 minutes usually, or 1 hour on weekends.
  // For scheduled orders, the wait time is the difference between the scheduled time and the current time.
  const currTime = new Date();

  // Check if Th, Fr, Sa and time is 4-8pm
  const busy =
    currTime.getDay() >= 4 &&
    currTime.getDay() <= 6 &&
    currTime.getHours() >= 16 &&
    currTime.getHours() < 20;

  const offset = busy ? 60 * 60 * 1000 : 40 * 60 * 1000;
  const pickUpTime = new Date(currTime.getTime() + offset);
  // Convert the hours to 12-hour format
  var hours = pickUpTime.getHours();
  var amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  // Format the future time as a string
  var pickUpTimeStr =
    hours.toString().padStart(2, "0") +
    ":" +
    pickUpTime.getMinutes().toString().padStart(2, "0") +
    " " +
    amPm;

  // Determine device type:
  let userAgent = navigator.userAgent;
  const mobileRegex =
    /Andrio|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const desktopRegex = /Chrome|Safari|Firefox|Edge|MSIE|Opera/i;

  let deviceType = "desktop";
  if (mobileRegex.test(userAgent)) {
    deviceType = "mobile";
  } else if (desktopRegex.test(userAgent)) {
    deviceType = "desktop";
  }

  if (pickUpOption === "ASAP") {
    order = {
      name: name,
      email: email,
      phone: phoneNum,
      pickUpOption: pickUpOption,
      cart: cart,
      orderReqs: orderReqs,
      total: total,
      timePlaced: date,
      estimatedTime: pickUpTimeStr,
      paymentMethod: paymentMethod,
      amountPaid: amountPaid,
      deviceType: deviceType,
    };
  } else {
    order = {
      name: name,
      email: email,
      phone: phoneNum,
      pickUpOption: pickUpOption,
      pickUpTime: customTime,
      cart: cart,
      orderReqs: orderReqs,
      total: total,
      timePlaced: date,
      estimatedTime: pickUpTimeStr,
      paymentMethod: paymentMethod,
      amountPaid: amountPaid,
      deviceType: deviceType,
    };
  }

  const handleClose = () => {
    onClose();
  };

  const addOrder = (newOrder) => {
    api.post("/api/order/add", newOrder).catch((err) => console.log(err));
  };

  const sendEmail = async () => {
    const messageHtml = renderEmail(<MyEmail order={order}></MyEmail>);
    const response = await api.post("/api/send", {
      name: name,
      email: email,
      messageHtml: messageHtml,
    });
    if (response.data.msg === "success") {
      window.location.href = "/confirmation";
    } else if (response.data.msg === "fail") {
      alert("Oops, something went wrong. Try again");
    }
  };

  const handlePlaceOrder = (e) => {
    if (Object.keys(cart).length <= 0) {
      setEmptyAlert(true);
    } else {
      console.log("placing order ...");
      addOrder(order);
      window.localStorage.setItem("order", JSON.stringify(order));
      console.log("order added to DB ...");
      sendEmail();
      console.log("sent email ...");
      // redirect
      // window.location.href = "/"
      e.preventDefault();

      //empty our cart
      setPrevOrder(order);
      setCart([]);
      setBackdrop(true);
      handleClose();
    }
  };

  const handlePickUpOptionChange = (e) => {
    var text = e.target.value;
    setPickUpOption(text);
  };

  const handleCustomTimeChange = (e) => {
    var time = e.target.value;
    setCustomTime(time);
    console.log("Want to be picked up at ", customTime);
  };

  const handleOrderReqsChange = (e) => {
    var text = e.target.value;
    setOrderReqs(text);
  };
  const handleNameChange = (e) => {
    var text = e.target.value;
    setName(text);
  };
  const handleEmailChange = (e) => {
    var text = e.target.value;
    setEmail(text);
  };
  const handlePhoneNumChange = (e) => {
    var text = e.target.value;
    setPhoneNum(text);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const customTimeChooser = (
    <TextField
      id="time"
      label="pick up @"
      type="time"
      defaultValue="16:00"
      value={customTime}
      onChange={handleCustomTimeChange}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 600, // 5 min
      }}
    />
  );

  const page1 = (
    <Grid container style={{textAlign: "left"}}>
      <form
        onSubmit={(e) => {
          setPaymentPage(!paymentPage);
          setFirstPage(!firstPage);
          e.preventDefault();
        }}
      >
        <Grid item xs={12}>
          <Typography
            style={{
              fontSize: "1.3rem",
              fontWeight: "800",
            }}
          >
            Personal Information
          </Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
              }}
            >
              Name
            </Typography>
            <TextField
              style={{width: "100%", paddingBottom: "20px"}}
              id="outlined-textarea"
              placeholder="Sun Tzu"
              autoComplete="name"
              rowsMax={1}
              variant="outlined"
              InputLabelProps={{shrink: true}}
              inputProps={{maxLength: 250}}
              required
              value={name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
              }}
            >
              Email
            </Typography>
            <TextField
              style={{width: "100%", paddingBottom: "20px"}}
              id="outlined-textarea"
              placeholder="ilovechinadelight@gmail.com"
              pattern=".+@globlex.com"
              autoComplete="email"
              rowsMax={1}
              variant="outlined"
              InputLabelProps={{shrink: true}}
              inputProps={{maxLength: 250}}
              required
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
              }}
            >
              Phone Number
            </Typography>
            <TextField
              style={{width: "100%", paddingBottom: "20px"}}
              id="outlined-textarea"
              placeholder="410-877-9490"
              type="tel"
              autoComplete="tel"
              rowsMax={1}
              variant="outlined"
              InputLabelProps={{shrink: true}}
              inputProps={{maxLength: 250}}
              required
              value={phoneNum}
              onChange={handlePhoneNumChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography gutterBottom>
              Please note: If your requests contain extra sauce, extra meat, or
              anything extra, they are liable to extra fees not calculated in
              the final price below. Please see <a href="/about">pricing</a> for
              more details on what costs you can expect.
            </Typography>
          </Box>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <Box pb={5}>
            <Typography
              style={{
                fontSize: "1.3rem",
                fontWeight: "800",
              }}
            >
              Pick Up Time:
            </Typography>
            <Typography gutterBottom>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="pickup"
                  name="pickup"
                  value={pickUpOption}
                  onChange={handlePickUpOptionChange}
                >
                  <FormControlLabel
                    value="ASAP"
                    control={<Radio />}
                    label="ASAP"
                  />
                  <FormControlLabel
                    value="custom time"
                    control={<Radio />}
                    label="Custom"
                  />
                </RadioGroup>{" "}
                {pickUpOption === "custom time" ? customTimeChooser : null}
              </FormControl>
            </Typography>
          </Box>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <Typography
            style={{
              fontSize: "1.3rem",
              fontWeight: "800",
            }}
          >
            Special Requests?
          </Typography>
          <Box m={3} className={classes.textFields}>
            <TextField
              name="orderRequests"
              style={{width: "100%"}}
              id="outlined-textarea"
              placeholder="Let Us Know!"
              rows={4}
              rowsMax={8}
              multiline
              variant="outlined"
              inputProps={{maxLength: 250}}
              value={orderReqs}
              onChange={handleOrderReqsChange}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "right",
          }}
        >
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            aria-label="pay"
            type="submit"
          >
            Next
          </Button>
        </Grid>
      </form>

      <Divider className={classes.divider} />
    </Grid>
  );

  const page2 = (
    <Grid container style={{textAlign: "left"}}>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          aria-label="pay"
          onClick={() => {
            setPaymentPage(!paymentPage);
            setFirstPage(!firstPage);
          }}
        >
          Back
        </Button>
        <Box py={1.5}> </Box>
        <Typography
          style={{
            fontSize: "1.7rem",
            fontWeight: "800",
          }}
          gutterBottom
        >
          Choose a payment method
        </Typography>
        <Typography variant="body1">
          After finishing the order or finish the paypal payment, you will be
          redirected to the order confirmation page and should receive an email
          confirmation from{" "}
          <a href="mailto:chinadelightmd@gmail.com.">
            chinadelightmd@gmail.com.
          </a>
          <br />
          <br />
          <strong> Please note, we do not deliver in either case. </strong>
          <br />
          <br />
        </Typography>
        <Box py={3}> </Box>
        <Box>
          <Typography
            style={{
              fontSize: "1.3rem",
              fontWeight: "800",
            }}
            gutterBottom
          >
            Want to Pay Online?
          </Typography>
          <Box py={1}> </Box>
          <Box></Box>
        </Box>
        <Box>
          {orderPaid ? (
            <Box textAlign="center" width="100%">
              <Typography variant="body1">
                Thank you! Your online order status will be updated as paid ✅
                Amount Paid: {formatter.format(amountPaid)} (Inludes 1.15 fee)
                <br />
                {total - amountPaid === 0 || total - amountPaid < 0 ? null : (
                  <div>
                    <strong> Have to Pay: </strong>
                    {formatter.format(total - amountPaid)}
                  </div>
                )}
              </Typography>
            </Box>
          ) : (
            <Button
              variant="contained"
              size="large"
              color="secondary"
              aria-label="pay"
              onClick={() => setShowPayPal(!showPayPal)}
            >
              {showPayPal ? "NEVERMIND" : "Pay Online"}
            </Button>
          )}
          {showPayPal && (
            <Box>
              <Box py={2}> </Box>
              <Typography
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "650",
                }}
                gutterBottom
              >
                DISCLAIMER
              </Typography>
              <Typography variant="body1" gutterBottom>
                There is a <strong> $1.15 fee </strong> and any special requests
                not calculated online may require you to pay extra in-person.
                Please see <a href="/about"> pricing </a> for more details on
                what costs you can expect.
                <br />
                <br />
                <strong> We do not deliver. </strong>
                PayPal may ask for a shipping address as their service requires
                it but we will not deliver to that address. If you want food
                delivered, try 3rd-party apps like Grubhub, DoorDash, UberEats
                etc.
                <Box py={2}> </Box>
                <Typography variant="body1" gutterBottom>
                  Once the PayPal payment goes through, an email will be sent
                  and you will be redirected to the confirmation page. If
                  nothing happens, call us to see if we got your order. Make
                  sure to add all your items in your cart and
                  <strong> do not reload or leave the page.</strong>
                </Typography>
              </Typography>
              <Box py={2}> </Box>

              <Paypal
                orderTotal={total}
                cart={cart}
                order={order}
                setAmountPaid={setAmountPaid}
                handlePlaceOrder={handlePlaceOrder}
                sendEmail={sendEmail}
                setPrevOrder={setPrevOrder}
                setCart={setCart}
                setBackdrop={setBackdrop}
                handleClose={handleClose}
                setPaymentMethod={setPaymentMethod}
                setFinalPage={setFinalPage}
                setPaymentPage={setPaymentPage}
              />
              {/* <Typography> Working on this feature... </Typography> */}
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box py={5}> </Box>
        {showPayPal ? null : (
          <div>
            <Typography
              style={{
                fontSize: "1.3rem",
                fontWeight: "800",
              }}
              gutterBottom
            >
              I'll Pay In Person
            </Typography>
            <Box
              pb={3}
              style={{
                fontSize: "1.1rem",
              }}
            >
              Amount Due: {formatter.format(total)}
            </Box>
            <Button
              variant="contained"
              size="large"
              color="primary"
              aria-label="checkout"
              type="submit"
              onClick={handlePlaceOrder}
            >
              Finish Order
            </Button>
          </div>
        )}

        <Box py={5}> </Box>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth="sm"
        maxWidth="md"
        classes={{paper: classes.dialogWrapper}}
      >
        <DialogTitle
          id="responsive-dialog-title"
          className={classes.dialogTitle}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
            }}
          >
            <Typography
              color="secondary"
              style={{fontSize: "2rem", fontWeight: "800"}}
            >
              CHECKOUT
            </Typography>
            <IconButton color="primary" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Box textAlign="center">
            <Box py={3}></Box>
            {firstPage && page1}
            {paymentPage ? page2 : null}

            {/* {paymentPage ? (
              <Grid item xs={12}>
                <Box>
                  {" "}
                  <Typography variant="h5" gutterBottom>
                    {" "}
                    Want to Pay Online?
                  </Typography>
                </Box>{" "}
                <Box py={2}> </Box>
                <Box>
                  {orderPaid ? (
                    <Box textAlign="center" width="100%">
                      {" "}
                      <Typography variant="body1">
                        {" "}
                        Thanks for paying! Your online order status will be
                        updated as paid ✅ Amount Paid:{" "}
                        {formatter.format(amountPaid)} (Inludes .50 fee)
                        <br />
                        {total - amountPaid === 0 ||
                        total - amountPaid < 0 ? null : (
                          <div>
                            {" "}
                            <strong> Have to Pay: </strong>{" "}
                            {formatter.format(total - amountPaid)}{" "}
                          </div>
                        )}
                      </Typography>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      aria-label="pay"
                      onClick={() => setPaymentPage(!paymentPage)}
                    >
                      {" "}
                      {paymentPage ? "❌ Cancel" : "💳 Pay Now"}
                    </Button>
                  )}
                </Box>
              </Grid>
            ) : null} */}
          </Box>
          <DialogContentText className={classes.container}> </DialogContentText>
        </DialogContent>

        <DialogActions className="dialogContainer">
          <Box pr={5}>
            <Typography
              color="primary"
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
              }}
            >
              {formatter.format(total)}
            </Typography>
          </Box>

          <Box pt={1.5} px={1.5}>
            {firstPage ? (
              <Button
                variant="outlined"
                size="large"
                color="secondary"
                aria-label="pay"
                onClick={() => {
                  if (name === "" || email === "" || phoneNum === "") {
                    setFormAlert(true);
                  } else {
                    setPaymentPage(!paymentPage);
                    setFirstPage(!firstPage);
                  }
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                color="primary"
                aria-label="checkout"
                type="submit"
                onClick={handlePlaceOrder}
              >
                Finish Order
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={formAlert}
        autoHideDuration={4000}
        onClose={formAlertClose}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        <Alert onClose={formAlertClose} severity="error">
          {" "}
          <AlertTitle>Error</AlertTitle> Please fill out the form!{" "}
        </Alert>
      </Snackbar>{" "}
      <Snackbar
        open={emptyAlert}
        autoHideDuration={4000}
        onClose={emptyAlertClose}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        <Alert onClose={emptyAlertClose} severity="error">
          {" "}
          <AlertTitle>Error</AlertTitle> Your cart is empty!{" "}
        </Alert>
      </Snackbar>
      <Backdrop
        className={classes.backdrop}
        open={backdrop}
        style={{
          whiteSpace: "pre-line",
          backgroundColor: "rgba(0, 0, 0, 1)",
        }}
      >
        <Box textAlign="center">
          <CircularProgress color="primary" />
          <Box p={5}> </Box>
          <Typography variant="h5" style={{whiteSpace: "pre-line"}}>
            {" "}
            Sending... don't close the window{" "}
          </Typography>
          <Box p={2}> </Box>
          <img
            src="loading.gif"
            alt="celebration-gif"
            style={{maxWidth: "80%"}}
          />{" "}
        </Box>
        {/* <Typography variant="h5">
          {" "}
          ...if it takes longer than a few minutes, check your email or try
          again.{" "}
        </Typography> */}
      </Backdrop>
    </>
  );
};

export default CheckoutDialog;
