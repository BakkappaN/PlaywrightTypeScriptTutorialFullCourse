import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('test', async ({ page }) => {

  await test.step('Navigating to URL', async () => {
    await page.goto('https://github.com/');
    await page.getByRole('link', { name: 'Sign in' }).click();
  });

  await test.step('Enter username & password', async () => {
    await page.getByLabel('Username or email address').click();
    await page.getByLabel('Username or email address').fill('testerstalk');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('test123');
  });

  await test.step('Click on sign in', async () => {
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  });

  await test.step('Validate error message', async () => {
    await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
  });
});