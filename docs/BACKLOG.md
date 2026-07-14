# Implementation Backlog

## P0 — Foundation

- Initialise Next.js TypeScript project.
- Configure Tailwind and accessible component primitives.
- Add ESLint, Prettier, unit test runner and Playwright.
- Configure local, preview and production environment strategy.
- Create Supabase project configuration and migration workflow.
- Implement CI for lint, typecheck, tests and migration validation.
- Establish error boundaries, logging and privacy-safe analytics events.

## P0 — Identity and permissions

- Authentication.
- Role selection.
- Profiles and consent capture.
- Worker and business onboarding.
- Business membership roles.
- Admin role and auditable access.
- RLS tests for every role boundary.

## P0 — Task vertical slice

- Seed appointment-confirmation template.
- Business task creation and preview.
- Moderation state.
- Worker eligibility and task detail.
- Readiness simulation.
- Acceptance scope snapshot.
- Workbench steps and autosave.
- Submission evidence.
- Business review.
- Demo payment state.
- Verified passport entry.
- Progression recommendation.

## P0 — Safety and operations

- Prohibited-content rules.
- Reporting and dispute creation.
- Admin queues.
- Account/task suspension.
- Audit events.
- File access and retention controls.
- AI manual fallback.

## P1 — Remaining MVP templates

- Quote follow-up preparation.
- Invoice-reminder preparation.
- Spreadsheet cleanup.
- Social-media content preparation.

Each template requires its own prerequisites, simulation, workbench, rubric, privacy rules and evaluation fixtures.

## P1 — Product quality

- Public passport sharing controls.
- One-page experience export.
- Notifications.
- Worker and business support flows.
- Mobile performance.
- Accessibility verification.
- Low-bandwidth behaviour.
- Judge demo mode and walkthrough.

## P1 — Measurement

- Funnel events.
- Task lifecycle metrics.
- Worker progression metrics.
- Business value fields.
- AI quality, override, latency and cost metrics.
- Safety and dispute dashboard.

## P2 — After validation

- Real payment partner.
- Partner opportunity ingestion.
- Sponsored cohort dashboard.
- Evaluated multilingual support.
- Voice input.
- Improved offline resilience.
- Repeat-worker teams.

## Definition of done for every feature

- Acceptance criteria pass.
- Role and RLS tests pass.
- Loading, empty, error and permission states exist.
- Mobile layout verified.
- Accessibility considered.
- Audit event added where consequential.
- AI feature has schema, fallback and evaluation fixture.
- No fake integration or unlabelled demo state.
- Documentation updated.