import React, {useState, useEffect} from "react";
import api from "../api";

import {
  Button as ButtonIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@material-ui/icons";
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
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {AlertTitle} from "@material-ui/lab";
// context provider
import {useCartContext} from "../CartContext";

import CheckoutDialog from "./CheckoutDialog";

// styling
import useStyles from "../MaterialStyles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const tableStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    maxWidth: 805,
  },
}));

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const PPformatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
});

function Cart() {
  const [onlineStatus, setOnlineStatus] = useState(false);

  const getOnlineStatus = async () => {
    const res = await api.get("/api/online");
    setOnlineStatus(res.data);
  };

  useEffect(() => {
    getOnlineStatus();
  }, []);

  const tableClasses = tableStyles();
  //handle empty cart alert
  const [emptyAlert, setEmptyAlert] = useState(false);
  const emptyAlertClose = () => {
    setEmptyAlert(false);
  };

  //handle ordering on tuesdays alert
  const [tuesdayAlert, setTuesdayAlert] = useState(false);
  const tuesdayAlertClose = () => {
    setTuesdayAlert(false);
  };

  // handling orders in the morning
  const [morningAlert, setMorningAlert] = useState(false);
  const morningAlertClose = () => {
    setMorningAlert(false);
  };

  const [holidayAlert, setHolidayAlert] = useState(false);
  const holidayAlertClose = () => {
    setHolidayAlert(false);
  };

  const {cart, setCart, userCartCount} = useCartContext();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (i) => {
    console.log("deleting item @ index : ", i);
    setCart((prevItems) => {
      return prevItems.filter((cartItem, index) => {
        return index !== i;
      });
    });
  };

  // for holiday alert. remember: .getMonth is i = 0 ... 11 (month -1)

  const handleCheckout = () => {
    // testing to allow opening cart
    // handleClickOpen();
    let today = new Date();
    // checkers
    const holiday =
      today.getDate() === 29 &&
      today.getMonth() === 0 &&
      today.getFullYear() === 2023;
    const emptyCart = userCartCount === 0;
    const morning = today.getHours() < 11;
    let valentines = today.getDate() === 14 && today.getMonth() === 1;

    // using checkers
    if (onlineStatus === false) {
      setHolidayAlert(true);
    } else if (!today.getDay() === 2 && !valentines) {
      setTuesdayAlert(true);
    } else if (holiday) {
      setHolidayAlert(true);
    } else if (morning) {
      setMorningAlert(true);
    } else if (emptyCart) {
      setEmptyAlert(true);
    } else {
      handleClickOpen();
      console.log("Checking out...");
    }
  };

  var subt1 = 0;
  cart.forEach((item) => (subt1 = subt1 + item.cartUnitPrice * item.quantity));
  var taxes = subt1 * 0.06;
  var total = subt1 * 1.06;

  const filledCart = (
    <TableContainer component={Paper}>
      <Table className={(tableClasses.table, Cart)} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              {" "}
              <Box>
                <Typography variant="h5"> Order </Typography>{" "}
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography gutterBottom>
                Subtotal: {formatter.format(subt1)}
                <br /> Taxes (6%): {formatter.format(taxes)}
                <br /> Total: {formatter.format(total)}
                <br />
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCheckout}
              >
                <ShoppingCartIcon /> Checkout
              </Button>
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

            return (
              <TableRow key={item.title}>
                <TableCell>
                  <Typography> 🍱 {item.title} </Typography>
                  <Typography style={{color: "#5e5e5d"}} variant="body2">
                    {" "}
                    🥠 {itemOptions}{" "}
                  </Typography>{" "}
                  <Typography style={{color: "#5e5e5d"}} variant="body2">
                    {" "}
                    👩‍🍳 Requests? {item.requestContent}{" "}
                  </Typography>
                  <Box variant="div" className="cartBottomOptions">
                    {" "}
                    <Typography> Qty: {item.quantity} </Typography>
                    <Typography>
                      {" "}
                      {formatter.format(item.cartUnitPrice)}
                    </Typography>
                    <Typography>
                      {" "}
                      {formatter.format(itemTotalPrice)}{" "}
                    </Typography>
                    <IconButton
                      color="primary"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon> </DeleteIcon>
                    </IconButton>{" "}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}

          {/* <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const emptyCart = (
    <Typography>
      Woops! Looks like your cart is empty! head over to the
      <a href="/menu"> Menu</a> and add items to your cart ~
    </Typography>
  );

  return (
    <div className="Cart">
      <Box component="div">
        {/* CART PAGE ALERT */}
        {/* <Alert severity="info">
          {" "}
          <AlertTitle>
            {" "}
            <strong> Alert for Friday 6/24 </strong>
          </AlertTitle>{" "}
          Our phone lines are down for the day and will not be able to process
          credit cards in-person. Please pay in cash or by credit card online.
          Sorry for any inconveniences and thank you!
        </Alert> */}
        <Box textAlign="center" px={8} py={6}>
          <Typography variant="h4" style={{fontSize: "4rem"}} gutterBottom>
            🥡 My Cart
          </Typography>
          <Box mb={5}></Box>
          <Typography gutterBottom>
            {userCartCount > 0 ? filledCart : emptyCart}{" "}
          </Typography>

          <Typography variant="body" gutterBottom>
            <Box mb={5}></Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCheckout}
            >
              <ShoppingCartIcon /> Checkout{" "}
            </Button>
            <Box p={22}> </Box>
            {/* <Button onClick={() => setCart([])}> Confirm & Place Order </Button>
            <Button onClick={() => setCart([1, 2, 3])}>
              {" "}
              Reset Cart to default{" "}
            </Button> */}
          </Typography>
        </Box>
      </Box>
      <CheckoutDialog open={open} onClose={handleClose} total={total} />{" "}
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
      <Snackbar
        open={tuesdayAlert}
        autoHideDuration={4000}
        onClose={tuesdayAlertClose}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        <Alert onClose={tuesdayAlertClose} severity="warning">
          <AlertTitle>
            <strong> CLOSED ON TUESDAYS </strong>
          </AlertTitle>
          We are not open on Tuesdays! Apologies for any inconveniences.
        </Alert>
      </Snackbar>
      <Snackbar
        open={morningAlert}
        autoHideDuration={4000}
        onClose={morningAlertClose}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        <Alert onClose={morningAlertClose} severity="warning">
          <AlertTitle>
            <strong> ONLINE ORDERS CLOSED IN THE MORNING </strong>
          </AlertTitle>
          We are not accepting online orders in the morning (before 11) to avoid
          any inconveniences.
        </Alert>
      </Snackbar>
      <Snackbar
        open={holidayAlert}
        autoHideDuration={10000}
        onClose={holidayAlertClose}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        <Alert onClose={holidayAlertClose} severity="error">
          <AlertTitle>
            <strong>Online Orders Closed </strong>
          </AlertTitle>
          Apologies, we are closed for today!
        </Alert>
      </Snackbar>
    </div>
  );
}

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default Cart;
