"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import useTwElements from "../hooks/useTwElements";
import { addtocart } from "../services/cart";
import QuantityControl from "./Quantity";
import useAuth from "../hooks/useAuth";
import { title } from "./primitive";
import { useDispatch, useSelector } from "react-redux";
import { cartItem } from "../lib/Reducers/cartReducer";
import { Box, Flex } from "../lib";
import { HeadingL, HeadingM, HeadingS, HeadingSM, HeadingXL } from "./styles";
import Modal from "./Modal";
import StarRating from "./Review/StarRating";
import { Product } from "./style";
import ButtonComp from "./Button";
import { OrderType } from "../utils/enums/order";
import { truncateString } from "../utils/functions";

const ListProducts = ({ product }: any) => {
  const twElementsLoaded = useTwElements();
  const router = useRouter();
  const { userid } = useAuth();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const Rating = product.reviews.reduce(
    (acc: any, { rating }: any) => acc + rating,
    0,
  );
  const StarString = (Rating / product?.reviews?.length || 0).toFixed(1);
  const Star = parseFloat(StarString);
  const { mutate, isLoading } = useMutation("addtocart", addtocart, {
    onSuccess: (data) => {
      dispatch(cartItem({ totalItem: data?.length }));
    },
  });
  const handleAddToCart = async (action: string, productData: any) => {
    const productWithQuantity = { ...productData, quantity, userid, action };
    mutate(productWithQuantity);
  };
  const openModal = async () => {
    handleAddToCart(OrderType.BUY_NOW, product);
    await setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    twElementsLoaded && (
      <Product key={product._id}>
        <Box className="block rounded-lg dark:bg-neutral-700">
          <Box
            onClick={() =>
              router.push(`/product/view?productId=${product._id}`)
            }
            className="cursor-pointer"
          >
            <Image
              src={product?.image}
              className="w-full h-[250px]"
              alt="Sample image"
              loader={({ src }) => `${src}?w=256&h=256`}
              width={256}
              height={256}
            />
          </Box>
          <Box className="p-2">
            <HeadingXL className={title({ color: "black", size: "sm" })}>
              {truncateString(product?.name, 20)}
            </HeadingXL>
            <Box>
              <StarRating value={Star} size={15} />
            </Box>
            <Flex
              justify="space-between"
              align="center"
              direction="column"
              className="mb-2"
            >
              <Box className="mr-2 mt-2">
                <QuantityControl
                  quantity={quantity}
                  setQuantity={(e) => setQuantity(e)}
                />
              </Box>
              <Flex justify="space-between" align="center" className="mb-2">
                <HeadingL className="py-2 pl-1">Price:</HeadingL>
                <HeadingM className="py-2 pl-1">
                  {product?.price} Rs/-
                </HeadingM>{" "}
              </Flex>
            </Flex>
            <Flex
              justify="space-between"
              direction={"column"}
              className="gap-2"
            >
              <ButtonComp
                func={() => handleAddToCart(OrderType.CART, product)}
                text="Add to Cart"
                isLoading={isLoading}
                primary
              />
              <ButtonComp func={openModal} text="Buy now" />
            </Flex>
          </Box>
        </Box>
        {isModalOpen && (
          <Modal closeModal={closeModal} cardData={quantity * product.price} />
        )}
      </Product>
    )
  );
};

export default ListProducts;
