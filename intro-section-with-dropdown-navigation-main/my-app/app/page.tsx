const ImageFooter = ({ image }: { image: string }) => {
  return (
    <div className="flex-1 w-full">
      <img className="h-auto w-full object-cover" src={image} alt="client" />
    </div>
  );
};

export default function Home() {
  const footerImages = [
    {
      image: "/images/client-databiz.svg",
      alt: "databiz",
    },
    {
      image: "/images/client-audiophile.svg",
      alt: "audiophile",
    },

    {
      image: "/images/client-meet.svg",
      alt: "meet",
    },
    {
      image: "/images/client-maker.svg",
      alt: "maker",
    },
  ];

  return (
    <div
      className="flex flex-col gap-4 items-center justify-center md:flex-row-reverse
    md:py-16 md:px-24 md:gap-24 md:items-start 
     "
    >
      <picture>
        <source
          srcSet="/images/image-hero-desktop.png"
          media="(min-width: 768px)"
        />
        <img
          className="w-full"
          src="/images/image-hero-mobile.png"
          alt="hero"
        />
      </picture>

      <div className="flex flex-col gap-6 items-center justify-center px-4 md:items-start md:gap-10 md:h-full">
        <span className="pt-8 text-4xl font-bold md:text-6xl">
          Make remote work
        </span>
        <span className="text-gray-500 text-center font-medium md:text-lg md:text-start">
          Get your team in sync, no matter your location. Streamline processes,
          create team rituals, and watch productivity soar.
        </span>
        <button className="bg-black text-white py-2 px-6 rounded-xl font-medium">
          Learn more
        </button>
        <div className="pt-10 flex justify-between gap-4 items-center md:mt-auto">
          {footerImages.map((image, index) => (
            <ImageFooter key={index} image={image.image} />
          ))}
        </div>
      </div>
    </div>
  );
}
