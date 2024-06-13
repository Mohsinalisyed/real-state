import React from "react";
import { Box, Button, Flex } from "../lib";
import { HeadingL, HeadingM, HeadingS } from "./styles";
import { useRouter } from "next/navigation";

const TotalItems = ({ count }: { count: number }) => {
  return (
    <Box className="flex justify-between">
      <HeadingL>Total Items</HeadingL> <HeadingL>{count}</HeadingL>
    </Box>
  );
};

const ProductItem = ({
  name,
  quantity,
  totalPrice,
  deleteCartItem,
  productId,
}: any) => {
  return (
    <li className="flex py-6">
      <div className="flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">{name}</a>
            </h3>
            <p className="ml-4">{totalPrice} Rs</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">Salmon</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {quantity}</p>

          <div className="flex">
            <button
              onClick={() => deleteCartItem(productId)}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export const GrandTotal = ({ totalPrice }: { totalPrice: number }) => {
  return (
    <Box className="flex items-center justify-between">
      <HeadingM>Grand Total</HeadingM>{" "}
      <span className="pl-2">Rs {totalPrice}</span>
    </Box>
  );
};

const OrderDetails = ({
  data,
  productsTotalPrice,
  openModal,
  deleteCartItem,
}: any) => {
  const router = useRouter();

  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="mt-32">
                    <TotalItems count={data.length} />
                    <div className="flow-root mt-4">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {data.map((item: any, index: number) => (
                          <ProductItem
                            key={index}
                            index={index}
                            name={item.name}
                            quantity={item.quantity}
                            totalPrice={item.totalPrice}
                            deleteCartItem={deleteCartItem}
                            productId={item.productId}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <GrandTotal totalPrice={productsTotalPrice} />
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={openModal}
                      className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button
                        onClick={() => router.push("/")}
                        type="button"
                        className="pl-2 font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
