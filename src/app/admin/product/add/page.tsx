"use client";
import React from "react";
import ProductForm from "../component/ProductForm";
import { useSearchParams } from "next/navigation";
const AddProduct = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const objectId = searchParams.get("_id");
  return <ProductForm productId={productId} objectId={objectId} />;
};

export default AddProduct;
