# Techdome QA — User Story Map

Stories are based on exploration of [techdome.io](https://techdome.io). The assignment mentions a classic contact **name** form; the live product uses **Calendly** for enquiry and an **email-only newsletter** form on-site.

---

## US-001
**Title:** Discover Techdome value proposition  
**As a:** visitor  
**I want to:** land on the homepage and understand what Techdome offers  
**So that:** I can decide if they fit my software or venture needs  
**Acceptance:**
- [ ] Page title references Techdome and venture studio
- [ ] Meta description is present
- [ ] Hero H1 and primary CTA are visible
**Test Type:** E2E  
**Priority:** P0

## US-002
**Title:** Navigate core site sections without dead ends  
**As a:** visitor  
**I want to:** open main internal pages from navigation/footer  
**So that:** I can evaluate services, work, and company information  
**Acceptance:**
- [ ] Core routes return HTTP success (not 404/5xx)
- [ ] Logo returns to homepage from inner pages
**Test Type:** E2E  
**Priority:** P0

## US-003
**Title:** Book an architecture scoping call  
**As a:** prospect / founder  
**I want to:** reach the contact flow from primary CTAs  
**So that:** I can schedule a 30-minute call with a principal engineer  
**Acceptance:**
- [ ] “Book a product teardown” routes to `/contact`
- [ ] Contact page shows Calendly entry (“Select Date & Time”)
- [ ] Direct Calendly link is present and reachable
**Test Type:** E2E  
**Priority:** P0

## US-004
**Title:** Newsletter subscription validation  
**As a:** visitor  
**I want to:** subscribe with a valid email and see validation for bad input  
**So that:** I only submit correct contact information  
**Acceptance:**
- [ ] Empty email fails HTML5 validation
- [ ] Invalid email format fails validation
- [ ] Submit triggers a network POST (stubbed in automation)
**Test Type:** E2E | Integration  
**Priority:** P1

## US-005
**Title:** Mobile marketing experience  
**As a:** mobile visitor  
**I want to:** browse on phone and tablet widths  
**So that:** content remains readable without horizontal scrolling  
**Acceptance:**
- [ ] 375px: hamburger nav visible, no horizontal overflow on home
- [ ] 768px: work page renders without horizontal overflow
**Test Type:** E2E  
**Priority:** P1

## US-006
**Title:** Trust and social proof links  
**As a:** prospect  
**I want to:** verify external trust links from the footer  
**So that:** I can validate credibility (LinkedIn, GitHub, etc.)  
**Acceptance:**
- [ ] Footer social links visible
- [ ] Hrefs point to expected external domains
**Test Type:** E2E  
**Priority:** P2

## US-007
**Title:** Careers discovery  
**As a:** job seeker  
**I want to:** browse open roles and apply  
**So that:** I can join the engineering team  
**Acceptance:**
- [ ] `/careers` loads successfully
- [ ] Apply links route to Keka ATS (manual check; not fully automated to avoid third-party side effects)
**Test Type:** E2E (partial)  
**Priority:** P1

## US-008
**Title:** API / document smoke for core routes  
**As a:** QA engineer  
**I want to:** verify core URLs respond successfully  
**So that:** SEO and navigation paths are healthy  
**Acceptance:**
- [ ] Sitemap core paths return status < 400
- [ ] No 5xx on core paths
**Test Type:** Integration  
**Priority:** P0

## US-009
**Title:** Third-party analytics does not block render  
**As a:** visitor  
**I want to:** see hero content quickly even when GTM loads  
**So that:** marketing tags do not break first paint  
**Acceptance:**
- [ ] Homepage reaches `domcontentloaded`
- [ ] H1 visible while GTM requests are in flight
**Test Type:** Integration  
**Priority:** P1

## US-010
**Title:** Security headers baseline  
**As a:** security-conscious buyer  
**I want to:** see standard protective HTTP headers  
**So that:** the site follows baseline hardening  
**Acceptance:**
- [ ] HSTS, X-Frame-Options, X-Content-Type-Options present
- [ ] CSP audited (see bugs if missing)
**Test Type:** Security  
**Priority:** P0

## US-011
**Title:** Injection resistance on user input  
**As a:** attacker  
**I want to:** inject script into newsletter input  
**So that:** I can execute XSS  
**Acceptance:**
- [ ] Script payload does not trigger JS dialog
- [ ] No injected script node rendered from payload
**Test Type:** Security  
**Priority:** P0

## US-012
**Title:** No secret leakage in public HTML  
**As a:** QA engineer  
**I want to:** scan public pages for tokens/keys  
**So that:** sensitive credentials are not exposed  
**Acceptance:**
- [ ] No API key / bearer token patterns in homepage HTML
- [ ] Public business email in footer is allowed (not a leak)
**Test Type:** Security  
**Priority:** P1

## US-013
**Title:** Concurrent load within assignment cap  
**As a:** operator  
**I want to:** simulate five users on home and contact  
**So that:** pages stay available under light concurrent traffic  
**Acceptance:**
- [ ] Exactly 5 concurrent users (hard limit)
- [ ] p95 load time ≤ 3000 ms
- [ ] Zero HTTP 5xx
**Test Type:** Load  
**Priority:** P0

---

**Coverage summary:** Navigation (2+), enquiry/booking (2+), CTAs (2+), mobile (2+), integration (3+), security (2+), load (1).
