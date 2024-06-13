import React from "react";
import { Flex } from "../lib";

const Logo = () => {
  return (
    <Flex align="center">
      <svg
        width="150"
        height="30"
        viewBox="0 0 100 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
                      .ebuy-logo .text-ebuy {
                           font: bold 24px Arial, sans-serif;
                        fill: #1e90ff;
                            }
                          .ebuy-logo .text-buy {
                           fill: red;
                          }
                        `}
        </style>
        <g className="ebuy-logo">
          <text x="10" y="25" className="text-ebuy">
            Real<tspan className="text-buy text-red-500">State</tspan>
          </text>
        </g>
      </svg>
    </Flex>
  );
};

export default Logo;
