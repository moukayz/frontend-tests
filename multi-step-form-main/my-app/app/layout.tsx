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
        bg-[url('/images/bg-sidebar-mobile.svg')] bg-top bg-no-repeat bg-[length:100%_auto] bg-blue-100`}
      >
        {children}
      </body>
    </html>
  );
}
