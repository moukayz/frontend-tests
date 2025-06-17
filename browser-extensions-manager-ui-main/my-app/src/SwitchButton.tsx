export interface SwitchButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: {
    buttonSize: "w-8 h-4",
    spanSize: "w-3 h-3 ml-0.5",
    translate: "translate-x-4",
  },
  md: {
    buttonSize: "w-12 h-6",
    spanSize: "w-5 h-5 ml-0.5",
    translate: "translate-x-6",
  },
  lg: {
    buttonSize: "w-16 h-8",
    spanSize: "w-7 h-7 ml-0.5",
    translate: "translate-x-8",
  },
};

const SwitchButton = ({ checked, onChange, size = "md" }: SwitchButtonProps) => {
  const classes = sizeClasses[size];

  return (
    <button
      type="button"
      role="switch"
      className={`inline-flex cursor-pointer items-center rounded-full transition-colors duration-200 ${classes.buttonSize} ${checked ? "bg-blue-500" : "bg-gray-300"}`}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`transform rounded-full bg-white shadow transition-transform duration-200 ${classes.spanSize} ${checked ? classes.translate : ""}`}
      ></span>
    </button>
  );
};

export default SwitchButton;
