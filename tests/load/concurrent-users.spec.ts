import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe.configure({ mode: 'serial' });

const CONCURRENT_USERS = 5;
const TARGET_PATHS = ['/', '/contact'];
const P95_LIMIT_MS = 3000;

test('exactly five concurrent users hit home and contact without 5xx', async ({ browser }) => {
  const durations: number[] = [];
  const statuses: number[] = [];

  const userTasks = Array.from({ length: CONCURRENT_USERS }, (_, index) => {
    const targetPath = TARGET_PATHS[index % TARGET_PATHS.length];
    return (async () => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const started = Date.now();
      const response = await page.goto(targetPath, { waitUntil: 'domcontentloaded' });
      durations.push(Date.now() - started);
      statuses.push(response?.status() ?? 0);
      await context.close();
    })();
  });

  await Promise.all(userTasks);

  expect(CONCURRENT_USERS, 'Load test must use exactly 5 concurrent users').toBe(5);

  const serverErrors = statuses.filter((status) => status >= 500);
  expect(serverErrors, 'No HTTP 5xx during load run').toHaveLength(0);

  const sorted = [...durations].sort((a, b) => a - b);
  const p95Index = Math.ceil(sorted.length * 0.95) - 1;
  const p95 = sorted[p95Index];

  const summary = {
    concurrentUsers: CONCURRENT_USERS,
    paths: TARGET_PATHS,
    durationsMs: durations,
    p95Ms: p95,
    p95LimitMs: P95_LIMIT_MS,
    statuses,
    serverErrors,
    verdict: p95 <= P95_LIMIT_MS && serverErrors.length === 0 ? 'PASS' : 'FAIL',
    timestamp: new Date().toISOString(),
  };

  const docsDir = path.join(process.cwd(), 'docs');
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(
    path.join(docsDir, 'load-test-results.md'),
    `# Load Test Results\n\n- Concurrent users: ${summary.concurrentUsers}\n- Paths: ${summary.paths.join(', ')}\n- Durations (ms): ${summary.durationsMs.join(', ')}\n- p95 (ms): ${summary.p95Ms}\n- p95 limit (ms): ${summary.p95LimitMs}\n- HTTP statuses: ${summary.statuses.join(', ')}\n- 5xx count: ${summary.serverErrors.length}\n- Verdict: **${summary.verdict}**\n- Run at: ${summary.timestamp}\n`,
  );

  expect(p95, `p95 response time should be under ${P95_LIMIT_MS}ms`).toBeLessThanOrEqual(P95_LIMIT_MS);
});
