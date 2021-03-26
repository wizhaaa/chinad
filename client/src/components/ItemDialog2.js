import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Add as AddIcon } from "@material-ui/icons";
import {
  CardMedia,
  Grid,
  Fab,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";

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
    flexWrap: "wrap",
  },
  img: {
    maxWidth: 200,
    height: 500,
  },
}));

const ItemDialog2 = (props) => {
  const {
    onClose,
    open,
    title,
    description,
    imgLink,
    priceSm,
    priceLg,
  } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText className={classes.container}>
            {" "}
            <CardMedia className={classes.img} image={imgLink} title="ss" />
            <img className={classes.img} src={imgLink} alt=" sweet sour" />{" "}
            <Typography pl={50}>
              {description} {priceSm} {priceLg} Lorem ispum{" "}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions mb={20}>
          <Button autoFocus onClick={handleClose} color="primary">
            close
          </Button>
          <Fab
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="add"
            onClick={handleClose}
          >
            {" "}
            <AddIcon />
            Add to Cart{" "}
          </Fab>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemDialog2;
