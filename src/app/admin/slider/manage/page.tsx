"use client";
import { TableCustom } from "@/app/lib/components/Table";
import { deleteSlider, getslider } from "@/app/services/home";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { sliderHead } from "./tablehead";
import Pagination from "@/app/lib/components/Pagination";
import { Box, Button, Flex } from "@/app/lib";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";
import ButtonComp from "@/app/components/Button";

const ViewSlider = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: slider,
    isLoading: sliderLoading,
    refetch,
  } = useQuery(["getslider", currentPage, 5], () => getslider(currentPage, 5));
  const { mutate, isLoading: loading } = useMutation<any, Error, number>(
    (sliderId) => deleteSlider(sliderId),
    {
      onSuccess: (data) => {
        !loading && refetch();
      },
    },
  );

  const handleDelete = (sliderId: number) => {
    mutate(sliderId);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const TableRows = slider?.sliders
    ? slider?.sliders?.map((item: any, index: number) => ({
        cells: [
          { cell: () => <span> {item?.sliderId}</span> },
          { cell: () => <span> {item?.caption}</span> },

          {
            cell: () => (
              <>
                <Image
                  src={item?.imageUrl}
                  alt="Sample image"
                  className=" h-20 w-20  flex items-center justify-center bg-white"
                  loader={({ src }) => `${src}?w=256&h=256`}
                  width={256}
                  height={256}
                />
              </>
            ),
          },
          {
            cell: () => (!item?.active ? <> False </> : <span>true</span>),
          },
          {
            cell: () => (
              <ButtonComp
                func={() => handleDelete(item?.sliderId)}
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
      {sliderLoading ? (
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
                router.push("/admin/slider/add");
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
            totalPages={slider?.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Box>
  );
};

export default ViewSlider;
