const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://rarocrud-frontend-88984f6e4454.herokuapp.com/users',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
