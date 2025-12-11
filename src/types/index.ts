export type AiModel = "gemini" | "gpt" | "qwen";

export interface User {
    _id: string;
    username: string;
}

export interface Message {
    _id?: string;
    userId?: string;
    role: "user" | "ai";
    content: string;
    aiModel: AiModel;
    createdAt?: string;
}

export interface Conversation {
    id: string;
    title: string;
    model: AiModel;
    messages: Message[];
}
