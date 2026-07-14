# MVP Specification

## Goal

Prove one trustworthy, end-to-end work-to-opportunity loop rather than a broad marketplace.

## Demo scenario

**Business:** a salon wants to reduce tomorrow's no-shows.

**Worker:** a 22-year-old first-time worker has matric, WhatsApp confidence and no formal experience.

**Flow:**
1. Worker creates a capability profile.
2. Business creates an appointment-confirmation task for ten customers.
3. Worker passes a short simulation.
4. Worker accepts the disclosed scope and R100 sandboxed payment.
5. AI guides preparation and quality-checking of confirmations.
6. Worker records outcomes and submits evidence.
7. Business verifies completion and rates reliability.
8. Earnings ledger changes to approved/paid demo state.
9. Passport gains verified customer communication and appointment administration evidence.
10. Nala recommends a higher-value receptionist-support task.

## Required screens

### Shared
- Welcome and role selection
- Sign in / registration
- Notifications
- Account, consent and support

### Worker
- Worker home
- Capability conversation
- Capability profile
- Opportunity feed
- Task detail
- Readiness simulation
- Task acceptance
- Guided workbench
- Submission
- Earnings ledger
- Proof-of-Work Passport
- Progression recommendation
- Dispute/support

### Business
- Business onboarding and verification status
- Business dashboard
- Create task from template
- Task preview
- Active task detail
- Review submission
- Worker history / re-engage
- Billing or sandbox payment state
- Dispute/support

### Admin
- Verification queue
- Task moderation queue
- Disputes
- Account controls
- Audit view
- Template configuration

## Release gates

### Gate 1: Product truth
- No fake integrations or unlabelled simulated payments.
- No fabricated impact statistics.
- All demo data clearly marked where appropriate.

### Gate 2: Safety
- Approved task templates only.
- Privacy minimisation and redaction.
- Transparent pay and cancellation rules.
- Admin intervention available.

### Gate 3: Reliability
- Full journey works with persisted data.
- Reloading the page does not lose state.
- Role permissions cannot be bypassed through the UI or API.
- AI failure has a manual fallback.

### Gate 4: Presentation
- Mobile-first journey is polished.
- Judge can complete the demo without developer assistance.
- Demo account and guided walkthrough are documented.

## Explicitly deferred

- Native mobile apps
- USSD
- lending and savings products
- open marketplace task creation
- mentor marketplace
- production payment rails
- more than three launch languages
- employer ATS integrations
- automatic job applications

## MVP success signal

A judge understands within five minutes that Nala creates first income, creates verified experience, saves a small business time, and generates a credible next step.