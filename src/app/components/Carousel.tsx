"use client";
import Image from "next/image";
import React, { useState } from "react";
import useTwElements from "../hooks/useTwElements";
import { Box, Flex } from "../lib";
import { getslider } from "../services/home";
import { useQuery } from "react-query";
import { HeadingL, HeadingXL } from "./styles";
import Link from "next/link";
import { capitalizeFirstLetter } from "../utils/functions";
import useAuth from "../hooks/useAuth";
import { getcategory } from "../services/category";

const MainCarousel = () => {
  const twElementsLoaded = useTwElements();
  const [activeSlide, setActiveSlide] = useState(0);
  const { isAdmin, userid } = useAuth();

  const {
    data: slider,
  } = useQuery(["getslider", 1, 5, true], () => getslider(1, 5, true));
  const { data: category, isLoading: categoryLoading } = useQuery(
    ["getcategory", true],
    () => getcategory(0, 0, true),
    {
      enabled: !!userid || !isAdmin ? true : false,
    },
  );

  const handleSlideChange = (direction: string) => {
    const totalSlides = 3;

    if (direction === "prev") {
      setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    } else {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }
  };
  return (
    <React.Fragment>
      {twElementsLoaded && (
        <Flex className="w-full">
          <Box style={{ width: "250px", maxHeight: "400px", overflowY: "auto" }}>
            <HeadingXL>All Categories</HeadingXL>
            <Box>
              {category?.allCategory?.map((catItem: any, index: number) =>
                  categoryLoading ? (
                    <div
                      className="w-48 h-8 mt-2 mb-4 bg-gray-200 rounded-full dark:bg-gray-700"
                      key={index}
                    ></div>
                  ) : (
                    <Box key={index}>
                      <Link
                        href={`/listproducts?filterCategory=${catItem.name}`}
                        className="block py-2 text-base font-medium  rounded-md  hover:text-red-500"
                      >
                        {capitalizeFirstLetter(catItem.name)}
                      </Link>
                    </Box>
                  ),
                )}
            </Box>          </Box>
          <Box
            id="MainExampleControls"
            className="relative w-full p-4"
            data-te-carousel-init
            data-te-ride="carousel"
          >
            <Box className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
              <Box className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                {slider?.allSliders
                  ?.filter((item: any) => item.active)
                  .map((imageSource: any, index: number) => (
                    <Box
                      key={index}
                      className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${index === activeSlide ? "visible" : "hidden"
                        }`}
                    >
                      <Image
                        src={imageSource.imageUrl}
                        className="w-full h-[400px]"
                        alt={`Slide ${index + 1}`}
                        loader={({ src }) => src}
                        width={256}
                        height={256}
                      />
                    </Box>
                  ))}
              </Box>
            </Box>

            <button
              onClick={() => handleSlideChange("prev")}
              className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button"
              data-te-target="#carouselExampleControls"
              data-te-slide="prev"
            >
              <span className="inline-block w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </span>
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Previous
              </span>
            </button>

            <button
              onClick={() => handleSlideChange("next")}
              className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button"
              data-te-target="#carouselExampleControls"
              data-te-slide="next"
            >
              <span className="inline-block w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Next
              </span>
            </button>
          </Box>
        </Flex>
      )}
    </React.Fragment>
  );
};

export default MainCarousel;
