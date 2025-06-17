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

enum FilterOption {
  All = "All",
  Active = "Active",
  Inactive = "Inactive",
}

interface FilterButtonProps {
  name: string;
  currentFilter: FilterOption;
  onClick: () => void;
}

const FilterButton = ({ name, currentFilter, onClick }: FilterButtonProps) => {
  const isChecked = currentFilter === name;
  console.log("isChecked", isChecked);
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-gray-200 px-4 py-2 transition-colors duration-200 ${isChecked ? "bg-blue-400" : ""}`}
    >
      {name}
    </button>
  );
};

function App() {
  const [data, setData] = useState<ExtensionData[]>([]);
  const [filter, setFilter] = useState<FilterOption>(FilterOption.All);
  const [searchPattern, setSearchPattern] = useState<string>("");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPattern(event.target.value);
  };

  const handleToggle = (name: string) => {
    setData((prevData) => prevData.map((item) => (item.name === name ? { ...item, isActive: !item.isActive } : item)));
  };

  let filteredData = data.filter((item) => {
    if (filter === FilterOption.All) return true;
    if (filter === FilterOption.Active) return item.isActive;
    if (filter === FilterOption.Inactive) return !item.isActive;
    return false;
  });

  if (searchPattern.length > 0) {
    filteredData = filteredData.filter((item) => {
      return item.name.toLowerCase().includes(searchPattern.toLowerCase());
    });
  }

  console.log("current filter and search pattern", filter, searchPattern);

  const gridCardStyle = "grid grid-cols-[repeat(auto-fill,18rem)]  justify-center gap-2";

  return (
    <div className="m-10">
      <div className="flex flex-col px-10">
        <div className={`${gridCardStyle} pb-4`}>
          <input
            type="text"
            value={searchPattern}
            onChange={handleSearch}
            placeholder="Search"
            className="col-span-full rounded-full border-2 border-gray-400 px-4 py-2"
          />
        </div>

        <div className={`${gridCardStyle} items-end pb-4`}>
          <span className="col-start-1 row-start-1 text-2xl font-bold">Extensions List</span>
          <div className="col-end-[-1] row-start-1 flex gap-2 justify-self-end">
            {Object.values(FilterOption).map((option) => (
              <FilterButton
                key={option}
                name={option}
                currentFilter={filter}
                onClick={() => {
                  console.log(option);
                  setFilter(option);
                }}
              />
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.div
            layout
            className={`${gridCardStyle}`}
            // className="flex flex-wrap justify-start gap-2 w-fit "
            transition={{
              layout: { duration: 0.4, ease: "easeInOut" },
            }}
          >
            {filteredData.map((item, idx) => (
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
