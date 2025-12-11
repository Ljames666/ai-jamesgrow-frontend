import { AiModel } from "@/types";
import { useState } from "react";

export default function Sidebar({
    currentModel,
    onModelChange,
}: {
    currentModel: AiModel;
    onModelChange: (model: AiModel) => void;
}) {
    const models: { id: AiModel; name: string; color: string }[] = [
        { id: "gemini", name: "Gemini", color: "bg-green-500" },
        { id: "gpt", name: "GPT", color: "bg-blue-500" },
        { id: "qwen", name: "Qwen", color: "bg-purple-500" },
    ];

    return (
        <div className='w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col'>
            <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                <h1 className='font-bold text-lg dark:text-white'>AI Chat</h1>
            </div>
            <div className='p-4 space-y-2'>
                {models.map((model) => (
                    <button
                        key={model.id}
                        onClick={() => onModelChange(model.id)}
                        className={`w-full text-left p-2 rounded flex items-center ${
                            currentModel === model.id
                                ? "bg-gray-200 dark:bg-gray-700"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                    >
                        <span className={`w-3 h-3 rounded-full mr-2 ${model.color}`}></span>
                        <span className='dark:text-white'>{model.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
