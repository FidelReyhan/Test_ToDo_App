import { Page, expect } from '@playwright/test';

export async function loginWithValidCredentials(page: Page, username: string = 'user1') {
  await page.goto('http://localhost:3000');

  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill('password1');
  await page.click('button[type="submit"]');

  await expect(page.getByText(`noted, ${username}`)).toBeVisible();
}