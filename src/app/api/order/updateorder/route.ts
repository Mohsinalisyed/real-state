// pages/api/cart/updateQuantity.ts
import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(request: NextRequest, res: NextResponse) {
  try {
    const reqBody = await request.json();
    const { userid, productId, quantity } = reqBody;

    const existingItem = await Cart.findOne({
      userid: userid,
      productId: productId,
    });

    if (existingItem) {
      // Update quantity and recalculate totalPrice
      existingItem.quantity = quantity;
      existingItem.totalPrice = quantity * existingItem.price;

      await existingItem.save();

      const updatedCart = await Cart.find({ userid });

      return NextResponse.json({
        message: "Quantity updated successfully",
        success: true,
        cart: updatedCart,
      });
    } else {
      return NextResponse.json(
        { error: "Product not found in the cart", success: false },
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
