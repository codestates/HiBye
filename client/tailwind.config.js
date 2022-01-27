module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        hibye: {
          100: "#9B3264", // hibye_maroon
          80: "#D70569", // hibye_orchid
          60: "#FF96AF", // hibye_pink
          40: "#FFAFD2", // hibye_rose
          20: "#FFEBF0", // hibye_blush
          10: "#FBFBFB", // hibye_snow
        },
        gray: {
          100: "#333333",
          80: "#666666",
          60: "#999999",
          40: "#CCCCCC",
          20: "#E0E0E0",
          10: "#EFEFEF",
        },
      },
      backgroundImage: {
        "hibye-banner": "url('../public/images/banner.jpg')",
        "hibye-main-1-front": "url('../public/images/main-1-front.jpg')",
        "hibye-main-1-back": "url('../public/images/main-1-back.jpg')",
        "hibye-main-2": "url('../public/images/main-2.jpg')",
        "hibye-signup": "url('../public/images/signup.jpg')",
      },
    },
  },
  plugins: [],
};
