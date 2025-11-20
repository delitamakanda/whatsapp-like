interface Props {
    children: any;
}

export function NewConversationCard({ children }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4 border border-gray-200">
            {children}
        </div>
    );
}