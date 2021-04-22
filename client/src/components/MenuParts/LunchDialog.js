import React, { useState } from "react";
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
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";

import { useCartContext } from "../CartContext";
import Reviews from "./Reviews";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const LunchDialog = React.memo((props) => {
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

  const [riceValue, setRiceValue] = useState("White Rice");
  const [sideValue, setSideValue] = useState("No Side");
  const [quantity, setQuantity] = useState(1);
  const [addedPrice, setAddedPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(price);
  let cartUnitPrice = finalPrice + addedPrice;
  const [meatValue, setMeatValue] = useState("Chicken");
  // customer request
  const [requestContent, setRequestContent] = useState("");


  // handling alerts 
  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // context cart
  const { cart, setCart, addNewItem } = useCartContext();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleAddItem = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 16 && currentTime > 7) {
      onAdd();
      const type = "Lunch";
      let options = {};
      if (
        title === "Egg Foo Young" ||
        title === "Lo Mein" ||
        title === "Fried Rice" ||
        title === "Chow Mein"
      ) {
        options = { type, meatValue, riceValue, sideValue };
      } else {
        options = { type, riceValue, sideValue };
      }

      const newItem = {
        title,
        cartUnitPrice,
        options,
        requestContent,
        quantity,
      };
      addNewItem(newItem);
    } else {
      setAlertOpen(true);
    }
  };

  //handling price changes
  const handleRiceChange = (e) => {
    var riceChosen = e.target.value;
    setRiceValue(riceChosen);
    if (riceChosen === "Lo Mein" || riceChosen === "Pork Fried Rice") {
      setAddedPrice(1.5);
    } else {
      setAddedPrice(0);
    }
  };

  const handleSideChange = (e) => {
    const sideChosen = e.target.value;
    setSideValue(sideChosen);
    if (!(sideChosen === "No Side")) {
      setFinalPrice(price + 0.75);
    } else {
      setFinalPrice(price);
    }
  };

  const handleMeatChange = (e) => {
    const meat = e.target.value;
    setMeatValue(meat);
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

  const EFYMeatOptions = (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}> Meat: </Typography>
        <Typography className={classes.selectedValue}>{meatValue}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend"> Select one: </FormLabel>
            <RadioGroup
              aria-label="meats"
              name="meats"
              value={meatValue}
              onChange={handleMeatChange}
            >
              <FormControlLabel
                value="Chicken"
                control={<Radio />}
                label="Chicken"
              />
              <FormControlLabel value="Pork" control={<Radio />} label="Pork" />{" "}
              <FormControlLabel
                value="Shrimp"
                control={<Radio />}
                label="Shrimp"
              />{" "}
              <FormControlLabel value="Beef" control={<Radio />} label="Beef" />
            </RadioGroup>
          </FormControl>{" "}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
  const meatOptions = (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}> Meat: </Typography>
        <Typography className={classes.selectedValue}>{meatValue}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend"> Select one: </FormLabel>
            <RadioGroup
              aria-label="meats"
              name="meats"
              value={meatValue}
              onChange={handleMeatChange}
            >
              <FormControlLabel
                value="Chicken"
                control={<Radio />}
                label="Chicken"
              />
              <FormControlLabel value="Pork" control={<Radio />} label="Pork" />{" "}
              <FormControlLabel
                value="Shrimp"
                control={<Radio />}
                label="Shrimp"
              />{" "}
              <FormControlLabel value="Beef" control={<Radio />} label="Beef" />
              <FormControlLabel
                value="Combo"
                control={<Radio />}
                label="Combo"
              />
            </RadioGroup>
          </FormControl>{" "}
        </Typography>
      </AccordionDetails>
    </Accordion>
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
                <img className={classes.img} src={img} alt=" sweet sour" />
              </Grid>
              <Grid Item xs={12} sm={6}>
                Please choose from the options below:
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}> Rice: </Typography>
                    <Typography className={classes.selectedValue}>
                      {riceValue}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography>
                      <FormControl component="fieldset">
                        <FormLabel component="legend"> Select one: </FormLabel>
                        <RadioGroup
                          aria-label="rices"
                          name="rices"
                          value={riceValue}
                          onChange={handleRiceChange}
                        >
                          <FormControlLabel
                            value="White Rice"
                            control={<Radio />}
                            label="White Rice"
                          />
                          <FormControlLabel
                            value="Fried Rice"
                            control={<Radio />}
                            label="Fried Rice"
                          />
                          <FormControlLabel
                            value="Lo Mein"
                            control={<Radio />}
                            label="Lo Mein (+1.5)"
                          />
                          <FormControlLabel
                            value="Pork Fried Rice"
                            control={<Radio />}
                            label="Pork Fried Rice (+1.5)"
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
                    <Typography className={classes.heading}>
                      Sides (+.75):
                    </Typography>
                    <Typography className={classes.selectedValue}>
                      {sideValue}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography>
                      <FormControl component="fieldset">
                        <FormLabel component="legend"> Select one: </FormLabel>
                        <RadioGroup
                          aria-label="sides"
                          name="sides"
                          value={sideValue}
                          onChange={handleSideChange}
                        >
                          <FormControlLabel
                            value="No Side"
                            control={<Radio />}
                            label="No Side"
                          />
                          <FormControlLabel
                            value="Egg Roll"
                            control={<Radio />}
                            label="Egg Roll"
                          />
                          <FormControlLabel
                            value="Soda"
                            control={<Radio />}
                            label="Soda"
                          />
                          <FormControlLabel
                            value="Wonton Soup"
                            control={<Radio />}
                            label="Wonton Soup"
                          />
                          <FormControlLabel
                            value="Egg Drop Soup"
                            control={<Radio />}
                            label="Egg Drop Soup"
                          />
                          <FormControlLabel
                            value="Hot & Sour Soup"
                            control={<Radio />}
                            label="Hot & Sour Soup"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                {title === "Egg Foo Young" ? EFYMeatOptions : null}
                {title === "Fried Rice" ||
                title === "Lo Mein" ||
                title === "Chow Mein"
                  ? meatOptions
                  : null}
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
              <Reviews title={title} reviews={reviews} category="dinner" />
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialogContainer">
          {" "}
          <Box textAlign="center" className="dialogPrice">
            <Typography variant="h4">
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
        </DialogActions>{" "}
        <Snackbar
          open={alertOpen}
          autoHideDuration={4000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="error">
            {" "}
            <AlertTitle>Error</AlertTitle> It's not lunch time right now!{" "}
          </Alert>
        </Snackbar>
      </Dialog>
    </>
  );
});

export default LunchDialog;
