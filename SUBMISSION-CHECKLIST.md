# Submission checklist (Techdome QA)

Use this before email to `careers@techdome.net.in`.

## Done in project

- [x] Playwright TypeScript suite (`npx playwright test`)
- [x] `docs/user-story-map.md`
- [x] `docs/bugs.md`
- [x] `docs/claude-code-log.md` (personalize prompts before send)
- [x] `docs/load-test-results.md`
- [x] `README.md`

## You still complete

- [ ] **Git**: init, commit, push to GitHub (see steps below)
- [ ] **Personalize** `docs/claude-code-log.md` with your real Cursor prompts
- [ ] **Lead review** (explain stories, bugs, judgment)
- [ ] **Loom** (5–10 min) or screen recording + link
- [ ] **Email**: repo URL + video link, subject `QA Assignment — [Your Name]`

## Quick verify

```bash
cd ~/Desktop/ASSESSMENT
npm install
npx playwright install chromium
npx playwright test
```

## Git push (after commit)

1. Create empty repo on GitHub (no README).
2. `git remote add origin https://github.com/YOU/REPO.git`
3. `git push -u origin main`
