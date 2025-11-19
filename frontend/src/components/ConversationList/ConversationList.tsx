interface Props {
    children: any;
}

export function ConversationList({ children }: Props) {
    return <div className="flex-1 overflow-y-auto bg-white">{children}</div>;
}