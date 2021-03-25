import React from "react";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardHeader,
  makeStyles,
  IconButton,
  Fab,
  Box,
} from "@material-ui/core";

import { Add as AddIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: { margin: 10 },
  cards: {
    margin: 5,
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
  const classes = useStyles();

  return (
    <Card className={classes.cards}>
      <CardHeader title={props.menuItemName}> </CardHeader>{" "}
      <CardContent> {props.menuItemDescription}</CardContent>
      <CardActions className={classes.container} disableSpacing>
        <Box className={classes.bottomText}>
          {" "}
          $ {props.priceSmall} / $ {props.priceLarge}
        </Box>{" "}
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="add"
        >
          {" "}
          <AddIcon> </AddIcon>
          Customize{" "}
        </Fab>
      </CardActions>
    </Card>
  );
};

export default MenuCard;
