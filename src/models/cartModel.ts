import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  userid: {
    type: String,
  },
  productId: {
    type: Number,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  image: {
    type: String,
  },
  action: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
