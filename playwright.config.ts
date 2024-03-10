import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: './src/e2e/mmi/.env' });
const logOutputFolder = './public/playwright-reports';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: 'src/e2e/mmi/specs',
  /* Maximum time one test can run for. */
  timeout: 70 * 2000,
  expect: {
    timeout: 30 * 2000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'on-failure',
        outputFolder: `${logOutputFolder}/html/`,
      },
    ],
    ['junit', { outputFile: `${logOutputFolder}/junit/test-results.xml` }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    video: 'off',
    // Run tests headless in local
    headless: process.env.HEADLESS === 'true',
    permissions: ["clipboard-read"],
    navigationTimeout: 10000,
    launchOptions: {
      args: [
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
      ],
    },
    screenshot: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'mmi',
      testMatch: ['**/*.spec.ts', 'starrynift.spec.ts'],
      testIgnore: ['**/*visual.spec.ts','faucet-beta-4.fuel.network.spec.ts', 'signup.spec.ts',], // ''
      use: {
        ...devices['Desktop Chrome'],
      },
    }
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: `${logOutputFolder}/test-artifacts/`,
};

export default config;
