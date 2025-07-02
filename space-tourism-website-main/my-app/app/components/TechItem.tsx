"use client";
import { useState } from "react";
import Image from "next/image";

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
  const activeItem = techItems[activeIndex];
  return (
    <div className="flex flex-col gap-8">
      {/* image view */}
      <div className="mt-16  w-screen -ml-6">
        <Image
          src={activeItem.images.portrait}
          alt={activeItem.name}
          // fill={true}
          width={500}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* main content */}
      <div className="flex flex-col gap-10">
        {/* nav buttons */}
        <div className="flex gap-4 justify-center">
          {techItems.map((item, index) => (
            <button
              onClick={() => setActiveIndex(index)}
              key={item.name}
              className={`w-10 h-10 rounded-full border border-white/50
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
        <div className="flex flex-col gap-4 font-focus  items-center">
          <span className="text-lg opacity-50 uppercase">
            The terminology...
          </span>
          <span className="text-2xl uppercase">{activeItem.name}</span>
          <span className="text-light-blue font-paragraph min-h-[6lh] text-center ">
            {activeItem.description}
          </span>
        </div>
      </div>
    </div>
  );
}
