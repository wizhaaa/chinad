// import React, { useState } from "react";
// import { useTheme } from "@material-ui/core/styles";
// import {
//   Add as AddIcon,
//   Close as CloseIcon,
//   ExpandMore as ExpandMoreIcon,
// } from "@material-ui/icons";
// import {
//   Grid,
//   Box,
//   Fab,
//   Typography,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   useMediaQuery,
//   makeStyles,
//   Divider,
//   Snackbar,
// } from "@material-ui/core";
// import MuiAlert from "@material-ui/lab/Alert";

// import { useCartContext } from "../CartContext";
// import Review from "../MenuParts/Reviews";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// const useStyles = makeStyles((theme) => ({
//   root: { margin: 10 },
//   gridPadding: {
//     padding: 15,
//   },
//   media: {
//     height: 0,
//     paddingTop: "56.25%",
//   },
//   addIcon: {
//     display: "flex",
//     justifyContent: "flex-end",
//   },
//   bottomText: {
//     justifyContent: "center",
//   },
//   container: {
//     display: "flex",
//     justifyContent: "space-evenly",
//     paddingBottom: theme.spacing(3),
//     flexWrap: "wrap",
//   },
//   img: {
//     maxWidth: 300,
//     maxHeight: 300,
//     height: 230,
//     width: "100%",
//     objectFit: "cover",
//   },

//   dialogWrapper: {
//     padding: theme.spacing(2),
//     position: "absolute",
//   },
//   dialogTitle: {
//     paddingRight: "0px",
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
//   divider: { margin: theme.spacing(3) },
//   selectedValue: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//     color: theme.palette.text.secondary,
//     marginLeft: 10,
//   },
//   formControl: {
//     marginTop: theme.spacing(2),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   textFields: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
// }));

// const SweetAndSour = (props) => {
//   const { reviews } = props;

//   const title = "Sweet & Sour";
//   const description = "Breaded meats!";
//   const img =
//     "https://copykat.com/wp-content/uploads/2016/12/Sweet-and-Sour-Chicken-Pin.jpg";
//   const price = null;
//   const priceSm = 7.55;
//   const priceLg = 10.75;

//   //alert
//   const [alertOpen, setAlertOpen] = React.useState(false);
//   const handleAlertClose = () => {
//     setAlertOpen(false);
//   };
//   const handleAdd = () => {
//     setAlertOpen(true);
//   };

//   const [riceValue, setRiceValue] = useState("White Rice");
//   const [sizeValue, setSizeValue] = useState("Pint");
//   const [addedPrice, setAddedPrice] = useState(0);
//   const [meatPrice, setMeatPrice] = useState(0);
//   const [finalPrice, setFinalPrice] = useState(priceSm);
//   const [requestContent, setRequestContent] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [meatValue, setMeatValue] = useState("Chicken");

//   const [expanded, setExpanded] = useState(false);

//   const { cart, setCart, addNewItem } = useCartContext();
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
//   const classes = useStyles();

//   const handleClose = () => {};

//   const handleAddItem = () => {
//     const type = "S/S";
//     let options = { type, sizeValue, meatValue, riceValue };

//     let cartUnitPrice = cartPrice;

//     const newItem = {
//       title,
//       cartUnitPrice,
//       options,
//       requestContent,
//       quantity,
//     };
//     addNewItem(newItem);
//     handleAdd();
//   };

//   const handleRiceChange = (e) => {
//     var riceChosen = e.target.value;
//     setRiceValue(riceChosen);
//     if (meatValue !== "Combo") {
//       if (riceChosen === "Fried Rice" && sizeValue === "Pint") {
//         setAddedPrice(1);
//       } else if (riceChosen === "Fried Rice" && sizeValue === "Quart") {
//         setAddedPrice(1.5);
//       } else {
//         setAddedPrice(0);
//       }
//     } else if (meatValue === "Combo") {
//       if (riceChosen === "Fried Rice") {
//         setAddedPrice(1.5);
//       } else {
//         setAddedPrice(0);
//       }
//     }
//   };

//   const handleSizeChange = (e) => {
//     const size = e.target.value;
//     setSizeValue(size);
//     if (meatValue !== "Combo") {
//       if (size === "Quart" && riceValue === "Fried Rice") {
//         setFinalPrice(priceLg);
//         setAddedPrice(1.5);
//       } else if (size === "Pint" && riceValue === "Fried Rice") {
//         setFinalPrice(priceSm);
//         setAddedPrice(1);
//       } else if (size === "Pint") {
//         setFinalPrice(priceSm);
//         setAddedPrice(0);
//       } else if (size === "Pint") {
//         setFinalPrice(priceSm);
//         setAddedPrice(0);
//       }
//     }
//   };

//   const handleMeatChange = (e) => {
//     const meat = e.target.value;
//     setMeatValue(meat);
//     if (meat === "Shrimp" && sizeValue === "Pint") {
//       setMeatPrice(0.4);
//     } else if (meat === "Shrimp" && sizeValue === "Quart") {
//       setMeatPrice(0.5);
//     } else if (meat === "Combo") {
//     } else {
//       setMeatPrice(0);
//     }
//   };

//   const handleQuantityChange = (e) => {
//     setQuantity(e.target.value);
//   };

//   const handleTextFieldChange = (e) => {
//     var text = e.target.value;
//     setRequestContent(text);
//   };

//   const formatter = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 2,
//   });

//   let cartPrice = priceSm;

//   if (meatValue === "Combo") {
//     cartPrice = quantity * (11.95 + addedPrice);
//   } else {
//     cartPrice = quantity * (finalPrice + addedPrice + meatPrice);
//   }

//   const meatOptions = (
//     <Accordion>
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1a-content"
//         id="panel1a-header"
//       >
//         <Typography className={classes.heading}> Meat: </Typography>
//         <Typography className={classes.selectedValue}>{meatValue}</Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Typography>
//           <FormControl component="fieldset">
//             <FormLabel component="legend"> Select one: </FormLabel>
//             <RadioGroup
//               aria-label="meat"
//               name="meat"
//               value={meatValue}
//               onChange={handleMeatChange}
//             >
//               <FormControlLabel
//                 value="Chicken"
//                 control={<Radio />}
//                 label="Chicken"
//               />
//               <FormControlLabel value="Pork" control={<Radio />} label="Pork" />{" "}
//               <FormControlLabel
//                 value="Shrimp"
//                 control={<Radio />}
//                 label="Shrimp"
//               />{" "}
//               <FormControlLabel
//                 value="Combo"
//                 control={<Radio />}
//                 label="Combo"
//               />
//             </RadioGroup>
//           </FormControl>{" "}
//         </Typography>
//       </AccordionDetails>
//     </Accordion>
//   );

//   return (
//     <>
//       <DialogTitle id="responsive-dialog-title" className={classes.dialogTitle}>
//         <div style={{ display: "flex" }}>
//           {" "}
//           <Typography variant="h6" style={{ flexGrow: 1 }}>
//             {title}{" "}
//           </Typography>{" "}
//           <IconButton color="primary" onClick={handleClose}>
//             {" "}
//             <CloseIcon />
//           </IconButton>
//         </div>
//       </DialogTitle>
//       <DialogContent dividers>
//         {" "}
//         <Box textAlign="center">
//           {" "}
//           <Grid container>
//             {" "}
//             <Grid Item xs={12} sm={6} className={classes.gridPadding}>
//               {" "}
//               <img className={classes.img} src={img} alt={title} />
//             </Grid>
//             <Grid Item xs={12} sm={6}>
//               Please choose from the options below:
//               <Accordion>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1a-content"
//                   id="panel1a-header"
//                 >
//                   <Typography className={classes.heading}>
//                     Rice: {riceValue}
//                   </Typography>
//                   <Typography className={classes.selectedValue}></Typography>{" "}
//                 </AccordionSummary>

//                 <AccordionDetails>
//                   <FormControl component="fieldset">
//                     <FormLabel component="legend"> Select one: </FormLabel>

//                     <RadioGroup
//                       aria-label="Rices"
//                       name="rices"
//                       value={riceValue}
//                       onChange={handleRiceChange}
//                     >
//                       <FormControlLabel
//                         value="White Rice"
//                         control={<Radio />}
//                         label="White Rice"
//                       />
//                       <FormControlLabel
//                         value="Fried Rice"
//                         control={<Radio />}
//                         label="Fried Rice"
//                       />
//                     </RadioGroup>
//                   </FormControl>{" "}
//                 </AccordionDetails>
//               </Accordion>{" "}
//               <Accordion>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1a-content"
//                   id="panel1a-header"
//                 >
//                   <Typography className={classes.heading}>
//                     Size: {sizeValue}
//                   </Typography>
//                   <Typography className={classes.selectedValue}></Typography>{" "}
//                 </AccordionSummary>

//                 <AccordionDetails>
//                   <FormControl component="fieldset">
//                     <FormLabel component="legend"> Select one: </FormLabel>
//                     <RadioGroup
//                       aria-label="soups"
//                       name="soups"
//                       value={sizeValue}
//                       onChange={handleSizeChange}
//                     >
//                       <FormControlLabel
//                         value="Pint"
//                         control={<Radio />}
//                         label="Pint"
//                       />
//                       <FormControlLabel
//                         value="Quart"
//                         control={<Radio />}
//                         label="Quart"
//                       />
//                     </RadioGroup>
//                   </FormControl>
//                 </AccordionDetails>
//               </Accordion>{" "}
//               {meatOptions}
//             </Grid>
//             <Grid item xs={12}>
//               {" "}
//               <Box m={3} className={classes.textFields}>
//                 <TextField
//                   style={{ width: "100%" }}
//                   id="outlined-textarea"
//                   label="any special requests?"
//                   placeholder="we will try out best to accomodate your needs"
//                   rows={4}
//                   rowsMax={8}
//                   multiline
//                   variant="outlined"
//                   inputProps={{ maxLength: 250 }}
//                   value={requestContent}
//                   onChange={handleTextFieldChange}
//                 />{" "}
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//         <Divider className={classes.divider} />
//         <DialogContentText className={classes.container}>
//           {" "}
//           <Typography pl={50}>
//             <Typography variant="h5" gutterBottom>
//               About
//             </Typography>

//             <Typography gutterBottom> {description} </Typography>
//             <Divider className={classes.divider} />

//             <Typography variant="h5" gutterBottom>
//               Reviews
//             </Typography>

//             <Typography></Typography>
//             {/* <Review title={title} reviews={reviews} category="dinner" /> */}
//           </Typography>
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions className="dialogContainer, absolute">
//         {" "}
//         <Box textAlign="center" className="dialogPrice">
//           <Typography variant="h4"> {formatter.format(cartPrice)} </Typography>
//         </Box>
//         <Box textAlign="center">
//           <FormControl variant="outlined" className={classes.formControl}>
//             <InputLabel id="demo-simple-select-outlined-label">
//               {" "}
//               qty{" "}
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-outlined-label"
//               id="demo-simple-select-outlined"
//               value={quantity}
//               onChange={handleQuantityChange}
//               label="qty"
//             >
//               {[...Array(20)].map((_id, i) => (
//                 <MenuItem value={i + 1}> {i + 1}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//         <Box textAlign="center" className="dialogButton">
//           <Fab
//             variant="extended"
//             size="large"
//             color="secondary"
//             aria-label="add"
//             onClick={handleAddItem}
//           >
//             {" "}
//             <AddIcon />
//             Add to Cart{" "}
//           </Fab>
//         </Box>
//         <Snackbar
//           open={alertOpen}
//           autoHideDuration={4000}
//           onClose={handleAlertClose}
//         >
//           <Alert onClose={handleAlertClose} severity="success">
//             {" "}
//             added to cart ! ~{" "}
//           </Alert>
//         </Snackbar>
//       </DialogActions>
//     </>
//   );
// };

// export default SweetAndSour;
