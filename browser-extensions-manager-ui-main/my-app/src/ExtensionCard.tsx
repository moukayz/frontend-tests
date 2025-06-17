import { useContext } from "react";
import SwitchButton from "./SwitchButton";
import { ThemeContext } from "./ThemeContext";
import { themeConfig } from "./ThemeConfig";

export interface ExtensionCardProps {
  title: string;
  description: string;
  imagePath: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onRemove: () => void;
}

const ExtensionCard = ({ title, description, imagePath, enabled, onToggle, onRemove }: ExtensionCardProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`flex h-36 w-72 flex-col justify-between rounded-lg border border-gray-300 p-4 shadow ${themeConfig[theme].cardBackground} ${themeConfig[theme].textColor}`}
    >
      <div className="flex justify-start gap-3">
        <img src={imagePath} alt={title} className="h-10 w-10" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-start text-xs text-gray-500">{description}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          className={`rounded-full border border-gray-400 px-2 py-1 text-xs ${themeConfig[theme].hoverBackground} ${themeConfig[theme].hoverTextColor}`}
          onClick={onRemove}
        >
          Remove
        </button>
        <SwitchButton checked={enabled} onChange={onToggle} size="sm" />
      </div>
    </div>
  );
};

export default ExtensionCard;
