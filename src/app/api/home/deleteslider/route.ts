// pages/api/slider/delete.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Slider from "@/models/homeModel";
connect();
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const sliderId = url.searchParams.get("sliderId");
    if (!sliderId) {
      return NextResponse.json(
        { error: "SliderId is missing from the request" },
        { status: 400 },
      );
    }

    const deletedSlider = await Slider.findOneAndDelete({
      sliderId,
    });
    if (!deletedSlider) {
      return NextResponse.json(
        { error: "sliderId not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "sliderId deleted successfully",
      success: true,
      deletedSlider,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
