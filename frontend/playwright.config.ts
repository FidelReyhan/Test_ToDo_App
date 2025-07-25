import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000', // ganti sesuai URL lokal project kamu
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure', // 👈 Screenshot otomatis kalau gagal
    trace: 'retain-on-failure',    // (opsional) rekam jejak error
  },
});




