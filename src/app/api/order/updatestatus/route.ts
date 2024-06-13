import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(request: NextRequest, res: NextResponse) {
  try {
    const reqBody = await request.json();
    const { userid, orderId, status } = reqBody;

    const existingItem = await Order.findOne({
      userid: userid,
      orderId: orderId,
    });

    if (existingItem) {
      existingItem.status = status;

      await existingItem.save();

      const updatedOrder = await Order.findOneAndUpdate(
        { orderId },
        { status },
        { new: true },
      );

      return NextResponse.json({
        message: "Status updated successfully",
        success: true,
        order: updatedOrder,
      });
    } else {
      return NextResponse.json(
        { error: "Order not found", success: false },
        { status: 404 },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
