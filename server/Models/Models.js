import mongoose from "mongoose";

let orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  pickUpOption: String,
  pickUpTime: String,
  cart: Array,
  orderReqs: String,
  total: Number,
  timePlaced: String,
  estimatedTime: String,
});
export const Order = mongoose.model("Order", orderSchema);

let customerOrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  pickUpOption: String,
  pickUpTime: String,
  cart: Array,
  orderReqs: String,
  total: Number,
  timePlaced: String,
  estimatedTime: String,
  paymentMethod: String,
  deviceType: String,
  orderNumber: Number,
  day: String,
  month: String,
  year: String,
  hour: String,
});

export const customerOrders = mongoose.model(
  "customerOrders",
  customerOrderSchema
);

let utilSchema = new mongoose.Schema({
  name: String,
  online: Boolean,
  utilData: Object,
});
export const Util = mongoose.model("utils", utilSchema);
