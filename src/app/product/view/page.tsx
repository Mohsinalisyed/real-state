"use client";
import ButtonComp from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import QuantityControl from "@/app/components/Quantity";
import Reviews from "@/app/components/Review/Reviews";
import Spinner from "@/app/components/Spinner";
import { HeadingM, HeadingS } from "@/app/components/styles";
import useAuth from "@/app/hooks/useAuth";
import useTwElements from "@/app/hooks/useTwElements";
import {
  Box,
  Button,
  Container,
  FeildWrapper,
  Flex,
  MainHeading,
} from "@/app/lib";
import { cartItem } from "@/app/lib/Reducers/cartReducer";
import { addtocart } from "@/app/services/cart";
import { viewproductdetail } from "@/app/services/product";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { IAttribute } from "../type";
import MainReview from "@/app/components/Review/MainReview ";
import { OrderType } from "@/app/utils/enums/order";

const ViewProduct = () => {
  const twElementsLoaded = useTwElements();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const { userid } = useAuth();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { mutate, isLoading: cartLoading } = useMutation(
    "addtocart",
    addtocart,
    {
      onSuccess: (data) => {
        dispatch(cartItem({ totalItem: data?.length }));
      },
    },
  );

  const handleAddToCart = async (action: string, productData: any) => {
    const productWithQuantity = { ...productData, quantity, userid, action };
    mutate(productWithQuantity);
  };

  const openModal = () => {
    handleAddToCart(OrderType.BUY_NOW, productdetail.product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    data: productdetail,
    isLoading,
    refetch,
  } = useQuery(
    "viewproductdetail",
    async () => await viewproductdetail(productId),
    {
      enabled: !!productId,
    },
  );

  const handleColorClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <Container className="pt-20">
      {twElementsLoaded && (
        <Box className="flex items-start justify-center">
          {isLoading ? (
            <Box className="flex items-center justify-center min-h-screen">
              <Spinner height="h-20" width="w-20" />
            </Box>
          ) : (
            <Box className="flex w-full gap-6 lg:justify-between sm:flex-row flex-col">
              <Box className="shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-7/12 xl:w-7/12 max-w-[600px]">
                <Image
                  className="w-full h-[300px] pr-4"
                  alt="Sample image"
                  loader={({ src }) => `${src}?w=256&h=256`}
                  src={selectedImage || productdetail?.product?.image}
                  width={256}
                  height={256}
                />
                <MainReview productdetail={productdetail} refetch={refetch} />
                <Flex justify="space-between" className="gap-2 mt-6 pr-2">
                  <ButtonComp
                    func={() =>
                      handleAddToCart(OrderType.CART, productdetail?.product)
                    }
                    text="Add to Cart"
                    isLoading={cartLoading}
                    primary
                  />
                  <ButtonComp
                    func={openModal}
                    text="Buy now"
                    isLoading={cartLoading}
                  />
                </Flex>
              </Box>

              <Box className="pr-8 mb-12 md:mb-0 md:w-8/12 lg:w-7/12 xl:w-7/12">
                <MainHeading title="Product details" />

                <Box className="mb-4 text-4xl font-bold text-gray dark:text-white">
                  {productdetail?.product?.name}
                </Box>
                <Box className="mb-2 text-2xl font-thin text-gray-500 dark:text-white">
                  <FeildWrapper
                    heading="Price"
                    data={`${productdetail?.product?.price} Rs\-`}
                  />
                </Box>
                <Box className="mb-2">
                  <HeadingM>Category</HeadingM>
                  <HeadingM style={{ fontWeight: "500" }}>
                    {productdetail?.product?.category}
                  </HeadingM>
                </Box>
                <Box>
                  <HeadingM className="mb-2">Select Color:</HeadingM>
                  <Flex style={{ gap: "10px" }} align="center">
                    <HeadingS
                      onClick={() =>
                        handleColorClick(productdetail?.product?.image)
                      }
                    >
                      Default
                    </HeadingS>
                    {productdetail?.product?.colorAttribute?.map(
                      (item: IAttribute, index: number) => (
                        <Box
                          key={index}
                          style={{
                            height: "32px",
                            width: "32px",
                            borderRadius: "100%",
                            background: `${item.value}`,
                            cursor: "pointer",
                          }}
                          onClick={() => handleColorClick(item.image)}
                        />
                      ),
                    )}
                  </Flex>
                </Box>
                <Box style={{ marginBottom: "12px" }}>
                  <HeadingM className="mb-2">Select Size:</HeadingM>
                  <Flex style={{ gap: "10px" }}>
                    {productdetail?.product?.sizeAttribute?.map(
                      (item: IAttribute, index: number) => (
                        <Box
                          key={index}
                          style={{
                            padding: "12px",
                            border: "1px solid red",
                            borderRadius: "100%",
                          }}
                        >
                          <HeadingS>{item?.value}</HeadingS>
                        </Box>
                      ),
                    )}
                  </Flex>
                </Box>
                <Box className="mb-4">
                  <QuantityControl
                    quantity={quantity}
                    setQuantity={(e) => setQuantity(e)}
                  />
                </Box>
                <Box className="mb-5">
                  <HeadingM className="mb-2">Product Description:</HeadingM>
                  {productdetail?.product?.description}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
      <Reviews productdetail={productdetail} />
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          cardData={quantity * productdetail?.product?.price}
        />
      )}
    </Container>
  );
};

export default ViewProduct;
