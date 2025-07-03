"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface NavLink {
  id: string;
  title: string;
  href: string;
}

interface NavbarProps {
  navLinks: Array<NavLink>;
  enableBackgroundShadow?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const links: Array<NavLink> = [
  { id: "00", title: "Home", href: "/" },
  { id: "01", title: "Destination", href: "/destination" },
  { id: "02", title: "Crew", href: "/crew" },
  { id: "03", title: "Technology", href: "/tech" },
];

const MobileNavbar = ({
  navLinks,
  open,
  setOpen,
  enableBackgroundShadow,
}: NavbarProps) => {
  const backgroundShadowClass = enableBackgroundShadow ? "bg-black/30" : "";
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <Image
        src="/assets/shared/icon-hamburger.svg"
        alt="menu"
        width={24}
        height={21}
        onClick={() => setOpen!(true)}
        className="lg:hidden"
      />

      <div
        className={`fixed inset-0 z-40  ${backgroundShadowClass} ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
          md:hidden
        `}
        onClick={() => setOpen!(false)}
      ></div>

      <div
        className={`h-screen w-2/3 bg-nav-bg/15 backdrop-blur-xl
            fixed top-0 right-0 z-50 
            transform transform-transition duration-300 ${
              open ? "translate-x-0" : "translate-x-full"
            }
          `}
      >
        <div className="flex flex-col pl-8 gap-12">
          <div
            // className="px-6 py-8 absolute top-0 right-0 z-30 cursor-pointer "
            className=" cursor-pointer self-end py-8 pr-6"
            onClick={() => setOpen!(false)}
          >
            <Image
              src="/assets/shared/icon-close.svg"
              alt="close"
              width={24}
              height={21}
            />
          </div>

          <div className=" box-border text-lg flex flex-col  gap-8 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`font-main-wide uppercase ${
                  isActive(link.href) ? "border-r-4 border-white" : ""
                }`}
              >
                <span className="font-bold mr-3">{link.id}</span>
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface DesktopNavbarProps {
  navLinks: Array<NavLink>;
}

const DesktopNavbar = ({ navLinks }: DesktopNavbarProps) => {
  return (
    <div
      className="hidden lg:flex items-center justify-end px-16 gap-12 w-full font-main-wide uppercase
    bg-white/5 backdrop-blur-xl
    "
    >
      {navLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className="h-24 flex items-center justify-center gap-3"
        >
          <span className="font-bold">{link.id}</span>
          <span className="">{link.title}</span>
        </Link>
      ))}
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center gap-16 w-full lg:-mr-8">
      <Image src="/assets/shared/logo.svg" alt="logo" width={40} height={40} />
      <div className="border-b border-white/25 h-0 w-full  hidden lg:block z-10"></div>
    </div>
  );
};

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex items-center justify-between p-6 lg:pt-10 lg:pl-16 lg:pr-0 lg:pb-0 ">
      <Logo />

      <DesktopNavbar navLinks={links} />

      <MobileNavbar navLinks={links} open={open} setOpen={setOpen} />
    </div>
  );
}
