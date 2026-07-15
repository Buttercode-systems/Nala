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

async function assertNoElementOverlap(page, selector) {
  const boxes = await page.locator(selector).evaluateAll(elements => elements.map(element => {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      right: rect.right + window.scrollX,
      top: rect.top + window.scrollY,
      bottom: rect.bottom + window.scrollY,
      width: rect.width,
      height: rect.height,
    };
  }));

  for (const box of boxes) {
    expect(box.width).toBeGreaterThan(0);
    expect(box.height).toBeGreaterThan(0);
  }

  for (let first = 0; first < boxes.length; first += 1) {
    for (let second = first + 1; second < boxes.length; second += 1) {
      const a = boxes[first];
      const b = boxes[second];
      const overlapWidth = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const overlapHeight = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      expect(overlapWidth * overlapHeight).toBeLessThanOrEqual(1);
    }
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
  await assertNoElementOverlap(page, '.starter-task-card');
  await assertNoElementOverlap(page, '.outcome-card');
  await assertNoElementOverlap(page, '.step-row');
  await scrollAndCapture(page, 'landing-structure');
  await expect(page.locator('.starter-task-card')).toHaveCount(3);
  await expect(page.locator('.outcome-card')).toHaveCount(5);
});
