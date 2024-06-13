"use client";
import Spinner from "@/app/components/Spinner";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { listorder, updatestatus } from "@/app/services/order";
import { formatTimestamp } from "@/app/utils/functions";
import Pagination from "@/app/lib/components/Pagination";
import { Box, Button } from "@/app/lib";
import { OrderStatus } from "@/app/utils/enums/order";
import { useRouter } from "next/navigation";

const ListOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery(
    ["listorder", currentPage],
    () => listorder(currentPage),
  );
  const { mutate: updateProduct, isLoading: updateLoading } = useMutation<
    any,
    Error,
    any
  >(({ updatedData }) => updatestatus(updatedData), {
    onSuccess: () => {
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
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <Box className="flex items-center justify-center min-h-screen pt-20 flex-col">
      {isLoading ? (
        <Box className="flex items-center justify-center min-h-screen">
          <Spinner height="h-20" width="w-20" />
        </Box>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.orders?.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{item?.orderId}</td>
                  <td>{item.username}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.paid ? "yes" : "no"}</td>
                  <td>
                    <select
                      id="orderStatus"
                      value={item?.status}
                      onChange={(e) =>
                        handleStatusChange(e, item?.userid, item?.orderId)
                      }
                    >
                      {Object.values(OrderStatus).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{formatTimestamp(item.date)}</td>
                  <td>
                    {" "}
                    <Button
                      className="px-2 py-1 transition rounded text-gray bg-green hover:bg-green-700"
                      onClick={() =>
                        router.push(`/admin/order/view?orderId=${item._id}`)
                      }
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default ListOrder;
