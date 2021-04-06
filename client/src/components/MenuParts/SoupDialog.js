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
    color: "#b5b5b5",
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

const SoupDialog = (props) => {
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
  } = props;

  var initialPrice = 1;
  if (price == null) {
    initialPrice = priceSm;
  } else {
    initialPrice = price;
  }
  const [sizeValue, setSizeValue] = useState("pint");
  const [meatValue, setMeatValue] = useState("chicken");
  const [quantity, setQuantity] = useState(1);
  const [finalPrice, setFinalPrice] = useState(initialPrice);

  const [requestContent, setRequestContent] = useState("");
  const { cart, setCart, addNewItem } = useCartContext();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleAddItem = () => {
    onAdd();
    const type = "soup";
    let options = {};
    if (title === "yat gai mei") {
      options = { type, meatValue };
    } else {
      options = { type, sizeValue };
    }
    let cartUnitPrice = finalPrice;

    const newItem = {
      title,
      cartUnitPrice,
      options,
      requestContent,
      quantity,
    };
    addNewItem(newItem);
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSizeValue(size);
    if (size === "quart") {
      setFinalPrice(priceLg);
    } else if (size === "pint") {
      setFinalPrice(priceSm);
    }
  };

  const handleMeatChange = (e) => {
    const meat = e.target.value;
    setMeatValue(meat);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleRequestContentChange = (e) => {
    var text = e.target.value;
    setRequestContent(text);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const meatOptions = (
    <div>
      {" "}
      please choose from the options below:
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}> meat: </Typography>
          <Typography className={classes.selectedValue}>{meatValue}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend"> select one: </FormLabel>
              <RadioGroup
                aria-label="rices"
                name="rices1"
                value={meatValue}
                onChange={handleMeatChange}
              >
                <FormControlLabel
                  value="chicken"
                  control={<Radio />}
                  label="chicken"
                />
                <FormControlLabel
                  value="pork"
                  control={<Radio />}
                  label="pork"
                />{" "}
                <FormControlLabel
                  value="shrimp"
                  control={<Radio />}
                  label="shrimp"
                />{" "}
                <FormControlLabel
                  value="beef"
                  control={<Radio />}
                  label="beef"
                />
              </RadioGroup>
            </FormControl>{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>{" "}
    </div>
  );

  const sizeOptions = (
    <div>
      {" "}
      please choose from the options below:
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>size: </Typography>
          <Typography className={classes.selectedValue}>{sizeValue}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend"> select one: </FormLabel>
              <RadioGroup
                aria-label="rices"
                name="rices1"
                value={sizeValue}
                onChange={handleSizeChange}
              >
                <FormControlLabel
                  value="pint"
                  control={<Radio />}
                  label="pint"
                />
                <FormControlLabel
                  value="quart"
                  control={<Radio />}
                  label="quart"
                />
              </RadioGroup>
            </FormControl>{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>{" "}
    </div>
  );

  let cartPrice = quantity * finalPrice;

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
                {price === null ? (
                  sizeOptions
                ) : (
                  <Typography> no options to choose from 🧐 </Typography>
                )}
                {title === "yat gai mei" ? meatOptions : null}
              </Grid>
              <Grid item xs={12}>
                {" "}
                <Box m={3} className={classes.textFields}>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-textarea"
                    label="any special requests?"
                    placeholder="we will try out best to accomodate your needs"
                    rows={4}
                    rowsMax={8}
                    multiline
                    variant="outlined"
                    inputProps={{ maxLength: 250 }}
                    value={requestContent}
                    onChange={handleRequestContentChange}
                  />{" "}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider className={classes.divider} />
          <DialogContentText className={classes.container}>
            {" "}
            <Typography pl={50}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>about</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> {description} </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>reviews</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> feature work in progress </Typography>
                </AccordionDetails>
              </Accordion>{" "}
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
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SoupDialog;
