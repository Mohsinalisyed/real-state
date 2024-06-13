"use client";
import Spinner from "@/app/components/Spinner";
import {
  HeadingL,
  HeadingM,
  HeadingS,
  HeadingXL,
} from "@/app/components/styles";
import useTwElements from "@/app/hooks/useTwElements";
import { Box, Flex } from "@/app/lib";
import { updatestatus, vieworderdetail } from "@/app/services/order";
import { OrderStatus } from "@/app/utils/enums/order";
import { formatTimestamp } from "@/app/utils/functions";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

const ViewProduct = () => {
  const twElementsLoaded = useTwElements();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const {
    data: orderdetail,
    isLoading,
    refetch,
  } = useQuery("vieworderdetail", async () => await vieworderdetail(orderId), {
    enabled: !!orderId,
  });
  const { mutate: updateProduct, isLoading: updateLoading } = useMutation<
    any,
    Error,
    any
  >(({ updatedData }) => updatestatus(updatedData), {
    onSuccess: () => {
      toast.success("Status updated successfully !");
      refetch();
    },
  });

  const handleStatusChange = async (
    e: any,
    userid: string,
    orderId: number,
  ) => {
    const newStatus = e.target.value;
    updateProduct({
      updatedData: {
        orderId: orderId,
        userid: userid,
        status: newStatus,
      },
    });
  };
  return (
    <section className="min-h-screen pt-20">
      {twElementsLoaded && (
        <Box className="h-full">
          {isLoading ? (
            <Box className="flex items-center justify-center min-h-screen ">
              <Spinner height="h-20" width="w-20" />
            </Box>
          ) : (
            <Flex direction="column">
              <Flex align="center" className="py-2">
                <HeadingS>Order_Id:</HeadingS>
                <HeadingM> {orderdetail.order.orderId} </HeadingM>
              </Flex>
              <Box>
                <HeadingXL>
                  {orderdetail.order.first_name} {orderdetail.order.last_name}{" "}
                </HeadingXL>
                <HeadingM>{orderdetail.order.email} </HeadingM>
                <HeadingM>{orderdetail.order.contact_number} </HeadingM>
                <HeadingM>{orderdetail.order.address} </HeadingM>
                <Flex direction="column">
                  {" "}
                  <HeadingS>Payment Status:</HeadingS>{" "}
                  <HeadingM>
                    {" "}
                    {orderdetail.order.paid === true ? "Paid" : "Not Paid"}{" "}
                  </HeadingM>
                </Flex>
                <Flex direction="column">
                  {" "}
                  <HeadingS>Order place date:</HeadingS>{" "}
                  <HeadingM>
                    {" "}
                    {formatTimestamp(orderdetail.order.date)}{" "}
                  </HeadingM>
                </Flex>
              </Box>
              <Box className="mt-10">
                <HeadingXL>Order details</HeadingXL>
                <Flex direction="column">
                  <Box className="my-4">
                    <Image
                      src={orderdetail.order.products[0]?.image}
                      alt="Sample image"
                      className="w-98 h-[200px] object-cover rounded-lg"
                      loader={({ src }) => `${src}?w=256&h=256`}
                      width={256}
                      height={256}
                    />
                  </Box>
                  <Flex align="center">
                    {" "}
                    <HeadingS>Product_Id:</HeadingS>{" "}
                    <HeadingM>
                      {orderdetail.order.products[0]?.productId}{" "}
                    </HeadingM>
                  </Flex>
                  <Flex align="center">
                    {" "}
                    <HeadingS>Product_Name:</HeadingS>{" "}
                    <HeadingM>{orderdetail.order.products[0]?.name} </HeadingM>
                  </Flex>
                  <Flex align="center">
                    {" "}
                    <HeadingS>Product_Quantity:</HeadingS>{" "}
                    <HeadingM>
                      {orderdetail.order.products[0]?.quantity}{" "}
                    </HeadingM>
                  </Flex>
                  <Flex align="center">
                    {" "}
                    <HeadingS>Product_Price:</HeadingS>{" "}
                    <HeadingM>{orderdetail.order.products[0]?.price} </HeadingM>
                  </Flex>
                  <Flex align="center">
                    {" "}
                    <HeadingS>Product_Status:</HeadingS>
                    <Box style={{ border: "1px solid" }}>
                      <select
                        id="orderStatus"
                        value={orderdetail.order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            e,
                            orderdetail.order?.userid,
                            orderdetail.order?.orderId,
                          )
                        }
                      >
                        {Object.values(OrderStatus).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          )}
        </Box>
      )}
    </section>
  );
};

export default ViewProduct;
