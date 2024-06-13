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
    addressline1: {
    type: String,
    required: [true, "Please provide a addressline1"],
  },
   addressline2: {
    type: String,
    required: [true, "Please provide a addressline2"],
  },
  city: {
    type: String,
    required: [true, "Please provide a city"],
  },
   country: {
    type: String,
    required: [true, "Please provide a country"],
  },
  location: {
    type: String,
    required: [true, "Please provide a location"],
  },
    size: {
    type: String,
    required: [true, "Please provide a size"],
  },
  images: [{
    type: String,
    required: [true, "Please provide an image URL"],
  }],
  reviews: [
    {
      username: { type: String, required: true },
      review: { type: String, required: true },
      rating: { type: Number, required: true },
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
