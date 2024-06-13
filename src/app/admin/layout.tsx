"use client";
import { ReactNode, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Box } from "../lib";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  return (
    <>
      <Box className="fixed min-h-screen pt-16">
        <AdminSidebar
          setIsSidebarHidden={(e) => setIsSidebarHidden(e)}
          isSidebarHidden={isSidebarHidden}
        />
      </Box>
      <Box
        style={{
          width: isSidebarHidden ? "100%" : "75%",
          marginLeft: isSidebarHidden ? "0%" : "20%",
        }}
        className="px-4 pt-20"
      >
        {children}
      </Box>
    </>
  );
}
