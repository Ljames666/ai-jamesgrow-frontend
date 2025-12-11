import { useState } from "react";

export default function InputBar({
    onSend,
    disabled,
}: {
    onSend: (text: string) => void;
    disabled: boolean;
}) {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput("");
        }
    };

    return (
        <div className='p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'>
            <form onSubmit={handleSubmit} className='flex space-x-2'>
                <input
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Digite sua mensagem...'
                    className='flex-1 p-3 rounded border dark:bg-gray-700 dark:text-white'
                    disabled={disabled}
                />
                <button
                    type='submit'
                    disabled={disabled || !input.trim()}
                    className='bg-blue-600 text-white px-6 rounded hover:bg-blue-700 disabled:opacity-50'
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}
