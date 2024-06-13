import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Slider from "@/models/homeModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { imageUrl, caption, active } = reqBody;
    const newSlider = new Slider({
      imageUrl,
      caption,
      active,
    });

    const savedSlider = await newSlider.save();

    const allSliders = await Slider.find();

    return NextResponse.json({
      message: "Slider added successfully",
      success: true,
      savedSlider,
      allSliders,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
