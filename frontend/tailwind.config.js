/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        purple: "0 0px 40px rgba(139, 92, 246, 0.5)", // Customize the shadow color
      },
    },
  },
  plugins: [],
};
