import { useEffect, useRef, useState} from "react";

export function useWebSocket<T = unknown>(url: string | null) {
    const [connected, setConnected] = useState<boolean>(false);
    const [messages, setMessages] = useState<T[]>([]);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!url) return;
        const ws = new WebSocket(url);
        socketRef.current = ws;

        ws.onopen = () => setConnected(true);
        ws.onclose = () => setConnected(false);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        }
        return () => ws.close();
    }, [url]);


    const send = (message: T) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        }
    };
    return { connected, messages, send };
}