import { useEffect, useState } from "react";
import "./App.css";
import SwitchButton from "./SwitchButton";
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
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState<ExtensionData[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="m-auto">
      <div className="flex flex-col gap-4">
        <SwitchButton checked={checked} onChange={setChecked} size="sm" />
        <SwitchButton checked={checked} onChange={setChecked} size="md" />
        <SwitchButton checked={checked} onChange={setChecked} size="lg" />
      </div>

      <LayoutGroup>
        <motion.div
          layout
          className="flex flex-wrap items-center justify-center gap-2"
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
                onToggle={setChecked}
              />
            </motion.div>
          ))}
        </motion.div>
      </LayoutGroup>
    </div>
  );
}

export default App;
