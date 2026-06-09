import { test } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const OUT = path.resolve('baseline/screenshots');
fs.mkdirSync(OUT, { recursive: true });

test('blog slug desktop', async ({ page }) => {
  await page.goto('http://localhost:4323/blog/a-look-into-the-benefits-of-rpa-for-order-processing', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT, 'blog-slug-desktop.png'), fullPage: true });
});

test('blog slug mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:4323/blog/a-look-into-the-benefits-of-rpa-for-order-processing', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT, 'blog-slug-mobile.png'), fullPage: true });
});
