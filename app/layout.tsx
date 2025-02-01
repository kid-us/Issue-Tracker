import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Head from "next/head";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-roboto",
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        ></link>
      </head>
      <body
        className={`${roboto.variable} ${poppins.variable} antialiased container mx-auto`}
      >
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}
