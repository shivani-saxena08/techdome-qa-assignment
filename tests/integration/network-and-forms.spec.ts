import { test, expect } from '@playwright/test';
import { CORE_ROUTES } from '../../utils/helpers';

test.describe('HTTP smoke', () => {
  test('core sitemap routes return success status codes', async ({ request }) => {
    for (const path of CORE_ROUTES) {
      const response = await request.get(path, { maxRedirects: 5 });
      expect(response.status(), `${path} status`).toBeLessThan(400);
      expect(response.status(), `${path} should not be server error`).toBeLessThan(500);
    }
  });

  test('contact page references a valid Calendly booking URL', async ({ page, request }) => {
    const response = await request.get('/contact');
    expect(response.status()).toBeLessThan(400);

    await page.goto('/contact');
    const calendlyLink = page.getByRole('link', { name: /Direct link/i });
    await expect(calendlyLink).toHaveAttribute('href', /^https:\/\/calendly\.com\/.+/);

    const href = await calendlyLink.getAttribute('href');
    expect(href).toMatch(/rahul-joshi|dominate-with-techdome/i);
  });
});

test.describe('Newsletter integration', () => {
  test('subscribe action triggers a network request with email payload', async ({ page }) => {
    await page.goto('/newsletter');

    const email = `qa-assignment+${Date.now()}@example.com`;
    let capturedBody: string | null = null;
    let capturedMethod: string | null = null;

    await page.route('**/*', async (route) => {
      const request = route.request();
      if (request.method() === 'POST' && /newsletter|subscribe|api|form/i.test(request.url())) {
        capturedMethod = request.method();
        capturedBody = request.postData() ?? null;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ ok: true }),
        });
        return;
      }
      await route.continue();
    });

    await page.getByRole('textbox', { name: /Enter your email/i }).fill(email);
    await page.getByRole('button', { name: /^Subscribe$/i }).click();

    await expect.poll(() => capturedMethod, { timeout: 10_000 }).toBe('POST');
    expect(capturedBody ?? '').toMatch(new RegExp(email.replace('+', '\\+')));
  });
});

test.describe('Third-party scripts', () => {
  test('Google Tag Manager loads without blocking initial document render', async ({ page }) => {
    const blockedCritical: string[] = [];

    page.on('requestfailed', (request) => {
      const url = request.url();
      if (/googletagmanager|gtag/i.test(url)) {
        blockedCritical.push(url);
      }
    });

    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBeLessThan(400);

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(blockedCritical, 'GTM should not hard-fail before first paint').toHaveLength(0);
  });
});
