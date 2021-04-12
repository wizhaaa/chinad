import mongoose from "mongoose";

// menu item schemas & models
let lunchSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
  rating: Number,
});
const Lunch = mongoose.model("Lunch", lunchSchema);

let dinnerSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
  rating: Number,
});
const Dinner = mongoose.model("Dinner", dinnerSchema);

let soupSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
  rating: Number,
});
const Soup = mongoose.model("Soup", soupSchema);

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

let sweetandsourSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Sweetandsour = mongoose.model("Sweetandsour", sweetandsourSchema);

let eggfooyoungSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Eggfooyoung = mongoose.model("Eggfooyoung", eggfooyoungSchema);

let friedriceSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Friedrice = mongoose.model("Friedrice", friedriceSchema);

let lomeinSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Lomein = mongoose.model("Lomein", lomeinSchema);

let meifunSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Meifun = mongoose.model("Meifun", meifunSchema);

let chowmeinSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Chowmein = mongoose.model("Chowmein", chowmeinSchema);

let poultrySchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Poultry = mongoose.model("Poultry", poultrySchema);

let porkSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Pork = mongoose.model("Pork", porkSchema);

let seafoodSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Seafood = mongoose.model("Seafood", seafoodSchema);

let beefSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Beef = mongoose.model("Beef", beefSchema);

let mushuSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Mushu = mongoose.model("Mushu", mushuSchema);

let udonSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Udon = mongoose.model("Udon", udonSchema);

let vegetableSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Vegetable = mongoose.model("Vegetable", vegetableSchema);

let chefspecialSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Chefspecial = mongoose.model("Chefspecial", chefspecialSchema);

let dietSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
  reviews: Object,
});
const Diet = mongoose.model("Diet", dietSchema);

let sideSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  priceSm: String,
  priceLg: String,
});
const Side = mongoose.model("Side", sideSchema);

let item = new Udon({
  name: "Sweet & Sour Chicken",
  description: "Breaded meats!",
  img: "img",
  price: null,
  priceSm: 7.55,
  priceLg: 10.75,
  reviews: [],
});

// item.save();

export {
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
};
