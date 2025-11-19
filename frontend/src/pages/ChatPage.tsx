import {useState} from "react";
import {AppShell} from "../components/AppShell/AppShell.tsx";
import {Sidebar} from "../components/Sidebar/Sidebar.tsx";
import {SidebarHeader} from "../components/Sidebar/SidebarHeader.tsx";
import {SidebarSearch} from "../components/Sidebar/SidebarSearch.tsx";
import type {Conversation, Message} from "@/interfaces/chat.ts";
import {ConversationList} from "../components/ConversationList/ConversationList.tsx";
import {ConversationListItem} from "../components/ConversationList/ConversationListItem.tsx";

export function ChatPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const conversations: Conversation[] = [
        {
            id: '123',
            is_group: false,
            title: "User 1",
            participants: [
                {id: '1', username: "User 1", avatarUrl: "user1.jpg"},
                {id: '2', username: "User 2", avatarUrl: "user2.jpg"},
            ],
            last_message: {
                id: '1',
                conversationId: '123',
                sender: {id: '1', username: "User 1", avatarUrl: "user1.jpg"},
                text: "Hello, User 2!",
                timestamp: 1632000000,
                is_mine: false,
                is_read: false,
                is_deleted: false,
            }
        }
    ];

    const message: Message[] = [
        {
            id: '1',
            conversationId: '123',
            sender: {id: '2', username: "User 2", avatarUrl: "https://avatar.iran.liara.run/public/26"},
            text: "Hi, User 1!",
            timestamp: 1632000000,
            is_mine: true,
            is_read: false,
            is_deleted: false,
        },
        {
            id: '2',
            conversationId: '123',
            sender: {id: '1', username: "User 1", avatarUrl: "https://avatar.iran.liara.run/public/49"},
            text: "How are you?",
            timestamp: 1632000000,
            is_mine: false,
            is_read: true,
            is_deleted: false,
        },
        {
            id: '3',
            conversationId: '123',
            sender: {id: '2', username: "User 2", avatarUrl: "https://avatar.iran.liara.run/public/96"},
            text: "I'm fine, thanks!",
            timestamp: 1632000000,
            is_mine: true,
            is_read: false,
            is_deleted: false,
        }
    ]

    return (
        <AppShell sidebar={
            <Sidebar>
                <SidebarHeader>Messages</SidebarHeader>
                <SidebarSearch />
                <ConversationList>
                    {conversations.map((conversation) => (
                        <ConversationListItem
                            key={conversation.id}
                            name={conversation.title ?? ''}
                            last_message={conversation!.last_message!.text}
                            time={new Date(conversation.last_message!.timestamp * 1000).toLocaleString()}
                            avatar={''}
                            pending={false}
                            onClick={() => setSelectedId(conversation.id)}
                        />
                    ))}
                </ConversationList>
            </Sidebar>
        }
        content={
            <div className="flex flex-col flex-1">
                {!selectedId ? (<div className="flex flex-1 items-center justify-center text-gray-400">Select a conversation</div>) : (<>
                    Marie en ligne
                    {message.filter((message) => message.conversationId === selectedId).map((message) => (
                        <div key={message.id} className={`flex items-center gap-3 ${message.is_mine? "flex-end" : "flex-start"}`}>
                            <img
                                src={message.sender.avatarUrl}
                                alt={message.sender.username}
                                className={`w-10 h-10 rounded-full object-cover ${message.is_read? "border-gray-200" : ""}`}
                            />
                            <div className="flex-1 text-sm text-gray-600 truncate">{message.text}</div>
                        </div>
                    ))}
                </>)}
            </div>
        }>
        </AppShell>
    )
}