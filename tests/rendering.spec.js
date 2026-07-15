const { test, expect } = require('@playwright/test');

const routes = [
  '/', '/worker', '/worker/availability', '/worker/growth', '/business',
  '/business/intake', '/business/operations', '/market', '/auth',
  '/operations/distribution', '/passport', '/tasks/task-1', '/tasks/task-1/readiness',
];

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
    return {left:rect.left+window.scrollX,right:rect.right+window.scrollX,top:rect.top+window.scrollY,bottom:rect.bottom+window.scrollY,width:rect.width,height:rect.height};
  }));
  for (const box of boxes) { expect(box.width).toBeGreaterThan(0); expect(box.height).toBeGreaterThan(0); }
  for (let first=0;first<boxes.length;first+=1) for(let second=first+1;second<boxes.length;second+=1){
    const a=boxes[first],b=boxes[second];
    const overlapWidth=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left));
    const overlapHeight=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
    expect(overlapWidth*overlapHeight).toBeLessThanOrEqual(1);
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

test('restored landing remains structurally stable', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('.starter-task-card')).toHaveCount(0);
  await expect(page.locator('.outcome-card')).toHaveCount(5);
  await expect(page.locator('.step-row')).toHaveCount(5);
  await assertNoElementOverlap(page, '.outcome-card');
  await assertNoElementOverlap(page, '.step-row');
  await scrollAndCapture(page, 'landing-structure');
});

test('landing survives repeated mobile and desktop viewport changes', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await scrollAndCapture(page, 'viewport-mobile-first');
  await assertNoHorizontalOverflow(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await scrollAndCapture(page, 'viewport-desktop-after-mobile');
  await assertNoHorizontalOverflow(page);
  await page.setViewportSize({ width: 360, height: 740 });
  await page.waitForTimeout(200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await scrollAndCapture(page, 'viewport-mobile-again');
  await assertNoHorizontalOverflow(page);
});

async function assertAvailabilityScrollStability(page,width,height){
  await page.setViewportSize({width,height});
  await page.goto('/worker/availability',{waitUntil:'networkidle'});
  await expect(page.getByRole('heading',{name:'Know the real market status before you wait for work.'})).toBeVisible();
  await expect(page.locator('.animate-pulse')).toHaveCount(0);
  const metrics=await page.evaluate(()=>({height:document.documentElement.scrollHeight,width:document.documentElement.scrollWidth}));
  const positions=[0,Math.floor(metrics.height*.2),Math.floor(metrics.height*.45),Math.floor(metrics.height*.7),metrics.height-height];
  for(const y of positions){
    await page.evaluate(value=>window.scrollTo({top:Math.max(0,value),behavior:'instant'}),y);
    await page.waitForTimeout(120);
    const before=await page.evaluate(()=>({scrollY:window.scrollY,height:document.documentElement.scrollHeight,width:document.documentElement.scrollWidth,body:document.body.getBoundingClientRect().width}));
    await page.waitForTimeout(800);
    const after=await page.evaluate(()=>({scrollY:window.scrollY,height:document.documentElement.scrollHeight,width:document.documentElement.scrollWidth,body:document.body.getBoundingClientRect().width}));
    expect(after).toEqual(before);
  }
  await assertNoHorizontalOverflow(page);
}

test('availability stays pixel-stable through the complete mobile and desktop scroll',async({page})=>{
  await assertAvailabilityScrollStability(page,360,740);
  await assertAvailabilityScrollStability(page,1440,900);
});

test('public browsing remains open but starting a simulation asks for authentication',async({page})=>{
  await page.goto('/worker',{waitUntil:'networkidle'});
  await expect(page).toHaveURL(/\/worker$/);
  await page.getByRole('button',{name:'Demo controls'}).click();
  await page.getByRole('button',{name:/Load worker demo/i}).click();
  await page.getByRole('button',{name:'Practice library'}).click();
  await expect(page.locator('.simulation-library-card').first()).toBeVisible();
  await page.locator('.simulation-library-card').first().click();
  await expect(page).toHaveURL(/\/auth\?/);
  await expect(page.getByText('ACCOUNT REQUIRED FOR THIS ACTION')).toBeVisible();
  await expect(page.getByRole('link',{name:'Continue browsing'})).toBeVisible();
});

test('optional account entry renders for both roles without blocking public routes', async ({ page }) => {
  await page.goto('/auth?role=worker', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Join or sign in as a worker.' })).toBeVisible();
  await page.goto('/auth?role=business', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Join or sign in as a business.' })).toBeVisible();
  await page.goto('/market', { waitUntil: 'networkidle' });
  await expect(page.getByText('Public preview · no sign-in required')).toBeVisible();
});
