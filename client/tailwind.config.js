/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        "supercell": ["Lilita One", "sans-serif"],
        "poppins": ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}