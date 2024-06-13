import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "5");

    const skip = (page - 1) * pageSize;

    // Build the filter object
    const filter: any = {};
    const category = url.searchParams.get("category");
    const name = url.searchParams.get("name");

    if (category && category !== "undefined" && category !== "null") {
      filter.$or = [{ category: { $regex: new RegExp(category, "i") } }];
    }
    if (name && name !== "undefined" && name !== "null") {
      filter.$or = [{ name: { $regex: new RegExp(name, "i") } }];
    }

    const products = await Product.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(pageSize);

    const totalProducts = await Product.countDocuments(filter);

    return NextResponse.json({
      message: "Products loaded successfully",
      success: true,
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / pageSize),
      pageSize,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
