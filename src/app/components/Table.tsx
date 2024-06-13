"use client";
import React, { useState } from "react";
import { Box } from "../lib";

const DynamicTable = ({ columns, data, isLoading }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const renderTableHeader = () => {
    return (
      <tr className="text-black ">
        {columns.map((column: any) => (
          <th key={column.field} className="px-4 py-2 text-center">
            {column.label}
          </th>
        ))}
      </tr>
    );
  };

  const renderTableBody = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return (
      <tbody>
        {data.slice(startIndex, endIndex).map((row: any) => (
          <tr key={row.id} className="transition hover:bg-gray-100">
            {columns.map((column: any) => (
              <td key={column.field} className="px-4 py-2 text-center">
                {row[column.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const totalPages = Math.ceil(data?.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box className="w-full">
      <table className="w-full border border-gray-300">
        <thead>{renderTableHeader()}</thead>
        {data?.length > 0 ? (
          renderTableBody()
        ) : (
          <tr>
            <td colSpan={columns.length} className="py-4 text-center">
              No data available
            </td>
          </tr>
        )}
      </table>
    </Box>
  );
};

export default DynamicTable;
