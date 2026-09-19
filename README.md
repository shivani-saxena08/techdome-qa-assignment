# Techdome QA Playwright Assignment

End-to-end, integration, security, and load tests for [techdome.io](https://techdome.io), aligned with the Techdome QA take-home brief.

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
npx playwright install chromium
```

## Run all tests (single command)

```bash
npx playwright test
```

## Run by suite

```bash
npx playwright test tests/e2e
npx playwright test tests/integration
npx playwright test tests/security
npx playwright test tests/load
```

## Parallel execution

- Default: **3 workers** for E2E / integration / security (`fullyParallel: true`)
- Load suite: **1 worker**, **serial** mode, **exactly 5 concurrent browser contexts** inside the load test (hard assignment cap)

## Failure artifacts

On failure, Playwright retains:

- **Screenshot** (`screenshot: only-on-failure`)
- **Video** (`video: retain-on-failure`)
- **Trace** on first retry (`trace: on-first-retry`)

Open HTML report:

```bash
npx playwright show-report
```

## Project structure

```
tests/e2e/           # User journeys (UI)
tests/integration/   # HTTP / network / third-party
tests/security/      # Headers, injection, exposure
tests/load/          # 5-user load test (max cap)
utils/               # helpers.ts, fixtures.ts
docs/                # stories, bugs, AI log, load results
playwright.config.ts
```

## Notes

- Live `/contact` uses **Calendly**, not a classic name/message form. Newsletter email field is the primary on-site form under test.
- Load test writes summary to `docs/load-test-results.md`.
- CI/CD intentionally omitted for this submission (local run only).

## Documentation

- `docs/user-story-map.md`
- `docs/bugs.md`
- `docs/claude-code-log.md`
- `docs/load-test-results.md`
