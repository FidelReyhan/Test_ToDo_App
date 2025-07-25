import { Page, expect } from '@playwright/test';


export async function deleteAllTodos(page) {
    const deleteIcons = page.locator('svg[data-testid^="delete-todo-"]');
    let total = await deleteIcons.count();
  
    while (total > 0) {
      const current = deleteIcons.first();
      await current.waitFor({ state: 'visible' });
      await current.click();
      await page.waitForTimeout(300); // Biar DOM stabil setelah delete
      total = await deleteIcons.count(); // update total setelah penghapusan
    }
  
    // Screenshot hasil akhir
  }
  
  