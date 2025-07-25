import { test, expect } from '@playwright/test';


test('Open register page', async ({ page }) => {
    await page.goto('http://localhost:3000'); 
    
    // await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
    await page.getByText('Register').click();
    await page.waitForLoadState('networkidle');

    expect(await page.screenshot()).toMatchSnapshot('result-register-tc-1.png');

  });

test('Register new user', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const newUsername = "New 4"
    const newPassword = "tes1"

    await page.getByText('Register').click();

    await page.locator('input#password').fill('newPassword');

    await page.locator('input#confirm-password').fill('newPassword');
    const registerBtn = page.getByRole('button', { name: 'Register' });

    if (await registerBtn.isEnabled()) {
        await registerBtn.click();
        } else {
    // Kalau tombol Register masih disable, tekan Enter dari input terakhir
    await page.getByPlaceholder('Confirm Password').press('Enter');
    expect(await page.screenshot()).toMatchSnapshot('result-register-tc-2.png');


    
    }});

test('Register new user and click enter', async ({ page }) => {
        await page.goto('http://localhost:3000');
        const newUsername = "New 4"
        const newPassword = "tes1"
    
        await page.getByText('Register').click();
    
        await page.locator('input#password').fill('newPassword');
    
        await page.locator('input#confirm-password').fill('newPassword');
    
        await page.getByPlaceholder('Confirm Password').press('Enter');
        expect(await page.screenshot()).toMatchSnapshot('result-register-tc-3.png');

    
        
        });

test('Register new user and click register', async ({ page }) => {
        await page.goto('http://localhost:3000');
        const newUsername = "New 4"
        const newPassword = "tes1"
    
        await page.getByText('Register').click();
    
        await page.locator('input#password').fill('newPassword');
    
        await page.locator('input#confirm-password').fill('newPassword');
    
        await page.getByPlaceholder('Confirm Password').press('Enter');
        const registerButton = page.getByRole('button', { name: 'Register' });
        await expect(registerButton).toBeDisabled();
        expect(await page.screenshot()).toMatchSnapshot('result-register-tc-4.png');

        
        });

        
        
            
            