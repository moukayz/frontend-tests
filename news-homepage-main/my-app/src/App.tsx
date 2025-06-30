import { useState } from "react";

const NewsItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-bold text-white">{title}</span>
      <span className="">{description}</span>
    </div>
  );
};
const NewsSeparator = () => {
  return <div className={`h-px w-full border-b`} />;
};

const news = [
  {
    title: "Hydrogen VS Electric Cars",
    description: "Will hydrogen-fueled cars ever catch up to EVs?",
  },
  {
    title: "The Downsides of AI Artistry",
    description:
      "What are the possible adverse effects of on-demand AI image generation?",
  },
  {
    title: "Is VC Funding Drying Up?",
    description:
      "Private funding by VC firms is down 50% YOY. We take a look at what that means.",
  },
];

interface ArticleItemProps {
  img: string;
  index: string;
  title: string;
  description: string;
}
const ArticleItem = ({ img, index, title, description }: ArticleItemProps) => {
  return (
    <div className="flex  gap-6">
      <img className="w-[30%] h-auto" src={img} alt="" />

      <div className="flex flex-col items-start justify-around gap-2">
        <span className="text-xl text-action font-extrabold ">{index}</span>
        <span className="text-lg text-black font-bold">{title}</span>
        <span className="">{description}</span>
      </div>
    </div>
  );
};
const articles = [
  {
    img: "/images/image-retro-pcs.jpg",
    index: "01",
    title: "Reviving Retro PCs",
    description: "What happens when old PCs are given modern upgrades?",
  },
  {
    img: "/images/image-top-laptops.jpg",
    index: "02",
    title: "Top 10 Laptops of 2022",
    description: "Our best picks for various needs and budgets.",
  },
  {
    img: "/images/image-gaming-growth.jpg",
    index: "03",
    title: "The Growth of Gaming",
    description: "How the pandemic has sparked fresh opportunities.",
  },
];

const navLinks: Array<{ title: string }> = [
  {
    title: "Home",
  },
  {
    title: "New",
  },
  {
    title: "Popular",
  },
  {
    title: "Trending",
  },
  {
    title: "Categories",
  },
];
interface NavbarProps {
  navLinks: Array<{ title: string }>;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const MobileNavbar = ({ navLinks, open, setOpen }: NavbarProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
          md:hidden
        `}
        onClick={() => setOpen!(false)}
      ></div>

      <div
        className={`h-screen w-2/3 bg-white fixed top-0 right-0 z-50 transform transform-transition duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }
          `}
      >
        <div
          className="px-4 py-8 absolute top-0 right-0 z-30 cursor-pointer "
          onClick={() => setOpen!(false)}
        >
          <img src="/images/icon-menu-close.svg" alt="close" />
        </div>

        <div className="mt-30 box-border text-lg flex flex-col  gap-6  py-4 p-6  font-medium">
          {navLinks.map((link) => (
            <div key={link.title}>{link.title}</div>
          ))}
        </div>
      </div>
    </>
  );
};

const DesktopNavbar = ({ navLinks }: NavbarProps) => {
  return (
    <div className="hidden lg:flex justify-between items-center gap-10">
      {navLinks.map((link) => (
        <div key={link.title}>{link.title}</div>
      ))}
    </div>
  );
};

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div
      className="px-4 py-8 flex flex-col text-primary
    lg:px-40 lg:py-16 lg:h-screen
    "
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-8">
        <img className="h-8 aspect-ration" src="/images/logo.svg" alt="logo" />
        <img
          className="lg:hidden"
          src="/images/icon-menu.svg"
          alt="menu"
          onClick={() => setOpenSidebar(true)}
        />
        <DesktopNavbar navLinks={navLinks} />
      </div>

      {/* Main */}
      <div
        className="grid gap-8 gap-y-14 h-full
        lg:grid-cols-3
       "
      >
        {/* headline */}
        <div
          className="grid grid-cols-1 gap-8
        lg:col-span-2 lg:grid-cols-2  lg:gap-x-12 lg:gap-y-0 
        "
        >
          <picture className="lg:col-span-2">
            <source
              srcSet="/images/image-web-3-desktop.jpg"
              media="(min-width: 1024px)"
            />
            <img src="/images/image-web-3-mobile.jpg" alt="web3" />
          </picture>

          <span className="text-black text-5xl font-bold lg:row-span-2 lg:self-start">
            The Bright Future of Web 3.0?
          </span>

          <span className="">
            We dive into the next evolution of the web that claims to put the
            power of the platforms back into the hands of the people. But is it
            really fulfilling its promise?
          </span>
          <button className="tracking-[0.25rem] self-start justify-self-start font-bold px-6 py-2 text-black bg-action">
            READ MORE
          </button>
        </div>

        {/* news */}
        <div
          className="flex flex-col gap-6 justify-between bg-surface px-4 py-6
        lg:col-span-1
        "
        >
          <span className="text-2xl font-bold text-title-color">New</span>
          {news.map((item, index) => (
            <>
              <NewsItem
                key={index}
                title={item.title}
                description={item.description}
              />
              {index !== news.length - 1 && <NewsSeparator />}
            </>
          ))}
        </div>

        {/* articles */}
        <div className="grid gap-8 lg:items-start lg:grid-cols-3 lg:col-span-3">
          {articles.map((item, index) => (
            <ArticleItem key={index} {...item} />
          ))}
        </div>
      </div>

      <MobileNavbar
        navLinks={navLinks}
        open={openSidebar}
        setOpen={setOpenSidebar}
      />
    </div>
  );
}

export default App;
