"use client";

import Image from "next/image";
import { useState } from "react";
import Fadable from "./Fadable";
import { BASE_PATH } from "@/app/globals";

export interface CrewItem {
  name: string;
  role: string;
  bio: string;
  images: {
    png: string;
    webp: string;
  };
}

export interface CrewInfoProps {
  crewItems: CrewItem[];
}

export default function CrewInfo({ crewItems }: CrewInfoProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const crewBrief = (item: CrewItem) => {
    return (
      <>
        <div className="flex flex-col gap-2 items-center lg:items-start font-focus uppercase">
          <span className="text-lg lg:text-[2rem] opacity-50">{item.role}</span>
          <span className="text-2xl lg:text-[3.5rem]">{item.name}</span>
        </div>

        {/* bio */}
        <span className="text-light-blue font-paragraph lg:text-lg min-h-[6lh] text-center">
          {item.bio}
        </span>
      </>
    );
  };

  return (
    <div className="flex-1 min-h-0 grid  lg:h-auto lg:my-auto grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 items-center gap-8 ">
      {/* crew intro */}
      <div className="pt-10 flex flex-col gap-6 items-center lg:items-start  lg:pt-0 lg:justify-center">
        <div className="grid ">
          {crewItems.map((item, index) => {
            return (
              <Fadable
                key={index}
                show={activeIndex === index}
                fadeMs={500}
                className="flex flex-col gap-6 lg:items-start justify-center"
              >
                {crewBrief(item)}
              </Fadable>
            );
          })}
        </div>

        {/* crew navigation */}
        <div className="flex gap-4 lg:gap-8 lg:absolute lg:bottom-0 lg:left-0 lg:-translate-y-24 ">
          {crewItems.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-white ${
                  index === activeIndex ? "opacity-100" : "opacity-17"
                }`}
              ></button>
            );
          })}
        </div>
      </div>

      {/* crew images */}
      <div className="grid h-full">
        {crewItems.map((item, index) => {
          return (
            <Fadable
              key={index}
              show={activeIndex === index}
              fadeMs={500}
              className="h-full min-h-0 flex items-center justify-center"
            >
              <Image
                src={`${BASE_PATH}${item.images.webp}`}
                alt={item.name}
                width={300}
                height={300}
                className="h-full w-auto lg:w-4/5 lg:h-auto mask-b-from-77% mask-b-to-100%"
              />
            </Fadable>
          );
        })}
      </div>
    </div>
  );
}
