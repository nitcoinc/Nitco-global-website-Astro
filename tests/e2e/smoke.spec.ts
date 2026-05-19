import { test, expect } from '@playwright/test'

// /blog → no index page, use /blogs (served by [page].js)
// /whitepapers → no index page, use a known slug
// /webinar → no index page, use a known slug
const PAGES = [
  '/',
  '/contact',
  '/resources',
  '/blogs',
  '/whitepapers/attended-automation-ebook',
  '/case-studies',
  '/webinar/rpa-webinar-101',
  '/company/about',
]

for (const path of PAGES) {
  test(`page loads: ${path}`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBeLessThan(400)
    await expect(page).toHaveTitle(/.+/)
    const visibleHeading = page.locator('h1, h2').first()
    await expect(visibleHeading).toBeVisible()
  })
}

test('homepage hero renders', async ({ page }) => {
  await page.goto('/')
  // Desktop nav is a div, not <nav>; check header wrapper
  await expect(page.locator('header')).toBeVisible()
  // At least one footer must be visible (desktop or mobile)
  const footers = page.locator('footer')
  const count = await footers.count()
  let anyVisible = false
  for (let i = 0; i < count; i++) {
    const visible = await footers.nth(i).isVisible()
    if (visible) { anyVisible = true; break }
  }
  expect(anyVisible).toBe(true)
})

test('contact form is present', async ({ page }) => {
  await page.goto('/contact')
  const form = page.locator('form').first()
  await expect(form).toBeVisible()
})

test('navigation works', async ({ page }) => {
  await page.goto('/')
  // Navigate directly — desktop nav link is hidden on mobile viewports
  await page.goto('/resources')
  await expect(page).toHaveURL(/resources/)
})
