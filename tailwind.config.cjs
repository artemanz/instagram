/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          lightest: "#fafafa",
        },
        accent: {
          1: "#3b82f6",
          2: "#075985",
          3: "#ef4444",
        },
      },
    },
  },
  plugins: [],
};
