import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate"; // ✅ nome correto

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [animatePlugin], // ✅ use a variável importada
} satisfies Config;
