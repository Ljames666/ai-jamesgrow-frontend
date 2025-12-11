const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = async (path: string, options: RequestInit = {}) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(error.message || "Erro na requisição");
    }
    return res.json();
};
