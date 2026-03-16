import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  testMatch: ['demos/src/**/*.spec.{js,ts}', 'tests/e2e/**/*.spec.{js,ts}'],
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm exec http-server ./demos/dist -s -p 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  workers: process.env.CI ? 4 : undefined,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  fullyParallel: true,
})
