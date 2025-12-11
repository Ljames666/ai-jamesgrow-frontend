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
                {message.content}
            </div>
        </div>
    );
}
