import { expect, test } from '@playwright/test'
import { downloadAndValidateFileName, loginToApplication } from '../../src/utils/Common'

test('Download file in playwright', async ({ page }) => {

    // Login to Testers Talk
    await loginToApplication(page);

    // Download Excel file & validate downloaded file name
    await downloadAndValidateFileName(page, 'Download Excel', 'TestersTalk.xlsx')

    // Download word file & validate downloaded file name
    await downloadAndValidateFileName(page, 'Download Word', 'TestersTalk.docx')

    // Download XML file & validate downloaded file name
    await downloadAndValidateFileName(page, 'Download XML', 'TestersTalk.xml')

    // Download PDF file & validate downloaded file name
    await downloadAndValidateFileName(page, 'Download PDF', 'TestersTalk.pdf')

})