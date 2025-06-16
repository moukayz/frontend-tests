export interface SwitchButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
}

const sizeBaseSizeMap = {
  sm: 4,
  md: 6,
  lg: 8,
};

const sizeButtonSizeMap = {
  sm: `w-${sizeBaseSizeMap.sm * 2} h-${sizeBaseSizeMap.sm}`,
  md: `w-${sizeBaseSizeMap.md * 2} h-${sizeBaseSizeMap.md}`,
  lg: `w-${sizeBaseSizeMap.lg * 2} h-${sizeBaseSizeMap.lg}`,
};

const sizeSpanSizeMap = {
  sm: `w-${sizeBaseSizeMap.sm - 1} h-${sizeBaseSizeMap.sm - 1} ml-0.5`,
  md: `w-${sizeBaseSizeMap.md - 1} h-${sizeBaseSizeMap.md - 1} ml-0.5`,
  lg: `w-${sizeBaseSizeMap.lg - 1} h-${sizeBaseSizeMap.lg - 1} ml-0.5`,
};

const sizeTranslateMap = {
  sm: `translate-x-${sizeBaseSizeMap.sm}`,
  md: `translate-x-${sizeBaseSizeMap.md}`,
  lg: `translate-x-${sizeBaseSizeMap.lg}`,
};

const SwitchButton = ({ checked, onChange, size = "md" }: SwitchButtonProps) => {
  return (
    <button
      type="button"
      role="switch"
      className={`inline-flex cursor-pointer items-center rounded-full transition-colors duration-200 ${sizeButtonSizeMap[size]} ${checked ? "bg-blue-500" : "bg-gray-300"}`}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`transform rounded-full bg-white shadow transition-transform duration-200 ${sizeSpanSizeMap[size]} ${checked ? sizeTranslateMap[size] : ""} `}
      ></span>
    </button>
  );
};

export default SwitchButton;
