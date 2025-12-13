import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { MessageProvider } from "@/context/MessageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "AI Chat",
    description: "Chat com Gemini e GPT",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
                    <MessageProvider>{children}</MessageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
