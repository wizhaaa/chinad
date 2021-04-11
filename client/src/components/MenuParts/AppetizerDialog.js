import { React, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Add as AddIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import {
  Grid,
  Box,
  Fab,
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
} from "@material-ui/core";

import Review from "./Reviews";

import { useCartContext } from "../CartContext";

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
}));

const AppetizerDialog = (props) => {
  const {
    onClose,
    open,
    onAdd,
    title,
    description,
    img,
    price,
    priceSm,
    priceLg,
    reviews,
  } = props;

  const [styleValue, setStyleValue] = useState("Fried");
  const [fillingValue, setFillingValue] = useState("Pork");
  const [quantity, setQuantity] = useState(1);
  const [addedPrice, setAddedPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(price);
  let cartUnitPrice = finalPrice + addedPrice;
  // customer request
  const [requestContent, setRequestContent] = useState("");

  // context cart
  const { cart, setCart, addNewItem } = useCartContext();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleAddItem = () => {
    onAdd();
    const type = "Appetizer";
    let options = {};
    if (title === "Dumplings") {
      options = { type, styleValue, fillingValue };
    } else {
      options = { type };
    }

    const newItem = {
      title,
      cartUnitPrice,
      options,
      requestContent,
      quantity,
    };
    addNewItem(newItem);
  };

  //handling price changes
  const handleStyleChange = (e) => {
    var styleChosen = e.target.value;
    setStyleValue(styleChosen);
  };

  const handleFillingChange = (e) => {
    const fillingChosen = e.target.value;
    setFillingValue(fillingChosen);
    if (fillingChosen === "Chicken") {
      setFinalPrice(price + 1.25);
    } else {
      setFinalPrice(price);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleTextFieldChange = (e) => {
    var text = e.target.value;
    setRequestContent(text);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  let cartPrice = quantity * (finalPrice + addedPrice);

  const dumplingOptions = (
    <div>
      Please choose from the options below:
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Style: </Typography>
          <Typography className={classes.selectedValue}>
            {styleValue}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend"> Select one: </FormLabel>
              <RadioGroup
                aria-label="style"
                name="style"
                value={styleValue}
                onChange={handleStyleChange}
              >
                <FormControlLabel
                  value="Fried"
                  control={<Radio />}
                  label="Fried"
                />
                <FormControlLabel
                  value="Steamed"
                  control={<Radio />}
                  label="Steamed"
                />
              </RadioGroup>
            </FormControl>{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Filling:</Typography>
          <Typography className={classes.selectedValue}>
            {fillingValue}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend"> Select one: </FormLabel>
              <RadioGroup
                aria-label="filling"
                name="filling"
                value={fillingValue}
                onChange={handleFillingChange}
              >
                <FormControlLabel
                  value="Pork"
                  control={<Radio />}
                  label="Pork"
                />
                <FormControlLabel
                  value="Vegetable"
                  control={<Radio />}
                  label="Vegetable"
                />
                <FormControlLabel
                  value="Chicken"
                  control={<Radio />}
                  label="Chicken (+1.25)"
                />
              </RadioGroup>
            </FormControl>
          </Typography>
        </AccordionDetails>
      </Accordion>{" "}
    </div>
  );

  const eggRollOptions = (
    <div>
      please choose from the options below:
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}> type:</Typography>
          <Typography className={classes.selectedValue}>
            {fillingValue}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend"> select one: </FormLabel>
              <RadioGroup
                aria-label="filling"
                name="filling"
                value={fillingValue}
                onChange={handleFillingChange}
              >
                <FormControlLabel
                  value="pork"
                  control={<Radio />}
                  label="pork"
                />
                <FormControlLabel
                  value="vegetable"
                  control={<Radio />}
                  label="vegetable"
                />
                <FormControlLabel
                  value="shrimp"
                  control={<Radio />}
                  label="shrimp (+.10) "
                />
              </RadioGroup>
            </FormControl>
          </Typography>
        </AccordionDetails>
      </Accordion>{" "}
    </div>
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
        <DialogTitle
          id="responsive-dialog-title"
          className={classes.dialogTitle}
        >
          <div style={{ display: "flex" }}>
            {" "}
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {title}{" "}
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
              {" "}
              <Grid Item xs={12} sm={6} className={classes.gridPadding}>
                {" "}
                <img className={classes.img} src={img} alt={title} />
              </Grid>
              <Grid Item xs={12} sm={6}>
                {" "}
                {title === "Dumplings" ? (
                  dumplingOptions
                ) : (
                  <Typography> no options to choose from 🔎 </Typography>
                )}{" "}
              </Grid>
              <Grid item xs={12}>
                {" "}
                <Box m={3} className={classes.textFields}>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-textarea"
                    label="any special requests?"
                    placeholder="we will try our best to accomodate your needs"
                    rows={4}
                    rowsMax={8}
                    multiline
                    variant="outlined"
                    inputProps={{ maxLength: 250 }}
                    value={requestContent}
                    onChange={handleTextFieldChange}
                  />{" "}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider className={classes.divider} />
          <DialogContentText className={classes.container}>
            {" "}
            <Typography pl={50}>
              <Typography variant="h5" gutterBottom>
                About
              </Typography>

              <Typography gutterBottom> {description} </Typography>
              <Divider className={classes.divider} />

              <Typography variant="h5" gutterBottom>
                Reviews
              </Typography>

              <Typography></Typography>
              <Review title={title} reviews={reviews} category="appetizer" />
            </Typography>
          </DialogContentText>
        </DialogContent>

        <DialogActions className="dialogContainer">
          {" "}
          <Box textAlign="center" className="dialogPrice">
            <Typography variant="h5">
              {" "}
              {formatter.format(cartPrice)}{" "}
            </Typography>
          </Box>
          <Box textAlign="center">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                {" "}
                qty{" "}
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={quantity}
                onChange={handleQuantityChange}
                label="qty"
              >
                {[...Array(20)].map((_id, i) => (
                  <MenuItem value={i + 1}> {i + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box textAlign="center" className="dialogButton">
            <Fab
              variant="extended"
              size="large"
              color="secondary"
              aria-label="add"
              onClick={handleAddItem}
            >
              {" "}
              <AddIcon />
              Add to Cart{" "}
            </Fab>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

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

export default AppetizerDialog;
