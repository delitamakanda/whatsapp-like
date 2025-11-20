
interface Props {
    mine: boolean;
    children: any;
    time: string;
    status: "sent" | "read";

}
export function MessageBubble({ mine, children, time, status }: Props) {
    return (
        <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[70%] px-3 py-2 rounded-xl text-sm shadow-sm ${
                    mine ? "bg-green-100 rounded-br-none" : "bg-white border border-gray-200 rounded-bl-none"
                }`}
            >
                <div>{children}</div>
                <div className="text-[10px] text-gray-500 text-right mt-1">
                    {time} {mine && status === "sent" && "✓"}{mine && status === "read" && "✓✓"}
                </div>
            </div>
        </div>
    );
}