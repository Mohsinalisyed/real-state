import mongoose, { Schema } from "mongoose";
import { getNextSequence } from "./counterModel";

const productSchema = new Schema({
  productId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide a quantity"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  reviews: [
    {
      username: { type: String, required: false },
      review: { type: String, required: false },
      rating: { type: Number, required: false },
      reviewDate: { type: Date, default: Date.now },
    },
  ],
  sizeAttribute: [
    {
      name: { type: String, required: false },
      value: { type: String, required: false },
    },
  ],
  colorAttribute: [
    {
      name: { type: String, required: false },
      value: {
        type: String,
        required: false,
      },
      image: {
        type: String,
        required: false,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", async function (next) {
  try {
    const doc = this;
    if (!doc.productId) {
      doc.productId = await getNextSequence("productId");
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
