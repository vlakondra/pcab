const config = {
  content: ["./src/**/*.{html,js,svelte,ts}",],


  theme: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/forms'),
    require("daisyui"),

  ],
  darkMode: 'class',
};

module.exports = config;

//require('flowbite/plugin')
    // "./node_modules/flowbite/**/*.js",
    //"./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],