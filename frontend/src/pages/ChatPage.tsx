import {useState} from "react";
import {AppShell} from "../components/AppShell/AppShell.tsx";
import {Sidebar} from "../components/Sidebar/Sidebar.tsx";
import {SidebarHeader} from "../components/Sidebar/SidebarHeader.tsx";
import {SidebarSearch} from "../components/Sidebar/SidebarSearch.tsx";
import type {Conversation, Message} from "@/interfaces/chat.ts";
import {ConversationList} from "../components/ConversationList/ConversationList.tsx";
import {ConversationListItem} from "../components/ConversationList/ConversationListItem.tsx";
import {ConversationHeader} from "../components/ConversationList/ConversationHeader.tsx";
import {MessageList} from "../components/Message/MessageList.tsx";
import {MessageBubble} from "../components/Message/MessageBubble.tsx";
import {MessageInput} from "../components/Message/MessageInput.tsx";

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

    const messages: Message[] = [
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
            <div className="flex flex-1 flex-col">
                {!selectedId ? (
                    <div className="flex flex-1 items-center justify-center text-gray-400">
                        Sélectionne une conversation
                    </div>
                ) : (
                    <>
                        <ConversationHeader
                            title="Marie"
                            subtitle="En ligne"
                        />
                        <MessageList>
                            <div className="text-center text-xs text-gray-400 mb-2">
                                12 avril 2025
                            </div>
                            {messages.map((m) => (
                                <MessageBubble
                                    key={m.id}
                                    mine={m.is_mine}
                                    time={new Date(m.timestamp * 1000).toLocaleString()}
                                    status={m.is_read? "read" : "sent"  }
                                >
                                    {m.text}
                                </MessageBubble>
                            ))}
                            <div className="mt-4 text-center text-[11px] text-gray-500">
                                Invitation en attente pour : john@doe.com
                            </div>
                        </MessageList>
                        <MessageInput
                            disabled={false}
                            onSend={(text: string) => {
                                console.log("send", text);
                            }}
                        />
                    </>
                )}
            </div>
        }>
        </AppShell>
    )
}