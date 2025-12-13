// src/components/layout/ChatUI.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { AiModel } from "@/types";
import Sidebar from "./Sidebar";
import MessageBubble from "../chat/MessageBubble";
import InputBar from "../chat/InputBar";
import { useChatSocket } from "@/hooks/useChatSockets";
import { useChatREST } from "@/hooks/useChatREST";
import { useMessage } from "@/context/MessageContext";

export default function ChatUI() {
    const router = useRouter();
    const token = getToken();
    const { showMessage } = useMessage();
    const [currentModel, setCurrentModel] = useState<AiModel>("gemini");

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const {
        messages: socketMessages,
        loading: socketLoading,
        connected,
        sendMessage: sendSocketMessage,
    } = useChatSocket(token, currentModel);

    const {
        messages: restMessages,
        loading: restLoading,
        sendMessage: sendRESTMessage,
        loadHistory,
    } = useChatREST(token, currentModel, router);

    const useWebSocket = connected;
    const messages = useWebSocket ? socketMessages : restMessages;
    const loading = useWebSocket ? socketLoading : restLoading;

    const handleSendMessage = async (content: string) => {
        const scroll = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        showMessage("Enviando...", "info", 1500);
        if (useWebSocket) {
            try {
                await sendSocketMessage(content);
                scroll();
                showMessage("Mensagem enviada com sucesso.", "success", 3000);
            } catch {
                showMessage("Falha ao enviar via WebSocket. Usando REST API.", "warning", 3000);
                await sendRESTMessage(content);
                scroll();
            }
        } else {
            await sendRESTMessage(content);
            scroll();
        }
    };

    useEffect(() => {
        if (!token) {
            router.push("/login");
            return;
        }
        // 🔹 Carregar histórico sempre que trocar modelo
        loadHistory();
    }, [messages, token, router, loadHistory]);

    return (
        <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
            <Sidebar
                currentModel={currentModel}
                onModelChange={(model) => {
                    setCurrentModel(model);
                }}
            />
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
