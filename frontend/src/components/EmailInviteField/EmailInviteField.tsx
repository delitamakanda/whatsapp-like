interface Props {
    value: string;
    onChange: (event: string) => void;
}

export function EmailInviteField({ value, onChange }: Props) {
    return (
        <input
            type="email"
            placeholder="Email de l'ami·e"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none"
        />
    );
}