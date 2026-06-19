import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Deep, premium greens
        forest: {
          DEFAULT: "#12321f",
          50: "#f0f6f1",
          100: "#dcebe0",
          200: "#bad7c2",
          300: "#8eba9c",
          400: "#5d9670",
          500: "#3d7853",
          600: "#2c5e40",
          700: "#234b34",
          800: "#1c3b2a",
          900: "#12321f",
          950: "#0a1d12",
        },
        // Warm earth / sand tones
        earth: {
          DEFAULT: "#8a7355",
          50: "#faf7f2",
          100: "#f1e9dc",
          200: "#e2d2bb",
          300: "#cdb491",
          400: "#b8956a",
          500: "#a87f53",
          600: "#8a7355",
          700: "#6f5a40",
          800: "#5b4a37",
          900: "#4b3e30",
        },
        cream: "#f8f6f0",
        bark: "#2a2620",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(18, 50, 31, 0.18)",
        "card-lg": "0 24px 60px -18px rgba(18, 50, 31, 0.28)",
        cta: "0 12px 30px -8px rgba(44, 94, 64, 0.45)",
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(180deg, rgba(10,29,18,0.55) 0%, rgba(10,29,18,0.35) 35%, rgba(10,29,18,0.75) 100%)",
        "grain":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(61,120,83,0.55)" },
          "70%": { boxShadow: "0 0 0 16px rgba(61,120,83,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(61,120,83,0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "pulse-ring": "pulse-ring 2s infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
