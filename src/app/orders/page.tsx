"use client";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "react-query";
import { vieworders } from "../services/order";
import OrdersUI from "../components/OrderUI";
import { Box, Container } from "../lib";
import { HeadingXL } from "../components/styles";
import Spinner from "../components/Spinner";
import Pagination from "../lib/components/Pagination";

const Orders = () => {
  const { userid } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useQuery(
    ["vieworders", userid, currentPage, 5],
    () => vieworders({ userid, page: currentPage }),
    {
      enabled: !!userid,
    },
  );
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Container>
      {isLoading && (
        <Box className="min-h-screen flex justify-center items-center">
          <Spinner height="h-20" width="w-20" />
        </Box>
      )}
      {data?.orders?.length > 0 ? (
        <Box className="min-h-screen pt-16">
          <HeadingXL className="mb-4 text-2xl font-semibold px-4 py-4 mt-2">
            Orders
          </HeadingXL>
          {Array.isArray(data?.orders)
            ? data?.orders.map((order: any, index: number) => (
                <Box key={index}>
                  <OrdersUI
                    products={order?.products}
                    user={order}
                    index={index}
                  />
                </Box>
              ))
            : null}
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      ) : isLoading ? (
        <Box className="min-h-screen flex justify-center items-center">
          <Spinner height="h-20" width="w-20" />
        </Box>
      ) : (
        <Box className="min-h-screen  flex justify-center items-center">
          No order Found
        </Box>
      )}
    </Container>
  );
};

export default Orders;
