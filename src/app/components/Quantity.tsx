"use client";
import React, { useState } from "react";
import { Box } from "../lib";

interface IQuantity {
  quantity: number;
  setQuantity: (e: number) => void;
}

const QuantityControl: React.FC<IQuantity> = ({ quantity, setQuantity }) => {
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
  };

  return (
    <Box className="py-2 px-4 inline-block border rounded-lg">
      <Box className="flex items-center justify-center gap-x-1.5">
        <button
          type="button"
          onClick={handleDecrement}
          className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg
            className="flex-shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
          </svg>
        </button>
        <input
          className="p-0 w-10 bg-transparent border-0 text-gray-800 text-center focus:ring-0"
          type="text"
          value={quantity}
          data-hs-input-number-input=""
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg
            className="flex-shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
        </button>
      </Box>
    </Box>
  );
};

export default QuantityControl;
