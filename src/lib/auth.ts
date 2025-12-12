"use client";
export const saveToken = (token: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("access_token", token);
    }
};

export const getToken = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("access_token");
    }
    return null;
};

export const clearAuth = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
    }
};
