import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const reqBody = await request.json();
    const {
      userid,
      username,
      email,
      first_name,
      last_name,
      address,
      contact_number,
      whatsapp_number,
      isVerified,
      paid,
      products,
    } = reqBody;

    // Check if any required field is missing
    const requiredFields = [
      "userid",
      "username",
      "email",
      "first_name",
      "last_name",
      "address",
      "contact_number",
      "whatsapp_number",
      "products",
    ];
    const missingFields = requiredFields.filter(
      (field) => !reqBody.hasOwnProperty(field),
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(", ")}`,
          success: false,
        },
        { status: 400 },
      );
    }

    const newOrder = new Order({
      userid,
      username,
      email,
      first_name,
      last_name,
      address,
      contact_number,
      whatsapp_number,
      isVerified,
      paid,
      products,
    });

    await newOrder.save();

    return NextResponse.json({
      message: "Order created successfully",
      success: true,
      order: newOrder,
    });
  } catch (error: any) {
    console.error("Error in API route:", error);

    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 },
    );
  }
}
