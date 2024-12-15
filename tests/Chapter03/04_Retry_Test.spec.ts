// Import playwright module
import { test, expect } from '@playwright/test'

// Write a test
test('My First Playwright TypeScript Test 1',{tag :['@SmokeTesting']}, async ({ page }) => {
    // Go to URL
    await page.goto('https://www.google.com/');

    // Search with keywords
    await page.getByLabel('Search', { exact: true }).fill('playwright by testers talk');
    await page.getByLabel('Search', { exact: true }).press('Enter');

    // Click on playlist
    await page.getByRole('link', { name: 'Playwright by Testers Talk☑️' }).first().click();

    // Validate web page title 
    await expect(page).toHaveTitle('Playwright TypeScript by Testers Talk☑️ - YouTube');
})