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
  IconButton,
  Fab,
  Box,
} from "@material-ui/core";

import { Add as AddIcon } from "@material-ui/icons";

import ItemDialog from "./ItemDialog";

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
  const classes = useStyles();

  return (
    <Card className={classes.cards}>
      <CardHeader title={itemName}> </CardHeader>{" "}
      <CardMedia className={classes.media} image={img} title="fried rice" />
      <CardContent> {itemDescription}</CardContent>
      <CardActions className={classes.container} disableSpacing>
        <Box className={classes.bottomText}>{price}</Box>{" "}
        <ItemDialog
          title={itemName}
          description={itemDescription}
          imgLink={img}
          price={price}
        />
      </CardActions>
    </Card>
  );
};

export default MenuCard;
