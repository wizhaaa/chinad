// import React from "react";
// import { useTheme } from "@material-ui/core/styles";
// import { Add as AddIcon } from "@material-ui/icons";
// import {
//   CardMedia,
//   Grid,
//   Fab,
//   Typography,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   useMediaQuery,
//   makeStyles,
// } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: { margin: 10 },
//   cards: {
//     margin: 5,
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
//     maxWidth: 200,
//   },
// }));

// export default function ResponsiveDialog(props) {
//   const { title, description, priceSm, priceLg, img } = props;
//   const [open, setOpen] = React.useState(false);
//   const theme = useTheme();
//   const classes = useStyles();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Fab
//         variant="extended"
//         size="medium"
//         color="secondary"
//         aria-label="add"
//         onClick={handleClickOpen}
//       >
//         {" "}
//         <AddIcon> </AddIcon>
//         Customize{" "}
//       </Fab>

//       <ItemDialog2
//         open={open}
//         onClose={handleClose}
//         title={title}
//         description={description}
//         priceSm={priceSm}
//         priceLg={priceLg}
//         img={img}
//       />
//       {/*
//       <Dialog
//         fullScreen={fullScreen}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="responsive-dialog-title"
//       >
//         <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
//         <DialogContent dividers>
//           <DialogContentText className={classes.container}>
//             {" "}
//             <img
//               className={classes.img}
//               src="https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg"
//               alt="fried rice "
//             />{" "}
//             <Typography pl={50}>
//               {description} {priceSm} {priceLg} Lorem ispum{" "}
//             </Typography>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions mb={20}>
//           <Button autoFocus onClick={handleClose} color="primary">
//             close
//           </Button>
//           <Fab
//             variant="extended"
//             size="medium"
//             color="secondary"
//             aria-label="add"
//             onClick={handleClose}
//           >
//             {" "}
//             <AddIcon> </AddIcon>
//             Add to Cart{" "}
//           </Fab>
//         </DialogActions>
//       </Dialog> */}
//     </div>
//   );
// }
