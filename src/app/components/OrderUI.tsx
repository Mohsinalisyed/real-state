// Your React component rendering the orders data
import React, { useState } from "react";
import { IProductDetail } from "../admin/product/type";
import { Iorder } from "../orders/types";
import { Box, FeildWrapper, Flex } from "../lib";
import Userinfo from "./Userinfo";
import { HeadingL, HeadingM, HeadingSM } from "./styles";
import Image from "next/image";
import { formatTimestamp } from "../utils/functions";
import { GrandTotal } from "./OrderDetails";
import ButtonComp from "./Button";
import AddressModal from "./AddressModal";
interface IOrder {
  products: IProductDetail[];
  index: number;
  user: Iorder;
}
const OrdersUI: React.FC<IOrder> = ({ products, index, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  let totalPrice = 0;
  products.forEach((product: any) => {
    totalPrice += product.price * product.quantity;
  });
  return (
    <Box>
      <Box className="w-full p-4 bg-white rounded shadow-md">
        <Flex className="flex-wrap" justify={"space-between"} align={"center"}>
          <HeadingM className="text-lg font-normal">
            ID: {user?.orderId}
          </HeadingM>
          <HeadingM className="text-lg font-normal">
            {formatTimestamp(user?.date)}
          </HeadingM>
        </Flex>
        {Array.isArray(products)
          ? products.map((order) => (
              <Flex key={order.productId} className="py-2 mb-1">
                <Image
                  className="w-20 h-20"
                  src={order?.image}
                  alt=""
                  loader={({ src }) => `${src}?w=256&h=256`}
                  width={256}
                  height={256}
                />
                <Box className="pl-2">
                  <HeadingL className="text-lg font-semibold">
                    {order.name}
                  </HeadingL>
                  <FeildWrapper heading="Product ID" data={order.productId} />
                  <FeildWrapper heading="Quantity" data={order.quantity} />
                  <FeildWrapper heading="Price" data={order.price} />
                </Box>
              </Flex>
            ))
          : []}
        <Flex justify="space-between" align="center">
          <HeadingSM className="text-lg font-normal">
            <span className="font-bold">Status:</span> {user?.status}
          </HeadingSM>
          <GrandTotal totalPrice={totalPrice} />
        </Flex>
        <Flex justify="center">
          <ButtonComp
            text="View delivery address"
            className="max-w-xs"
            func={openModal}
          />
        </Flex>
      </Box>
      {isModalOpen && (
        <AddressModal closeModal={closeModal} user={user} isRow={true} />
      )}
    </Box>
  );
};

export default OrdersUI;
