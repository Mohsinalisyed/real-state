// pages/api/product/delete.ts

import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
connect();
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const productId = url.searchParams.get("productId");
    if (!productId) {
      return NextResponse.json(
        { error: "ProductId is missing from the request" },
        { status: 400 },
      );
    }

    const deletedProduct = await Cart.findOneAndDelete({
      productId,
    });
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Product deleted successfully",
      success: true,
      deletedProduct,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
