import { expect, test } from '@playwright/test'
import { downloadAndValidateFileName, loginToApplication } from '../../src/utils/Common'

import fs from 'fs'
import mammoth from 'mammoth';

test('Validate downloaded Word file content in playwright', async ({ page }) => {

    const DOWNLOADED_WORD_FILE = "./downloads/Downloaded_Word_File.docx"

    // Login to Testers Talk
    await loginToApplication(page);

    // Download XML file & validate downloaded file name
    await downloadAndValidateFileName(page, 'Download Word', 'TestersTalk.docx')

    // Read the word doc
    const buffer = fs.readFileSync(DOWNLOADED_WORD_FILE)
    const result = await mammoth.extractRawText({ buffer })
    const wordText = result.value
    console.log('Word text : ' + wordText)

    // Validate Testers Talk youtube link
    expect(wordText).toContain('Subscribe for Daily Updates')
    expect(wordText).toContain('https://www.youtube.com/@testerstalk?sub_confirmation=1')
})