import { user } from '../user.js';
const { test, expect } = require('@playwright/test');

test.use({
    headless: false,
    baseURL: 'https://netology.ru',
});

test.beforeEach(async({ page }) => {
    await page.goto('/?modal=sign_in');
});

test.afterEach(async({ browser }) => {
    await browser.close;
});


test('Successfull authorization', async ({ page }) => {
  await page.screenshot({ path: 'screenshot1.png', fullPage: true });
  await page.locator('[placeholder="Email"]').fill(user.email);
  await page.locator('[placeholder="Пароль"]').fill(user.password);
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.locator('[data-testid="login-submit-btn"]').click()
  ]);
  await page.screenshot({ path: 'screenshot2.png', fullPage: true });
  expect(await page.locator('.components-pages-Profile-Programs--title--3JKZ1')).toHaveText('Мои курсы и профессии');
});

test('Unsuccessfull authorization', async ({ page }) => {
  await page.screenshot({ path: 'screenshot3.png', fullPage: true });
  await page.locator('[placeholder="Email"]').fill(user.email);
  await page.locator('[placeholder="Пароль"]').fill(`${user.password}12`);
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.locator('[data-testid="login-submit-btn"]').click()
    ]);
  await page.screenshot({ path: 'screenshot4.png', fullPage: true });
  expect(await page.locator('[data-testid="login-error-hint"]')).toHaveText('Вы ввели неправильно логин или пароль');
  });

