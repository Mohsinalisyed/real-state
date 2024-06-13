import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      name,
      price,
      description,
      quantity,
      image,
      category,
      sizeAttribute,
      colorAttribute,
    } = reqBody;
    const newProduct = new Product({
      name,
      price,
      description,
      quantity,
      image,
      category,
      sizeAttribute,
      colorAttribute,
    });
    const savedProduct = await newProduct.save();
    return NextResponse.json({
      mesaaage: "Product added successfully",
      success: true,
      savedProduct,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
