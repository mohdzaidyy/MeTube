/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      colors: {
        base: {
          DEFAULT: "#0a0a0f",
          surface: "#121218",
          raised: "#181820",
          border: "#26262f",
        },
        brand: {
          50: "#f5f1ff",
          100: "#ede4ff",
          200: "#dccbff",
          300: "#c1a4ff",
          400: "#a172ff",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6b28d9",
          800: "#5921b3",
          900: "#481c8f",
        },
        accent: {
          pink: "#ec4899",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(139,92,246,0.4), 0 0 24px -4px rgba(139,92,246,0.35)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0.96)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.15s ease-out",
      },
    },
  },
  plugins: [],
};
