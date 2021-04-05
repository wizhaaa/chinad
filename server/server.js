import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
const app = express();

import MongoClient from "mongodb";

const PORT = process.env.SERVER_PORT;
const DB_URI = process.env.SECRET_DB_URI;
//const DB = "reactDB;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Establihs DB connection
mongoose.connect(DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  connectTimeoutMS: 1000,
});

const connection = mongoose.connect(DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  connectTimeoutMS: 1000,
});

const liveDB = mongoose.connection;

// Event listeners
liveDB.once("open", () =>
  console.log(
    ` ---- *** ..... loading ..... connected to database ! ..... 200 success .... *** ----`
  )
);

let appetizerSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
  rating: Number,
});
const Appetizer = mongoose.model("Appetizer", appetizerSchema);

const appetizer = new Appetizer({
  name: "Pork Egg Roll",
  description:
    "deep-fried savory roll with shredded cabbage, chopped meats, and other fillings inside a thickly-wrapped wheat flour skin.",
  img:
    "https://www.dinneratthezoo.com/wp-content/uploads/2018/01/homemade-egg-rolls-4.jpg",
  price: 1.45,
  priceSm: "",
  priceLg: "",
  reviews: [""],
  rating: 5,
});

let orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  pickUpOption: String,
  pickUpTime: String,
  cart: Array,
  orderReqs: String,
});
const Order = mongoose.model("Order", orderSchema);

const all = await Appetizer.find();
// console.log("... beep : ", all);

// // Create Model
// let Item = mongoose.model("Item", ItemSchema);
// const item = new Item({ name: "Lo Mein", price: 9.75 });

// app.get("/api/people", (req, res) => {
//   itemModel.find({}, { __v: 0 }, (err, docs) => {
//     if (!err) {
//       res.json(docs);
//     } else {
//       res.status(400).json({ error: err });
//     }
//   });
// });

// Route to add Item

app.post("/", (req, res) => {
  // res.send("hello bitch!");
  res.json("hello loser!");
});

app.get("/", (req, res) => {
  // res.send(" getting hello bitch!");
  res.json({ body: "hello", id: "fuck" });
});

//read all our order documents
app.get("/api/orders", (req, res) => {
  Order.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

// to add an order
app.post("/api/order/add", async (req, res) => {
  console.log(req.body);
  let order = new Order({ ...req.body });
  console.log("order is ", order);
  await order.save((err, result) => {
    if (!err) {
      delete result._doc.__v;
      res.json(result._doc);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

app.get("/appetizers", (req, res) => {
  res.send(all);
});

app.get("/:name", (req, res) => {
  MongoClient.connect(DB_URI, function (err, db) {
    if (err) throw err;
    var dbo = db.db("testChina");
    dbo.collection("testApps").findOne(
      {
        name: req.params.name,
      },
      function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(
    app.get("env").toUpperCase() + " Server started on port: ... " + PORT
  );
});
