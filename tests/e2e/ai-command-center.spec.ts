import { test, expect } from '@playwright/test'

// Regression guard for the AI Command Center hero chips.
// The "Guardrails" (top-right) and "Execution" (bottom-left) chips must float
// OUTSIDE the hero card corners (positive gap), not overlap or sit inside it.
// See incident: chips were tucked too far in / overlapping the card.

test('command center hero chips float outside the card corners', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/ai-agent-command-center/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)

  const rects = await page.evaluate(() => {
    const card = document.querySelector('[class*="heroCard"]') as HTMLElement
    const guard = document.querySelector('[class*="chipTopRight"]') as HTMLElement
    const exec = document.querySelector('[class*="chipBottomLeft"]') as HTMLElement
    if (!card || !guard || !exec) return null
    const r = (el: HTMLElement) => el.getBoundingClientRect()
    const c = r(card)
    const g = r(guard)
    const e = r(exec)
    return {
      guardGapAboveCard: c.top - g.bottom, // + => chip sits above card with a gap
      execGapBelowCard: e.top - c.bottom,  // + => chip sits below card with a gap
      guardVisible: g.height > 0 && g.width > 0,
      execVisible: e.height > 0 && e.width > 0,
    }
  })

  expect(rects, 'hero card and both chips rendered').not.toBeNull()
  // Chips must be visible and float outside the card (positive vertical gap).
  expect(rects!.guardVisible).toBe(true)
  expect(rects!.execVisible).toBe(true)
  expect(rects!.guardGapAboveCard).toBeGreaterThan(0)
  expect(rects!.execGapBelowCard).toBeGreaterThan(0)
})
