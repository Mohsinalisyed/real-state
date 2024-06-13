import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      mixture: "from-[#3FFF75] to-[#0037FC]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:to- dark:from-[#FFFFFF]",
      black: "from-[#000001] to-[#000001]",
      gray: "from-[#808080] to-[#808080]",
    },
    size: {
      sm: "text-sm lg:text-xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-xl lg:text-2xl",
    },
    fullWidth: {
      true: "w-full block",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "mixture",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-br",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

// override the default variants
subtitle({
  fullWidth: true,
});

export const card = tv({
  slots: {
    base: "md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-gray-900",
    avatar:
      "w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto drop-shadow-lg",
    wrapper: "flex-1 pt-6 md:p-8 text-center md:text-left space-y-4",
    description: "text-md font-medium",
    infoWrapper: "font-medium",
    name: "text-sm text-sky-500 dark:text-sky-400",
    role: "text-sm text-slate-700 dark:text-slate-500",
  },
});
export const button = tv({
  base: "font-semibold text-white py-1 px-3 rounded-lg active:opacity-80",
  variants: {
    color: {
      primary: "bg-blue hover:bg-lightGrey",
      secondary: "bg-purple hover:bg-blue",
      success: "bg-green hover:bg-lightRed text-gray",
      error: "bg-red500 hover:bg-lightGrey",
    },
    size: {
      sm: "p-2",
      md: "p-3",
      lg: "py-2 px-6",
    },
  },
});
