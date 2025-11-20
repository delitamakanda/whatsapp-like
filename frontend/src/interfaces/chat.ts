export interface User {
    id: string;
    username: string;
    avatarUrl?: string;
}

export interface Conversation {
    id: string;
    is_group: boolean;
    title?: string;
    participants: User[];
    last_message?: Message;
}

export interface Message {
    id: string;
    conversationId: string;
    sender: User;
    text: string;
    timestamp: number;
    is_mine: boolean;
    is_read: boolean;
    is_deleted: boolean;
    status?: "sent" | "read" | "delivered" | "failed" | "pending";
}