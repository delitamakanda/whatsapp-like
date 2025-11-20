interface Props {
    value: string;
    onChange: (event: string) => void;
    placeholder: string;
}

export function TextArea({ value, onChange, placeholder }: Props) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none h-24"
        />
    );
}