/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    screens: {
      lg: { min: "1200px" },
      md: { max: "1200px", min: "700px" },
      sm: { max: "700px", min: "0px" },
    }
  },
  plugins: [
    require('flowbite')
  ],
}

