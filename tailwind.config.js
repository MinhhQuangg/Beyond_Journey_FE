/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary_1: "#213A58",
        primary_2: "#0C6478",
        primary_3: "#15919B",
        primary_4: "#09D1C7",
        primary_5: "#46DFB1",
        primary_6: "#80EE98",
        secondary_1: "#728156",
        secondary_2: "#88976C",
        secondary_3: "#98A77C",
        secondary_4: "#B6C99B",
        secondary_5: "#CFE189",
        secondary_6: "#E7F5DC",
        "black-100": "#333333",
        "black-200": "#C0C0C0",
        "white-100": "#FAFAFA",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        sm: "1050px",
        md: "1260px",
        lg: "1577px",
        xl: "1971px",
        "2xl": "2236px",
      },
    },
  },
  plugins: [],
};
