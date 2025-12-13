import { Message } from "@/types";

export default function MessageBubble({ message }: { message: Message }) {
    const isUser = message.role === "user";

    return (
        <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`p-3 rounded-2xl max-w-[80%] ${
                    isUser
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                }`}
            >
                <p>
                    <strong>{isUser ? "Você" : "AI"}</strong>: &nbsp;
                    {new Date(message.createdAt as string).toLocaleString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
                {message.content}
            </div>
        </div>
    );
}
