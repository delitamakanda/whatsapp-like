interface Props {
    title: string;
    right?: string;
    onBack?: () => void;
}

export function TopBar({ title, right, onBack }: Props) {
    return (
        <div className="flex items-center px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
            {onBack && (
                <button onClick={onBack} className="mr-3 text-gray-700">
                    ←
                </button>
            )}
            <h1 className="font-semibold text-lg flex-1 truncate">{title}</h1>
            {right}
        </div>
    );
}