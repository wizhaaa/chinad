import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
const app = express();

const PORT = process.env.PORT;
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

//const db = mongoose.connection;

// Event listeners
//db.once('open', () => console.log('Connected to %{DB} database'));

// Create Schema
let ItemSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
  },
  { collection: "items" }
);

// Create Model
let Item = mongoose.model("Item", ItemSchema);
const item = new Item({ name: "Lo Mein", price: 9.75 });

app.get("/api/people", (req, res) => {
  itemModel.find({}, { __v: 0 }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).json({ error: err });
    }
  });
});

// Route to add Item

app.post("/", (req, res) => {
  res.send("hello bitch!");
  //res.json("hello loser!");
});

app.listen(PORT, () => {
  console.log(app.get("env").toUpperCase() + "Server started on port" + PORT);
});
