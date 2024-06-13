"use client";
import Spinner from "@/app/components/Spinner";
import { Box } from "@/app/lib";
import { totalorders } from "@/app/services/order";
import { totalproducts } from "@/app/services/product";
import { totalusers } from "@/app/services/user";
import { formatNumberSuffix } from "@/app/utils/functions";
import React from "react";
import { useQuery } from "react-query";
const Dashboard = () => {
  const { data: products, isLoading: productLoading } = useQuery(
    "totalproducts",
    totalproducts,
  );
  const { data: orders, isLoading: ordersLoading } = useQuery(
    "totalorders",
    totalorders,
  );
  const { data: users, isLoading: userLoading } = useQuery(
    "totalusers",
    totalusers,
  );

  return (
    <section className="min-h-screen">
      <Box className="container p-8 mx-auto ">
        <Box className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Cards */}
          <Box className="p-4 bg-white rounded-md shadow-md">
            <p className="font-thin text-gray-500 text-1xl">Total Products</p>
            <p className="text-lg font-bold">
              {productLoading ? <Spinner /> : products?.totalProducts}
            </p>
          </Box>
          <Box className="p-4 bg-white rounded-md shadow-md">
            <p className="font-thin text-gray-500 text-1xl">Total Orders</p>
            <p className="text-lg font-bold">
              {ordersLoading ? <Spinner /> : orders?.totalorders}
            </p>
          </Box>
          <Box className="p-4 bg-white rounded-md shadow-md">
            <p className="font-thin text-gray-500 text-1xl">Total Users</p>
            <p className="text-lg font-bold">
              {userLoading ? <Spinner /> : users?.totalUser}
            </p>
          </Box>
          <Box className="p-4 bg-white rounded-md shadow-md">
            <p className="font-thin text-gray-500 text-1xl">
              Total Orders Amount
            </p>
            <p className="text-lg font-bold">
              {ordersLoading ? (
                <Spinner />
              ) : (
                formatNumberSuffix(orders?.grandTotal)
              )}
            </p>
          </Box>
          <Box className="p-4 bg-white rounded-md shadow-md">
            <p className="font-thin text-gray-500 text-1xl">Debit Amount</p>
            <p className="text-lg font-bold">2.01k</p>
          </Box>
          <Box className="p-4 bg-white rounded-md shadow-md">
            <p className="font-thin text-gray-500 text-1xl">Total Amount</p>
            <p className="text-lg font-bold">5.05k</p>
          </Box>
        </Box>
        {/* Graph Chart */}
        <Box className="mt-8">
          <Box className="w-full mt-8 overflow-hidden bg-white rounded-md shadow-md">
            <h2 className="p-4 text-xl font-bold text-gray-500">
              Profit Loss Graph
            </h2>
            <Box className="p-4">
              <Box className="flex items-center mb-4">
                <Box className="w-1/4 h-8 bg-blue"></Box>
                <span className="ml-2">Jun 2023</span>
              </Box>

              <Box className="flex items-center mb-4">
                <Box className="w-3/5 h-8 bg-green"></Box>
                <span className="ml-2">Jul 2023</span>
              </Box>

              <Box className="flex items-center mb-4">
                <Box className="w-2/5 h-8 bg-orange-500"></Box>
                <span className="ml-2">Aug 2023</span>
              </Box>

              <Box className="flex items-center mb-4">
                <Box className="w-2/3 h-8 bg-red-500"></Box>
                <span className="ml-2">Sep 2023</span>
              </Box>

              <Box className="flex items-center">
                <Box className="w-1/5 h-8 bg-yellow-500"></Box>
                <span className="ml-2">Oct 2023</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default Dashboard;
