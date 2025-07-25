import { test, expect } from '@playwright/test';
import { loginWithValidCredentials } from '../utils/login';
import { createNotes } from '../utils/create';
import { deleteAllTodos } from '../utils/delete';


test('Create new notes and click edit icon notes', async ({ page }) => {
    await loginWithValidCredentials(page); // pakai fungsi reusable
    await createNotes(page);
    const noteItem = await createNotes(page); // noteItem is 'Makan' now

    const card = await page.locator('text=Makan').first();
    await card.locator('[data-testid^="edit-todo-"]').click();

    await deleteAllTodos(page);
    // expect(await page.screenshot()).toMatchSnapshot('result-edit-tc-1.png');


  });



test('Create new notes and click edit notes', async ({ page }) => {
    await loginWithValidCredentials(page); // login reusable
    await createNotes(page);
  
    const newItem = "Tidur";
    const card = await page.locator('text=Makan').first();
    await card.locator('[data-testid^="edit-todo-"]').click();
    
  

    const input = page.locator('input').first();
    await input.click();
    await input.press('Meta+A');
    await input.press('Backspace');
    await page.waitForTimeout(500);
    await input.fill(newItem);

    await expect(input).toHaveValue(newItem); // pastikan input berubah
    await page.getByTestId('submit-todo-button').click({ force: true });

  
    // Verifikasi teks baru muncul
    await page.getByText(newItem).waitFor({state: 'visible'});
    // expect(await page.screenshot()).toMatchSnapshot('result-edit-tc-2.png');
    await deleteAllTodos(page);


  });

test('Create new notes and click edit to add notes', async ({ page }) => {
    await loginWithValidCredentials(page); // login reusable
    await createNotes(page);

    const noteItem = await createNotes(page); // noteItem = 'Makan 1'
    const newItem = " Dinner";
    const edit_button = await page.locator('#edit-todo').first();
    await edit_button.click()

    const input = page.locator('input').first();
    await input.click();
    
    await input.fill(newItem);
    await expect(input).toHaveValue(newItem); // pastikan input berubah

    await page.waitForTimeout(2000); // kasih jeda biar DOM stabil
    
    await page.getByTestId('submit-todo-button').waitFor({ state: 'visible' });
    await page.getByTestId('submit-todo-button').press('Enter');



  
    // Verifikasi teks baru muncul
    await page.getByText(newItem).waitFor({state: 'visible'});
    // expect(await page.screenshot()).toMatchSnapshot('result-edit-tc-2.png');
    await deleteAllTodos(page);

  });

