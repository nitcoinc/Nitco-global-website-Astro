import { test } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const OUT_DIR = path.resolve('baseline/screenshots')
fs.mkdirSync(OUT_DIR, { recursive: true })

test('careers desktop screenshot', async ({ page }) => {
  await page.goto('http://localhost:4321/company/careers', { waitUntil: 'load', timeout: 60000 })
  await page.waitForTimeout(2000)
  await page.screenshot({ path: path.join(OUT_DIR, 'company-careers-desktop.png'), fullPage: true })
})

test('careers mobile screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://localhost:4321/company/careers', { waitUntil: 'load', timeout: 60000 })
  await page.waitForTimeout(2000)
  await page.screenshot({ path: path.join(OUT_DIR, 'company-careers-mobile.png'), fullPage: true })
})
