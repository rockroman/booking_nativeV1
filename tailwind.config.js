/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10362d",
        fields: "#173c35",
        primButton: "#ddf246",
        blurred: "rgba(0,0,0,0.5)",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        bakers: ["BaskervvilleSC-Regular"],
        jostSB: ["Jost-SemiBold"],
        jostB: ["Jost-Bold"],
        jostItal: ["Jost-italic"],
      },
    },
  },
  plugins: [],
};
