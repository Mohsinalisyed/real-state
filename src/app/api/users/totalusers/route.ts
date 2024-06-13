import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
connect();

export async function GET(request: NextRequest) {
  try {
    const users = await User.find();
    const totalUser = users.length;
    return NextResponse.json({
      message: "Total userloaded successfully",
      success: true,
      totalUser,
      users,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
