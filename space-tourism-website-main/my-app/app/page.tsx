import Link from "next/link";

export default function Home() {
  return (
    <div className="flex   flex-grow lg:py-20 ">
      <div
        className="lg:mt-auto lg:mx-auto flex flex-col lg:flex-row items-center justify-start flex-grow
    lg:justify-center 
    "
      >
        <div className="flex flex-col items-center gap-6 max-w-[540px] lg:items-start">
          <span className="font-main-wide lg:text-[1.75rem]">
            SO, YOU WANT TO TRAVEL TO
          </span>
          <span className={`font-focus text-[5rem] lg:text-[9rem]`}>SPACE</span>
          <span
            className={`font-paragraph text-center lg:text-lg lg:text-left`}
          >
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!
          </span>
        </div>

        <div className="max-w-[540px] flex-grow flex items-center justify-end">
          <Link
            href="/destination"
            className={`bg-white w-36 h-36 flex items-center justify-center text-black rounded-full text-lg font-focus
        lg:w-68 lg:h-68 lg:text-[2rem]
        `}
          >
            <span className="">EXPLORE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
