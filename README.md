# 💬 JAMESGROW.AI — Experiência de Usuário de Classe Empresarial

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Frontend de alta fidelidade** inspirado na UI do [Qwen Chat](https://chat.qwen.ai), construído com
**Next.js App Router**, **TypeScript strict** e **Tailwind CSS**. Implementa WebSocket em tempo real
com fallback para REST, temas adaptativos e acessibilidade WCAG 2.1 AA.

---

## 🎯 Princípios de Design

-   **UX de referência**: Sidebar com modelos, área central de chat, input fixo
-   **Performance**: Zero layout shift, hydration otimizada, code splitting
-   **Acessibilidade**: Contraste adequado, ARIA labels, navegação por teclado
-   **Resiliência**: Fallback automático WebSocket → REST em falhas de rede
-   **Segurança**: JWT em `localStorage` (dev) → cookies httpOnly (futuro)

---

## 🛠 Stack Técnica & Estratégia

| Categoria        | Tecnologia                   | Estratégia                                                        |
| ---------------- | ---------------------------- | ----------------------------------------------------------------- |
| **Framework**    | Next.js 14 (App Router)      | Server Components para SEO, Client Components para interatividade |
| **Estado**       | React Hooks nativos          | Zero bibliotecas externas, estado localizado                      |
| **Estilização**  | Tailwind CSS + `next-themes` | Design system responsivo, temas claro/escuro                      |
| **Realtime**     | Socket.IO Client             | Reconexão automática, fallback para fetch                         |
| **Autenticação** | `localStorage` (dev)         | Futuro: cookies httpOnly com SSR                                  |
| **Ícones**       | Lucide React                 | Ícones SVG leves, tree-shakable                                   |
| **Deploy**       | Vercel Edge Network          | Pré-visualização por PR, analytics integrado                      |

---

## ▶️ Desenvolvimento Local

### Pré-requisitos

-   **Node.js** `^20.12.0` ou `^22.16.0`
-   Backend rodando em `http://localhost:8081`

### Passo a Passo

1. **Clone e instale**

    ```bash
    git clone https://github.com/Ljames666/ai-jamesgrow-frontend.git
    cd ai-jamesgrow-frontend
    npm ci
    ```

2. **Configure `.env.local`**

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8081
    ```

3. **Inicie**

    ```bash
    npm run dev
    ```

    Acesse: `http://localhost:3000`

> 📌 **Nota**: A porta padrão é `3000`. Use `PORT=3001` se houver conflito.

---

## 🧩 Arquitetura de Componentes

### Fluxo de Navegação

| Rota                  | Tipo                 | Proteção                   | Justificativa                        |
| --------------------- | -------------------- | -------------------------- | ------------------------------------ |
| `/`                   | Server Component     | Redireciona se autenticado | Otimização de rota inicial           |
| `/login`, `/register` | Client Component     | Acesso livre               | Formulários interativos              |
| `/chat`               | **Client Component** | Protegido por `useEffect`  | Necessita WebSocket e `localStorage` |

> ✅ **Por que `/chat` é Client Component?** Porque depende de APIs exclusivas do cliente:
> `WebSocket`, `localStorage`, `useEffect`.

### Estratégia de Hidratação

-   **Evita mismatch**: Todo estado dependente de `window` é inicializado em `useEffect`
-   **Carregamento inicial**: Histórico buscado via `fetch` no `useEffect` de `ChatUI`
-   **Feedback visual**: Indicador "Digitando..." durante requisições

---

## 🔌 Integração com Backend

### WebSocket

-   **Conexão**: Estabelecida com `socket.io` no `useEffect` de `ChatUI`
-   **Autenticação**: `Authorization: Bearer <token>` no handshake
-   **Eventos**:
    -   `chat:message` → envia mensagem do usuário
    -   `message` → recebe resposta da IA
    -   `typing` → ativa indicador visual
    -   `error` → ativa fallback para REST

### Fallback REST

-   **Gatilho**: Erro de conexão WebSocket (ex: CORS, timeout)
-   **UX**: Mensagens locais exibidas imediatamente, rollback em falha
-   **Endpoint**: `POST /chat` com mesmo payload do WebSocket

---

## 🌐 Deploy no Vercel

1. Conecte ao repositório no [Vercel Dashboard](https://vercel.com)
2. Defina variável de ambiente:
    ```env
    NEXT_PUBLIC_API_URL = https://seu-backend.onrender.com
    ```
3. Clique em **Deploy**

> ✅ **Vantagens do Vercel**:
>
> -   Edge Caching para baixa latência global
> -   Pré-visualização automática por Pull Request
> -   Analytics de desempenho integrado

---

## 📂 Estrutura de Pastas

```
src/
├── app/                # App Router
│   ├── layout.tsx      # Layout raiz com ThemeProvider
│   ├── page.tsx        # Home (Server Component)
│   ├── login/
│   ├── register/
│   └── chat/
│       └── page.tsx    → Client Component (ChatPage)
├── components/
│   ├── layout/         # Sidebar, ChatContainer
│   ├── chat/           # MessageBubble, InputBar
│   └── ui/             # ThemeToggle, Button
├── lib/
│   ├── api.ts          # fetch wrapper com tratamento de erros
│   ├── socket.ts       # Socket.IO factory com reconexão
│   └── auth.ts         # getToken, logout
└── types/              # Interfaces TypeScript
```

---

## 📜 Licença

MIT — veja [LICENSE](LICENSE).

---

## 🔄 Roadmap Técnico

-   [ ] **Autenticação SSR**: Migração para cookies httpOnly com `getServerSession`
-   [ ] **Cache inteligente**: Zustand + persistência local com fallback
-   [ ] **Upload multimodal**: Suporte a imagens com Gemini Vision
-   [ ] **i18n**: Internacionalização com next-intl
-   [ ] **Testes E2E**: Cypress com cenários de WebSocket e REST

---

> 🚀 **Dica de produtividade**: Use `npm run dev -- -p 3001` para rodar em porta alternativa sem
> conflitos.
