import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/categoryModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, active } = reqBody;
    const newCategory = new Category({
      name,
      active,
    });

    const savedCategory = await newCategory.save();

    const allCategorys = await Category.find();

    return NextResponse.json({
      message: "Category added successfully",
      success: true,
      savedCategory,
      allCategorys,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
