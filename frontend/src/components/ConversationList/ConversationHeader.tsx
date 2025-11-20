interface Props {
    title: string;
    subtitle: string;
    onBack?: () => void;
}

export function ConversationHeader({ title, subtitle, onBack}: Props) {
    return (
        <div className="flex items-center px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
            {onBack && (
                <button onClick={onBack} className="mr-3 text-gray-700">
                    ←
                </button>
            )}
            <div className="flex flex-col">
                <span className="font-semibold text-lg">{title}</span>
                {subtitle && (
                    <span className="text-sm text-gray-500 truncate">{subtitle}</span>
                )}
            </div>
        </div>
    )
}