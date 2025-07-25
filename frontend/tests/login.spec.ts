import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
    // Start JS coverage
  await page.coverage.startJSCoverage();

  await page.goto('http://localhost:3000'); 
  const username = 'user1';


  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill('password1');

  await page.click('button[type="submit"]');

  await expect(page.getByText(`noted, ${username}`)).toBeVisible();
// Tunggu sampai layoutnya stabil sebelum ambil screenshot
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);

// Ambil snapshot halaman atau bagian spesifik
      // Stop coverage
  const jsCoverage = await page.coverage.stopJSCoverage();
  expect(await page.screenshot()).toMatchSnapshot('dashboard-ui.png');


  // // Simpan hasil coverage ke file
  // const fs = require('fs');
  // fs.writeFileSync('coverage/js-coverage.json', JSON.stringify(jsCoverage, null, 2));
});


test('Login with invalid credentials and dismiss', async ({ page }) => {
    await page.goto('http://localhost:3000'); 
    const username = 'randomuser';
  
  
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill('password1');

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Invalid username or password');
        await dialog.dismiss(); 
      });
    
      await page.click('button:has-text("Login")');
      await page.waitForTimeout(300);

      await page.waitForLoadState('networkidle');

      expect(await page.screenshot()).toMatchSnapshot('dashboard-ui2.png');

    });

test('Login with invalid credentials and accept', async ({ page }) => {
    await page.goto('http://localhost:3000'); 
    const username = 'randomuser';
      
      
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill('password1');
    
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Invalid username or password');
        await dialog.accept(); 
        });
        
        await page.click('button:has-text("Login")');
        await page.waitForTimeout(300);

            await page.waitForLoadState('networkidle');

        expect(await page.screenshot()).toMatchSnapshot('dashboard-ui3.png');

        });

test('Login without password and enter', async ({ page }) => {
            await page.goto('http://localhost:3000'); 
            const username = 'randomuser';
              
              
            await page.getByPlaceholder('Username').fill(username);
            
            page.once('dialog', async dialog => {
                expect(dialog.message()).toBe('Username and password cannot be empty');
                await dialog.accept(); 
                });
                
                await page.keyboard.press('Enter');
                await page.waitForTimeout(300);

                await page.waitForLoadState('networkidle');

                expect(await page.screenshot()).toMatchSnapshot('dashboard-ui4.png');
          
            });
            
test('Login without username and enter', async ({ page }) => {
    await page.goto('http://localhost:3000'); 
                  
                  
    await page.getByPlaceholder('Password').fill('password1');
                
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Username and password cannot be empty');
        await dialog.accept(); 
            });
                    
        await page.keyboard.press('Enter');
        await page.waitForTimeout(300);

        await page.waitForLoadState('networkidle');

        // expect(await page.screenshot()).toMatchSnapshot('dashboard-ui5.png');
    });

    //test case login username and login

test('Login without password and click submit', async ({ page }) => {
        await page.goto('http://localhost:3000'); 
        const username = 'randomuser';
          
          
        await page.getByPlaceholder('Username').fill(username);
        
        
            
        const loginButton = page.locator('button:has-text("Login")');
        await expect(loginButton).toBeDisabled();
        await page.waitForTimeout(300);

        await page.waitForLoadState('networkidle');

        // expect(await page.screenshot()).toMatchSnapshot('dashboard-ui6.png');
});
    // test case login password and login

test('Login without username and click submit', async ({ page }) => {
    await page.goto('http://localhost:3000'); 
                  
                  
    await page.getByPlaceholder('Password').fill('password1');
                
    const loginButton = page.locator('button:has-text("Login")');
    await expect(loginButton).toBeDisabled();
    await page.waitForTimeout(300);

    await page.waitForLoadState('networkidle');

    // expect(await page.screenshot()).toMatchSnapshot('dashboard-ui7.png');
    
});