/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1c1b1b",
        secondary: "#b1785a",
        footerClr: "#e4e2df",
        footerClr2: "#eaeaea",
      },
      fontFamily: {
        sans: ["Poppins", "Helvetica", "Arial", "sans"],
      },
      backgroundImage: {
        "not-found":
          "url('https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_1280.jpg')",
        "custom-conic-gradient":
          "conic-gradient(from 229deg at 100% 100%, #8e9aaf 0%, #23276E00 0%,  #8e9aaf 90%, #FFFFFF 70%)",
        "dark-custom-conic-gradient":
          "conic-gradient(from 229deg at 100% 100%, #000 0%, #23276E00 0%,  #000 90%, #FFFFFF 70%)",
      },
      height: {
        swiper: "86.9vh",
        70: "70vh",
        78: "78vh",
        88: "87vh",
      },

      margin: {
        calc: "calc(.9rem - 7px)",
      },
      spacing: {
        "90%": "90%",
      },
      boxShadow: {
        custom: "1px 1px 2px rgba(22, 22 , 0, 0.1)",
      },
      transitionDuration: {
        4000: "4000ms",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(.215,.61,.355,1)",
        "out-expo": "cubic-bezier(.215,.61,.355,1",
      },
    },
  },
  variants: {},
  plugins: [],
};
