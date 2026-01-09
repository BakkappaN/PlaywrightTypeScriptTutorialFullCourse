import { expect, test } from '@playwright/test'
import { loginToApplication } from '../../src/utils/Common'

test('Upload file in playwright', async ({ page }) => {

    // Login to Testers Talk
    await loginToApplication(page);

    // Upload file
    await expect(page.locator('#fileInput')).toBeVisible()
    await page.locator('#fileInput').setInputFiles('./uploads/upload_file.json')

    // Validate file is successfully
    await expect(page.getByText('Selected: upload123_file.json')).toBeVisible();

})