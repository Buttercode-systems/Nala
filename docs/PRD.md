# Product Requirements Document

## Objective

Deliver a mobile-first, usable MVP that proves Nala can turn one structured business need into paid, verified work experience and a credible next opportunity.

## Primary demonstration

A salon owner creates an appointment-confirmation task. A first-time worker completes a readiness simulation, accepts the task, performs the work in the guided workbench, submits evidence, receives verification, records earnings, and sees an updated Proof-of-Work Passport and next-step recommendation.

## Roles

- Worker
- Business owner or manager
- Platform administrator
- Opportunity partner (post-MVP unless required for demonstration)

## Functional requirements

### Authentication and onboarding

- Email or phone-based authentication.
- Explicit role selection.
- Consent capture for terms, privacy and AI assistance.
- Worker onboarding supports incomplete profiles and progressive completion.
- Business onboarding captures organisation identity, representative and verification state.

### Worker capability profile

- Conversational assessment with structured output.
- Captures skills evidence, tools available, language, location, availability, accessibility needs and task preferences.
- Separates self-claimed, assessed and verified capability.
- Produces eligible task categories and readiness gaps.
- User can correct the generated profile.

### Task templates and creation

- Business selects one approved template.
- Task form collects only template-approved fields.
- Platform calculates a suggested duration and payment range.
- Business previews worker-visible scope before publishing.
- Risky content or prohibited instructions block publication and route to moderation.

### Matching

- Only workers meeting hard prerequisites are eligible.
- Ranking uses capability, readiness, availability, prior reliability and task fit.
- Matching must expose a plain-language reason.
- No protected characteristic may improve or reduce eligibility.

### Readiness simulation

- New workers complete a short task-specific simulation.
- Result is scored against a published rubric.
- Failed simulations provide coaching and allow retry within defined limits.

### Task acceptance

- Worker sees payment, estimated effort, deadline, data sensitivity, required evidence and cancellation terms.
- Acceptance records an immutable scope snapshot.
- Worker can decline without penalty.

### AI-guided workbench

- Step-by-step checklist.
- Approved templates and examples.
- Draft assistance and quality checks.
- Policy reminders when sensitive data is present.
- Human worker confirms all outbound or final work.
- AI activity is logged for audit.

### Submission and review

- Worker submits required evidence.
- Automated validation checks completeness, obvious data leaks and rubric alignment.
- Business accepts, requests one bounded revision, or disputes.
- Review captures quality, timeliness, communication and hire-again intent.
- Worker may challenge unfair feedback.

### Earnings ledger

- Shows agreed, pending, approved, paid, refunded or disputed amounts.
- MVP may use sandbox payment states, but must label them accurately.
- Nala must not claim to hold money unless regulated payment infrastructure is actually implemented.

### Proof-of-Work Passport

- Distinguishes verified work from self-claims and simulations.
- Contains task category, date, outcome, verified skills, business feedback and privacy-safe evidence.
- Worker controls public visibility.
- Generates a shareable public profile and one-page experience summary.

### Progression

- Recommends a next task, skill activity or external opportunity.
- Recommendation cites the evidence used.
- User can reject or correct recommendations.

### Admin operations

- Review business verification.
- Moderate task content.
- Suspend accounts or tasks.
- Resolve disputes.
- Inspect audit events.
- Configure task templates and rubrics.

## Non-functional requirements

- Responsive from 360px mobile width upward.
- Essential worker flow remains usable on constrained mobile data.
- WCAG 2.2 AA target for core flows.
- All privileged data access protected by server-side checks and Supabase RLS.
- Sensitive records encrypted in transit and at rest through managed platform controls.
- Audit logging for high-risk state changes.
- No secrets exposed to the browser.
- AI calls use structured schemas, timeouts, retries and safe fallbacks.
- User-visible state must never depend solely on an AI response.

## MVP acceptance criteria

The MVP is complete only when:

1. A verified demo business can create an approved task.
2. An eligible worker can discover, practise and accept it.
3. Scope and payment cannot change silently after acceptance.
4. The worker can complete and submit the task using persisted data.
5. The business can review and verify the result.
6. The ledger reflects the task lifecycle accurately.
7. The passport reflects only verified evidence.
8. A next opportunity is recommended from recorded performance.
9. Admin can intervene in a dispute or unsafe task.
10. The full flow works on mobile without manually editing database records.

## Out of scope

- Credit, lending and loan eligibility.
- Stored-value wallet.
- Autonomous applications to jobs.
- Open-ended freelance categories.
- Unverified public ratings.
- Production banking integration without an authorised partner.
- Full offline task execution.
- Broad multilingual launch before quality evaluation.