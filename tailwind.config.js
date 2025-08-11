/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#ff007f",
          pink2: "#ff4fa2",
          blue: "#0a6dbf",
          deep: "#1f1c2c",
          dark: "#0a0a0a",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(255,0,127,0.25)",
      },
    },
  },
  plugins: [],
}
