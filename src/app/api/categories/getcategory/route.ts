import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Slider from "@/models/homeModel";
import Category from "@/models/categoryModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "5");
    const skip = (page - 1) * pageSize;

    const showAll = url.searchParams.get("all") === "true";

    if (showAll) {
      const allCategory = await Category.find().sort({ date: -1 });
      return NextResponse.json({
        message: "All Category loaded successfully",
        success: true,
        allCategory,
      });
    } else {
      const allCategory = await Category.find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(pageSize);
      const totalCategory = await Category.countDocuments();

      return NextResponse.json({
        message: "Category loaded successfully",
        success: true,
        category: allCategory,
        currentPage: page,
        totalPages: Math.ceil(totalCategory / pageSize),
        pageSize,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
