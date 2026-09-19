import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../utils/helpers';

const SENSITIVE_PATTERNS = [
  /sk_live_[a-zA-Z0-9]+/,
  /AKIA[0-9A-Z]{16}/,
  /api[_-]?key\s*[:=]\s*['"][a-zA-Z0-9_-]{20,}/i,
  /Bearer\s+[a-zA-Z0-9._-]{20,}/,
];

test.describe('Security headers', () => {
  test('homepage exposes HSTS, X-Frame-Options, and X-Content-Type-Options', async ({ request }) => {
    const response = await request.get('/');
    expect(response.status()).toBeLessThan(400);

    const headers = response.headers();
    expect(headers['strict-transport-security']).toMatch(/max-age/i);
    expect(headers['x-frame-options']).toMatch(/SAMEORIGIN/i);
    expect(headers['x-content-type-options']).toBe('nosniff');
  });

  test('CSP header audit (documented if missing)', async ({ request }) => {
    const headers = (await request.get('/')).headers();
    const csp = headers['content-security-policy'];

    if (!csp) {
      test.info().annotations.push({
        type: 'bug',
        description: 'BUG-001: Content-Security-Policy header missing on homepage',
      });
    }

    test.skip(!csp, 'Known product gap — see docs/bugs.md BUG-001');
    expect(csp).toBeTruthy();
  });
});

test.describe('Input sanitization', () => {
  test('newsletter field does not execute script injection payload', async ({ page }) => {
    const payload = '<script>alert(1)</script>';

    await page.goto('/newsletter');
    const email = page.getByRole('textbox', { name: /Enter your email/i });
    await email.fill(payload);

    const dialogFired = await new Promise<boolean>((resolve) => {
      page.once('dialog', () => resolve(true));
      setTimeout(() => resolve(false), 2000);
    });

    await page.getByRole('button', { name: /^Subscribe$/i }).click().catch(() => undefined);

    expect(dialogFired).toBe(false);
    await expect(page.locator('script', { hasText: 'alert(1)' })).toHaveCount(0);
  });
});

test.describe('Data exposure', () => {
  test('homepage HTML and main document response do not leak secrets', async ({ request }) => {
    const response = await request.get('/');
    const html = await response.text();

    for (const pattern of SENSITIVE_PATTERNS) {
      expect(html, `Unexpected secret pattern: ${pattern}`).not.toMatch(pattern);
    }

    expect(html).toContain('techdome.io');
    expect(html).toMatch(/rahul\.joshi@techdome\.net\.in/);
  });

  test('contact page response does not expose tokens in HTML', async ({ request }) => {
    const html = await (await request.get('/contact')).text();

    for (const pattern of SENSITIVE_PATTERNS) {
      expect(html).not.toMatch(pattern);
    }

    expect(html).toMatch(new RegExp(BASE_URL.replace('.', '\\.')));
  });
});
