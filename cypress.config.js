const { defineConfig } = require("cypress");
const { readFileSync } = require("fs");

module.exports = defineConfig({
  e2e: {
    // Implement node event listeners here
    setupNodeEvents(on, config) {

      // Check if an environment name has been specified in the configuration
      if (config.env.name !== undefined) {

        // If an environment name has been specified, load the corresponding environment file
        const envName = config.env.name;
        const envFile = readFileSync(
          "cypress/config/cypress." + envName + ".json"
        );

        // Parse the environment file as JSON and assign its properties to the configuration object
        const envValues = JSON.parse(envFile);
        config.env = {
          ...envValues,
        };
      }

      // Return the updated configuration object
      return config;
    },
    video: false,
    watchForFileChanges: false,
  },
});
