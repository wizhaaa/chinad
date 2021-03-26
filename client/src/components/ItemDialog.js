import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText p={200}>
            {props.description} {props.priceSm} {props.priceLg}{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions mb={20}>
          <Button autoFocus onClick={handleClose} color="primary">
            close
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
