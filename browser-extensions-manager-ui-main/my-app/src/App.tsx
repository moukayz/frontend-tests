import { useEffect, useState } from "react";
import "./App.css";
import SwitchButton from "./SwitchButton";
import ExtensionCard from "./ExtensionCard";
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

      <div className="grid grid-cols-1 md:[grid-template-columns:repeat(2,max-content)] lg:[grid-template-columns:repeat(3,max-content)] gap-2 items-center justify-center ">
      {data.map((item) => (
        <ExtensionCard
          title={item.name}
          description={item.description}
          imagePath={item.logo}
          enabled={item.isActive}
            onToggle={setChecked}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
