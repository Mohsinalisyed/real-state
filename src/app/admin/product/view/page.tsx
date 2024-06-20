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
              <Box className="mb-2 shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                  <div>
                    {productdetail?.product?.images.map((url:any, index:number) => (
                      <div key={index} className="w-full mb-2">
                        <Image
                          src={`${url}?w=256&h=256`} // Adjust the query parameters as needed
                          alt="Sample image"
                          width={256}
                          height={256}
                        />
                      </div>
                    ))}
                  </div>
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
