"use client";
import Spinner from "@/app/components/Spinner";
import DynamicTable from "@/app/components/Table";
import { deleteproducts, viewproducts } from "@/app/services/product";
import { productTableHead } from "@/app/tablehead";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IProduct } from "../component/type";
import { useRouter } from "next/navigation";
import Pagination from "@/app/lib/components/Pagination";
import { Box, Button, Flex } from "@/app/lib";

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const {
    data: viewallproduct,
    isLoading,
    refetch,
  } = useQuery(["viewproducts", currentPage, 5], () =>
    viewproducts(currentPage, 5),
  );
  const { mutate, isLoading: loading } = useMutation<IProduct, Error, number>(
    (productId) => deleteproducts(productId),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const handleDelete = (productId: number) => {
    mutate(productId);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const data = Array.isArray(viewallproduct?.products)
    ? viewallproduct?.products.map((item: any) => ({
        id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category ?? "-",
        action: (
          <Box className="space-x-2">
            <Button
              className="px-2 py-1 text-white transition rounded bg-blue hover:bg-blue-700"
              onClick={() =>
                router.push(
                  `/admin/product/add?productId=${item.productId}&_id=${item._id}`,
                )
              }
            >
              Edit
            </Button>
            <Button
              className="px-2 py-1 text-white transition bg-red-500 rounded hover:bg-red-700"
              onClick={() => handleDelete(item.productId)}
              disabled={loading}
            >
              {loading ? <Spinner /> : "Delete"}
            </Button>
            <Button
              className="px-2 py-1 transition rounded text-gray bg-green hover:bg-green-700"
              onClick={() =>
                router.push(`/admin/product/view?productId=${item._id}`)
              }
            >
              View
            </Button>
          </Box>
        ),
      }))
    : [];
  return (
    <Box className="flex items-center justify-center min-h-screen">
      {isLoading || loading ? (
        <Spinner height="h-20" width="w-20" />
      ) : (
        <Flex direction="column">
          <DynamicTable
            columns={productTableHead}
            data={data}
            currentPage={currentPage}
            setCurrentPage={(e: number) => setCurrentPage(e)}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={viewallproduct?.totalPages}
            onPageChange={handlePageChange}
          />
        </Flex>
      )}
    </Box>
  );
};

export default ManageProduct;
