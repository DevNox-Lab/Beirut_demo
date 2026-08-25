import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#010103",
          900: "#010103",
          800: "#070709",
          700: "#0d0d12",
          600: "#15151d",
        },
        gold: {
          DEFAULT: "#faeaae",
          light: "#fff6d6",
          mid: "#e9cf7f",
          deep: "#c8a13d",
        },
        crimson: {
          DEFAULT: "#bc0b11",
          light: "#e0342f",
          deep: "#7d060a",
        },
        emerald: {
          brand: "#0d730f",
          light: "#16a018",
          deep: "#064a07",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        arabic: ["var(--font-arabic)", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(250, 234, 174, 0.35)",
        "glow-crimson": "0 0 50px -10px rgba(188, 11, 17, 0.55)",
        luxe: "0 30px 80px -30px rgba(0,0,0,0.85)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #fff6d6 0%, #faeaae 30%, #c8a13d 70%, #8a6a1f 100%)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(250,234,174,0.08), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
