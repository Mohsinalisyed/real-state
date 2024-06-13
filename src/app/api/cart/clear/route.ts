import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(request: NextRequest, res: NextResponse) {
  try {
    const reqBody = await request.json();
    const { userid } = reqBody;

    // Delete items based on action
    await Cart.deleteMany({ userid });

    return NextResponse.json({
      message: `Cart cleared for action}`,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
