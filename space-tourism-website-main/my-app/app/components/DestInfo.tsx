"use client";
import Image from "next/image";
import { useState } from "react";
import Fadable from "./Fadable";

export interface DestItem {
  name: string;
  images: {
    png: string;
    webp: string;
  };
  description: string;
  distance: string;
  travel: string;
}

export interface DestInfoProps {
  destItems: Array<DestItem>;
}

export default function DestInfo({ destItems }: DestInfoProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  //   const activeItem = destItems[activeIndex];

  const imageView = () => {
    return (
      <div className="grid w-full ">
        {destItems.map((item, index) => {
          return (
            <Fadable
              key={index}
              show={activeIndex === index}
              fadeMs={500}
              className="flex items-center justify-center w-full py-6"
            >
              <Image
                src={item.images.png}
                alt={item.name}
                width={150}
                height={150}
              />
            </Fadable>
          );
        })}
      </div>
    );
  };

  const mainContent = () => {
    const navBar = (
      <div className="flex items-start h-8 gap-8 text-sm font-main-wide uppercase">
        {destItems.map((item, index) => (
          <div
            onClick={() => setActiveIndex(index)}
            key={index}
            className={` h-full   cursor-pointer
                transition-all duration-500 ease-in-out 
                 ${
                   activeIndex === index
                     ? "text-white border-b-2 border-white"
                     : "text-light-blue border-b-2 border-transparent"
                 }`}
          >
            {item.name}
          </div>
        ))}
      </div>
    );

    const description = (
      <div className="grid w-full">
        {destItems.map((item, index) => {
          return (
            <Fadable
              key={index}
              show={activeIndex === index}
              fadeMs={500}
              className="flex flex-col items-center text-center  gap-4"
            >
              <span className={`font-focus text-[3.5rem] uppercase`}>
                {item.name}
              </span>
              <span className="text-light-blue font-paragraph min-h-[5lh]">
                {item.description}
              </span>
            </Fadable>
          );
        })}
      </div>
    );

    const stats = (
      <div className="flex flex-col gap-6 w-full">
        {statsItem("Avg. distance", destItems, "distance")}
        {statsItem("Est. travel time", destItems, "travel")}
      </div>
    );

    return (
      <div className="flex flex-col items-center gap-6">
        {navBar}

        {description}

        <span className="w-full h-0 border border-white/25"></span>

        {stats}
      </div>
    );

    function statsItem(
      title: string,
      items: Array<DestItem>,
      field: keyof DestItem
    ) {
      return (
        <div className="flex flex-col gap-3 items-center w-full">
          <span className="text-light-blue font-main-wide uppercase">
            {title}
          </span>
          <div className="grid w-full ">
            {items.map((item, index) => {
              return (
                <Fadable
                  key={index}
                  show={activeIndex === index}
                  fadeMs={500}
                  className="flex items-center justify-center"
                >
                  <span className="font-focus uppercase text-[28px]">
                    {item[field] as string}
                  </span>
                </Fadable>
              );
            })}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {imageView()}

      {/* main content */}
      {mainContent()}
    </div>
  );
}
