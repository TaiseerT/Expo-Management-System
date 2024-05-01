/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/App.js",
    "./src/components/shop/Header.jsx",
    "./src/components/shop/productCard.jsx",
    "./src/pages/Shop.js",
    "./src/components/shop/Cart.jsx",
    "./src/components/shop/Footer.jsx",
    "./src/components/shop/productDetail.jsx",
    "./src/pages/ExposPage.js",
    "./src/components/shop/ExposHeader.jsx",
    "./src/components/Expo/expoDetail.jsx",
    "./src/components/Expo/expoCard.jsx",
    "./src/pages/Login.js",
    "./src/pages/ForgotPassword.js",
    "./src/pages/SignUp.js",
    "./src/pages/Form.js",
    "./src/pages/Home.js",
    "./src/pages/updateProduct.js",
    "./src/pages/Error.js",
    "./src/pages/addInvestor.js",
    "./src/pages/createInvestor.js",
    "./src/pages/addOwner.js",
    "./src/pages/addProduct.js",
    "./src/pages/Shop.js",
    
  ],
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        teal: colors.teal,
        cyan: colors.cyan,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
