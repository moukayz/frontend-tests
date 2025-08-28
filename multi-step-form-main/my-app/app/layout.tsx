import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} antialiased h-screen 
        bg-sidebar-mobile bg-top bg-no-repeat bg-[length:100%_auto] md:bg-none bg-blue-100 md:flex md:justify-center md:items-center`}
      >
        {children}
      </body>
    </html>
  );
}
