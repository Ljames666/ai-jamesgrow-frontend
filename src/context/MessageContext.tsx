// src/context/MessageContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type MessageType = "info" | "success" | "warning" | "error";

interface Message {
    id: string;
    content: string;
    type: MessageType;
    duration?: number; // em milissegundos
}

interface MessageContextType {
    showMessage: (content: string, type?: MessageType, duration?: number) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const showMessage = (content: string, type: MessageType = "info", duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newMessage = { id, content, type, duration };
        setMessages((prev) => [...prev, newMessage]);

        // Auto-remove
        setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.id !== id));
        }, duration);
    };

    return (
        <MessageContext.Provider value={{ showMessage }}>
            {children}
            <MessageContainer
                messages={messages}
                onDismiss={(id) => setMessages((prev) => prev.filter((m) => m.id !== id))}
            />
        </MessageContext.Provider>
    );
};

// Componente visual das mensagens
const MessageContainer = ({
    messages,
    onDismiss,
}: {
    messages: Message[];
    onDismiss: (id: string) => void;
}) => {
    if (messages.length === 0) return null;

    return (
        <div className='fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none'>
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`pointer-events-auto max-w-xs px-4 py-3 rounded-lg shadow-lg text-white animate-in slide-in-from-top-2 duration-300 ${
                        msg.type === "success"
                            ? "bg-green-600"
                            : msg.type === "error"
                            ? "bg-red-600"
                            : msg.type === "warning"
                            ? "bg-yellow-600"
                            : "bg-blue-600"
                    }`}
                    onClick={() => onDismiss(msg.id)}
                >
                    {msg.content}
                </div>
            ))}
        </div>
    );
};

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessage must be used within a MessageProvider");
    }
    return context;
};
