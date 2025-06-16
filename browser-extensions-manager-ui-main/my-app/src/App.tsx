import { useEffect, useState } from "react";
import "./App.css";
import ExtensionCard from "./ExtensionCard";
import { motion, LayoutGroup } from "motion/react";
// import myphoto from "./assets/images/logo-json-wizard.svg";

type ExtensionData = {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

function App() {
  const [data, setData] = useState<ExtensionData[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleToggle = (name: string) => {
    setData((prevData) => prevData.map((item) => (item.name === name ? { ...item, isActive: !item.isActive } : item)));
  };

  return (
    <div className="m-10">
      <div className="flex flex-col px-10">
        <div className="flex items-center justify-between pb-4">
          <span className="text-2xl font-bold">Extensions List</span>
          <div className="flex gap-2">
            <button className="rounded-md bg-gray-200 px-4 py-2">All</button>
            <button className="rounded-md bg-gray-200 px-4 py-2">Active</button>
            <button className="rounded-md bg-gray-200 px-4 py-2">Inactive</button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,18rem)] justify-center gap-2">
          <span className="col-start-1 row-start-1 text-2xl font-bold">Extensions List</span>
          <span className="col-end-[-1] row-start-1 text-2xl font-bold justify-self-end">Extensions List</span>
          {/* <span className="col-start-[-1] row-start-1 text-2xl font-bold">Extensions List</span> */}
        </div>

        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-[repeat(auto-fill,18rem)] justify-center gap-2"
            // className="flex flex-wrap justify-start gap-2 w-fit "
            transition={{
              layout: { duration: 0.4, ease: "easeInOut" },
            }}
          >
            {data.map((item, idx) => (
              <motion.div
                key={item.name}
                layout
                layoutId={item.name}
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: idx * 0.05,
                  layout: { duration: 0.4, ease: "easeInOut" },
                }}
              >
                <ExtensionCard
                  title={item.name}
                  description={item.description}
                  imagePath={item.logo}
                  enabled={item.isActive}
                  onToggle={() => handleToggle(item.name)}
                />
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}

export default App;
