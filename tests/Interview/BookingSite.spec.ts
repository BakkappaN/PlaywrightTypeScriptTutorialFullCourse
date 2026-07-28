import { test, expect } from '@playwright/test'

// Booking.com automation test for Dynamic date selection, slider movement, and collecting hotel results with ratings
test('Automate Booking.com site - VeriPark HackerRank Test', async ({ page }) => {
    await test.step('Open Booking.com and dismiss the welcome prompt', async () => {
        await page.goto('https://www.booking.com/')
        await expect(page.getByLabel('Dismiss sign-in info.')).toBeVisible({ timeout: 10000 });
        await page.getByLabel('Dismiss sign-in info.').click();
    });

    await test.step('Select language and destination', async () => {
        await page.getByTestId('header-language-picker-trigger').click()
        await page.getByText('English (US)').click()

        await expect(page.getByRole('combobox', { name: 'Enter destination' })).toBeEnabled();
        await page.getByRole('combobox', { name: 'Enter destination' }).dblclick();
        await expect(page.locator('ul[aria-labelledby="group-0-heading"]')).toBeVisible();
        await page.getByRole('combobox', { name: 'Enter destination' }).fill('Stockholm');

        await expect(page.getByTestId('autocomplete-results-options').getByText('Stockholm', { exact: true })).toBeVisible();
        await page.getByTestId('autocomplete-results-options').getByText('Stockholm', { exact: true }).click();
    });

    await test.step('Configure occupancy and dates', async () => {
        await page.locator('#searchbox-horizontal-occupancy-label').click()
        await page.locator('//*[@for="group_children"]/parent::div/parent::div//button[2]').click();
        await page.locator('[name="age"]').selectOption('8 years old')
        await page.getByRole('button', { name: 'Done' }).click();

        await page.getByTestId('searchbox-layout-wide').click();

        const currentDate = await page.locator('[aria-current="date"]').getAttribute('data-date')
        const currentDateObj = new Date(String(currentDate));

        const checkInDate = new Date(currentDateObj);
        checkInDate.setDate(checkInDate.getDate() + 5); // Add 5 days for check-in

        const checkOutDate = new Date(currentDateObj);
        checkOutDate.setDate(checkOutDate.getDate() + 9); // Add 9 days for check-out

        const checkInSelector = `//*[@data-date='${checkInDate.toISOString().split('T')[0]}']`;
        const checkOutSelector = `//*[@data-date='${checkOutDate.toISOString().split('T')[0]}']`;

        await page.locator(checkInSelector).click();
        await page.locator(checkOutSelector).click();
    });

    await test.step('Search for hotels and apply filters', async () => {
        await page.getByRole('button', { name: 'Search' }).click();
        await expect(page.getByRole('heading', { name: 'Search results updated.' })).toBeVisible();

        const minSlider = page.getByLabel('Min.');
        const maxSlider = page.getByLabel('Max.');

        await minSlider.focus();
        for (let i = 0; i < 5; i++) {
            await minSlider.press('ArrowRight');
        }

        await maxSlider.focus();
        for (let i = 0; i < 5; i++) {
            await maxSlider.press('ArrowLeft');
        }

        await page.locator('//*[@data-filters-group="mealplan"]//input[contains(@aria-label,"Breakfast included")]').check();

        await expect(page.getByRole('heading', { name: 'Search results updated.' })).toBeVisible();
    });

    await test.step('Collect hotel results', async () => {
        await expect(page.locator('[role="listitem"]').first()).toBeVisible()
        let allItems = page.locator('[role="listitem"]')
        const count = await allItems.count();
        console.log(`Total number of hotels found: ${count}`);
        let map = new Map();
        for (let i = 0; i < count; i++) {
            const hotelName = await allItems.nth(i).locator('[data-testid="title"]').textContent();
            const hotelRating = await allItems.nth(i).locator('[data-testid="rating-stars"] > div').count();
            map.set(hotelName, hotelRating);
            console.log(`Hotel Name: ${hotelName}, Rating: ${hotelRating}`);
        }

        let minrating = Math.min(...map.values())
        console.log(`Minimum rating found: ${minrating}`);
    });

    await page.close()
})