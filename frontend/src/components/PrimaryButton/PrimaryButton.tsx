interface Props  {
    children: any;
    onClick: () => void;
    disabled?: boolean;
}

export function PrimaryButton({ children, onClick, disabled }: Props) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full py-2 rounded-full text-white font-semibold ${disabled ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"}`}
        >
            {children}
        </button>
    );
}