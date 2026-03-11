import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
      },
      colors: {
        base: "#0a0a0b",
        engineers: {
          accent: "#22d3ee",
          muted: "rgba(34, 211, 238, 0.1)",
          border: "rgba(34, 211, 238, 0.2)",
        },
        pms: {
          accent: "#58a6ff",
          muted: "rgba(88, 166, 255, 0.1)",
          border: "rgba(88, 166, 255, 0.15)",
        },
        leaders: {
          accent: "#c9a96e",
          muted: "rgba(201, 169, 110, 0.1)",
          border: "rgba(201, 169, 110, 0.15)",
        },
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "cursor-blink": "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
