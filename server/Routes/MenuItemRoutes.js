import express from "express";
const router = express.Router();

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

// to read our appetizer collection to loop thru on front end
router.get("/api/lunches", async (req, res) => {
  await Lunch.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/dinners", async (req, res) => {
  await Dinner.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/soups", async (req, res) => {
  await Soup.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/appetizers", async (req, res) => {
  await Appetizer.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/ss", async (req, res) => {
  await Sweetandsour.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/efy", async (req, res) => {
  await Eggfooyoung.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/friedrice", async (req, res) => {
  await Friedrice.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/lomein", async (req, res) => {
  await Lomein.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/meifun", async (req, res) => {
  await Meifun.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/chowmein", async (req, res) => {
  await Chowmein.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/poultry", async (req, res) => {
  await Poultry.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/pork", async (req, res) => {
  await Pork.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/seafood", async (req, res) => {
  await Seafood.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/beef", async (req, res) => {
  await Beef.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/mushu", async (req, res) => {
  await Mushu.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/vegetable", async (req, res) => {
  await Vegetable.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/udon", async (req, res) => {
  await Udon.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/chefspecial", async (req, res) => {
  await Chefspecial.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/diet", async (req, res) => {
  await Diet.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

router.get("/api/sides", async (req, res) => {
  await Side.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  }).sort({"name":1});
});

export default router;
