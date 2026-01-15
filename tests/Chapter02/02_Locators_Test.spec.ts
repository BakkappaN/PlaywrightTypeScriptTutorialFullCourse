// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Locators in Playwright', async ({ page }) => {
    // Go to URL
    await page.goto('https://github.com/BakkappaN/');

    // GetByRole
    await page.getByRole('link', { name: 'Sign in' }).click()

    // GetBylabel
    await page.getByLabel('Homepage', { exact: true }).first().click();

    // GetByAltText
    // await page.getByAltText("View BakkappaN's full-sized avatar").click();

    // GetByTestId
    await page.getByTestId("projects").first().click();

    // GetByText
    // await page.getByText("Sign up").click();

    // GetByPlaceholder, Xpath, CSSSelectors
    await page.goto('https://www.youtube.com/@testerstalk');
    await page.getByPlaceholder('Search').fill('cypress by testers talk');
    await page.locator('input[name="search_query"]').first().fill('playwright typescript by testers talk');

    // GetByTitle
    await page.goto('https://www.google.com/');
    await page.getByTitle('Search').fill('playwright javascript by testers talk');
});

