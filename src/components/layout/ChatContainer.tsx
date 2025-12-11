"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { Message, AiModel } from "@/types";
import Sidebar from "./Sidebar";
import MessageBubble from "../chat/MessageBubble";
import InputBar from "../chat/InputBar";
import { createSocket } from "@/lib/socket";

export default function ChatUI() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentModel, setCurrentModel] = useState<AiModel>("gemini");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
            return;
        }

        const socket = createSocket(token);
        socket.on("message", (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
            setLoading(false);
        });

        socket.on("typing", () => {
            setLoading(true);
        });

        socket.on("error", (err: any) => {
            console.error("Socket error:", err);
            setLoading(false);
            alert(err.message);
        });

        // Carregar histórico inicial
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages?aiModel=${currentModel}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setMessages(data))
            .catch(() => router.push("/login"));

        return () => {
            socket.disconnect();
        };
    }, [currentModel, router]);

    const handleSendMessage = (content: string) => {
        const socket = createSocket(getToken()!);
        socket.emit("chat:message", { content, aiModel: currentModel });
        setMessages((prev) => [...prev, { role: "user", content, aiModel: currentModel }]);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
            <Sidebar currentModel={currentModel} onModelChange={setCurrentModel} />
            <div className='flex-1 flex flex-col'>
                <div className='flex-1 p-4 overflow-y-auto'>
                    {messages.length === 0 ? (
                        <div className='h-full flex items-center justify-center text-gray-500 dark:text-gray-400'>
                            Envie uma mensagem para começar
                        </div>
                    ) : (
                        messages.map((msg, i) => <MessageBubble key={i} message={msg} />)
                    )}
                    {loading && (
                        <div className='flex justify-start mb-4'>
                            <div className='bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-2xl max-w-[80%]'>
                                Digitando...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <InputBar onSend={handleSendMessage} disabled={loading} />
            </div>
        </div>
    );
}
