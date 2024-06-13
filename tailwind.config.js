import { withUt } from "uploadthing/tw";
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        focus: "#BEF264",
        white: "#FFFFFF",
        black: "#000000",
        charcoalGrey: "#1E1E1E",
        grey24: "#3D3D3D",
        mediumGrey: "#6E6E6E",
        lightGrey: "#9E9E9E",
        brightGrey: "#D3D3D3",
        blue: "#0037FC",
        green: "#3FFF75",
        purple: "#9757D7",
        pink: "#EF466F",
        zinc: "#52525B",
        grey300: "#C8C8C8",
        charcoalGrey2: "#121212",
        darkGrey: "#373737",
        brightGrey2: "#EDEDED",
        darkGrey2: "#B0B0B0",
        grey400: "#A4A4A4",
        grey500: "#808080",
        pebbleGrey: "#262626",
        lightBlue: "#C9F5FF",
        lightWhite: "#D9D9D9",
        lightRed: "#FF705B",
        red500: "#EF4444",
      },
      fontSize: {
        tiny: "0.75rem", // text-tiny
        small: "0.875rem", // text-small
        medium: "1rem", // text-medium
        large: "1.125rem", // text-large
      },
      listStyleType: {
        none: "none",
        disc: "disc",
        decimal: "decimal",
        square: "square",
        roman: "upper-roman",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const customColors = theme("colors", {});
      addComponents({
        ".btn": {
          padding: "0.5rem 1rem !important",
          borderRadius: ".25rem !important",
          fontWeight: "600 !important",
          fontSize: "1rem !important",
          color: `${customColors.white} !important`,
          backgroundColor: `${customColors.blue} !important`,
        },
        ".container": {
          width: "100% !important",
          maxWidth: "1920px !important",
          margin: "0 auto !important",
        },
      });
    }),
  ],
  tailwindFunctions: ["tv"],
});
