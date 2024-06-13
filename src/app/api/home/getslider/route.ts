import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Slider from "@/models/homeModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "5");
    const skip = (page - 1) * pageSize;

    const showAll = url.searchParams.get("all") === "true";

    if (showAll) {
      const allSliders = await Slider.find().sort({ date: -1 });
      return NextResponse.json({
        message: "All sliders loaded successfully",
        success: true,
        allSliders,
      });
    } else {
      const allSliders = await Slider.find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(pageSize);
      const totalSliders = await Slider.countDocuments();

      return NextResponse.json({
        message: "Sliders loaded successfully",
        success: true,
        sliders: allSliders,
        currentPage: page,
        totalPages: Math.ceil(totalSliders / pageSize),
        pageSize,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
