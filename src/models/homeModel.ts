// homeModel.ts

import mongoose, { Document, Schema } from "mongoose";
import { getNextSequence } from "./counterModel";

export interface SliderDocument extends Document {
  sliderId: number;
  imageUrl: string;
  caption: string;
  active: boolean;
  date: Date;
}

const SliderSchema = new Schema<SliderDocument>({
  sliderId: {
    type: Number,
    unique: true,
  },
  imageUrl: { type: String, required: true },
  caption: { type: String },
  active: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now,
  },
});
SliderSchema.pre("save", async function (next) {
  try {
    const doc = this;
    if (!doc.sliderId) {
      doc.sliderId = await getNextSequence("sliderId");
    }
    next();
  } catch (error: any) {
    next(error);
  }
});
const Slider =
  mongoose.models.Slider ||
  mongoose.model<SliderDocument>("Slider", SliderSchema);

export default Slider;
