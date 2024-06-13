"use client";
import React, { useState } from "react";
import QuantityControl from "./Quantity";
import useTwElements from "../hooks/useTwElements";
import Image from "next/image";
import { truncateText } from "../utils/functions";
import { updateorder } from "../services/order";
import { useMutation } from "react-query";
import { IProductDetail } from "../admin/product/type";
import { button } from "./primitive";
import { Box } from "../lib";
import ButtonComp from "./Button";
import { toast } from "react-toastify";
interface ICart {
  deleteCartItem: (e: number) => void;
  product: any;
  refetch: () => void;
}

const MyCart: React.FC<ICart> = ({ product, deleteCartItem, refetch }) => {
  const twElementsLoaded = useTwElements();
  const [quantity, setQuantity] = useState(product?.quantity);
  const { mutate: updateProduct, isLoading: updateLoading } = useMutation<
    IProductDetail,
    Error,
    any
  >(({ updatedData }) => updateorder(updatedData), {
    onSuccess: () => {
      toast.success("Quantity updated successfully!");
      refetch();
    },
  });

  const handleUpdate = () => {
    updateProduct({
      updatedData: {
        productId: product.productId,
        userid: product.userid,
        quantity: quantity,
      },
    });
  };
  return (
    twElementsLoaded && (
      <Box
        key={product._id}
        className="w-full px-4 mb-8"
        style={{ zIndex: "100" }}
      >
        <Box className="flex rounded-lg bg-white  dark:bg-neutral-700">
          <Box className="cursor-pointer">
            <Image
              src={product?.image}
              className="w-[400px] h-[250px]"
              alt="Sample image"
              loader={({ src }) => `${src}?w=256&h=256`}
              width={256}
              height={256}
            />
          </Box>
          <Box className="flex flex-col justify-between p-6">
            <Box>
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {truncateText(product?.name, 3)}
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {product?.price} Rs/-
              </p>
              <QuantityControl
                quantity={quantity}
                setQuantity={(e) => setQuantity(e)}
              />
            </Box>
            <Box className="flex justify-between w-full">
              <ButtonComp func={() => handleUpdate()} text="Update" primary />
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default MyCart;
