const { test, expect } = require('@playwright/test');

const routes = ['/', '/worker', '/business', '/passport', '/tasks/task-1', '/tasks/task-1/readiness'];

async function assertNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
}

async function scrollAndCapture(page, name) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewport = page.viewportSize();
  const step = Math.max(240, Math.floor(viewport.height * 0.65));
  let index = 0;
  for (let y = 0; y < height; y += step) {
    await page.evaluate(value => window.scrollTo(0, value), y);
    await page.waitForTimeout(100);
    await page.screenshot({ path: `test-results/${name}-${String(index).padStart(2, '0')}.png` });
    index += 1;
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(150);
}

async function assertOrderedNonOverlapping(page, selector) {
  const boxes = await page.locator(selector).evaluateAll(elements => elements.map(element => {
    const rect = element.getBoundingClientRect();
    return { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY, height: rect.height };
  }));
  for (let index = 1; index < boxes.length; index += 1) {
    expect(boxes[index].top).toBeGreaterThanOrEqual(boxes[index - 1].bottom - 1);
    expect(boxes[index].height).toBeGreaterThan(0);
  }
}

for (const route of routes) {
  test(`${route} renders and scrolls cleanly`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    await expect(page.locator('body')).toBeVisible();
    await assertNoHorizontalOverflow(page);
    const label = `${testInfo.project.name}-${route.replace(/[^a-z0-9]+/gi, '-') || 'home'}`;
    await scrollAndCapture(page, label);
    await assertNoHorizontalOverflow(page);
  });
}

test('landing repeated content remains structurally stable', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('.starter-task-card')).toHaveCount(3);
  await expect(page.locator('.outcome-card')).toHaveCount(5);
  await expect(page.locator('.step-row')).toHaveCount(4);
  await assertOrderedNonOverlapping(page, '.starter-task-card');
  await assertOrderedNonOverlapping(page, '.outcome-card');
  await assertOrderedNonOverlapping(page, '.step-row');
  await scrollAndCapture(page, 'landing-structure');
  await expect(page.locator('.starter-task-card')).toHaveCount(3);
  await expect(page.locator('.outcome-card')).toHaveCount(5);
});
