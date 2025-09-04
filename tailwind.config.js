/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components}/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
};
