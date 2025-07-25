import { test, expect } from '@playwright/test';
import { loginWithValidCredentials } from '../utils/login';
import { createNotes } from '../utils/create';

test('Create new notes and click edit icon notes', async ({ page }) => {
    await loginWithValidCredentials(page); // pakai fungsi reusable
    await createNotes(page);
    const noteItem = await createNotes(page); // noteItem is 'Makan' now

    const first_note = await page.locator('#edit-todo').first();
    await first_note.click()
    expect(await page.screenshot()).toMatchSnapshot('result-edit-tc-1.png');

  });



test('Create new notes and click edit notes', async ({ page }) => {
    await loginWithValidCredentials(page); // login reusable
  
    const noteItem = await createNotes(page); // noteItem = 'Makan 1'
    const newItem = "Tidur";
  
    // Klik tombol edit berdasarkan teks note yang dibuat
    const first_note = await page.locator('.edit-todo').first();
    await first_note.click()
    await page.waitForTimeout(500); // kasih jeda biar DOM stabil

  
    // Temukan input-nya (gunakan CSS selector biasa, bukan XPath)
    const input = page.locator('input');
  
    // Fokus, hapus isi, lalu ketik baru
    await input.click();
    await input.press('Meta+A'); // untuk macOS, 'Meta' adalah Command
    await input.press('Backspace');
    await page.waitForTimeout(500);
    await input.type(newItem);


    // Submit dengan Enter (kalau memang enter untuk menyimpan)
    await page.keyboard.press('Enter');
  
    // Verifikasi teks baru muncul
    await page.getByText(newItem).waitFor({state: 'visible'});
    expect(await page.screenshot()).toMatchSnapshot('result-edit-tc-2.png');

  });

test('Create new notes and click edit to add notes', async ({ page }) => {
    await loginWithValidCredentials(page); // login reusable
  
    const noteItem = await createNotes(page); // noteItem = 'Makan 1'
    const newItem = "Dinner";
    await page.waitForTimeout(500); // kasih jeda biar DOM stabil

  
    // Klik tombol edit berdasarkan teks note yang dibuat
    await page.locator('div.flex.items-center.gap-2', { hasText: noteItem })
      .locator('#edit-todo').first().click();
  
    // Temukan input-nya (gunakan CSS selector biasa, bukan XPath)
    const input = page.locator('input');
  
    // Fokus, hapus isi, lalu ketik baru
    await input.click();
    await input.fill(" "+newItem);


    // Submit dengan Enter (kalau memang enter untuk menyimpan)
    await page.keyboard.press('Enter');
  
    // Verifikasi teks baru muncul
    await page.getByText(newItem).waitFor({state: 'visible'});

    await page.waitForTimeout(300);
    expect(await page.screenshot()).toMatchSnapshot('result-edit-tc-3.png');

  });

