# Data Model

## Conventions

- UUID primary keys.
- `created_at` and `updated_at` timestamps.
- Soft deletion only where audit or recovery is required.
- Money stored as integer minor units plus ISO currency code.
- Lifecycle transitions occur through trusted functions.
- User-facing tables have Row Level Security from the first migration.

## Core tables

### Identity

- `profiles`: user identity extension, role-neutral preferences and status.
- `worker_profiles`: worker-specific onboarding, availability and location granularity.
- `businesses`: business identity, operating details and verification state.
- `business_members`: membership and role within a business.
- `consents`: versioned acceptance of terms, privacy and AI disclosures.

### Capability

- `capability_claims`: worker self-claims and source.
- `capability_assessments`: structured AI or rubric-based assessment results.
- `worker_capabilities`: current materialised capability state with provenance.
- `languages`: supported languages and proficiency records.

### Task system

- `task_templates`: approved task definitions.
- `task_template_versions`: immutable instructions, rubric, risk and pricing guidance.
- `tasks`: business task instance and lifecycle state.
- `task_scope_snapshots`: immutable accepted scope.
- `task_matches`: worker eligibility and match reason.
- `task_assignments`: accepted worker relationship.
- `task_steps`: workbench checklist state.
- `task_messages`: controlled task communication.

### Readiness and execution

- `simulations`: task-specific practice attempts.
- `simulation_results`: scores, feedback and eligibility outcome.
- `submissions`: worker submission and state.
- `submission_artifacts`: private evidence metadata.
- `submission_checks`: automated or human checks.
- `reviews`: business rubric response.
- `review_appeals`: worker challenge and outcome.

### Economics

- `payment_records`: agreed amount, fees, currency and lifecycle state.
- `payment_events`: append-only state history and provider references.
- `earnings_ledger_entries`: worker-facing accounting entries.
- `business_ledger_entries`: business-facing accounting entries.

### Proof and progression

- `passport_entries`: verified, simulated or self-claimed evidence with provenance.
- `passport_skills`: skill links and verification level.
- `public_portfolios`: visibility configuration and public slug.
- `progression_recommendations`: recommendation, evidence and decision.
- `external_opportunities`: curated post-MVP opportunity records.

### Safety and operations

- `business_verification_cases`
- `moderation_cases`
- `disputes`
- `reports`
- `account_restrictions`
- `audit_events`
- `ai_runs`
- `notification_events`

## Critical constraints

- One active assignment per task in the MVP.
- Only accepted assignment owner may submit.
- Review author must be an authorised member of the task's business.
- A verified passport entry requires an approved submission and completed review.
- Accepted amount and scope reference an immutable snapshot.
- Ledger entries are append-only; corrections use reversing entries.
- AI outputs never directly mark a task paid, verified or completed.

## RLS summary

### Workers may
- read and update their own profile;
- view eligible published tasks;
- access only tasks assigned to them;
- submit evidence to their own assignments;
- read their own ledger and passport;
- control public portfolio visibility.

### Businesses may
- access their business through membership;
- create and manage their own tasks;
- see assigned worker data needed for fulfilment only;
- review submissions to their tasks;
- read their own ledgers and disputes.

### Public users may
- read only explicitly published portfolio fields through a constrained view.

### Admin access
- occurs through auditable server actions and least-privilege admin roles;
- must not rely on disabling RLS in the browser.

## Migration order

1. Extensions and enums
2. Identity and consent
3. Businesses and memberships
4. Capabilities
5. Templates and tasks
6. Assignments and simulations
7. Submissions and reviews
8. Economics
9. Passport and progression
10. Safety, audit and notifications
11. RLS policies
12. Seeded demo templates and test fixtures

The coding round must convert this logical model into reviewed migrations and automated RLS tests before feature work depends on it.