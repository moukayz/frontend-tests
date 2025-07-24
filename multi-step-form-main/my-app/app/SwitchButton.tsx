export interface SwitchButtonProps {
  checked: boolean;
  noColorChange?: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const baseHeightMap = {
  sm: 4,
  md: 6,
  lg: 8,
};

const SwitchButton = ({
  checked,
  noColorChange = false,
  onChange,
  size = "md",
  className,
}: SwitchButtonProps) => {
  const baseSize = baseHeightMap[size];
  const buttonSize = baseSize;
  const spanSize = baseSize - 2;
  const translate = baseSize;
  const margin = (baseSize - spanSize) / 2;

  return (
    <button
      type="button"
      style={{ height: `${buttonSize * 4}px` }}
      className={`aspect-[2/1] inline-flex cursor-pointer items-center rounded-full transition-colors duration-200 
      ${!checked && !noColorChange ? "bg-gray-500" : ""} ${className}`}
      onClick={() => onChange(!checked)}
    >
      <span
        style={{
          height: `${spanSize * 4}px`,
          marginLeft: `${margin * 4}px`,
          transform: `${
            checked ? `translateX(${translate * 4}px)` : "translateX(0)"
          }`,
        }}
        className={`aspect-square transform rounded-full bg-white shadow transition-transform duration-200 `}
      ></span>
    </button>
  );
};

export default SwitchButton;
