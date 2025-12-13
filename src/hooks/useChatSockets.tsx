"use client";
// src/hooks/useChatSocket.ts
import { useState, useEffect, useCallback } from "react";
import { Message, AiModel } from "@/types";
import { createSocket } from "@/lib/sockets";
import { useMessage } from "@/context/MessageContext";

export function useChatSocket(token: string | null, currentModel: AiModel) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);
    const { showMessage } = useMessage();
    useEffect(() => {
        if (!token) return;

        const socket = createSocket(`Bearer ${token}`);

        socket.on("connect", () => setConnected(true));
        socket.on("disconnect", () => setConnected(false));

        socket.on("message", (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
            setLoading(false);
        });

        socket.on("typing", () => {
            showMessage("Digitando...", "info", 1500);
            setLoading(true);
        });

        socket.on("error", (err: Error) => {
            showMessage(`WebSocket error: ${err.message}`, "error", 5000);
            console.error("WebSocket error:", err);
            setConnected(false);
            setLoading(false);
        });

        return () => {
            socket.disconnect();
        };
    }, [token, currentModel]);

    const sendMessage = useCallback(
        async (content: string) => {
            if (!token) return;
            setMessages((prev) => [...prev, { role: "user", content, aiModel: currentModel }]);
            setLoading(true);

            return new Promise<void>((resolve, reject) => {
                const socket = createSocket(`Bearer ${token}`);
                socket.emit("chat:message", { content, aiModel: currentModel });

                socket.on("message", (msg: Message) => {
                    setMessages((prev) => [...prev, msg]);
                    setLoading(false);
                    socket.disconnect();
                    resolve();
                });

                socket.on("error", (err: Error) => {
                    setLoading(false);
                    socket.disconnect();
                    reject(err);
                });
            });
        },
        [token, currentModel],
    );

    return { messages, loading, connected, sendMessage, setMessages };
}
