interface Props {
    name: string;
    last_message: string;
    time: string;
    avatar?: string;
    onClick: () => void;
    pending: boolean;

}

export function ConversationListItem({ name, last_message, time, avatar, onClick, pending }: Props) {
    return (
        <div
            onClick={onClick}
            className="flex items-center px-4 py-3 gap-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100"
        >
            <div className="relative">
                <img
                    src={avatar || 'https://avatar.iran.liara.run/public/60' }
                    alt={name}
                    className={`w-10 h-10 rounded-full object-cover ${pending ? "opacity-50 ring-2 ring-dashed ring-gray-300" : ""}`}
                />
            </div>
            <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{name}</div>
                <div className="text-sm text-gray-500 truncate">{last_message}</div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">{time}</div>
        </div>
    );
}