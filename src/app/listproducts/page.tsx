"use client";
import ListProducts from "@/app/components/ListProducts";
import useAuth from "@/app/hooks/useAuth";
import { viewproducts } from "@/app/services/product";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import Pagination from "../lib/components/Pagination";
import { Box, Container } from "../lib";
import { useSearchParams } from "next/navigation";

const ListProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const filterCategory = searchParams.get("filterCategory");
  const searchQuery = searchParams.get("searchQuery");
  const { userid } = useAuth();
  console.log(searchQuery, "searchQuery");

  const { data, isLoading, refetch } = useQuery(
    ["viewproducts", currentPage, 16, filterCategory, searchQuery],
    () =>
      viewproducts(currentPage, 16, filterCategory as any, searchQuery as any),
    {
      enabled: !!userid,
    },
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Container className="pt-16">
      {isLoading ? (
        <Box className="flex items-center justify-center min-h-screen ">
          <Spinner height="h-20" width="w-20" />
        </Box>
      ) : (
        <Box className="flex flex-wrap pt-2">
          {Array.isArray(data?.products) && data.products.length > 0 ? (
            data.products.map((item: any) => (
              <ListProducts product={item} key={item._id} />
            ))
          ) : (
            <Box className="flex items-center justify-center w-full min-h-[50vh]">
              No products found
            </Box>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </Container>
  );
};

export default ListProduct;
