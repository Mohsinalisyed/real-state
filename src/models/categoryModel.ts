// homeModel.ts

import mongoose, { Document, Schema } from "mongoose";
import { getNextSequence } from "./counterModel";

export interface CategoryDocument extends Document {
  categoryId: number;
  name: string;
  active: boolean;
  date: Date;
}

const CategorySchema = new Schema<CategoryDocument>({
  categoryId: {
    type: Number,
    unique: true,
  },
  name: { type: String, required: true },
  active: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now,
  },
});
CategorySchema.pre("save", async function (next) {
  try {
    const doc = this;
    if (!doc.categoryId) {
      doc.categoryId = await getNextSequence("categoryId");
    }
    next();
  } catch (error: any) {
    next(error);
  }
});
const Category =
  mongoose.models.Category ||
  mongoose.model<CategoryDocument>("Category", CategorySchema);

export default Category;
