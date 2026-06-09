import { test } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const ROUTES = [
  { path: '/', slug: 'index' },
  { path: '/contact', slug: 'contact' },
  { path: '/resources', slug: 'resources' },
  { path: '/blogs', slug: 'blogs' },
  { path: '/whitepapers/attended-automation-ebook', slug: 'whitepapers-attended-automation-ebook' },
  { path: '/case-studies', slug: 'case-studies' },
  { path: '/webinar/rpa-webinar-101', slug: 'webinar-rpa-webinar-101' },
  { path: '/company/about', slug: 'company-about' },
]

const BASELINE_DIR = path.resolve('baseline/screenshots')

test.beforeAll(() => {
  fs.mkdirSync(BASELINE_DIR, { recursive: true })
})

for (const route of ROUTES) {
  test(`baseline screenshot: ${route.path} [desktop]`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: 'load', timeout: 60000 })
    await page.waitForTimeout(1500)
    await page.screenshot({
      path: path.join(BASELINE_DIR, `${route.slug}-desktop.png`),
      fullPage: true,
    })
  })

  test(`baseline screenshot: ${route.path} [mobile]`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(route.path, { waitUntil: 'load', timeout: 60000 })
    await page.waitForTimeout(1500)
    await page.screenshot({
      path: path.join(BASELINE_DIR, `${route.slug}-mobile.png`),
      fullPage: true,
    })
  })
}
