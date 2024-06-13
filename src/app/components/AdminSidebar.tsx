// MainSidebar.ts
"use client";
import React from "react";
import { Sidebar, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Flex, HideSidebar, ShowSidebar } from "../lib";
import { HeadingS, StyledMenu } from "./styles";
import {
  RiTeamLine,
  RiCalendar2Line,
  RiFolder2Line,
  RiUserFollowLine,
} from "react-icons/ri";
import Link from "next/link";
import useTwElements from "../hooks/useTwElements";
interface ISidebar {
  theme?: string;
  isSidebarHidden: boolean;
  setIsSidebarHidden: (e: boolean) => void;
}
const AdminSidebar: React.FC<ISidebar> = ({
  theme,
  setIsSidebarHidden,
  isSidebarHidden,
}) => {
  const themeMode = theme === "light" ? "" : "";
  const twElementsLoaded = useTwElements();

  const handleToggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };
  return (
    <>
      {twElementsLoaded && (
        <Sidebar
          style={{
            border: "none",
            position: "fixed",
            zIndex: "999",
            display: "flex",
            overflowY: "auto",
            alignItems: "space-between",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              background: "white",
              display: isSidebarHidden ? "none" : "block",
              minHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <StyledMenu>
              <Flex
                style={{
                  height: "30px",
                  padding: "24px 0",
                  cursor: "pointer",
                  background: "#635FC7",
                }}
                justify="center"
                align="center"
                onClick={handleToggleSidebar}
              >
                <HideSidebar />
                <HeadingS style={{ marginLeft: "8px", color: "white" }}>
                  Hide Sidebar
                </HeadingS>
              </Flex>
              <MenuItem>
                <Link href="/admin/dashboard" legacyBehavior>
                  <a>Dashboard</a>
                </Link>
              </MenuItem>
              <SubMenu defaultOpen label={"Product"} icon={<RiTeamLine />}>
                <MenuItem icon={<RiCalendar2Line />}>
                  <Link href="/admin/product/add" legacyBehavior>
                    <a>Add</a>
                  </Link>
                </MenuItem>
                <MenuItem icon={<RiUserFollowLine />}>
                  <Link href="/admin/product/manage" legacyBehavior>
                    <a>Manage</a>
                  </Link>
                </MenuItem>
              </SubMenu>

              <MenuItem icon={<RiCalendar2Line />}>
                <Link href="/admin/order/listorder" legacyBehavior>
                  <a>Orders</a>
                </Link>
              </MenuItem>
              {/* <MenuItem icon={<RiUserFollowLine />}>
                <Link href="/admin/order/manageorder" legacyBehavior>
                  <a>Manage</a>
                </Link>
              </MenuItem> */}
              <MenuItem icon={<RiUserFollowLine />}>
                <Link href="/admin/slider/manage" legacyBehavior>
                  <a>Slider</a>
                </Link>
              </MenuItem>

              <MenuItem icon={<RiUserFollowLine />}>
                <Link href="/admin/category/manage" legacyBehavior>
                  <a>Category</a>
                </Link>
              </MenuItem>
            </StyledMenu>
            {/* <Flex justify='center' align='center' style={{ background: theme === 'light' ? '#E4EBFA' : "#000112", marginLeft: "20px", width: "185px", padding: "10px" }}>
            <Box style={{ marginRight: "20px", marginTop: "6px" }}><LightIcon /></Box>
            <Switch id="themeSwitch" toggled={theme === 'dark'} onChange={toggleTheme} />
            <Box style={{ marginLeft: "30px", marginTop: "6px" }}><DarkIcon /></Box>
          </Flex> */}
          </Box>
          {isSidebarHidden && (
            <Box
              onClick={handleToggleSidebar}
              style={{
                position: "fixed",
                top: "85%",
                padding: "18px",
                background: "#635FC7",
                borderTopRightRadius: "100%",
                borderBottomRightRadius: "100%",
              }}
            >
              <ShowSidebar />
            </Box>
          )}
        </Sidebar>
      )}
    </>
  );
};

export default AdminSidebar;
