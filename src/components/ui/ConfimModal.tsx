"use client";
import { useState, useEffect } from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmar ação",
    message = "Tem certeza que deseja continuar?",
    confirmText = "Sim, sair",
    cancelText = "Cancelar",
}: ConfirmModalProps) {
    // Fecha com tecla ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
            window.addEventListener("keydown", handleEsc);
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
            <div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200'>
                <h2 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>{title}</h2>
                <p className='text-gray-600 dark:text-gray-300 mb-6'>{message}</p>
                <div className='flex justify-end gap-3'>
                    <button
                        onClick={onClose}
                        className='px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition'
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
