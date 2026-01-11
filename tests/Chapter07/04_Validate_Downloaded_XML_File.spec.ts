import { expect, test } from '@playwright/test'
import { downloadAndValidateFileName, loginToApplication } from '../../src/utils/Common'

import fs from 'fs'
import { XMLParser } from 'fast-xml-parser'

test('Validate downloaded XML file content in playwright', async ({ page }) => {

    const DOWNLOADED_XML_FILE = "./downloads/Downloaded_XML_File.xml"

    // Login to Testers Talk
    await loginToApplication(page);

    // Download XML file & validate downloaded file name
    await downloadAndValidateFileName(page, 'Download XML', 'TestersTalk.xml')

    // Read downloaded XML file
    const data = fs.readFileSync(DOWNLOADED_XML_FILE, 'utf-8')
    const parser = new XMLParser({ ignoreAttributes: false })
    const xmlText = parser.parse(data)
    console.log(JSON.stringify(xmlText, null, 2))

    // Assert Testers Talk youtube link
    const youtubeLink = xmlText.testersTalk.channel.url
    expect(youtubeLink).toBe('https://www.youtube.com/@testerstalk')

    // Assert playlist tag details
    const playlists = xmlText.testersTalk.channel.playlists.playlist
    const playwrightTSPlaystlist = playlists.find(
        (p: any) => p.title === 'Playwright TypeScript by Testers Talk'
    );
    console.log(JSON.stringify(playwrightTSPlaystlist, null, 2))
    expect(playwrightTSPlaystlist).toBeDefined()
    expect(playwrightTSPlaystlist.title).toBe('Playwright TypeScript by Testers Talk')
    expect(playwrightTSPlaystlist.url).toBe('https://youtube.com/playlist?list=PLUeDIlio4THEXmQxNvKmdDxAVloGTHXMr&feature=shared')
})