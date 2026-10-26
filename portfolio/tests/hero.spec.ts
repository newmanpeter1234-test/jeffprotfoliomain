import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function posterReady(page: import('@playwright/test').Page) {
  await page.locator('.showcase-poster img').evaluate((img: HTMLImageElement) => img.decode());
}

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  (page as unknown as { heroErrors: string[] }).heroErrors = errors;
});

test.afterEach(async ({ page }) => {
  expect((page as unknown as { heroErrors: string[] }).heroErrors).toEqual([]);
});

test('3D Live hero renders external station bar below the window with all 8 project stations and INSPECT', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-showcase .showcase-window')).toBeVisible();
  await expect(page.locator('.showcase-station-dock--external')).toBeVisible();
  await expect(page.locator('.showcase-station-pill')).toHaveCount(8);
  await expect(page.locator('.showcase-station-open')).toContainText('INSPECT');
  await expect(page.locator('.hero-showcase figcaption')).toContainText('not live telemetry');
});

test('clicking a project station pill highlights it and INSPECT navigates to the active project case study', async ({ page }) => {
  await page.goto('/');
  const splunkPill = page.locator('.showcase-station-pill').nth(2);
  await splunkPill.click();
  await expect(splunkPill).toHaveClass(/is-current/);
  await expect(page.locator('.showcase-hud-status')).toContainText('03/08');
  await page.locator('.showcase-station-open').click();
  await expect(page).toHaveURL(/\/projects\/splunk-soc-lab$/);
});

test('mobile uses the mobile poster, shows full project names in the external bar, and has zero horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('.showcase-station-dock--external')).toBeVisible();
  await expect(page.locator('.showcase-station-pill .pill-name').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('missing poster displays clean fallback container without breaking main portfolio CTA', async ({ page }) => {
  await page.route('**/images/cybersecurity-native-glass-*.webp', r => r.abort());
  await page.addInitScript(() => { window.__OFFLINE_PREVIEW__ = true; });
  await page.goto('/');
  await expect(page.locator('.showcase-image-fallback')).toBeVisible();
  await expect(page.locator('.showcase-image-fallback')).toHaveText('');
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page).toHaveURL(/\/projects$/);
});

test('3D Live hero passes automated WCAG A/AA accessibility and maintains a 44x44px corner playback button', async ({ page }) => {
  await page.addInitScript(() => { window.__OFFLINE_PREVIEW__ = true; });
  await page.goto('/');
  await posterReady(page);
  const result = await new AxeBuilder({ page }).include('.hero-showcase').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
  const button = page.locator('.glass-playback');
  const box = await button.boundingBox();
  expect(box?.width).toBe(44);
  expect(box?.height).toBe(44);
  await expect(button.locator('svg')).toHaveCSS('width', '11px');
});
