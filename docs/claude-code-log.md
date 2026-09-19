# Claude Code Usage Log

_Log AI-assisted work with judgment calls. Replace placeholder summaries with your exact prompts if you used Claude Code CLI separately._

---

## Prompt #1
**What I asked:** Summarize techdome.io and map assignment requirements to real user journeys (Calendly vs contact form).  
**What Claude did:** Produced site summary, critical use cases, UI vs API split, and pass/fail guidance for TypeScript Playwright vs Python.  
**What I changed / accepted / rejected:** Accepted TypeScript Playwright for submission; rejected Python-only runner because evaluators run `npx playwright test`. Accepted skipping CI/CD for timeboxing.

---

## Prompt #2
**What I asked:** Plan 17 tests with parallel execution, failure screenshot/video, load cap 5 users.  
**What Claude did:** Proposed E2E/integration/security/load counts, serial load project, screenshot/video on failure only.  
**What I changed / accepted / rejected:** Accepted counts and failure artifacts; rejected GitHub Actions; kept load test at exactly 5 concurrent contexts inside one test.

---

## Prompt #3
**What I asked:** Scaffold Playwright TypeScript repo matching assignment folder structure.  
**What Claude did:** Generated `playwright.config.ts`, `utils/helpers.ts`, test folders, and docs templates.  
**What I changed / accepted / rejected:** Added separate `load` project with `workers: 1`; set `baseURL` to production; limited browsers to Chromium for stability/speed.

---

## Prompt #4
**What I asked:** Generate E2E tests for homepage, nav, CTAs, newsletter validation, mobile viewports.  
**What Claude did:** Drafted role-based locators and overflow checks at 375px/768px.  
**What I changed / accepted / rejected:** Mapped “contact form” tests to Calendly visibility + newsletter validation; avoided booking real Calendly slots (flakiness + side effects).

---

## Prompt #5
**What I asked:** Integration/security tests for headers, injection, network POST, third-party scripts.  
**What Claude did:** Added API smoke tests, newsletter POST intercept with stubbed response, header audit, XSS payload check.  
**What I changed / accepted / rejected:** CSP test skips when missing and links to BUG-001 instead of failing entire suite silently; kept intentional public email out of “secret leak” failures.

---

_Add at least one more entry after you refine selectors from a local test run._
