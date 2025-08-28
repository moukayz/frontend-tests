import SwitchButton from "./SwitchButton";

export interface ExtensionCardProps {
  title: string;
  description: string;
  imagePath: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onRemove: () => void;
}

const ExtensionCard = ({ title, description, imagePath, enabled, onToggle, onRemove }: ExtensionCardProps) => {
  return (
    <div
      className={`flex h-36 w-72 flex-col justify-between rounded-lg border border-gray-300 bg-surface-variant p-4 text-foreground shadow`}
    >
      <div className="flex justify-start gap-3">
        <img src={`${import.meta.env.BASE_URL}${imagePath}`} alt={title} className="h-10 w-10" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-start text-xs text-gray-500">{description}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          className={`rounded-full border border-gray-400 px-2 py-1 text-xs hover:bg-primary-hover hover:text-inverse-foreground`}
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
