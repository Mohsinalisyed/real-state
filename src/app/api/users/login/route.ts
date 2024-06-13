import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 },
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerfied: user.isVerfied,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET ?? "", {
      expiresIn: "365d",
    });
    const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      tokenData,
      token,
    });
    if (tokenData.isVerfied) {
      response.cookies.set("token", token, {
        maxAge: oneYearInMs,
        expires: new Date(Date.now() + oneYearInMs),
      });
    }
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
