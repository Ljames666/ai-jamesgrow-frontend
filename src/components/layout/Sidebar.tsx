"use client";
import { AiModel } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "../ui/ConfimModal";
import { clearAuth } from "@/lib/auth";

export default function Sidebar({
    currentModel,
    onModelChange,
}: {
    currentModel: AiModel;
    onModelChange: (model: AiModel) => void;
}) {
    const router = useRouter();
    const models: { id: AiModel; name: string; color: string }[] = [
        { id: "gemini", name: "Gemini", color: "bg-green-500" },
        { id: "gpt", name: "GPT", color: "bg-blue-500" },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        clearAuth();
        router.push("/");
    };

    return (
        <>
            <div className='w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col'>
                <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                    <h1 className='font-bold text-lg dark:text-white'>JamesGrow.AI</h1>
                </div>
                <div className='p-4 space-y-2 flex-1'>
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
                <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='w-full py-2 px-3 text-sm text-red-600 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition flex items-center justify-center'
                    >
                        Sair da conta
                    </button>
                </div>
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleLogout}
                title='Sair do JamesGrow.AI'
                message='Você será desconectado e redirecionado para a página de login.'
                confirmText='Sim, sair'
                cancelText='Cancelar'
            />
        </>
    );
}
