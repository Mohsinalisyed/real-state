"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { IOrder } from "../cart/type";
import { orderdata } from "../services/order";
import { profile } from "../services/user";
import { clearCart, viewcart } from "../services/cart";
import Spinner from "../components/Spinner";
import { Box } from "../lib";
import { OrderType } from "../utils/enums/order";
import success from "../../../public/Success.gif"; // Make sure the path is correct
import CongratulationsModal from "../components/Congratulations";

const Payment = () => {
  const searchParams = useSearchParams();
  const [confirm, setConfirm] = useState(false);
  const [sessionProcessed, setSessionProcessed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading: cartLoading } = useQuery("viewcart", viewcart);

  const session_id = searchParams.get("session_id");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const {
    data: paymentprofile,
    isLoading,
    refetch,
  } = useQuery("paymentprofile", profile, {
    enabled: !!session_id,
  });
  const { mutate: clearCartMutation } = useMutation<any, Error, string>(
    (userId) => clearCart(userId),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );
  const { mutate: addorder, isLoading: orderLoading } = useMutation<
    IOrder,
    Error,
    any
  >(({ order }) => orderdata(order), {
    onSuccess: async () => {
      setConfirm(true);
      await clearCartMutation(paymentprofile?.data?._id);
      openModal();
    },
  });

  useEffect(() => {
    if (!cartLoading && session_id && !sessionProcessed && !isLoading) {
      const buyNowData = data?.filter(
        (item: any) => item.action === OrderType.BUY_NOW,
      );

      const orderData = {
        userid: paymentprofile?.data?._id,
        username: paymentprofile?.data?.username,
        email: paymentprofile?.data?.email,
        first_name: paymentprofile?.data?.first_name,
        last_name: paymentprofile?.data?.last_name,
        address: paymentprofile?.data?.address,
        contact_number: paymentprofile?.data?.contact_number,
        whatsapp_number: paymentprofile?.data?.whatsapp_number,
        paid: !!session_id ? true : false,
        isVerified: paymentprofile?.data?.isVerfied,
        products: buyNowData ? buyNowData : data,
      };

      addorder({
        order: { ...orderData },
      });
      setSessionProcessed(true);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("session_id");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${newSearchParams}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    session_id,
    addorder,
    sessionProcessed,
    searchParams,
    isLoading,
    cartLoading,
  ]);

  return (
    <Box>
      {orderLoading ? (
        <Box className="flex items-center justify-center min-h-screen">
          <Spinner height="h-20" width="w-20" />
        </Box>
      ) : (
        <Box className="min-h-screen">
          {confirm && isModalOpen ? (
            <Box
              className="min-h-screen"
              style={{
                backgroundImage: `url(${success.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <CongratulationsModal closeModal={closeModal} />
            </Box>
          ) : (
            <p className="pt-20 text-black">
              Order data is being processing...
            </p>
          )}
          <Link
            href={"/"}
            className="px-8 py-4 text-white duration-200 bg-blue-500 hover:bg-blue-800 ml-4"
          >
            Home
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Payment;
