"use client";
import "./globals.css";
import { Epilogue } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type NavLink = {
  title: string;
  icon: string | null;
  sublinks?: NavLink[];
};

const NavLinks: NavLink[] = [
  {
    title: "Features",
    icon: null,
    sublinks: [
      {
        title: "Todo List",
        icon: "/images/icon-todo.svg",
      },
      {
        title: "Calendar",
        icon: "/images/icon-calendar.svg",
      },
      {
        title: "Reminders",
        icon: "/images/icon-reminders.svg",
      },
      {
        title: "Planning",
        icon: "/images/icon-planning.svg",
      },
    ],
  },
  {
    title: "Company",
    icon: null,
    sublinks: [
      {
        title: "History",
        icon: null,
      },
      {
        title: "Our Team",
        icon: null,
      },
      {
        title: "Blog",
        icon: null,
      },
    ],
  },
  {
    title: "Careers",
    icon: null,
    sublinks: [],
  },
  {
    title: "About",
    icon: null,
    sublinks: [],
  },
];

const NavBarItem = ({ item }: { item: NavLink }) => {
  if (item.sublinks === undefined || item.sublinks.length === 0) {
    return (
      <div className="">
        <span className="">{item.title}</span>
      </div>
    );
  }

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="md:relative" ref={containerRef}>
      <button
        className="flex gap-4 items-center md:cursor-pointer md:gap-2"
        onClick={() => setOpen(!open)}
      >
        <span>{item.title}</span>
        {open ? (
          <img src="/images/icon-arrow-up.svg" alt="arrow" />
        ) : (
          <img src="/images/icon-arrow-down.svg" alt="arrow" />
        )}
      </button>

      <ul
        className={`bg-white grid 
          transform transition-all duration-200 md:overflow-auto min-w-max
          md:absolute md:top-full md:left-0 md:bg-white md:z-70 md:mt-2 md:rounded-lg md:shadow-lg
        ${
          open
            ? "opacity-100 grid-rows-[1fr] pt-6 pb-2 md:p-0"
            : "opacity-0 grid-rows-[0fr]"
        }
      `}
      >
        <div className="pl-6 w-full flex flex-1 flex-col gap-4 min-h-0 md:p-6 whitespace-nowrap">
          {item.sublinks?.map((sublink) => (
            <li key={sublink.title} className="flex gap-4 items-center">
              {sublink.icon && <img src={sublink.icon} alt={sublink.title} />}
              <span>{sublink.title}</span>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

interface NavBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  navLinks: NavLink[];
}

const NavBar = ({ open, setOpen, navLinks }: NavBarProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
          md:hidden
        `}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`h-screen w-2/3 bg-white md:bg-transparent fixed top-0 right-0 z-50 transform transform-transition duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }
          md:relative md:w-full md:h-auto md:translate-x-0 md:transform-none 
          `}
      >
        <div
          className="p-4 absolute top-0 right-0 z-30 cursor-pointer md:hidden"
          onClick={() => setOpen(false)}
        >
          <img src="/images/icon-close-menu.svg" alt="close" />
        </div>

        <div className="mt-20 md:mt-0 box-border flex flex-col md:flex-row md:justify-start md:items-center gap-4 md:gap-8 py-4 p-6 md:px-10 md:py-0 text-gray-500 font-medium">
          {navLinks.map((link) => (
            <NavBarItem key={link.title} item={link} />
          ))}

          <div className="pt-10 md:pt-0 md:ml-auto text-center ">Login</div>
          <button className="text-center border-2 border-gray-500 py-1 rounded-xl md:px-4">
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${epilogue.className} antialiased h-screen bg-gray-100 md:flex flex-col`}
      >
        <div className="flex justify-between items-center py-4 px-4">
          <span className="text-2xl font-bold">snap</span>
          <NavBar open={navOpen} setOpen={setNavOpen} navLinks={NavLinks} />
          <img
            className="block md:hidden"
            src="/images/icon-menu.svg"
            alt="menu"
            onClick={() => setNavOpen(true)}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
