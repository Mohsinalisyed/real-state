// pages/api/cart/add.ts
import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const reqBody = await request.json();
    const { userid, productId, name, price, quantity, image, action } = reqBody;
    const totalPrice = quantity * price;
    const existingItem = await Cart.findOne({
      userid: userid,
      productId: productId,
    });
    if (existingItem) {
      existingItem.quantity = quantity;
      existingItem.price = price;
      existingItem.totalPrice = totalPrice;
      await existingItem.save();
    } else {
      const newItem = new Cart({
        action,
        userid,
        productId,
        name,
        price,
        quantity,
        totalPrice,
        image,
      });
      await newItem.save();
    }

    const updatedCart = await Cart.find({ userid });
    const length = updatedCart.length;

    return NextResponse.json({
      message: "Product added to cart successfully",
      success: true,
      cart: updatedCart,
      length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
