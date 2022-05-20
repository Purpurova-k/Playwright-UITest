const { email, password } = require('../user.js');
const { test, expect } = require('@playwright/test');

test.use({
    headless: false,
    baseURL: 'https://netology.ru',
});

test.beforeEach(async({ page }) => {
    await page.goto('/?modal=sign_in');
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.afterAll(async({ browser }) => {
    await browser.close();
});


test('Successfull authorization', async ({ page }) => {
  await page.screenshot({ path: 'screenshot1.png', fullPage: true });
  await page.locator('[placeholder="Email"]').fill(email);
  await page.locator('[placeholder="Пароль"]').fill(password);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await page.screenshot({ path: 'screenshot2.png', fullPage: true });
  await expect(page.locator('.components-pages-Profile-Programs--title--3JKZ1')).toHaveText('Мои курсы и профессии');
});

test('Unsuccessfull authorization', async ({ page }) => {
  await page.screenshot({ path: 'screenshot3.png', fullPage: true });
  await page.locator('[placeholder="Email"]').fill(email);
  await page.locator('[placeholder="Пароль"]').fill(`${password}12`);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await page.screenshot({ path: 'screenshot4.png', fullPage: true });
  await expect(page.locator('[data-testid="login-error-hint"]')).toHaveText('Вы ввели неправильно логин или пароль');
  });