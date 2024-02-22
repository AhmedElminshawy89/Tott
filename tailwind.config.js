/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          400: "#CA933F",
        },
      },
    },
    screens: {
      "min-sm": "442px",
      "sm":"640px ",
      "md": "768px",
      "lg":"1024px",
      "xl":"1280px",
      "2xl":"1536px",
    },
  },
  plugins: [],
};
