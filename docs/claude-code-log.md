# Claude Code / Cursor AI Usage Log

Log of AI-assisted work for the Techdome QA take-home. I reviewed, ran tests locally, and adjusted output before committing.

---

## Prompt #1
**What I asked:**  
"I have a QA assignment for techdome.io. Can you read the PDF requirements and explain in simple words what they want? I am new to QA — should I use Python pytest or TypeScript Playwright?"

**What Claude did:**  
Explained the four deliverables (stories, Playwright tests, bug report, AI log, Loom). Said evaluators will run `npx playwright test`, so the repo should be Node/TypeScript Playwright, not Python-only.

**What I changed / accepted / rejected:**  
**Accepted** TypeScript for submission. **Rejected** Python-only framework my senior suggested for learning — kept Python ideas (API checks, reports) but implemented with Playwright `request` fixture instead. **Rejected** adding CI in this pass to save time before deadline.

---

## Prompt #2
**What I asked:**  
"I opened techdome.io and clicked Book a product teardown — there is Calendly on contact page, not a name/message form like the assignment says. How should I write user stories and tests without looking like I didn't read the site?"

**What Claude did:**  
Suggested documenting spec vs product in `bugs.md` (BUG-002), testing Calendly entry points + newsletter email validation, and not automating a full Calendly booking.

**What I changed / accepted / rejected:**  
**Accepted** Calendly + newsletter mapping. **Added** BUG-002 myself after manual check. **Rejected** writing fake "name field" tests that would always fail or test nothing real. Manually verified contact page has zero HTML forms.

---

## Prompt #3
**What I asked:**  
"Please scaffold the assignment folder structure: tests/e2e, integration, security, load, utils/helpers.ts, docs, playwright.config.ts. Load test must never exceed 5 concurrent users — that is a hard rule."

**What Claude did:**  
Created Playwright project, 22 tests, separate `load` project with `workers: 1`, and a load test using `Promise.all` with exactly five browser contexts.

**What I changed / accepted / rejected:**  
**Accepted** folder layout and load cap design. **Changed** `workers` to 3 for normal tests after reading assignment allows parallel. **Accepted** screenshot/video on failure only. Ran `npx playwright test` locally before pushing to GitHub.

---

## Prompt #4
**What I asked:**  
"First test run failed on Calendly HTTP check and mobile 375px test. Fix without breaking the 5-user load limit."

**What Claude did:**  
Calendly: stopped raw `request.get(calendly.com)` (404 to bots); assert link `href` on contact page instead. Mobile: detect overflow, annotate BUG-005, `test.skip` when overflow present so suite stays runnable while bug stays documented.

**What I changed / accepted / rejected:**  
**Accepted** both fixes after I re-ran tests (20 passed, 2 skipped). **Rejected** deleting BUG-005 because mobile looked fine visually — automation still measured overflow at 375px on homepage. I will mention manual vs auto in Loom.

---

## Prompt #5
**What I asked:**  
"Write integration test for newsletter subscribe — I don't want to spam their real list when tests run."

**What Claude did:**  
Used `page.route()` to intercept POST, stub 200 JSON response, assert email appears in request body.

**What I changed / accepted / rejected:**  
**Accepted** intercept approach. Separately I **manually** subscribed once with Gmail on production to confirm happy path works — that is not part of CI/automation. E2E still covers empty/invalid email with HTML5 validation.

---

## Prompt #6
**What I asked:**  
"Help me understand bugs for BUG-001 CSP — how do I verify in Terminal on Mac? Also update claude-code-log with prompts that show my judgment for submission."

**What Claude did:**  
Explained `curl -sI https://techdome.io/ | grep -i content-security` and linked CSP gap to security test skip + BUG-001. Drafted this log file.

**What I changed / accepted / rejected:**  
**Accepted** curl steps and ran them myself (no CSP line returned). **Removed** BUG-004 from my verbal summary to lead — public contact email is not a security bug. **Edited** this log to use my real questions from Cursor chat before final email.

---
