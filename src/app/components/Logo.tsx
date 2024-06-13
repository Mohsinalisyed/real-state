import React from "react";
import { Flex } from "../lib";

const Logo = () => {
  return (
    <Flex align="center">
      <svg
        width="40px"
        height="40px"
        viewBox="0 0 14 14"
        role="img"
        focusable="false"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(.13043484 .04347832) scale(.28986)">
          <g fill="gray">
            <path d="M18 32c-1.1 0-2-.9-2-2V20h-4v10c0 3.3 2.7 6 6 6h19v-4H18z" />

            <path d="M12.8 10l-.4-1.3C11.8 7.1 10.3 6 8.6 6H5v4h3.6l5.5 16.6c.3.8 1 1.4 1.9 1.4h19c.8 0 1.5-.5 1.8-1.2L44.4 10H12.8z" />
          </g>

          <circle cx="5" cy="8" r="2" fill="#00695c" />

          <g fill="#37474f">
            <circle cx="34" cy="39" r="3" />

            <circle cx="19" cy="39" r="3" />
          </g>

          <g fill="#607d8b">
            <circle cx="34" cy="39" r="1" />

            <circle cx="19" cy="39" r="1" />
          </g>
        </g>
      </svg>
      <svg
        width="100"
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
            Q-<tspan className="text-buy text-red-500">Buy</tspan>
          </text>
        </g>
      </svg>
    </Flex>
  );
};

export default Logo;
