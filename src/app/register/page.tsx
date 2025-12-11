"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { saveToken } from "@/lib/auth";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            setLoading(false);
            return;
        }

        try {
            // 1. Registrar usuário
            await api("/auth/register", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });

            // 2. Fazer login automaticamente após registro
            const loginRes = await api("/auth/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });

            saveToken(loginRes.access_token);
            router.push("/chat");
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Falha ao criar conta. Tente outro nome de usuário.";
            setError(message || "Falha ao criar conta. Tente outro nome de usuário.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4'>
            <div className='w-full max-w-md space-y-6'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold dark:text-white'>Criar conta</h1>
                    <p className='text-gray-600 dark:text-gray-400 mt-2'>
                        Já tem uma conta?{" "}
                        <Link
                            href='/login'
                            className='text-blue-600 hover:underline dark:text-blue-400'
                        >
                            Entrar
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label
                            htmlFor='username'
                            className='block text-sm font-medium dark:text-white'
                        >
                            Usuário
                        </label>
                        <input
                            id='username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='mt-1 w-full p-3 rounded border dark:bg-gray-800 dark:text-white'
                            required
                            minLength={3}
                            maxLength={30}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium dark:text-white'
                        >
                            Senha
                        </label>
                        <input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mt-1 w-full p-3 rounded border dark:bg-gray-800 dark:text-white'
                            required
                            minLength={6}
                        />
                        <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
                            Mínimo de 6 caracteres, com letra maiúscula, minúscula e número.
                        </p>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50'
                    >
                        {loading ? "Criando conta..." : "Criar conta"}
                    </button>
                </form>
            </div>
        </div>
    );
}
