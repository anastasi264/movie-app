/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      // 1280px - 1536px - desktop
      '2xl': { max: "1536px" },
      // 1024px - 1280px - desktop
      xl: { max: "1280px" },
      // 768px - 1024px - tablet
      lg: { max: "1024px" },
      // 640px - 768px - mobile
      md: { max: "768px" },
      // 0 - 640px - xs mobile
      sm: { max: "425px" }
    },
  },
  plugins: [],
}

