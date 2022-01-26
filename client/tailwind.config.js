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
    },
  },
  plugins: [],
};
