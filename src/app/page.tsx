"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken } from "@/lib/auth";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function HomePage() {
    const router = useRouter();

    // Redireciona para /chat se já estiver logado
    useEffect(() => {
        if (getToken()) {
            router.push("/chat");
        }
    }, [router]);

    return (
        <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900'>
            {/* Header */}
            <header className='p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800'>
                <h1 className='text-xl font-bold dark:text-white'>AI Chat</h1>
                <ThemeToggle />
            </header>

            {/* Main Content */}
            <main className='flex-1 flex flex-col items-center justify-center p-6 text-center'>
                <div className='max-w-2xl'>
                    <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                        Converse com a inteligência artificial
                    </h2>
                    <p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
                        Escolha entre Gemini e GPT para obter respostas rápidas, precisas e
                        personalizadas.
                    </p>

                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <Link
                            href='/login'
                            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
                        >
                            Entrar
                        </Link>
                        <Link
                            href='/register'
                            className='px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition'
                        >
                            Criar conta
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className='p-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800'>
                © {new Date().getFullYear()} AI Chat. Todos os direitos reservados.
            </footer>
        </div>
    );
}
