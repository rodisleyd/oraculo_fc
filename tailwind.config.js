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
        background: "#121212",
        surface: "#1E1E1E",
        primary: "#39FF14", // Electric Green
        "primary-foreground": "#000000",
        secondary: "#E0E0E0", // Neutral Gray
        accent: "#007BFF", // Vibrant Blue
        warning: "#FFD700", // Gold
        danger: "#FF3B30", // Red
        muted: "#2A2A2A",
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
