const config = {
  content: ["./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
  darkMode: 'class',
};

module.exports = config;