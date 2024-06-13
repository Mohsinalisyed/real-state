import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest, res: NextResponse) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "5");

    const skip = (page - 1) * pageSize;

    const orders = await Order.find({ userid: id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(pageSize);

    const totalOrders = await Order.countDocuments({ userid: id });

    return NextResponse.json({
      success: true,
      orders: orders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / pageSize),
      pageSize,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
