import mongoose, { Schema } from "mongoose";
import { getNextSequence } from "./counterModel";

const productSchema = new Schema({
  productId: {
    type: Number,
    unique: false,
  },
  name: {
    type: String,
    required: [false, "Please provide a name"],
  },
  price: {
    type: Number,
    required: [false, "Please provide a price"],
  },
  description: {
    type: String,
    required: [false, "Please provide a description"],
  },
  category: {
    type: String,
    required: [false, "Please provide a category"],
  },
    addressline1: {
    type: String,
    required: [false, "Please provide a addressline1"],
  },
      addressline2: {
    type: String,
    required: [false, "Please provide a addressline2"],
  },
  city: {
    type: String,
    required: [false, "Please provide a city"],
  },
   country: {
    type: String,
    required: [false, "Please provide a country"],
  },
  location: {
    type: String,
    required: [false, "Please provide a location"],
  },
  images: [{
    type: String,
    required: [false, "Please provide an image URL"],
  }],
  reviews: [
    {
      username: { type: String, required: false },
      review: { type: String, required: false },
      rating: { type: Number, required: false },
      reviewDate: { type: Date, default: Date.now },
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
