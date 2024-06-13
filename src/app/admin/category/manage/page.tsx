"use client";
import { TableCustom } from "@/app/lib/components/Table";
import { deleteSlider } from "@/app/services/home";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { sliderHead } from "./tablehead";
import Pagination from "@/app/lib/components/Pagination";
import { Box, Button, Flex } from "@/app/lib";
import Spinner from "@/app/components/Spinner";
import { deletecategory, getcategory } from "@/app/services/category";
import { useRouter } from "next/navigation";
import ButtonComp from "@/app/components/Button";

const ViewSlider = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const {
    data: category,
    isLoading: categoryLoading,
    refetch,
  } = useQuery(["getcategory", currentPage, 5], () =>
    getcategory(currentPage, 5),
  );
  const { mutate, isLoading: loading } = useMutation<any, Error, number>(
    (categoryId) => deletecategory(categoryId),
    {
      onSuccess: (data) => {
        !loading && refetch();
      },
    },
  );

  const handleDelete = (categoryId: number) => {
    mutate(categoryId);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const TableRows = category?.category
    ? category?.category?.map((item: any, index: number) => ({
        cells: [
          { cell: () => <span> {item?.categoryId}</span> },
          { cell: () => <span> {item?.name}</span> },
          {
            cell: () => (!item?.active ? <> False </> : <span>true</span>),
          },
          {
            cell: () => (
              <ButtonComp
                func={() => handleDelete(item?.categoryId)}
                text="Delete"
                className="max-w-[100px]"
              />
            ),
          },
        ],
      }))
    : [];
  return (
    <Box className="py-20 min-h-screen">
      {categoryLoading ? (
        <Box className="flex items-center justify-center h-screen">
          <Spinner height="h-20" width="w-20" />
        </Box>
      ) : (
        <>
          <Flex justify="end">
            <Button
              variant="primarySmall"
              className="mb-4"
              onClick={() => {
                router.push("/admin/category/add");
              }}
            >
              Add
            </Button>
          </Flex>
          <TableCustom
            heads={sliderHead}
            rows={TableRows}
            thAlign="start"
            thBorder="solid"
            tdAlign="start"
            tdBorder="solid"
          />
          <Pagination
            currentPage={currentPage}
            totalPages={category?.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Box>
  );
};

export default ViewSlider;
