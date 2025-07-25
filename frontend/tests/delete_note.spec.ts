import { test, expect } from '@playwright/test';
import { loginWithValidCredentials } from '../utils/login';
import { createNotes } from '../utils/create';
import { createMultipleTodos } from '../utils/create';

test('Create new notes and click delete icon notes', async ({ page }) => {
    await loginWithValidCredentials(page); // pakai fungsi reusable
    await createNotes(page);

    const found = await page.locator('svg[data-testid^="delete-todo-"]');
    const button = page.locator('svg[data-testid^="delete-todo-"]');
    await button.waitFor({ state: 'visible' }); //wait the button
    await button.click();

    await page.waitForTimeout(500); // kasih jeda biar DOM stabil

    expect(await page.screenshot()).toMatchSnapshot('result-delete-tc-1.png');

});

test('Create new notes and delete all', async ({ page }) => {
        await loginWithValidCredentials(page)
        await createMultipleTodos(page, "Makan", 4);
      
        for (let i = 1; i <= 4; i++) {
          await expect(page.getByText(`Makan ${i}`)).toBeVisible();
        }
        let count = await page.locator('svg[data-testid^="delete-todo-"]').count();

        for (let i = 0; i < count; i++) {
          const current = page.locator('svg[data-testid^="delete-todo-"]').first();
          await current.waitFor({ state: 'visible' });
          await current.click();
          await page.waitForTimeout(500); // kasih jeda biar DOM stabil
        }
        expect(await page.screenshot()).toMatchSnapshot('result-delete-tc-2.png');

    
})