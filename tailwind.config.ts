import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "var(--primary)",
                    light: "var(--primary-light)",
                    dark: "var(--primary-dark)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    light: "var(--accent-light)",
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
                muted: "var(--muted)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                heading: ["var(--font-poppins)", "sans-serif"],
                arabic: ["var(--font-amiri)", "serif"],
            },
        },
    },
    plugins: [],
} satisfies Config;
