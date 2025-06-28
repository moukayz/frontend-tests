import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";

interface MultiSwitchButtonProps {
  maxIndex: number;
  currentIndex: number;
  onCurrentIndexUpdate: (index: number) => void;
}

const MultiSwitchButton = ({
  maxIndex,
  currentIndex,
  onCurrentIndexUpdate,
}: MultiSwitchButtonProps) => {
  return (
    <div
      className=" grid grid-cols-[repeat(3,1.5rem)] gap-x-2 gap-y-1 
      text-sm justify-center max-w-fit justify-items-center
    "
    >
      {Array.from({ length: maxIndex }, (_, index) => (
        <span key={index}>{index + 1}</span>
      ))}

      <div
        onClick={() => onCurrentIndexUpdate((currentIndex + 1) % maxIndex)}
        className="h-[1.5rem]  col-span-full justify-self-stretch rounded-full
          inline-flex 
          cursor-pointer
          p-1
          bg-primary
      "
      >
        <span
          style={{
            transform: `translateX(${currentIndex * 2}rem)`,
          }}
          className={`w-4  rounded-full 
            transform transition-transform duration-200 bg-key-bg-secondary
        
        `}
        ></span>
      </div>
    </div>
  );
};

const values = [
  "7",
  "8",
  "9",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "/",
  "x",
];

type CalcButtonProps = {
  value: string;
  className?: string;
  onClick?: (value: string) => void;
  columnSpan?: number;
  colStart?: number;
  rowStart?: number;
};

const CalcButton = ({
  value,
  className,
  onClick,
  columnSpan,
  colStart,
  rowStart,
}: // columnSpan,
CalcButtonProps) => {
  // const basis = `calc((100% - 1rem * ${4 - (columnSpan ?? 1)}) / 4)`;

  return (
    <span
      style={{
        aspectRatio: `${columnSpan ?? 1} / 1`,
        gridColumn: `${colStart ? `${colStart} /` : ""} span ${
          columnSpan ?? 1
        }`,
        gridRow: `${rowStart ? `${rowStart} /` : ""} span 1`,
      }}
      className={`border-b-3 flex items-center justify-center rounded-md
            
            ${className}
            `}
      onClick={() => onClick?.(value)}
    >
      {value}
    </span>
  );
};

function App() {
  const [currentExpression, setCurrentExpression] = useState("");
  // const [currentResult, setCurrentResult] = useState("");

  const handleReset = () => {
    setCurrentExpression("");
  };
  const handleDelete = () => {
    setCurrentExpression((prev) => {
      const lastChar = prev[prev.length - 1];
      if (lastChar === " ") {
        return prev.slice(0, -3);
      }
      return prev.slice(0, -1);
    });
  };
  const handleEqual = () => {
    setCurrentExpression(String(eval(currentExpression.replace("x", "*"))));
  };
  const handleButtonClick = (value: string) => {
    if (!isNaN(Number(value)) || value === ".") {
      setCurrentExpression((prev) => prev + value);
      return;
    }

    setCurrentExpression((prev) => prev + ` ${value} `);
  };

  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className="h-screen overflow-hidden px-8 py-8 
      flex flex-col text-3xl bg-main text-text-main
    "
    >
      <div className="flex gap-6 items-end">
        <span className="font-extrabold">calc</span>
        <span className="text-xs font-bold ml-auto">THEME</span>
        <MultiSwitchButton
          maxIndex={3}
          currentIndex={Number(theme) - 1}
          onCurrentIndexUpdate={(val) => setTheme((val + 1).toString())}
        />
      </div>

      <div className="rounded-lg p-4 mt-8 w-full flex bg-secondary">
        <span className="w-full text-right  justify-self-end font-extrabold">
          {currentExpression.length > 0 ? currentExpression : "0"}
        </span>
      </div>

      <div
        className="rounded-lg p-4 mt-6 w-full bg-primary
          grid grid-cols-[repeat(4,1fr)] gap-4
          font-bold
      "
      >
        <CalcButton
          onClick={handleDelete}
          value="DEL"
          className="text-xl bg-key-bg border-key-shadow text-text-secondary"
          colStart={4}
          rowStart={1}
        />
        {values.map((value) => (
          <CalcButton
            onClick={handleButtonClick}
            key={value}
            value={value}
            className={`bg-key-bg-number border-key-shadow-number text-text-primary`}
          />
        ))}
        <CalcButton
          onClick={handleReset}
          value="RESET"
          className="text-xl bg-key-bg border-key-shadow text-text-secondary"
          columnSpan={2}
        />
        <CalcButton
          onClick={handleEqual}
          value="="
          className="text-xl bg-key-bg-secondary border-key-shadow-secondary text-text-secondary"
          columnSpan={2}
        />
      </div>
    </div>
  );
  // grid grid-cols-[repeat(4,1fr)] gap-4
  // flex flex-wrap-reverse gap-4
}

export default App;
