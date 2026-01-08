import { expect, test } from '@playwright/test'
import { loginToApplication } from '../../src/utils/Common'

test('Upload file in playwright', async ({ page }) => {

    await loginToApplication(page);

    await expect(page.locator('#fileInput')).toBeVisible()
    await page.locator('#fileInput').setInputFiles('./uploads/upload_file.json')

    await expect(page.getByText('Selected: upload123_file.json')).toBeVisible();

})