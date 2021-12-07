module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#2288FF",
        "primary-light": "#A6CFFF"
      },
      width: {
        "32rem": "32rem"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
