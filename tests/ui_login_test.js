const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = 'http://localhost:3000';
  const apiBase = 'http://localhost:5000';
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Register a user via API
    const userId = 'uiuser-' + Date.now();
    const number = '0917' + Math.floor(Math.random() * 10000000).toString().padStart(7,'0');
    const password = 'Pw' + Math.random().toString(36).slice(-8) + 'A1';

    const regResp = await page.request.post(apiBase + '/register', {
      data: { name: 'UI Test', number, password }
    });
    if (![200, 201].includes(regResp.status())) {
      console.error('Register failed', await regResp.text());
      process.exit(2);
    }

    console.log('Registered', userId, number);

    // Go to login page
    await page.goto(base + '/login', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'login-page.png' });

    // Fill login form
    await page.fill('input[placeholder="Phone Number"]', number);
    await page.fill('input[placeholder="Password"]', password);
    await page.click('button[type="submit"]');

    // Wait for success message or navigation
    await page.waitForTimeout(1000);
    const success = await page.locator('text=Logged in successfully').count();
    console.log('Success message count:', success);

    // Wait for navigation to /home
    await page.waitForURL('**/home', { timeout: 5000 });
    console.log('Navigated to', page.url());
    await page.screenshot({ path: 'home-page.png' });

    // Check presence of sidebar and preview link
    const previewLink = await page.locator('a[href="/preview"]').count();
    const appsLink = await page.locator('a[href="/apps"]').count();
    const helpLink = await page.locator('a[href="/help"]').count();
    console.log('Links found:', { previewLink, appsLink, helpLink });

    // Open preview page
    await page.click('a[href="/preview"]');
    await page.waitForURL('**/preview');
    await page.screenshot({ path: 'preview-page.png' });

    // Open apps page
    await page.click('a[href="/apps"]');
    await page.waitForURL('**/apps');
    await page.screenshot({ path: 'apps-page.png' });

    // Open help page
    await page.click('a[href="/help"]');
    await page.waitForURL('**/help');
    await page.screenshot({ path: 'help-page.png' });

    console.log('UI flow completed successfully. Screenshots saved.');
    await browser.close();
    process.exit(0);
  } catch (e) {
    console.error('UI test failed:', e);
    await page.screenshot({ path: 'error.png' }).catch(()=>{});
    await browser.close();
    process.exit(1);
  }
})();