"use client";
import Image from "next/image";
import { useState } from "react";
import Fadable from "./Fadable";
import { BASE_PATH } from "../globals";

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

  const imageView = () => {
    return (
      <div className="grid w-full lg:w-[540px] flex-1">
        {destItems.map((item, index) => {
          return (
            <Fadable
              key={index}
              show={activeIndex === index}
              fadeMs={500}
              className="flex items-center justify-center w-full "
            >
              <Image
                src={`${BASE_PATH}${item.images.png}`}
                alt={item.name}
                width={150}
                height={150}
                className="lg:w-[480px] lg:h-[480px]"
              />
            </Fadable>
          );
        })}
      </div>
    );
  };

  const mainContent = () => {
    const navBar = (
      <div className="flex items-start h-8 gap-8 text-sm lg:text-base font-main-wide uppercase ">
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
              className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 "
            >
              <span
                className={`font-focus text-[3.5rem] lg:text-[6rem] uppercase`}
              >
                {item.name}
              </span>
              <span className="text-light-blue font-paragraph lg:text-lg min-h-[5lh]">
                {item.description}
              </span>
            </Fadable>
          );
        })}
      </div>
    );

    const stats = (
      <div className="flex flex-col lg:flex-row  gap-6 w-full">
        {statsItem("Avg. distance", destItems, "distance")}
        {statsItem("Est. travel time", destItems, "travel")}
      </div>
    );

    return (
      <div className="flex-1 flex flex-col items-center lg:items-start gap-6 lg:gap-10 lg:max-w-[540px] lg:px-10">
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
        <div className="flex flex-col gap-3 items-center lg:items-start w-full">
          <span className="text-light-blue font-main-wide text-sm uppercase">
            {title}
          </span>
          <div className="grid w-full ">
            {items.map((item, index) => {
              return (
                <Fadable
                  key={index}
                  show={activeIndex === index}
                  fadeMs={500}
                  className="flex items-center lg:items-start lg:justify-start justify-center"
                >
                  <span className="font-focus uppercase text-[1.75rem] leading-8">
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
    <div className="lg:my-auto flex-1 flex flex-col gap-8 lg:flex-row justify-center items-center">
      {imageView()}

      {/* main content */}
      {mainContent()}
    </div>
  );
}
