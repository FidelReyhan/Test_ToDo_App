import { test, expect } from '@playwright/test';
import { loginWithValidCredentials } from '../utils/login';
import { createMultipleTodos } from '../utils/create';


test('Input Note', async ({ page }) => {
    await loginWithValidCredentials(page); // pakai fungsi reusable
    
    await page.locator('xpath=//*[@id="root"]/div/div[2]/input').fill("tes");
    // await page.waitForTimeout(500);

    // expect(await page.screenshot()).toMatchSnapshot('result-create-tc-1.png');

  });

test('Submit note and enter', async ({ page }) => {
    await loginWithValidCredentials(page); // pakai fungsi reusable
    
    const input1 = "Eating"
    await page.locator('xpath=//*[@id="root"]/div/div[2]/input').fill(input1);
    await page.keyboard.press('Enter');

    await expect(page.locator('div.flex.items-center.gap-2', { hasText: input1 })).toBeVisible();
    // await page.waitForTimeout(500);

    // expect(await page.screenshot()).toMatchSnapshot('result-create-tc-2.png');

  });

test('Submit note and click button send', async ({ page }) => {
    await loginWithValidCredentials(page); // pakai fungsi reusable
    
    const input1 = "Eating"
    await page.locator('xpath=//*[@id="root"]/div/div[2]/input').fill(input1);

    await page.getByTestId('submit-todo-button').click();
    await expect(page.locator('div.flex.items-center.gap-2', { hasText: input1 })).toBeVisible();
    // await page.waitForTimeout(500);

    // expect(await page.screenshot()).toMatchSnapshot('result-create-tc-3.png');

  });

  test('Create multiple todos', async ({ page }) => {
    await loginWithValidCredentials(page)
    await createMultipleTodos(page, "Eating", 4);
  
    for (let i = 1; i <= 4; i++) {
      await expect(page.getByText(`Eating ${i}`)).toBeVisible();
    }

    // await page.waitForTimeout(500);

    // expect(await page.screenshot()).toMatchSnapshot('result-create-tc-4.png');


  });
  