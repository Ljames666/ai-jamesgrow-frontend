export const saveToken = (token: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
    }
};

export const getToken = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
};

export const clearAuth = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
    }
};
