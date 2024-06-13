// update/route.ts

import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connect } from "@/dbConfig/dbConfig";
import { ObjectId } from "mongodb"; // Import ObjectId for MongoDB
connect();

export async function PUT(request: NextRequest) {
  try {
    if (!request || typeof request !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 },
      );
    }

    const { productId, review } = await request.json();

    if (!productId || typeof review !== "object") {
      return NextResponse.json(
        { error: "Invalid productId or review data" },
        { status: 400 },
      );
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: new ObjectId(productId) }, // Use ObjectId to match _id field
      { $push: { reviews: review } },
      { new: true },
    );

    // Check if the product with the given productId exists
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return success response with updated product
    return NextResponse.json({
      message: "Review added to product successfully",
      success: true,
      review: {
        // Include the review details in the response
        name: updatedProduct.username, // Assuming these are the review details, adjust as needed
        rating: updatedProduct.rating,
        review: updatedProduct.review,
        date: updatedProduct.reviewDate,
      },
      updatedProduct,
    });
  } catch (error: any) {
    // Return error response if any error occurs
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
