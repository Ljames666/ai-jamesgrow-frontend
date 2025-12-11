"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export function useAuth() {
    const router = useRouter();
    useEffect(() => {
        if (!getToken()) {
            router.push("/login");
        }
    }, [router]);
}
