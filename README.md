# Playwright TypeScript Automation Framework
### Take-Home Assessment — Bobby Brylle Quijalvo

---

## Table of Contents
- [How to Install and Run](#how-to-install-and-run)
- [Tools and Why I Chose Them](#tools-and-why-i-chose-them)
- [What I Tested: UI vs API](#what-i-tested-ui-vs-api)
- [What I Would Add or Change With More Time](#what-i-would-add-or-change-with-more-time)
- [Where I Used AI Tooling](#where-i-used-ai-tooling)

---

## How to Install and Run

### Prerequisites
- Node.js (v18 or higher)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/quijalvob/playwright-ts-framework.git
cd playwright-ts-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

**Run all tests:**
```bash
npx playwright test
```

**Run a specific suite:**
```bash
# UI Tests
npx playwright test tests/web/1.login.spec.ts
npx playwright test tests/web/2.inventory.spec.ts
npx playwright test tests/web/3.cart.spec.ts
npx playwright test tests/web/4.checkout.spec.ts

# API Tests
npx playwright test tests/api/booking.spec.ts
```

**Run with visible browser (headed mode):**
```bash
npx playwright test --headed
```

**View the HTML report after a run:**
```bash
npx playwright show-report
```

### CI/CD — GitHub Actions

This framework includes a GitHub Actions workflow with selective test suite triggering:

- **On every push to `main`** → Login tests run automatically
- **Manual trigger** → Go to **Actions → Playwright Tests → Run workflow**, select a suite from the dropdown (`login`, `inventory`, `cart`, `checkout`, `api`, or `all`)

---

## Tools and Why I Chose Them

| Tool | Purpose | Reasoning |
|---|---|---|
| **Playwright** | UI + API test runner | First-class TypeScript support, built-in auto-waiting, API testing client, and Trace Viewer for debugging — a significant step forward from Selenium for modern web applications |
| **TypeScript** | Language | Adds static typing over JavaScript, catching errors at compile time rather than runtime. Critical for maintaining a large test suite where type safety prevents mismatched method calls and undefined variables |
| **Page Object Model** | Design pattern | Separates test logic from page interaction logic — locators and actions live in page classes, tests stay clean and readable. Changes to the UI only require updates in one place |
| **Fixtures** | Dependency injection | Playwright's `test.extend()` eliminates boilerplate setup in every test file. Page objects are constructed once and injected automatically, the same way a DI container works in enterprise Java applications |
| **GitHub Actions** | CI/CD | Native integration with GitHub, zero additional service setup, and supports `workflow_dispatch` inputs for selective suite execution — appropriate for a team that wants lightweight, maintainable pipeline config |
| **Node.js** | Runtime | Required by Playwright; industry standard for TypeScript-based test tooling |

**Why Playwright over Selenium:** For a greenfield framework targeting a modern web application, Playwright's built-in auto-waiting, native TypeScript support, and API testing client make it the more pragmatic choice. Selenium remains relevant for legacy or cross-team enterprise contexts, but Playwright reduces boilerplate and eliminates the need for separate wait management utilities.

---

## What I Tested: UI vs API

### UI Layer — SauceDemo (https://www.saucedemo.com)

| Suite | What Was Tested | Reasoning |
|---|---|---|
| **Login** | Valid login, invalid credentials, error message text, URL assertion | Login is the entry point for every other flow — it must be rock-solid and is the most business-critical path |
| **Inventory** | Product list loads, item count > 0, add to cart updates badge | Verifies the core product browsing experience that every user hits immediately after login |
| **Cart** | Correct item count, correct item names displayed, cart title | Validates that what was added to cart is accurately reflected before checkout |
| **Checkout** | Form validation, missing field errors, navigation between steps, order overview, item visibility on step two | Covers the full purchase funnel — the highest-value user journey in any e-commerce system |

**Reasoning behind UI coverage:** UI tests were focused on **user journeys and visual state** — things that only a browser interaction can verify (page titles, navigation, element visibility, URL transitions). Each suite owns one page's responsibility, keeping tests isolated and failure messages precise.

### API Layer — Restful Booker (https://restful-booker.herokuapp.com)

| Test | Method | What Was Verified |
|---|---|---|
| Get all bookings | GET | Status 200, response is an array, contains records |
| Create a booking | POST | Status 200, booking ID returned, name fields match payload |
| Get booking by ID | GET | Status 200, correct data returned for created record |
| Update booking | PUT | Status 200, updated fields reflected in response |
| Delete booking | DELETE | Status 201, booking successfully removed |
| Delete with invalid token | DELETE | Status 403 — auth enforcement verified |
| Get non-existent booking | GET | Status 404 — invalid ID handling verified |
| Auth with bad credentials | POST | Response contains `reason: "Bad credentials"` |

**Reasoning behind UI/API split:** API tests verify **contract and data integrity** — whether the backend accepts valid input, rejects invalid auth, and returns correct data — without the overhead or flakiness of a browser. UI tests verify **user experience and end-to-end flows**. Testing the same thing at both layers would be redundant; testing each at the right layer gives maximum coverage with minimum maintenance cost. Negative cases (bad auth, invalid ID, missing fields) were prioritized at the API layer since they are cheaper and faster to assert there than through a UI flow.

---

## What I Would Add or Change With More Time

**Test coverage:**
- More Negative tests (locked-out user, problem user behavior)
- Cross-browser execution — currently running Chromium only in CI; would enable Firefox and WebKit for broader coverage

**Framework improvements:**
- `.env` file for credentials management — currently test credentials live in `testData.ts`. For a production framework, sensitive values should be injected via environment variables and never committed to source control
- Allure or custom HTML reporter for richer test history and trend tracking across CI runs
- Test tagging (`@smoke`, `@regression`, `@critical`) to allow tag-based filtering without managing separate spec files
- Data-driven testing — parameterized tests for login scenarios (multiple user types, edge case credentials) using Playwright's built-in test data table support
- Visual regression testing using Playwright's `toHaveScreenshot()` for UI consistency checks

**CI/CD improvements:**
- Parallel job execution with `needs:` dependencies so the full suite runs in a defined sequence
- Slack/email notification on pipeline failure
- Scheduled nightly runs of the full regression suite via `cron` trigger

---

## Where I Used AI Tooling

This framework was built with AI assistance (Claude by Anthropic) as a pair-programming tool. I want to be transparent about where AI contributed and where human judgment was essential.

**What AI helped with:**
- Explaining TypeScript concepts mapped to my existing Java/Selenium background (e.g. `async/await` vs synchronous Selenium, `const`/`let` vs Java's `final`, arrow functions vs lambdas)
- Scaffolding initial file structure and boilerplate (BasePage, fixtures pattern, GitHub Actions YAML template)
- Suggesting framework patterns (`.filter()` on locators, `test.describe.configure({ mode: 'serial' })` for dependent API tests, `workflow_dispatch` inputs for selective CI triggering)
- Drafting initial versions of page objects and test files for me to review and adapt

**What I corrected or rewrote:**
- **All XPath locators** — AI-generated locators used guessed tag names (e.g. `//div[@data-test="error"]`) that did not match SauceDemo's actual DOM. I verified and corrected each one by inspecting the real page HTML (e.g. the correct locator is `//h3[@data-test="error"]`)
- **Naming consistency** — AI inconsistently applied casing conventions (e.g. `Xpath` vs `XPath`, `AddToCartText` vs `addToCartText`). I standardised all field names to camelCase throughout
- **Test data centralisation** — AI initially hardcoded values directly in page objects and spec files. I identified this as a maintenance risk and pushed to extract all strings, URLs, credentials, and expected text into `testData.ts` before it was suggested
- **File organisation** — I reorganised tests into `tests/web/` and `tests/api/` subfolders and added numeric prefixes for clear execution order, which was my own structural decision
- **API test ordering** — I identified that shared `let` variables across parallel Playwright tests caused `undefined` booking IDs in GET/PUT/DELETE tests, and applied `test.describe.configure({ mode: 'serial' })` as the correct fix

**Overall:** AI accelerated the setup and helped me navigate TypeScript syntax coming from a Java background. However, every locator, every structural decision, and every bug fix required hands-on verification against the actual application. AI output was treated as a starting point, not a final answer.

---

## Project Structure

```
playwright-ts-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD pipeline
├── data/
│   ├── webData.ts               # UI test data (URLs, users, expected text)
│   └── apiData.ts               # API test data (endpoints, payloads, credentials)
├── fixtures/
│   └── pageFixtures.ts          # Dependency injection for page objects
├── pages/
│   ├── BasePage.ts              # Shared helpers (click, fill, wait, screenshot)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── CheckoutStepTwoPage.ts
├── tests/
│   ├── api/
│   │   └── booking.spec.ts      # Restful Booker CRUD + negative tests
│   └── web/
│       ├── 1.login.spec.ts
│       ├── 2.inventory.spec.ts
│       ├── 3.cart.spec.ts
│       └── 4.checkout.spec.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

*Built by Bobby Brylle Quijalvo | [github.com/quijalvob/playwright-ts-framework](https://github.com/quijalvob/playwright-ts-framework)*
