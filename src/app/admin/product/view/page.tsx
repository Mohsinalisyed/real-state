"use client";
import Spinner from "@/app/components/Spinner";
import useTwElements from "@/app/hooks/useTwElements";
import { Box, Flex } from "@/app/lib";
import { viewproductdetail } from "@/app/services/product";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

const ViewProduct = () => {
  const twElementsLoaded = useTwElements();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const { data: productdetail, isLoading } = useQuery(
    "viewproductdetail",
    async () => await viewproductdetail(productId),
    {
      enabled: !!productId,
    },
  );
  const color = productdetail?.product?.colorAttribute.map(
    (item: any, index: number) => {
      return (
        <Flex key={index} className="py-8" justify="space-between">
          <Flex>
            <li>{item.name}</li>
            <Box
              className="w-10 h-10 ml-5"
              style={{ background: `${item.value}` }}
            ></Box>
          </Flex>
          <Image
            className="w-[100px] h-[100px]"
            alt="Sample image"
            loader={({ src }) => `${src}?w=256&h=256`}
            src={item?.image}
            width={256}
            height={256}
          />
        </Flex>
      );
    },
  );
  const size = productdetail?.product?.sizeAttribute.map(
    (item: any, index: number) => {
      return (
        <Box key={index}>
          <Flex className="py-4" justify="space-between">
            {" "}
            <li>{item.name}</li>
            <Box>{item.value}</Box>
          </Flex>
        </Box>
      );
    },
  );
  return (
    <section className="min-h-screen">
      {twElementsLoaded && (
        <Box className="h-full">
          {isLoading ? (
            <Box className="flex items-center justify-center min-h-screen ">
              <Spinner height="h-20" width="w-20" />
            </Box>
          ) : (
            <Box className="flex flex-wrap items-start justify-center h-full gap-6 lg:justify-between min-h-screen pt-20">
              <Box className="mb-12 shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <Image
                  className="w-full h-[400px]"
                  alt="Sample image"
                  loader={({ src }) => `${src}?w=256&h=256`}
                  src={productdetail?.product?.image}
                  width={256}
                  height={256}
                />
                <Box className="mb-5 text-2xl  text-black dark:text-white">
                  Available Color: {color}
                </Box>
              </Box>

              <Box className="pr-8 mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                <Box className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 font-semibold text-center dark:text-white">
                    Product Detail
                  </p>
                </Box>

                <Box className="mb-5 text-4xl  text-black dark:text-white">
                  {productdetail?.product?.name}
                </Box>
                <Box className="mb-5 text-2xl  text-black dark:text-white">
                  Price: {productdetail?.product?.price} Rs\-
                </Box>
                <Box className="mb-5 text-2xl  text-black dark:text-white">
                  Available Quantity: {productdetail?.product?.quantity}
                </Box>
                <Box className="mb-5 text-2xl  text-black dark:text-white">
                  Category: {productdetail?.product?.category}
                </Box>
                <Box className="mb-5 text-2xl  text-black dark:text-white">
                  Available Size: {size}
                </Box>
                <Box className="mb-5  text-black text-1xl dark:text-white">
                  {productdetail?.product?.description}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </section>
  );
};

export default ViewProduct;
