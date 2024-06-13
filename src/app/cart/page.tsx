"use client";
import React, { useState } from "react";
import { deletecartitem, viewcart } from "../services/cart";
import { useMutation, useQuery } from "react-query";
import useAuth from "../hooks/useAuth";
import MyCart from "../components/MyCart";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import { button } from "../components/primitive";
import OrderDetails from "../components/OrderDetails";
import { Box, Button, Container } from "../lib";

const Cart = () => {
  const { userid } = useAuth();
  const { data, isLoading, refetch } = useQuery("viewcart", viewcart, {
    enabled: !!userid,
  });
  const { mutate, isLoading: loading } = useMutation<any, Error, number>(
    (productId) => deletecartitem(productId),
    {
      onSuccess: (data) => {
        !loading && refetch();
      },
    },
  );

  const handleDelete = (productId: number) => {
    mutate(productId);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const productsTotalPrice = data?.reduce(
    (total: number, product: any) => total + product.totalPrice,
    0,
  );
  return (
    <Container>
      {data?.length > 0 ? (
        <Box className="flex flex-col md:flex-row justify-between">
          <Box className="pt-20 w-full sm:w-3/4">
            {data?.length > 0 && (
              <Box className="flex flex-wrap">
                {Array.isArray(data)
                  ? data.map((item) => (
                      <MyCart
                        product={item}
                        key={item._id}
                        deleteCartItem={(e) => handleDelete(e)}
                        refetch={refetch}
                      />
                    ))
                  : []}
              </Box>
            )}
          </Box>
          <Box className="h-[90vh] flex flex-col justify-space-between md:w-full lg:w-2/4 xl:w-2/4 pt-20 px-4">
            {!isLoading && data?.length > 0 && (
              <>
                <Box>
                  <OrderDetails
                    data={data}
                    productsTotalPrice={productsTotalPrice}
                    openModal={() => openModal()}
                    deleteCartItem={(e: any) => handleDelete(e)}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      ) : (
        <Box className="flex items-center justify-center h-screen">
          No item in the cart
        </Box>
      )}
      {isModalOpen && (
        <Modal closeModal={closeModal} cardData={productsTotalPrice} />
      )}
    </Container>
  );
};

export default Cart;
