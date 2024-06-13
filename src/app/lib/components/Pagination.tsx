"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Flex } from "../Ui";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    const pagesToShow = 3; // Number of pages to show
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let newStartPage = Math.max(1, currentPage - halfPagesToShow);
    const maxStartPage = totalPages - pagesToShow + 1;
    newStartPage = Math.min(newStartPage, maxStartPage);
    newStartPage = Math.max(1, newStartPage); // Ensure startPage is greater than 0
    setStartPage(newStartPage);
  }, [currentPage, totalPages]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const endPage = Math.min(startPage + 2, totalPages);
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <Box key={i} className="p-2">
          <Button
            onClick={() => handlePageChange(i)}
            variant={currentPage === i ? "destructive" : "primaryLarge"}
          >
            {i}
          </Button>
        </Box>,
      );
    }
    return pageButtons;
  };

  return totalPages > 1 ? (
    <Flex justify="center" align="center" className="mt-4">
      <Button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        variant="primaryLarge"
      >
        Previous
      </Button>
      {renderPageButtons()}
      <Button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        variant="primaryLarge"
      >
        Next
      </Button>
    </Flex>
  ) : null;
};

export default Pagination;
