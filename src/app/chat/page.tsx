import { authOptions } from "@/lib/auth"; // não temos ainda, mas vamos simular
import { api } from "@/lib/api";
import { Message } from "@/types";
import ChatUI from "@/components/layout/ChatContainer";
import { useAuth } from "@/hooks/useAuth";

// Simulamos o token no server via cookie (em produção, use httpOnly cookie)
async function getServerToken(cookies: string) {
    // Aqui você extrairia o token do cookie com `next/headers`
    // Para simplificar, vamos carregar histórico somente no client
    return null;
}

export default async function ChatPage() {
    // Como WebSocket é client-only, carregamos histórico no client
    // Mas mantemos a página protegida via rota (verificado no client)
    useAuth();
    return <ChatUI />;
}
