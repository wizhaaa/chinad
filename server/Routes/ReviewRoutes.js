import express from "express";
const reviews = express.Router();

import {
  Lunch,
  Dinner,
  Soup,
  Appetizer,
  Sweetandsour,
  Eggfooyoung,
  Friedrice,
  Lomein,
  Meifun,
  Chowmein,
  Poultry,
  Pork,
  Seafood,
  Beef,
  Mushu,
  Vegetable,
  Udon,
  Chefspecial,
  Diet,
  Side,
} from "../Models/FoodModels.js";

reviews.post("/api/review/add/dinner/:name", (req, res) => {
  console.log(` adding review to dinner: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Dinner.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/lunch/:name", (req, res) => {
  console.log(` adding review to lunch: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Lunch.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/soup/:name", (req, res) => {
  console.log(` adding review to soup: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Soup.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/appetizer/:name", (req, res) => {
  console.log(" adding review to apps ");
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Appetizer.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/ss/:name", (req, res) => {
  console.log(` adding review to ss: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Sweetandsour.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/efy/:name", (req, res) => {
  console.log(` adding review to efy: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Eggfooyoung.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/friedrice/:name", (req, res) => {
  console.log(` adding review to friedrice: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Friedrice.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/lomein/:name", (req, res) => {
  console.log(` adding review to lomein: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Lomein.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/meifun/:name", (req, res) => {
  console.log(` adding review to meifun: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Meifun.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/chowmein/:name", (req, res) => {
  console.log(` adding review to chowmein: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Chowmein.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/poultry/:name", (req, res) => {
  console.log(` adding review to poultry: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Poultry.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/pork/:name", (req, res) => {
  console.log(` adding review to pork: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Pork.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/seafood/:name", (req, res) => {
  console.log(` adding review to seafood: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Seafood.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/beef/:name", (req, res) => {
  console.log(` adding review to beef: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Beef.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/mushu/:name", (req, res) => {
  console.log(` adding review to mushu: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Mushu.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/vegetable/:name", (req, res) => {
  console.log(` adding review to vegetable: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Vegetable.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/udon/:name", (req, res) => {
  console.log(` adding review to udon: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Udon.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/chef/:name", (req, res) => {
  console.log(` adding review to chef: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Chefspecial.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

reviews.post("/api/review/add/diet/:name", (req, res) => {
  console.log(` adding review to diet: ${req.params.name}`);
  const name = req.body.name;
  const rating = req.body.rating;
  const reviewContent = req.body.reviewContent;
  let review = {
    name: name,
    rating: rating,
    reviewContent: reviewContent,
  };
  console.log(review);

  Diet.updateOne(
    { name: req.params.name },
    { $push: { reviews: review } },
    (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
});

export default reviews;
