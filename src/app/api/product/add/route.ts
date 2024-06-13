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
      image,
      size,
      category,
      location,
      addressline1,
      addressline2,
      city,
      country
      
    } = reqBody;
    const flattenedImageArray = image.flat();
    const newProduct = new Product({
      name,
      price,
      description,
      image: flattenedImageArray,
      category,
      size,
      location,
      addressline1,
      addressline2,
      city,
      country
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
