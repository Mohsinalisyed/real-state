import React from "react";
import { Box } from "../lib";

const Spinner = ({ variant = "success", height = "h-4", width = "w-4" }) => {
  return (
    <Box
      className={`inline-block ${height} ${width} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-${variant} motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </Box>
  );
};

export default Spinner;
