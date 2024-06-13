"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { logout, profile } from "../services/user";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Cart, Container } from "../lib";
import useAuth from "../hooks/useAuth";
import { logoutSuccess } from "../lib/Reducers/loginreducer";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import useTwElements from "../hooks/useTwElements";
import SearchBar from "./SearchBar";
import Cookies from "js-cookie"; // Import js-cookie

const Navbar = () => {
  const router = useRouter();
  const twElementsLoaded = useTwElements();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const handleSeeAllClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAllCategories(!showAllCategories);
  };

  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      router.push("/login");
    },
  });

  const { isAdmin, userid } = useAuth();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartData = useSelector((state: any) => state.cart.totalItem);
  const { data: profileData } = useQuery("userprofile", profile, {
    enabled: !!userid ? true : false,
  });
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogoutClick = () => {
    Cookies.remove("token"); // Clear the token cookie from the client side
    mutate();
    dispatch(logoutSuccess());
  };

  return (
    twElementsLoaded && (
      <Box className="fixed w-full bg-gray-800" style={{ zIndex: "999" }}>
        <Container>
          {!isAdmin ? (
            <>
              <Box className="relative flex items-center justify-between h-16">
                <Box className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                    onClick={handleMobileMenuToggle}
                  >
                    <svg
                      className="block w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>

                    <svg
                      className="hidden w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </Box>
                <Box className="flex items-center justify-center flex-1  sm:justify-start items-center">
                  <Box className="flex-shrink-0 hidden sm:block">
                    <Logo />
                  </Box>
                  {!!userid && (
                    <>
                      <Box className="hidden ml-5 sm:block">
                        <Box className="flex space-x-4">
                          <Link
                            href="/"
                            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:text-white"
                            aria-current="page"
                          >
                            Home
                          </Link>
                          <Link
                            href="/aboutus"
                            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:text-white"
                          >
                            About
                          </Link>
                          <Link
                            href="/contactus"
                            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:text-white"
                          >
                            Contact
                          </Link>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
                <Box className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {!!userid ? (
                    <Box className="relative ml-3  sm:py-2">
                      <Box className="flex items-center justify-end">
                        <Link
                          href={isAdmin ? "/admin/profile" : "/profile"}
                          className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-offset-gray-800 text-slate-100"
                        >
                          <Image
                            className="w-8 h-8 rounded-full"
                            src={
                              !!profileData?.data?.profile_image
                                ? profileData?.data?.profile_image
                                : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            }
                            alt=""
                            loader={({ src }) => `${src}?w=256&h=256`}
                            width={256}
                            height={256}
                          />
                        </Link>
                        <Box>
                          <Button
                            onClick={handleLogoutClick}
                            type="button"
                            className="font-thin text-red500 text-1xl"
                          >
                            Logout
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
                        aria-current="page"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-3 py-2 ml-4 text-base font-medium text-white bg-gray-900 rounded-md"
                        aria-current="page"
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </Box>
              </Box>

              {isMobileMenuOpen && (
                <Box className="sm:hidden" id="mobile-menu">
                  {!!userid && (
                    <Box className="px-2 pt-2 pb-3 space-y-1">
                      <Link
                        href="/"
                        className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
                        aria-current="page"
                      >
                        Home
                      </Link>
                      <Link
                        href="/aboutus"
                        className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:text-white"
                      >
                        About
                      </Link>
                      <Link
                        href="/contactus"
                        className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:text-white"
                      >
                        Contact
                      </Link>
                    </Box>
                  )}
                </Box>
              )}
            </>
          ) : (
            <>
              <Box className="pl-2 pr-5">
                <Box className="relative flex items-center justify-end h-16">
                  <Box className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Box className="relative ml-3">
                      <Box className="flex items-center justify-end">
                        <Link
                          href={"/admin/profile"}
                          className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-offset-gray-800 text-slate-100"
                        >
                          <Image
                            className="w-8 h-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            loader={({ src }) => `${src}?w=256&h=256`}
                            width={256}
                            height={256}
                          />
                        </Link>
                        <Box>
                          <Button
                            onClick={handleLogoutClick}
                            type="button"
                            className="font-thin text-red500 text-1xl"
                          >
                            Logout
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Container>
      </Box>
    )
  );
};

export default Navbar;
