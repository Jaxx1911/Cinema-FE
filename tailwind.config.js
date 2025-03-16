/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        colors: {
          background: "#000000",
          foreground: "#ffffff",
          primary: "#fcc434",
          muted: "#79797b",
          "muted-foreground": "#919194",
          border: "#333333",
          input: "#1a1a1a",
          card: "#1a1a1a",
        },
      },
    },
    plugins: [],
  }
  
  