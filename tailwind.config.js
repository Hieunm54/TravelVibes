/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "3/10": "30%",
        "7/10": "70%",
      },
      backgroundColor: {
        "rgb-blue": "rgb(55, 151, 240)",
        "rgb-black": "rgba(0, 0, 0, 0.65)",
        "rgb-cover-gray": "#fff",
      },
      textColor: {
        "rgb-white": "rgb(255, 255, 255)",
        "sm-white": "rgb(115, 115, 115)",
      },
      backgroundImage: {
        hanoi: "url('src/assets/hanoi.jpeg')",
      },
    },
  },
  plugins: [],
};
