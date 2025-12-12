"use client";
import { useState, useCallback } from "react";
import { Message, AiModel } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useChatREST(
    token: string | null,
    currentModel: AiModel,
    router: AppRouterInstance,
) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    // 🔹 Carregar histórico
    const loadHistory = useCallback(async () => {
        if (!token) return;
        try {
            const res = await fetch(`${API_URL}/messages?aiModel=${currentModel}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Invalid token");
            const data = await res.json();
            setMessages(data);
        } catch {
            router.push("/login");
        }
    }, [currentModel, router, token]);

    // 🔹 Enviar mensagem via REST
    const sendMessage = useCallback(
        async (content: string) => {
            if (!token) return;
            setMessages((prev) => [...prev, { role: "user", content, aiModel: currentModel }]);
            setLoading(true);

            try {
                const res = await fetch(`${API_URL}/chat`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ content, aiModel: currentModel }),
                });

                if (!res.ok) {
                    const error = await res.json().catch(() => ({ message: "Unknown error" }));
                    throw new Error(error.message);
                }

                const data = await res.json();
                setMessages((prev) => [
                    ...prev,
                    { role: "ai", content: data.aiResponse, aiModel: currentModel },
                ]);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : String(err);
                alert(`Erro: ${message}`);
                setMessages((prev) => prev.slice(0, -1));
            } finally {
                setLoading(false);
            }
        },
        [token, currentModel],
    );

    return { messages, loading, sendMessage, loadHistory, setMessages };
}
