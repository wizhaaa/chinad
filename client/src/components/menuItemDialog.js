import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Add as AddIcon, Close as CloseIcon } from "@material-ui/icons";
import {
  CardMedia,
  Grid,
  Box,
  Fab,
  Form,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

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
  img: { width: 150, height: 150 },
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));

const ItemDialog2 = (props) => {
  const {
    onClose,
    open,
    onAlertClose,
    alertOpen,
    onAdd,
    title,
    description,
    img,
    priceSm,
    priceLg,
  } = props;

  console.log(props);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {};

  const handleAddItem = () => {
    onAdd();
  };

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
              <Grid Item xs={6}>
                {" "}
                <img className={classes.img} src={img} alt=" sweet sour" />
              </Grid>
              <Grid Item xs={6}>
                {" "}
                xs 6
              </Grid>
              <Grid Item xs={6}>
                {" "}
                xs 6
              </Grid>
            </Grid>
          </Box>
          <img className={classes.img} src={img} alt=" sweet sour" />{" "}
          <DialogContentText className={classes.container}>
            {" "}
            <Typography pl={50}>
              {description} {priceSm} {priceLg} Lorem ispum{" "}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box pt={2}>
            <Fab
              variant="extended"
              size="medium"
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

export default ItemDialog2;
