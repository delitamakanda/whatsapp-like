interface Props {
    children: any;
}

export function MessageList({ children }: Props) {
    return <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">{children}</div>;
}