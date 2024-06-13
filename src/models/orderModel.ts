// models/orderModel.ts

import mongoose, { Schema, model, Document } from "mongoose";
import { getNextSequence } from "./counterModel";
import { OrderStatus } from "@/app/utils/enums/order";

interface Product {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDocument extends Document {
  orderId: number;
  userid: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  contact_number?: string;
  whatsapp_number?: string;
  profile_image?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  paid: boolean;
  status?: string;
  products: Product[];
  date: Date;
}

const orderSchema = new Schema<OrderDocument>({
  orderId: {
    type: Number,
    unique: true,
  },
  userid: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  address: { type: String, required: true },
  contact_number: { type: String, required: true },
  whatsapp_number: { type: String, required: true },
  paid: { type: Boolean, required: true },
  status: { type: String, required: false, default: OrderStatus.PENDING },
  isVerified: { type: String },
  products: [
    {
      productId: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
orderSchema.pre("save", async function (next) {
  try {
    const doc = this;
    if (!doc.orderId) {
      doc.orderId = await getNextSequence("orderId");
    }
    next();
  } catch (error: any) {
    next(error);
  }
});
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
