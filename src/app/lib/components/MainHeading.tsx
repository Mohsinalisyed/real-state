import React from "react";
import { Box } from "../Ui";
import { HeadingL } from "@/app/components/styles";

export const MainHeading: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Box className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-700 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-700">
      <HeadingL
        className="px-4 py-1 mb-0 font-semibold text-center border-red text-red-500"
        style={{ border: "black solid 1px", borderRadius: "50px" }}
      >
        {title}
      </HeadingL>
    </Box>
  );
};
