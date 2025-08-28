"use client";
import { useState } from "react";
import Image from "next/image";
import Fadable from "./Fadable";
import { BASE_PATH } from "../globals";

export interface TechItem {
  name: string;
  description: string;
  images: {
    portrait: string;
    landscape: string;
  };
}

export interface TechInfoProps {
  techItems: TechItem[];
}

export default function TechInfo({ techItems }: TechInfoProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col w-full lg:flex-row-reverse lg:items-center lg:my-auto gap-8">
      {/* image view */}
      <div className="grid lg:basis-1/2">
        {techItems.map((item, index) => (
          <Fadable
            key={index}
            show={activeIndex === index}
            fadeMs={500}
            className="mt-16 lg:mt-0  w-screen lg:w-full -ml-6 lg:ml-0"
          >
            <Image
              src={`${BASE_PATH}${item.images.portrait}`}
              alt={item.name}
              // fill={true}
              width={500}
              height={500}
              className="w-full aspect-[4/3] lg:aspect-auto object-cover object-bottom"
            />
          </Fadable>
        ))}
      </div>

      {/* main content */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:basis-1/2">
        {/* nav buttons */}
        <div className="flex lg:flex-col gap-4 justify-center">
          {techItems.map((item, index) => (
            <button
              onClick={() => setActiveIndex(index)}
              key={item.name}
              className={`w-10 h-10 lg:w-20 lg:h-20 lg:text-[2rem] rounded-full border border-white/50
                ${
                  activeIndex === index
                    ? "bg-white text-nav-bg"
                    : "bg-transparent text-white"
                }
                `}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* description */}
        <div className="flex flex-col gap-4 font-focus  items-center lg:items-start lg:justify-center">
          <div className="grid">
            {techItems.map((item, index) => (
              <Fadable
                key={index}
                show={activeIndex === index}
                fadeMs={500}
                className="flex flex-col gap-4 items-center lg:items-start lg:justify-center"
              >
                <span className="text-lg lg:text-[2rem] opacity-50 uppercase">
                  The terminology...
                </span>
                <span className="text-2xl lg:text-[3.5rem] uppercase">
                  {item.name}
                </span>
                <span className="text-light-blue font-paragraph lg:text-lg min-h-[6lh] text-center lg:text-left">
                  {item.description}
                </span>
              </Fadable>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
