import React from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardHeader,
  makeStyles,
  useTheme,
  IconButton,
  Fab,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import { Add as AddIcon } from "@material-ui/icons";

import ItemDialog2 from "./menuItemDialog";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: { margin: 10 },
  cards: {
    margin: 5,
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
  },
}));

const MenuCard = (props) => {
  const { itemName, itemDescription, img, price, priceSm, priceLg } = props;
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setAlertOpen(true);
    setOpen(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Card className={classes.cards}>
      <CardHeader title={itemName}> </CardHeader>{" "}
      <CardMedia className={classes.media} image={img} title="fried rice" />
      <CardContent> {itemDescription}</CardContent>
      <CardActions className={classes.container} disableSpacing>
        <Box className={classes.bottomText}>{price}</Box>{" "}
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="add"
          onClick={handleClickOpen}
        >
          {" "}
          <AddIcon> </AddIcon>
          Customize{" "}
        </Fab>
        <ItemDialog2
          open={open}
          alertOpen={alertOpen}
          // setAlertOpen={setAlertOpen}
          onClose={handleClose}
          onAdd={handleAdd}
          onAlertClose={handleAlertClose}
          title={itemName}
          description={itemDescription}
          priceSm={priceSm}
          priceLg={priceLg}
          img={img}
        />
        <Snackbar
          open={alertOpen}
          autoHideDuration={2000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="success">
            {" "}
            Item added!{" "}
          </Alert>
        </Snackbar>
      </CardActions>
    </Card>
  );
};

export default MenuCard;
