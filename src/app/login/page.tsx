"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { saveToken } from "@/lib/auth";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api("/auth/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });
            saveToken(res.access_token);
            router.push("/chat");
        } catch (err: any) {
            alert(err.message || "Login falhou");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4'>
            <form onSubmit={handleSubmit} className='w-full max-w-md space-y-4'>
                <h1 className='text-2xl font-bold text-center dark:text-white'>Login</h1>
                <input
                    type='text'
                    placeholder='Usuário'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='w-full p-3 rounded border dark:bg-gray-800 dark:text-white'
                    required
                />
                <input
                    type='password'
                    placeholder='Senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full p-3 rounded border dark:bg-gray-800 dark:text-white'
                    required
                />
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50'
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
                <p className='text-center text-sm dark:text-gray-400'>
                    Não tem conta?{" "}
                    <a href='/register' className='text-blue-500'>
                        Cadastre-se
                    </a>
                </p>
            </form>
        </div>
    );
}
