"use client";

import Image from "next/image";
import { useState } from "react";

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
  const activeItem = crewItems[activeIndex];
  return (
    <div className="flex flex-col gap-8">
      {/* crew intro */}
      <div className="pt-10 flex flex-col gap-6 items-center ">
        {/* name and title */}
        <div className="flex flex-col gap-2 items-center font-focus uppercase">
          <span className="text-lg opacity-50">{activeItem.role}</span>
          <span className="text-2xl">{activeItem.name}</span>
        </div>

        {/* bio */}
        <span className="text-light-blue font-paragraph min-h-[6lh] text-center">
          {activeItem.bio}
        </span>

        {/* crew navigation */}
        <div className="flex gap-4">
          {crewItems.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full bg-white ${
                  index === activeIndex ? "opacity-100" : "opacity-17"
                }`}
              ></button>
            );
          })}
        </div>
      </div>

      {/* crew images */}
      <div className="flex p-2 justify-center">
        <Image
          src={activeItem.images.webp}
          alt={activeItem.name}
          width={270}
          height={340}
          className="h-[340px] w-auto mask-b-from-77% mask-b-to-100%"
        />
      </div>
    </div>
  );
}
