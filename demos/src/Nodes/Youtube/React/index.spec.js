import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/Youtube/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/Youtube/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
  })

  test('adds a video', async ({ page }) => {
    await page.evaluate(() => {
      window.prompt = () => 'https://music.youtube.com/watch?v=hBp4dgE7Bho&feature=share'
    })
    await page.locator('#add').first().click()
    await expect(page.locator('.tiptap div[data-youtube-video] iframe')).toHaveCount(1)
    const src = await page.locator('.tiptap div[data-youtube-video] iframe').getAttribute('src')
    const url = new URL(src)

    expect(`${url.origin}${url.pathname}`).toBe('https://www.youtube-nocookie.com/embed/hBp4dgE7Bho')
    expect([...url.searchParams.keys()].sort()).toEqual(['controls', 'rel'].sort())
    expect(url.searchParams.get('controls')).toBe('0')
    expect(url.searchParams.get('rel')).toBe('1')
  })

  test('adds a video with 320 width and 240 height', async ({ page }) => {
    await page.evaluate(() => {
      window.prompt = () => 'https://music.youtube.com/watch?v=hBp4dgE7Bho&feature=share'
    })
    await page.locator('#width').press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('#width').pressSequentially('320')
    await page.locator('#height').press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('#height').pressSequentially('240')
    await page.locator('#add').first().click()
    const iframe = page.locator('.tiptap div[data-youtube-video] iframe')
    await expect(iframe).toHaveCount(1)
    await expect(iframe).toHaveCSS('width', '320px')
    await expect(iframe).toHaveCSS('height', '240px')
    const src = await iframe.getAttribute('src')
    const url = new URL(src)

    expect(`${url.origin}${url.pathname}`).toBe('https://www.youtube-nocookie.com/embed/hBp4dgE7Bho')
    expect([...url.searchParams.keys()].sort()).toEqual(['controls', 'rel'].sort())
    expect(url.searchParams.get('controls')).toBe('0')
    expect(url.searchParams.get('rel')).toBe('1')
  })

  test('replaces a video', async ({ page }) => {
    await page.evaluate(() => {
      let promptCallCount = 0
      window.prompt = () => {
        promptCallCount += 1
        if (promptCallCount === 1) {return 'https://music.youtube.com/watch?v=hBp4dgE7Bho&feature=share'}
        return 'https://music.youtube.com/watch?v=wRakoMYVHm8'
      }
    })

    await page.locator('#add').first().click()
    await expect(page.locator('.tiptap div[data-youtube-video] iframe')).toHaveCount(1)
    const src1 = await page.locator('.tiptap div[data-youtube-video] iframe').getAttribute('src')
    const url1 = new URL(src1)

    expect(`${url1.origin}${url1.pathname}`).toBe('https://www.youtube-nocookie.com/embed/hBp4dgE7Bho')
    expect([...url1.searchParams.keys()].sort()).toEqual(['controls', 'rel'].sort())
    expect(url1.searchParams.get('controls')).toBe('0')
    expect(url1.searchParams.get('rel')).toBe('1')

    await page.locator('.tiptap div[data-youtube-video] iframe').click()

    await page.locator('#add').first().click()

    await expect(page.locator('.tiptap div[data-youtube-video] iframe')).toHaveCount(1)
    const src2 = await page.locator('.tiptap div[data-youtube-video] iframe').getAttribute('src')
    const url2 = new URL(src2)

    expect(`${url2.origin}${url2.pathname}`).toBe('https://www.youtube-nocookie.com/embed/wRakoMYVHm8')
    expect([...url2.searchParams.keys()].sort()).toEqual(['controls', 'rel'].sort())
    expect(url2.searchParams.get('controls')).toBe('0')
    expect(url2.searchParams.get('rel')).toBe('1')
  })
})
