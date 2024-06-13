import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const cartItems = await Cart.find({ userid: userId });
    const cartItemslength = cartItems.length;
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
      cartItemslength,
    });
  } catch (error: any) {
    if (error.message === "Token has expired") {
      return NextResponse.json(
        { error: "Token expired, please re-authenticate" },
        { status: 401 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
