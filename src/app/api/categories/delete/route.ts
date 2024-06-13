import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel";
connect();
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const categoryId = url.searchParams.get("categoryId");
    if (!categoryId) {
      return NextResponse.json(
        { error: "CategoryId is missing from the request" },
        { status: 400 },
      );
    }

    const deletedcategory = await Category.findOneAndDelete({
      categoryId,
    });
    if (!deletedcategory) {
      return NextResponse.json(
        { error: "categoryId not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "categoryId deleted successfully",
      success: true,
      deletedcategory,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
