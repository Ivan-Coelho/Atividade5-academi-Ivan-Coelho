const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://rarocrud-frontend-88984f6e4454.herokuapp.com',
    //specPattern: 'cypress/e2e/**/*.feature',
    setupNodeEvents(on, config) {
      //on('file:preprocessor', cucumber());
      // implement node event listeners here
    },
  },
});
