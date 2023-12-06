/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        main: "Noto Sans SC Variable",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
