# Technical Architecture

## Architecture goals

- Fast R0-friendly delivery.
- Strong role and data isolation.
- Auditable task and payment-state transitions.
- AI providers are replaceable.
- Mobile-first web before native apps.
- Production paths do not depend on AI availability.

## Proposed system

### Client

Next.js App Router with TypeScript and Tailwind CSS, deployed to Vercel as a responsive progressive web application.

Responsibilities:
- role-specific interfaces;
- form validation and optimistic UI;
- local draft resilience where safe;
- no direct access to privileged secrets;
- accessible, low-data presentation.

### Backend

Supabase provides:
- Postgres as the system of record;
- Auth;
- Storage for approved evidence and business documents;
- Realtime for task status where useful;
- Edge Functions for privileged workflows, webhooks and AI orchestration.

### AI gateway

A server-only provider abstraction receives typed requests and returns schema-validated outputs.

Initial capabilities:
- capability-profile extraction;
- task packaging checks;
- simulation feedback;
- workbench assistance;
- submission pre-check;
- progression recommendation.

Every capability has:
- versioned prompt;
- input/output schema;
- safety rules;
- confidence or failure signal;
- deterministic fallback;
- evaluation dataset;
- audit metadata.

### Storage

Buckets are private by default. Signed URLs are short-lived. Public portfolio assets are separately approved and privacy-filtered.

Suggested buckets:
- `business-verification`
- `task-inputs`
- `task-submissions`
- `portfolio-public`
- `dispute-evidence`

### Observability

- structured application logs;
- error monitoring;
- privacy-safe product events;
- AI latency, failure, cost and override metrics;
- audit events for high-risk mutations.

## Domain modules

- Identity and access
- Worker profiles and capabilities
- Businesses and verification
- Task templates
- Tasks and matching
- Simulations and readiness
- Workbench and submissions
- Reviews and disputes
- Earnings and payment states
- Proof-of-Work Passport
- Progression
- Moderation and audit

## State machines

### Task

`draft → moderation_pending → published → matched → accepted → in_progress → submitted → revision_requested | approved | disputed → completed | cancelled`

Illegal transitions are rejected server-side.

### Payment record

`not_required → pending_funding → funded_demo/authorised → approval_pending → payable → paid_demo/paid → refunded | disputed`

Names containing `demo` must remain visible until real rails are connected.

### Business verification

`unverified → submitted → under_review → verified | rejected | suspended`

## Security model

- Supabase RLS on every user-facing table.
- Service-role key used only in trusted server functions.
- Ownership checks repeated in functions that change task, review, payment or portfolio state.
- Immutable acceptance snapshots prevent scope manipulation.
- Append-only audit trail for sensitive transitions.
- Rate limiting on auth, AI, task creation and messaging endpoints.
- Uploaded files checked for type, size and malware where supported.
- PII minimised and retention rules documented.

## Environments

- Local
- Preview
- Production

Separate Supabase projects or strict environment isolation. Demo data must not be copied into production user records.

## CI baseline for coding phase

- formatting and linting;
- TypeScript checks;
- unit tests;
- database migration validation;
- RLS policy tests;
- integration tests for task lifecycle;
- end-to-end test for the primary demo;
- secret scanning and dependency audit.

## Architecture rule

No client component may directly perform a privileged lifecycle transition merely because a button is hidden from other roles. Authorization belongs in the database and trusted server layer.