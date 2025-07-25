import { Page, expect } from '@playwright/test';
import { loginWithValidCredentials } from '../utils/login';


export async function createNotes(page: Page, input: string = 'Makan') {
    await page.goto('http://localhost:3000');
  
    await page.locator('xpath=//*[@id="root"]/div/div[2]/input').fill(input);

    await page.getByTestId('submit-todo-button').click();

    await expect(page.locator('div.flex.items-center.gap-2', { hasText: input })).toBeVisible();

    return input;


    
  }

export async function createMultipleTodos(page: Page, baseName: string = "Makan", count = 4) {
    await page.goto('http://localhost:3000');

    for (let i = 1; i <= count; i++) {
      const todoName = `${baseName} ${i}`;
  
      // Isi input
      await page.locator('input').first().fill(todoName);
  
      // Klik tombol register (atau enter, sesuai alur app kamu)
      await page.keyboard.press('Enter');
  
      // Tunggu elemen muncul (optional, biar aman)
    //   await page.getByText(todoName).waitFor();
    }
  }
  