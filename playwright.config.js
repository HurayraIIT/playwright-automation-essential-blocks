"use strict";

import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

config();

export default defineConfig({
  testDir: "./tests",
  globalSetup: "./src/global-setup",
  globalTeardown: "./src/global-teardown",

  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  timeout: 60 * 1000,

  reporter: [["dot"], ["list"], ["html"]],

  use: {
    baseURL: process.env.WP_BASE_URL,
    storageState: process.env.WP_AUTH_STORAGE,
    testIdAttribute: "data-id",

    screenshot: "on",
    trace: "retain-on-failure",
    video: "on-first-retry",

    ignoreHTTPSErrors: true,
    locale: "en-US",
    contextOptions: {
      reducedMotion: "reduce",
      strictSelectors: true,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
});
