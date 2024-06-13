import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/orderModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const orders = await Order.find();
    const ordersWithTotalPrice = orders.map((order) => {
      const totalPrice = order.products.reduce((acc: any, product: any) => {
        return acc + product.price * product.quantity;
      }, 0);
      return { ...order.toObject(), totalPrice };
    });

    const grandTotal = ordersWithTotalPrice.reduce(
      (acc: number, order: any) => {
        return acc + order.totalPrice;
      },
      0,
    );

    const totalorders = orders.length;

    return NextResponse.json({
      message: "Total orders loaded successfully",
      success: true,
      totalorders,
      grandTotal,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
