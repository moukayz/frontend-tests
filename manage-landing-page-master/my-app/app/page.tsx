"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import nextConfig from "@/next.config";

const basePath = nextConfig.basePath ?? "";

const intros = [
  {
    image: "/images/avatar-ali.png",
    name: "Ali Bravo",
    description:
      "We have been able to cancel so many other subscriptions since using manage. There is no more cross-channel confusion and everyone is much more focused.",
  },
  {
    image: "/images/avatar-anisha.png",
    name: "Anisha Li",
    description:
      "Manage has supercharged our team’s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.",
  },
  {
    image: "/images/avatar-richard.png",
    name: "Richard Watts",
    description:
      "Manage allows us to provide structure and process. It keeps us organized and focused. I can’t stop recommending them to everyone I talk to!",
  },
  {
    image: "/images/avatar-shanai.png",
    name: "Shanai Gough",
    description:
      "Their software allows us to track, manage and collaborate on our projects from anywhere. It keeps the whole team in-sync without being intrusive.",
  },
];

function IntroCard({
  image,
  name,
  description,
}: {
  image: string;
  name: string;
  description: string;
}) {
  return (
    <div className="snap-item snap-center bg-stone-200 rounded-sm flex flex-col items-center gap-4 relative overflow-y-visible pt-14 px-6 pb-10 w-[calc(100%-2rem)] shrink-0  lg:w-1/3 mx-4">
      <Image
        src={`${basePath}${image}`}
        alt={name}
        width={50}
        height={50}
        className="w-20 h-20 absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <span className="text-lg font-bold">{name}</span>
      <span className="text-paragraph text-center">{description}</span>
    </div>
  );
}

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    const indicator = scrollIndicatorRef.current;
    if (!container || !indicator || indicator.hidden) return;

    const onScroll = () => {
      const { left: cLeft, width: cWidth } = container.getBoundingClientRect();
      const centerX = cLeft + cWidth / 2;

      let closestIdx = 0;
      let minDist = Infinity;
      container.querySelectorAll(".snap-item").forEach((el, idx) => {
        const { left, width } = el.getBoundingClientRect();
        const itemCenter = left + width / 2;
        const dist = Math.abs(centerX - itemCenter);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });

      setCurrentIndex(closestIdx);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    // run once to initialize
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="my-20 flex flex-col items-center gap-16 w-screen relative">
      <span className="text-3xl font-bold">What they&apos;ve said</span>

      <div
        style={{ scrollbarWidth: "none" }}
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-visible pt-10 w-full snap-x snap-mandatory lg:snap-none"
      >
        {intros.map((intro) => (
          <IntroCard
            key={intro.name}
            image={intro.image}
            name={intro.name}
            description={intro.description}
          />
        ))}
      </div>

      <div
        ref={scrollIndicatorRef}
        className="flex gap-1 absolute bottom-0 left-1/2 -translate-x-1/2 lg:hidden"
      >
        {intros.map((intro, index) => {
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-full border border-red-400 translate-y-8 ${
                index === currentIndex ? "bg-red-400" : ""
              }`}
            ></div>
          );
        })}
      </div>

      <StartButton className="hidden lg:block" />
    </div>
  );
};

const icons = [
  "/images/icon-facebook.svg",
  "/images/icon-youtube.svg",
  "/images/icon-twitter.svg",
  "/images/icon-pinterest.svg",
  "/images/icon-instagram.svg",
];

const Footer = () => {
  return (
    <div className="w-screen  bg-gray-950 px-6 py-8 lg:py-12 text-white">
      <div className=" w-full lg:w-[90%] lg:mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-x-10 ">
        <div className="w-full flex items-center gap-2 col-span-2 lg:col-span-1 lg:col-start-4">
          <textarea
            name=""
            id=""
            rows={1}
            placeholder="Update your inbox..."
            className="bg-white text-black  rounded-full px-6 py-2 flex-1 resize-none"
          ></textarea>
          <button className="px-4 py-2 rounded-full bg-red-400 ">GO</button>
        </div>

        <div className="lg:row-span-2 lg:col-start-2 lg:row-start-1 flex flex-col gap-4 text-base w-fit place-self-center ">
          <span className="">Home</span>
          <span className="">Pricing</span>
          <span className="">Products</span>
          <span className="">About Us</span>
        </div>

        <div className="lg:row-span-2 flex flex-col lg:col-start-3 lg:row-start-1 gap-4 text-base w-fit justify-self-center self-start">
          <span className="">Careers</span>
          <span className="">Community</span>
          <span className="">Privacy Policy</span>
        </div>

        <div className="col-span-2 lg:col-span-1 grid grid-cols-5 gap-4 w-full justify-center items-center place-items-center">
          {icons.map((icon, index) => {
            return (
              <Image
                key={index}
                src={`${basePath}${icon}`}
                alt="icon"
                width={20}
                height={20}
                className="w-2/3 h-auto"
              />
            );
          })}
        </div>

        <Image
          src={`${basePath}/images/logo.svg`}
          alt="logo"
          width={100}
          height={100}
          className="col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 w-1/2  h-auto mx-auto text-white"
        />

        <span className="col-span-2 lg:col-span-1 mx-auto lg:mx-0 text-xs place-self-end">
          Copyright 2020. All Rights Reserved
        </span>
      </div>
    </div>
  );
};

const manageItems = [
  {
    number: "01",
    title: "Track company-wide progress",
    description:
      "See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way done to the smallest of details. Never lose sight of the bigger picture again.",
  },

  {
    number: "02",
    title: "Advanced built-in reports",
    description:
      "Set internal delivery estimates and track progress toward company goals. Our customisable dashboard helps you build out the reports you need to keep key stakeholders informed.",
  },

  {
    number: "03",
    title: "Everything you need in one place",
    description:
      "Stop jumping from one service to another to communicate, store files, track tasks and share documents. Manage offers an all-in-one team productivity solution.",
  },
];

const ManageItem = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-y-2 lg:gap-x-6 w-full items-center text-base">
      <span className="font-bold rounded-full bg-red-400 text-white ml-4 lg:ml-0 px-6 py-2 inline-flex items-center justify-center">
        {number}
      </span>
      <span className="font-bold bg-red-100 lg:bg-transparent py-2 pl-8 lg:pl-0 -ml-4 lg:-ml-0 z-[-1] tracking-tighter">
        {title}
      </span>
      <span className="col-span-2 lg:col-start-2 text-paragraph px-4 lg:px-0">
        {description}
      </span>
    </div>
  );
};

const StartButton = ({ className }: { className?: string }) => {
  return (
    <button
      className={`px-4 py-2 rounded-full bg-red-400 text-white my-6 lg:my-0 font-bold shadow-lg shadow-red-400/50 ${className}`}
    >
      Get Started
    </button>
  );
};

export default function Home() {
  return (
    <>
      <div className="flex flex-col px-8 lg:px-0 gap-20 lg:w-[80%] mx-auto">
        {/* illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center place-items-end">
          <Image
            src={`${basePath}/images/illustration-intro.svg`}
            alt="illustration-intro"
            width={500}
            height={500}
            className="lg:w-full lg:h-auto"
          />

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2 lg:gap-8 lg:col-start-1 lg:row-start-1">
            <span className="text-4xl lg:text-6xl  font-bold leading-12 lg:leading-16">
              Bring everyone together to build better products.
            </span>
            <span className="text-gray-500 lg:text-2xl ">
              Manage makes it simple for software teams to plan day-to-day tasks
              while keeping the larger team goals in view.
            </span>

            <StartButton />
          </div>
        </div>

        {/* manager difference */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          <div className="flex flex-col text-center gap-4 lg:items-start lg:text-left">
            <span className="text-3xl lg:text-4xl font-bold leading-12">
              What&apos;s different about Manage?
            </span>
            <span className="text-paragraph w-[32ch]">
              Manage provides all the functionality your team needs, without the
              complexity. Our software is tailor-made for modern digital product
              teams.
            </span>
          </div>

          <div className="flex flex-col w-screen lg:w-auto min-w-0 -mx-8 lg:-mx-0 gap-y-12 ">
            {manageItems.map((item, index) => {
              return (
                <ManageItem
                  key={index}
                  number={item.number}
                  title={item.title}
                  description={item.description}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Slider />
      <Footer />
    </>
  );
}
