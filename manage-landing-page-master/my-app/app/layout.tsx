"use client";

import Image from "next/image";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { useState } from "react";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  return (
    <html lang="en">
      <body className={`${beVietnamPro.variable} antialiased bg-stone-100`}>
        <div className="flex items-center justify-between px-4 py-8 relative">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={50}
            height={50}
            className="h-5 w-auto"
          />
          {!open ? (
            <Image
              src="/images/icon-hamburger.svg"
              alt="logo"
              width={50}
              height={50}
              className="h-5 w-auto"
              onClick={() => setOpen(true)}
            />
          ) : (
            <Image
              src="/images/icon-close.svg"
              alt="logo"
              width={50}
              height={50}
              className="h-5 w-auto"
              onClick={() => setOpen(false)}
            />
          )}

          <div
            className={`absolute top-full left-0 w-full h-screen bg-linear-to-b from-transparent to-black/30 z-20 transition-opacity duration-200 ${
              open
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setOpen(false)}
          ></div>
          <div
            className={`absolute top-full w-full left-0 transition-all z-50 duration-200 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }  `}
          >
            <div className="mx-4 bg-white py-8 flex flex-col gap-4 items-center rounded-lg font-bold z-50">
              <span>Home</span>
              <span>Pricing</span>
              <span>Products</span>
              <span>About Us</span>
              <span>Careers</span>
              <span>Community</span>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
