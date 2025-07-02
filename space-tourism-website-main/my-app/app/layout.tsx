import Image from "next/image";
import "./globals.css";
import { barlowCondensed } from "./fonts";
// import { usePathname } from "next/navigation";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-6">
      <Image src="/assets/shared/logo.svg" alt="logo" width={40} height={40} />
      <Image
        src="/assets/shared/icon-hamburger.svg"
        alt="menu"
        width={24}
        height={21}
      />
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-(image:--home-bg-current) bg-cover bg-center  ${barlowCondensed.className} antialiased flex flex-col h-screen `}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
