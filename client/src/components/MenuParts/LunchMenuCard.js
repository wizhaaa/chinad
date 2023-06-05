import React from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  makeStyles,
  useTheme,
  Fab,
  Box,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import {Add as AddIcon} from "@material-ui/icons";

import LunchDialog from "./LunchDialog";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {margin: 10},
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

const LunchMenuCard = (props) => {
  const {itemName, itemDescription, img, price, priceSm, priceLg, reviews} =
    props;
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
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
      <CardMedia className={classes.media} image={img} title={itemName} />
      <CardContent> </CardContent>
      <CardActions className={classes.container} disableSpacing>
        <Box className={classes.bottomText}>
          {" "}
          <Typography>
            {" "}
            from {price === null ? `$ ${priceSm} / $ ${priceLg}` : price}
          </Typography>
        </Box>{" "}
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
        {open && (
          <LunchDialog
            open={open}
            onClose={handleClose}
            onAdd={handleAdd}
            onAlertClose={handleAlertClose}
            title={itemName}
            description={itemDescription}
            price={price}
            priceSm={priceSm}
            priceLg={priceLg}
            img={img}
            reviews={reviews}
          />
        )}
        <Snackbar
          open={alertOpen}
          autoHideDuration={4000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="success">
            {" "}
            added to cart ! ~{" "}
          </Alert>
        </Snackbar>
      </CardActions>
    </Card>
  );
};

export default LunchMenuCard;
