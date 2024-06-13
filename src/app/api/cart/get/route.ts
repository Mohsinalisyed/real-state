// pages/api/cart/get.ts

import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Cart from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest, res: NextResponse) {
  try {
    const userId = getDataFromToken(request);
    const cartItems = await Cart.find({ userid: userId });
    const length = cartItems.length;
    return NextResponse.json({
      success: true,
      cart: cartItems,
      length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
