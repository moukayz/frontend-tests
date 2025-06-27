import { useState } from "react";

interface MultiSwitchButtonProps {
  maxIndex: number;
  onCurrentIndexUpdate: (index: number) => void;
}

const MultiSwitchButton = ({
  maxIndex,
  onCurrentIndexUpdate,
}: MultiSwitchButtonProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div
      className="border grid grid-cols-[repeat(3,1.5rem)] gap-x-2 gap-y-1 
      text-sm justify-center max-w-fit justify-items-center
    "
    >
      {Array.from({ length: maxIndex }, (_, index) => (
        <span key={index}>{index + 1}</span>
      ))}

      <div
        onClick={() => setCurrentIndex((currentIndex + 1) % maxIndex)}
        className="border h-[1.5rem]  col-span-full justify-self-stretch rounded-full
          inline-flex 
          cursor-pointer
          p-0.5
      "
      >
        <span
          style={{
            transform: `translateX(${currentIndex * 2}rem)`,
          }}
          className={`border  w-4.5  rounded-full bg-white
            transform transition-transform duration-200 
        
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
      className={`border flex items-center justify-center
            
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

  return (
    <div
      className="h-screen overflow-hidden px-8 py-8 
      flex flex-col text-3xl
    "
    >
      <div className="flex gap-6 items-end">
        <span className="text-bold">calc</span>
        <span className="text-xs text-bold ml-auto">THEME</span>
        <MultiSwitchButton maxIndex={3} onCurrentIndexUpdate={() => {}} />
      </div>

      <div className="border p-4 mt-8 w-full flex">
        <span className="w-full text-right  justify-self-end">
          {currentExpression.length > 0 ? currentExpression : "0"}
        </span>
      </div>

      <div
        className="border p-4 mt-6 w-full 
          grid grid-cols-[repeat(4,1fr)] gap-4
      "
      >
        <CalcButton
          onClick={handleDelete}
          value="DEL"
          className="text-xl"
          colStart={4}
          rowStart={1}
        />
        {values.map((value) => (
          <CalcButton onClick={handleButtonClick} key={value} value={value} />
        ))}
        <CalcButton
          onClick={handleReset}
          value="RESET"
          className="text-xl"
          columnSpan={2}
        />
        <CalcButton
          onClick={handleEqual}
          value="="
          className="text-xl"
          columnSpan={2}
        />
      </div>
    </div>
  );
  // grid grid-cols-[repeat(4,1fr)] gap-4
  // flex flex-wrap-reverse gap-4
}

export default App;
