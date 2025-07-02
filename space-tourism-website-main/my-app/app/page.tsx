import Link from "next/link";
import { bellefair, barlow } from "./fonts";

export default function Home() {
  return (
    <div className="flex flex-col p-6 items-center gap-6 h-full">
      <span className="font-main-wide">SO, YOU WANT TO TRAVEL TO</span>
      <span className={`${bellefair.className} text-[5rem]`}>SPACE</span>
      <span className={`${barlow.className} text-[15px] text-center`}>
        Let’s face it; if you want to go to space, you might as well genuinely
        go to outer space and not hover kind of on the edge of it. Well sit
        back, and relax because we’ll give you a truly out of this world
        experience!
      </span>
      <Link
        href="/destination"
        className={`bg-white w-36 h-36 flex items-center justify-center text-black rounded-full text-lg ${bellefair.className} 
        m-auto
        `}
      >
        <span className="">EXPLORE</span>
      </Link>
    </div>
  );
}
