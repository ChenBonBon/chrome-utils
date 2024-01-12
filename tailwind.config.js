/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        main: "Noto Sans SC Variable",
      },
      animation: {
        swiper: "swiper 3s linear infinite",
      },
      keyframes: {
        swiper: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(calc(-100% + 300px))" },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
