import { expect, test } from '@playwright/test'
import { downloadAndValidateFileName, loginToApplication } from '../../src/utils/Common'

import ExcelJS from 'exceljs'

test('Validate downloaded excel file content in playwright', async ({ page }) => {

    const DOWNLOADED_EXCEL_FILE = "./downloads/Downloaded_Excel_File.xlsx"

    // Login to Testers Talk
    await loginToApplication(page);

    // Download Excel file & validate downloaded file name
    await downloadAndValidateFileName(page, 'Download Excel', 'TestersTalk.xlsx')

    // Get the sheet
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(DOWNLOADED_EXCEL_FILE)
    const sheet = workbook.getWorksheet('TestersTalk')

    // Get the row
    const row = sheet?.getRow(2)
    const channelName = row?.getCell(1).value

    // Assert text 'Testers Talk'
    console.log('Channel name :' + channelName);
    expect(channelName).toBe('Testers Talk')

    // Assert Link https://www.youtube.com/@testerstalk
    const channelLink = row?.getCell(3).hyperlink
    console.log('Channel link :' + channelLink);
    expect(channelLink).toBe('https://www.youtube.com/@testerstalk')

    // Assert Date
    const date = row?.getCell(4).value
    console.log('Date :' + date);
    expect(String(date)).toBe('Fri Sep 05 2025 05:30:00 GMT+0530 (India Standard Time)')

    // Assert numeric number
    const num = row?.getCell(5).value
    console.log('Number :' + num);
    expect(String(num)).toBe('1234567890')
})