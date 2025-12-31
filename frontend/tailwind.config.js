/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0a214f",
          dark: "#061429",
          light: "#1a3a6b"
        },
        accent: {
          DEFAULT: "#fe7245",
          dark: "#e55a2b",
          light: "#ff8a66"
        }
      }
    }
  },
  plugins: []
};

