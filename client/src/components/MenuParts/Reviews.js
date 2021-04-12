import React, { useState } from "react";
import {
  SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
  SentimentDissatisfied as SentimentDissatisfiedIcon,
  SentimentSatisfied as SentimentSatisfiedIcon,
  SentimentSatisfiedAlt as SentimentSatisfiedAltIcon,
  SentimentVerySatisfied as SentimentVerySatisfiedIcon,
  Favorite as FavoriteIcon,
} from "@material-ui/icons";
import {
  Box,
  Button,
  Typography,
  TextField,
  makeStyles,
  Divider,
  withStyles,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";

import api from "../api";

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
    color: theme.palette.text.secondary,
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
const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const Review = React.memo((props) => {
  const classes = useStyles();
  const { title, reviews, category } = props;
  // for the item review
  // post request to the api/review/add/appetizer/ name of dish
  const addReview = (newReview) => {
    api
      .post(`api/review/add/${category}/${title}`, newReview)
      .catch((err) => console.log(err));
  };
  var itemRating = 0;

  reviews.forEach((review) => {
    itemRating = itemRating + review.rating;
  });

  let itemAverageRating = itemRating / reviews.length;
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    reviewContent: "",
  });

  //pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const [noOfPages] = useState(Math.ceil(reviews.length / rowsPerPage));
  const reviewsDiv = (
    <div>
      {reviews
        .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
        .map((review) => (
          <div>
            {" "}
            <em> "{review.reviewContent}"</em> - {review.name} ({review.rating}
            /5){" "}
          </div>
        ))}{" "}
      <Box component="span">
        <Pagination
          count={noOfPages}
          rowsPerPage={rowsPerPage}
          page={page}
          onChange={handleChangePage}
          defaultPage={1}
          color="primary"
          size="medium"
          showFirstButton
          showLastButton
        />
      </Box>
    </div>
  );

  const handleReviewChange = (e) => {
    var text = e.target.value;
    setNewReview((prev) => {
      return { ...prev, reviewContent: text };
    });
  };
  const handleNameChange = (e) => {
    var text = e.target.value;
    setNewReview((prev) => {
      return { ...prev, name: text };
    });
  };
  const handleRatingChange = (e) => {
    var rating = e.target.value;
    setNewReview((prev) => {
      return { ...prev, rating: rating };
    });
  };

  const handleAddNewReview = (e) => {
    console.log("new review is: ", newReview);
    addReview(newReview);
    e.preventDefault();
    setNewReview({
      name: "",
      reviewContent: "",
      rating: 5,
    });
  };

  return (
    <Typography gutterBottom>
      <div display="flex" justifyContent="space-evenly" alignItems="center">
        <span style={{ paddingBottom: 10, paddingRight: 10 }}>
          <StyledRating
            name="customized-color"
            value={itemAverageRating}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            readOnly
          />{" "}
        </span>
        <Box py={0.75}> </Box>

        {reviews.length === 0 ? <div> no reviews yet 😔 </div> : reviewsDiv}
        <br />
      </div>{" "}
      <Divider className={classes.divider} />
      <form onSubmit={handleAddNewReview}>
        <Box pb={5} className={classes.textFields}>
          <Typography component="legend" gutterBottom>
            Leave a review!
          </Typography>
          <StyledRating
            name="customized-color"
            value={newReview.rating}
            onChange={handleRatingChange}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
          />
          <Box py={1}> </Box>
          <TextField
            style={{ width: "100%" }}
            id="outlined-textarea"
            label="your name"
            placeholder="Sun Tzu"
            rows={1}
            rowsMax={1}
            multiline
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 250 }}
            required
            value={newReview.name}
            onChange={handleNameChange}
          />{" "}
          <TextField
            style={{ width: "100%" }}
            id="outlined-textarea"
            label="review this item!"
            placeholder="Love this dish! Very spicy so beware!"
            rows={2}
            rowsMax={4}
            multiline
            variant="outlined"
            inputProps={{ maxLength: 250 }}
            InputLabelProps={{ shrink: true }}
            required
            value={newReview.reviewContent}
            onChange={handleReviewChange}
          />{" "}
          <Button variant="contained" color="secondary" type="submit">
            {" "}
            Submit{" "}
          </Button>
        </Box>{" "}
      </form>
    </Typography>
  );
});

export default Review;
