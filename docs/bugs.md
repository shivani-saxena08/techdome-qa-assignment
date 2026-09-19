# Bug Report — techdome.io

Findings from manual exploration and automated Playwright runs against production.

---

## BUG-001
**Severity:** Medium  
**Summary:** `Content-Security-Policy` header missing on homepage  
**Steps:**
1. Send `GET https://techdome.io/`
2. Inspect response headers
**Expected:** CSP header present (assignment security baseline)  
**Actual:** HSTS, X-Frame-Options, and X-Content-Type-Options present; **no** `Content-Security-Policy`  
**Evidence:** `curl -sI https://techdome.io/ | grep -i content-security` returns empty; security test annotated/skipped with BUG-001

---

## BUG-002
**Severity:** Medium  
**Summary:** Assignment “contact/enquiry form” does not match live product (Calendly-first flow)  
**Steps:**
1. Open `/contact`
2. Look for traditional name/message form fields
**Expected:** Classic enquiry form with name + validation (per generic marketing site assumptions)  
**Actual:** Primary conversion is **Calendly** booking (`Select Date & Time`, direct Calendly link). No on-site name/message form.  
**Evidence:** Playwright accessibility snapshot on `/contact`; automated E2E covers Calendly entry instead  
**Note:** Product may be intentional; documented as spec vs product mismatch for QA traceability.

---

## BUG-003
**Severity:** Low  
**Summary:** Contact page `<title>` contains duplicated brand suffix  
**Steps:**
1. Navigate to `https://techdome.io/contact`
2. Observe document title
**Expected:** Single clean title, e.g. “Talk to an Architect | Techdome”  
**Actual:** Title reads `Talk to an Architect — Scoping Call & Global Hubs | Techdome | Techdome` (duplicate `| Techdome`)  
**Evidence:** Browser tab title / `document.title` on contact page

---

## BUG-004
**Severity:** Low  
**Summary:** Public founder email exposed in page content (informational)  
**Steps:**
1. Open homepage footer or contact page
2. Observe `rahul.joshi@techdome.net.in` mailto link
**Expected:** Business contact email available for prospects  
**Actual:** Email is visible in HTML (expected for sales contact; not a credential leak)  
**Evidence:** Security scan allows this pattern; logged for severity calibration in assignment

## BUG-005
**Severity:** Medium  
**Summary:** Horizontal overflow on homepage at 375px mobile viewport  
**Steps:**
1. Set viewport to 375×812
2. Open `https://techdome.io/`
3. Compare `document.documentElement.scrollWidth` vs `clientWidth`
**Expected:** No horizontal scrolling on mobile marketing homepage  
**Actual:** `scrollWidth` exceeds `clientWidth` (overflow detected)  
**Evidence:** Playwright E2E mobile test annotation; screenshot in `test-results/` when assertion enabled

---
