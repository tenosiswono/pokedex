import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "pokedex",
  viewportHeight: 1000,
  viewportWidth: 1280,
  retries: {
    runMode: 1,
    openMode: 1,
  },

  experimentalStudio: true,

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
