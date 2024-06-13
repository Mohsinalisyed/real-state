import React from "react";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryProvider from "./provider/QueryProvider";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import UserFooter from "./components/UserFooter";
import { CartProvider } from "./hooks/useCart";
import Navbar from "./components/Navbar";
import Head from "next/head"; // Import Head from next/head

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RealState",
  description: "RealState",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <body className={inter.className}>
        <StoreProvider>
          <QueryProvider>
            <CartProvider>
              <Navbar />
              <div>{children}</div>
              <UserFooter />
            </CartProvider>
            <ToastContainer />
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
