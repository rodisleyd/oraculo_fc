/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "#E0E0E0",
        accent: "#007BFF",
        warning: "#FFD700",
        danger: "#FF3B30",
        muted: "var(--border-muted)",
        "text-main": "var(--text-main)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Assuming Inter or similar clean sans
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(57, 255, 20, 0.3)',
        'neon-strong': '0 0 20px rgba(57, 255, 20, 0.5)',
      }
    },
  },
  plugins: [],
}
