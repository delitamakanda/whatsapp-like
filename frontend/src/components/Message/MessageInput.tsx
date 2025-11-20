import {useState} from "react";

interface Props {
    onSend: (text: string) => void;
    disabled: boolean;
}

export function MessageInput({ onSend, disabled }: Props) {
    const [text, setText] = useState("");


    return (
        <div className="px-3 py-3 bg-white border-t border-gray-200 flex items-center gap-2">
            <button className="text-gray-500 text-xl">＋</button>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={disabled ? "Connexion…" : "Écrire un message…"}
                disabled={disabled}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
            />
            <button
                disabled={disabled || !text.trim()}
                onClick={() => {
                    if (!text.trim()) return;
                    onSend(text);
                    setText("");
                }}
                className={`px-4 py-2 rounded-full text-white font-medium ${disabled ? "bg-gray-300" : "bg-blue-600"}`}
            >
                ▶
            </button>
        </div>
    );
}