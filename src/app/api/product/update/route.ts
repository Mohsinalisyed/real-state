// update/route.ts

import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function PUT(request: NextRequest) {
  try {
    if (!request || typeof request !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 },
      );
    }
    const { productId, updatedData } = await request.json();

    if (!productId || typeof updatedData !== "object") {
      return NextResponse.json(
        { error: "Invalid productId or updatedData" },
        { status: 400 },
      );
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: productId },
      { $set: updatedData },
      { new: true },
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Product updated successfully",
      success: true,
      updatedProduct,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
