import { React, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Add as AddIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  Launch as LaunchIcon,
} from "@material-ui/icons";
import {
  Grid,
  Box,
  Fab,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  makeStyles,
  Divider,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import { wrap } from "module";
import { useCartContext } from "../CartContext";
//email
import MyEmail from "./MyEmail";
import { renderEmail } from "react-html-email";
import { Redirect } from "react-router";
import api from "../api";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: { margin: 10 },
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
  divider: { margin: theme.spacing(3) },
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
}));

const CheckoutDialog = (props) => {
  const { onClose, open, total } = props;

  const { cart, setCart, orderID, setOrderID, setPrevOrder } = useCartContext();

  const [orderReqs, setOrderReqs] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState();
  const [pickUpOption, setPickUpOption] = useState("ASAP");
  const [customTime, setCustomTime] = useState("16:00");

  const [backdrop, setBackdrop] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  let order = {};
  let date = new Date().toString();
  const minutes = new Date().getMinutes() + 20;
  const hours = new Date().getHours();
  const estimatedTime = `${hours}:${minutes}`;
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
      estimatedTime: estimatedTime,
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
      estimatedTime: estimatedTime,
    };
  }

  const handleClose = () => {
    onClose();
  };

  const addOrder = (newOrder) => {
    api
      .post("/api/order/add", newOrder)
      // .then((res) => setOrderID(res.data.id))
      .catch((err) => console.log(err));
  };

  // const sendEmail = (newOrder) => {
  //   api
  //     .post("/api/send", newOrder)
  //     .then((res) => {
  //       alert("email sending...");
  //       console.log("respsone is", res.data.msg);
  //       if (res.data.msg === "success") {
  //         alert("Email sent, awesome!");
  //       } else if (res.data.msg === "fail") {
  //         alert("Oops, something went wrong. Try again");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  const sendEmail = () => {
    const messageHtml = renderEmail(
      <MyEmail name={name} order={order}></MyEmail>
    );
    axios({
      method: "POST",
      url: "http://localhost:4747/api/send",
      data: {
        name: name,
        email: email,
        messageHtml: messageHtml,
      },
    }).then((response) => {
      if (response.data.msg === "success") {
        window.location.href = "/confirmation";
      } else if (response.data.msg === "fail") {
        alert("Oops, something went wrong. Try again");
      }
    });
  };

  const handlePlaceOrder = (e) => {
    if (Object.keys(cart).length <= 0) {
      alert("ERROR :please add items into your cart ");
    } else {
      console.log("placing order ...");

      //commenting out adding order for now
      // addOrder(order);
      sendEmail();
      // redirect
      // window.location.href = "/"
      e.preventDefault();

      //empty our cart
      setPrevOrder(order);
      setCart([]);
      setBackdrop(true);
      handleClose();
      console.log(orderID);
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

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth="sm"
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <form onSubmit={handlePlaceOrder} autoComplete="off">
          <DialogTitle
            id="responsive-dialog-title"
            className={classes.dialogTitle}
          >
            <div style={{ display: "flex" }}>
              {" "}
              <Typography variant="h4" style={{ flexGrow: 1 }}>
                ► Checking out ...{" "}
              </Typography>{" "}
              <IconButton color="primary" onClick={handleClose}>
                {" "}
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            {" "}
            <Box textAlign="center">
              {" "}
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    {" "}
                    👇 Please fill out the info to place your order 👇
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {" "}
                    <em>items marked with an * are required </em>
                  </Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    {" "}
                    👋 Name:
                  </Typography>{" "}
                  <TextField
                    style={{ width: "75%", paddingBottom: "20px" }}
                    id="outlined-textarea"
                    label="👋 name"
                    placeholder="Sun Tzu"
                    autoComplete="name"
                    rowsMax={1}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ maxLength: 250 }}
                    required
                    value={name}
                    onChange={handleNameChange}
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    {" "}
                    📧 Email:
                  </Typography>{" "}
                  <TextField
                    style={{ width: "75%", paddingBottom: "20px" }}
                    id="outlined-textarea"
                    label="📧 email"
                    placeholder="ilovechinadelight@gmail.com"
                    type="email"
                    pattern=".+@globlex.com"
                    autoComplete="email"
                    rowsMax={1}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ maxLength: 250 }}
                    required
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    {" "}
                    📞 Phone Number:
                  </Typography>{" "}
                  <TextField
                    style={{ width: "75%", paddingBottom: "20px" }}
                    id="outlined-textarea"
                    label="📞 phone #"
                    placeholder="410-877-9490"
                    type="tel"
                    autoComplete="tel"
                    rowsMax={1}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ maxLength: 250 }}
                    required
                    value={phoneNum}
                    onChange={handlePhoneNumChange}
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <Box>
                    <Typography gutterBottom>
                      Please note: If your requests contain extra sauce, extra
                      meat, or anything extra, they are liable to extra fees not
                      calculated in the final price below. Please see{" "}
                      <a href="/about">
                        {" "}
                        pricing
                        <LaunchIcon
                          style={{ alignItems: "center", height: "1rem" }}
                        />{" "}
                      </a>{" "}
                      for more details on what costs you can expect.{" "}
                    </Typography>
                  </Box>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item xs={12}>
                  <Box pb={5}>
                    <Typography variant="h5" gutterBottom>
                      ⏰ Pick Up time:{" "}
                    </Typography>{" "}
                    <Typography gutterBottom>
                      <FormControl component="fieldset">
                        <FormLabel component="legend"> select one: </FormLabel>
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
                            label="custom time"
                          />
                        </RadioGroup>{" "}
                        {pickUpOption === "custom time"
                          ? customTimeChooser
                          : null}
                      </FormControl>
                    </Typography>
                  </Box>
                </Grid>{" "}
                <Grid item xs={12}>
                  {" "}
                  <Typography>
                    {" "}
                    Orders usually take 15-20 minutes. <br /> We will try our
                    best to finish your order on time. <br /> We only have 2
                    chefs, please bear with us 🙇‍♂️ <br /> Friday and saturdays
                    nights can get very busy and orders can take upwards of 1
                    hour on holidays. <br /> Please see
                    <a href="/about">
                      {" "}
                      order times
                      <LaunchIcon
                        style={{ alignItems: "center", height: "1rem" }}
                      />{" "}
                    </a>{" "}
                    for more details on estimated order times.
                  </Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item xs={12}>
                  {" "}
                  <Box m={3} className={classes.textFields}>
                    <TextField
                      name="orderRequests"
                      style={{ width: "100%" }}
                      id="outlined-textarea"
                      label="anything else?"
                      placeholder="let us know!"
                      rows={4}
                      rowsMax={8}
                      multiline
                      variant="outlined"
                      inputProps={{ maxLength: 250 }}
                      value={orderReqs}
                      onChange={handleOrderReqsChange}
                    />{" "}
                  </Box>
                </Grid>{" "}
                <Divider className={classes.divider} />
              </Grid>
            </Box>
            <DialogContentText className={classes.container}>
              {" "}
            </DialogContentText>
          </DialogContent>

          <DialogActions className="dialogContainer">
            <Box pr={5}>
              <Typography variant="h4"> {formatter.format(total)} </Typography>
            </Box>

            <Box pt={1.5} px={1.5}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                aria-label="add"
                type="submit"
                onClick={() => console.log(" trying to place order ... ")}
              >
                {" "}
                🎉 Place Order!{" "}
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" /> <br />
        <Typography variant="h4">
          {" "}
          Sending... don't close the window{" "}
        </Typography>
      </Backdrop>
    </>
  );
};

export default CheckoutDialog;
