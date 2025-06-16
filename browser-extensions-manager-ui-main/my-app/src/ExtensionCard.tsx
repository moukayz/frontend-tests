import SwitchButton from './SwitchButton'

export interface ExtensionCardProps {
  title: string
  description: string
  imagePath: string
  enabled: boolean,
  onToggle: (enabled: boolean) => void,
}

const ExtensionCard = ({ title, description, imagePath, enabled, onToggle }: ExtensionCardProps) => {
  return (
    <div className="flex flex-col justify-between p-4 border border-gray-200 rounded-lg bg-gray-800 text-gray-100 w-72 h-36">
        <div className="flex justify-start gap-3">
            <img src={imagePath} alt={title} className="w-10 h-10" />
            <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{title}</span>
                <span className="text-xs text-gray-500 text-start">{description}</span>
            </div>
        </div>
        <div className="flex justify-between items-center mt-4">
            <div className="rounded-full border border-gray-200 px-2 py-1 text-xs">
                Remove
            </div>
            <SwitchButton checked={enabled} onChange={onToggle} size="sm" />
        </div>

    </div>
  )
}

export default ExtensionCard