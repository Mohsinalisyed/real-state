"use client";
import React from "react";
import Footer from "./Footer";
import useIsClient from "../hooks/useIsClient";
import { Box } from "../lib";
import { usePathname } from "next/navigation"; // Import usePathname

const UserFooter = () => {
  const isClient = useIsClient();
  const pathname = usePathname(); // Get the current path

  // Check if the current route is /cart
  const isCartRoute = isClient && pathname === "/cart";
  const isAdminRoute = isClient && pathname.startsWith("/admin");
  return <Box>{isClient && !isCartRoute && !isAdminRoute && <Footer />}</Box>;
};

export default UserFooter;
