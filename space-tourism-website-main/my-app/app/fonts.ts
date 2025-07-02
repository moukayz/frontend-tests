import { Barlow_Condensed, Barlow, Bellefair } from "next/font/google";
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-barlow-condensed",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-barlow",
});

const bellefair = Bellefair({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bellefair",
});

export { barlowCondensed, barlow, bellefair };
