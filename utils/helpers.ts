import { APIRequestContext, Page, expect } from '@playwright/test';

export const BASE_URL = 'https://techdome.io';

/** Core routes from sitemap used for smoke checks. */
export const CORE_ROUTES = [
  '/',
  '/services',
  '/studio',
  '/work',
  '/contact',
  '/careers',
  '/newsletter',
  '/faq',
  '/privacy',
  '/terms',
];

export async function assertNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 2;
  });
  expect(overflow, 'Page should not scroll horizontally').toBe(false);
}

export async function getResponseStatus(
  request: APIRequestContext,
  path: string,
): Promise<number> {
  const response = await request.get(path, { maxRedirects: 5 });
  return response.status();
}

export async function dismissCookieBannerIfPresent(page: Page): Promise<void> {
  const accept = page.getByRole('button', { name: /accept|agree|ok/i }).first();
  if (await accept.isVisible().catch(() => false)) {
    await accept.click();
  }
}
