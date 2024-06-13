// pages/api/user/updateProfile.ts

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      userId, // Assuming you have userId in the request body
      first_name,
      last_name,
      address,
      contact_number,
      whatsapp_number,
      profile_image,
    } = reqBody;

    // Use findByIdAndUpdate to update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          first_name,
          last_name,
          address,
          contact_number,
          whatsapp_number,
          profile_image,
        },
      },
      { new: true }, // This option returns the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      success: true,
      updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
