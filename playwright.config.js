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
  workers: process.env.CI ? 1 : 1,
  timeout: 30 * 1000,

  reporter: process.env.CI
    ? [
        [
          "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
          {
            slackWebHookUrl: process.env.SLACK_WEBHOOK_URL,
            sendResults: "always", // "always" , "on-failure", "off"
            maxNumberOfFailuresToShow: 0,
            meta: [
              {
                key: ":eb: Essential Blocks - Test Results",
                value: "<https://hurayraiit.github.io/playwright-automation-essential-blocks/ | 📂 Click Here!>",
              },
            ],
          },
        ],
        ["html"],
      ]
    : [["dot"], ["list"], ["html"]],

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
  ],
});
