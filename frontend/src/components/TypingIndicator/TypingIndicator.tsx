export function TypingIndicator() {
    return (
        <div className="flex items-center text-gray-600">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gray-200 mr-3" />
            <div className="flex-grow text-sm font-medium">Typing...</div>
        </div>
    )
}