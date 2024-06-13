import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const products = await Product.find();
    const totalProducts = products.length;
    return NextResponse.json({
      message: "Total products loaded successfully",
      success: true,
      totalProducts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
